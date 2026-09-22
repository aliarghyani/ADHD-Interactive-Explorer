import type {
  CanonicalNodeId,
  CompactEvidenceMetadata,
  ContentId,
  KnowledgeRepository,
  Locale,
  RelationshipEdgeId,
  RelationshipType,
} from '../../domain'
import { compactEvidenceMetadata, DomainLookupError } from '../../domain'
import type { DomainLocalization } from '../../localization'
import type { SafetyAccess } from '../../safety'

type Fields = Readonly<Record<string, string | readonly string[]>>

function textField(fields: Fields, name: string): string {
  const value = fields[name]
  if (typeof value !== 'string') throw new TypeError(`Missing localized field: ${name}`)
  return value
}

export interface BehaviourLibraryItem {
  readonly id: CanonicalNodeId
  readonly statement: string
  readonly label: string
  readonly canonicalName: string
  readonly pathwayCount: number
}

export interface BehaviourConcept {
  readonly id: CanonicalNodeId
  readonly category: string
  readonly label: string
  readonly canonicalName: string
}

export interface EvidencePreview {
  readonly id: string
  readonly edgeId?: RelationshipEdgeId
  readonly relationshipType?: RelationshipType
  readonly relationshipLimitation?: string
  readonly evidence: readonly CompactEvidenceMetadata[]
}

export interface BehaviourPathway {
  readonly id: ContentId
  readonly explanation: string
  readonly scientificCaution: string
  readonly concepts: readonly BehaviourConcept[]
  readonly evidenceEntries: readonly EvidencePreview[]
}

export interface BehaviourPattern {
  readonly id: ContentId
  readonly concept: BehaviourConcept
  readonly conceptualThreshold: string
  readonly singleEventCaution: string
  readonly examples: string
  readonly evidenceEntry: EvidencePreview
}

export interface BehaviourFunctionExample {
  readonly id: ContentId
  readonly concept: BehaviourConcept
  readonly example: string
  readonly evidenceEntry: EvidencePreview | null
}

export interface BehaviourAlternative {
  readonly id: ContentId
  readonly label: string
  readonly explanation: string
  readonly safeWording: string
}

export interface BehaviourDetail {
  readonly id: CanonicalNodeId
  readonly statement: string
  readonly label: string
  readonly canonicalName: string
  readonly pathways: readonly BehaviourPathway[]
  readonly patterns: readonly BehaviourPattern[]
  readonly functions: readonly BehaviourFunctionExample[]
  readonly alternatives: readonly BehaviourAlternative[]
  readonly safety: Readonly<{
    behaviour: string
    alternatives: string
    pattern: string
    function: string
    evidence: string
  }>
}

function concept(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  nodeId: CanonicalNodeId,
  locale: Locale,
): BehaviourConcept {
  const localized = localization.getNode(nodeId, locale)
  return Object.freeze({
    id: nodeId,
    category: localized.node.category,
    label: textField(localized.fields, 'label'),
    canonicalName: localized.node.canonicalName,
  })
}

export function buildBehaviourLibrary(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  locale: Locale,
): readonly BehaviourLibraryItem[] {
  return Object.freeze(repository.behaviours.map((entry) => {
    const node = concept(repository, localization, entry.behaviourId, locale)
    return Object.freeze({
      id: entry.behaviourId,
      statement: textField(localization.getContent(entry.contentId, locale).fields, 'text'),
      label: node.label,
      canonicalName: node.canonicalName,
      pathwayCount: repository.getBehaviourPathways(entry.behaviourId).length,
    })
  }))
}

function evidenceForIds(repository: KnowledgeRepository, ids: readonly string[]): readonly CompactEvidenceMetadata[] {
  return Object.freeze(ids.map((id) => compactEvidenceMetadata(repository.getEvidence(id as `EVID_${string}`))))
}

