import { DomainLookupError, type DomainErrorCode } from './errors'
import type {
  AlternativeExplanation,
  BehaviourEntry,
  CanonicalNodeId,
  ConceptCategory,
  ConceptNode,
  ContextMapping,
  EducationalPathway,
  EvidenceMetadata,
  FeedbackLoop,
  FunctionalExample,
  KnowledgeBundle,
  KnowledgeManifest,
  Locale,
  LocalizedContent,
  LocalizedNode,
  LocalizationRecord,
  PatternRule,
  PresentationEducation,
  RelatedConcepts,
  RelationshipEdge,
  SafetyCopy,
  SourceReference,
} from './types'

function deepFreeze<T>(value: T): T {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

function indexBy<T>(items: readonly T[], key: (item: T) => string): ReadonlyMap<string, T> {
  return new Map(items.map((item) => [key(item), item]))
}

function groupBy<T>(items: readonly T[], keys: (item: T) => readonly string[]): ReadonlyMap<string, readonly T[]> {
  const groups = new Map<string, T[]>()
  for (const item of items) {
    for (const key of keys(item)) groups.set(key, [...(groups.get(key) ?? []), item])
  }
  return groups
}

function requireFrom<T>(map: ReadonlyMap<string, T>, id: string, code: DomainErrorCode): T {
  const value = map.get(id)
  if (!value) throw new DomainLookupError(code, id)
  return value
}

export class KnowledgeRepository {
  readonly #bundle: KnowledgeBundle
  readonly #nodesById: ReadonlyMap<string, ConceptNode>
  readonly #edgesById: ReadonlyMap<string, RelationshipEdge>
  readonly #incomingByNode: ReadonlyMap<string, readonly RelationshipEdge[]>
  readonly #outgoingByNode: ReadonlyMap<string, readonly RelationshipEdge[]>
  readonly #behavioursByCanonicalId: ReadonlyMap<string, BehaviourEntry>
  readonly #pathwaysByBehaviour: ReadonlyMap<string, readonly EducationalPathway[]>
  readonly #alternativesByBehaviour: ReadonlyMap<string, readonly AlternativeExplanation[]>
  readonly #mappingsByContext: ReadonlyMap<string, readonly ContextMapping[]>
  readonly #rulesByBehaviour: ReadonlyMap<string, readonly PatternRule[]>
  readonly #examplesByBehaviour: ReadonlyMap<string, readonly FunctionalExample[]>
  readonly #presentationsById: ReadonlyMap<string, PresentationEducation>
  readonly #evidenceById: ReadonlyMap<string, EvidenceMetadata>
  readonly #sourcesById: ReadonlyMap<string, SourceReference>
  readonly #safetyById: ReadonlyMap<string, SafetyCopy>
  readonly #safetyByContext: ReadonlyMap<string, SafetyCopy>
  readonly #localization: Readonly<Record<Locale, ReadonlyMap<string, LocalizationRecord>>>

  constructor(validatedKnowledge: KnowledgeBundle) {
    this.#bundle = deepFreeze(structuredClone(validatedKnowledge))

    const { nodes } = this.#bundle.nodes
    const { edges } = this.#bundle.edges
    this.#nodesById = indexBy(nodes, (node) => node.id)
    this.#edgesById = indexBy(edges, (edge) => edge.id)
    this.#incomingByNode = groupBy(edges, (edge) => [edge.targetId])
    this.#outgoingByNode = groupBy(edges, (edge) => [edge.sourceId])
    this.#behavioursByCanonicalId = indexBy(this.#bundle.behaviours.behaviours, (entry) => entry.behaviourId)
    this.#pathwaysByBehaviour = groupBy(this.#bundle.pathways.pathways, (pathway) => [pathway.behaviourId])
    this.#alternativesByBehaviour = groupBy(this.#bundle.alternatives.alternatives, (alternative) => alternative.relevantBehaviourIds)
    this.#mappingsByContext = groupBy(this.#bundle.mappings.mappings, (mapping) => [mapping.contextId])
    this.#rulesByBehaviour = groupBy(this.#bundle.rules.rules, (rule) => rule.sourceBehaviourIds)
    this.#examplesByBehaviour = groupBy(this.#bundle.functionalExamples.functionalExamples, (example) => [example.behaviourId])
    this.#presentationsById = indexBy(this.#bundle.presentations.presentations, (presentation) => presentation.id)
    this.#evidenceById = indexBy(this.#bundle.evidence.evidence, (evidence) => evidence.id)
    this.#sourcesById = indexBy(this.#bundle.sources.sources, (source) => source.id)
    this.#safetyById = indexBy(this.#bundle.safety.safety, (safety) => safety.id)
    this.#safetyByContext = indexBy(this.#bundle.safety.safety, (safety) => safety.context)
    this.#localization = {
      en: indexBy(this.#bundle.en.records, (record) => record.targetId),
      fa: indexBy(this.#bundle.fa.records, (record) => record.targetId),
    }
  }

  get manifest(): KnowledgeManifest { return this.#bundle.manifest }
  get nodes(): readonly ConceptNode[] { return this.#bundle.nodes.nodes }
  get edges(): readonly RelationshipEdge[] { return this.#bundle.edges.edges }
  get behaviours(): readonly BehaviourEntry[] { return this.#bundle.behaviours.behaviours }
  get presentations(): readonly PresentationEducation[] { return this.#bundle.presentations.presentations }

  getNode(id: string): ConceptNode {
    return requireFrom(this.#nodesById, id, 'UNKNOWN_NODE')
  }

  getEdge(id: string): RelationshipEdge {
    return requireFrom(this.#edgesById, id, 'UNKNOWN_EDGE')
  }

  getIncomingRelationships(nodeId: string): readonly RelationshipEdge[] {
    this.getNode(nodeId)
    return this.#incomingByNode.get(nodeId) ?? []
  }

  getOutgoingRelationships(nodeId: string): readonly RelationshipEdge[] {
    this.getNode(nodeId)
    return this.#outgoingByNode.get(nodeId) ?? []
  }

  getFeedbackRelationships(nodeId: string): readonly RelationshipEdge[] {
    return this.#incidentRelationships(nodeId).filter((edge) => edge.relationshipType === 'FEEDBACK_WITH')
  }

  getNeighbours(nodeId: string): readonly ConceptNode[] {
    const neighbourIds = new Set(
      this.#incidentRelationships(nodeId).map((edge) => edge.sourceId === nodeId ? edge.targetId : edge.sourceId),
    )
    return this.nodes.filter((node) => neighbourIds.has(node.id))
  }

  getBehaviour(behaviourId: string): BehaviourEntry {
    return requireFrom(this.#behavioursByCanonicalId, behaviourId, 'UNKNOWN_BEHAVIOUR')
  }

  getBehaviourPathways(behaviourId: string): readonly EducationalPathway[] {
    this.getBehaviour(behaviourId)
    return this.#pathwaysByBehaviour.get(behaviourId) ?? []
  }

  getAlternativeExplanations(behaviourId: string): readonly AlternativeExplanation[] {
    this.getBehaviour(behaviourId)
    return this.#alternativesByBehaviour.get(behaviourId) ?? []
  }

  getPatternRules(behaviourId: string): readonly PatternRule[] {
    this.getBehaviour(behaviourId)
    return this.#rulesByBehaviour.get(behaviourId) ?? []
  }

  getFunctionalExamples(behaviourId: string): readonly FunctionalExample[] {
    this.getBehaviour(behaviourId)
    return this.#examplesByBehaviour.get(behaviourId) ?? []
  }

  getRelatedContexts(conceptId: string): RelatedConcepts {
    return this.#relatedConcepts(conceptId, 'context', (id) => {
      const ids = new Set<CanonicalNodeId>()
      for (const mapping of this.#bundle.mappings.mappings) {
        if (mapping.behaviourId === id || mapping.regulationId === id) ids.add(mapping.contextId)
      }
      return ids
    })
  }

  getRelatedRegulation(conceptId: string): RelatedConcepts {
    return this.#relatedConcepts(conceptId, 'regulation', (id) => {
      const ids = new Set<CanonicalNodeId>()
      for (const mapping of this.#bundle.mappings.mappings) {
        if (mapping.behaviourId === id || mapping.contextId === id) ids.add(mapping.regulationId)
      }
      return ids
    })
  }

  getRelatedPatterns(conceptId: string): RelatedConcepts {
    return this.#relatedConcepts(conceptId, 'pattern', (id) => new Set(
      this.#bundle.rules.rules.filter((rule) => rule.sourceBehaviourIds.includes(id as CanonicalNodeId)).map((rule) => rule.patternId),
    ))
  }

  getRelatedFunctionalDomains(conceptId: string): RelatedConcepts {
    return this.#relatedConcepts(conceptId, 'functional-domain', (id) => new Set(
      this.#bundle.functionalExamples.functionalExamples.filter((example) => example.behaviourId === id).map((example) => example.domainId),
    ))
  }

  getContext(contextId: string): ConceptNode {
    const context = this.getNode(contextId)
    if (context.category !== 'context') throw new DomainLookupError('UNKNOWN_CONTEXT', contextId)
    return context
  }

  getContextMappings(contextId: string): readonly ContextMapping[] {
    this.getContext(contextId)
    return this.#mappingsByContext.get(contextId) ?? []
  }

  getFeedbackLoops(contextId?: string): readonly FeedbackLoop[] {
    if (!contextId) return this.#bundle.feedbackLoops.feedbackLoops
    this.getContext(contextId)
    return this.#bundle.feedbackLoops.feedbackLoops.filter((loop) => loop.nodeIds.includes(contextId as CanonicalNodeId))
  }

  getPresentation(presentationId: string): PresentationEducation {
    return requireFrom(this.#presentationsById, presentationId, 'UNKNOWN_PRESENTATION')
  }

  getEvidence(evidenceId: string): EvidenceMetadata {
    return requireFrom(this.#evidenceById, evidenceId, 'UNKNOWN_EVIDENCE')
  }

  getEvidenceForRelationship(relationshipId: string): readonly EvidenceMetadata[] {
    return this.getEdge(relationshipId).evidenceIds.map((id) => this.getEvidence(id))
  }

  getEvidenceForNode(nodeId: string): readonly EvidenceMetadata[] {
    return this.getNode(nodeId).evidenceIds.map((id) => this.getEvidence(id))
  }

  getEvidenceForPathway(pathwayId: string): readonly EvidenceMetadata[] {
    const pathway = this.#bundle.pathways.pathways.find((candidate) => candidate.id === pathwayId)
    if (!pathway) throw new DomainLookupError('UNKNOWN_PATHWAY', pathwayId)
    return pathway.evidenceIds.map((id) => this.getEvidence(id))
  }

  getSourcesForEvidence(evidenceId: string): readonly SourceReference[] {
    return this.getEvidence(evidenceId).sourceIds.map((id) => this.getSource(id))
  }

  getSourcesForPresentation(presentationId: string): readonly SourceReference[] {
    return this.getPresentation(presentationId).sourceIds.map((id) => this.getSource(id))
  }

  getSource(sourceId: string): SourceReference {
    return requireFrom(this.#sourcesById, sourceId, 'UNKNOWN_SOURCE')
  }

  getSafetyCopy(safetyId: string): SafetyCopy {
    return requireFrom(this.#safetyById, safetyId, 'UNKNOWN_SAFETY')
  }

  getSafetyCopyByContext(context: string): SafetyCopy {
    return requireFrom(this.#safetyByContext, context, 'UNKNOWN_SAFETY_CONTEXT')
  }

  getLocalizedNode(nodeId: string, locale: string): LocalizedNode {
    const node = this.getNode(nodeId)
    return { ...this.getLocalizedContent(node.id, locale), node }
  }

  getLocalizedContent(contentId: string, locale: string): LocalizedContent {
    const supportedLocale = this.#requireLocale(locale)
    const record = this.#localization[supportedLocale].get(contentId)
    if (!record) throw new DomainLookupError('MISSING_LOCALIZATION', `${supportedLocale}:${contentId}`)
    return deepFreeze({ locale: supportedLocale, ...record })
  }

  #incidentRelationships(nodeId: string): readonly RelationshipEdge[] {
    this.getNode(nodeId)
    return this.edges.filter((edge) => edge.sourceId === nodeId || edge.targetId === nodeId)
  }

  #relatedConcepts(
    conceptId: string,
    category: ConceptCategory,
    curatedIds: (id: string) => ReadonlySet<CanonicalNodeId>,
  ): RelatedConcepts {
    this.getNode(conceptId)
    const graphIds = new Set(this.getNeighbours(conceptId).filter((node) => node.category === category).map((node) => node.id))
    const contentIds = curatedIds(conceptId)
    return deepFreeze({
      canonicalGraph: this.nodes.filter((node) => node.category === category && graphIds.has(node.id)),
      curatedContentMappings: this.nodes.filter((node) => node.category === category && contentIds.has(node.id)),
    })
  }

  #requireLocale(locale: string): Locale {
    if (locale !== 'en' && locale !== 'fa') throw new DomainLookupError('UNSUPPORTED_LOCALE', locale)
    return locale
  }
}
