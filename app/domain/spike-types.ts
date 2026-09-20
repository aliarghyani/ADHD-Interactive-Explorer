export type Locale = 'en' | 'fa'

export const categories = [
  'clinical-anchor',
  'context',
  'regulation',
  'behaviour',
  'pattern',
  'functional-domain',
] as const

export type Category = (typeof categories)[number]
export type RelationshipType = 'MODULATES' | 'CONTRIBUTES_TO' | 'FEEDBACK_WITH'

export interface SpikeNode {
  id: string
  category: Category
  labels: Record<Locale, string>
}

export interface SpikeEdge {
  id: string
  sourceId: string
  targetId: string
  relationshipType: RelationshipType
}

export interface GraphNodeProjection {
  id: string
  category: Category
  label: string
  selected: boolean
  highlighted: boolean
  visible: boolean
}

export interface GraphEdgeProjection extends SpikeEdge {
  highlighted: boolean
  visible: boolean
}

export interface GraphReadModel {
  nodes: GraphNodeProjection[]
  edges: GraphEdgeProjection[]
  selectedNodeId: string | null
  highlightedNodeIds: string[]
  highlightedEdgeIds: string[]
  visibleLayers: Category[]
}

export interface Point { x: number; y: number }
export interface NodeGeometry extends Point { id: string; width: number; height: number }
export interface EdgeGeometry { id: string; start: Point; bendPoints: Point[]; end: Point }

export interface LayoutArtifact {
  width: number
  height: number
  layoutVersion: string
  generatorVersion: string
  elkVersion: string
  knowledgeVersion: string
  nodes: NodeGeometry[]
  edges: EdgeGeometry[]
}
