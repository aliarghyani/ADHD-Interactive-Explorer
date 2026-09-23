import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ContextLibrary from '../../../app/components/context-feedback/ContextLibrary.vue'
import ContextDetail from '../../../app/components/context-feedback/ContextDetail.vue'
import { contextCopy } from '../../../features/context-feedback/copy'
import { contextRepository } from '../../../features/context-feedback/knowledge'
import { buildContextDetail, buildContextLibrary } from '../../../features/context-feedback/model'
import { DomainLocalization } from '../../../localization'
import { SafetyAccess } from '../../../safety'

const NuxtLinkStub = defineComponent({
  inheritAttrs: false,
  props: { to: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () => h('a', { ...attrs, href: props.to }, slots.default?.())
  },
})

const localization = new DomainLocalization(contextRepository)
const safety = new SafetyAccess(contextRepository)

function mountLibrary(locale: 'en' | 'fa') {
  return mount(ContextLibrary, {
    props: { locale, copy: contextCopy[locale], items: buildContextLibrary(contextRepository, localization, locale) },
    global: { stubs: { NuxtLink: NuxtLinkStub } },
  })
}

function mountDetail(contextId = 'CTX2', locale: 'en' | 'fa' = 'en', state: string | null = null) {
  const detail = buildContextDetail(contextRepository, localization, safety, contextId, locale)
  if (!detail) throw new Error(`${contextId} missing`)
  return mount(ContextDetail, {
    props: { locale, detail, copy: contextCopy[locale], requestedState: state },
    global: { stubs: { NuxtLink: NuxtLinkStub } },
  })
}

describe('WP-09 Context & Feedback components', () => {
  it.each(['en', 'fa'] as const)('renders all eight %s Context entries without intake controls', (locale) => {
    const wrapper = mountLibrary(locale)
    expect(wrapper.findAll('.context-library-card')).toHaveLength(8)
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(0)
    expect(wrapper.findAll('[aria-multiselectable="true"]')).toHaveLength(0)
    expect(wrapper.findAll('.context-library-card a')).toHaveLength(8)
  })

  it('switches exact qualitative states without numeric or predictive output', async () => {
    const wrapper = mountDetail()
    const options = wrapper.findAll('[role="radio"]')
    expect(options).toHaveLength(3)
    expect(options[1]?.attributes('aria-checked')).toBe('true')
    expect(options.map(option => option.attributes('tabindex'))).toEqual(['-1', '0', '-1'])
    await options[1]?.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('stateChange')?.[0]).toEqual(['demanding'])
    expect(options[2]?.attributes('aria-checked')).toBe('true')
    expect(options.map(option => option.attributes('tabindex'))).toEqual(['-1', '-1', '0'])
    expect(wrapper.text()).not.toMatch(/\d+%|your score|likelihood|forecast/i)
  })

  it('shows canonical Context mappings and bounded cross-experience links', () => {
    const wrapper = mountDetail('CTX6')
    expect(wrapper.findAll('.context-mapping')).toHaveLength(5)
    expect(wrapper.get('.context-detail__map-link').attributes('href')).toBe('/en/map/CTX6')
    expect(wrapper.findAll('.context-mapping a').some((link) => link.attributes('href') === '/en/behaviours/BEH1')).toBe(true)
    expect(wrapper.findAll('.context-mapping a').some((link) => link.attributes('href') === '/en/map/REG3')).toBe(true)
  })

  it('opens only an authoritative Feedback loop with caution and evidence', async () => {
    const wrapper = mountDetail('CTX4')
    expect(wrapper.findAll('.context-feedback__loop')).toHaveLength(1)
    await wrapper.get('.context-feedback__loop > button').trigger('click')
    expect(wrapper.get('.context-feedback__loop > button').attributes('aria-controls')).toContain('context-feedback-')
    expect(wrapper.text()).toContain('not universal')
    expect(wrapper.text()).toContain('EDGE_PAT1_CTX4_FEEDBACK_WITH')
    await wrapper.get('.context-feedback__evidence').trigger('click')
    expect(wrapper.get('.context-feedback__evidence').attributes()).toMatchObject({
      'aria-controls': 'context-evidence-preview',
      'aria-expanded': 'true',
    })
    expect(wrapper.get('.context-evidence').text()).toContain('group-level tendencies')
    expect(wrapper.get('.context-evidence').text()).toContain('Limitations')
    expect(wrapper.get('.context-evidence').attributes('id')).toBe('context-evidence-preview')
  })

  it('shows a controlled empty Feedback state and resets only temporary exploration', async () => {
    const wrapper = mountDetail('CTX1', 'en', 'demanding')
    expect(wrapper.text()).toContain('No canonical Feedback loop')
    expect(wrapper.findAll('[role="radio"]')[2]?.attributes('aria-checked')).toBe('true')
    await wrapper.findAll('button').find((button) => button.text() === contextCopy.en.reset)?.trigger('click')
    expect(wrapper.emitted('reset')).toHaveLength(1)
    expect(wrapper.findAll('[role="radio"]')[1]?.attributes('aria-checked')).toBe('true')
  })

  it('falls back visibly for an invalid state and preserves Persian source-to-target order', () => {
    const wrapper = mountDetail('CTX2', 'fa', 'high')
    expect(wrapper.get('[role="status"]').text()).toContain(contextCopy.fa.invalidState)
    expect(wrapper.findAll('[role="radio"]')[1]?.attributes('aria-checked')).toBe('true')
    const firstMappingIds = wrapper.find('.context-mapping').findAll('.context-mapping__steps > li:not(.context-mapping__relationship) bdi')
      .map((node) => node.text())
    expect(firstMappingIds).toEqual(['CTX2', 'REG6', 'BEH1'])
    expect(wrapper.findAll('bdi[dir="ltr"]').length).toBeGreaterThan(8)
  })
})
