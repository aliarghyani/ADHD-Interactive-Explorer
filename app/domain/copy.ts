import type { Category, Locale, RelationshipType } from './spike-types'

export const copy = {
  en: {
    title: 'ADHD Interactive Explorer — renderer validation spike',
    description: 'A small educational map testing a fixed-coordinate Vue and SVG rendering architecture.',
    safety: 'Educational information only. This spike does not diagnose ADHD or replace professional care.',
    clinicalHeading: 'Formal Clinical Anchor',
    clinicalNote: 'Clinically important, but intentionally separate from the explanatory pathway.',
    graphHeading: 'Visual relationship map',
    graphUnavailable: 'The visual map is unavailable. The relationship browser below remains fully usable.',
    selectPrompt: 'Select a concept to inspect its direct relationships.',
    invalid: 'The requested concept ID is not part of this validation fixture.',
    back: 'Open the map without a selection',
    selected: 'Selected concept',
    upstream: 'Upstream relationships',
    downstream: 'Downstream relationships',
    feedback: 'Feedback relationships',
    none: 'None in this fixture',
    reset: 'Reset view',
    simulateFailure: 'Simulate graph failure',
    restoreGraph: 'Restore visual graph',
    mixed: 'This map separates clinical ADHD terms from explanatory relationships.',
  },
  fa: {
    title: 'کاوشگر تعاملی ADHD — نمونهٔ اعتبارسنجی نمایشگر',
    description: 'یک نقشهٔ آموزشی کوچک برای آزمودن معماری Vue و SVG با مختصات ثابت.',
    safety: 'فقط برای آموزش است. این نمونه ADHD را تشخیص نمی‌دهد و جایگزین مراقبت حرفه‌ای نیست.',
    clinicalHeading: 'لنگر رسمی بالینی',
    clinicalNote: 'از نظر بالینی مهم است، اما عمداً از مسیر توضیحی جدا نگه داشته شده است.',
    graphHeading: 'نقشهٔ دیداری روابط',
    graphUnavailable: 'نقشهٔ دیداری در دسترس نیست. مرورگر روابط زیر همچنان کاملاً قابل استفاده است.',
    selectPrompt: 'برای بررسی روابط مستقیم، یک مفهوم را انتخاب کنید.',
    invalid: 'شناسهٔ درخواستی بخشی از این دادهٔ اعتبارسنجی نیست.',
    back: 'باز کردن نقشه بدون انتخاب',
    selected: 'مفهوم انتخاب‌شده',
    upstream: 'روابط بالادستی',
    downstream: 'روابط پایین‌دستی',
    feedback: 'روابط بازخوردی',
    none: 'در این داده موردی نیست',
    reset: 'بازنشانی نما',
    simulateFailure: 'شبیه‌سازی خرابی نمودار',
    restoreGraph: 'بازگرداندن نمودار دیداری',
    mixed: 'این نقشه اصطلاح بالینی ADHD را از روابط توضیحی جدا می‌کند.',
  },
} satisfies Record<Locale, Record<string, string>>

export const categoryLabels: Record<Locale, Record<Category, string>> = {
  en: {
    'clinical-anchor': 'Clinical Anchor', context: 'Context', regulation: 'Regulation', behaviour: 'Behaviour', pattern: 'Pattern', 'functional-domain': 'Functional Domain',
  },
  fa: {
    'clinical-anchor': 'لنگر بالینی', context: 'بافت', regulation: 'تنظیم', behaviour: 'رفتار', pattern: 'الگو', 'functional-domain': 'حوزهٔ عملکردی',
  },
}

export const relationshipLabels: Record<Locale, Record<RelationshipType, string>> = {
  en: { MODULATES: 'Modulates', CONTRIBUTES_TO: 'Contributes to', FEEDBACK_WITH: 'Feedback with' },
  fa: { MODULATES: 'تعدیل می‌کند', CONTRIBUTES_TO: 'سهم دارد در', FEEDBACK_WITH: 'بازخورد با' },
}
