import type { CanonicalNodeId, RelationshipEdgeId } from '../../domain'
import productionLayoutSource from '../../knowledge/layouts/production-layout.v1.json'

export interface GraphPoint {
  readonly x: number
  readonly y: number
}

export interface GraphBounds extends GraphPoint {
  readonly width: number
  readonly height: number
}

export interface NodeGeometry extends GraphBounds {
  readonly id: CanonicalNodeId
}

export interface EdgeGeometry {
  readonly id: RelationshipEdgeId
  readonly start: GraphPoint
  readonly bendPoints: readonly GraphPoint[]
  readonly end: GraphPoint
}

export interface LayoutArtifact {
  readonly layoutVersion: string
  readonly generatorVersion: string
  readonly knowledgeReleaseId: string
  readonly elkVersion: string
  readonly configurationVersion: string
  readonly overrideSetVersion: string
  readonly graphBounds: GraphBounds
  readonly nodeGeometry: readonly NodeGeometry[]
  readonly edgeGeometry: readonly EdgeGeometry[]
}

/** The reviewed WP-04 artifact; no browser layout or coordinate mutation occurs. */
export const productionLayout = productionLayoutSource as LayoutArtifact

export function nodeGeometryById(artifact: LayoutArtifact): ReadonlyMap<CanonicalNodeId, NodeGeometry> {
  return new Map(artifact.nodeGeometry.map((geometry) => [geometry.id, geometry]))
}

export function edgeGeometryById(artifact: LayoutArtifact): ReadonlyMap<RelationshipEdgeId, EdgeGeometry> {
  return new Map(artifact.edgeGeometry.map((geometry) => [geometry.id, geometry]))
}
