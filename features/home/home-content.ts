import type { Locale } from '../../domain'

type Translate = (key: string) => string

export interface HomeNavigationItem {
  readonly id: 'home' | 'map' | 'behaviours' | 'context' | 'presentations' | 'evidence' | 'methodology'
  readonly label: string
  readonly href?: string
  readonly available: boolean
}

export interface HomeEntryPoint {
  readonly id: 'map' | 'behaviours' | 'context' | 'presentations'
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly href?: string
  readonly available: boolean
}

export interface HomeModelLayer {
  readonly id: 'context' | 'regulation' | 'behaviour' | 'pattern' | 'domain'
  readonly label: string
  readonly canonical: string
  readonly description: string
}

export interface HomeContent {
  readonly shell: Readonly<{
    productName: string
    navigationLabel: string
    comingSoonLabel: string
    skipLabel: string
  }>
  readonly hero: Readonly<{
    kicker: string
    titleBefore: string
    titleAfter: string
    summary: string
    boundaries: readonly string[]
  }>
  readonly clinical: Readonly<{
    kicker: string
    title: string
    introduction: string
    anchorLabel: string
    anchorDescription: string
    regulationLabel: string
    regulationDescription: string
    behaviourLabel: string
    behaviourDescription: string
    boundary: string
  }>
  readonly model: Readonly<{
    kicker: string
    title: string
    introduction: string
    feedbackLabel: string
    feedbackDescription: string
    caution: string
  }>
  readonly network: Readonly<{
    kicker: string
    title: string
    introduction: string
    behaviourTitle: string
    behaviourDescription: string
    regulationTitle: string
    regulationDescription: string
    contextTitle: string
    contextDescription: string
  }>
  readonly explore: Readonly<{ kicker: string, title: string, introduction: string }>
  readonly disclosure: Readonly<{ summary: string, paragraphOne: string, paragraphTwo: string }>
  readonly navigation: readonly HomeNavigationItem[]
  readonly entryPoints: readonly HomeEntryPoint[]
  readonly modelLayers: readonly HomeModelLayer[]
}

export function createHomeContent(t: Translate, locale: Locale): HomeContent {
  const prefix = `/${locale}`
  return Object.freeze({
    shell: Object.freeze({
      productName: t('home.shell.productName'),
      navigationLabel: t('home.shell.navigationLabel'),
      comingSoonLabel: t('home.shell.comingSoon'),
      skipLabel: t('home.shell.skipToContent'),
    }),
    hero: Object.freeze({
      kicker: t('home.hero.kicker'),
      titleBefore: t('home.hero.titleBefore'),
      titleAfter: t('home.hero.titleAfter'),
      summary: t('home.hero.summary'),
      boundaries: Object.freeze([
        t('home.hero.boundaries.diagnostic'),
        t('home.hero.boundaries.screening'),
        t('home.hero.boundaries.assessment'),
      ]),
    }),
    clinical: Object.freeze({
      kicker: t('home.clinical.kicker'),
      title: t('home.clinical.title'),
      introduction: t('home.clinical.introduction'),
      anchorLabel: t('home.clinical.anchor.label'),
      anchorDescription: t('home.clinical.anchor.description'),
      regulationLabel: t('home.clinical.regulation.label'),
      regulationDescription: t('home.clinical.regulation.description'),
      behaviourLabel: t('home.clinical.behaviour.label'),
      behaviourDescription: t('home.clinical.behaviour.description'),
      boundary: t('home.clinical.boundary'),
    }),
    model: Object.freeze({
      kicker: t('home.model.kicker'),
      title: t('home.model.title'),
      introduction: t('home.model.introduction'),
      feedbackLabel: t('home.model.feedback.label'),
      feedbackDescription: t('home.model.feedback.description'),
      caution: t('home.model.caution'),
    }),
    network: Object.freeze({
      kicker: t('home.network.kicker'),
      title: t('home.network.title'),
      introduction: t('home.network.introduction'),
      behaviourTitle: t('home.network.behaviour.title'),
      behaviourDescription: t('home.network.behaviour.description'),
      regulationTitle: t('home.network.regulation.title'),
      regulationDescription: t('home.network.regulation.description'),
      contextTitle: t('home.network.context.title'),
      contextDescription: t('home.network.context.description'),
    }),
    explore: Object.freeze({
      kicker: t('home.explore.kicker'),
      title: t('home.explore.title'),
      introduction: t('home.explore.introduction'),
    }),
    disclosure: Object.freeze({
      summary: t('home.disclosure.summary'),
      paragraphOne: t('home.disclosure.paragraphOne'),
      paragraphTwo: t('home.disclosure.paragraphTwo'),
    }),
    navigation: Object.freeze([
      { id: 'home', label: t('home.navigation.home'), href: prefix, available: true },
      { id: 'map', label: t('home.navigation.systemMap'), href: `${prefix}/map`, available: true },
      { id: 'behaviours', label: t('home.navigation.behaviours'), href: `${prefix}/behaviours`, available: true },
      { id: 'context', label: t('home.navigation.context'), href: `${prefix}/context`, available: true },
      { id: 'presentations', label: t('home.navigation.presentations'), available: false },
      { id: 'evidence', label: t('home.navigation.evidence'), available: false },
      { id: 'methodology', label: t('home.navigation.methodology'), available: false },
    ] satisfies HomeNavigationItem[]),
    entryPoints: Object.freeze([
      {
        id: 'map',
        eyebrow: t('home.entries.map.eyebrow'),
        title: t('home.entries.map.title'),
        description: t('home.entries.map.description'),
        href: `${prefix}/map`,
        available: true,
      },
      {
        id: 'behaviours',
        eyebrow: t('home.entries.behaviours.eyebrow'),
        title: t('home.entries.behaviours.title'),
        description: t('home.entries.behaviours.description'),
        href: `${prefix}/behaviours`,
        available: true,
      },
      {
        id: 'context',
        eyebrow: t('home.entries.context.eyebrow'),
        title: t('home.entries.context.title'),
        description: t('home.entries.context.description'),
        href: `${prefix}/context`,
        available: true,
      },
      {
        id: 'presentations',
        eyebrow: t('home.entries.presentations.eyebrow'),
        title: t('home.entries.presentations.title'),
        description: t('home.entries.presentations.description'),
        available: false,
      },
    ] satisfies HomeEntryPoint[]),
    modelLayers: Object.freeze([
      { id: 'context', label: t('home.model.context.label'), canonical: 'Context', description: t('home.model.context.description') },
      { id: 'regulation', label: t('home.model.regulation.label'), canonical: 'Regulation', description: t('home.model.regulation.description') },
      { id: 'behaviour', label: t('home.model.behaviour.label'), canonical: 'Observable Behaviour', description: t('home.model.behaviour.description') },
      { id: 'pattern', label: t('home.model.pattern.label'), canonical: 'Recurring Pattern', description: t('home.model.pattern.description') },
      { id: 'domain', label: t('home.model.domain.label'), canonical: 'Functional Domain', description: t('home.model.domain.description') },
    ] satisfies HomeModelLayer[]),
  })
}
