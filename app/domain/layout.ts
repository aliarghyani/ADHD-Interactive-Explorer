import artifact from '../generated/spike-layout.json'
import { spikeEdges, spikeNodes } from './spike-data'
import type { LayoutArtifact, NodeGeometry } from './spike-types'

export const spikeLayout = artifact as LayoutArtifact

export function validateLayoutArtifact(layout: LayoutArtifact): string[] {
  const errors: string[] = []
  if (!(layout.width > 0) || !(layout.height > 0)) errors.push('Graph dimensions must be positive')
  if (!layout.layoutVersion) errors.push('layoutVersion is required')
  if (!layout.generatorVersion) errors.push('generatorVersion is required')

  const nodeIds = layout.nodes.map((node) => node.id)
  const edgeIds = layout.edges.map((edge) => edge.id)
  compareCoverage(nodeIds, spikeNodes.map((node) => node.id), 'node', errors)
  compareCoverage(edgeIds, spikeEdges.map((edge) => edge.id), 'edge', errors)

  for (const node of layout.nodes) {
    if (![node.x, node.y, node.width, node.height].every(Number.isFinite) || node.width <= 0 || node.height <= 0) {
      errors.push(`Invalid node geometry: ${node.id}`)
    }
  }
  for (const edge of layout.edges) {
    const points = [edge.start, ...edge.bendPoints, edge.end]
    if (points.length < 2 || points.some((point) => !Number.isFinite(point.x) || !Number.isFinite(point.y))) {
      errors.push(`Invalid edge geometry: ${edge.id}`)
    }
  }
  return errors
}

function compareCoverage(actual: string[], expected: string[], kind: string, errors: string[]) {
  for (const id of expected) if (!actual.includes(id)) errors.push(`Missing ${kind} geometry: ${id}`)
  for (const id of actual) if (!expected.includes(id)) errors.push(`Unknown ${kind} geometry: ${id}`)
  for (const id of new Set(actual)) if (actual.filter((candidate) => candidate === id).length !== 1) errors.push(`Duplicate ${kind} geometry: ${id}`)
}

export const geometryByNodeId = new Map<string, NodeGeometry>(spikeLayout.nodes.map((node) => [node.id, node]))
