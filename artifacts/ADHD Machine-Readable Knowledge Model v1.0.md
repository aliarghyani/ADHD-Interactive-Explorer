# ADHD Machine-Readable Knowledge Model v1.0

**Stage:** 6 — Machine-Readable Knowledge Model
**Source of truth:** ADHD Canonical Ontology v1.0 + ADHD Visual Grammar v1.0 + ADHD Behaviour Analysis Framework v1.0
**Purpose:** Convert the frozen educational knowledge model into a stable, versioned, JSON-friendly content contract for later handoff to engineering.

This model represents **knowledge**, not diagnosis, scoring, prediction, treatment, or frontend implementation. The source specification explicitly requires preservation of the frozen ontology and prohibits new canonical concepts or IDs.

---

# 1. Design Principles

## 1.1 Canonical identity is stable

Canonical IDs such as:

- `CA1`
- `CTX6`
- `REG3`
- `BEH1`
- `PAT1`
- `FUN1`

are permanent knowledge identifiers.

Display wording, translations, evidence summaries, and visualization metadata may evolve without changing those IDs.

---

## 1.2 Separate knowledge from presentation

The model separates:

**scientific identity**

from:

**educational wording**

from:

**visual metadata**

from:

**evidence metadata**

from:

**safety copy**.

This prevents UI wording changes from mutating the scientific model.

---

## 1.3 Separate canonical facts from curated educational pathways

A canonical edge represents an approved ontology relationship.

An `EducationalPathway` represents a curated sequence using those canonical concepts.

Example:

`CTX6 → REG3 → BEH1`

is an educational path through existing relationships.

The pathway itself is not a new scientific claim.

---

## 1.4 No hidden assessment model

The contract must contain no field capable of silently becoming:

- diagnostic score,
- ADHD probability,
- severity measure,
- presentation classifier,
- mechanism probability,
- treatment engine.

---

## 1.5 Evidence is explicit and reusable

Scientific evidence belongs in reusable `EvidenceMetadata` records.

Nodes, edges, pathways, and other content reference evidence records rather than duplicating evidence text everywhere.

---

## 1.6 Localization is content, not identity

Canonical English names remain stable.

Persian and future translations are display content.

Changing translation must not change:

- canonical ID,
- relationships,
- scientific status.

---

## 1.7 Qualitative relationships only

Canonical relationships use:

- `MODULATES`
- `CONTRIBUTES_TO`
- `FEEDBACK_WITH`

No numeric edge weight exists.

The frozen model explicitly prohibits numeric strength, probability, or causal percentage.

---

# 2. Entity Relationship Overview

The minimum stable entity set is:

```text
KnowledgeModelMetadata
│
├── ConceptNode
│   ├── EvidenceMetadata*
│   ├── SourceReference*
│   ├── LocalizationText*
│   └── VisualMetadata
│
├── RelationshipEdge
│   ├── ConceptNode(source)
│   ├── ConceptNode(target)
│   ├── EvidenceMetadata*
│   └── SourceReference*
│
├── BehaviourEntryStatement
│   └── ConceptNode(BEH*)
│
├── EducationalPathway
│   ├── ConceptNode*
│   ├── RelationshipEdge*
│   ├── EvidenceMetadata*
│   └── SourceReference*
│
├── ContextMapping
│   ├── ConceptNode(CTX*)
│   ├── ConceptNode(BEH*)
│   └── ConceptNode(REG*)?
│
├── RecurringPatternRule
│   ├── ConceptNode(BEH*)*
│   └── ConceptNode(PAT*)
│
├── FunctionalExample
│   ├── ConceptNode(BEH*)
│   └── ConceptNode(FUN*)
│
├── AlternativeExplanation
│   └── Behaviour relevance*
│
├── FeedbackLoop
│   ├── ConceptNode*
│   └── RelationshipEdge*
│
├── PresentationEducation
│   └── Clinical Anchor references only
│
├── SafetyCopy
│
└── LocalizationText

```

## Domain entity responsibilities

### ConceptNode

Represents one canonical ontology node.

Must never infer:

- diagnosis,
- probability,
- user state.

---

### RelationshipEdge

Represents one frozen canonical relationship.

Must never infer:

- quantitative strength,
- causal certainty.

---

### BehaviourEntryStatement

Recognition-oriented educational entry into a canonical Behaviour.

Must never function as a screening item.

---

### EducationalPathway

Curated path through Context → Regulation → Behaviour and optionally Pattern/Function.

Must never represent individualized reasoning.

---

### ContextMapping

Qualitative explanation of how Context relates to Behaviour/Regulation.

Must never simulate performance.

---

### RecurringPatternRule

Educational rule distinguishing isolated behaviour from recurring pattern.

Must never become a diagnostic threshold or automated classifier.

---

### FunctionalExample

Illustrative example of how a Behaviour may matter within a Functional Domain.

Must never predict impairment.

---

### AlternativeExplanation

Reusable non-ADHD contributor category.

Must never rank diagnoses or infer which explanation applies.

---

### EvidenceMetadata

Reusable evidence interpretation.

Must never be automatically upgraded or downgraded by application behaviour.

---

### SourceReference

Bibliographic/source record.

Must not contain inferred claims beyond the referenced source.

---

### FeedbackLoop

Educational representation of reciprocal relationships over time.

Must never encode treatment.

---

### PresentationEducation

Formal education about:

- Predominantly Inattentive Presentation,
- Predominantly Hyperactive-Impulsive Presentation,
- Combined Presentation,
- historical ADD terminology.

It must remain isolated from Behaviour selections.

---

### SafetyCopy

Reusable disclaimer and caution content.

Mandatory safety records must not be suppressible by ordinary content configuration.

---

### LocalizationText

Localized display wording.

Must never change scientific identity.

---

### KnowledgeModelMetadata

Top-level version and compatibility metadata.

---

# 3. Canonical Node Schema

Every canonical node requires:

```text
ConceptNode

```

### Required fields

