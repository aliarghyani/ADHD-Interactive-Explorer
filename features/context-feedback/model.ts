import { compactEvidenceMetadata, DomainLookupError } from '../../domain'
import type {
  CanonicalNodeId,
  CompactEvidenceMetadata,
  ContentId,
  KnowledgeRepository,
  Locale,
  RelationshipEdgeId,
  RelationshipType,
} from '../../domain'
import type { DomainLocalization } from '../../localization'
import type { SafetyAccess } from '../../safety'

type Fields = Readonly<Record<string, string | readonly string[]>>

function textField(fields: Fields, name: string): string {
  const value = fields[name]
  if (typeof value !== 'string') throw new TypeError(`Missing localized field: ${name}`)
  return value
}

export const qualitativeStates = Object.freeze(['supportive', 'neutral', 'demanding'] as const)
export type QualitativeState = (typeof qualitativeStates)[number]

export function isQualitativeState(value: string | null): value is QualitativeState {
  return value !== null && qualitativeStates.includes(value as QualitativeState)
}

export type ContextRole = 'buffering' | 'variable' | 'increases-demand' | 'interfering'

function contextRole(value: string): ContextRole {
  const normalized = value.replaceAll('`', '').trim()
  if (normalized === 'buffering' || normalized === 'variable' || normalized === 'increases-demand' || normalized === 'interfering') {
    return normalized
  }
  throw new TypeError(`Unsupported Context qualitative role: ${value}`)
}

export interface ContextConcept {
  readonly id: CanonicalNodeId
  readonly category: string
  readonly label: string
  readonly canonicalName: string
}

export interface ContextEvidencePreview {
  readonly id: string
  readonly label: string
  readonly edgeId?: RelationshipEdgeId
  readonly relationshipType?: RelationshipType
  readonly relationshipLimitation?: string
  readonly evidence: readonly CompactEvidenceMetadata[]
}

export interface ContextLibraryItem {
  readonly id: CanonicalNodeId
  readonly label: string
  readonly canonicalName: string
  readonly mappingCount: number
  readonly feedbackCount: number
}

export interface ContextMappingView {
  readonly id: ContentId
  readonly role: ContextRole
  readonly explanation: string
  readonly context: ContextConcept
  readonly regulation: ContextConcept
  readonly behaviour: ContextConcept
  readonly contextEvidence: ContextEvidencePreview
  readonly behaviourEvidence: ContextEvidencePreview
}

export interface ContextDownstream {
  readonly id: string
  readonly kind: 'pattern' | 'functional-domain'
  readonly concept: ContextConcept
  readonly explanations: readonly Readonly<{ sourceBehaviourId: CanonicalNodeId, text: string }>[]
  readonly sourceBehaviourIds: readonly CanonicalNodeId[]
}

export interface ContextFeedbackRelationship {
  readonly id: RelationshipEdgeId
  readonly source: ContextConcept
  readonly target: ContextConcept
  readonly relationshipType: RelationshipType
  readonly limitation: string
}

export interface ContextFeedbackLoop {
  readonly id: ContentId
  readonly title: string
  readonly orderedSteps: string
  readonly explanation: string
  readonly caution: string
  readonly concepts: readonly ContextConcept[]
  readonly returningRelationships: readonly ContextFeedbackRelationship[]
  readonly evidenceEntry: ContextEvidencePreview
}

