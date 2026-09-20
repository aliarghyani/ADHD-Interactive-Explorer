import { describe, expect, it } from 'vitest'
import { DomainLookupError, KnowledgeRepository, type KnowledgeBundle } from '../../../domain'
import {
  assertPersistablePreferenceKey,
  PreferencePolicyError,
  SafetyAccess,
  SafetyRequirementError,
  safetyPurposeIds,
} from '../../../safety'
import { productionKnowledge } from '../domain/fixture'

describe('mandatory safety access', () => {
  it.each(['en', 'fa'] as const)('resolves every authoritative purpose in %s', (locale) => {
    const results = new SafetyAccess(new KnowledgeRepository(productionKnowledge)).getAllRequired(locale)
    expect(results).toHaveLength(Object.keys(safetyPurposeIds).length)
    expect(results.every(({ record, localized }) => record.id === localized.targetId)).toBe(true)
    expect(results.every(({ localized }) => typeof localized.fields.text === 'string')).toBe(true)
  })

  it('fails when mandatory localized content is missing and never fabricates fallback copy', () => {
    const bundle = structuredClone(productionKnowledge) as KnowledgeBundle
    bundle.fa.records = bundle.fa.records.filter(
      ({ targetId }) => targetId !== safetyPurposeIds.globalEducationalDisclaimer,
    )
    const access = new SafetyAccess(new KnowledgeRepository(bundle))

    expect(() => access.getRequired('globalEducationalDisclaimer', 'fa'))
      .toThrow(DomainLookupError)
  })

  it('fails when authoritative data does not mark a record mandatory', () => {
    const bundle = structuredClone(productionKnowledge) as KnowledgeBundle
    const record = bundle.safety.safety.find(({ id }) => id === safetyPurposeIds.graphDisclaimer)!
    Object.assign(record, { displayRequirement: '`optional`' })

    expect(() => new SafetyAccess(new KnowledgeRepository(bundle)).getRequired('graphDisclaimer', 'en'))
      .toThrow(SafetyRequirementError)
  })
})

describe('persistence allowlist', () => {
  it('allows only the currently approved non-clinical preference', () => {
    expect(() => assertPersistablePreferenceKey('preferredLocale')).not.toThrow()
  })

  it.each([
    'behaviourHistory',
    'symptomHistory',
    'contextProfile',
    'adhdProfile',
    'inferredPresentation',
    'diagnosticState',
    'medicalState',
    'safetyDisabled',
    'applicationState',
  ])('rejects prohibited or unknown key %s', (key) => {
    expect(() => assertPersistablePreferenceKey(key)).toThrow(PreferencePolicyError)
  })
})
