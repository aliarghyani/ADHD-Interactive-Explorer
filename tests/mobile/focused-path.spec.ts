import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import FocusedPathNavigator from '../../app/components/system-map/mobile/FocusedPathNavigator.vue'
import type { Locale } from '../../domain'
import { systemMapCopy } from '../../features/system-map/copy'
import { systemMapRepository } from '../../features/system-map/knowledge'
import { buildMobileFocusedPathModel, mobileCategoryOrder } from '../../features/system-map/mobile/focused-path'
import { buildSemanticRelationshipModel } from '../../features/system-map/semantic-browser'
import { useSystemMapExperience } from '../../features/system-map/system-map-experience'
import { DomainLocalization } from '../../localization'
import { SafetyAccess } from '../../safety'

const localization = new DomainLocalization(systemMapRepository)
const NuxtLinkStub = defineComponent({
  inheritAttrs: false,
  props: { to: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () => h('a', { ...attrs, href: props.to }, slots.default?.())
  },
})
const global = { stubs: { NuxtLink: NuxtLinkStub } }

describe('WP-12 mobile focused-path model', () => {
  it.each(['en', 'fa'] as const)('organizes all canonical concepts by authorized layers in %s', (locale) => {
    const model = buildMobileFocusedPathModel(systemMapRepository, localization, locale, null)

    expect(model.groups.map((group) => group.category)).toEqual(mobileCategoryOrder)
    expect(model.groups.flatMap((group) => group.concepts)).toHaveLength(30)
    expect(new Set(model.groups.flatMap((group) => group.concepts.map((concept) => concept.id))).size).toBe(30)
    expect(model.selectedConcept).toBeNull()
  })

  it('reuses Semantic Relationship Browser truth for the focused concept', () => {
    const mobile = buildMobileFocusedPathModel(systemMapRepository, localization, 'en', 'REG2')
    const semantic = buildSemanticRelationshipModel(systemMapRepository, localization, 'REG2', 'en')

    expect(mobile.selectedConcept).toEqual(semantic)
    expect(mobile.selectedConcept?.upstream.every((item) => item.relationshipType !== 'FEEDBACK_WITH')).toBe(true)
    expect(mobile.selectedConcept?.downstream.every((item) => item.relationshipType !== 'FEEDBACK_WITH')).toBe(true)
    expect(mobile.selectedConcept?.feedback.every((item) => item.relationshipType === 'FEEDBACK_WITH')).toBe(true)
  })

  it('keeps route-derived selectedNodeId as the only shared selection', async () => {
    const locale = ref<Locale>('en')
    const requestedNodeId = ref<string | null>('REG2')
    const navigate = vi.fn(async (path: string) => path)
    const experience = useSystemMapExperience({
      repository: systemMapRepository,
      localization,
      safety: new SafetyAccess(systemMapRepository),
      locale,
      requestedNodeId,
      navigate,
    })

    expect(experience.mobile.value.selectedConcept?.id).toBe(experience.selectedNodeId.value)
    await experience.selectNode('BEH4')
    expect(navigate).toHaveBeenCalledWith('/en/map/BEH4')
    requestedNodeId.value = 'BEH4'
    await nextTick()
    expect(experience.selectedNodeId.value).toBe('BEH4')
    expect(experience.mobile.value.selectedConcept?.id).toBe('BEH4')
  })

  it('preserves Clinical Anchor separation with no outgoing mechanistic sequence', () => {
    for (const nodeId of ['CA1', 'CA2'] as const) {
      const model = buildMobileFocusedPathModel(systemMapRepository, localization, 'en', nodeId)
      expect(model.selectedConcept?.downstream).toEqual([])
      expect(model.selectedConcept?.feedback).toEqual([])
    }
  })
})

