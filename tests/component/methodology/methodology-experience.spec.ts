import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BidiIsolation from '../../../app/components/BidiIsolation.vue'
import MethodologyExperience from '../../../app/components/methodology/MethodologyExperience.vue'
import AboutExperience from '../../../app/components/about/AboutExperience.vue'
import { methodologyContent } from '../../../features/methodology/content'
import { aboutContent } from '../../../features/about/content'
import { getSupportingKnowledge } from '../../../features/methodology/supporting-knowledge.server'

const NuxtLink = defineComponent({ props: { to: { type: String, required: true } }, setup(props, { slots }) { return () => h('a', { href: props.to }, slots.default?.()) } })
const globals = { components: { BidiIsolation }, stubs: { NuxtLink } }

describe('WP-11.5 supporting experiences', () => {
  it.each(['en', 'fa'] as const)('renders the complete %s methodology contract', (locale) => {
    const support = getSupportingKnowledge(locale)
    const wrapper = mount(MethodologyExperience, { props: { locale, content: methodologyContent[locale], ...support }, global: globals })
    expect(wrapper.findAll('.methodology__layers li')).toHaveLength(5)
    expect(wrapper.findAll('.methodology__cards article')).toHaveLength(3)
    expect(wrapper.text()).toContain('MODULATES')
    expect(wrapper.text()).toContain('CONTRIBUTES_TO')
    expect(wrapper.text()).toContain('FEEDBACK_WITH')
    expect(wrapper.findAll('.methodology__evidence-levels article')).toHaveLength(4)
    expect(wrapper.get(`a[href="/${locale}/evidence"]`).exists()).toBe(true)
    expect(wrapper.text()).toContain(support.globalDisclaimer)
    expect(wrapper.text()).toContain(support.groupLevelCaution)
  })

  it('states Clinical Anchor, non-determinism, association, and individual boundaries', () => {
    const support = getSupportingKnowledge('en')
    const text = mount(MethodologyExperience, { props: { locale: 'en', content: methodologyContent.en, ...support }, global: globals }).text()
    expect(text).toContain('Clinical Anchor stays epistemically separate')
    expect(text).toContain('not a universal causal sequence')
    expect(text).toContain('Association, context, synthesis, and causation')
    expect(text).toContain('Group-level findings are not individual interpretation')
    expect(text).not.toMatch(/clinically validated model|proven causal model|comprehensive model of ADHD|systematic review/i)
  })

  it.each(['en', 'fa'] as const)('renders the %s About purpose, four experiences, boundaries, and disclaimer', (locale) => {
    const support = getSupportingKnowledge(locale)
    const wrapper = mount(AboutExperience, { props: { locale, content: aboutContent[locale], globalDisclaimer: support.globalDisclaimer }, global: globals })
    expect(wrapper.findAll('.about__experiences article')).toHaveLength(4)
    expect(wrapper.findAll('.about__boundaries li')).toHaveLength(6)
    expect(wrapper.text()).toContain(support.globalDisclaimer)
    expect(wrapper.text()).not.toMatch(/WP-\d+|Codex|Codebase Memory|implementation stage/i)
  })
})
