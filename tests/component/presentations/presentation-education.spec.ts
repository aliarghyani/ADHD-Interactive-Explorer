import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PresentationDetail from '../../../app/components/presentation-education/PresentationDetail.vue'
import PresentationIndex from '../../../app/components/presentation-education/PresentationIndex.vue'
import { presentationCopy } from '../../../features/presentation-education/copy'
import { presentationRepository } from '../../../features/presentation-education/knowledge'
import { buildPresentationDetail, buildPresentationIndex } from '../../../features/presentation-education/model'
import { DomainLocalization } from '../../../localization'
import { SafetyAccess } from '../../../safety'

const NuxtLinkStub = defineComponent({
  inheritAttrs: false,
  props: { to: { type: [String, Object], required: true } },
  setup(props, { attrs, slots }) {
    const href = typeof props.to === 'string' ? props.to : (props.to as { path: string }).path
    return () => h('a', { ...attrs, href }, slots.default?.())
  },
})

const localization = new DomainLocalization(presentationRepository)
const safety = new SafetyAccess(presentationRepository)

function mountIndex(locale: 'en' | 'fa' = 'en') {
  return mount(PresentationIndex, {
    props: {
      locale,
      copy: presentationCopy[locale],
      model: buildPresentationIndex(presentationRepository, localization, safety, locale),
    },
    global: { stubs: { NuxtLink: NuxtLinkStub } },
  })
}

function mountDetail(id = 'PRESENTATION_COMBINED', locale: 'en' | 'fa' = 'en') {
  const detail = buildPresentationDetail(presentationRepository, localization, safety, id, locale)
  if (!detail) throw new Error(`Missing test presentation: ${id}`)
  return mount(PresentationDetail, {
    props: { locale, detail, copy: presentationCopy[locale] },
    global: { stubs: { NuxtLink: NuxtLinkStub } },
  })
}

describe('WP-10 Presentation Education components', () => {
  it.each(['en', 'fa'] as const)('renders three peer formal cards and keeps ADD separate in %s', (locale) => {
    const wrapper = mountIndex(locale)
    expect(wrapper.findAll('.presentation-card')).toHaveLength(3)
    expect(wrapper.findAll('.presentation-card__link')).toHaveLength(3)
    expect(wrapper.findAll('.presentation-card input')).toHaveLength(0)
    expect(wrapper.get('.presentation-history').text()).toContain('HISTORICAL_ADD_NOTE')
    expect(wrapper.find('.presentation-history .presentation-card').exists()).toBe(false)
  })

  it('states all required safety and model-separation boundaries', () => {
    const wrapper = mountIndex()
    expect(wrapper.text()).toContain('formal clinical symptom domains, not this explanatory graph')
    expect(wrapper.text()).toContain('explains diagnostic terminology')
    expect(wrapper.text()).toContain('does not determine which presentation applies')
    expect(wrapper.text()).toContain('Behaviour exploration elsewhere does not determine a presentation')
    expect(wrapper.get('.presentation-separation').text()).toContain('Context → Regulation → Behaviour → Pattern → Functional Domain → Feedback')
  })

  it('renders Combined Presentation with both anchors and neutral switching', () => {
    const wrapper = mountDetail()
    expect(wrapper.findAll('.presentation-anchors article')).toHaveLength(2)
    expect(wrapper.findAll('.presentation-anchors .app-canonical-id').map((node) => node.text())).toEqual(['CA1', 'CA2'])
    expect(wrapper.findAll('.presentation-switcher li')).toHaveLength(3)
    expect(wrapper.findAll('.presentation-switcher [aria-current="page"]')).toHaveLength(1)
    expect(wrapper.text()).not.toMatch(/recommended|matched|probability|your presentation/i)
  })

  it('progressively reveals only explicit presentation sources', async () => {
    const wrapper = mountDetail('PRESENTATION_INATTENTIVE')
    expect(wrapper.find('.presentation-sources').exists()).toBe(false)
    await wrapper.get('.presentation-evidence > button').trigger('click')
    expect(wrapper.findAll('.presentation-source')).toHaveLength(
      presentationRepository.getSourcesForPresentation('PRESENTATION_INATTENTIVE').length,
    )
    expect(wrapper.get('.presentation-sources').text()).toContain('Current presentation terminology')
    expect(wrapper.findAll('a').some((link) => link.attributes('href')?.startsWith('/en/evidence'))).toBe(true)
  })

  it('preserves Persian direction-sensitive identifiers and historical distinction', () => {
    const wrapper = mountDetail('PRESENTATION_INATTENTIVE', 'fa')
    expect(wrapper.findAll('bdi[dir="ltr"]').map((node) => node.text())).toEqual(expect.arrayContaining([
      'ADHD',
      'ADD',
      'PRESENTATION_INATTENTIVE',
      'CA1',
      'HISTORICAL_ADD_NOTE',
    ]))
    expect(wrapper.get('.presentation-history').text()).toContain('فقط تاریخی')
    expect(wrapper.get('.presentation-history').text()).toContain('presentation چهارم فعلی')
  })
})
