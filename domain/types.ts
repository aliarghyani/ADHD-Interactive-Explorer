export type Locale = 'en' | 'fa'

export type CanonicalNodeId =
  | `CA${number}`
  | `CTX${number}`
  | `REG${number}`
  | `BEH${number}`
  | `PAT${number}`
  | `FUN${number}`
export type RelationshipEdgeId = `EDGE_${string}`
export type ContentId = Uppercase<string>
export type EvidenceId = `EVID_${string}`
export type SourceId = `SRC_${string}`
export type SafetyId = `SAFETY_${string}`

export type ConceptCategory =
  | 'clinical-anchor'
  | 'context'
  | 'regulation'
  | 'behaviour'
  | 'pattern'
  | 'functional-domain'

export interface ConceptNode {
  readonly id: CanonicalNodeId
  readonly category: ConceptCategory
  readonly canonicalName: string
  readonly definition: string
  readonly evidenceStatus: string
  readonly evidenceIds: readonly EvidenceId[]
}

export type RelationshipType = 'MODULATES' | 'CONTRIBUTES_TO' | 'FEEDBACK_WITH'

export interface RelationshipEdge {
  readonly id: RelationshipEdgeId
  readonly sourceId: CanonicalNodeId
  readonly targetId: CanonicalNodeId
  readonly relationshipType: RelationshipType
  readonly meaning: string
  readonly evidenceIds: readonly EvidenceId[]
  readonly supportClassification: string
  readonly limitation: string
}

export interface BehaviourEntry {
  readonly id: ContentId
  readonly behaviourId: CanonicalNodeId
  readonly publicationStatus: string
  readonly contentId: ContentId
}

export interface EducationalPathway {
  readonly id: ContentId
  readonly behaviourId: CanonicalNodeId
  readonly orderedNodeIds: readonly CanonicalNodeId[]
  readonly edgeIds: readonly RelationshipEdgeId[]
  readonly evidenceIds: readonly EvidenceId[]
  readonly mvpStatus: string
  readonly contentId: ContentId
}

export interface ContextMapping {
  readonly id: ContentId
  readonly contextId: CanonicalNodeId
  readonly behaviourId: CanonicalNodeId
  readonly regulationId: CanonicalNodeId
  readonly qualitativeRole: string
  readonly evidenceIds: readonly EvidenceId[]
  readonly contentId: ContentId
}

export interface PatternRule {
  readonly id: ContentId
  readonly patternId: CanonicalNodeId
  readonly sourceBehaviourIds: readonly CanonicalNodeId[]
  readonly repetitionRequirement: string
  readonly evidenceIds: readonly EvidenceId[]
  readonly contentId: ContentId
}

export interface FunctionalExample {
  readonly id: ContentId
  readonly behaviourId: CanonicalNodeId
  readonly domainId: CanonicalNodeId
  readonly edgeId: RelationshipEdgeId | null
  readonly relationshipStatus: string
  readonly contentId: ContentId
}

export interface AlternativeExplanation {
  readonly id: ContentId
  readonly relevantBehaviourIds: readonly CanonicalNodeId[]
  readonly evidenceIds: readonly EvidenceId[]
  readonly caution: string
  readonly contentId: ContentId
}

export interface FeedbackLoop {
  readonly id: ContentId
  readonly nodeIds: readonly CanonicalNodeId[]
  readonly edgeIds: readonly RelationshipEdgeId[]
  readonly evidenceIds: readonly EvidenceId[]
  readonly interruptionPoints: string
  readonly contentId: ContentId
}

export interface PresentationEducation {
  readonly id: ContentId
  readonly clinicalAnchorIds: readonly CanonicalNodeId[]
  readonly status: string
  readonly sourceIds: readonly SourceId[]
  readonly safetyId: SafetyId
  readonly contentId: ContentId
}

export type EvidenceLevel = 'Clinical' | 'Strong' | 'Moderate' | 'Limited'

