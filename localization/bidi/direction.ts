export type BidiContentKind = 'natural-text' | 'canonical-term' | 'identifier' | 'doi' | 'url'
export type BidiDirection = 'auto' | 'ltr'

const ltrKinds: ReadonlySet<BidiContentKind> = new Set([
  'canonical-term',
  'identifier',
  'doi',
  'url',
])

/** Attributes intended for a semantic <bdi> boundary. */
export function bidiDirectionFor(kind: BidiContentKind): BidiDirection {
  return ltrKinds.has(kind) ? 'ltr' : 'auto'
}