- `id`
- `canonicalName`
- `displayLabelFa`
- `category`
- `plainLanguageDefinition`
- `scientificDefinition`
- `evidenceMetadataIds`
- `epistemicStatus`
- `clinicalStatus`
- `mvpStatus`
- `cautionText`
- `sourceReferenceIds`
- `visual`
- `localization`

### Optional fields

- `aliases`
- `historicalLabels`
- `educationalNotes`
- `advancedNotes`
- `sortOrder`

### Validation rules

- `id` must match an existing frozen canonical ID.
- `category` must match the ID namespace.
- Clinical Anchor nodes must be `CA*`.
- Context nodes must be `CTX*`.
- Regulation nodes must be `REG*`.
- Behaviour nodes must be `BEH*`.
- Pattern nodes must be `PAT*`.
- Functional nodes must be `FUN*`.
- canonical IDs cannot change between compatible content versions.
- Advanced concepts may not masquerade as canonical MVP nodes.

### Fields that must never be inferred automatically

- `clinicalStatus`
- `epistemicStatus`
- `evidenceMetadataIds`
- `mvpStatus`
- `canonicalName`
- `category`

---

# 4. Edge Schema

Only these relationship types are valid:

```text
MODULATES
CONTRIBUTES_TO
FEEDBACK_WITH

```

Each edge requires:

- `id`
- `sourceNodeId`
- `targetNodeId`
- `relationshipType`
- `qualitativeEffect`
- `evidenceMetadataIds`
- `epistemicStatus`
- `explanation`
- `explanationFa`
- `caution`
- `sourceReferenceIds`
- `mvpStatus`
- `visual`

### Qualitative effects

Recommended controlled values:

- `increases-demand`
- `interfering`
- `buffering`
- `facilitating`
- `variable`
- `probabilistic-contribution`
- `reciprocal-feedback`

### Validation

No edge may contain:

- numeric strength,
- probability,
- percentage,
- confidence score.

Clinical Anchor nodes cannot be sources of mechanistic explanatory edges.

---

# 5. Behaviour Entry Schema

`BehaviourEntryStatement`

### Required fields

- `id`
- `behaviourId`
- `language`
- `text`
- `publicationStatus`
- `educationalNote`

### Optional fields

- `situationCategory`
- `shortLabel`
- `sortOrder`

### Explicitly prohibited

- `score`
- `symptomWeight`
- `diagnosticWeight`
- `severityValue`
- `likelihood`
- `thresholdContribution`

These statements are navigation into educational content, not questionnaire items.

---

# 6. Educational Pathway Schema

`EducationalPathway`

### Required fields

- `id`
- `primaryBehaviourId`
- `orderedSteps`
- `contextIds`
- `regulationIds`
- `relationshipWording`
- `evidenceMetadataIds`
- `epistemicStatus`
- `explanation`
- `explanationFa`
- `scientificCaution`
- `sourceReferenceIds`
- `mvpStatus`

### Optional fields

- `patternId`
- `functionalDomainIds`
- `edgeIds`
- `title`
- `titleFa`

### Ordered step structure

Each step contains:

- `order`
- `nodeId`
- `stepRole`
- optional `edgeIdToNext`

Valid `stepRole` examples:

- `context`
- `regulation`
- `behaviour`
- `pattern`
- `function`

### Critical rule

A pathway describes:

> one educational possibility.

It must not represent:

- personalized inference,
- diagnostic reasoning,
- probability.

---

# 7. Context Mapping Schema

`ContextMapping`

### Required fields

- `id`
- `behaviourId`
- `contextId`
- `effect`
- `explanation`
- `explanationFa`
- `evidenceMetadataIds`
- `caution`

### Optional

- `regulationId`
- `sourceReferenceIds`
- `mvpStatus`

### Valid qualitative effect

- `increases-demand`
- `interfering`
- `buffering`
- `facilitating`
- `variable`

### Prohibited

- predicted performance,
- numerical change,
- simulated behavioural result.

---

# 8. Pattern Rule Schema

`RecurringPatternRule`

### Required fields

- `id`
- `sourceBehaviourIds`
- `targetPatternId`
- `repetitionRequirement`
- `conceptualThresholdWording`
- `singleEventCaution`
- `examples`
- `evidenceMetadataIds`

### Optional

- `sourceReferenceIds`
- `mvpStatus`

### Example conceptual rule

For Procrastination:

> Repeated maladaptive delay of an intended action despite expected negative consequences.

The rule must never encode:

```text
if delayedStartCount >= N → procrastination

```

That would transform educational content into automated classification.

The source specification explicitly defines these rules as educational rather than diagnostic thresholds.

---

# 9. Functional Example Schema

`FunctionalExample`

### Required fields

- `id`
- `behaviourId`
- `functionalDomainId`
- `language`
- `exampleText`
- `conditionalImpactWording`

### Optional

- `sourceReferenceIds`
- `evidenceNote`
- `mvpStatus`

### Example

```text
Behaviour: BEH6
Domain: FUN1
Example:
"A work deliverable may remain unfinished despite substantial work having already been completed."

```

Required caution:

> This is an illustrative example, not a prediction.

---

# 10. Alternative Explanation Schema

`AlternativeExplanation`

### Required fields

- `id`
- `category`
- `displayLabel`
- `displayLabelFa`
- `explanation`
- `examples`
- `relevantBehaviourIds`
- `safeWording`
- `caution`

### Recommended categories

- `sleep-physical-state`
- `acute-stress`
- `anxiety-emotional-distress`
- `low-mood`
- `burnout`
- `grief`
- `task-design`
- `workload`
- `environment`
- `skill-gap`
- `ordinary-motivation-preference`
- `physical-illness`
- `medication-substance-effects`

These are content categories, not new canonical ADHD nodes.

### Must not encode

- condition likelihood,
- ranking,
- exclusion logic,
- differential diagnosis,
- `moreLikelyThanAdhd`.

---

# 11. Presentation Education Schema

`PresentationEducation`

This dataset is kept in a separate collection from Behaviour Analysis.

### Required fields

- `id`
- `canonicalLabel`
- `displayLabelFa`
- `clinicalAnchorNodeIds`
- `description`
- `descriptionFa`
- `formalStatus`
- `sourceReferenceIds`
- `safetyCopyId`

