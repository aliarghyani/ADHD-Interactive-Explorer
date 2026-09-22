import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { presentationRepository } from '../../../features/presentation-education/knowledge'
import { buildPresentationDetail, buildPresentationIndex } from '../../../features/presentation-education/model'
import { DomainLocalization } from '../../../localization'
import { SafetyAccess } from '../../../safety'

const localization = new DomainLocalization(presentationRepository)
const safety = new SafetyAccess(presentationRepository)
const currentIds = presentationRepository.presentations
  .filter((record) => record.status === 'current-formal')
  .map((record) => record.id)

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name)
    return entry.isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(ts|vue)$/.test(path))
}

describe('WP-10 Presentation Education integration', () => {
  it('projects exactly three current formal presentations and one separate historical record', () => {
    const model = buildPresentationIndex(presentationRepository, localization, safety, 'en')
    expect(model.presentations.map((item) => item.id)).toEqual([
      'PRESENTATION_INATTENTIVE',
      'PRESENTATION_HYPERACTIVE_IMPULSIVE',
      'PRESENTATION_COMBINED',
    ])
    expect(model.historical.id).toBe('HISTORICAL_ADD_NOTE')
    expect(model.presentations.map((item) => item.id)).not.toContain(model.historical.id)
  })

  it.each(currentIds)('builds complete EN/FA formal detail for %s', (id) => {
    for (const locale of ['en', 'fa'] as const) {
      const detail = buildPresentationDetail(presentationRepository, localization, safety, id, locale)
      expect(detail?.label).toBeTruthy()
      expect(detail?.description).toBeTruthy()
      expect(detail?.anchors.length).toBe(presentationRepository.getPresentation(id).clinicalAnchorIds.length)
      expect(detail?.sources).toEqual(presentationRepository.getSourcesForPresentation(id))
      expect(detail?.safety.presentation).toBe(
        safety.getRequired('presentationCaution', locale).localized.fields.text,
      )
    }
  })

  it('maps formal presentations only to their explicit Clinical Anchor domains', () => {
    expect(buildPresentationDetail(presentationRepository, localization, safety, 'PRESENTATION_INATTENTIVE', 'en')
      ?.anchors.map((anchor) => anchor.id)).toEqual(['CA1'])
    expect(buildPresentationDetail(presentationRepository, localization, safety, 'PRESENTATION_HYPERACTIVE_IMPULSIVE', 'en')
      ?.anchors.map((anchor) => anchor.id)).toEqual(['CA2'])
    expect(buildPresentationDetail(presentationRepository, localization, safety, 'PRESENTATION_COMBINED', 'en')
      ?.anchors.map((anchor) => anchor.id)).toEqual(['CA1', 'CA2'])
  })

  it('rejects invalid IDs and the historical record as formal detail routes', () => {
    expect(buildPresentationDetail(presentationRepository, localization, safety, 'presentation_inattentive', 'en')).toBeNull()
    expect(buildPresentationDetail(presentationRepository, localization, safety, 'PRESENTATION_UNKNOWN', 'en')).toBeNull()
    expect(buildPresentationDetail(presentationRepository, localization, safety, 'HISTORICAL_ADD_NOTE', 'en')).toBeNull()
  })

  it('keeps Presentation state and imports isolated from exploration features and history', () => {
    const sources = [
      ...sourceFiles('features/presentation-education'),
      ...sourceFiles('app/components/presentation-education'),
      ...sourceFiles('app/pages/[locale]/presentations'),
    ].map((path) => readFileSync(path, 'utf8')).join('\n')

    expect(sources).not.toMatch(/features\/(behaviour-explorer|context-feedback|system-map)/)
    expect(sources).not.toMatch(/selectedNodeId|selectedBehaviourIds|localStorage|sessionStorage|useState\(|Pinia|defineStore/)
    expect(sources).not.toMatch(/matchPresentation|inferPresentation|getPresentationForBehaviour|likelihood|probability|symptomChecklist/)
    expect(readFileSync('features/presentation-education/knowledge.ts', 'utf8'))
      .not.toMatch(/source\/(behaviours|context)\/|graph\/edges\.json|knowledge\/layouts|elkjs/)
  })

  it('prerenders the two indexes and only current formal details', () => {
    const config = readFileSync('nuxt.config.ts', 'utf8')
    expect(config).toContain('...presentationRoutes')
    expect(config).toContain("entry.status === 'current-formal'")
    expect(config).toContain("'./knowledge/source/presentations/presentations.json'")
    expect(config).not.toContain('`/${locale}/presentations/HISTORICAL_ADD_NOTE`')
  })

  it('keeps Presentation live and activates the completed Evidence destination', () => {
    const home = readFileSync('features/home/home-content.ts', 'utf8')
    expect(home).toContain("href: `${prefix}/presentations`, available: true")
    expect(home).toContain("{ id: 'evidence', label: t('home.navigation.evidence'), href: `${prefix}/evidence`, available: true }")
    expect(readFileSync('app/components/AppShell.vue', 'utf8')).toContain("item.id === 'evidence'")
  })
})
