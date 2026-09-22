import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import GraphEdgeLayer from '../../../app/components/system-map/GraphEdgeLayer.vue'
import GraphLegend from '../../../app/components/system-map/GraphLegend.vue'
import GraphNode from '../../../app/components/system-map/GraphNode.vue'
import NodeDetailPanel from '../../../app/components/system-map/NodeDetailPanel.vue'
import { systemMapCopy } from '../../../features/system-map/copy'
import { buildSelectedNodeDetail } from '../../../features/system-map/detail'
import { buildGraphReadModel, allFilterableLayers } from '../../../features/system-map/graph-read-model'
import { systemMapRepository } from '../../../features/system-map/knowledge'
import { DomainLocalization } from '../../../localization'
import { edgeGeometryById, nodeGeometryById, productionLayout } from '../../../visualization/system-map/layout'

const localization = new DomainLocalization(systemMapRepository)
const NuxtLinkStub = defineComponent({
  inheritAttrs: false,
  props: { to: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () => h('a', { ...attrs, href: props.to }, slots.default?.())
  },
})
const graph = buildGraphReadModel({
  repository: systemMapRepository,
  localization,
  locale: 'en',
  selectedNodeId: 'BEH1',
  visibleLayers: new Set(allFilterableLayers),
})

describe('System Map components', () => {
  it('GraphNode renders semantic category treatment and emits canonical selection', async () => {
    const node = graph.nodes.find((candidate) => candidate.id === 'BEH1')!
    const geometry = nodeGeometryById(productionLayout).get(node.id)!
    const wrapper = mount(GraphNode, { props: { node, geometry, locale: 'en', deemphasized: false } })

    expect(wrapper.classes()).toContain('category-behaviour')
    expect(wrapper.text()).toContain('Observable behaviour')
    expect(wrapper.attributes('data-node-id')).toBe('BEH1')
    await wrapper.trigger('click')
    expect(wrapper.emitted('select')).toEqual([['BEH1']])
  })

  it('renders Clinical Anchor as a formal, textual clinical category', () => {
    const model = buildGraphReadModel({
      repository: systemMapRepository,
      localization,
      locale: 'en',
      selectedNodeId: null,
      visibleLayers: new Set(allFilterableLayers),
    })
    const node = model.nodes.find((candidate) => candidate.id === 'CA1')!
    const geometry = nodeGeometryById(productionLayout).get(node.id)!
    const wrapper = mount(GraphNode, { props: { node, geometry, locale: 'en', deemphasized: false } })

    expect(wrapper.classes()).toContain('category-clinical-anchor')
    expect(wrapper.text()).toContain('Formal diagnostic domain')
    expect(wrapper.text()).toContain('CLINICAL')
  })

  it('GraphEdgeLayer consumes the exact precomputed route', () => {
    const edge = graph.edges.find((candidate) => candidate.id === 'EDGE_REG5_BEH1_CONTRIBUTES_TO')!
    const route = edgeGeometryById(productionLayout).get(edge.id)!
    const expectedPoints = [route.start, ...route.bendPoints, route.end]
      .map((point) => `${point.x},${point.y}`)
      .join(' ')
    const wrapper = mount(GraphEdgeLayer, {
      props: { edges: [edge], layout: productionLayout, hasSelection: true },
    })

    expect(wrapper.get('polyline').attributes('points')).toBe(expectedPoints)
    expect(wrapper.get('polyline').classes()).toContain('relationship-contributes-to')
    expect(wrapper.get('polyline').attributes('data-relationship-type')).toBe('CONTRIBUTES_TO')
  })

  it('legend explains every node category and canonical relationship type', () => {
    const wrapper = mount(GraphLegend, { props: { locale: 'en', heading: 'Visual legend' } })

    expect(wrapper.text()).toContain('Formal diagnostic domain')
    expect(wrapper.text()).toContain('Context modifier')
    expect(wrapper.text()).toContain('Associated explanatory process')
    expect(wrapper.text()).toContain('MODULATES')
    expect(wrapper.text()).toContain('CONTRIBUTES_TO')
    expect(wrapper.text()).toContain('FEEDBACK_WITH')
    expect(wrapper.text()).toContain('neither necessary nor sufficient')
    expect(wrapper.findAll('[data-edge-id]')).toHaveLength(0)
    expect(wrapper.findAll('[data-relationship-type]')).toHaveLength(0)
  })

  it('detail panel presents progressive selected-concept content', () => {
    const detail = buildSelectedNodeDetail(systemMapRepository, localization, 'BEH1', 'en')
    const wrapper = mount(NodeDetailPanel, {
      props: { detail, locale: 'en', copy: systemMapCopy.en },
      global: { stubs: { NuxtLink: NuxtLinkStub } },
    })

    expect(wrapper.text()).toContain('Starting')
    expect(wrapper.text()).toContain('Direct relationships')
    expect(wrapper.text()).toContain('Scientific explanation')
    expect(wrapper.text()).toContain('Evidence entry point')
    expect(wrapper.text()).toContain('REG3')
    expect(wrapper.html()).toContain('/en/behaviours/BEH1')
    expect(wrapper.text()).toContain('Explore this Behaviour in plain language')
  })

  it('offers Behaviour Explorer entry only for canonical Behaviour nodes', () => {
    const detail = buildSelectedNodeDetail(systemMapRepository, localization, 'REG3', 'en')
    const wrapper = mount(NodeDetailPanel, {
      props: { detail, locale: 'en', copy: systemMapCopy.en },
      global: { stubs: { NuxtLink: NuxtLinkStub } },
    })

    expect(wrapper.html()).not.toContain('/en/behaviours/REG3')
    expect(wrapper.text()).not.toContain('Explore this Behaviour in plain language')
  })
})
