import type { EvidenceId, EvidenceLevel, EvidenceMetadata } from './types'

export interface CompactEvidenceMetadata {
  readonly id: EvidenceId
  readonly level: EvidenceLevel
  readonly summary: string
  readonly limitations: readonly string[]
  readonly sourceCount: number
}

export function compactEvidenceMetadata(record: EvidenceMetadata): CompactEvidenceMetadata {
  return Object.freeze({
    id: record.id,
    level: record.level,
    summary: record.summary,
    limitations: record.limitations,
    sourceCount: record.sourceIds.length,
  })
}
