import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { behaviourRepository } from '../../../features/behaviour-explorer/knowledge'
import { buildBehaviourDetail, buildBehaviourLibrary } from '../../../features/behaviour-explorer/model'
import { DomainLocalization } from '../../../localization'
import { SafetyAccess } from '../../../safety'

const localization = new DomainLocalization(behaviourRepository)
const safety = new SafetyAccess(behaviourRepository)
const ids = behaviourRepository.behaviours.map((entry) => entry.behaviourId)

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name)
    return entry.isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(ts|vue)$/.test(path))
}

describe('WP-08 Behaviour domain integration', () => {
  it('projects the validated production release without hardcoded counts', () => {
    expect(buildBehaviourLibrary(behaviourRepository, localization, 'en')).toHaveLength(7)
    expect(ids.flatMap((id) => behaviourRepository.getBehaviourPathways(id))).toHaveLength(22)
    expect(ids.flatMap((id) => behaviourRepository.getAlternativeExplanations(id)).length).toBeGreaterThan(13)
    expect(new Set(ids.flatMap((id) => behaviourRepository.getAlternativeExplanations(id).map((item) => item.id))).size).toBe(13)
  })

  it.each(ids)('builds every canonical route in English and Persian: %s', (id) => {
    for (const locale of ['en', 'fa'] as const) {
      const detail = buildBehaviourDetail(behaviourRepository, localization, safety, id, locale)
      expect(detail?.id).toBe(id)
      expect(detail?.pathways.length).toBe(behaviourRepository.getBehaviourPathways(id).length)
      expect(detail?.alternatives.length).toBe(behaviourRepository.getAlternativeExplanations(id).length)
    }
  })

  it('requires exact canonical Behaviour identity', () => {
    expect(buildBehaviourDetail(behaviourRepository, localization, safety, 'beh1', 'en')).toBeNull()
    expect(buildBehaviourDetail(behaviourRepository, localization, safety, 'BEH8', 'en')).toBeNull()
  })

  it('keeps every projected pathway owned by its Behaviour and in canonical order', () => {
    for (const id of ids) {
      const detail = buildBehaviourDetail(behaviourRepository, localization, safety, id, 'en')
      expect(detail?.pathways.map((pathway) => pathway.id)).toEqual(
        behaviourRepository.getBehaviourPathways(id).map((pathway) => pathway.id),
      )
      for (const pathway of detail?.pathways ?? []) {
        expect(pathway.concepts.at(-1)?.id).toBe(id)
        expect(pathway.evidenceEntries.every((entry) => entry.edgeId && entry.evidence.length > 0)).toBe(true)
      }
    }
  })

  it('uses curated Pattern and Functional relationships without fabricating Functional edges', () => {
    for (const id of ids) {
      const detail = buildBehaviourDetail(behaviourRepository, localization, safety, id, 'en')
      expect(detail?.patterns.map((item) => item.concept.id)).toEqual(
        behaviourRepository.getRelatedPatterns(id).curatedContentMappings.map((node) => node.id),
      )
      expect(detail?.functions.map((item) => item.concept.id)).toEqual(
        behaviourRepository.getRelatedFunctionalDomains(id).curatedContentMappings.map((node) => node.id),
      )
      const examples = behaviourRepository.getFunctionalExamples(id)
      expect(detail?.functions.map((item) => Boolean(item.evidenceEntry))).toEqual(
        examples.map((item) => Boolean(item.edgeId)),
      )
    }
  })

  it('keeps state local or route-derived and excludes later-package dependencies', () => {
    const sources = [
      ...sourceFiles('features/behaviour-explorer'),
      ...sourceFiles('app/components/behaviour-explorer'),
      ...sourceFiles('app/pages/[locale]/behaviours'),
    ].map((path) => readFileSync(path, 'utf8')).join('\n')
    expect(sources).not.toMatch(/selectedBehaviours|localStorage|sessionStorage|useState\(|Pinia|defineStore/)
    expect(sources).not.toMatch(/VisualGraph|LayoutArtifact|elkjs|presentationRepository|Context Explorer state/)
    expect(readFileSync('features/behaviour-explorer/knowledge.ts', 'utf8')).not.toMatch(/sources\.json|presentations\.json|feedback-loops\.json/)
  })

  it('prerenders both libraries and every canonical Behaviour route', () => {
    const config = readFileSync('nuxt.config.ts', 'utf8')
    expect(config).toContain('...behaviourRoutes')
    expect(config).toContain("'./knowledge/source/behaviours/behaviours.json'")
  })
})