### Valid records

- `PRESENTATION_INATTENTIVE`
- `PRESENTATION_HYPERACTIVE_IMPULSIVE`
- `PRESENTATION_COMBINED`

Separate historical record:

- `HISTORICAL_ADD_NOTE`

### Structural constraint

`PresentationEducation` may reference:

- `CA1`
- `CA2`

It must not reference:

- user Behaviour selections,
- pathways,
- BehaviourEntryStatement IDs,
- user session state.

This enforces separation between formal presentation education and Behaviour Analysis.

---

# 12. Feedback Loop Schema

`FeedbackLoop`

### Required fields

- `id`
- `title`
- `titleFa`
- `orderedSteps`
- `nodeIds`
- `relationshipIds`
- `explanation`
- `explanationFa`
- `evidenceMetadataIds`
- `epistemicStatus`
- `caution`

### Optional fields

- `educationalInterruptionPoints`
- `sourceReferenceIds`
- `mvpStatus`

### Interruption point

An educational interruption point contains:

- `afterStep`
- `relatedNodeIds`
- `educationalLabel`

It must not contain:

- treatment instruction,
- prescribed intervention,
- recommendation effectiveness.

### Example loops

- Procrastination / Urgency
- Functional Difficulty → Stress

---

# 13. Evidence / Source Schema

## EvidenceMetadata

### Required

- `id`
- `level`
- `epistemicStatus`
- `constructStatus`
- `summary`
- `limitations`
- `sourceReferenceIds`
- `lastReviewedDate`
- `reviewVersion`

### Evidence levels

- `Clinical`
- `Strong`
- `Moderate`
- `Limited`

### Example construct status

- `formal-diagnostic-domain`
- `associated-process`
- `contextual-modifier`
- `observable-behaviour`
- `associated-pattern`
- `functional-domain`
- `educational-historical-note`

---

## SourceReference

### Required

- `id`
- `sourceType`
- `title`
- `year`
- `publicationType`
- `citationText`
- `relevanceNote`

### Optional

- `authors`
- `organization`
- `url`
- `doi`
- `journal`
- `volume`
- `issue`
- `pages`

### Source types

Examples:

- `clinical-guideline`
- `government-medical`
- `systematic-review`
- `meta-analysis`
- `peer-reviewed-study`
- `diagnostic-classification`

Evidence metadata should remain separate from UX wording so scientific updates do not require rewriting every educational surface. This separation is explicitly requested.

---

# 14. Safety Copy Schema

`SafetyCopy`

### Required fields

- `id`
- `context`
- `language`
- `shortVersion`
- `fullVersion`
- `displayRequirement`

### Display requirement

- `mandatory`
- `recommended`
- `optional`

### Required safety contexts

- `global-educational-disclaimer`
- `graph-disclaimer`
- `behaviour-explorer-disclaimer`
- `alternative-explanation-reminder`
- `repeated-pattern-caution`
- `functional-impact-caution`
- `clinical-presentation-caution`
- `group-level-evidence-caution`

### Example

```text
ID:
SAFETY_BEHAVIOUR_FA

Context:
behaviour-explorer-disclaimer

Short:
«این رفتار به‌تنهایی نشان‌دهنده ADHD نیست.»

Full:
«یک رفتار می‌تواند از چند مسیر مختلف و همچنین به دلایلی غیرمرتبط با ADHD ایجاد شود. این ابزار تشخیص یا احتمال ADHD را محاسبه نمی‌کند.»

Requirement:
mandatory

```

---

# 15. Versioning Model

Use independent semantic versions.

## Required version axes

### `ontologyVersion`

Example:

`1.0.0`

Changes only when canonical scientific structure changes.

---

### `visualGrammarVersion`

Example:

`1.0.0`

Changes when visual semantics change.

---

### `behaviourFrameworkVersion`

Example:

`1.0.0`

Changes when behavioural educational interpretation changes.

---

### `contentModelVersion`

Example:

`1.0.0`

Changes when the machine-readable contract changes.

---

### `evidenceReviewVersion`

Example:

`1.0.0`

Changes when evidence interpretation or source review changes.

---

## Compatibility rule

A content package declares:

```text
ontologyVersion: 1.0.0
visualGrammarVersion: 1.0.0
behaviourFrameworkVersion: 1.0.0
contentModelVersion: 1.0.0
evidenceReviewVersion: 1.0.0

```

---

## Scientific update strategy

### Wording-only update

Can change:

- Persian text,
- plain-language explanation,
- cautions,
- source presentation.

Does not change canonical IDs.

Patch version:

`1.0.0 → 1.0.1`

---

### Evidence update

Can change:

- evidence level,
- limitations,
- source references,
- last reviewed date.

Should not automatically change ontology.

Example:

`evidenceReviewVersion 1.0.0 → 1.1.0`

---

### Content relationship update

If evidence review justifies modifying canonical edges:

requires ontology governance first.

Do not silently edit an edge inside content.

---

### Canonical node change

Breaking ontology change.

Requires new ontology version and migration mapping.

Historical versions remain retrievable.

---

# 16. Type-Like Contracts

These are implementation-neutral specifications, not frontend code.

```ts
type NodeCategory =
  | "clinical-anchor"
  | "context"
  | "regulation"
  | "behaviour"
  | "recurring-pattern"
  | "functional-domain";

type EvidenceLevel =
  | "Clinical"
  | "Strong"
  | "Moderate"
  | "Limited";

type RelationshipType =
  | "MODULATES"
  | "CONTRIBUTES_TO"
  | "FEEDBACK_WITH";

type EpistemicStatus =
  | "descriptive"
  | "formal-clinical"
  | "association"
  | "probabilistic-contribution"
  | "general-modulation"
  | "buffering"
  | "feedback"
  | "educational";

type ContextEffect =
  | "increases-demand"
  | "interfering"
  | "buffering"
  | "facilitating"
  | "variable";

type PublicationStatus =
  | "draft"
  | "reviewed"
  | "published"
  | "archived";

type Language =
  | "en"
  | "fa";

type MvpStatus =
  | "MVP"
  | "Advanced";

```

