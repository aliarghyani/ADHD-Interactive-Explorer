import type { Locale } from '../domain'

/** Locale is intentionally ignored: scientific geometry has one identity. */
export function geometryForLocale<T>(artifact: T, _locale: Locale): T {
  return artifact
}
