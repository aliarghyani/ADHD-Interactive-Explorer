import type { EvidenceLevel, Locale, RelationshipType } from '../../domain'

export interface MethodologyContent {
  metaTitle: string
  metaDescription: string
  kicker: string
  title: string
  summary: string
  navLabel: string
  sections: {
    read: { title: string, paragraphs: readonly string[], notList: readonly string[] }
    anchor: { title: string, paragraphs: readonly string[] }
    layers: { title: string, introduction: string, items: readonly { canonical: string, label: string, description: string }[], feedback: string, caution: string }
    relationships: { title: string, introduction: string, items: readonly { id: RelationshipType, title: string, description: string, boundary: string }[] }
    uncertainty: { title: string, paragraphs: readonly string[], distinctions: readonly { label: string, text: string }[] }
    evidence: { title: string, introduction: string, levels: readonly { level: EvidenceLevel, description: string }[], context: string, limitations: string, linkLabel: string }
    individual: { title: string, paragraphs: readonly string[] }
    boundaries: { title: string, introduction: string, items: readonly string[], presentationLink: string }
    provenance: { title: string, description: string, releaseLabel: string, reviewLabel: string }
  }
}

const en: MethodologyContent = {
  metaTitle: 'Methodology | ADHD Interactive Explorer',
  metaDescription: 'How to interpret the Explorer’s conceptual model, relationships, evidence, uncertainty, and educational boundaries.',
  kicker: 'How to read the model',
  title: 'Methodology and interpretation',
  summary: 'A guide to what this curated educational model represents, how its evidence is organized, and where its conclusions stop.',
  navLabel: 'On this page',
  sections: {
    read: {
      title: 'A conceptual organization, not a pathway through a person',
      paragraphs: [
        'The Explorer organizes reviewed production knowledge into distinct conceptual layers. It helps users compare formal clinical terminology with explanatory concepts, observable experience, context, recurring patterns, functional domains, and feedback.',
        'The sequence is a learning structure. Relationships are many-to-many, and no single path is “the explanation.”',
      ],
      notList: ['Not a deterministic causal chain', 'Not an individual brain model', 'Not a diagnostic pathway', 'Not a severity model'],
    },
    anchor: {
      title: 'Clinical Anchor stays epistemically separate',
      paragraphs: [
        'The Clinical Anchor contains the formal symptom domains used in clinical terminology: Inattention and Hyperactivity–Impulsivity. It answers a different question from the explanatory network.',
        'Regulation constructs are not diagnostic criteria. Behaviour examples are not equivalent to diagnosis. For that reason, explanatory relationships do not begin as mechanistic arrows from the Clinical Anchor.',
      ],
    },
    layers: {
      title: 'The explanatory layers',
      introduction: 'Read the layers as a sequence for orientation, while remembering that actual relationships form a network.',
      items: [
        { canonical: 'Context', label: 'Context', description: 'Situations, demands, and supports that may change how functioning is expressed.' },
        { canonical: 'Regulation', label: 'Regulation', description: 'Explanatory process concepts associated with directing attention, action, emotion, and effort.' },
        { canonical: 'Observable Behaviour', label: 'Observable Behaviour', description: 'What may be noticed without treating the observation as a symptom count or diagnosis.' },
        { canonical: 'Recurring Pattern', label: 'Recurring Pattern', description: 'Repeated combinations across time or situations; one event is not enough.' },
        { canonical: 'Functional Domain', label: 'Functional Domain', description: 'An area of life where difficulty could matter; an example does not establish clinical impairment.' },
      ],
      feedback: 'Feedback represents how an outcome may alter later Context and participate in a reciprocal pattern over time.',
      caution: 'This sequence is a conceptual educational organization, not a universal causal sequence.',
    },
    relationships: {
      title: 'Three canonical relationship types',
      introduction: 'Relationship labels are qualitative. They do not encode probabilities, causal weights, or individual predictions.',
      items: [
        { id: 'MODULATES', title: 'MODULATES', description: 'A qualitative, probabilistic modifier: Context may change demand, stability, expression, ease, interference, or support.', boundary: 'It does not mean that the Context causes the difficulty.' },
        { id: 'CONTRIBUTES_TO', title: 'CONTRIBUTES_TO', description: 'Variation in one concept may probabilistically contribute to another.', boundary: 'It is neither necessary nor sufficient.' },
        { id: 'FEEDBACK_WITH', title: 'FEEDBACK_WITH', description: 'A recurrent, reciprocal conceptual relationship in which factors may influence each other over time.', boundary: 'It is not universal or inevitable.' },
      ],
    },
    uncertainty: {
      title: 'Association, context, synthesis, and causation',
      paragraphs: [
        'A graph edge does not automatically represent proven causation. Wording such as “may contribute,” “is associated with,” or “can change demand” preserves the uncertainty in the knowledge contract.',
        'One Behaviour may have several possible pathways; one Context may relate to multiple processes; and one Regulation concept may relate to several Behaviours. Similar observable difficulties can also have alternative contributors.',
      ],
      distinctions: [
        { label: 'Association', text: 'A relationship reported or supported at group level; it does not identify an individual.' },
        { label: 'Contextual modulation', text: 'A situation may change demand or expression without proving or disproving ADHD.' },
        { label: 'Educational synthesis', text: 'A curated conceptual mapping that helps explain the frozen model; it is not itself a quantitative causal estimate.' },
        { label: 'Causal certainty', text: 'Not implied by the model as a whole or by every edge.' },
      ],
    },
    evidence: {
      title: 'How to read Evidence',
      introduction: 'The qualitative label is one part of an Evidence record, not a universal numeric scale.',
      levels: [
        { level: 'Clinical', description: 'Formal clinical material, such as diagnostic domains or presentation terminology—not a proven mechanism.' },
        { level: 'Strong', description: 'A pattern or association consistently found at group level, while remaining heterogeneous and not necessarily ADHD-specific.' },
        { level: 'Moderate', description: 'A supported relationship with heterogeneity, contested specificity, or construct-level limits.' },
        { level: 'Limited', description: 'A plausible or emerging concept whose current support does not justify a central explanatory role.' },
      ],
      context: 'Interpret the label together with epistemic status, construct status, limitations, source context, and review metadata.',
      limitations: 'Limitations are first-class content. Production records distinguish, where applicable, heterogeneity, non-specific or transdiagnostic findings, construct-level or educational synthesis, and lack of individual prediction.',
      linkLabel: 'Inspect Evidence records and sources',
    },
    individual: {
      title: 'Group-level findings are not individual interpretation',
      paragraphs: [
        'Evidence supporting a construct does not show that the construct applies to one user. Context-related improvement or worsening does not prove or disprove ADHD.',
        'Alternative explanations are educational differential cautions. The Explorer does not perform differential diagnosis.',
      ],
    },
    boundaries: {
      title: 'Model and safety boundaries',
      introduction: 'Safety is layered: a global educational disclaimer is always discoverable; each experience adds relevant caution; contextual cautions appear near affected content; and this page provides the detailed interpretation boundary.',
      items: ['No diagnosis or screening', 'No symptom scoring or ADHD likelihood', 'No presentation prediction', 'No treatment recommendation', 'No individualized medical assessment', 'No ADHD profile, Behaviour history, Context profile, inferred presentation, or personal clinical record'],
      presentationLink: 'Learn the separate formal presentation terminology',
    },
    provenance: {
      title: 'Source and review provenance',
      description: 'Scientific claims connect through canonical Evidence records to SourceReference records. The production knowledge is versioned and machine-validated, but it is not presented as exhaustive or as live continuous literature surveillance.',
      releaseLabel: 'Knowledge release', reviewLabel: 'Evidence review version',
    },
  },
}

