import type { Locale } from '../../domain'

export interface AboutContent {
  metaTitle: string
  metaDescription: string
  kicker: string
  title: string
  summary: string
  purposeTitle: string
  purpose: readonly string[]
  exploreTitle: string
  experiences: readonly { title: string, description: string, href: string }[]
  evidenceTitle: string
  evidence: string
  evidenceLink: string
  boundariesTitle: string
  boundaries: readonly string[]
  languageTitle: string
  language: string
  stateTitle: string
  state: string
  disclaimerTitle: string
  supportingTitle: string
  methodologyLink: string
  presentationsLink: string
}

const make = (locale: Locale): AboutContent => locale === 'en' ? {
  metaTitle: 'About | ADHD Interactive Explorer',
  metaDescription: 'What the ADHD Interactive Explorer is for, what you can explore, and its educational and non-diagnostic boundaries.',
  kicker: 'About the Explorer', title: 'Understand connections without turning them into a profile',
  summary: 'The ADHD Interactive Explorer is a bilingual educational product for non-specialists who want a clearer mental model of ADHD-related terminology, context, processes, observable experience, and evidence.',
  purposeTitle: 'What this product does',
  purpose: ['It separates formal clinical terminology from a wider explanatory network.', 'It helps users explore Context, Regulation, Behaviour, recurring Patterns, Functional Domains, Feedback, formal presentations, and scientific Evidence.', 'It preserves multiple possible pathways and alternative contributors instead of selecting one personal explanation.'],
  exploreTitle: 'Four primary ways to explore',
  experiences: [
    { title: 'System Map', description: 'See the complete conceptual network and relationship types.', href: 'map' },
    { title: 'Behaviour Explorer', description: 'Start with an observable behaviour and inspect several possible pathways.', href: 'behaviours' },
    { title: 'Context & Feedback Explorer', description: 'Explore how situations may change demands and participate in feedback.', href: 'context' },
    { title: 'Presentation Education', description: 'Learn current formal presentation terminology separately from the explanatory network.', href: 'presentations' },
  ],
  evidenceTitle: 'Evidence and sources', evidence: 'Canonical Evidence records expose qualitative strength, epistemic and construct status, limitations, review metadata, and links to SourceReference records. They support transparency; they do not convert group findings into personal conclusions.', evidenceLink: 'Browse Evidence / Sources',
  boundariesTitle: 'What it does not do', boundaries: ['Diagnosis or screening', 'Symptom scoring or ADHD likelihood', 'Presentation prediction', 'Treatment recommendations', 'Individualized medical assessment', 'Build an ADHD profile or personal clinical history'],
  languageTitle: 'Language and access', language: 'The product provides complete English and Persian routes, supports right-to-left reading, keyboard navigation, visible focus, semantic page structure, and alternatives to spatial graph interpretation.',
  stateTitle: 'Exploration is not a record', state: 'The current product architecture does not create an ADHD profile, Behaviour history, Context profile, inferred presentation, or personal clinical record. This is a bounded implementation fact, not a broader claim about every aspect of deployment or data policy.',
  disclaimerTitle: 'Educational boundary', supportingTitle: 'Learn more', methodologyLink: 'How this model works', presentationsLink: 'Presentation terminology and historical ADD',
} : {
  metaTitle: 'درباره | کاوشگر تعاملی ADHD',
  metaDescription: 'هدف کاوشگر تعاملی ADHD، مسیرهای کاوش و مرزهای آموزشی و غیرتشخیصی آن.',
  kicker: 'درباره کاوشگر', title: 'درک ارتباط‌ها، بدون تبدیل آن‌ها به پروفایل',
  summary: 'کاوشگر تعاملی ADHD یک محصول آموزشی دوزبانه برای افراد غیرمتخصص است که می‌خواهند مدل ذهنی روشن‌تری از اصطلاحات مرتبط با ADHD، زمینه، فرایندها، تجربه قابل مشاهده و شواهد داشته باشند.',
  purposeTitle: 'این محصول چه می‌کند',
  purpose: ['اصطلاحات رسمی بالینی را از شبکه توضیحی گسترده‌تر جدا می‌کند.', 'امکان کاوش Context، Regulation، Behaviour، Patternهای تکرارشونده، Functional Domainها، Feedback، presentationهای رسمی و Evidence علمی را فراهم می‌کند.', 'به‌جای انتخاب یک توضیح شخصی، چند مسیر احتمالی و عوامل جایگزین را حفظ می‌کند.'],
  exploreTitle: 'چهار مسیر اصلی کاوش',
  experiences: [
    { title: 'نقشه سیستم', description: 'مشاهده شبکه مفهومی کامل و انواع رابطه‌ها.', href: 'map' },
    { title: 'کاوشگر رفتار', description: 'شروع از یک Behaviour قابل مشاهده و بررسی چند مسیر احتمالی.', href: 'behaviours' },
    { title: 'کاوشگر زمینه و بازخورد', description: 'بررسی اینکه موقعیت‌ها چگونه ممکن است تقاضاها را تغییر دهند و در Feedback نقش داشته باشند.', href: 'context' },
    { title: 'آموزش نمودهای بالینی', description: 'یادگیری اصطلاحات رسمی presentation، جدا از شبکه توضیحی.', href: 'presentations' },
  ],
  evidenceTitle: 'شواهد و منابع', evidence: 'رکوردهای canonical شواهد، قدرت کیفی، وضعیت معرفتی و سازه، محدودیت‌ها، فراداده بازبینی و پیوندهای SourceReference را نشان می‌دهند. این شفافیت، یافته‌های سطح گروه را به نتیجه شخصی تبدیل نمی‌کند.', evidenceLink: 'مرور شواهد و منابع',
  boundariesTitle: 'چه کارهایی انجام نمی‌دهد', boundaries: ['تشخیص یا غربالگری', 'امتیازدهی علائم یا محاسبه احتمال ADHD', 'پیش‌بینی presentation', 'توصیه درمانی', 'ارزیابی پزشکی شخصی', 'ساخت پروفایل ADHD یا تاریخچه بالینی شخصی'],
  languageTitle: 'زبان و دسترسی', language: 'محصول مسیرهای کامل انگلیسی و فارسی، خواندن راست‌به‌چپ، پیمایش با صفحه‌کلید، تمرکز دیداری، ساختار معنایی صفحه و جایگزین‌هایی برای تفسیر فضایی نمودار فراهم می‌کند.',
  stateTitle: 'کاوش، پرونده نیست', state: 'معماری فعلی محصول، پروفایل ADHD، تاریخچه Behaviour، پروفایل Context، presentation استنباط‌شده یا پرونده بالینی شخصی ایجاد نمی‌کند. این یک واقعیت محدود درباره پیاده‌سازی است، نه ادعایی کلی درباره همه جنبه‌های استقرار یا سیاست داده.',
  disclaimerTitle: 'مرز آموزشی', supportingTitle: 'بیشتر بدانید', methodologyLink: 'این مدل چگونه کار می‌کند', presentationsLink: 'اصطلاحات presentation و ADD تاریخی',
}

export const aboutContent: Readonly<Record<Locale, AboutContent>> = Object.freeze({ en: make('en'), fa: make('fa') })
