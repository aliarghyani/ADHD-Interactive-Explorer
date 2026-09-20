import { spikeEdges, spikeNodes } from './spike-data'
import { selectDirectNeighbourIds, selectHighlightedEdgeIds } from './selectors'
import { categories, type Category, type GraphReadModel, type Locale } from './spike-types'

export function buildGraphReadModel(
  selectedNodeId: string | null,
  locale: Locale,
  visibleLayers: Category[] = [...categories],
): GraphReadModel {
  const selected = spikeNodes.some((node) => node.id === selectedNodeId) ? selectedNodeId : null
  const highlightedNodeIds = selectDirectNeighbourIds(selected)
  const highlightedEdgeIds = selectHighlightedEdgeIds(selected)
  const visible = new Set(visibleLayers)

  return {
    selectedNodeId: selected,
    highlightedNodeIds,
    highlightedEdgeIds,
    visibleLayers,
    nodes: spikeNodes.map((node) => ({
      id: node.id,
      category: node.category,
      label: node.labels[locale],
      selected: node.id === selected,
      highlighted: highlightedNodeIds.includes(node.id),
      visible: visible.has(node.category),
    })),
    edges: spikeEdges.map((edge) => ({
      ...edge,
      highlighted: highlightedEdgeIds.includes(edge.id),
      visible: visible.has(nodeByCategory(edge.sourceId)) && visible.has(nodeByCategory(edge.targetId)),
    })),
  }
}

function nodeByCategory(id: string): Category {
  const category = spikeNodes.find((node) => node.id === id)?.category
  if (!category) throw new Error(`Unknown node: ${id}`)
  return category
}
