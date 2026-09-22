import { DomainLookupError } from '../../domain'
import type { EvidenceLevel, EvidenceMetadata, KnowledgeRepository, Locale, SourceReference } from '../../domain'
import { citationFields, type CitationField } from '../../localization'
import type { SafetyAccess } from '../../safety'

export interface EvidenceIndexItem {
  readonly id: EvidenceMetadata['id']
  readonly level: EvidenceLevel
  readonly epistemicStatus: string
  readonly constructStatus: string
  readonly summary: string
  readonly sourceCount: number
  readonly searchableSourceText: string
}

export interface NormalizedSource {
  readonly id: SourceReference['id']
  readonly sourceType: string
  readonly publicationType: string
  readonly relevanceNote: string
  readonly citationText: string
  readonly url: string
  readonly fields: readonly CitationField[]
}

export interface EvidenceDetailModel extends EvidenceMetadata {
  readonly sources: readonly NormalizedSource[]
  readonly groupLevelCaution: string
}

function textField(fields: Readonly<Record<string, string | readonly string[]>>, name: string): string {
  const value = fields[name]
  if (typeof value !== 'string') throw new TypeError(`Missing localized field: ${name}`)
  return value
}

export function evidenceDisplayName(id: string): string {
  return id.replace(/^EVID_/, '').split('_').map((part) => part.charAt(0) + part.slice(1).toLowerCase()).join(' ')
}

export function readableEvidenceContext(value: string): string {
  const normalized = value.replaceAll('`', '').trim().replaceAll('-', ' ')
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

export function normalizeSourceReference(source: SourceReference): NormalizedSource {
  return Object.freeze({
    id: source.id,
    sourceType: source.sourceType,
    publicationType: source.publicationType,
    relevanceNote: source.relevanceNote,
    citationText: source.citationText,
    url: source.url,
    fields: citationFields(source).filter((field) => field.value.trim().length > 0),
  })
}

export function buildEvidenceIndex(repository: KnowledgeRepository): readonly EvidenceIndexItem[] {
  return Object.freeze(repository.evidence.map((record) => {
    const sources = repository.getSourcesForEvidence(record.id)
    return Object.freeze({
      id: record.id,
      level: record.level,
      epistemicStatus: record.epistemicStatus,
      constructStatus: record.constructStatus,
      summary: record.summary,
      sourceCount: sources.length,
      searchableSourceText: sources.map((source) => `${source.id} ${source.title}`).join(' '),
    })
  }))
}

export function buildEvidenceDetail(
  repository: KnowledgeRepository,
  safety: SafetyAccess,
  evidenceId: string,
  locale: Locale,
): EvidenceDetailModel | null {
  let record
  try {
    record = repository.getEvidence(evidenceId)
  } catch (error) {
    if (error instanceof DomainLookupError && error.code === 'UNKNOWN_EVIDENCE') return null
    throw error
  }
  return Object.freeze({
    ...record,
    sources: Object.freeze(repository.getSourcesForEvidence(record.id).map(normalizeSourceReference)),
    groupLevelCaution: textField(safety.getRequired('groupLevelEvidenceCaution', locale).localized.fields, 'text'),
  })
}

export function safeEvidenceReturnTarget(value: unknown, locale: Locale): string | null {
  if (typeof value !== 'string' || !value.startsWith(`/${locale}/`)) return null
  return [`/${locale}/behaviours`, `/${locale}/context`, `/${locale}/presentations`, `/${locale}/map`]
    .some((prefix) => value === prefix || value.startsWith(`${prefix}/`) || value.startsWith(`${prefix}?`)) ? value : null
}
