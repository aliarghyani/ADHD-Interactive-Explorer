import type {
  CanonicalNodeId,
  ConceptCategory,
  KnowledgeRepository,
  Locale,
  RelationshipEdgeId,
  RelationshipType,
} from '../../domain'
import type { DomainLocalization } from '../../localization'

export type FilterableLayer = Exclude<ConceptCategory, 'clinical-anchor'>

export const allFilterableLayers = Object.freeze([
  'context',
  'regulation',
  'behaviour',
  'pattern',
  'functional-domain',
] as const satisfies readonly FilterableLayer[])

export interface GraphNodeView {
  readonly id: CanonicalNodeId
  readonly category: ConceptCategory
  readonly label: string
  readonly canonicalName: string
  readonly selected: boolean
  readonly highlighted: boolean
  readonly visible: boolean
  readonly evidenceAvailable: boolean
  readonly evidenceLabel: string
}

export interface GraphEdgeView {
  readonly id: RelationshipEdgeId
  readonly sourceId: CanonicalNodeId
  readonly targetId: CanonicalNodeId
  readonly relationshipType: RelationshipType
  readonly highlighted: boolean
  readonly visible: boolean
}

export interface GraphReadModel {
  readonly nodes: readonly GraphNodeView[]
  readonly edges: readonly GraphEdgeView[]
  readonly selectedNodeId: CanonicalNodeId | null
  readonly highlightedNodeIds: ReadonlySet<CanonicalNodeId>
  readonly highlightedEdgeIds: ReadonlySet<RelationshipEdgeId>
  readonly visibleLayers: ReadonlySet<FilterableLayer>
}

export interface BuildGraphReadModelInput {
  readonly repository: KnowledgeRepository
  readonly localization: DomainLocalization
  readonly locale: Locale
  readonly selectedNodeId: CanonicalNodeId | null
  readonly visibleLayers: ReadonlySet<FilterableLayer>
}

/**
 * Projects canonical repository records into renderer-ready state. It does not
 * calculate geometry, discover relationships, or mutate domain records.
 */
export function buildGraphReadModel(input: BuildGraphReadModelInput): GraphReadModel {
  const { repository, localization, locale, selectedNodeId, visibleLayers } = input
  const selectedEdges = selectedNodeId
    ? [...repository.getIncomingRelationships(selectedNodeId), ...repository.getOutgoingRelationships(selectedNodeId)]
    : []
  const highlightedEdgeIds = new Set(selectedEdges.map((edge) => edge.id))
  const highlightedNodeIds = new Set<CanonicalNodeId>()

  if (selectedNodeId) {
    highlightedNodeIds.add(selectedNodeId)
    for (const node of repository.getNeighbours(selectedNodeId)) highlightedNodeIds.add(node.id)
  }

  const nodeVisibility = new Map(
    repository.nodes.map((node) => [
      node.id,
      node.category === 'clinical-anchor' || visibleLayers.has(node.category),
    ]),
  )

  const nodes = repository.nodes.map<GraphNodeView>((node) => {
    const localized = localization.getNode(node.id, locale)
    const label = localized.fields.label
    if (typeof label !== 'string') throw new TypeError(`Node label must be text: ${node.id}`)
    return Object.freeze({
      id: node.id,
      category: node.category,
      label,
      canonicalName: node.canonicalName,
      selected: node.id === selectedNodeId,
      highlighted: highlightedNodeIds.has(node.id),
      visible: nodeVisibility.get(node.id) === true,
      evidenceAvailable: node.evidenceIds.length > 0,
      evidenceLabel: node.evidenceStatus,
    })
  })

  const edges = repository.edges.map<GraphEdgeView>((edge) => Object.freeze({
    id: edge.id,
    sourceId: edge.sourceId,
    targetId: edge.targetId,
    relationshipType: edge.relationshipType,
    highlighted: highlightedEdgeIds.has(edge.id),
    visible: nodeVisibility.get(edge.sourceId) === true && nodeVisibility.get(edge.targetId) === true,
  }))

  return Object.freeze({
    nodes: Object.freeze(nodes),
    edges: Object.freeze(edges),
    selectedNodeId,
    highlightedNodeIds,
    highlightedEdgeIds,
    visibleLayers: new Set(visibleLayers),
  })
}