---

## ConceptNode

```ts
interface ConceptNode {
  id: string;
  canonicalName: string;
  displayLabelFa: string;

  category: NodeCategory;

  plainLanguageDefinition: LocalizedContent;
  scientificDefinition: LocalizedContent;

  evidenceMetadataIds: string[];

  epistemicStatus: EpistemicStatus;
  clinicalStatus: string;

  mvpStatus: MvpStatus;

  cautionText: LocalizedContent;

  sourceReferenceIds: string[];

  visual: NodeVisualMetadata;
  localization: LocalizationMetadata;

  aliases?: string[];
  historicalLabels?: string[];
  educationalNotes?: LocalizedContent[];
  advancedNotes?: LocalizedContent[];
  sortOrder?: number;
}

```

---

## RelationshipEdge

```ts
interface RelationshipEdge {
  id: string;

  sourceNodeId: string;
  targetNodeId: string;

  relationshipType: RelationshipType;

  qualitativeEffect:
    | ContextEffect
    | "probabilistic-contribution"
    | "reciprocal-feedback";

  evidenceMetadataIds: string[];

  epistemicStatus: EpistemicStatus;

  explanation: string;
  explanationFa: string;

  caution: LocalizedContent;

  sourceReferenceIds: string[];

  mvpStatus: MvpStatus;

  visual: EdgeVisualMetadata;
}

```

---

## BehaviourEntryStatement

```ts
interface BehaviourEntryStatement {
  id: string;

  behaviourId: string;

  language: Language;
  text: string;

  situationCategory?: string;

  publicationStatus: PublicationStatus;

  educationalNote: string;

  sortOrder?: number;
}

```

---

## EducationalPathway

```ts
interface EducationalPathway {
  id: string;

  title?: string;
  titleFa?: string;

  primaryBehaviourId: string;

  orderedSteps: PathwayStep[];

  contextIds: string[];
  regulationIds: string[];

  patternId?: string;
  functionalDomainIds?: string[];

  edgeIds?: string[];

  relationshipWording: LocalizedContent;

  evidenceMetadataIds: string[];

  epistemicStatus: EpistemicStatus;

  explanation: string;
  explanationFa: string;

  scientificCaution: LocalizedContent;

  sourceReferenceIds: string[];

  mvpStatus: MvpStatus;
}

```

---

## PathwayStep

```ts
interface PathwayStep {
  order: number;
  nodeId: string;

  stepRole:
    | "context"
    | "regulation"
    | "behaviour"
    | "pattern"
    | "function";

  edgeIdToNext?: string;
}

```

---

## ContextMapping

```ts
interface ContextMapping {
  id: string;

  behaviourId: string;
  contextId: string;

  regulationId?: string;

  effect: ContextEffect;

  explanation: string;
  explanationFa: string;

  evidenceMetadataIds: string[];

  caution: LocalizedContent;

  sourceReferenceIds?: string[];

  mvpStatus: MvpStatus;
}

```

---

## RecurringPatternRule

```ts
interface RecurringPatternRule {
  id: string;

  sourceBehaviourIds: string[];

  targetPatternId: string;

  repetitionRequirement: string;
  conceptualThresholdWording: LocalizedContent;

  singleEventCaution: LocalizedContent;

  examples: LocalizedContent[];

  evidenceMetadataIds: string[];

  sourceReferenceIds?: string[];

  mvpStatus: MvpStatus;
}

```

---

## FunctionalExample

```ts
interface FunctionalExample {
  id: string;

  behaviourId: string;
  functionalDomainId: string;

  language: Language;

  exampleText: string;

  conditionalImpactWording: string;

  sourceReferenceIds?: string[];

  evidenceNote?: string;

  mvpStatus: MvpStatus;
}

```

---

## AlternativeExplanation

```ts
interface AlternativeExplanation {
  id: string;

  category: string;

  displayLabel: string;
  displayLabelFa: string;

  explanation: LocalizedContent;

  examples: LocalizedContent[];

  relevantBehaviourIds: string[];

  safeWording: LocalizedContent;

  caution: LocalizedContent;
}

```

---

## EvidenceMetadata

```ts
interface EvidenceMetadata {
  id: string;

  level: EvidenceLevel;

  epistemicStatus: EpistemicStatus;

  constructStatus: string;

  summary: string;
  limitations: string[];

  sourceReferenceIds: string[];

  lastReviewedDate: string;

  reviewVersion: string;
}

```

---

## SourceReference

```ts
interface SourceReference {
  id: string;

  sourceType: string;

  title: string;

  authors?: string[];
  organization?: string;

  year: number;

  url?: string;
  doi?: string;

  publicationType: string;

  citationText: string;

  relevanceNote: string;
}

```

---

## FeedbackLoop

```ts
interface FeedbackLoop {
  id: string;

  title: string;
  titleFa: string;

  orderedSteps: LoopStep[];

  nodeIds: string[];
  relationshipIds: string[];

  explanation: string;
  explanationFa: string;

  evidenceMetadataIds: string[];

  epistemicStatus: EpistemicStatus;

  caution: LocalizedContent;

  educationalInterruptionPoints?: EducationalInterruptionPoint[];

  sourceReferenceIds?: string[];

  mvpStatus: MvpStatus;
}

```

---

## PresentationEducation

```ts
interface PresentationEducation {
  id: string;

  canonicalLabel: string;
  displayLabelFa: string;

  clinicalAnchorNodeIds: string[];

  description: string;
  descriptionFa: string;

  formalStatus: string;

  sourceReferenceIds: string[];

  safetyCopyId: string;
}

```

---

## SafetyCopy

```ts
interface SafetyCopy {
  id: string;

  context: string;

  language: Language;

  shortVersion: string;
  fullVersion: string;

  displayRequirement:
    | "mandatory"
    | "recommended"
    | "optional";
}

```

---

## LocalizationText

```ts
interface LocalizationText {
  id: string;

  key: string;

  language: Language;

  text: string;

  publicationStatus: PublicationStatus;
}

```

