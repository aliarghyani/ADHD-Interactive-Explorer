import type { Locale } from '../../domain'

export interface EvidenceCopy {
  readonly metaTitle: string
  readonly kicker: string
  readonly indexTitle: string
  readonly indexSummary: string
  readonly searchLabel: string
  readonly searchPlaceholder: string
  readonly levelLabel: string
  readonly allLevels: string
  readonly resultCount: string
  readonly noResults: string
  readonly sourceCount: string
  readonly openDetail: string
  readonly authoritativeLanguage: string
  readonly backToIndex: string
  readonly backToExploration: string
  readonly detailSummary: string
  readonly evidenceLevel: string
  readonly epistemicContext: string
  readonly constructContext: string
  readonly limitations: string
  readonly sources: string
  readonly sourceType: string
  readonly publicationType: string
  readonly relevance: string
  readonly citationText: string
  readonly authors: string
  readonly title: string
  readonly publication: string
  readonly year: string
  readonly doi: string
  readonly url: string
  readonly openSource: string
  readonly reviewMetadata: string
  readonly lastReviewed: string
  readonly reviewVersion: string
  readonly languageStrategy: string
  readonly invalidTitle: string
  readonly invalidMessage: string
}

export const evidenceCopy = Object.freeze({
  en: {
    metaTitle: 'Evidence and Sources', kicker: 'Evidence / Sources', indexTitle: 'Inspect the support behind the model',
    indexSummary: 'Review qualitative evidence records, their limitations, and the exact sources used by this educational model.',
    searchLabel: 'Search evidence', searchPlaceholder: 'Evidence ID, summary, source title, or construct',
    levelLabel: 'Evidence level', allLevels: 'All qualitative levels', resultCount: 'records shown', noResults: 'No evidence records match these filters.',
    sourceCount: 'supporting sources', openDetail: 'Inspect evidence and sources', authoritativeLanguage: 'The scientific core is preserved in its authoritative language.',
    backToIndex: 'All evidence records', backToExploration: 'Return to exploration', detailSummary: 'What this evidence record concerns',
    evidenceLevel: 'Qualitative evidence level', epistemicContext: 'Epistemic context', constructContext: 'Construct context',
    limitations: 'Limitations', sources: 'Supporting sources', sourceType: 'Source type', publicationType: 'Publication type', relevance: 'Relevance to this record',
    citationText: 'Authoritative citation', authors: 'Authors or organization', title: 'Title', publication: 'Journal or series', year: 'Year', doi: 'DOI', url: 'URL',
    openSource: 'Open the cited source', reviewMetadata: 'Review metadata', lastReviewed: 'Last reviewed', reviewVersion: 'Review version', languageStrategy: 'Language strategy',
    invalidTitle: 'Evidence record not found', invalidMessage: 'This exact canonical Evidence ID is not part of the published evidence set.',
  },
  fa: {
    metaTitle: 'شواهد و منابع', kicker: 'شواهد و منابع', indexTitle: 'پشتوانهٔ مدل را بررسی کنید',
    indexSummary: 'رکوردهای کیفی شواهد، محدودیت‌های آن‌ها و منابع دقیق استفاده‌شده در این مدل آموزشی را مرور کنید.',
    searchLabel: 'جست‌وجوی شواهد', searchPlaceholder: 'شناسه، خلاصه، عنوان منبع یا سازه',
    levelLabel: 'سطح کیفی شواهد', allLevels: 'همهٔ سطوح کیفی', resultCount: 'رکورد نمایش داده می‌شود', noResults: 'هیچ رکوردی با این فیلترها هم‌خوان نیست.',
    sourceCount: 'منبع پشتیبان', openDetail: 'بررسی شواهد و منابع', authoritativeLanguage: 'هستهٔ علمی به زبان معتبر اصلی خود حفظ شده است.',
    backToIndex: 'همهٔ رکوردهای شواهد', backToExploration: 'بازگشت به کاوش', detailSummary: 'این رکورد شواهد دربارهٔ چیست',
    evidenceLevel: 'سطح کیفی شواهد', epistemicContext: 'بافت معرفتی', constructContext: 'بافت سازه',
    limitations: 'محدودیت‌ها', sources: 'منابع پشتیبان', sourceType: 'نوع منبع', publicationType: 'نوع انتشار', relevance: 'ارتباط با این رکورد',
    citationText: 'ارجاع معتبر', authors: 'نویسندگان یا سازمان', title: 'عنوان', publication: 'نشریه یا مجموعه', year: 'سال', doi: 'DOI', url: 'نشانی',
    openSource: 'باز کردن منبع ارجاع‌شده', reviewMetadata: 'فرادادهٔ بازبینی', lastReviewed: 'آخرین بازبینی', reviewVersion: 'نسخهٔ بازبینی', languageStrategy: 'راهبرد زبان',
    invalidTitle: 'رکورد شواهد پیدا نشد', invalidMessage: 'این شناسهٔ دقیق Evidence در مجموعهٔ منتشرشده وجود ندارد.',
  },
} satisfies Readonly<Record<Locale, EvidenceCopy>>)
