import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { DomainLookupError } from '../../../domain'
import { evidenceRepository } from '../../../features/evidence/knowledge'
import {
  buildEvidenceDetail,
  buildEvidenceIndex,
  normalizeSourceReference,
  safeEvidenceReturnTarget,
} from '../../../features/evidence/model'
import { SafetyAccess } from '../../../safety'

const safety = new SafetyAccess(evidenceRepository)

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name)
    return entry.isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(ts|vue)$/.test(path))
}

describe('WP-11 Evidence / Sources model', () => {
  it('projects every canonical record in deterministic source order with qualitative levels', () => {
    const records = buildEvidenceIndex(evidenceRepository)
    expect(records).toHaveLength(evidenceRepository.manifest.releaseExpectations.evidence)
    expect(records.map((record) => record.id)).toEqual(evidenceRepository.evidence.map((record) => record.id))
    expect(new Set(records.map((record) => record.level))).toEqual(new Set(['Clinical', 'Strong', 'Moderate', 'Limited']))
    expect(records.every((record) => record.sourceCount > 0)).toBe(true)
  })

  it.each(evidenceRepository.evidence.map((record) => record.id))('resolves exact detail and every source for %s', (id) => {
    for (const locale of ['en', 'fa'] as const) {
      const detail = buildEvidenceDetail(evidenceRepository, safety, id, locale)
      expect(detail?.id).toBe(id)
      expect(detail?.summary).toBe(evidenceRepository.getEvidence(id).summary)
      expect(detail?.limitations.length).toBeGreaterThan(0)
      expect(detail?.sources.map((source) => source.id)).toEqual(evidenceRepository.getEvidence(id).sourceIds)
      expect(detail?.groupLevelCaution).toBe(safety.getRequired('groupLevelEvidenceCaution', locale).localized.fields.text)
    }
  })

  it('uses exact canonical lookup and controls invalid IDs', () => {
    expect(buildEvidenceDetail(evidenceRepository, safety, 'evid_clinical_anchors', 'en')).toBeNull()
    expect(buildEvidenceDetail(evidenceRepository, safety, 'EVID_UNKNOWN', 'en')).toBeNull()
    expect(() => evidenceRepository.getEvidence('EVID_UNKNOWN')).toThrow(DomainLookupError)
  })

  it('normalizes only authoritative source fields and preserves optional DOI/URL behavior', () => {
    const withDoi = evidenceRepository.sources.find((source) => source.doi)
    const withoutDoi = evidenceRepository.sources.find((source) => !source.doi)
    expect(withDoi).toBeTruthy()
    expect(withoutDoi).toBeTruthy()
    expect(normalizeSourceReference(withDoi!).fields.some((field) => field.name === 'doi')).toBe(true)
    expect(normalizeSourceReference(withoutDoi!).fields.some((field) => field.name === 'doi')).toBe(false)
    for (const source of evidenceRepository.sources) {
      const normalized = normalizeSourceReference(source)
      expect(normalized.url).toBe(source.url)
      expect(normalized.citationText).toBe(source.citationText)
      expect(normalized.fields.every((field) => field.value.trim().length > 0)).toBe(true)
    }
  })

  it('allows only bounded internal exploration return targets', () => {
    expect(safeEvidenceReturnTarget('/en/behaviours/BEH1?pathway=PATH1', 'en')).toBe('/en/behaviours/BEH1?pathway=PATH1')
    expect(safeEvidenceReturnTarget('/fa/context/CTX2', 'fa')).toBe('/fa/context/CTX2')
    expect(safeEvidenceReturnTarget('https://example.com', 'en')).toBeNull()
    expect(safeEvidenceReturnTarget('/en/evidence', 'en')).toBeNull()
    expect(safeEvidenceReturnTarget('/fa/map/BEH1', 'en')).toBeNull()
  })

  it('prerenders every meaningful standalone record in both locales', () => {
    const config = readFileSync('nuxt.config.ts', 'utf8')
    expect(config).toContain("'./knowledge/source/evidence/evidence.json'")
    expect(config).toContain('...evidenceRoutes')
    expect(config).toContain('evidenceEntries.evidence.map')
  })

  it('keeps Evidence independent from graph and prohibited inference mechanisms', () => {
    const runtime = [
      ...sourceFiles('features/evidence'),
      ...sourceFiles('app/components/evidence'),
      ...sourceFiles('app/pages/[locale]/evidence'),
    ].map((path) => readFileSync(path, 'utf8')).join('\n')
    expect(runtime).not.toMatch(/VisualGraph|LayoutArtifact|elkjs|behaviour-explorer|context-feedback|presentation-education/)
    const prohibited = ['evidence' + 'Score', 'confidence' + 'Percent', 'diagnostic' + 'Strength', 'personalized' + 'Evidence', 'rank' + 'Sources', 'adhd' + 'Likelihood', 'probability']
    for (const term of prohibited) expect(runtime.toLowerCase()).not.toContain(term.toLowerCase())
  })
})
