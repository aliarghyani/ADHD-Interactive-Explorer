export type DomainErrorCode =
  | 'UNKNOWN_NODE'
  | 'UNKNOWN_EDGE'
  | 'UNKNOWN_BEHAVIOUR'
  | 'UNKNOWN_PATHWAY'
  | 'UNKNOWN_CONTEXT'
  | 'UNKNOWN_PRESENTATION'
  | 'UNKNOWN_EVIDENCE'
  | 'UNKNOWN_SOURCE'
  | 'UNKNOWN_SAFETY'
  | 'UNKNOWN_SAFETY_CONTEXT'
  | 'MISSING_LOCALIZATION'
  | 'UNSUPPORTED_LOCALE'

export class DomainLookupError extends Error {
  override readonly name = 'DomainLookupError'

  constructor(
    readonly code: DomainErrorCode,
    readonly id: string,
  ) {
    super(`${code}: ${id}`)
  }
}
