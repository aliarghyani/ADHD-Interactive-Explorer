import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BidiIsolation from '../../app/components/BidiIsolation.vue'
import { bidiDirectionFor, citationFields } from '../../localization'
import { KnowledgeRepository } from '../../domain'
import { productionKnowledge } from '../unit/domain/fixture'
import { mixedDirectionSamples } from './fixtures'

describe('mixed-direction infrastructure', () => {
  it.each(mixedDirectionSamples)('isolates $kind content structurally', ({ kind, isolated }) => {
    const direction = bidiDirectionFor(kind)
    const wrapper = mount(BidiIsolation, { props: { direction }, slots: { default: isolated } })

    expect(wrapper.element.tagName).toBe('BDI')
    expect(wrapper.attributes('dir')).toBe(direction)
    expect(wrapper.text()).toBe(isolated)
  })

  it('keeps citation fields separate and forces identifiers to LTR', () => {
    const repository = new KnowledgeRepository(productionKnowledge)
    const source = repository.getSource(productionKnowledge.sources.sources[0]!.id)
    const fields = citationFields(source)

    expect(fields.map((field) => field.name)).toEqual(expect.arrayContaining(['authors', 'title', 'publication', 'year', 'url']))
    expect(fields.find((field) => field.name === 'title')?.dir).toBe('auto')
    expect(fields.find((field) => field.name === 'url')?.dir).toBe('ltr')
    expect(fields.every((field) => field.value.length > 0)).toBe(true)
  })
})