---

## KnowledgeModelMetadata

```ts
interface KnowledgeModelMetadata {
  modelId: string;

  ontologyVersion: string;
  visualGrammarVersion: string;
  behaviourFrameworkVersion: string;
  contentModelVersion: string;
  evidenceReviewVersion: string;

  publicationStatus: PublicationStatus;

  generatedAt: string;
  lastReviewedAt: string;

  supportedLanguages: Language[];
}

```

---

## Shared helper contracts

```ts
interface LocalizedContent {
  en: string;
  fa: string;
}

interface LocalizationMetadata {
  canonicalLanguage: "en";
  availableLanguages: Language[];
}

interface NodeVisualMetadata {
  categoryShape: string;
  evidenceIndicator?: EvidenceLevel;
  defaultVisible: boolean;
}

interface EdgeVisualMetadata {
  lineStyle: string;
  arrowStyle: string;
  defaultVisible: boolean;
}

```

---

# 17. Example Dataset

Small coherent example only.

---

## Metadata

```json
{
  "modelId": "adhd-knowledge-model",
  "ontologyVersion": "1.0.0",
  "visualGrammarVersion": "1.0.0",
  "behaviourFrameworkVersion": "1.0.0",
  "contentModelVersion": "1.0.0",
  "evidenceReviewVersion": "1.0.0",
  "publicationStatus": "reviewed",
  "supportedLanguages": ["en", "fa"]
}

```

---

## Nodes

```json
[
  {
    "id": "CA1",
    "canonicalName": "Inattention",
    "displayLabelFa": "بی‌توجهی",
    "category": "clinical-anchor",
    "evidenceMetadataIds": ["EVID_CA1"],
    "epistemicStatus": "formal-clinical",
    "clinicalStatus": "formal-diagnostic-domain",
    "mvpStatus": "MVP"
  },
  {
    "id": "CTX6",
    "canonicalName": "Task Demand / Complexity",
    "displayLabelFa": "تقاضا / پیچیدگی کار",
    "category": "context",
    "evidenceMetadataIds": ["EVID_CTX6"],
    "epistemicStatus": "general-modulation",
    "clinicalStatus": "non-diagnostic",
    "mvpStatus": "MVP"
  },
  {
    "id": "CTX8",
    "canonicalName": "Distraction / Interruptions",
    "displayLabelFa": "حواس‌پرتی / وقفه‌ها",
    "category": "context",
    "evidenceMetadataIds": ["EVID_CTX8"],
    "epistemicStatus": "general-modulation",
    "clinicalStatus": "non-diagnostic",
    "mvpStatus": "MVP"
  },
  {
    "id": "REG3",
    "canonicalName": "Goal Management",
    "displayLabelFa": "مدیریت هدف",
    "category": "regulation",
    "evidenceMetadataIds": ["EVID_REG3"],
    "epistemicStatus": "association",
    "clinicalStatus": "associated-process",
    "mvpStatus": "MVP"
  },
  {
    "id": "REG1",
    "canonicalName": "Attention Regulation",
    "displayLabelFa": "تنظیم توجه",
    "category": "regulation",
    "evidenceMetadataIds": ["EVID_REG1"],
    "epistemicStatus": "association",
    "clinicalStatus": "associated-process",
    "mvpStatus": "MVP"
  },
  {
    "id": "BEH1",
    "canonicalName": "Starting",
    "displayLabelFa": "شروع کردن",
    "category": "behaviour",
    "evidenceMetadataIds": ["EVID_BEH1"],
    "epistemicStatus": "descriptive",
    "clinicalStatus": "non-diagnostic",
    "mvpStatus": "MVP"
  },
  {
    "id": "BEH2",
    "canonicalName": "Sustaining",
    "displayLabelFa": "ادامه دادن",
    "category": "behaviour",
    "evidenceMetadataIds": ["EVID_BEH2"],
    "epistemicStatus": "descriptive",
    "clinicalStatus": "non-diagnostic",
    "mvpStatus": "MVP"
  },
  {
    "id": "PAT1",
    "canonicalName": "Procrastination",
    "displayLabelFa": "اهمال‌کاری",
    "category": "recurring-pattern",
    "evidenceMetadataIds": ["EVID_PAT1"],
    "epistemicStatus": "association",
    "clinicalStatus": "non-diagnostic",
    "mvpStatus": "MVP"
  },
  {
    "id": "FUN1",
    "canonicalName": "Work",
    "displayLabelFa": "کار",
    "category": "functional-domain",
    "evidenceMetadataIds": ["EVID_FUN1"],
    "epistemicStatus": "descriptive",
    "clinicalStatus": "functional-domain",
    "mvpStatus": "MVP"
  }
]

```

---

## Edges

```json
[
  {
    "id": "EDGE_CTX6_REG3",
    "sourceNodeId": "CTX6",
    "targetNodeId": "REG3",
    "relationshipType": "MODULATES",
    "qualitativeEffect": "increases-demand",
    "evidenceMetadataIds": ["EVID_EDGE_CTX6_REG3"],
    "epistemicStatus": "general-modulation"
  },
  {
    "id": "EDGE_REG3_BEH1",
    "sourceNodeId": "REG3",
    "targetNodeId": "BEH1",
    "relationshipType": "CONTRIBUTES_TO",
    "qualitativeEffect": "probabilistic-contribution",
    "evidenceMetadataIds": ["EVID_EDGE_REG3_BEH1"],
    "epistemicStatus": "probabilistic-contribution"
  },
  {
    "id": "EDGE_CTX8_REG1",
    "sourceNodeId": "CTX8",
    "targetNodeId": "REG1",
    "relationshipType": "MODULATES",
    "qualitativeEffect": "interfering",
    "evidenceMetadataIds": ["EVID_EDGE_CTX8_REG1"],
    "epistemicStatus": "general-modulation"
  },
  {
    "id": "EDGE_REG1_BEH2",
    "sourceNodeId": "REG1",
    "targetNodeId": "BEH2",
    "relationshipType": "CONTRIBUTES_TO",
    "qualitativeEffect": "probabilistic-contribution",
    "evidenceMetadataIds": ["EVID_EDGE_REG1_BEH2"],
    "epistemicStatus": "probabilistic-contribution"
  },
  {
    "id": "EDGE_BEH1_PAT1",
    "sourceNodeId": "BEH1",
    "targetNodeId": "PAT1",
    "relationshipType": "CONTRIBUTES_TO",
    "qualitativeEffect": "probabilistic-contribution",
    "evidenceMetadataIds": ["EVID_PAT1"],
    "epistemicStatus": "probabilistic-contribution"
  }
]

```