describe('WP-12 FocusedPathNavigator component', () => {
  it('renders the default orientation as six structured canonical layer groups', () => {
    const model = buildMobileFocusedPathModel(systemMapRepository, localization, 'en', null)
    const wrapper = mount(FocusedPathNavigator, {
      props: { model, locale: 'en', copy: systemMapCopy.en },
      global,
    })

    expect(wrapper.text()).toContain('Relationships are many-to-many')
    expect(wrapper.findAll('[data-category]')).toHaveLength(6)
    expect(wrapper.findAll('.mobile-focused-path__concept-link')).toHaveLength(30)
    expect(wrapper.get('a[href="/en/map/REG2"]').text()).toContain('Working Memory')
    expect(wrapper.text()).toContain(systemMapCopy.en.clinicalSeparation)
  })

  it.each(['en', 'fa'] as const)('renders localized %s focus and canonical relationship routes', (locale) => {
    const model = buildMobileFocusedPathModel(systemMapRepository, localization, locale, 'REG2')
    const wrapper = mount(FocusedPathNavigator, {
      props: { model, locale, copy: systemMapCopy[locale] },
      global,
    })

    expect(wrapper.get('.mobile-focused-path__current h2').text()).toBe(model.selectedConcept!.label)
    expect(wrapper.get('.mobile-focused-path__reset').attributes('href')).toBe(`/${locale}/map`)
    expect(wrapper.findAll('[data-relationship-group="upstream"] li')).toHaveLength(model.selectedConcept!.upstream.length)
    expect(wrapper.findAll('[data-relationship-group="downstream"] li')).toHaveLength(model.selectedConcept!.downstream.length)
    expect(wrapper.findAll('[data-relationship-group="feedback"] li')).toHaveLength(model.selectedConcept!.feedback.length)
    const firstRelated = model.selectedConcept!.upstream[0] ?? model.selectedConcept!.downstream[0] ?? model.selectedConcept!.feedback[0]
    expect(wrapper.get(`a[href="/${locale}/map/${firstRelated!.nodeId}"]`).exists()).toBe(true)
  })

  it('makes Feedback reciprocal and qualified rather than deterministic', () => {
    const model = buildMobileFocusedPathModel(systemMapRepository, localization, 'en', 'CTX2')
    const wrapper = mount(FocusedPathNavigator, {
      props: { model, locale: 'en', copy: systemMapCopy.en },
      global,
    })

    expect(model.selectedConcept!.feedback.length).toBeGreaterThan(0)
    expect(wrapper.get('[data-relationship-group="feedback"]').text()).toContain('Reciprocal relationship')
    expect(wrapper.get('[data-relationship-group="feedback"]').text()).toContain('does not imply inevitability')
    expect(wrapper.get('[data-relationship-group="feedback"]').text()).toContain('↔')
  })

  it('shows empty canonical groups without fabricating relationships', () => {
    const model = buildMobileFocusedPathModel(systemMapRepository, localization, 'en', 'CA1')
    const wrapper = mount(FocusedPathNavigator, {
      props: { model, locale: 'en', copy: systemMapCopy.en },
      global,
    })

    expect(wrapper.get('[data-relationship-group="downstream"]').text()).toContain(systemMapCopy.en.none)
    expect(wrapper.get('[data-relationship-group="feedback"]').text()).toContain(systemMapCopy.en.none)
    expect(wrapper.text()).toContain(systemMapCopy.en.clinicalSeparation)
  })

  it('exposes only authorized cross-feature actions', () => {
    const behaviour = mount(FocusedPathNavigator, {
      props: {
        model: buildMobileFocusedPathModel(systemMapRepository, localization, 'en', 'BEH1'),
        locale: 'en',
        copy: systemMapCopy.en,
      },
      global,
    })
    expect(behaviour.get('a[href="/en/behaviours/BEH1"]').exists()).toBe(true)
    expect(behaviour.find('a[href="/en/context/BEH1"]').exists()).toBe(false)

    const context = mount(FocusedPathNavigator, {
      props: {
        model: buildMobileFocusedPathModel(systemMapRepository, localization, 'en', 'CTX2'),
        locale: 'en',
        copy: systemMapCopy.en,
      },
      global,
    })
    expect(context.get('a[href="/en/context/CTX2"]').exists()).toBe(true)
    expect(context.find('a[href="/en/behaviours/CTX2"]').exists()).toBe(false)
    expect(context.get('a[href="/en/methodology"]').exists()).toBe(true)
  })
})
