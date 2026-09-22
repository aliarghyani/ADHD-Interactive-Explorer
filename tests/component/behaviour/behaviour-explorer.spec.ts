import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BehaviourLibrary from '../../../app/components/behaviour-explorer/BehaviourLibrary.vue'
import BehaviourDetail from '../../../app/components/behaviour-explorer/BehaviourDetail.vue'
import { behaviourCopy } from '../../../features/behaviour-explorer/copy'
import { behaviourRepository } from '../../../features/behaviour-explorer/knowledge'
import { buildBehaviourDetail, buildBehaviourLibrary } from '../../../features/behaviour-explorer/model'
import { DomainLocalization } from '../../../localization'
import { SafetyAccess } from '../../../safety'

const NuxtLinkStub = defineComponent({
  inheritAttrs: false,
  props: { to: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () => h('a', { ...attrs, href: props.to }, slots.default?.())
  },
})

const localization = new DomainLocalization(behaviourRepository)
const safety = new SafetyAccess(behaviourRepository)

function mountLibrary(locale: 'en' | 'fa') {
  return mount(BehaviourLibrary, {
    props: { locale, copy: behaviourCopy[locale], items: buildBehaviourLibrary(behaviourRepository, localization, locale) },
    global: { stubs: { NuxtLink: NuxtLinkStub } },
  })
}

function mountDetail(locale: 'en' | 'fa' = 'en', pathway: string | null = null) {
  const detail = buildBehaviourDetail(behaviourRepository, localization, safety, 'BEH1', locale)
  if (!detail) throw new Error('BEH1 missing')
  return mount(BehaviourDetail, {
    props: { locale, detail, copy: behaviourCopy[locale], requestedPathway: pathway },
    global: { stubs: { NuxtLink: NuxtLinkStub } },
  })
}

describe('WP-08 Behaviour Explorer components', () => {
  it.each(['en', 'fa'] as const)('renders all seven %s Behaviour entries without selection controls', (locale) => {
    const wrapper = mountLibrary(locale)
    expect(wrapper.findAll('.behaviour-card')).toHaveLength(7)
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(0)
    expect(wrapper.findAll('[aria-multiselectable="true"]')).toHaveLength(0)
    expect(wrapper.findAll('.behaviour-card__link')).toHaveLength(7)
  })

  it('searches plain language and canonical labels', async () => {
    const wrapper = mountLibrary('en')
    await wrapper.get('input[type="search"]').setValue('Switching Tasks')
    expect(wrapper.findAll('.behaviour-card')).toHaveLength(1)
    expect(wrapper.get('.behaviour-card').text()).toContain('move from one task to the next')
  })

  it('switches among neutral pathways and preserves exact pathway identity', async () => {
    const wrapper = mountDetail()
    const options = wrapper.findAll('[role="radio"]')
    expect(options).toHaveLength(4)
    expect(options[0]?.attributes('aria-checked')).toBe('true')
    await options[1]?.trigger('click')
    expect(wrapper.emitted('pathwayChange')?.[0]).toEqual(['PATH_BEH1_DELAYED_REWARD'])
    expect(options[1]?.attributes('aria-checked')).toBe('true')
    expect(wrapper.text()).not.toMatch(/recommended|most likely|score|percentage/i)
  })

  it('shows authoritative safety, alternatives, relationship evidence, and bounded reset', async () => {
    const wrapper = mountDetail()
    expect(wrapper.text()).toContain('This behaviour alone does not indicate ADHD')
    expect(wrapper.get('.behaviour-alternatives').text()).toContain('Similar difficulties can occur for reasons unrelated to ADHD')
    expect(wrapper.findAll('.behaviour-alternatives article')).toHaveLength(
      behaviourRepository.getAlternativeExplanations('BEH1').length,
    )
    expect(wrapper.findAll('.behaviour-detail__map-link').map((link) => link.attributes('href'))).toEqual(['/en/map/BEH1', '/en/context'])
    await wrapper.get('.behaviour-pathway__relationship button').trigger('click')
    expect(wrapper.get('.behaviour-evidence').text()).toContain('group-level tendencies')
    expect(wrapper.get('.behaviour-evidence').text()).toContain('Limitations')
    await wrapper.findAll('button').find((button) => button.text() === behaviourCopy.en.reset)?.trigger('click')
    expect(wrapper.emitted('reset')).toHaveLength(1)
  })

  it('renders Persian content in canonical source-to-target order', () => {
    const wrapper = mountDetail('fa', 'PATH_BEH1_STRESS')
    const ids = wrapper.findAll('.behaviour-pathway__steps article .app-canonical-id').map((node) => node.text())
    expect(ids).toEqual(['CTX2', 'REG6', 'BEH1'])
    expect(wrapper.text()).toContain('عوامل احتمالی دیگر')
    expect(wrapper.findAll('bdi[dir="ltr"]').length).toBeGreaterThan(3)
  })

  it('falls back visibly when an exact pathway query does not belong to the Behaviour', () => {
    const wrapper = mountDetail('en', 'PATH_BEH2_SLEEP')
    expect(wrapper.get('[role="status"]').text()).toContain('does not belong to this Behaviour')
    expect(wrapper.findAll('[role="radio"]')[0]?.attributes('aria-checked')).toBe('true')
  })
})