---

## Entry statements

```json
[
  {
    "id": "ENTRY_BEH1_FA_001",
    "behaviourId": "BEH1",
    "language": "fa",
    "text": "می‌دونم باید این کار رو انجام بدم، ولی شروع اولین قدمش مدام عقب می‌افته.",
    "publicationStatus": "published",
    "educationalNote": "Navigation only; not a screening item."
  },
  {
    "id": "ENTRY_BEH2_FA_001",
    "behaviourId": "BEH2",
    "language": "fa",
    "text": "کار رو شروع می‌کنم ولی بعد از مدتی ذهنم میره سراغ چیز دیگه.",
    "publicationStatus": "published",
    "educationalNote": "Navigation only; not a screening item."
  }
]

```

---

## Educational pathways

```json
[
  {
    "id": "PATH_START_COMPLEXITY",
    "primaryBehaviourId": "BEH1",
    "orderedSteps": [
      {
        "order": 1,
        "nodeId": "CTX6",
        "stepRole": "context",
        "edgeIdToNext": "EDGE_CTX6_REG3"
      },
      {
        "order": 2,
        "nodeId": "REG3",
        "stepRole": "regulation",
        "edgeIdToNext": "EDGE_REG3_BEH1"
      },
      {
        "order": 3,
        "nodeId": "BEH1",
        "stepRole": "behaviour"
      }
    ],
    "contextIds": ["CTX6"],
    "regulationIds": ["REG3"],
    "evidenceMetadataIds": [
      "EVID_EDGE_CTX6_REG3",
      "EVID_EDGE_REG3_BEH1"
    ],
    "epistemicStatus": "educational",
    "mvpStatus": "MVP"
  },
  {
    "id": "PATH_SUSTAIN_INTERRUPTION",
    "primaryBehaviourId": "BEH2",
    "orderedSteps": [
      {
        "order": 1,
        "nodeId": "CTX8",
        "stepRole": "context",
        "edgeIdToNext": "EDGE_CTX8_REG1"
      },
      {
        "order": 2,
        "nodeId": "REG1",
        "stepRole": "regulation",
        "edgeIdToNext": "EDGE_REG1_BEH2"
      },
      {
        "order": 3,
        "nodeId": "BEH2",
        "stepRole": "behaviour"
      }
    ],
    "contextIds": ["CTX8"],
    "regulationIds": ["REG1"],
    "evidenceMetadataIds": [
      "EVID_EDGE_CTX8_REG1",
      "EVID_EDGE_REG1_BEH2"
    ],
    "epistemicStatus": "educational",
    "mvpStatus": "MVP"
  }
]

```

---

## Alternative explanation example

```json
{
  "id": "ALT_SLEEP_STATE",
  "category": "sleep-physical-state",
  "displayLabel": "Sleep / physical state",
  "displayLabelFa": "خواب / وضعیت جسمی",
  "relevantBehaviourIds": ["BEH1", "BEH2"],
  "safeWording": {
    "en": "Sleep and physical state can also influence this behaviour.",
    "fa": "خواب و وضعیت جسمی هم می‌توانند بر این رفتار اثر بگذارند."
  }
}

```

---

## Evidence example

```json
{
  "id": "EVID_REG3",
  "level": "Strong",
  "epistemicStatus": "association",
  "constructStatus": "associated-process",
  "summary": "Goal-management and related executive processes are relevant to ADHD research at the group level.",
  "limitations": [
    "Not diagnostic",
    "Not specific to ADHD",
    "Individual profiles vary"
  ],
  "sourceReferenceIds": ["SRC_EXEC_REVIEW"],
  "lastReviewedDate": "2026-09-19",
  "reviewVersion": "1.0.0"
}

```

---

## Safety copy example

```json
{
  "id": "SAFETY_BEHAVIOUR_FA",
  "context": "behaviour-explorer-disclaimer",
  "language": "fa",
  "shortVersion": "این رفتار به‌تنهایی نشان‌دهنده ADHD نیست.",
  "fullVersion": "یک رفتار می‌تواند از چند مسیر مختلف و همچنین به دلایلی غیرمرتبط با ADHD ایجاد شود. این ابزار تشخیص یا احتمال ADHD را محاسبه نمی‌کند.",
  "displayRequirement": "mandatory"
}

```

---

# 18. Complete Reference Path

Target path:

**Task Demand / Complexity**

→ **Goal Management**

→ **Starting**

→ repeated delayed Starting

→ **Procrastination**

→ **Work**

---

## 18.1 Nodes

```json
{
  "context": "CTX6",
  "regulation": "REG3",
  "behaviour": "BEH1",
  "pattern": "PAT1",
  "function": "FUN1"
}

```

---

## 18.2 Context mapping

```json
{
  "id": "CTXMAP_CTX6_BEH1_REG3",
  "behaviourId": "BEH1",
  "contextId": "CTX6",
  "regulationId": "REG3",
  "effect": "increases-demand",
  "explanation": "Higher task complexity may increase goal-management demand, which may make starting more difficult.",
  "explanationFa": "پیچیدگی بیشتر کار می‌تواند تقاضا از مدیریت هدف را افزایش دهد و در برخی موقعیت‌ها شروع‌کردن را دشوارتر کند.",
  "evidenceMetadataIds": ["EVID_EDGE_CTX6_REG3"],
  "caution": {
    "en": "This is a possible pathway, not a prediction.",
    "fa": "این یک مسیر احتمالی آموزشی است، نه پیش‌بینی عملکرد فرد."
  },
  "mvpStatus": "MVP"
}

```

