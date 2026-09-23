import type { Locale } from '../../domain'

export interface SystemMapCopy {
  readonly metaTitle: string
  readonly kicker: string
  readonly title: string
  readonly introduction: string
  readonly safetyHeading: string
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
  readonly inspectEvidence: string
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
  readonly mobileManyToMany: string
  readonly mobileHowToStart: string
  readonly browseByLayer: string
  readonly chooseConcept: string
  readonly focusedPath: string
  readonly currentConceptAnnouncement: string
  readonly startOver: string
  readonly upstreamQuestion: string
  readonly downstreamQuestion: string
  readonly feedbackQuestion: string
  readonly scientificDirection: string
  readonly reciprocalDirection: string
  readonly feedbackCaution: string
  readonly educationalExplanation: string
  readonly moreDetail: string
  readonly evidenceAvailable: string
  readonly evidenceUnavailable: string
  readonly nextActions: string
  readonly methodologyAction: string
  readonly conceptCount: string
  readonly loading: string
  readonly exploreBehaviour: string
  readonly exploreContext: string
}

export const systemMapCopy = Object.freeze({
  en: {
    metaTitle: 'ADHD System Map',
    kicker: 'ADHD Interactive Explorer',
    title: 'Explore the system map',
    introduction: 'See how context, regulation, observable behaviour, recurring patterns, and areas of life can relate without treating the map as a diagnosis or prediction.',
    safetyHeading: 'Educational safety information',
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
    inspectEvidence: 'Inspect this evidence record',
    incoming: 'Incoming',
    outgoing: 'Outgoing',
    none: 'None in the canonical graph',
    close: 'Close details',
    invalidTitle: 'Concept not found',
    invalidMessage: 'This canonical node ID is not part of the published map.',
    backToMap: 'Return to the full map',
    rendererUnavailable: 'The visual map could not load. Use the semantic relationship browser to continue exploring the selected concept and its relationships.',
    mobileTitle: 'Explore one concept at a time',
    mobileMessage: 'The layers organize formal clinical domains, contexts, regulation processes, observable behaviours, recurring patterns, and areas of life. The Clinical Anchor remains separate from the explanatory network.',
    mobileManyToMany: 'Relationships are many-to-many: a concept can connect with several possible influences and outcomes.',
    mobileHowToStart: 'Choose a layer, then choose a canonical concept. You can move through direct relationships without operating a spatial graph.',
    browseByLayer: 'Browse concepts by layer',
    chooseConcept: 'Choose a concept',
    focusedPath: 'Focused-path navigator',
    currentConceptAnnouncement: 'Current concept',
    startOver: 'Start over',
    upstreamQuestion: 'What may influence this?',
    downstreamQuestion: 'What may follow from this?',
    feedbackQuestion: 'Which relationships may recur in both directions?',
    scientificDirection: 'Scientific direction',
    reciprocalDirection: 'Reciprocal relationship',
    feedbackCaution: 'Feedback describes a reciprocal or recurrent conceptual relationship. It does not imply inevitability, prognosis, or guaranteed worsening.',
    educationalExplanation: 'Educational explanation',
    moreDetail: 'More scientific detail',
    evidenceAvailable: 'Evidence is available',
    evidenceUnavailable: 'No optional evidence record is linked to this concept.',
    nextActions: 'Continue exploring',
    methodologyAction: 'How to interpret this model',
    conceptCount: 'concepts',
    loading: 'Loading visual map…',
    exploreBehaviour: 'Explore this Behaviour in plain language',
    exploreContext: 'Explore how this Context may affect functioning',
  },
  fa: {
    metaTitle: 'نقشه سامانه ADHD',
    kicker: 'کاوشگر تعاملی ADHD',
    title: 'کاوش در نقشه سامانه',
    introduction: 'رابطه احتمالی میان بافت، تنظیم، رفتار مشاهده‌پذیر، الگوهای تکرارشونده و حوزه‌های زندگی را ببینید؛ بدون اینکه این نقشه ابزار تشخیص یا پیش‌بینی تلقی شود.',
    safetyHeading: 'اطلاعات ایمنی آموزشی',
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
    inspectEvidence: 'بررسی این رکورد شواهد',
    incoming: 'ورودی',
    outgoing: 'خروجی',
    none: 'در گراف معیار موردی وجود ندارد',
    close: 'بستن جزئیات',
    invalidTitle: 'مفهوم پیدا نشد',
    invalidMessage: 'این شناسه معیار در نقشه منتشرشده وجود ندارد.',
    backToMap: 'بازگشت به نقشه کامل',
    rendererUnavailable: 'نقشه دیداری بارگیری نشد. برای ادامه کاوش در مفهوم انتخاب‌شده و رابطه‌های آن از مرورگر معنایی رابطه‌ها استفاده کنید.',
    mobileTitle: 'هر بار یک مفهوم را کاوش کنید',
    mobileMessage: 'لایه‌ها حوزه‌های رسمی بالینی، بافت‌ها، فرایندهای تنظیم، رفتارهای مشاهده‌پذیر، الگوهای تکرارشونده و حوزه‌های زندگی را سازمان می‌دهند. لنگر بالینی از شبکه توضیحی جدا می‌ماند.',
    mobileManyToMany: 'رابطه‌ها چندبه‌چند هستند: یک مفهوم می‌تواند با چند اثرگذار یا پیامد احتمالی ارتباط داشته باشد.',
    mobileHowToStart: 'یک لایه و سپس یک مفهوم معیار را انتخاب کنید. بدون کار با گراف فضایی می‌توانید میان رابطه‌های مستقیم حرکت کنید.',
    browseByLayer: 'مرور مفهوم‌ها بر اساس لایه',
    chooseConcept: 'انتخاب یک مفهوم',
    focusedPath: 'راهبر مسیر متمرکز',
    currentConceptAnnouncement: 'مفهوم کنونی',
    startOver: 'شروع دوباره',
    upstreamQuestion: 'چه چیزهایی ممکن است بر این مفهوم اثر بگذارند؟',
    downstreamQuestion: 'چه چیزهایی ممکن است پس از این مفهوم دیده شوند؟',
    feedbackQuestion: 'کدام رابطه‌ها ممکن است در هر دو جهت تکرار شوند؟',
    scientificDirection: 'جهت علمی رابطه',
    reciprocalDirection: 'رابطه دوسویه',
    feedbackCaution: 'بازخورد یک رابطه مفهومی دوسویه یا تکرارشونده را توصیف می‌کند و به معنای اجتناب‌ناپذیری، پیش‌آگهی یا بدترشدن قطعی نیست.',
    educationalExplanation: 'توضیح آموزشی',
    moreDetail: 'جزئیات علمی بیشتر',
    evidenceAvailable: 'شواهد در دسترس است',
    evidenceUnavailable: 'رکورد شواهد اختیاری به این مفهوم پیوند نشده است.',
    nextActions: 'ادامه کاوش',
    methodologyAction: 'راهنمای تفسیر این مدل',
    conceptCount: 'مفهوم',
    loading: 'در حال بارگیری نقشه دیداری…',
    exploreBehaviour: 'این رفتار را با زبان ساده کاوش کنید',
    exploreContext: 'بررسی کنید این بافت چگونه ممکن است بر عملکرد اثر بگذارد',
  },
} satisfies Readonly<Record<Locale, SystemMapCopy>>)
