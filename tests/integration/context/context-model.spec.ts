import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { contextRepository } from '../../../features/context-feedback/knowledge'
import {
  buildContextDetail,
  buildContextLibrary,
  isQualitativeState,
  qualitativeStates,
} from '../../../features/context-feedback/model'
import { DomainLocalization } from '../../../localization'
import { SafetyAccess } from '../../../safety'

const localization = new DomainLocalization(contextRepository)
const safety = new SafetyAccess(contextRepository)
const contextIds = contextRepository.nodes.filter((node) => node.category === 'context').map((node) => node.id)

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name)
    return entry.isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(ts|vue)$/.test(path))
}

describe('WP-09 Context domain integration', () => {
  it('projects the validated Context release without hardcoded business counts', () => {
    expect(buildContextLibrary(contextRepository, localization, 'en')).toHaveLength(8)
    expect(contextIds.flatMap((id) => contextRepository.getContextMappings(id))).toHaveLength(24)
    expect(contextRepository.getFeedbackLoops()).toHaveLength(2)
  })

  it.each(contextIds)('builds every canonical Context in English and Persian: %s', (id) => {
    for (const locale of ['en', 'fa'] as const) {
      const detail = buildContextDetail(contextRepository, localization, safety, id, locale)
      expect(detail?.id).toBe(id)
      expect(detail?.mappings).toHaveLength(contextRepository.getContextMappings(id).length)
      expect(detail?.feedbackLoops).toHaveLength(contextRepository.getFeedbackLoops(id).length)
    }
  })

  it('requires exact canonical Context identity', () => {
    expect(buildContextDetail(contextRepository, localization, safety, 'ctx1', 'en')).toBeNull()
    expect(buildContextDetail(contextRepository, localization, safety, 'CTX9', 'en')).toBeNull()
    expect(buildContextDetail(contextRepository, localization, safety, 'BEH1', 'en')).toBeNull()
  })

  it('preserves every explicit Context mapping and canonical relationship', () => {
    for (const contextId of contextIds) {
      const detail = buildContextDetail(contextRepository, localization, safety, contextId, 'en')!
      expect(detail.mappings.map((mapping) => mapping.id)).toEqual(
        contextRepository.getContextMappings(contextId).map((mapping) => mapping.id),
      )
      for (const mapping of detail.mappings) {
        expect(mapping.context.id).toBe(contextId)
        expect(mapping.contextEvidence.relationshipType).toBe('MODULATES')
        expect(mapping.behaviourEvidence.relationshipType).toBe('CONTRIBUTES_TO')
        expect(mapping.contextEvidence.evidence.length).toBeGreaterThan(0)
        expect(mapping.behaviourEvidence.evidence.length).toBeGreaterThan(0)
      }
    }
  })

  it('uses only authoritative FeedbackLoop records and their FEEDBACK_WITH edges', () => {
    const feedbackContexts = contextIds.filter((id) => contextRepository.getFeedbackLoops(id).length)
    expect(feedbackContexts).toEqual(['CTX2', 'CTX4'])
    for (const contextId of feedbackContexts) {
      const detail = buildContextDetail(contextRepository, localization, safety, contextId, 'en')!
      expect(detail.feedbackLoops.map((loop) => loop.id)).toEqual(contextRepository.getFeedbackLoops(contextId).map((loop) => loop.id))
      expect(detail.feedbackLoops.every((loop) => loop.returningRelationships.every((edge) => edge.relationshipType === 'FEEDBACK_WITH'))).toBe(true)
      expect(detail.feedbackLoops.every((loop) => loop.evidenceEntry.evidence.length > 0)).toBe(true)
    }
  })

  it('exposes only the approved exact qualitative state identifiers', () => {
    expect(qualitativeStates).toEqual(['supportive', 'neutral', 'demanding'])
    expect(qualitativeStates.every((state) => isQualitativeState(state))).toBe(true)
    expect(isQualitativeState('Supportive')).toBe(false)
    expect(isQualitativeState('0.75')).toBe(false)
    expect(isQualitativeState(null)).toBe(false)
  })

  it('keeps temporary state local or route-derived and excludes prohibited runtime mechanisms', () => {
    const sources = [
      ...sourceFiles('features/context-feedback'),
      ...sourceFiles('app/components/context-feedback'),
      ...sourceFiles('app/pages/[locale]/context'),
    ].map((path) => readFileSync(path, 'utf8')).join('\n')
    expect(sources).not.toMatch(/userContextProfile|contextHistory|localStorage|sessionStorage|useState\(|Pinia|defineStore|Math\.random/)
    expect(sources).not.toMatch(/simulateContext|predictContext|calculateRisk|selectedContexts|contextScore/)
    expect(sources).not.toMatch(/VisualGraph|LayoutArtifact|elkjs|presentationRepository|presentations\.json|sources\.json/)
  })

  it('prerenders both libraries and every canonical Context route', () => {
    const config = readFileSync('nuxt.config.ts', 'utf8')
    expect(config).toContain('...contextRoutes')
    expect(config).toContain("'./knowledge/source/context/contexts.json'")
  })
})