---

## 18.3 Context → Regulation edge

```json
{
  "id": "EDGE_CTX6_REG3",
  "sourceNodeId": "CTX6",
  "targetNodeId": "REG3",
  "relationshipType": "MODULATES",
  "qualitativeEffect": "increases-demand",
  "evidenceMetadataIds": ["EVID_EDGE_CTX6_REG3"],
  "epistemicStatus": "general-modulation"
}

```

---

## 18.4 Regulation → Behaviour edge

```json
{
  "id": "EDGE_REG3_BEH1",
  "sourceNodeId": "REG3",
  "targetNodeId": "BEH1",
  "relationshipType": "CONTRIBUTES_TO",
  "qualitativeEffect": "probabilistic-contribution",
  "evidenceMetadataIds": ["EVID_EDGE_REG3_BEH1"],
  "epistemicStatus": "probabilistic-contribution"
}

```

---

## 18.5 Educational pathway

```json
{
  "id": "PATH_CTX6_REG3_BEH1",
  "primaryBehaviourId": "BEH1",
  "orderedSteps": [
    {
      "order": 1,
      "nodeId": "CTX6",
      "stepRole": "context",
      "edgeIdToNext": "EDGE_CTX6_REG3"
    },
    {
      "order": 2,
      "nodeId": "REG3",
      "stepRole": "regulation",
      "edgeIdToNext": "EDGE_REG3_BEH1"
    },
    {
      "order": 3,
      "nodeId": "BEH1",
      "stepRole": "behaviour"
    }
  ],
  "contextIds": ["CTX6"],
  "regulationIds": ["REG3"],
  "patternId": "PAT1",
  "functionalDomainIds": ["FUN1"],
  "evidenceMetadataIds": [
    "EVID_EDGE_CTX6_REG3",
    "EVID_EDGE_REG3_BEH1",
    "EVID_PAT1"
  ],
  "epistemicStatus": "educational",
  "scientificCaution": {
    "en": "This pathway is one possible explanation among several.",
    "fa": "این مسیر تنها یکی از چند توضیح احتمالی است."
  },
  "mvpStatus": "MVP"
}

```

---

## 18.6 Pattern rule

```json
{
  "id": "RULE_BEH1_PAT1",
  "sourceBehaviourIds": ["BEH1"],
  "targetPatternId": "PAT1",
  "repetitionRequirement": "Repeated delayed starting across relevant situations.",
  "conceptualThresholdWording": {
    "en": "Repeated maladaptive delay of intended action may form a procrastination pattern.",
    "fa": "تأخیر تکرارشونده و ناسازگارانه در شروع یک اقدام موردنظر می‌تواند به الگوی اهمال‌کاری تبدیل شود."
  },
  "singleEventCaution": {
    "en": "One delayed start is not procrastination.",
    "fa": "یک بار دیر شروع‌کردن به‌تنهایی اهمال‌کاری محسوب نمی‌شود."
  },
  "examples": [
    {
      "en": "Important tasks repeatedly begin much later than intended.",
      "fa": "کارهای مهم به‌طور تکراری بسیار دیرتر از زمان موردنظر شروع می‌شوند."
    }
  ],
  "evidenceMetadataIds": ["EVID_PAT1"],
  "mvpStatus": "MVP"
}

```

---

## 18.7 Functional example

```json
{
  "id": "FUNCEX_BEH1_FUN1",
  "behaviourId": "BEH1",
  "functionalDomainId": "FUN1",
  "language": "en",
  "exampleText": "A work report may repeatedly be started much later than intended.",
  "conditionalImpactWording": "If frequent and consequential, delayed starting may affect work deadlines.",
  "mvpStatus": "MVP"
}

```

---

## 18.8 Evidence

```json
{
  "id": "EVID_PATH_CTX6_REG3_BEH1",
  "level": "Moderate",
  "epistemicStatus": "educational",
  "constructStatus": "multi-step-explanatory-pathway",
  "summary": "Task demand may increase goal-management requirements, and goal-management processes may contribute to starting behaviour.",
  "limitations": [
    "The pathway is not unique to ADHD.",
    "Other mechanisms may contribute.",
    "The pathway does not predict an individual response."
  ],
  "sourceReferenceIds": [
    "SRC_EXEC_REVIEW",
    "SRC_ADULT_ADHD_REVIEW"
  ],
  "lastReviewedDate": "2026-09-19",
  "reviewVersion": "1.0.0"
}

```

---

## 18.9 Safety copy

```json
{
  "id": "SAFETY_REFERENCE_PATH",
  "context": "behaviour-explorer-disclaimer",
  "language": "en",
  "shortVersion": "This pathway does not establish ADHD.",
  "fullVersion": "Task complexity, goal management, delayed starting, procrastination, and work difficulty can occur for many reasons. This pathway is an educational example and cannot determine why a specific person experiences this pattern.",
  "displayRequirement": "mandatory"
}

```

The source specification explicitly requests this complete reference path as the integration example for all entity types.

---

# 19. Validation Rules

Validation must distinguish:

**hard data-contract errors**

from:

**editorial/scientific warnings**.

---

## 19.1 Hard validation errors

### Reference integrity

- every `sourceNodeId` must exist,
- every `targetNodeId` must exist,
- every referenced Behaviour, Context, Regulation, Pattern, Functional Domain, Evidence or Source ID must exist.

---

### Canonical ID integrity

- existing canonical node IDs cannot be modified,
- canonical node IDs cannot be reused for a different concept,
- node category must match ID namespace.

---

### Clinical Anchor safety

Clinical Anchor nodes cannot have outgoing:

- `MODULATES`
- `CONTRIBUTES_TO`

mechanistic edges into explanatory systems.

---

### Relationship integrity

`relationshipType` must be one of:

- `MODULATES`
- `CONTRIBUTES_TO`
- `FEEDBACK_WITH`.

No other canonical edge type is allowed.

---

### Entry-statement safety

`BehaviourEntryStatement` must not contain:

- score fields,
- diagnostic weight,
- severity value,
- threshold value.

---

### Presentation separation

`PresentationEducation` cannot reference:

- BehaviourEntryStatement,
- EducationalPathway,
- user selection state.

Behaviour data cannot produce a Presentation ID.

---

### Pattern-rule safety

A `RecurringPatternRule` cannot contain:

- medical classification output,
- diagnostic threshold,
- deterministic trigger logic.

---

### Pathway uncertainty

Every `EducationalPathway` must contain:

- uncertainty wording,
- scientific caution,
- evidence metadata.

---

### Alternative-explanation requirement

Every Behaviour analysis configuration must have at least one relevant `AlternativeExplanation`.

---

### Evidence requirement

Every Regulation-related pathway must reference `EvidenceMetadata`.

---

### Safety requirement

Every Behaviour Explorer result must reference mandatory Behaviour safety copy.

---

### Advanced/MVP integrity

Advanced concepts cannot appear as canonical MVP nodes.

---

### Prohibited field validation

Any prohibited assessment field causes schema rejection.

The requested hard-validation examples include precisely these classes of constraints.

---

## 19.2 Editorial / scientific warnings

Warnings do not necessarily invalidate data but require review.

### Weak evidence wording

Warning if:

`EvidenceLevel = Limited`

but copy uses:

- “established”
- “proven”
- “causes”.

---

### Causal wording

Warning if explanations contain:

- causes,
- produces,
- proves,
- always leads to,

without explicit approved scientific justification.

---

### Unsupported pathway expansion

Warning if an EducationalPathway contains a Regulation → Behaviour relationship without a canonical edge.

---

### Functional overstatement

Warning if FunctionalExample wording implies inevitable impairment.

---

### Group-to-individual inference

Warning if evidence summary moves from:

> group-level finding

to:

> individual characteristic.

---

### Presentation contamination

Warning if Behaviour or Regulation copy mentions a presentation as though inferred.

---

### Historical-term contamination

Warning if `ADD` appears as a current separate diagnosis.

---

### Advanced concept visibility

Warning if advanced concepts are displayed without explicit lower-confidence labeling.

---

# 20. Prohibited Fields

The following fields must be explicitly forbidden anywhere in the contract:

```text
adhdLikelihood
severityScore
diagnosticConfidence
symptomScore
presentationPrediction
mechanismProbability
treatmentRecommendation
riskOfADHD
adhdProfileScore

```

Also prohibit:

```text
diagnosis
predictedDiagnosis
adhdProbability
adhdRiskPercent
clinicalSeverity
impairmentScore
presentationScore
inattentiveScore
hyperactiveImpulsiveScore
combinedPresentationScore
screeningResult
screeningThreshold
positiveScreen
negativeScreen
userClinicalProfile
mechanismStrength
edgeWeight
causalStrength
predictedPerformance
predictedBehaviour
treatmentPlan
medicationRecommendation
recommendedTherapy
interventionEffectiveness
personalizedMedicalAdvice
differentialDiagnosis
conditionRanking
mostLikelyCondition

```

## Why these are prohibited

Any of these would shift the system from:

**educational knowledge navigation**

toward:

**assessment, prediction, diagnosis, or treatment**.

The source specification explicitly requires prohibition of assessment-like fields at the contract level rather than relying only on UI restraint.

---

# 21. Open Data Questions

## Q1 — Should translations live inside each entity or in a centralized localization table?

**Recommendation:** hybrid.

Canonical high-value educational text may use structured localized fields during early stages.

As localization grows, migrate display strings to `LocalizationText` keys while retaining canonical English scientific identity on the entity.

---

## Q2 — Should EvidenceMetadata attach directly to nodes and edges?

Yes.

Pathways should normally reuse those evidence records rather than duplicate evidence interpretation.

A pathway-specific EvidenceMetadata record is appropriate only when the evidence relates to the combined pathway rather than its individual steps.

---

## Q3 — Should `ContextMapping` duplicate canonical edges?

Only partially.

`RelationshipEdge` is the scientific graph.

`ContextMapping` is educational content describing how the same relationship matters for a specific Behaviour exploration.

Therefore:

- edge = ontology fact/relationship,
- mapping = educational interpretation.

---

## Q4 — Should every Behaviour have a Pattern rule?

No.

Only relationships supported by the frozen ontology should exist.

Do not create artificial pattern links for symmetry.

---

## Q5 — Should all FunctionalExamples require scientific citations?

Not necessarily.

Some are illustrative examples derived from the conceptual model rather than empirical claims.

Where a FunctionalExample makes a specific research claim, attach source references.

Otherwise mark it as:

`illustrative`.

---

## Q6 — Should user interactions be persisted?

Not part of this knowledge contract.

The contract only needs to support temporary navigation state conceptually.

User persistence belongs to later application architecture.

---

## Q7 — Should `visual` metadata contain library-specific fields?

No.

Allowed metadata should remain semantic:

- visual category,
- default visibility,
- conceptual layer,
- edge semantics.

Avoid:

- D3 coordinates,
- Cytoscape style objects,
- Vue component names,
- CSS classes.

---

## Q8 — Should historical versions retain deleted wording?

Yes.

Published content bundles should be immutable and addressable by version.

This permits scientific auditability.

---

# Final Content Contract

The final knowledge model separates five concerns:

```text
Scientific ontology
      ↓
Evidence metadata
      ↓
Educational interpretation
      ↓
Visual semantics
      ↓
Safety / localization

```

The most important implementation rule is:

> **canonical identity and scientific relationships must remain independent from wording, visualization, and user interaction.**

This allows later teams to update:

- Persian copy,
- explanatory wording,
- evidence reviews,
- source references,
- cautions,
- visual grammar,

without changing stable canonical IDs or silently mutating the ADHD model.

No DATA MODEL CONFLICT was identified.

The frozen ontology can be represented cleanly using the entities above without introducing diagnostic logic, numerical scoring, personalized inference, new scientific concepts, or frontend architecture.

DATA MODEL STATUS: READY FOR KNOWLEDGE HANDOFF