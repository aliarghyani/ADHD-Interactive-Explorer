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
  readonly graphDescription: string
  readonly graphKeyboardInstructions: string
  readonly explanatoryNetwork: string
  readonly clinicalRegion: string
  readonly clinicalRegionNote: string
  readonly resetView: string
  readonly zoomIn: string
  readonly zoomOut: string
  readonly legend: string
  readonly details: string
  readonly relationshipBrowser: string
  readonly semanticDescription: string
  readonly selectedConcept: string
  readonly upstream: string
  readonly downstream: string
  readonly feedback: string
  readonly showInGraph: string
  readonly clinicalSeparation: string
  readonly relationshipEvidence: string
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
  readonly exploreBehaviour: string
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
    graphDescription: 'An educational conceptual map. Formal clinical domains are separated from the context, regulation, behaviour, pattern, and function explanatory network.',
    graphKeyboardInstructions: 'Use Tab to enter the map, arrow keys to move geometrically, and Enter or Space to select the focused concept. Press Escape to close the selected detail.',
    explanatoryNetwork: 'Explanatory network',
    clinicalRegion: 'Clinical definition of ADHD',
    clinicalRegionNote: 'Formal diagnostic definition — separate from the explanatory network',
    resetView: 'Reset view',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    legend: 'Visual legend',
    details: 'Concept details',
    relationshipBrowser: 'Semantic relationship browser',
    semanticDescription: 'A non-spatial view of the selected concept and its direct canonical relationships.',
    selectedConcept: 'Selected concept',
    upstream: 'Upstream relationships',
    downstream: 'Downstream relationships',
    feedback: 'Feedback relationships',
    showInGraph: 'Show in graph',
    clinicalSeparation: 'CA1 and CA2 are formal clinical domains. They are separate from the Context → Regulation → Behaviour → Pattern → Function explanatory network.',
    relationshipEvidence: 'linked evidence record(s) for this relationship',
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
    rendererUnavailable: 'The visual map could not load. Use the semantic relationship browser to continue exploring the selected concept and its relationships.',
    mobileTitle: 'A focused mobile map is coming in a later work package',
    mobileMessage: 'This desktop graph is intentionally not compressed into a phone-sized diagram. Use a tablet or desktop for this map.',
    loading: 'Loading visual map…',
    exploreBehaviour: 'Explore this Behaviour in plain language',
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
    graphDescription: 'یک نقشه مفهومی آموزشی. حوزه‌های رسمی بالینی از شبکه توضیحی بافت، تنظیم، رفتار، الگو و عملکرد جدا هستند.',
    graphKeyboardInstructions: 'با Tab وارد نقشه شوید، با کلیدهای جهت‌نما بر اساس موقعیت دیداری حرکت کنید و با Enter یا فاصله مفهوم متمرکز را انتخاب کنید. Escape جزئیات انتخاب‌شده را می‌بندد.',
    explanatoryNetwork: 'شبکه توضیحی',
    clinicalRegion: 'تعریف بالینی ADHD',
    clinicalRegionNote: 'تعریف رسمی تشخیصی — جدا از شبکه توضیحی',
    resetView: 'بازنشانی نما',
    zoomIn: 'بزرگ‌نمایی',
    zoomOut: 'کوچک‌نمایی',
    legend: 'راهنمای دیداری',
    details: 'جزئیات مفهوم',
    relationshipBrowser: 'مرورگر معنایی رابطه‌ها',
    semanticDescription: 'نمایی غیرفضایی از مفهوم انتخاب‌شده و رابطه‌های مستقیم معیار آن.',
    selectedConcept: 'مفهوم انتخاب‌شده',
    upstream: 'رابطه‌های بالادست',
    downstream: 'رابطه‌های پایین‌دست',
    feedback: 'رابطه‌های بازخوردی',
    showInGraph: 'نمایش در گراف',
    clinicalSeparation: 'CA1 و CA2 حوزه‌های رسمی بالینی هستند. این دو از شبکه توضیحی بافت ← تنظیم ← رفتار ← الگو ← عملکرد جدا هستند.',
    relationshipEvidence: 'رکورد شواهد پیوندخورده برای این رابطه',
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
    rendererUnavailable: 'نقشه دیداری بارگیری نشد. برای ادامه کاوش در مفهوم انتخاب‌شده و رابطه‌های آن از مرورگر معنایی رابطه‌ها استفاده کنید.',
    mobileTitle: 'نقشه متمرکز موبایل در بسته کاری بعدی ارائه می‌شود',
    mobileMessage: 'این گراف دسکتاپ عمداً به نموداری کوچک برای تلفن تبدیل نشده است. برای دیدن این نقشه از تبلت یا دسکتاپ استفاده کنید.',
    loading: 'در حال بارگیری نقشه دیداری…',
    exploreBehaviour: 'این رفتار را با زبان ساده کاوش کنید',
  },
} satisfies Readonly<Record<Locale, SystemMapCopy>>)