export interface EvidenceMetadata {
  readonly id: EvidenceId
  readonly level: EvidenceLevel
  readonly epistemicStatus: string
  readonly constructStatus: string
  readonly languageStrategy: string
  readonly summary: string
  readonly limitations: readonly string[]
  readonly sourceIds: readonly SourceId[]
  readonly lastReviewed: string
  readonly reviewVersion: string
}

export interface SourceReference {
  readonly id: SourceId
  readonly sourceType: string
  readonly title: string
  readonly authorsOrOrganization: string
  readonly year: number
  readonly publicationType: string
  readonly journalOrSeries: string
  readonly citationText: string
  readonly relevanceNote: string
  readonly url: string
  readonly doi?: string
}

export interface SafetyCopy {
  readonly id: SafetyId
  readonly context: string
  readonly displayRequirement: string
  readonly contentId: ContentId
}

export type LocalizedFieldValue = string | readonly string[]

export interface LocalizationRecord {
  readonly targetId: ContentId
  readonly fields: Readonly<Record<string, LocalizedFieldValue>>
}

export interface LocalizationCollection {
  readonly locale: Locale
  readonly records: readonly LocalizationRecord[]
}

export interface LocalizedContent extends LocalizationRecord {
  readonly locale: Locale
}

export interface LocalizedNode extends LocalizedContent {
  readonly node: ConceptNode
}

export interface KnowledgeManifest {
  readonly schemaVersion: string
  readonly ontologyVersion: string
  readonly visualGrammarVersion: string
  readonly behaviourFrameworkVersion: string
  readonly contentModelVersion: string
  readonly evidenceReviewVersion: string
  readonly knowledgeReleaseId: string
  readonly languages: readonly Locale[]
  readonly publicationStatus: string
  readonly releaseExpectations: Readonly<{
    nodes: number
    edges: number
    pathways: number
    mappings: number
    functionalExamples: number
    alternatives: number
    feedbackLoops: number
    presentations: number
    sources: number
    evidence: number
  }>
}

export interface KnowledgeBundle {
  readonly manifest: KnowledgeManifest
  readonly nodes: Readonly<{ nodes: readonly ConceptNode[] }>
  readonly edges: Readonly<{ edges: readonly RelationshipEdge[] }>
  readonly behaviours: Readonly<{ behaviours: readonly BehaviourEntry[] }>
  readonly pathways: Readonly<{ pathways: readonly EducationalPathway[] }>
  readonly alternatives: Readonly<{ alternatives: readonly AlternativeExplanation[] }>
  readonly contexts: Readonly<{ contextIds: readonly CanonicalNodeId[] }>
  readonly mappings: Readonly<{ mappings: readonly ContextMapping[] }>
  readonly feedbackLoops: Readonly<{ feedbackLoops: readonly FeedbackLoop[] }>
  readonly patterns: Readonly<{ patternIds: readonly CanonicalNodeId[] }>
  readonly rules: Readonly<{ rules: readonly PatternRule[] }>
  readonly domains: Readonly<{ domainIds: readonly CanonicalNodeId[] }>
  readonly functionalExamples: Readonly<{ functionalExamples: readonly FunctionalExample[] }>
  readonly presentations: Readonly<{ presentations: readonly PresentationEducation[] }>
  readonly evidence: Readonly<{ evidence: readonly EvidenceMetadata[] }>
  readonly sources: Readonly<{ sources: readonly SourceReference[] }>
  readonly safety: Readonly<{ safety: readonly SafetyCopy[] }>
  readonly en: LocalizationCollection
  readonly fa: LocalizationCollection
}

export interface RelatedConcepts {
  /** Direct neighbours derived only from canonical RelationshipEdge records. */
  readonly canonicalGraph: readonly ConceptNode[]
  /** Concepts referenced by approved non-edge content records. */
  readonly curatedContentMappings: readonly ConceptNode[]
}
