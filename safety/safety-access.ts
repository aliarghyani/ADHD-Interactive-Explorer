import type {
  ContentId,
  KnowledgeRepository,
  Locale,
  LocalizedContent,
  SafetyCopy,
  SafetyId,
} from '../domain'

export const safetyPurposeIds = Object.freeze({
  globalEducationalDisclaimer: 'SAFETY_GLOBAL_EDUCATIONAL_DISCLAIMER',
  graphDisclaimer: 'SAFETY_GRAPH_DISCLAIMER',
  behaviourCaution: 'SAFETY_BEHAVIOUR_EXPLORER',
  alternativeExplanationReminder: 'SAFETY_ALTERNATIVE_EXPLANATION',
  recurringPatternCaution: 'SAFETY_RECURRING_PATTERN',
  functionalImpactCaution: 'SAFETY_FUNCTIONAL_IMPACT',
  presentationCaution: 'SAFETY_PRESENTATION_CAUTION',
  groupLevelEvidenceCaution: 'SAFETY_GROUP_LEVEL_EVIDENCE',
} as const satisfies Readonly<Record<string, SafetyId>>)

export type SafetyPurpose = keyof typeof safetyPurposeIds

export interface RequiredSafetyContent {
  readonly purpose: SafetyPurpose
  readonly record: SafetyCopy
  readonly localized: LocalizedContent
}

export class SafetyRequirementError extends Error {
  override readonly name = 'SafetyRequirementError'
}

function normalizedRequirement(value: string): string {
  return value.replaceAll('`', '').trim().toLowerCase()
}

/** Resolves only mandatory, authoritative safety records; it never fabricates fallback copy. */
export class SafetyAccess {
  constructor(private readonly repository: KnowledgeRepository) {}

  getRequired(purpose: SafetyPurpose, locale: Locale): RequiredSafetyContent {
    const expectedId = safetyPurposeIds[purpose]
    const record = this.repository.getSafetyCopy(expectedId)
    if (normalizedRequirement(record.displayRequirement) !== 'mandatory') {
      throw new SafetyRequirementError(`Safety record is not mandatory: ${record.id}`)
    }
    if (record.id !== expectedId || record.contentId !== expectedId as ContentId) {
      throw new SafetyRequirementError(`Safety identity mismatch: ${expectedId}`)
    }
    return Object.freeze({
      purpose,
      record,
      localized: this.repository.getLocalizedContent(record.contentId, locale),
    })
  }

  getAllRequired(locale: Locale): readonly RequiredSafetyContent[] {
    return Object.freeze(
      (Object.keys(safetyPurposeIds) as SafetyPurpose[]).map((purpose) => this.getRequired(purpose, locale)),
    )
  }
}
