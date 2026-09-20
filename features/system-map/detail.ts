import type {
  CanonicalNodeId,
  ConceptCategory,
  KnowledgeRepository,
  Locale,
  RelationshipEdgeId,
  RelationshipType,
} from '../../domain'
import type { DomainLocalization } from '../../localization'

export interface RelationshipSummary {
  readonly edgeId: RelationshipEdgeId
  readonly nodeId: CanonicalNodeId
  readonly label: string
  readonly relationshipType: RelationshipType
}

export interface SelectedNodeDetail {
  readonly id: CanonicalNodeId
  readonly label: string
  readonly canonicalName: string
  readonly category: ConceptCategory
  readonly definition: string
  readonly evidenceLabel: string
  readonly evidenceCount: number
  readonly incoming: readonly RelationshipSummary[]
  readonly outgoing: readonly RelationshipSummary[]
}

function labelFor(localization: DomainLocalization, nodeId: CanonicalNodeId, locale: Locale): string {
  const label = localization.getNode(nodeId, locale).fields.label
  if (typeof label !== 'string') throw new TypeError(`Node label must be text: ${nodeId}`)
  return label
}

export function buildSelectedNodeDetail(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  nodeId: CanonicalNodeId,
  locale: Locale,
): SelectedNodeDetail {
  const node = repository.getNode(nodeId)
  const incoming = repository.getIncomingRelationships(nodeId).map((edge) => Object.freeze({
    edgeId: edge.id,
    nodeId: edge.sourceId,
    label: labelFor(localization, edge.sourceId, locale),
    relationshipType: edge.relationshipType,
  }))
  const outgoing = repository.getOutgoingRelationships(nodeId).map((edge) => Object.freeze({
    edgeId: edge.id,
    nodeId: edge.targetId,
    label: labelFor(localization, edge.targetId, locale),
    relationshipType: edge.relationshipType,
  }))

  return Object.freeze({
    id: node.id,
    label: labelFor(localization, node.id, locale),
    canonicalName: node.canonicalName,
    category: node.category,
    definition: node.definition,
    evidenceLabel: node.evidenceStatus,
    evidenceCount: repository.getEvidenceForNode(nodeId).length,
    incoming: Object.freeze(incoming),
    outgoing: Object.freeze(outgoing),
  })
}
