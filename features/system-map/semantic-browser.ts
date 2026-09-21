import type {
  CanonicalNodeId,
  ConceptCategory,
  EvidenceId,
  KnowledgeRepository,
  Locale,
  RelationshipEdge,
  RelationshipEdgeId,
  RelationshipType,
} from '../../domain'
import type { DomainLocalization } from '../../localization'

export interface SemanticRelationshipItem {
  readonly edgeId: RelationshipEdgeId
  readonly nodeId: CanonicalNodeId
  readonly label: string
  readonly category: ConceptCategory
  readonly relationshipType: RelationshipType
  readonly evidenceIds: readonly EvidenceId[]
  readonly supportClassification: string
}

export interface SemanticRelationshipModel {
  readonly id: CanonicalNodeId
  readonly label: string
  readonly canonicalName: string
  readonly category: ConceptCategory
  readonly definition: string
  readonly evidenceLabel: string
  readonly evidenceCount: number
  readonly incoming: readonly SemanticRelationshipItem[]
  readonly outgoing: readonly SemanticRelationshipItem[]
  readonly upstream: readonly SemanticRelationshipItem[]
  readonly downstream: readonly SemanticRelationshipItem[]
  readonly feedback: readonly SemanticRelationshipItem[]
}

function localizedLabel(
  localization: DomainLocalization,
  nodeId: CanonicalNodeId,
  locale: Locale,
): string {
  const label = localization.getNode(nodeId, locale).fields.label
  if (typeof label !== 'string') throw new TypeError(`Node label must be text: ${nodeId}`)
  return label
}

function relationshipItem(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  locale: Locale,
  selectedNodeId: CanonicalNodeId,
  edge: RelationshipEdge,
): SemanticRelationshipItem {
  const nodeId = edge.sourceId === selectedNodeId ? edge.targetId : edge.sourceId
  const node = repository.getNode(nodeId)
  return Object.freeze({
    edgeId: edge.id,
    nodeId,
    label: localizedLabel(localization, nodeId, locale),
    category: node.category,
    relationshipType: edge.relationshipType,
    evidenceIds: edge.evidenceIds,
    supportClassification: edge.supportClassification,
  })
}

/** Projects only the selected concept's relationships from canonical domain queries. */
export function buildSemanticRelationshipModel(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  nodeId: CanonicalNodeId,
  locale: Locale,
): SemanticRelationshipModel {
  const node = repository.getNode(nodeId)
  const incoming = repository.getIncomingRelationships(nodeId)
  const outgoing = repository.getOutgoingRelationships(nodeId)
  const feedbackEdges = [...incoming, ...outgoing]
    .filter((edge, index, edges) => edge.relationshipType === 'FEEDBACK_WITH'
      && edges.findIndex((candidate) => candidate.id === edge.id) === index)

  const incomingItems = Object.freeze(incoming.map(
    (edge) => relationshipItem(repository, localization, locale, nodeId, edge),
  ))
  const outgoingItems = Object.freeze(outgoing.map(
    (edge) => relationshipItem(repository, localization, locale, nodeId, edge),
  ))

  return Object.freeze({
    id: node.id,
    label: localizedLabel(localization, node.id, locale),
    canonicalName: node.canonicalName,
    category: node.category,
    definition: node.definition,
    evidenceLabel: node.evidenceStatus,
    evidenceCount: repository.getEvidenceForNode(nodeId).length,
    incoming: incomingItems,
    outgoing: outgoingItems,
    upstream: Object.freeze(incomingItems.filter((item) => item.relationshipType !== 'FEEDBACK_WITH')),
    downstream: Object.freeze(outgoingItems.filter((item) => item.relationshipType !== 'FEEDBACK_WITH')),
    feedback: Object.freeze(feedbackEdges
      .map((edge) => relationshipItem(repository, localization, locale, nodeId, edge))),
  })
}