export interface ContextDetail {
  readonly id: CanonicalNodeId
  readonly label: string
  readonly canonicalName: string
  readonly mappings: readonly ContextMappingView[]
  readonly downstream: readonly ContextDownstream[]
  readonly feedbackLoops: readonly ContextFeedbackLoop[]
  readonly safety: Readonly<{
    educational: string
    relationships: string
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
): ContextConcept {
  const localized = localization.getNode(nodeId, locale)
  return Object.freeze({
    id: nodeId,
    category: localized.node.category,
    label: textField(localized.fields, 'label'),
    canonicalName: localized.node.canonicalName,
  })
}

function evidenceForIds(repository: KnowledgeRepository, ids: readonly string[]): readonly CompactEvidenceMetadata[] {
  return Object.freeze(ids.map((id) => compactEvidenceMetadata(repository.getEvidence(id as `EVID_${string}`))))
}

export function buildContextLibrary(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  locale: Locale,
): readonly ContextLibraryItem[] {
  return Object.freeze(repository.nodes.filter((node) => node.category === 'context').map((node) => {
    const localized = concept(repository, localization, node.id, locale)
    return Object.freeze({
      id: node.id,
      label: localized.label,
      canonicalName: node.canonicalName,
      mappingCount: repository.getContextMappings(node.id).length,
      feedbackCount: repository.getFeedbackLoops(node.id).length,
    })
  }))
}

export function buildContextDetail(
  repository: KnowledgeRepository,
  localization: DomainLocalization,
  safetyAccess: SafetyAccess,
  contextId: string,
  locale: Locale,
): ContextDetail | null {
  let contextNode
  try {
    contextNode = repository.getContext(contextId)
  } catch (error) {
    if (error instanceof DomainLookupError && (error.code === 'UNKNOWN_CONTEXT' || error.code === 'UNKNOWN_NODE')) return null
    throw error
  }

  const contextConcept = concept(repository, localization, contextNode.id, locale)
  const relatedRegulationIds = new Set([
    ...repository.getRelatedRegulation(contextNode.id).canonicalGraph,
    ...repository.getRelatedRegulation(contextNode.id).curatedContentMappings,
  ].map((node) => node.id))

  const mappings = repository.getContextMappings(contextNode.id).map((mapping) => {
    if (!relatedRegulationIds.has(mapping.regulationId)) {
      throw new TypeError(`Context mapping ${mapping.id} is inconsistent with Context domain relationships`)
    }
    const regulation = concept(repository, localization, mapping.regulationId, locale)
    const behaviour = concept(repository, localization, mapping.behaviourId, locale)
    if (behaviour.category !== 'behaviour') throw new TypeError(`Context mapping ${mapping.id} does not target a Behaviour`)

    const contextEdge = repository.getOutgoingRelationships(contextNode.id).find((edge) =>
      edge.targetId === mapping.regulationId && edge.relationshipType === 'MODULATES')
    const behaviourEdge = repository.getOutgoingRelationships(mapping.regulationId).find((edge) =>
      edge.targetId === mapping.behaviourId && edge.relationshipType === 'CONTRIBUTES_TO')
    if (!contextEdge || !behaviourEdge) throw new TypeError(`Context mapping ${mapping.id} is missing a canonical relationship`)

    return Object.freeze({
      id: mapping.id,
      role: contextRole(mapping.qualitativeRole),
      explanation: textField(localization.getContent(mapping.contentId, locale).fields, 'explanation'),
      context: contextConcept,
      regulation,
      behaviour,
      contextEvidence: Object.freeze({
        id: `edge:${contextEdge.id}`,
        label: `${contextConcept.label} → ${regulation.label}`,
        edgeId: contextEdge.id,
        relationshipType: contextEdge.relationshipType,
        relationshipLimitation: contextEdge.limitation,
        evidence: Object.freeze(repository.getEvidenceForRelationship(contextEdge.id).map(compactEvidenceMetadata)),
      }),
      behaviourEvidence: Object.freeze({
        id: `edge:${behaviourEdge.id}`,
        label: `${regulation.label} → ${behaviour.label}`,
        edgeId: behaviourEdge.id,
        relationshipType: behaviourEdge.relationshipType,
        relationshipLimitation: behaviourEdge.limitation,
        evidence: Object.freeze(repository.getEvidenceForRelationship(behaviourEdge.id).map(compactEvidenceMetadata)),
      }),
    })
  })

  const downstreamById = new Map<string, ContextDownstream>()
  for (const behaviourId of new Set(mappings.map((mapping) => mapping.behaviour.id))) {
    for (const rule of repository.getPatternRules(behaviourId)) {
      const key = `pattern:${rule.patternId}`
      const existing = downstreamById.get(key)
      const sourceIds = [...(existing?.sourceBehaviourIds ?? []), behaviourId]
      const explanation = textField(localization.getContent(rule.contentId, locale).fields, 'conceptualThreshold')
      const explanations = [...(existing?.explanations ?? []), { sourceBehaviourId: behaviourId, text: explanation }]
      downstreamById.set(key, Object.freeze({
        id: key,
        kind: 'pattern',
        concept: concept(repository, localization, rule.patternId, locale),
        explanations: Object.freeze(explanations.filter((item, index, items) =>
          items.findIndex((candidate) => candidate.sourceBehaviourId === item.sourceBehaviourId && candidate.text === item.text) === index)),
        sourceBehaviourIds: Object.freeze([...new Set(sourceIds)]),
      }))
    }
    for (const example of repository.getFunctionalExamples(behaviourId)) {
      const key = `functional-domain:${example.domainId}`
      const existing = downstreamById.get(key)
      const sourceIds = [...(existing?.sourceBehaviourIds ?? []), behaviourId]
      const explanation = textField(localization.getContent(example.contentId, locale).fields, 'example')
      const explanations = [...(existing?.explanations ?? []), { sourceBehaviourId: behaviourId, text: explanation }]
      downstreamById.set(key, Object.freeze({
        id: key,
        kind: 'functional-domain',
        concept: concept(repository, localization, example.domainId, locale),
        explanations: Object.freeze(explanations.filter((item, index, items) =>
          items.findIndex((candidate) => candidate.sourceBehaviourId === item.sourceBehaviourId && candidate.text === item.text) === index)),
        sourceBehaviourIds: Object.freeze([...new Set(sourceIds)]),
      }))
    }
  }

  const feedback = repository.getFeedbackLoops(contextNode.id).map((loop) => {
    const localized = localization.getContent(loop.contentId, locale)
    const relationships = loop.edgeIds.map((edgeId) => {
      const edge = repository.getEdge(edgeId)
      return Object.freeze({
        id: edge.id,
        source: concept(repository, localization, edge.sourceId, locale),
        target: concept(repository, localization, edge.targetId, locale),
        relationshipType: edge.relationshipType,
        limitation: edge.limitation,
      })
    })
    const returningRelationships = relationships.filter((relationship) => relationship.relationshipType === 'FEEDBACK_WITH')
    if (!returningRelationships.length) throw new TypeError(`Feedback loop ${loop.id} has no canonical FEEDBACK_WITH relationship`)
    return Object.freeze({
      id: loop.id,
      title: textField(localized.fields, 'title'),
      orderedSteps: textField(localized.fields, 'orderedSteps'),
      explanation: textField(localized.fields, 'explanation'),
      caution: textField(localized.fields, 'caution'),
      concepts: Object.freeze(loop.nodeIds.map((nodeId) => concept(repository, localization, nodeId, locale))),
      returningRelationships: Object.freeze(returningRelationships),
      evidenceEntry: Object.freeze({
        id: `feedback:${loop.id}`,
        label: textField(localized.fields, 'title'),
        evidence: evidenceForIds(repository, loop.evidenceIds),
      }),
    })
  })

  const safetyText = (purpose: Parameters<SafetyAccess['getRequired']>[0]) =>
    textField(safetyAccess.getRequired(purpose, locale).localized.fields, 'text')

  return Object.freeze({
    id: contextNode.id,
    label: contextConcept.label,
    canonicalName: contextNode.canonicalName,
    mappings: Object.freeze(mappings),
    downstream: Object.freeze([...downstreamById.values()]),
    feedbackLoops: Object.freeze(feedback),
    safety: Object.freeze({
      educational: safetyText('globalEducationalDisclaimer'),
      relationships: safetyText('graphDisclaimer'),
      pattern: safetyText('recurringPatternCaution'),
      function: safetyText('functionalImpactCaution'),
      evidence: safetyText('groupLevelEvidenceCaution'),
    }),
  })
}
