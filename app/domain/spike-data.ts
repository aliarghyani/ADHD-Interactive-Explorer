import fixture from './spike-fixture.json'
import type { SpikeEdge, SpikeNode } from './spike-types'

export const spikeNodes = fixture.nodes as SpikeNode[]
export const spikeEdges = fixture.edges as SpikeEdge[]
export const spikeKnowledgeVersion = fixture.version

export const nodeById = new Map(spikeNodes.map((node) => [node.id, node]))

export function isCanonicalNodeId(value: unknown): value is string {
  return typeof value === 'string' && nodeById.has(value)
}
