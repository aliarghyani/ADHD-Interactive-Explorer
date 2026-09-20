import type { ConceptCategory, Locale, RelationshipType } from '../../domain'

export interface LocalizedSemanticText {
  readonly en: string
  readonly fa: string
}

export interface CategoryVisualToken {
  readonly className: string
  readonly label: LocalizedSemanticText
  readonly secondaryLabel: LocalizedSemanticText
  readonly showEvidenceOnNode: boolean
  readonly fixedEvidenceLabel?: LocalizedSemanticText
}

export interface RelationshipVisualToken {
  readonly className: string
  readonly label: LocalizedSemanticText
  readonly description: LocalizedSemanticText
  readonly lineStyle: 'dashed' | 'solid' | 'long-dash'
  readonly marker: 'directional' | 'feedback'
}

export const categoryVisualTokens: Readonly<Record<ConceptCategory, CategoryVisualToken>> = Object.freeze({
  'clinical-anchor': {
    className: 'category-clinical-anchor',
    label: { en: 'Clinical anchor', fa: 'لنگر بالینی' },
    secondaryLabel: { en: 'Formal diagnostic domain', fa: 'حوزه رسمی تشخیصی' },
    showEvidenceOnNode: true,
    fixedEvidenceLabel: { en: 'CLINICAL', fa: 'بالینی' },
  },
  context: {
    className: 'category-context',
    label: { en: 'Context', fa: 'بافت' },
    secondaryLabel: { en: 'Context modifier', fa: 'تعدیل‌کننده بافت' },
    showEvidenceOnNode: true,
  },
  regulation: {
    className: 'category-regulation',
    label: { en: 'Regulation', fa: 'تنظیم' },
    secondaryLabel: { en: 'Associated explanatory process', fa: 'فرایند توضیحی مرتبط' },
    showEvidenceOnNode: true,
  },
  behaviour: {
    className: 'category-behaviour',
    label: { en: 'Observable behaviour', fa: 'رفتار مشاهده‌پذیر' },
    secondaryLabel: { en: 'Observable behaviour', fa: 'رفتار مشاهده‌پذیر' },
    showEvidenceOnNode: false,
  },
  pattern: {
    className: 'category-pattern',
    label: { en: 'Recurring pattern', fa: 'الگوی تکرارشونده' },
    secondaryLabel: { en: 'Repeated pattern', fa: 'الگوی تکرارشونده در زمان' },
    showEvidenceOnNode: true,
  },
  'functional-domain': {
    className: 'category-functional-domain',
    label: { en: 'Functional domain', fa: 'حوزه عملکردی' },
    secondaryLabel: { en: 'Area of life', fa: 'حوزه‌ای از زندگی' },
    showEvidenceOnNode: false,
  },
})

export const relationshipVisualTokens: Readonly<Record<RelationshipType, RelationshipVisualToken>> = Object.freeze({
  MODULATES: {
    className: 'relationship-modulates',
    label: { en: 'Modulates', fa: 'تعدیل می‌کند' },
    description: {
      en: 'This context can change how demanding or stable this process is.',
      fa: 'این بافت می‌تواند میزان دشواری یا پایداری این فرایند را تغییر دهد.',
    },
    lineStyle: 'dashed',
    marker: 'directional',
  },
  CONTRIBUTES_TO: {
    className: 'relationship-contributes-to',
    label: { en: 'Contributes to', fa: 'می‌تواند نقش داشته باشد' },
    description: {
      en: 'This factor may contribute, but it is neither necessary nor sufficient.',
      fa: 'این عامل ممکن است نقش داشته باشد، اما نه ضروری است و نه به‌تنهایی کافی.',
    },
    lineStyle: 'solid',
    marker: 'directional',
  },
  FEEDBACK_WITH: {
    className: 'relationship-feedback-with',
    label: { en: 'Feedback with', fa: 'بازخورد متقابل با' },
    description: {
      en: 'These factors can influence each other over time, creating a recurring loop.',
      fa: 'این عوامل می‌توانند در طول زمان بر یکدیگر اثر بگذارند و چرخه‌ای تکرارشونده بسازند.',
    },
    lineStyle: 'long-dash',
    marker: 'feedback',
  },
})

export function semanticText(text: LocalizedSemanticText, locale: Locale): string {
  return text[locale]
}
