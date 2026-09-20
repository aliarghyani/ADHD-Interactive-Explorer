import type { Locale } from '../../domain'

export interface SystemMapCopy {
  readonly metaTitle: string
  readonly kicker: string
  readonly title: string
  readonly introduction: string
  readonly languageNavigation: string
  readonly layers: string
  readonly showLayer: string
  readonly mapHeading: string
  readonly explanatoryNetwork: string
  readonly clinicalRegion: string
  readonly clinicalRegionNote: string
  readonly resetView: string
  readonly zoomIn: string
  readonly zoomOut: string
  readonly legend: string
  readonly details: string
  readonly selectPrompt: string
  readonly overview: string
  readonly relationships: string
  readonly scientificExplanation: string
  readonly evidenceEntry: string
  readonly evidenceRecords: string
  readonly incoming: string
  readonly outgoing: string
  readonly none: string
  readonly close: string
  readonly invalidTitle: string
  readonly invalidMessage: string
  readonly backToMap: string
  readonly rendererUnavailable: string
  readonly mobileTitle: string
  readonly mobileMessage: string
  readonly loading: string
}

export const systemMapCopy = Object.freeze({
  en: {
    metaTitle: 'ADHD System Map',
    kicker: 'ADHD Interactive Explorer',
    title: 'Explore the system map',
    introduction: 'See how context, regulation, observable behaviour, recurring patterns, and areas of life can relate without treating the map as a diagnosis or prediction.',
    languageNavigation: 'Language',
    layers: 'Visible layers',
    showLayer: 'Show layer',
    mapHeading: 'Explanatory network',
    explanatoryNetwork: 'Explanatory network',
    clinicalRegion: 'Clinical definition of ADHD',
    clinicalRegionNote: 'Formal diagnostic definition — separate from the explanatory network',
    resetView: 'Reset view',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    legend: 'Visual legend',
    details: 'Concept details',
    selectPrompt: 'Select a concept to see its direct relationships and educational detail.',
    overview: 'Overview',
    relationships: 'Direct relationships',
    scientificExplanation: 'Scientific explanation',
    evidenceEntry: 'Evidence entry point',
    evidenceRecords: 'linked evidence record(s)',
    incoming: 'Incoming',
    outgoing: 'Outgoing',
    none: 'None in the canonical graph',
    close: 'Close details',
    invalidTitle: 'Concept not found',
    invalidMessage: 'This canonical node ID is not part of the published map.',
    backToMap: 'Return to the full map',
    rendererUnavailable: 'The visual map could not load. The educational heading and safety guidance remain available.',
    mobileTitle: 'A focused mobile map is coming in a later work package',
    mobileMessage: 'This desktop graph is intentionally not compressed into a phone-sized diagram. Use a tablet or desktop for this map.',
    loading: 'Loading visual map…',
  },
  fa: {
    metaTitle: 'نقشه سامانه ADHD',
    kicker: 'کاوشگر تعاملی ADHD',
    title: 'کاوش در نقشه سامانه',
    introduction: 'رابطه احتمالی میان بافت، تنظیم، رفتار مشاهده‌پذیر، الگوهای تکرارشونده و حوزه‌های زندگی را ببینید؛ بدون اینکه این نقشه ابزار تشخیص یا پیش‌بینی تلقی شود.',
    languageNavigation: 'زبان',
    layers: 'لایه‌های نمایان',
    showLayer: 'نمایش لایه',
    mapHeading: 'شبکه توضیحی',
    explanatoryNetwork: 'شبکه توضیحی',
    clinicalRegion: 'تعریف بالینی ADHD',
    clinicalRegionNote: 'تعریف رسمی تشخیصی — جدا از شبکه توضیحی',
    resetView: 'بازنشانی نما',
    zoomIn: 'بزرگ‌نمایی',
    zoomOut: 'کوچک‌نمایی',
    legend: 'راهنمای دیداری',
    details: 'جزئیات مفهوم',
    selectPrompt: 'یک مفهوم را انتخاب کنید تا رابطه‌های مستقیم و توضیح آموزشی آن را ببینید.',
    overview: 'مرور کلی',
    relationships: 'رابطه‌های مستقیم',
    scientificExplanation: 'توضیح علمی',
    evidenceEntry: 'ورودی شواهد',
    evidenceRecords: 'رکورد شواهد پیوندخورده',
    incoming: 'ورودی',
    outgoing: 'خروجی',
    none: 'در گراف معیار موردی وجود ندارد',
    close: 'بستن جزئیات',
    invalidTitle: 'مفهوم پیدا نشد',
    invalidMessage: 'این شناسه معیار در نقشه منتشرشده وجود ندارد.',
    backToMap: 'بازگشت به نقشه کامل',
    rendererUnavailable: 'نقشه دیداری بارگیری نشد. عنوان آموزشی و راهنمای ایمنی همچنان در دسترس است.',
    mobileTitle: 'نقشه متمرکز موبایل در بسته کاری بعدی ارائه می‌شود',
    mobileMessage: 'این گراف دسکتاپ عمداً به نموداری کوچک برای تلفن تبدیل نشده است. برای دیدن این نقشه از تبلت یا دسکتاپ استفاده کنید.',
    loading: 'در حال بارگیری نقشه دیداری…',
  },
} satisfies Readonly<Record<Locale, SystemMapCopy>>)