export function buildBehaviourDetail(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  safetyAccess: SafetyAccess,
  behaviourId: string,
  locale: Locale,
): BehaviourDetail | null {
  let behaviour
  try {
    behaviour = repository.getBehaviour(behaviourId)
  } catch (error) {
    if (error instanceof DomainLookupError && error.code === 'UNKNOWN_BEHAVIOUR') return null
    throw error
  }

  const behaviourNode = concept(repository, localization, behaviour.behaviourId, locale)
  const relatedContexts = new Set([
    ...repository.getRelatedContexts(behaviour.behaviourId).canonicalGraph,
    ...repository.getRelatedContexts(behaviour.behaviourId).curatedContentMappings,
  ].map((node) => node.id))
  const relatedRegulation = new Set([
    ...repository.getRelatedRegulation(behaviour.behaviourId).canonicalGraph,
    ...repository.getRelatedRegulation(behaviour.behaviourId).curatedContentMappings,
  ].map((node) => node.id))

  const pathways = repository.getBehaviourPathways(behaviour.behaviourId).map((pathway) => {
    const concepts = pathway.orderedNodeIds.map((nodeId) => concept(repository, localization, nodeId, locale))
    const contextNode = concepts.find((item) => item.category === 'context')
    const regulationNode = concepts.find((item) => item.category === 'regulation')
    if (!contextNode || !regulationNode || !relatedContexts.has(contextNode.id) || !relatedRegulation.has(regulationNode.id)) {
      throw new TypeError(`Pathway ${pathway.id} is inconsistent with Behaviour domain relationships`)
    }
    const localized = localization.getContent(pathway.contentId, locale)
    return Object.freeze({
      id: pathway.id,
      explanation: textField(localized.fields, 'explanation'),
      scientificCaution: textField(localized.fields, 'scientificCaution'),
      concepts: Object.freeze(concepts),
      evidenceEntries: Object.freeze(pathway.edgeIds.map((edgeId) => {
        const edge = repository.getEdge(edgeId)
        return Object.freeze({
          id: `edge:${edge.id}`,
          edgeId: edge.id,
          relationshipType: edge.relationshipType,
          relationshipLimitation: edge.limitation,
          evidence: Object.freeze(repository.getEvidenceForRelationship(edge.id).map(compactEvidenceMetadata)),
        })
      })),
    })
  })

  const relatedPatternIds = new Set(repository.getRelatedPatterns(behaviour.behaviourId).curatedContentMappings.map((node) => node.id))
  const patterns = repository.getPatternRules(behaviour.behaviourId).map((rule) => {
    if (!relatedPatternIds.has(rule.patternId)) throw new TypeError(`Pattern rule ${rule.id} is inconsistent with domain relationships`)
    const localized = localization.getContent(rule.contentId, locale)
    return Object.freeze({
      id: rule.id,
      concept: concept(repository, localization, rule.patternId, locale),
      conceptualThreshold: textField(localized.fields, 'conceptualThreshold'),
      singleEventCaution: textField(localized.fields, 'singleEventCaution'),
      examples: textField(localized.fields, 'examples'),
      evidenceEntry: Object.freeze({
        id: `pattern:${rule.id}`,
        evidence: evidenceForIds(repository, rule.evidenceIds),
      }),
    })
  })

  const relatedFunctionIds = new Set(repository.getRelatedFunctionalDomains(behaviour.behaviourId).curatedContentMappings.map((node) => node.id))
  const functions = repository.getFunctionalExamples(behaviour.behaviourId).map((example) => {
    if (!relatedFunctionIds.has(example.domainId)) throw new TypeError(`Functional example ${example.id} is inconsistent with domain relationships`)
    const edge = example.edgeId ? repository.getEdge(example.edgeId) : null
    return Object.freeze({
      id: example.id,
      concept: concept(repository, localization, example.domainId, locale),
      example: textField(localization.getContent(example.contentId, locale).fields, 'example'),
      evidenceEntry: edge
        ? Object.freeze({
            id: `function:${example.id}`,
            edgeId: edge.id,
            relationshipType: edge.relationshipType,
            relationshipLimitation: edge.limitation,
            evidence: Object.freeze(repository.getEvidenceForRelationship(edge.id).map(compactEvidenceMetadata)),
          })
        : null,
    })
  })

  const alternatives = repository.getAlternativeExplanations(behaviour.behaviourId).map((alternative) => {
    const localized = localization.getContent(alternative.contentId, locale)
    return Object.freeze({
      id: alternative.id,
      label: textField(localized.fields, 'label'),
      explanation: textField(localized.fields, 'explanation'),
      safeWording: textField(localized.fields, 'safeWording'),
    })
  })

  const safetyText = (purpose: Parameters<SafetyAccess['getRequired']>[0]) =>
    textField(safetyAccess.getRequired(purpose, locale).localized.fields, 'text')

  return Object.freeze({
    id: behaviour.behaviourId,
    statement: textField(localization.getContent(behaviour.contentId, locale).fields, 'text'),
    label: behaviourNode.label,
    canonicalName: behaviourNode.canonicalName,
    pathways: Object.freeze(pathways),
    patterns: Object.freeze(patterns),
    functions: Object.freeze(functions),
    alternatives: Object.freeze(alternatives),
    safety: Object.freeze({
      behaviour: safetyText('behaviourCaution'),
      alternatives: safetyText('alternativeExplanationReminder'),
      pattern: safetyText('recurringPatternCaution'),
      function: safetyText('functionalImpactCaution'),
      evidence: safetyText('groupLevelEvidenceCaution'),
    }),
  })
}
