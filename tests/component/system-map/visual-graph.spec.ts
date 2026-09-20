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
})
