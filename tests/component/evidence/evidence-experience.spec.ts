import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import EvidenceDetail from '../../../app/components/evidence/EvidenceDetail.vue'
import EvidenceIndex from '../../../app/components/evidence/EvidenceIndex.vue'
import { evidenceCopy } from '../../../features/evidence/copy'
import { evidenceRepository } from '../../../features/evidence/knowledge'
import { buildEvidenceDetail, buildEvidenceIndex } from '../../../features/evidence/model'
import { SafetyAccess } from '../../../safety'

const NuxtLinkStub = defineComponent({
  inheritAttrs: false,
  props: { to: { type: [String, Object], required: true } },
  setup(props, { attrs, slots }) {
    const href = typeof props.to === 'string' ? props.to : (props.to as { path: string }).path
    return () => h('a', { ...attrs, href }, slots.default?.())
  },
})
const safety = new SafetyAccess(evidenceRepository)

describe('WP-11 Evidence / Sources components', () => {
  it.each(['en', 'fa'] as const)('renders a searchable qualitative index in %s', async (locale) => {
    const wrapper = mount(EvidenceIndex, {
      props: {
        locale,
        records: buildEvidenceIndex(evidenceRepository),
        copy: evidenceCopy[locale],
        safetyText: safety.getRequired('groupLevelEvidenceCaution', locale).localized.fields.text as string,
      },
      global: { stubs: { NuxtLink: NuxtLinkStub } },
    })
    expect(wrapper.findAll('.evidence-card')).toHaveLength(23)
    expect(wrapper.findAll('[data-evidence-level="Clinical"]')).toHaveLength(4)
    expect(wrapper.text()).toContain(evidenceCopy[locale].authoritativeLanguage)
    expect(wrapper.find('progress').exists()).toBe(false)
    await wrapper.get('input[type="search"]').setValue('SRC_CAO_SLEEP_META_2025')
    expect(wrapper.findAll('.evidence-card')).toHaveLength(1)
    expect(wrapper.text()).toContain('EVID_SLEEP_CONTEXT')
    await wrapper.get('select').setValue('Limited')
    expect(wrapper.findAll('.evidence-card')).toHaveLength(0)
  })

  it('renders limitations before structured sources and preserves bidi fields', () => {
    const detail = buildEvidenceDetail(evidenceRepository, safety, 'EVID_CLINICAL_ANCHORS', 'fa')
    if (!detail) throw new Error('Missing evidence fixture')
    const wrapper = mount(EvidenceDetail, {
      props: { locale: 'fa', detail, copy: evidenceCopy.fa, returnTarget: '/fa/map/CA1' },
      global: { stubs: { NuxtLink: NuxtLinkStub } },
    })
    expect(wrapper.get('.evidence-detail__limitations').text()).toContain(detail.limitations[0])
    expect(wrapper.findAll('.citation-source')).toHaveLength(detail.sources.length)
    expect(wrapper.findAll('.citation-source bdi[dir="ltr"]').length).toBeGreaterThan(0)
    expect(wrapper.get('[data-safety-kind="evidence"]').text()).toContain('سطح گروه')
    expect(wrapper.find('a[href="/fa/map/CA1"]').exists()).toBe(true)
    expect(wrapper.text()).not.toMatch(/\b\d+\s*%|stars?|score|probability/i)
  })

  it('renders DOI only when authoritative metadata provides one', () => {
    const detail = buildEvidenceDetail(evidenceRepository, safety, 'EVID_INTERRUPTION_CONTEXT', 'en')
    if (!detail) throw new Error('Missing evidence fixture')
    const wrapper = mount(EvidenceDetail, {
      props: { locale: 'en', detail, copy: evidenceCopy.en },
      global: { stubs: { NuxtLink: NuxtLinkStub } },
    })
    for (const source of detail.sources) {
      const citation = wrapper.get(`#source-${source.id}`).element.closest('.citation-source')!
      const hasDoi = source.fields.some((field) => field.name === 'doi')
      expect(citation.textContent?.includes('DOI')).toBe(hasDoi)
    }
  })
})
