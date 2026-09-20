import type { Locale } from '../domain'
import { isSupportedLocale } from './locales'

export class LocaleRouteError extends Error {
  override readonly name = 'LocaleRouteError'
}

/**
 * Changes only the leading locale segment. The rest of the route, including a
 * canonical entity ID, query, and hash, remains byte-for-byte unchanged.
 */
export function switchLocaleInPath(path: string, targetLocale: Locale): string {
  const match = path.match(/^\/(en|fa)(?=\/|\?|#|$)/)
  if (!match || !isSupportedLocale(match[1] ?? '')) {
    throw new LocaleRouteError(`Route must start with a supported locale: ${path}`)
  }
  return `/${targetLocale}${path.slice(match[0].length)}`
}
