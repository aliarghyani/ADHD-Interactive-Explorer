import { describe, expect, it } from 'vitest'
import { buildGraphReadModel, allFilterableLayers } from '../../../features/system-map/graph-read-model'
import { systemMapRepository } from '../../../features/system-map/knowledge'
import { DomainLocalization } from '../../../localization'

const localization = new DomainLocalization(systemMapRepository)

function model(
  selectedNodeId: Parameters<typeof buildGraphReadModel>[0]['selectedNodeId'] = null,
  visibleLayers = new Set(allFilterableLayers),
) {
  return buildGraphReadModel({
    repository: systemMapRepository,
    localization,
    locale: 'en',
    selectedNodeId,
    visibleLayers,
  })
}

describe('GraphReadModel', () => {
  it('projects all canonical nodes and edges without geometry', () => {
    const result = model()

    expect(result.nodes).toHaveLength(30)
    expect(result.edges).toHaveLength(49)
    expect(result.nodes.map((node) => node.category)).toContain('clinical-anchor')
    expect(result.edges.map((edge) => edge.relationshipType)).toEqual(expect.arrayContaining([
      'MODULATES',
      'CONTRIBUTES_TO',
      'FEEDBACK_WITH',
    ]))
    expect(result.nodes[0]).not.toHaveProperty('x')
    expect(result.edges[0]).not.toHaveProperty('bendPoints')
  })

  it('uses localized node labels while preserving canonical identity', () => {
    const en = model().nodes.find((node) => node.id === 'BEH1')
    const fa = buildGraphReadModel({
      repository: systemMapRepository,
      localization,
      locale: 'fa',
      selectedNodeId: null,
      visibleLayers: new Set(allFilterableLayers),
    }).nodes.find((node) => node.id === 'BEH1')

    expect(en?.label).toBe('Starting')
    expect(fa?.label).toBe('شروع کردن')
    expect(fa?.canonicalName).toBe(en?.canonicalName)
  })

  it('highlights only the selected node, direct canonical neighbours, and incident edges', () => {
    const result = model('BEH1')
    const expectedNeighbours = new Set(['BEH1', ...systemMapRepository.getNeighbours('BEH1').map((node) => node.id)])
    const expectedEdges = new Set([
      ...systemMapRepository.getIncomingRelationships('BEH1'),
      ...systemMapRepository.getOutgoingRelationships('BEH1'),
    ].map((edge) => edge.id))

    expect(result.nodes.find((node) => node.id === 'BEH1')?.selected).toBe(true)
    expect(result.highlightedNodeIds).toEqual(expectedNeighbours)
    expect(result.highlightedEdgeIds).toEqual(expectedEdges)
    expect(result.nodes.find((node) => node.id === 'CA1')?.highlighted).toBe(false)
  })

  it('changes visibility without deleting canonical projection records', () => {
    const result = model(null, new Set(['regulation']))

    expect(result.nodes).toHaveLength(30)
    expect(result.edges).toHaveLength(49)
    expect(result.nodes.filter((node) => node.visible).every((node) => ['clinical-anchor', 'regulation'].includes(node.category))).toBe(true)
    expect(result.nodes.find((node) => node.id === 'CTX1')?.visible).toBe(false)
    expect(result.nodes.find((node) => node.id === 'CA1')?.visible).toBe(true)
    expect(result.edges.some((edge) => edge.visible)).toBe(false)
  })
})
