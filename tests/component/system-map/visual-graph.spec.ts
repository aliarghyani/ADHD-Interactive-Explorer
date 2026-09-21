import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import VisualGraph from '../../../app/components/system-map/VisualGraph.client.vue'
import { systemMapCopy } from '../../../features/system-map/copy'
import { allFilterableLayers, buildGraphReadModel } from '../../../features/system-map/graph-read-model'
import { systemMapRepository } from '../../../features/system-map/knowledge'
import { DomainLocalization } from '../../../localization'
import { productionLayout } from '../../../visualization/system-map/layout'

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    disconnect() {}
  })
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    callback(0)
    return 1
  })
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: () => undefined })
})

describe('VisualGraph', () => {
  it('renders exactly the projected canonical scientific edges', () => {
    const model = buildGraphReadModel({
      repository: systemMapRepository,
      localization: new DomainLocalization(systemMapRepository),
      locale: 'en',
      selectedNodeId: null,
      visibleLayers: new Set(allFilterableLayers),
    })
    const wrapper = mount(VisualGraph, {
      props: { model, layout: productionLayout, locale: 'en', copy: systemMapCopy.en },
    })

    const canonicalEdgeIds = systemMapRepository.edges.map((edge) => edge.id).sort()
    const projectedVisibleEdgeIds = model.edges.filter((edge) => edge.visible).map((edge) => edge.id).sort()
    const renderedScientificEdges = wrapper.findAll('[data-edge-id]')
    const renderedEdgeIds = renderedScientificEdges.map((edge) => edge.attributes('data-edge-id')).sort()

    expect(canonicalEdgeIds).toHaveLength(49)
    expect(systemMapRepository.edges.filter((edge) => edge.relationshipType === 'FEEDBACK_WITH')).toHaveLength(5)
    expect(model.edges).toHaveLength(49)
    expect(model.edges.filter((edge) => edge.relationshipType === 'FEEDBACK_WITH')).toHaveLength(5)
    expect(renderedScientificEdges.filter(
      (edge) => edge.attributes('data-relationship-type') === 'FEEDBACK_WITH',
    )).toHaveLength(5)
    expect(projectedVisibleEdgeIds).toEqual(canonicalEdgeIds)
    expect(renderedEdgeIds).toEqual(projectedVisibleEdgeIds)
  })

  it('renders the separate Clinical Anchor region and emits reset/focus/select events', async () => {
    const model = buildGraphReadModel({
      repository: systemMapRepository,
      localization: new DomainLocalization(systemMapRepository),
      locale: 'en',
      selectedNodeId: null,
      visibleLayers: new Set(allFilterableLayers),
    })
    const wrapper = mount(VisualGraph, {
      props: { model, layout: productionLayout, locale: 'en', copy: systemMapCopy.en },
    })

    expect(wrapper.get('.system-clinical-region').text()).toContain('Formal diagnostic definition')
    expect(wrapper.findAll('.system-graph-node')).toHaveLength(30)
    await wrapper.get('.system-reset-button').trigger('click')
    expect(wrapper.emitted('resetRequested')).toHaveLength(1)
    await wrapper.get('[data-node-id="BEH1"]').trigger('click')
    expect(wrapper.emitted('nodeSelected')).toEqual([['BEH1']])
    await wrapper.get('[data-node-id="BEH1"]').trigger('focus')
    expect(wrapper.emitted('nodeFocused')).toEqual([['BEH1']])
  })

  it('keeps one roving graph target independent from canonical selection', async () => {
    const model = buildGraphReadModel({
      repository: systemMapRepository,
      localization: new DomainLocalization(systemMapRepository),
      locale: 'en',
      selectedNodeId: 'BEH1',
      visibleLayers: new Set(allFilterableLayers),
    })
    const wrapper = mount(VisualGraph, {
      attachTo: document.body,
      props: { model, layout: productionLayout, locale: 'en', copy: systemMapCopy.en },
    })

    const rovingTargets = wrapper.findAll('.system-graph-node').filter((node) => node.attributes('tabindex') === '0')
    expect(rovingTargets).toHaveLength(1)
    expect(rovingTargets[0]!.attributes('data-node-id')).not.toBe(model.selectedNodeId)

    await (wrapper.vm as unknown as { focusNode: (id: 'BEH1') => Promise<void> }).focusNode('BEH1')
    expect(document.activeElement?.getAttribute('data-node-id')).toBe('BEH1')
    await wrapper.get('[data-node-id="BEH1"]').trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement?.getAttribute('data-node-id')).toBe('BEH2')

    await wrapper.get('[data-node-id="BEH2"]').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('nodeSelected')?.at(-1)).toEqual(['BEH2'])
    wrapper.unmount()
  })

  it('exposes educational region semantics and clinical separation non-visually', () => {
    const model = buildGraphReadModel({
      repository: systemMapRepository,
      localization: new DomainLocalization(systemMapRepository),
      locale: 'en',
      selectedNodeId: null,
      visibleLayers: new Set(allFilterableLayers),
    })
    const wrapper = mount(VisualGraph, {
      props: { model, layout: productionLayout, locale: 'en', copy: systemMapCopy.en },
    })

    expect(wrapper.get('.system-visual-graph').attributes('aria-describedby')).toContain('system-visual-graph-description')
    expect(wrapper.get('#system-visual-graph-description').text()).toContain('educational conceptual map')
    expect(wrapper.get('#system-visual-graph-description').text()).toContain('Formal clinical domains are separated')
  })
})
