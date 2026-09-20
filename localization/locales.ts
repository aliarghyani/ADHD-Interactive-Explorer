import type { Locale } from '../domain'

export const supportedLocales = ['en', 'fa'] as const satisfies readonly Locale[]

export type DocumentDirection = 'ltr' | 'rtl'

export function isSupportedLocale(value: string): value is Locale {
  return supportedLocales.some((locale) => locale === value)
}

export function documentAttributesForLocale(locale: Locale): Readonly<{
  lang: Locale
  dir: DocumentDirection
}> {
  return Object.freeze({ lang: locale, dir: locale === 'fa' ? 'rtl' : 'ltr' })
}
