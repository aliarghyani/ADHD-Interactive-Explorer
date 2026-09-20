import type { SourceReference } from '../../domain'
import type { BidiDirection } from './direction'

export type CitationFieldName = 'authors' | 'title' | 'publication' | 'year' | 'doi' | 'url'

export interface CitationField {
  readonly name: CitationFieldName
  readonly value: string
  readonly dir: BidiDirection
}

/** Keeps bibliography parts structurally separate for direction-safe rendering. */
export function citationFields(source: SourceReference): readonly CitationField[] {
  const fields: CitationField[] = [
    { name: 'authors', value: source.authorsOrOrganization, dir: 'auto' },
    { name: 'title', value: source.title, dir: 'auto' },
    { name: 'publication', value: source.journalOrSeries, dir: 'auto' },
    { name: 'year', value: String(source.year), dir: 'ltr' },
  ]
  if (source.doi) fields.push({ name: 'doi', value: source.doi, dir: 'ltr' })
  if (source.url) fields.push({ name: 'url', value: source.url, dir: 'ltr' })
  return Object.freeze(fields.map((field) => Object.freeze(field)))
}
