import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HomeExperience from '../../../app/components/home/HomeExperience.vue'
import BidiIsolation from '../../../app/components/BidiIsolation.vue'
import { createHomeContent } from '../../../features/home/home-content'
import { getHomeSafetyText } from '../../../features/home/home-safety.server'
import en from '../../../i18n/locales/en.json'
import fa from '../../../i18n/locales/fa.json'

const CardStub = defineComponent({
  inheritAttrs: false,
  props: { as: { type: String, default: 'section' } },
  setup(props, { attrs, slots }) {
    return () => h(props.as, attrs, slots.default?.())
  },
})

const AlertStub = defineComponent({
  inheritAttrs: false,
  props: { description: { type: String, required: false, default: '' } },
  setup(props, { attrs, slots }) {
    return () => h('div', attrs, slots.description?.() ?? props.description)
  },
})

const NuxtLinkStub = defineComponent({
  inheritAttrs: false,
  props: { to: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () => h('a', { ...attrs, href: props.to }, slots.default?.())
  },
})

function translate(messages: object): (key: string) => string {
  return (key) => {
    let value: unknown = messages
    for (const segment of key.split('.')) value = (value as Record<string, unknown>)[segment]
    if (typeof value !== 'string') throw new TypeError(`Missing test translation: ${key}`)
    return value
  }
}

function renderHome(locale: 'en' | 'fa') {
  const messages = locale === 'en' ? en : fa
  const content = createHomeContent(translate(messages), locale)
  return mount(HomeExperience, {
    props: {
      locale,
      content,
      safetyText: getHomeSafetyText(locale),
      comingSoonLabel: content.shell.comingSoonLabel,
      liveLabel: messages.home.shell.live,
    },
    global: {
      components: { BidiIsolation },
      stubs: { UCard: CardStub, UAlert: AlertStub, NuxtLink: NuxtLinkStub },
    },
  })
}

describe('WP-07.6 Home educational experience', () => {
  it('replaces the foundation placeholder with an approachable English orientation', () => {
    const wrapper = renderHome('en')

    expect(wrapper.get('h1').text()).toBe('Understand ADHD through an explorable network')
    expect(wrapper.text()).toContain('This is an educational model of ADHD-related concepts and research.')
    expect(wrapper.get('.home-safety-boundaries').text()).toContain('Not a diagnostic test')
    expect(wrapper.get('.home-safety-boundaries').text()).toContain('Not screening')
    expect(wrapper.get('.home-safety-boundaries').text()).toContain('Not a personalized medical assessment')
    expect(wrapper.text()).toContain('Clinical definition is not the explanatory network')
    expect(wrapper.text()).not.toMatch(/Foundation ready|Work package|delivery pipeline|bounded work package/i)
  })

  it('renders the Clinical Anchor distinction without a mechanistic flow', () => {
    const wrapper = renderHome('en')
    const distinction = wrapper.get('.home-distinction')

    expect(distinction.findAll('[role="listitem"]')).toHaveLength(3)
    expect(distinction.text()).toContain('Clinical Anchor')
    expect(distinction.text()).toContain('Regulation mechanisms')
    expect(distinction.text()).toContain('Observable Behaviour')
    expect(distinction.text()).toContain('≠')
    expect(wrapper.text()).toContain('there is no mechanistic arrow')
  })

  it('teaches the conceptual sequence and explicitly rejects determinism', () => {
    const wrapper = renderHome('en')
    const canonicalLayers = wrapper.findAll('.home-model__step .home-canonical-term').map((node) => node.text())

    expect(canonicalLayers).toEqual([
      'Context',
      'Regulation',
      'Observable Behaviour',
      'Recurring Pattern',
      'Functional Domain',
    ])
    expect(wrapper.get('.home-model__feedback').text()).toContain('Feedback')
    expect(wrapper.text()).toContain('not a deterministic causal chain')
    expect(wrapper.text()).toContain('Relationships are many-to-many')
  })

  it('offers four entry choices with three live routes and one controlled unavailable state', () => {
    const wrapper = renderHome('en')
    const entries = wrapper.findAll('.home-entry')

    expect(entries).toHaveLength(4)
    expect(entries.map((entry) => entry.get('h3').text())).toEqual([
      'System Map',
      'Behaviour Explorer',
      'Context & Feedback Explorer',
      'Presentation Education',
    ])
    expect(wrapper.findAll('.home-entry__link').map((link) => link.attributes('href'))).toEqual(['/en/map', '/en/behaviours', '/en/context'])
    expect(wrapper.findAll('.home-entry__live')).toHaveLength(2)
    expect(wrapper.findAll('.home-entry__unavailable')).toHaveLength(1)
    expect(wrapper.findAll('.home-entry__unavailable').every((state) => state.attributes('aria-disabled') === 'true')).toBe(true)
  })

  it('renders complete Persian content with isolated canonical technical terms', () => {
    const wrapper = renderHome('fa')

    expect(wrapper.get('h1').text()).toContain('ADHD')
    expect(wrapper.text()).toContain('تعریف بالینی با شبکهٔ توضیحی یکی نیست')
    expect(wrapper.text()).toContain('ارتباط‌ها چندبه‌چند هستند')
    expect(wrapper.text()).toContain('این یک توالی مفهومی برای یادگیری است')
    expect(wrapper.findAll('bdi[dir="ltr"]').map((node) => node.text())).toEqual(expect.arrayContaining([
      'ADHD',
      'Clinical Anchor',
      'Context',
      'Regulation',
      'Observable Behaviour',
      'Recurring Pattern',
      'Functional Domain',
      'Feedback',
    ]))
  })
})
