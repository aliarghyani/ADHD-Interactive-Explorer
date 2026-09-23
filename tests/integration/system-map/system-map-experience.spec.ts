import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { nextTick, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import type { Locale } from '../../../domain'
import { systemMapRepository } from '../../../features/system-map/knowledge'
import { buildSemanticRelationshipModel } from '../../../features/system-map/semantic-browser'
import { useSystemMapExperience } from '../../../features/system-map/system-map-experience'
import { DomainLocalization, geometryForLocale } from '../../../localization'
import { SafetyAccess } from '../../../safety'
import { productionLayout } from '../../../visualization/system-map/layout'

function createExperience(initialLocale: Locale = 'en', initialNode: string | null = null) {
  const locale = ref<Locale>(initialLocale)
  const requestedNodeId = ref<string | null>(initialNode)
  const navigate = vi.fn(async (path: string) => path)
  const experience = useSystemMapExperience({
    repository: systemMapRepository,
    localization: new DomainLocalization(systemMapRepository),
    safety: new SafetyAccess(systemMapRepository),
    layout: productionLayout,
    locale,
    requestedNodeId,
    navigate,
  })
  return { experience, locale, requestedNodeId, navigate }
}

function sourceFiles(root: string): string[] {
  return readdirSync(root).flatMap((entry) => {
    const path = join(root, entry)
    return statSync(path).isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(?:ts|vue)$/.test(path))
}

describe('SystemMapExperience integration', () => {
  it.each(['en', 'fa'] as const)('supports /%s/map without a selection', (locale) => {
    const { experience } = createExperience(locale)
    expect(experience.routeFor()).toBe(`/${locale}/map`)
    expect(experience.selectedNodeId.value).toBeNull()
    expect(experience.invalidNodeId.value).toBe(false)
  })

  it('restores the same canonical deep link with localized EN/FA labels', async () => {
    const { experience, locale } = createExperience('en', 'BEH1')
    expect(experience.selectedNodeId.value).toBe('BEH1')
    expect(experience.detail.value?.label).toBe('Starting')

    locale.value = 'fa'
    await nextTick()
    expect(experience.selectedNodeId.value).toBe('BEH1')
    expect(experience.detail.value?.label).toBe('شروع کردن')
    expect(experience.routeFor('BEH1', 'fa')).toBe('/fa/map/BEH1')
  })

  it('handles an invalid canonical ID without fuzzy resolution', () => {
    const { experience } = createExperience('en', 'beh1')
    expect(experience.selectedNodeId.value).toBeNull()
    expect(experience.invalidNodeId.value).toBe(true)
    expect(experience.detail.value).toBeNull()
  })

  it('turns graph selection into canonical route navigation', async () => {
    const { experience, navigate } = createExperience('en')
    await experience.selectNode('BEH1')
    expect(navigate).toHaveBeenCalledWith('/en/map/BEH1')
  })

  it('projects semantic relationships from the same route-owned selection', async () => {
    const { experience, requestedNodeId, navigate } = createExperience('en', 'BEH1')
    expect(experience.semantic.value?.id).toBe(experience.selectedNodeId.value)
    expect(experience.semantic.value?.upstream.length).toBeGreaterThan(0)

    const relatedId = experience.semantic.value!.upstream[0]!.nodeId
    await experience.selectNode(relatedId)
    expect(navigate).toHaveBeenLastCalledWith(`/en/map/${relatedId}`)

    requestedNodeId.value = relatedId
    await nextTick()
    expect(experience.selectedNodeId.value).toBe(relatedId)
    expect(experience.graph.value.selectedNodeId).toBe(relatedId)
    expect(experience.semantic.value?.id).toBe(relatedId)
  })

  it('preserves every canonical edge direction and evidence identity across locales', () => {
    const localization = new DomainLocalization(systemMapRepository)
    for (const node of systemMapRepository.nodes) {
      const en = buildSemanticRelationshipModel(systemMapRepository, localization, node.id, 'en')
      const fa = buildSemanticRelationshipModel(systemMapRepository, localization, node.id, 'fa')
      const identity = (items: typeof en.incoming) => items.map((item) => ({
        edgeId: item.edgeId,
        sourceId: item.sourceId,
        targetId: item.targetId,
        evidenceIds: item.evidenceIds,
      }))
      expect(identity(en.incoming)).toEqual(systemMapRepository.getIncomingRelationships(node.id).map((edge) => ({
        edgeId: edge.id, sourceId: edge.sourceId, targetId: edge.targetId, evidenceIds: edge.evidenceIds,
      })))
      expect(identity(en.outgoing)).toEqual(systemMapRepository.getOutgoingRelationships(node.id).map((edge) => ({
        edgeId: edge.id, sourceId: edge.sourceId, targetId: edge.targetId, evidenceIds: edge.evidenceIds,
      })))
      expect(identity(fa.incoming)).toEqual(identity(en.incoming))
      expect(identity(fa.outgoing)).toEqual(identity(en.outgoing))
      expect(identity(en.upstream)).toEqual(identity(en.incoming.filter((item) => item.relationshipType !== 'FEEDBACK_WITH')))
      expect(identity(en.downstream)).toEqual(identity(en.outgoing.filter((item) => item.relationshipType !== 'FEEDBACK_WITH')))
    }
  })

  it('keeps semantic content available after experience recomputation and remount', () => {
    const first = createExperience('fa', 'BEH1').experience
    const second = createExperience('fa', 'BEH1').experience
    expect(first.semantic.value).toEqual(second.semantic.value)
    expect(second.semantic.value?.label).toBe('شروع کردن')
  })

  it('filters visibility without changing selection or canonical geometry', async () => {
    const { experience } = createExperience('en', 'BEH1')
    experience.setLayerVisible('context', false)
    await nextTick()

    expect(experience.selectedNodeId.value).toBe('BEH1')
    expect(experience.graph.value.nodes.find((node) => node.id === 'CTX1')?.visible).toBe(false)
    expect(experience.graph.value.nodes).toHaveLength(30)
    expect(geometryForLocale(productionLayout, 'en')).toBe(geometryForLocale(productionLayout, 'fa'))
    expect(experience.layout).toBe(productionLayout)
  })

  it('resolves mandatory localized graph safety copy centrally', () => {
    const en = createExperience('en').experience.graphSafetyText.value
    const fa = createExperience('fa').experience.graphSafetyText.value
    expect(en).toContain('possible associations')
    expect(fa).not.toBe(en)
  })

  it('has no runtime ELK or graph-framework imports', () => {
    const roots = ['app', 'features', 'visualization'].map((root) => join(process.cwd(), root))
    const source = roots.flatMap(sourceFiles).map((path) => readFileSync(path, 'utf8')).join('\n')
    expect(source).not.toMatch(/from\s+['"]elkjs|import\s*\(['"]elkjs/)
    expect(source).not.toMatch(/vue-flow|cytoscape|from\s+['"]d3/)
  })
})
