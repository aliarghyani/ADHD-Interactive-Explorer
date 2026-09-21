import type {
  CanonicalNodeId,
  ConceptCategory,
  KnowledgeRepository,
  Locale,
  RelationshipEdgeId,
  RelationshipType,
} from '../../domain'
import type { DomainLocalization } from '../../localization'
import { buildSemanticRelationshipModel, type SemanticRelationshipModel } from './semantic-browser'

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

export function buildSelectedNodeDetail(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  nodeId: CanonicalNodeId,
  locale: Locale,
): SelectedNodeDetail {
  return semanticModelToSelectedNodeDetail(
    buildSemanticRelationshipModel(repository, localization, nodeId, locale),
  )
}

export function semanticModelToSelectedNodeDetail(model: SemanticRelationshipModel): SelectedNodeDetail {
  return Object.freeze({
    id: model.id,
    label: model.label,
    canonicalName: model.canonicalName,
    category: model.category,
    definition: model.definition,
    evidenceLabel: model.evidenceLabel,
    evidenceCount: model.evidenceCount,
    incoming: Object.freeze(model.incoming.map(({ edgeId, nodeId, label, relationshipType }) => Object.freeze({
      edgeId,
      nodeId,
      label,
      relationshipType,
    }))),
    outgoing: Object.freeze(model.outgoing.map(({ edgeId, nodeId, label, relationshipType }) => Object.freeze({
      edgeId,
      nodeId,
      label,
      relationshipType,
    }))),
  })
}
