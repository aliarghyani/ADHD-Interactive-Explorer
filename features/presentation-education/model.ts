import { DomainLookupError, type KnowledgeRepository, type Locale, type SourceReference } from '../../domain'
import type { DomainLocalization } from '../../localization'
import type { SafetyAccess } from '../../safety'

type Fields = Readonly<Record<string, string | readonly string[]>>

export interface PresentationSummary {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly anchorLabels: readonly string[]
}

export interface PresentationAnchor {
  readonly id: string
  readonly label: string
  readonly canonicalName: string
  readonly definition: string
}

export type PresentationSourcePreview = SourceReference

export interface HistoricalAddNote {
  readonly id: string
  readonly label: string
  readonly description: string
}

export interface PresentationSafety {
  readonly educational: string
  readonly presentation: string
}

export interface PresentationIndexModel {
  readonly presentations: readonly PresentationSummary[]
  readonly historical: HistoricalAddNote
  readonly safety: PresentationSafety
}

export interface PresentationDetailModel extends PresentationSummary {
  readonly anchors: readonly PresentationAnchor[]
  readonly sources: readonly PresentationSourcePreview[]
  readonly navigation: readonly PresentationSummary[]
  readonly historical: HistoricalAddNote
  readonly safety: PresentationSafety
}

function textField(fields: Fields, key: string): string {
  const value = fields[key]
  if (typeof value !== 'string') throw new TypeError(`Expected localized string field: ${key}`)
  return value
}

function safetyText(safety: SafetyAccess, locale: Locale, purpose: 'globalEducationalDisclaimer' | 'presentationCaution'): string {
  return textField(safety.getRequired(purpose, locale).localized.fields, 'text')
}

function presentationSummary(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  id: string,
  locale: Locale,
): PresentationSummary {
  const presentation = repository.getPresentation(id)
  const localized = localization.getContent(presentation.contentId, locale)
  return Object.freeze({
    id: presentation.id,
    label: textField(localized.fields, 'label'),
    description: textField(localized.fields, 'description'),
    anchorLabels: Object.freeze(presentation.clinicalAnchorIds.map((anchorId) =>
      textField(localization.getNode(anchorId, locale).fields, 'label'))),
  })
}

function currentPresentations(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  locale: Locale,
): readonly PresentationSummary[] {
  return Object.freeze(repository.presentations
    .filter((presentation) => presentation.status === 'current-formal')
    .map((presentation) => presentationSummary(repository, localization, presentation.id, locale)))
}

function historicalAdd(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  locale: Locale,
): HistoricalAddNote {
  const records = repository.presentations.filter((presentation) => presentation.status === 'historical-only')
  if (records.length !== 1) throw new TypeError('Presentation Education requires exactly one historical-only record')
  const record = records[0]
  if (!record) throw new TypeError('Presentation Education historical record is missing')
  const localized = localization.getContent(record.contentId, locale)
  return Object.freeze({
    id: record.id,
    label: textField(localized.fields, 'label'),
    description: textField(localized.fields, 'description'),
  })
}

function safetyModel(safety: SafetyAccess, locale: Locale): PresentationSafety {
  return Object.freeze({
    educational: safetyText(safety, locale, 'globalEducationalDisclaimer'),
    presentation: safetyText(safety, locale, 'presentationCaution'),
  })
}

export function buildPresentationIndex(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  safety: SafetyAccess,
  locale: Locale,
): PresentationIndexModel {
  return Object.freeze({
    presentations: currentPresentations(repository, localization, locale),
    historical: historicalAdd(repository, localization, locale),
    safety: safetyModel(safety, locale),
  })
}

export function buildPresentationDetail(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  safety: SafetyAccess,
  presentationId: string,
  locale: Locale,
): PresentationDetailModel | null {
  let presentation
  try {
    presentation = repository.getPresentation(presentationId)
  } catch (error) {
    if (error instanceof DomainLookupError && error.code === 'UNKNOWN_PRESENTATION') return null
    throw error
  }
  if (presentation.status !== 'current-formal') return null

  const summary = presentationSummary(repository, localization, presentation.id, locale)
  const anchors = presentation.clinicalAnchorIds.map((anchorId) => {
    const localized = localization.getNode(anchorId, locale)
    return Object.freeze({
      id: anchorId,
      label: textField(localized.fields, 'label'),
      canonicalName: localized.node.canonicalName,
      definition: localized.node.definition,
    })
  })

  return Object.freeze({
    ...summary,
    anchors: Object.freeze(anchors),
    sources: Object.freeze(repository.getSourcesForPresentation(presentation.id)),
    navigation: currentPresentations(repository, localization, locale),
    historical: historicalAdd(repository, localization, locale),
    safety: safetyModel(safety, locale),
  })
}
