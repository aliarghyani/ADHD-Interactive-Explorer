import { computed, defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import SemanticRelationshipBrowser from '../app/components/SemanticRelationshipBrowser.vue'
import VisualGraph from '../app/components/VisualGraph.client.vue'
import { buildGraphReadModel } from '../app/domain/graph-read-model'
import { spikeLayout } from '../app/domain/layout'

describe('visual and semantic surfaces', () => {
  it('keeps graph and Semantic Browser synchronized through one external ID', async () => {
    const Harness = defineComponent({
      setup() {
        const selected = ref<string | null>(null)
        const model = computed(() => buildGraphReadModel(selected.value, 'en'))
        return () => h('div', [
          h(VisualGraph, { model: model.value, layout: spikeLayout, locale: 'en', onSelect: (id: string) => { selected.value = id } }),
          h(SemanticRelationshipBrowser, { selectedNodeId: selected.value, locale: 'en', onSelect: (id: string) => { selected.value = id } }),
        ])
      },
    })
    const wrapper = mount(Harness, { attachTo: document.body })

    await wrapper.get('[data-node-id="BEH1"]').trigger('click')
    await nextTick()
    expect(wrapper.get('[data-testid="selected-summary"]').text()).toContain('BEH1')

    const downstream = wrapper.findAll('.relationship-groups section')[1]!
    await downstream.get('button').trigger('click')
    await nextTick()
    expect(wrapper.get('[data-node-id="PAT1"]').attributes('aria-pressed')).toBe('true')
  })

  it('separates focus from selection and selects with Enter', async () => {
    const onSelect = vi.fn()
    const wrapper = mount(VisualGraph, {
      attachTo: document.body,
      props: { model: buildGraphReadModel(null, 'fa'), layout: spikeLayout, locale: 'fa', onSelect },
    })
    const context = wrapper.get('[data-node-id="CTX6"]')
    await context.trigger('focus')
    expect(onSelect).not.toHaveBeenCalled()
    await context.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    const regulation = wrapper.get('[data-node-id="REG3"]')
    expect(regulation.attributes('tabindex')).toBe('0')
    await regulation.trigger('keydown', { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith('REG3')
    onSelect.mockClear()
    await regulation.trigger('keydown', { key: ' ' })
    expect(onSelect).toHaveBeenCalledWith('REG3')
  })

  it('throws only the client renderer when failure simulation is requested', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    expect(() => mount(VisualGraph, {
      props: { model: buildGraphReadModel('BEH1', 'en'), layout: spikeLayout, locale: 'en', simulateFailure: true },
    })).toThrow('Intentional visual graph failure')
    warn.mockRestore()
  })
})