const fa: MethodologyContent = {
  metaTitle: 'روش‌شناسی | کاوشگر تعاملی ADHD',
  metaDescription: 'راهنمای تفسیر مدل مفهومی، رابطه‌ها، شواهد، عدم‌قطعیت و مرزهای آموزشی کاوشگر.',
  kicker: 'راهنمای خواندن مدل', title: 'روش‌شناسی و تفسیر',
  summary: 'راهنمایی برای اینکه این مدل آموزشیِ گزینش‌شده چه چیزی را نشان می‌دهد، شواهد آن چگونه سازمان یافته‌اند و نتیجه‌گیری‌هایش کجا متوقف می‌شوند.',
  navLabel: 'در این صفحه',
  sections: {
    read: { title: 'سازمان‌دهی مفهومی، نه مسیری درون یک فرد', paragraphs: ['کاوشگر، دانش تولیدیِ بازبینی‌شده را در لایه‌های مفهومی متمایز سازمان می‌دهد. این ساختار به مقایسه اصطلاحات رسمی بالینی با مفاهیم توضیحی، تجربه قابل مشاهده، زمینه، الگوهای تکرارشونده، حوزه‌های عملکردی و بازخورد کمک می‌کند.', 'این توالی برای یادگیری است. رابطه‌ها چندبه‌چند هستند و هیچ مسیر واحدی «توضیح نهایی» نیست.'], notList: ['نه یک زنجیره علّی قطعی', 'نه مدل مغز یک فرد', 'نه مسیر تشخیصی', 'نه مدل شدت'] },
    anchor: { title: 'لنگر بالینی از نظر معرفتی جدا می‌ماند', paragraphs: ['Clinical Anchor شامل حوزه‌های رسمی علائم در اصطلاحات بالینی است: بی‌توجهی و بیش‌فعالی–تکانشگری. پرسش آن با شبکه توضیحی متفاوت است.', 'مفاهیم Regulation معیار تشخیصی نیستند و نمونه‌های Behaviour معادل تشخیص نیستند. بنابراین رابطه‌های توضیحی به‌صورت پیکان‌های سازوکاری از Clinical Anchor آغاز نمی‌شوند.'] },
    layers: { title: 'لایه‌های توضیحی', introduction: 'این لایه‌ها را برای جهت‌یابی به‌ترتیب بخوانید، اما به یاد داشته باشید که رابطه‌های واقعی یک شبکه می‌سازند.', items: [
      { canonical: 'Context', label: 'زمینه', description: 'موقعیت‌ها، تقاضاها و حمایت‌هایی که ممکن است نحوه بروز عملکرد را تغییر دهند.' },
      { canonical: 'Regulation', label: 'تنظیم', description: 'مفاهیم فرایندیِ توضیحی مرتبط با هدایت توجه، عمل، هیجان و تلاش.' },
      { canonical: 'Observable Behaviour', label: 'رفتار قابل مشاهده', description: 'چیزی که می‌توان دید، بدون تبدیل آن به شمارش علامت یا تشخیص.' },
      { canonical: 'Recurring Pattern', label: 'الگوی تکرارشونده', description: 'ترکیب‌های تکراری در طول زمان یا موقعیت‌ها؛ یک رویداد کافی نیست.' },
      { canonical: 'Functional Domain', label: 'حوزه عملکردی', description: 'بخشی از زندگی که دشواری می‌تواند در آن مهم باشد؛ مثال، اختلال عملکرد بالینی را ثابت نمی‌کند.' },
    ], feedback: 'Feedback نشان می‌دهد یک پیامد چگونه ممکن است زمینه بعدی را تغییر دهد و در گذر زمان وارد الگویی متقابل شود.', caution: 'این توالی یک سازمان‌دهی مفهومی و آموزشی است، نه توالی علّی همگانی.' },
    relationships: { title: 'سه نوع رابطه canonical', introduction: 'برچسب‌های رابطه کیفی‌اند و احتمال عددی، وزن علّی یا پیش‌بینی فردی را رمزگذاری نمی‌کنند.', items: [
      { id: 'MODULATES', title: 'MODULATES', description: 'تعدیل‌گر کیفی و احتمالی: Context ممکن است تقاضا، پایداری، بروز، سهولت، تداخل یا حمایت را تغییر دهد.', boundary: 'به این معنا نیست که Context علت دشواری است.' },
      { id: 'CONTRIBUTES_TO', title: 'CONTRIBUTES_TO', description: 'تغییر در یک مفهوم ممکن است به‌صورت احتمالی در مفهوم دیگر سهم داشته باشد.', boundary: 'نه شرط لازم است و نه کافی.' },
      { id: 'FEEDBACK_WITH', title: 'FEEDBACK_WITH', description: 'رابطه مفهومیِ تکرارشونده و متقابل که در آن عوامل ممکن است در طول زمان بر یکدیگر اثر بگذارند.', boundary: 'همگانی یا اجتناب‌ناپذیر نیست.' },
    ] },
    uncertainty: { title: 'ارتباط، تعدیل زمینه‌ای، ترکیب آموزشی و علیت', paragraphs: ['هر یال نمودار الزاماً علیت اثبات‌شده را نشان نمی‌دهد. عبارت‌هایی مانند «ممکن است سهم داشته باشد»، «مرتبط است» یا «می‌تواند تقاضا را تغییر دهد» عدم‌قطعیت قرارداد دانش را حفظ می‌کنند.', 'یک Behaviour می‌تواند چند مسیر احتمالی داشته باشد؛ یک Context ممکن است با چند فرایند مرتبط باشد؛ و یک مفهوم Regulation می‌تواند با چند Behaviour ارتباط داشته باشد. دشواری‌های ظاهراً مشابه نیز می‌توانند عوامل دیگری داشته باشند.'], distinctions: [
      { label: 'ارتباط', text: 'رابطه‌ای که در سطح گروه گزارش یا پشتیبانی شده است؛ فرد را شناسایی نمی‌کند.' },
      { label: 'تعدیل زمینه‌ای', text: 'یک موقعیت ممکن است تقاضا یا بروز را تغییر دهد، بدون اینکه ADHD را ثابت یا رد کند.' },
      { label: 'ترکیب آموزشی', text: 'نگاشت مفهومیِ گزینش‌شده برای توضیح مدل frozen؛ نه برآورد کمّی علّی.' },
      { label: 'قطعیت علّی', text: 'نه از کل مدل و نه از هر یال به‌تنهایی نتیجه نمی‌شود.' },
    ] },
    evidence: { title: 'چگونه Evidence را بخوانیم', introduction: 'برچسب کیفی فقط یک بخش از رکورد Evidence است، نه یک مقیاس عددی همگانی.', levels: [
      { level: 'Clinical', description: 'محتوای رسمی بالینی مانند حوزه‌های تشخیصی یا اصطلاحات presentation؛ نه سازوکار اثبات‌شده.' },
      { level: 'Strong', description: 'الگو یا ارتباطی که در سطح گروه به‌طور پیوسته دیده شده، اما ناهمگون است و لزوماً مختص ADHD نیست.' },
      { level: 'Moderate', description: 'رابطه‌ای پشتیبانی‌شده با ناهمگونی، اختصاصی‌بودن محل بحث یا محدودیت در سطح سازه.' },
      { level: 'Limited', description: 'مفهومی محتمل یا نوظهور که شواهد فعلی برای نقش توضیحی مرکزی کافی نیست.' },
    ], context: 'برچسب را همراه با وضعیت معرفتی، وضعیت سازه، محدودیت‌ها، زمینه منبع و فراداده بازبینی تفسیر کنید.', limitations: 'محدودیت‌ها محتوای درجه‌اول‌اند. رکوردهای تولید، در موارد مربوط، ناهمگونی، یافته‌های غیراختصاصی یا فراتشخیصی، ترکیب در سطح سازه یا آموزشی و نبود پیش‌بینی فردی را متمایز می‌کنند.', linkLabel: 'مشاهده رکوردهای Evidence و منابع' },
    individual: { title: 'یافته‌های سطح گروه، تفسیر فردی نیستند', paragraphs: ['شواهد پشتیبان یک سازه نشان نمی‌دهند آن سازه درباره یک کاربر صدق می‌کند. بهتر یا بدتر شدن در یک Context، ADHD را ثابت یا رد نمی‌کند.', 'توضیح‌های جایگزین، احتیاط‌های آموزشی برای افتراق‌اند. کاوشگر تشخیص افتراقی انجام نمی‌دهد.'] },
    boundaries: { title: 'مرزهای مدل و ایمنی', introduction: 'ایمنی لایه‌ای است: سلب مسئولیت آموزشی کلی همیشه در دسترس است؛ هر تجربه احتیاط مرتبط خود را دارد؛ احتیاط‌های زمینه‌ای کنار محتوای مربوط می‌آیند؛ و این صفحه مرز تفسیریِ تفصیلی را ارائه می‌کند.', items: ['بدون تشخیص یا غربالگری', 'بدون امتیازدهی علائم یا احتمال ADHD', 'بدون پیش‌بینی presentation', 'بدون توصیه درمانی', 'بدون ارزیابی پزشکی شخصی', 'بدون پروفایل ADHD، تاریخچه Behaviour، پروفایل Context، presentation استنباط‌شده یا پرونده بالینی شخصی'], presentationLink: 'آشنایی با اصطلاحات رسمی و جداگانه presentation' },
    provenance: { title: 'منشأ منابع و بازبینی', description: 'ادعاهای علمی از طریق رکوردهای canonical شواهد به رکوردهای SourceReference متصل می‌شوند. دانش تولیدی نسخه‌بندی و به‌صورت ماشینی اعتبارسنجی می‌شود، اما جامع یا پایش زنده و پیوسته پژوهش‌ها معرفی نمی‌شود.', releaseLabel: 'انتشار دانش', reviewLabel: 'نسخه بازبینی شواهد' },
  },
}

export const methodologyContent: Readonly<Record<Locale, MethodologyContent>> = Object.freeze({ en, fa })
