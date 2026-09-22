import type { Locale } from '../../domain'
import enKnowledge from '../../knowledge/source/localization/en.json'
import faKnowledge from '../../knowledge/source/localization/fa.json'
import safetyKnowledge from '../../knowledge/source/safety/safety.json'
import { safetyPurposeIds } from '../../safety'

const localizedKnowledge = { en: enKnowledge, fa: faKnowledge } as const

/** Reads the authoritative mandatory safety sentence during SSR/prerender only. */
export function getHomeSafetyText(locale: Locale): string {
  const safetyId = safetyPurposeIds.globalEducationalDisclaimer
  const safetyRecord = safetyKnowledge.safety.find((record) => record.id === safetyId)
  if (!safetyRecord || safetyRecord.contentId !== safetyId || safetyRecord.displayRequirement !== '`mandatory`') {
    throw new Error(`Required Home safety record is invalid: ${safetyId}`)
  }

  const localization = localizedKnowledge[locale].records.find((record) => record.targetId === safetyRecord.contentId)
  const text = localization?.fields.text
  if (typeof text !== 'string' || text.trim().length === 0) {
    throw new Error(`Required Home safety localization is missing: ${locale}/${safetyId}`)
  }
  return text
}
