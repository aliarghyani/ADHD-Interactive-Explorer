import { nodeById, spikeEdges } from './spike-data'
import type { SpikeEdge } from './spike-types'

export function selectNode(id: string | null) {
  return id ? nodeById.get(id) ?? null : null
}

export function selectUpstream(id: string | null): SpikeEdge[] {
  return id ? spikeEdges.filter((edge) => edge.targetId === id && edge.relationshipType !== 'FEEDBACK_WITH') : []
}

export function selectDownstream(id: string | null): SpikeEdge[] {
  return id ? spikeEdges.filter((edge) => edge.sourceId === id && edge.relationshipType !== 'FEEDBACK_WITH') : []
}

export function selectFeedback(id: string | null): SpikeEdge[] {
  return id
    ? spikeEdges.filter(
        (edge) => edge.relationshipType === 'FEEDBACK_WITH' && (edge.sourceId === id || edge.targetId === id),
      )
    : []
}

export function selectRelatedEdges(id: string | null): SpikeEdge[] {
  return [...selectUpstream(id), ...selectDownstream(id), ...selectFeedback(id)]
}

export function selectDirectNeighbourIds(id: string | null): string[] {
  if (!id) return []
  return [...new Set(selectRelatedEdges(id).map((edge) => (edge.sourceId === id ? edge.targetId : edge.sourceId)))]
}

export function selectHighlightedEdgeIds(id: string | null): string[] {
  return selectRelatedEdges(id).map((edge) => edge.id)
}
