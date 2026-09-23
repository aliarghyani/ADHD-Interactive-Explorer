import type {
  CanonicalNodeId,
  ConceptCategory,
  KnowledgeRepository,
  Locale,
} from '../../../domain'
import type { DomainLocalization } from '../../../localization'
import {
  buildSemanticRelationshipModel,
  type SemanticRelationshipModel,
} from '../semantic-browser'

export const mobileCategoryOrder = Object.freeze([
  'clinical-anchor',
  'context',
  'regulation',
  'behaviour',
  'pattern',
  'functional-domain',
] as const satisfies readonly ConceptCategory[])

export interface MobileConceptEntry {
  readonly id: CanonicalNodeId
  readonly label: string
  readonly canonicalName: string
  readonly category: ConceptCategory
  readonly evidenceAvailable: boolean
}

export interface MobileConceptGroup {
  readonly category: ConceptCategory
  readonly concepts: readonly MobileConceptEntry[]
}

export interface MobileFocusedPathModel {
  readonly groups: readonly MobileConceptGroup[]
  readonly selectedConcept: SemanticRelationshipModel | null
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

/**
 * Builds mobile orientation and focus from canonical nodes and the existing
 * semantic relationship projection. It does not inspect layout or geometry.
 */
export function buildMobileFocusedPathModel(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  locale: Locale,
  selectedNodeId: CanonicalNodeId | null,
): MobileFocusedPathModel {
  const groups = mobileCategoryOrder.map((category) => Object.freeze({
    category,
    concepts: Object.freeze(repository.nodes
      .filter((node) => node.category === category)
      .map((node) => Object.freeze({
        id: node.id,
        label: localizedLabel(localization, node.id, locale),
        canonicalName: node.canonicalName,
        category: node.category,
        evidenceAvailable: node.evidenceIds.length > 0,
      }))),
  }))

  return Object.freeze({
    groups: Object.freeze(groups),
    selectedConcept: selectedNodeId
      ? buildSemanticRelationshipModel(repository, localization, selectedNodeId, locale)
      : null,
  })
}
