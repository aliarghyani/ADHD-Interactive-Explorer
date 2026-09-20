# ADHD Interactive Explorer — Engineering Implementation Specification v1.0

## Document Role

This document is the authoritative Stage 11 engineering contract for the real MVP.

It translates the frozen Knowledge, Product, Technical Architecture, Technology Selection, and successful Validation Spike into implementation-ready responsibilities and boundaries.

The Validation Spike concluded:

**GO — retain Custom Vue DOM/SVG renderer**

Therefore the production visualization baseline is now:

- Custom Vue 3 DOM/SVG renderer
- ELK.js `0.12.0`
- ELK execution at authoring/build time only
- no runtime layout engine
- no runtime graph framework
- Visual Graph + Semantic Relationship Browser
- Vue Focused-Path Navigator for mobile

The spike implementation remains experimental evidence rather than automatically reusable production code.

---

# 1. MVP Scope

## 1.1 Included MVP Experiences

The MVP contains seven product surfaces:

1. Home / Introduction
2. Master System Map
3. Behaviour Explorer
4. Context & Feedback Explorer
5. ADHD Presentation Education
6. Evidence / Sources
7. Methodology / About / Disclaimer

Cross-cutting MVP capabilities:

- English
- Persian
- RTL support
- mixed Persian/English technical text
- accessible semantic graph representation
- keyboard navigation
- static/prerender delivery
- canonical deep linking
- progressive disclosure
- evidence access
- mandatory safety content
- schema validation
- domain invariant validation
- deterministic graph layout
- responsive desktop/tablet behaviour
- mobile Focused-Path Navigator
- automated test coverage
- CI validation
- production static deployment

The Stage 11 source explicitly requires these implementation areas.

---

## 1.2 Explicitly Outside MVP

Remain excluded:

- diagnosis
- screening
- ADHD probability
- ADHD likelihood scoring
- severity assessment
- symptom scoring
- presentation inference
- clinical profiling
- free-text psychological interpretation
- treatment recommendation
- personalized medical interpretation
- symptom history
- Behaviour history/profile
- Context profile
- personal clinical memory
- accounts
- authentication
- backend application server
- database
- runtime CMS
- real-time collaboration
- AI diagnosis
- AI interpretation of free text
- runtime graph editing
- arbitrary graph creation
- graph mutation
- user-defined ontology
- advanced Phase 2 evidence map
- advanced timeline views
- richer Context comparison
- curated pathway stories unless separately approved

Safety boundaries must exist in data, domain logic, state architecture, UI, and tests rather than only disclaimer copy.

---

# 2. Route Contract

Canonical scientific identity must use canonical IDs.

Translated labels must never be route identity.

Recommended production routes:

```text
/:locale

/:locale/map
/:locale/map/:nodeId

/:locale/behaviours
/:locale/behaviours/:behaviourId

/:locale/context
/:locale/context/:contextId

/:locale/presentations
/:locale/presentations/:presentationId

/:locale/evidence
/:locale/evidence/:evidenceId

/:locale/methodology
/:locale/about

```

Supported locale values for MVP:

```text
en
fa

```

---

## 2.1 `/:locale`

### Purpose

Home / product introduction.

### Prerender

Required.

### Accepted canonical IDs

None.

### Client enhancement

Only lightweight interaction such as onboarding disclosure/navigation.

### Shareable state

Locale only.

### Invalid locale

Resolve according to locale-routing policy:

- unsupported locale must not silently map to another scientific dataset
- redirect to default supported locale or controlled locale-not-found handling

---

## 2.2 `/:locale/map`

### Purpose

Master System Map default state.

### Prerender

Required.

Prerender:

- heading
- educational model explanation
- graph disclaimer
- semantic/non-spatial entry content
- legend/help content that does not require browser geometry

### Client enhancement

Load:

- Visual Graph
- viewport fitting
- node highlighting
- client interaction

### Accepted IDs

None required.

### Shareable state

Optional future layer filter only when clearly meaningful and stable.

Do not serialize arbitrary UI state.

---

## 2.3 `/:locale/map/:nodeId`

### Purpose

Deep link into a canonical System Map concept.

### Accepted canonical IDs

Any frozen canonical node ID valid for System Map exploration.

### Invalid ID

Must:

- never fabricate a concept
- never substitute a similarly named ID
- return controlled concept-not-found state
- retain application navigation and safety content

### Prerender

Required for the finite canonical node set.

### Client enhancement

After Visual Graph loads:

- select `nodeId`
- highlight direct neighbours
- highlight relevant canonical relationships
- bring node into visible viewport where necessary

### Shareable URL state

Canonical node only, plus narrowly approved non-personal conceptual query state.

---

## 2.4 `/:locale/behaviours`

### Purpose

Behaviour entry library.

### Prerender

Required.

### Accepted IDs

None.

### Client enhancement

Optional browsing/filtering interaction.

### State

No accumulated Behaviour selection.

---

## 2.5 `/:locale/behaviours/:behaviourId`

### Purpose

Explore one canonical Behaviour.

### Accepted IDs

Only canonical Behaviour IDs.

### Prerender

Required for the finite Behaviour set.

### Shareable state

Allowed:

- canonical Behaviour
- approved pathway ID through query state if necessary

Not allowed:

- list of previously explored Behaviours
- symptom history
- user Behaviour profile

### Invalid ID

Controlled Behaviour-not-found state.

---

## 2.6 `/:locale/context`

### Purpose

Context & Feedback Explorer introduction.

### Prerender

Required.

### Client enhancement

Qualitative Context controls.

---

## 2.7 `/:locale/context/:contextId`

### Purpose

Explore one canonical Context.

### Accepted IDs

Canonical Context IDs only.

### Shareable state

May include one approved qualitative explanatory state or canonical Feedback relationship reference when this materially improves sharing.

No personal Context history.

### Invalid ID

Controlled not-found state.

---

## 2.8 `/:locale/presentations`

### Purpose

Formal ADHD presentation education.

### Prerender

Required.

### Feature isolation

Must not consume Behaviour, Context, or System Map history.

---

## 2.9 `/:locale/presentations/:presentationId`

### Purpose

Deep link to one formal presentation.

### Accepted IDs

Only the frozen presentation IDs.

### Prerender

Required.

### Invalid ID

Controlled presentation-not-found state.

### Forbidden state

No query parameter may represent:

- matched presentation
- predicted presentation
- user score

---

## 2.10 `/:locale/evidence`

### Purpose

Evidence/source index.

### Prerender

Required where content provides meaningful standalone value.

### Client enhancement

Optional search/filter interaction.

---

## 2.11 `/:locale/evidence/:evidenceId`

### Purpose

Inspect one evidence/source record.

### Accepted IDs

Canonical evidence IDs.

### Prerender

Required for evidence records approved for public standalone pages.

### Invalid ID

Controlled evidence-not-found state.

### Client enhancement

Normally minimal.

---

## 2.12 `/:locale/methodology`

### Purpose

Explain:

- model methodology
- scientific boundaries
- evidence interpretation
- uncertainty
- association versus causation
- non-diagnostic design

### Prerender

Required.

---

## 2.13 `/:locale/about`

### Purpose

Product description and global disclaimer/context.

### Prerender

Required.

---

# 3. Knowledge Source Structure

The production knowledge source must remain human-reviewable, machine-validatable, and independent from Vue components.

Avoid both:

- one unmanageable monolithic file
- dozens of tiny records/files with no ownership benefit

Recommended conceptual source ownership:

```text
knowledge/
  source/
    manifest.json

    graph/
      nodes.json
      edges.json

    behaviours/
      behaviours.json
      pathways.json
      alternatives.json

    context/
      contexts.json
      mappings.json
      feedback-loops.json

    patterns/
      patterns.json
      rules.json

    functional-domains/
      domains.json
      examples.json

    presentations/
      presentations.json

    evidence/
      evidence.json
      sources.json

    safety/
      safety.json

    localization/
      en.json
      fa.json

  schemas/

  generated/

  layouts/

```

---

## 3.1 `manifest.json`

Owns technical/content compatibility metadata:

```text
schemaVersion
ontologyVersion
visualGrammarVersion
behaviourFrameworkVersion
contentModelVersion
evidenceReviewVersion
knowledgeReleaseId

```

---

## 3.2 `graph/nodes.json`

Owns exactly the frozen 30 canonical nodes.

Contains scientific identity.

Does not contain:

- user state
- graph coordinates
- Vue styling
- translated duplicated identities

---

## 3.3 `graph/edges.json`

Owns canonical relationships.

Minimum responsibilities:

- edge ID
- source ID
- target ID
- canonical edge type

No renderer styling.

---

## 3.4 Behaviour package

### `behaviours.json`

Canonical Behaviour entries.

### `pathways.json`

Frozen educational pathways used by Behaviour Explorer.

### `alternatives.json`

Alternative explanations associated with appropriate educational contexts.

No personal likelihood weighting.

---

## 3.5 Context package

### `contexts.json`

Canonical Context definitions.

### `mappings.json`

Context → Regulation / Behaviour educational relationships defined by the frozen model.

### `feedback-loops.json`

Canonical Feedback relationships and explanatory records.

---

## 3.6 Pattern package

### `patterns.json`

Canonical recurring Patterns.

### `rules.json`

Educational repeated-pattern relationships.

“Rule” here means content relationship, not predictive runtime rule.

---

## 3.7 Functional Domain package

### `domains.json`

Canonical Functional Domains.

### `examples.json`

Approved educational examples.

Examples are content, not inferred user impact.

---

## 3.8 Presentations package

Owns:

- Predominantly Inattentive Presentation
- Predominantly Hyperactive-Impulsive Presentation
- Combined Presentation
- historical ADD explanation

Must contain no input fields linking presentation education to Behaviour selections.

---

## 3.9 Evidence package

### `evidence.json`

Evidence metadata and relationship mappings.

### `sources.json`

Normalized bibliographic/source records.

Do not duplicate full source metadata across each relationship.

---

## 3.10 Safety package

Contains canonical safety-copy records and placement semantics.

Safety IDs are validated.

---

## 3.11 Localization package

Use one English and one Persian localization dataset keyed by stable canonical/content IDs.

Scientific identity remains elsewhere.

---

# 4. Schema Contract

Use a root JSON Schema architecture with reusable `$defs`.

The production schema family should conceptually contain:

```text
knowledge-package.schema
  $defs/
    canonicalId
    localizedContentId
    node
    edge
    behaviourEntry
    educationalPathway
    contextMapping
    patternRule
    functionalExample
    alternativeExplanation
    presentationEducation
    feedbackLoop
    evidenceMetadata
    sourceReference
    safetyCopy
    localizationRecord
    knowledgeManifest
    layoutArtifact

```

---

## 4.1 Canonical ID rules

Canonical IDs must:

- follow the frozen naming scheme
- remain case-sensitive if defined that way by the knowledge contract
- be unique inside their identity namespace
- never be generated from localized labels at runtime

Pattern validation should be explicit per canonical entity family where possible.

Do not create a generic free-form string ID contract when prefixes are frozen.

---

## 4.2 Node schema

Must enforce:

- required canonical ID
- approved node category
- canonical scientific identity
- no user/profile fields
- no coordinates
- no UI-selected fields
- no translated duplicated identity

---

## 4.3 Edge schema

Must enforce:

- edge ID
- valid source ID
- valid target ID
- approved relationship type only

Approved relationship semantics remain exactly those defined in the frozen model.

---

## 4.4 Evidence schema

Must distinguish:

- evidence metadata
- source reference identity
- linked canonical relationship IDs
- limitations/cautions where required

Must not express individualized probability.

---

## 4.5 Localization schema

Must enforce:

- stable target content/canonical ID
- locale
- required label/text role
- no new scientific identity
- English/Persian completeness for MVP-required content

---

## 4.6 Safety schema

Must define:

- safety ID
- safety role/context
- localized content reference
- required-placement semantics where applicable

---

## 4.7 LayoutArtifact schema

Must validate:

- layout version
- generator version
- graph bounds
- node geometry
- edge geometry
- no scientific textual content
- no unknown canonical IDs

---

## 4.8 Version-manifest schema

Must enforce compatibility metadata.

`schemaVersion` is technical compatibility identity.

Knowledge versions remain domain/content identities.

---

## 4.9 Hard validation rules

Build/CI fails if:

- canonical node count is not exactly 30
- duplicate canonical node ID exists
- duplicate canonical edge ID exists
- an edge references an unknown canonical ID
- an unapproved relationship type appears
- Clinical Anchor contains a prohibited mechanistic outgoing edge
- required presentation education is missing
- Presentation Education schema contains Behaviour-derived input
- mandatory safety record is absent
- prohibited assessment/profile fields are present
- required English content is missing
- required Persian content is missing
- layout references unknown node/edge IDs
- visual graph node lacks required geometry
- supported schema version does not match application compatibility
- required evidence reference cannot resolve

These are explicitly required Stage 11 safeguards.

---

# 5. Domain Contracts

These interfaces are implementation-neutral conceptual contracts.

They must remain independent from Vue.

## 5.1 `ConceptNode`

```text
ConceptNode
  id
  category
  canonicalName

```

May contain other frozen scientific metadata as required by Knowledge Handoff.

Must not contain:

- selected state
- geometry
- CSS classes
- diagnostic/user data

---

## 5.2 `RelationshipEdge`

```text
RelationshipEdge
  id
  sourceId
  targetId
  relationshipType

```

---

## 5.3 `BehaviourEntry`

```text
BehaviourEntry
  id
  canonicalBehaviourId
  plainLanguageContentId
  pathwayIds
  alternativeExplanationIds
  safetyCopyId

```

Actual structure should remain aligned to frozen knowledge data.

---

## 5.4 `EducationalPathway`

```text
EducationalPathway
  id
  behaviourId
  orderedCanonicalRefs
  relationshipRefs
  evidenceRefs

```

No probability.

No ranking of pathways unless explicitly represented in frozen educational content.

---

## 5.5 `ContextMapping`

```text
ContextMapping
  id
  contextId
  relatedRegulationIds
  relatedBehaviourIds
  relationshipRefs

```

---

## 5.6 `PatternRule`

```text
PatternRule
  id
  behaviourOrRelationshipRefs
  patternId
  explanatoryContentId

```

Not executable prediction logic.

---

## 5.7 `FunctionalExample`

```text
FunctionalExample
  id
  functionalDomainId
  contentId
  relatedConceptRefs

```

---

## 5.8 `AlternativeExplanation`

```text
AlternativeExplanation
  id
  applicableBehaviourIds
  contentId
  evidenceRefs?

```

---

## 5.9 `PresentationEducation`

```text
PresentationEducation
  id
  canonicalName
  educationalContentIds
  evidenceRefs
  safetyCopyId

```

Forbidden:

```text
matchedBehaviourIds
score
probability
userCriteria

```

---

## 5.10 `FeedbackLoop`

```text
FeedbackLoop
  id
  relationshipRefs
  canonicalConceptRefs
  explanationContentId
  evidenceRefs

```

---

## 5.11 `EvidenceMetadata`

```text
EvidenceMetadata
  id
  sourceRefIds
  relationshipRefs
  explanationContentId?
  limitationsContentId?

```

---

## 5.12 `SourceReference`

Conceptually:

```text
SourceReference
  id
  title
  authors?
  publication?
  year?
  identifier?
  sourceUrl?

```

Use only fields supported by the frozen evidence contract.

---

## 5.13 `SafetyCopy`

```text
SafetyCopy
  id
  role
  contentKey
  mandatory

```

---

## 5.14 `LocalizationRecord`

```text
LocalizationRecord
  targetId
  locale
  fields

```

`targetId` references canonical/content identity.

---

## 5.15 `KnowledgeManifest`

```text
KnowledgeManifest
  schemaVersion
  ontologyVersion
  visualGrammarVersion
  behaviourFrameworkVersion
  contentModelVersion
  evidenceReviewVersion
  knowledgeReleaseId

```

---

## 5.16 `GraphReadModel`

```text
GraphReadModel
  nodes
  edges
  selectedNodeId
  highlightedNodeIds
  highlightedEdgeIds
  visibleLayers

```

### Node projection

```text
GraphNodeView
  id
  category
  label
  canonicalName?
  selected
  highlighted
  visible

```

### Edge projection

```text
GraphEdgeView
  id
  sourceId
  targetId
  relationshipType
  highlighted
  visible

```

---

## 5.17 `LayoutArtifact`

```text
LayoutArtifact
  layoutVersion
  generatorVersion
  graphBounds
  nodeGeometry
  edgeGeometry

```

Node geometry:

```text
id
x
y
width
height
ports?

```

Edge geometry:

```text
id
start
bendPoints
end

```

---

## 5.18 `SelectionState`

Minimal conceptual state:

```text
SelectionState
  selectedNodeId
  focusedNodeId

```

Feature-specific state remains outside the canonical scientific model.

---

# 6. Domain Query API

The domain layer answers educational questions.

It does not diagnose.

Minimum conceptual query API:

```text
getNode(id)
getEdge(id)

getIncomingRelationships(nodeId)
getOutgoingRelationships(nodeId)
getFeedbackRelationships(nodeId)
getNeighbours(nodeId)

getBehaviour(behaviourId)
getBehaviourPathways(behaviourId)

getRelatedContexts(conceptId)
getRelatedRegulation(conceptId)
getRelatedPatterns(conceptId)
getRelatedFunctionalDomains(conceptId)

getAlternativeExplanations(behaviourId)

getContext(contextId)
getContextMappings(contextId)
getFeedbackLoops(contextId?)

getPresentation(presentationId)

getEvidence(evidenceId)
getEvidenceForRelationship(relationshipId)
getSourcesForEvidence(evidenceId)

getSafetyCopy(safetyId)

getLocalizedNode(nodeId, locale)
getLocalizedContent(contentId, locale)

```

---

## 6.1 Explicitly prohibited domain APIs

Never create:

```text
calculateADHD()
scoreBehaviours()
calculateSeverity()
inferPresentation()
matchPresentation()
rankDiagnosis()
estimateADHDLikelihood()
buildUserProfile()
buildSymptomProfile()
predictFunctionalImpact()

```

Equivalent renamed APIs are also prohibited.

The domain layer answers educational graph/content questions only.

---

# 7. Graph Production Contract

Frozen production flow:

```text
Canonical Knowledge
        ↓
Domain Queries
        ↓
GraphReadModel

```

and separately:

```text
Canonical Knowledge
        ↓
Layout Input Adapter
        ↓
ELK build/authoring process
        ↓
LayoutArtifact

```

then:

```text
GraphReadModel
+
LayoutArtifact
        ↓
Visual Renderer

```

---

## 7.1 Renderer responsibilities

Allowed:

- display nodes
- display edges
- apply semantic styling
- apply geometry
- show selected/highlighted state
- emit selection/focus actions
- apply viewport transform

Forbidden:

- infer relationships
- classify scientific edge types
- call graph traversal to discover neighbours
- aggregate Behaviour
- modify knowledge records
- calculate scientific meaning
- calculate graph layout
- persist exploration history

These boundaries are explicit requirements from Stage 11.

---

# 8. Layout Pipeline

Use exactly:

**`elkjs@0.12.0`**

as development/build tooling.

No runtime ELK.

---

## 8.1 Production pipeline

```text
canonical visual graph
↓
stable normalization
↓
ELK input
↓
ELK layered layout
↓
generated geometry
↓
geometry validation
↓
human visual review
↓
traceable optional overrides
↓
LayoutArtifact
↓
versioned application asset

```

---

## 8.2 Deterministic ordering

Before ELK:

1. group nodes by frozen visual layer
2. sort each layer by canonical ID or explicitly approved visual ordering
3. sort edges by canonical edge ID
4. use explicit stable dimensions
5. use explicit port identities when needed
6. avoid input-order nondeterminism

---

## 8.3 Cross-locale geometry envelope

English and Persian must share one canonical geometry.

Node dimensions should accommodate the approved larger/wrapped form across both languages.

Language switching must not trigger layout calculation.

---

## 8.4 Clinical Anchor

Clinical Anchor is a separate visual/epistemic region.

Its layout metadata may be grouped spatially, but it must not require fabricated scientific relationships.

---

## 8.5 Feedback routing

Feedback edges should use:

- ELK route output as starting geometry
- explicitly reviewed routing
- traceable override when necessary

The edge remains scientifically defined by canonical data; only its route is overridden.

---

## 8.6 Override format

Conceptually:

```text
overrideId
targetType
targetId
layoutVersion
overrideGeometry
reason

```

`targetType`:

- node
- edge

Every override must be reviewable and diffable.

---

## 8.7 Layout versioning

`layoutVersion` should change when:

- node geometry changes
- edge routing changes
- approved node envelope changes
- visual grammar affects structural positioning
- ontology release changes visual topology

---

## 8.8 Layout regeneration conditions

Regenerate only after an approved change to:

- canonical graph topology
- visual layer mapping
- node dimensions
- layout configuration
- layout engine version
- documented override set

Do not regenerate on:

- page load
- locale switch
- user selection
- viewport resize

---

# 9. System Map Architecture

## 9.1 `SystemMapExperience`

### Responsibility

Feature coordinator.

Owns:

- route-derived selection
- feature state
- GraphReadModel projection
- graph/semantic synchronization
- detail-panel state
- filter orchestration

### Inputs

- canonical route ID
- locale
- domain repository/selectors
- LayoutArtifact

### Emits/actions

- select canonical node
- change layer filter
- open evidence
- navigate cross-experience

### State ownership

Owns shared System Map feature state.

### Forbidden

- scientific relationship definitions
- ELK calls
- evidence duplication
- Behaviour aggregation

---

## 9.2 `VisualGraph`

### Responsibility

Render visual network from prepared inputs.

### Inputs

- GraphReadModel
- LayoutArtifact
- viewport state

### Emits

- node selected
- node focused
- reset requested

### Forbidden

- relationship traversal
- domain lookup
- scientific inference
- route mutation directly

---

## 9.3 `GraphNode`

### Responsibility

Render one positioned semantic node.

### Inputs

- GraphNodeView
- node geometry
- localized display data needed for node surface

### Emits

- select
- focus/navigation event

### State

Only local pointer/focus interaction.

### Forbidden

- fetching neighbours
- storing selectedNodeId independently
- graph layout calculation

---

## 9.4 `GraphEdgeLayer`

### Responsibility

Render edge collection in SVG.

### Inputs

- projected edges
- edge geometry
- visual-semantic token mapping

### Forbidden

- discovering relationships
- mutating edge routes
- scientific lookup

---

## 9.5 `ClinicalAnchorRegion`

### Responsibility

Communicate formal clinical separation.

### Inputs

- anchor node projections
- anchor geometry
- Visual Grammar tokens

### Forbidden

- adding mechanistic edges
- participating as explanatory layer 0

---

## 9.6 `GraphViewport`

### Responsibility

Manage visual transform.

Required:

- fit graph
- reset view
- respond to container size

Potential:

- constrained pan/zoom only if justified

### Inputs

- graph bounds
- container bounds

### Forbidden

- changing canonical coordinates
- runtime layout
- graph-domain traversal

---

## 9.7 `GraphLegend`

### Responsibility

Explain category and relationship visual semantics.

### Source

Visual Grammar v1.0 semantic mapping.

### Forbidden

Hardcoded one-off descriptions inconsistent with frozen grammar.

---

## 9.8 `NodeDetailPanel`

### Responsibility

Progressive disclosure for selected concept.

Displays:

- Level 1 overview
- Level 2 relationships
- Level 3 scientific explanation
- evidence entry point

### Forbidden

Diagnostic interpretation.

---

## 9.9 `LayerFilter`

### Responsibility

Control visible explanatory layers.

### State

Feature state only.

### Forbidden

Changing domain data.

---

## 9.10 `SemanticRelationshipBrowser`

### Responsibility

Provide non-spatial access to the same selected concept and relationships.

### Inputs

- selected node
- shared domain selector results
- localized content

### Emits

- select related canonical node
- open evidence

### Forbidden

Duplicating graph relationship logic.

---

# 10. Visual Grammar Implementation

Production styling must come from the frozen **ADHD Visual Grammar v1.0**, not from Validation Spike placeholder styling.

The implementation layer should map semantic tokens to visual primitives.

Conceptual semantic categories:

```text
clinical-anchor
context
regulation
behaviour
pattern
functional-domain

```

Relationship semantics:

```text
MODULATES
CONTRIBUTES_TO
FEEDBACK_WITH

```

Interaction semantics:

```text
default
selected
highlighted
deemphasized
advanced
evidence-available

```

---

## 10.1 Category differentiation

Each category must be distinguishable through more than colour.

Use frozen grammar mechanisms such as:

- shape/container treatment
- border treatment
- typography
- icon/glyph
- label
- colour as supplemental cue

Exact tokens must be consumed from Visual Grammar v1.0 rather than invented by Engineering.

---

## 10.2 Clinical Anchor

Must remain visually separated through:

- region placement
- explicit heading/region semantics
- grammar-defined styling

No fake mechanistic connector.

---

## 10.3 Relationship rendering

Relationship semantics must map centrally.

Components must not define independent styling rules such as:

```text
if edge.type === ...

```

through scattered one-off component CSS.

Use one semantic mapping layer.

---

## 10.4 Evidence badges

Evidence-availability indicators must:

- be semantic
- be keyboard accessible if interactive
- not imply evidence proves diagnosis
- use consistent visual grammar

---

## 10.5 Advanced content

Advanced/scientific detail should be visually distinguishable without suggesting higher certainty merely because it is more technical.

---

# 11. Behaviour Explorer

Flow:

```text
Behaviour library
↓
canonical Behaviour
↓
possible educational pathways
↓
Context
↓
Regulation
↓
Pattern
↓
Functional Domain
↓
alternative explanations
↓
scientific caution

```

---

## 11.1 Route state

Path:

```text
/:locale/behaviours/:behaviourId

```

Optional query:

```text
?pathway=<canonical-pathway-id>

```

only if pathway deep linking is product-approved.

---

## 11.2 Feature state

Allowed:

- selected pathway
- disclosure level
- open evidence item
- temporary UI expansion

Forbidden:

- selectedBehaviours history
- symptom checklist
- multi-Behaviour profile

---

## 11.3 Queries

Feature uses:

```text
getBehaviour()
getBehaviourPathways()
getRelatedContexts()
getRelatedRegulation()
getRelatedPatterns()
getRelatedFunctionalDomains()
getAlternativeExplanations()
getEvidenceForRelationship()

```

---

## 11.4 Surfaces

Conceptual components:

```text
BehaviourLibrary
BehaviourHeader
PathwaySelector
PathwayView
ContextConnections
RegulationConnections
PatternSection
FunctionalDomainSection
AlternativeExplanationSection
BehaviourSafetyNotice
EvidenceEntry

```

---

## 11.5 Evidence

Evidence opens from the specific relationship or educational claim.

Do not show a single vague “evidence” badge implying all pathways have equivalent support.

---

## 11.6 Reset

Reset returns current Behaviour exploration to:

- default pathway state
- default disclosure
- no temporary evidence panel

It does not clear a Behaviour history because none exists.

---

# 12. Context & Feedback Explorer

Core model:

```text
Context
↓
qualitative explanatory state
↓
related Regulation
↓
related Behaviour
↓
possible Feedback

```

---

## 12.1 Route state

```text
/:locale/context/:contextId

```

Optional shareable state only if approved:

```text
?state=supportive

```

or equivalent stable qualitative identifier.

---

## 12.2 Qualitative states

Allowed examples:

```text
supportive
neutral
demanding

```

These are educational framing states.

They are not measurements.

---

## 12.3 Queries

Use:

```text
getContext()
getContextMappings()
getRelatedRegulation()
getRelatedBehaviours()
getFeedbackLoops()
getEvidenceForRelationship()

```

---

## 12.4 Explicitly prohibited

No:

- numeric prediction
- probability
- performance score
- behavioural forecast
- ADHD likelihood
- simulation engine

---

## 12.5 Feedback

Feedback loop surface must:

- identify canonical concepts
- show relationship direction/loop meaning
- preserve caution
- offer evidence access

No runtime-generated loop based on user history.

---

# 13. Presentation Education

This feature covers only formal presentation education.

Supported:

- Predominantly Inattentive Presentation
- Predominantly Hyperactive-Impulsive Presentation
- Combined Presentation
- historical ADD note

---

## 13.1 Dependency boundary

Allowed:

```text
presentation repository
localization
evidence
safety
navigation

```

Forbidden:

```text
Behaviour Explorer state
Context Explorer state
System Map history
selectedBehaviourIds
Behaviour pathway state
user session interpretation

```

---

## 13.2 Technical protection

Do not expose a service such as:

```text
getPresentationForBehaviour()

```

Do not import Behaviour feature composables into Presentation Education.

Architectural/lint boundary tests should make accidental imports visible where practical.

---

# 14. Accessibility

Architecture:

```text
Visual Graph
+
Semantic Relationship Browser

```

Both consume canonical knowledge and shared selection.

---

## 14.1 `selectedNodeId`

Represents application/domain selection.

Shared across:

- Visual Graph
- Semantic Browser
- detail panel
- deep-link state

---

## 14.2 `focusedNodeId`

Represents current visual-graph keyboard focus.

Not automatically equal to selected node.

---

## 14.3 Keyboard model

Minimum:

- Tab enters graph region
- deterministic arrow navigation
- Enter/Space selects
- Escape closes appropriate secondary graph interaction
- visible focus always present

Graph focus navigation remains based on visual geometry, not scientific traversal.

---

## 14.4 Relationship lists

Semantic Browser exposes:

- selected concept
- upstream relationships
- downstream relationships
- Feedback relationships

Additional domain grouping is allowed when derived from shared selectors.

---

## 14.5 Synchronization

Visual selection:

```text
Visual Graph
→ selectedNodeId
→ Semantic Browser

```

Semantic selection:

```text
Semantic Browser
→ selectedNodeId
→ Visual Graph

```

No duplicate stores.

---

## 14.6 Focus transfer

Selection synchronization does not imply focus stealing.

Focus transfers only after explicit interactions such as:

- “Show in graph”
- graph-entry action
- closing a panel back to triggering control

---

## 14.7 Reduced motion

Core educational semantics must remain available without motion.

Respect user/browser reduced-motion preference.

---

## 14.8 Graph failure

If Visual Graph fails:

- Semantic Browser remains
- selected concept remains
- relationships remain
- educational content remains
- evidence remains reachable

---

# 15. Responsive Architecture

## 15.1 Desktop

Primary:

**layered Visual Graph**

with:

- detail panel
- filters
- semantic-browser access
- evidence access

---

## 15.2 Tablet

Adaptive.

Possible presentation:

- reduced graph area
- collapsible detail panel
- easy Visual/Semantic mode switching

Same canonical knowledge and state.

---

## 15.3 Mobile

Primary:

**Focused-Path Navigator**

Do not shrink the desktop graph.

---

## 15.4 Shared mobile/desktop domain layer

Share:

```text
KnowledgeRepository
domain selectors
canonical selection identity
relationship queries
localization
evidence
safety

```

Do not share:

- desktop viewport implementation
- SVG graph renderer
- desktop coordinate interaction

---

## 15.5 Focused-Path model

Conceptually:

```text
Current concept
↓
relationship categories
↓
related concepts
↓
choose next concept
↓
concept detail

```

This uses ordinary Vue UI.

---

# 16. Localization / RTL

## 16.1 Generic UI

Use a Nuxt-compatible i18n layer for:

- navigation
- buttons
- actions
- generic states
- generic errors
- accessibility UI labels

---

## 16.2 Domain scientific content

Use canonical-ID/content-ID-keyed localization.

Scientific identity remains language independent.

---

## 16.3 Routes

Use explicit:

```text
/en/...
/fa/...

```

---

## 16.4 Document metadata

English:

```text
lang="en"
dir="ltr"

```

Persian:

```text
lang="fa"
dir="rtl"

```

---

## 16.5 Graph geometry

English and Persian use the same:

- node coordinates
- edge routes
- visual layer order
- source/target semantics

Do not mirror scientific graph geometry merely because document direction changes.

---

## 16.6 Bidi isolation

Provide reusable helpers/components for:

- canonical English terms
- `ADHD`
- acronyms
- source titles
- DOI/identifiers
- URLs
- mixed citation metadata

Do not fix bidi independently in each feature.

---

## 16.7 Citations

Render citation fields structurally where possible:

```text
authors
title
publication
year
identifier

```

instead of concatenating one fragile mixed-direction string.

---

## 16.8 Language switching

Switching:

```text
/en/map/BEH1

```

to:

```text
/fa/map/BEH1

```

preserves:

- canonical route entity
- selection
- meaningful conceptual state

and changes:

- UI labels
- localized scientific content
- document direction

---

# 17. State Ownership

## 17.1 Domain data

Location:

validated immutable knowledge repository.

Persistence:

versioned static assets.

---

## 17.2 URL state

Use for:

- locale
- current experience
- canonical node
- canonical Behaviour
- canonical Context
- presentation
- evidence record
- narrowly approved shareable pathway/focus state

---

## 17.3 Feature exploration state

Use feature-scoped composables for:

- active pathway
- active Context qualitative state
- visible graph layers
- selected Feedback view
- current progressive-disclosure level

Do not persist by default.

---

## 17.4 Presentation state

Local component/feature state:

- drawer open
- popover
- tooltip
- panel tab
- graph focus
- hover
- viewport transform

Never persist.

---

## 17.5 Preferences

Narrow persistence allowlist:

- preferred language if needed
- onboarding-complete marker
- explicitly approved non-clinical display preference

---

## 17.6 Pinia decision

**No Pinia by default.**

Use:

- router
- composables
- component state
- explicit preference adapter

Revisit only if real cross-feature shared mutable state becomes substantial.

The Stage 11 source explicitly retains the no-Pinia-by-default decision.

---

## 17.7 Prohibited persisted state

Never persist:

```text
Behaviour history
symptom history
ADHD profile
Context profile
inferred presentation
medical state
diagnostic state

```

---

# 18. Safety Enforcement

Safety must be implemented through seven layers.

## 18.1 Schema

Reject:

```text
score
adhdLikelihood
diagnosisResult
presentationPrediction
symptomProfile
userClinicalState

```

and semantically equivalent prohibited assessment fields.

---

## 18.2 Domain API

No scoring, diagnosis, presentation inference, or profile APIs.

---

## 18.3 Feature boundaries

Presentation Education cannot consume Behaviour or Context exploration state.

Behaviour Explorer has no profile aggregator.

---

## 18.4 State

No cumulative Behaviour/symptom model.

---

## 18.5 Persistence

No “persist entire store/state” infrastructure.

Persistence is allowlist-based.

---

## 18.6 UI

Mandatory safety content displayed contextually:

- global disclaimer
- graph disclaimer
- Behaviour caution
- alternative explanation reminder
- Pattern caution
- Functional Domain caution
- presentation caution
- group-level evidence caution

---

## 18.7 Tests

Safety invariants receive explicit regression tests.

Safety must be structural rather than copy-only.

---

# 19. Evidence Architecture

## 19.1 Evidence index

Compact runtime/indexable record:

```text
evidenceId
sourceRefIds
relationshipRefs
compactCitationFields

```

Available early when relevant.

---

## 19.2 Evidence detail

Lazy-loadable detailed record:

```text
scientific explanation
limitations
source details
group-level caution
localized explanation

```

Fields must follow frozen evidence contract.

---

## 19.3 Relationship mapping

Evidence maps through canonical relationship IDs rather than component-local references.

---

## 19.4 Source records

Normalize common bibliographic metadata into canonical source references.

Avoid duplicate source data.

---

## 19.5 Deep linking

```text
/:locale/evidence/:evidenceId

```

---

## 19.6 Lazy loading

System Map initial graph does not require all full evidence records.

Load detailed evidence when requested.

---

## 19.7 Group-level caution

Evidence surfaces must clearly preserve the distinction between:

- group-level research
- individual clinical interpretation

---

## 19.8 Prerender/indexability

Prerender evidence pages when:

- content is meaningful standalone
- public display is appropriate
- source metadata supports the page

Do not generate thin SEO-only evidence pages.

---

# 20. Loading / Performance

The graph contains only approximately 30 canonical nodes.

Do not optimize for large-scale graph problems.

---

## 20.1 Home

Load:

```text
app shell
current locale
Home educational content

```

Do not load:

- visual graph bundle
- LayoutArtifact unless reused for an actual visual
- ELK
- full evidence detail

---

## 20.2 System Map

Sequence:

```text
prerendered educational content
+
Semantic Relationship Browser
+
selected canonical concept when routed
↓
client graph renderer chunk
↓
LayoutArtifact
↓
restore selectedNodeId
↓
interactive enhancement

```

---

## 20.3 Behaviour Explorer

Load current:

- Behaviour content
- pathway metadata
- relevant canonical relationship data
- compact evidence index

Detailed evidence on demand.

---

## 20.4 Context Explorer

Load current Context and its relevant mappings.

No simulation code.

---

## 20.5 Presentation Education

Predominantly static/prerendered content.

Minimal client runtime.

---

## 20.6 Realistic performance risks

Monitor:

- visualization chunk loaded globally accidentally
- both complete languages bundled unnecessarily
- full evidence corpus in initial payload
- layout shift before graph fit
- fonts
- long Persian node content
- unnecessary hydration

Do not introduce:

- Web Workers
- graph database
- graph virtualization
- server-side graph computation

without evidence.

---

# 21. Error Handling

Scientific content must never be silently fabricated.

## 21.1 Invalid canonical ID

Behaviour:

- reject as unknown
- show controlled not-found surface
- retain navigation
- provide valid return destination

Never fuzzy-match to another concept automatically.

---

## 21.2 Missing knowledge record

Development/build:

hard failure if record is mandatory.

Unexpected production condition:

controlled unavailable state + diagnostic technical logging where available.

Never synthesize scientific content.

---

## 21.3 Incompatible schema version

CI/build:

hard fail.

Runtime should not normally encounter mismatched assets because application deployment must be atomic.

If encountered:

show controlled technical incompatibility state.

---

## 21.4 Failed visual renderer

Preserve:

- educational content
- selected concept
- Semantic Browser
- safety messaging
- evidence access

Show modest visual-graph unavailable state.

---

## 21.5 Missing layout geometry

Build:

hard fail for required graph entity.

Do not attempt runtime auto-layout.

---

## 21.6 Missing evidence detail

Keep:

- overview
- relationship information
- caution

Show evidence-detail unavailable.

Do not invent citation.

---

## 21.7 Localization fallback

For mandatory MVP content:

missing English/Persian localization should fail validation.

Do not silently expose production mandatory content in the wrong locale merely because translation is missing.

Optional non-critical metadata may use an explicit documented fallback policy.

---

## 21.8 Malformed deep link

Treat as invalid canonical route state.

Never interpret arbitrary strings as psychological input.

---

# 22. Test Architecture

## 22.1 Unit tests

Own:

### Schema helpers

- ID formats
- validator behavior

### Domain selectors

- incoming relationships
- outgoing relationships
- neighbours
- Feedback relationships
- Behaviour pathways
- Context mappings
- Functional Domains
- alternative explanations
- evidence mappings

### GraphReadModel

- selected projection
- highlight projection
- filtering

### Layout utility

- geometry lookup
- graph bounds/fit math

### Safety helpers

- persistence allowlist
- analytics sanitization if analytics later exists

---

## 22.2 Contract/schema tests

Mandatory:

- exactly 30 canonical nodes
- canonical ID uniqueness
- edge identity uniqueness
- relationship reference integrity
- approved edge-type set
- Clinical Anchor restrictions
- presentation isolation contract
- English localization completeness
- Persian localization completeness
- required safety records
- evidence reference resolution
- knowledge version compatibility

---

## 22.3 Component tests

Test critical component behaviour:

### System Map

- GraphNode states
- LayerFilter
- NodeDetailPanel
- GraphLegend
- SemanticRelationshipBrowser

### Behaviour

- pathway selector
- alternative explanations
- safety notice

### Context

- qualitative state selector
- Feedback presentation

### Presentation

- educational switch/navigation
- no imported Behaviour state behaviour

### Evidence

- citation surface
- evidence detail state

---

## 22.4 Integration tests

Own cross-component/state boundaries:

- route → selectedNodeId
- graph selection → Semantic Browser
- Semantic Browser → graph
- locale switching → canonical selection preservation
- Behaviour route → pathway content
- Context route → relationship view
- evidence relationship → evidence detail
- graph failure → semantic fallback
- hydration/client enhancement

---

## 22.5 Accessibility tests

Automated:

- axe-class violations
- semantic markup baseline
- focusability

Interaction:

- keyboard graph traversal
- Enter/Space selection
- focus visibility
- drawer focus management
- Semantic Browser keyboard operation

Manual review remains required for major screen-reader flows.

---

## 22.6 RTL tests

Verify:

- document direction
- navigation mirroring
- graph coordinates unchanged
- mixed Persian/English node content
- canonical English names
- citations
- drawers
- Behaviour content
- Context state controls

---

## 22.7 Deep-link tests

Fresh browser load for:

```text
/en/map/<node>
/fa/map/<node>

/en/behaviours/<behaviour>

/fa/context/<context>

/en/presentations/<presentation>

/fa/evidence/<evidence>

```

Verify correct canonical restoration.

---

## 22.8 Hydration tests

Verify:

- no graph hydration mismatch
- static semantic content survives
- client visual renderer mounts only where required

---

## 22.9 Visual regression

Required key snapshots:

- Home English
- Home Persian
- System Map default
- System Map selected node
- Feedback edge
- Clinical Anchor region
- Persian System Map
- tablet graph
- Behaviour selected pathway
- Context qualitative state
- Presentation Education
- evidence surface

---

## 22.10 E2E

Critical MVP flows:

### Flow A

New user → understand model → System Map.

### Flow B

Behaviour → multiple pathways → alternatives/evidence.

### Flow C

Context → qualitative state → Regulation → Feedback.

### Flow D

Presentation Education.

### Flow E

Relationship → scientific explanation → evidence.

---

# 23. CI Pipeline

Recommended production CI:

```text
1. install with locked dependency graph

2. validate JSON schemas

3. validate scientific/domain invariants

4. validate localization completeness

5. validate safety invariants

6. validate knowledge manifest compatibility

7. regenerate/check layout artifact consistency

8. validate layout geometry coverage

9. TypeScript/vue-tsc

10. lint

11. unit tests

12. component/integration tests

13. Nuxt build/prerender

14. accessibility automated checks

15. critical E2E tests

16. visual regression checks where configured

17. package immutable deployment artifact

```

---

## 23.1 Deployment blockers

Always block deployment on failure of:

- schema validation
- 30-node invariant
- canonical references
- prohibited relationship semantics
- safety invariants
- localization-required content
- manifest compatibility
- layout coverage
- TypeScript build
- unit/domain tests
- critical integration tests
- production Nuxt build
- critical E2E

Accessibility critical violations also block release.

Visual regression should block when approved baselines reveal unexplained semantic/layout changes.

---

# 24. Dependency Baseline

Only justified dependencies are allowed.

## 24.1 Framework

- Nuxt 4
- Vue 3
- TypeScript
- `vue-tsc`

Exact compatible version pins resolved in WP-01.

---

## 24.2 Build-time graph layout

- `elkjs@0.12.0`

Exact pin.

Development/build dependency only.

---

## 24.3 Schema validation

Use standards-based JSON Schema validator such as Ajv-class implementation.

Exact version selected in WP-02.

---

## 24.4 Localization

Nuxt-compatible Vue i18n integration.

---

## 24.5 Unit/component testing

- Vitest
- Vue Test Utils

---

## 24.6 Browser/E2E

- Playwright

---

## 24.7 Accessibility

- axe-based browser accessibility integration

---

## 24.8 Explicitly excluded

Do not add:

- Vue Flow
- Cytoscape
- D3
- Pinia
- graph-analysis packages
- backend frameworks
- databases
- CMS
- authentication SDK

unless a validated new requirement changes architecture.

---

# 25. Project Structure

Production conceptual ownership:

```text
app/
  pages/
  layouts/
  components/
  composables/
  middleware/
  assets/

features/
  home/
  system-map/
  behaviour-explorer/
  context-feedback/
  presentation-education/
  evidence/
  methodology/

domain/
  knowledge/
  relationships/
  behaviours/
  contexts/
  patterns/
  functional-domains/
  presentations/

knowledge/
  source/
  schemas/
  generated/
  layouts/
  manifest/

visualization/
  system-map/
    adapter/
    renderer/
    nodes/
    edges/
    viewport/

accessibility/
  semantic-browser/
  focus/

localization/
  ui/
  domain/
  bidi/

evidence/
  models/
  repository/
  citations/

safety/
  content/
  invariants/
  persistence/

validation/
  schema/
  domain/
  localization/
  safety/
  layout/
  versioning/

shared/
  ui/
  types/
  utilities/

scripts/
  knowledge/
  layout/

tests/
  contract/
  unit/
  component/
  integration/
  accessibility/
  rtl/
  visual/
  e2e/

```

---

## 25.1 Ownership rules

### `app/`

Nuxt/framework integration.

No canonical scientific model ownership.

### `features/`

Experience orchestration.

### `domain/`

Pure TypeScript educational/domain queries.

### `knowledge/`

Authoritative machine-readable content and generated runtime content.

### `visualization/`

System Map renderer only.

### `accessibility/`

Shared semantic/non-spatial interaction.

### `localization/`

Generic UI locale infrastructure and bidi utilities.

### `evidence/`

Evidence/source model and rendering helpers.

### `safety/`

Safety infrastructure and persistence restrictions.

### `validation/`

Build-time contract enforcement.

### `shared/`

Truly domain-neutral utilities/components.

Do not use `shared/` as an architectural junk drawer.

---

# 26. Implementation Order

The recommended sequence is risk-controlled and establishes domain integrity before feature expansion.

## Stage 1 — Project Foundation

### Prerequisite

None.

### Deliverable

- Nuxt 4 baseline
- Vue/TypeScript
- test infrastructure
- lint/typecheck
- basic English/Persian routing shell
- CI skeleton

### Verification

- dev server
- production build
- typecheck
- basic test
- `/en` and `/fa`

### Completion criterion

Repository runs, tests, builds, and supports locale routing without product domain implementation.

---

## Stage 2 — Knowledge Contract & Validation

### Prerequisite

Foundation.

### Deliverable

- knowledge source structure
- schemas
- manifest
- all frozen canonical data imported
- hard validation
- localization validation
- safety validation

### Verification

Known-invalid fixtures fail for expected reasons.

### Completion criterion

Frozen knowledge can be validated independently of Vue.

---

## Stage 3 — Domain Query Layer

### Prerequisite

Validated knowledge.

### Deliverable

- KnowledgeRepository
- graph queries
- Behaviour queries
- Context queries
- presentation queries
- evidence mappings

### Verification

Domain unit tests.

### Completion criterion

Every feature can obtain its educational data without direct JSON traversal.

---

## Stage 4 — Layout Pipeline

### Prerequisite

Canonical graph and domain identity.

### Deliverable

- ELK 0.12.0
- normalized input
- geometry generation
- LayoutArtifact schema
- geometry coverage validation
- reviewed full graph layout

### Verification

All required nodes/edges have valid geometry.

### Completion criterion

Runtime no longer needs a layout engine.

---

## Stage 5 — Shared Localization & Safety

### Prerequisite

Knowledge/content contracts.

### Deliverable

- UI i18n
- domain localization access
- bidi helpers
- SafetyCopy retrieval
- global disclaimer surfaces
- persistence allowlist

### Verification

English/Persian content + RTL tests.

### Completion criterion

Feature teams can consume localization and safety consistently.

---

## Stage 6 — System Map Core

### Prerequisite

Domain queries + layout.

### Deliverable

- GraphReadModel
- custom Vue DOM/SVG renderer
- graph viewport
- Clinical Anchor
- selection
- highlighting
- layer filtering
- route restoration

### Verification

Full 30-node production graph tests and visual review.

### Completion criterion

Visual System Map works without domain leakage.

---

## Stage 7 — Semantic Relationship Browser & Accessibility

### Prerequisite

System Map selection + domain queries.

### Deliverable

- Semantic Browser
- focusedNodeId
- keyboard interaction
- graph/browser synchronization
- reduced motion

### Verification

Keyboard and accessibility integration tests.

### Completion criterion

System Map remains educationally usable without spatial interpretation.

---

## Stage 8 — Behaviour Explorer

### Prerequisite

Domain query layer + safety/localization.

### Deliverable

Full Behaviour flow.

### Verification

Multiple pathways, alternatives, no Behaviour accumulation.

### Completion criterion

Behaviour flow passes product acceptance criteria.

---

## Stage 9 — Context & Feedback Explorer

### Prerequisite

Context/Feedback domain queries.

### Deliverable

Context qualitative states, relationships, Feedback.

### Verification

No numerical prediction; canonical relationships only.

### Completion criterion

Context experience passes safety and UX contracts.

---

## Stage 10 — Presentation Education

### Prerequisite

Presentation content/evidence.

### Deliverable

Three presentations + ADD history note.

### Verification

Feature-isolation tests.

### Completion criterion

No Behaviour/Context state dependency.

---

## Stage 11 — Evidence / Sources

### Prerequisite

Evidence repository.

### Deliverable

- evidence index
- evidence routes
- lazy detail
- citation rendering
- group-level caution

### Verification

Evidence deep links and localization.

### Completion criterion

Evidence progressive disclosure works independently from graph.

---

## Stage 12 — Mobile Focused-Path

### Prerequisite

Stable domain selectors and selection model.

### Deliverable

Mobile non-graph navigation.

### Verification

Mobile flows for Map-related conceptual exploration.

### Completion criterion

Mobile user is not dependent on desktop graph.

---

## Stage 13 — Hardening

### Prerequisite

All MVP features.

### Deliverable

- full accessibility review
- RTL review
- E2E
- visual regression
- performance review
- safety invariant audit

### Completion criterion

All release gates pass.

---

## Stage 14 — Deployment

### Prerequisite

Release candidate.

### Deliverable

- prerender deployment
- CDN/static host
- cache policy
- rollback strategy
- immutable release artifact

### Completion criterion

Production-like deployment and rollback verified.

---

# 27. Codex Work Packages

Do not implement the MVP through one giant Codex request.

Each package should be independently reviewable.

## WP-01 — Project Foundation

### Objective

Create a clean Nuxt 4 production baseline.

### Allowed areas

```text
app/
tests/
configuration
CI bootstrap
package configuration
localization bootstrap

```

### Required inputs

- Stage 11 Implementation Specification
- repository status
- chosen package manager/runtime policy
- English/Persian route contract

### Deliverables

- Nuxt/Vue/TypeScript baseline
- locale routing shell
- lint
- typecheck
- Vitest baseline
- Vue Test Utils baseline
- Playwright baseline
- CI skeleton

### Tests

- smoke unit
- locale route smoke
- production build smoke

### Non-goals

- ADHD knowledge
- graph
- product features

### Completion

Repository builds/tests successfully.

### Dependencies

None.

---

## WP-02 — Knowledge Contract & Validation

### Objective

Implement authoritative machine-readable knowledge contract and validators.

### Allowed areas

```text
knowledge/
validation/
scripts/knowledge/
tests/contract/

```

### Inputs

- Knowledge Handoff v1.0.1
- frozen machine-readable model
- safety content
- version metadata

### Deliverables

- source structure
- JSON schemas
- manifest schema
- hard validators
- localization completeness validator
- prohibited-field validator

### Tests

- 30-node count
- duplicate ID rejection
- broken reference rejection
- invalid relationship rejection
- Clinical Anchor invariant
- safety records
- EN/FA completeness

### Non-goals

UI.

### Completion

All authoritative source content validates; intentionally invalid fixtures fail.

### Dependency

WP-01.

---

## WP-03 — Domain Query Layer

### Objective

Create pure TypeScript domain repository and educational query API.

### Allowed areas

```text
domain/
tests/unit/domain/

```

### Inputs

WP-02 generated/validated domain data.

### Deliverables

- KnowledgeRepository
- graph queries
- Behaviour queries
- Context queries
- Feedback queries
- presentation queries
- evidence mappings

### Tests

All selector/query invariants.

### Non-goals

Vue components, route state, rendering.

### Completion

Feature data can be obtained exclusively through domain APIs.

### Dependency

WP-02.

---

## WP-04 — Layout Pipeline

### Objective

Generate deterministic production `LayoutArtifact`.

### Allowed areas

```text
knowledge/layouts/
scripts/layout/
validation/layout/
tests/contract/layout/

```

### Inputs

Canonical graph from WP-02/03.

### Deliverables

- ELK 0.12.0 exact dependency
- normalized layout adapter
- layout generation script
- artifact schema
- geometry validation
- optional override mechanism
- reviewed initial full-graph artifact

### Tests

- node coverage
- edge coverage
- unknown geometry rejection
- graph bounds
- artifact compatibility

### Non-goals

Runtime graph rendering.

### Completion

Full graph has reviewed stable runtime geometry.

### Dependencies

WP-02, preferably WP-03.

---

## WP-05 — Shared Localization, RTL & Safety Infrastructure

### Objective

Provide production cross-feature language and safety infrastructure.

### Allowed areas

```text
localization/
safety/
app/ locale integration
shared/ limited helpers
tests/rtl/

```

### Deliverables

- `/en/` / `/fa/`
- document `lang/dir`
- domain translation lookup
- bidi utilities
- safety content retrieval
- persistence allowlist

### Tests

- locale switching
- canonical identity preservation
- RTL
- mixed-direction samples
- safety record resolution

### Non-goals

Feature-specific content surfaces.

### Dependencies

WP-01, WP-02.

---

## WP-06 — System Map Core

### Objective

Productionize validated custom graph architecture.

### Allowed areas

```text
features/system-map/
visualization/system-map/
app/pages/...map...
tests/component/system-map/
tests/integration/system-map/

```

### Inputs

- WP-03 domain
- WP-04 LayoutArtifact
- WP-05 localization/safety
- Visual Grammar v1.0

### Deliverables

- GraphReadModel builder
- SystemMapExperience
- VisualGraph
- HTML GraphNode
- SVG edges
- Clinical Anchor
- viewport fit/reset
- layer filter
- node selection
- highlighting
- deep-link restoration
- detail panel shell
- legend

### Tests

- renderer projection
- deep link
- selected/highlighted state
- layer visibility
- Clinical Anchor invariant
- geometry use

### Non-goals

Semantic Browser
Behaviour Explorer
mobile graph alternative

### Completion

Full graph works using fixed geometry and no runtime ELK.

### Dependencies

WP-03, WP-04, WP-05.

---

## WP-07 — Semantic Relationship Browser & Graph Accessibility

### Objective

Provide independent non-spatial exploration and keyboard synchronization.

### Allowed areas

```text
accessibility/
features/system-map/
tests/accessibility/

```

### Deliverables

- SemanticRelationshipBrowser
- selectedNodeId synchronization
- focusedNodeId
- keyboard navigation
- reduced motion
- graph failure fallback

### Tests

- graph → semantic
- semantic → graph
- keyboard
- focus vs selection
- visual renderer failure

### Non-goals

Full mobile Focused-Path Navigator.

### Completion

System Map is functionally educational without interpreting spatial graph.

### Dependency

WP-06.

---

## WP-08 — Behaviour Explorer

### Objective

Implement non-diagnostic Behaviour education.

### Allowed areas

```text
features/behaviour-explorer/
app/pages/...behaviours...
tests/component/behaviour/
tests/integration/behaviour/

```

### Deliverables

- Behaviour library
- Behaviour route
- pathway selector
- Context/Regulation/Pattern/Functional sections
- alternatives
- caution
- evidence links
- reset

### Tests

- pathways
- alternatives
- no accumulated profile
- invalid ID
- deep linking
- safety

### Non-goals

Screening, checklist, scoring.

### Completion

Behaviour flow meets Product Architecture.

### Dependencies

WP-03, WP-05.

---

## WP-09 — Context & Feedback Explorer

### Objective

Implement qualitative Context education.

### Allowed areas

```text
features/context-feedback/
app/pages/...context...
tests/...context...

```

### Deliverables

- Context routes
- qualitative states
- Regulation/Behaviour relationships
- Feedback loop view
- evidence entry
- cautions

### Tests

- qualitative state
- Feedback mapping
- no numeric/predictive output
- no persistence profile

### Non-goals

Simulation.

### Completion

Context flow meets product constraints.

### Dependencies

WP-03, WP-05.

---

## WP-10 — Presentation Education

### Objective

Implement isolated clinical terminology education.

### Allowed areas

```text
features/presentation-education/
app/pages/...presentations...
tests/...presentations...

```

### Deliverables

- presentation index
- three presentation pages/views
- ADD history note
- evidence/caution

### Tests

- route validity
- complete content
- import/state isolation
- no Behaviour inference

### Non-goals

Quiz, symptom matching, scoring.

### Completion

Presentation feature consumes no Behaviour/Context exploration state.

### Dependencies

WP-03, WP-05.

---

## WP-11 — Evidence / Sources

### Objective

Implement evidence progressive disclosure and source routes.

### Allowed areas

```text
evidence/
features/evidence/
app/pages/...evidence...
tests/...evidence...

```

### Deliverables

- evidence index
- evidence details
- source normalization
- citation renderer
- lazy detail loading
- deep links
- group-level caution

### Tests

- evidence mapping
- missing detail handling
- citation RTL
- route restoration

### Completion

Evidence works independently from graph renderer.

### Dependencies

WP-03, WP-05.

---

## WP-12 — Mobile Focused-Path Navigator

### Objective

Provide mobile-first non-spatial conceptual navigation.

### Allowed areas

```text
features/system-map/mobile/
shared mobile UI if genuinely generic
tests/mobile/

```

### Inputs

Shared domain selectors and selection model.

### Deliverables

- focused concept view
- relationship-category navigation
- next concept selection
- detail access
- evidence/cross-feature links

### Tests

- mobile navigation
- canonical selection
- accessibility
- RTL

### Non-goals

Shrunken desktop SVG graph.

### Completion

Mobile user can explore the model without the desktop graph.

### Dependencies

WP-03, WP-07.

---

## WP-13 — Accessibility / RTL Hardening

### Objective

Cross-feature quality pass.

### Allowed areas

All user-facing feature areas, limited to accessibility/RTL fixes consistent with architecture.

### Deliverables

- keyboard review
- screen-reader review
- focus management
- Persian rendering review
- bidi fixes
- reduced motion
- touch target review

### Tests

Accessibility and RTL regression suite.

### Non-goals

Architecture redesign.

### Completion

Critical accessibility/RTL acceptance criteria pass.

### Dependencies

WP-06 through WP-12.

---

## WP-14 — E2E / Visual Regression & Release Hardening

### Objective

Validate complete MVP flows.

### Deliverables

- five critical E2E flows
- cross-locale critical paths
- visual baselines
- invalid-state tests
- hydration checks
- safety regression coverage

### Completion

Release test matrix passes.

### Dependencies

Feature packages complete.

---

## WP-15 — Static Deployment Hardening

### Objective

Finalize production static delivery.

### Allowed areas

Deployment/CI/cache configuration.

### Deliverables

- prerender route generation
- static host build
- cache-control
- immutable assets
- release version compatibility
- rollback documentation
- deployment gate

### Tests

- deployed deep links
- EN/FA direct navigation
- rollback smoke
- asset-cache behaviour

### Completion

Production-equivalent static deployment is repeatable.

### Dependency

WP-14.

---

# 28. Codebase-Memory Trigger Policy

## 28.1 Initial MVP packages

Classification:

**NOT NEEDED**

for:

- WP-01
- WP-02
- WP-03
- WP-04
- early WP-05

Reason:

Architecture is already explicit, codebase is still small, and the implementation specification provides stronger source-of-truth guidance than a repository graph would initially add.

---

## 28.2 When repository graph / Codebase Memory becomes useful

Consider enabling repository-level graph/memory tooling when one or more conditions emerge:

### Repository complexity

The codebase has enough modules that engineers repeatedly need to rediscover ownership/dependency relationships.

### Cross-feature dependency analysis

Changes to shared domain/selectors/localization affect several independent features.

### Refactoring

A refactor requires tracing:

- imports
- composable usage
- selectors
- shared types
- route-feature dependencies

### Impact analysis

Before modifying:

- KnowledgeRepository contract
- canonical type structure
- GraphReadModel
- localization contracts
- safety infrastructure

### Multi-package architecture

If the repository later becomes a workspace/monorepo.

### Recurring navigation cost

If Codex or humans repeatedly spend significant effort rediscovering call/dependency structure.

---

## 28.3 Likely useful phase

Most likely useful:

- after WP-08/WP-09 when several feature domains coexist
- during WP-13 hardening
- before large cross-cutting refactors
- after future Phase 2 expansion

---

## 28.4 Policy

Repository graph tools supplement:

```text
source code
+
Engineering Implementation Specification

```

They never replace either.

The Stage 11 brief explicitly requires this conditional—not automatic—use of Codebase Memory.

---

# 29. Implementation Invariants

Final engineering checklist:

-  Exactly 30 canonical nodes exist.
-  Canonical IDs match frozen Knowledge Handoff.
-  Canonical IDs never depend on localized labels.
-  Canonical relationships remain frozen.
-  Only approved relationship types exist.
-  Scientific content is never hardcoded into Vue components.
-  UI consumes validated knowledge rather than redefining it.
-  Clinical Anchor remains epistemically separate.
-  Clinical Anchor has no prohibited mechanistic outgoing relationship.
-  Presentation terminology remains separate from explanatory graph logic.
-  ELK.js is exactly `0.12.0`.
-  ELK never enters runtime application bundles.
-  Runtime performs no graph layout.
-  Graph geometry comes only from validated `LayoutArtifact`.
-  Visual renderer does not traverse scientific relationships.
-  Visual renderer does not classify canonical edges.
-  `GraphReadModel` remains library-neutral.
-  Production visual semantics follow ADHD Visual Grammar v1.0.
-  Relationship semantics are not represented only through colour.
-  Visual Graph and Semantic Browser consume the same domain selectors.
-  Semantic Browser remains usable if Visual Graph fails.
-  `focusedNodeId` is separate from `selectedNodeId`.
-  Keyboard selection works.
-  Reduced-motion mode preserves all scientific meaning.
-  Desktop and mobile share domain logic, not renderer implementation.
-  Mobile uses Focused-Path Navigator rather than shrunken desktop graph.
-  English and Persian share canonical identities.
-  English and Persian share graph geometry.
-  RTL never reverses scientific source → target semantics.
-  Mixed Persian/English terminology uses controlled bidi isolation.
-  Behaviour exploration does not accumulate selections.
-  No Behaviour profile exists.
-  Context exploration does not persist a Context profile.
-  No numeric Context simulation exists.
-  Presentation Education cannot consume Behaviour state.
-  Presentation Education cannot consume Context exploration history.
-  No diagnostic API exists.
-  No scoring API exists.
-  No presentation-inference API exists.
-  No ADHD probability or likelihood field exists.
-  No medical/profile state persists.
-  Browser persistence uses an explicit allowlist.
-  Mandatory safety-copy records exist.
-  Safety invariants are covered by automated tests.
-  Evidence maps through canonical IDs.
-  Evidence surfaces retain group-level caution.
-  Evidence failures never fabricate citations.
-  Invalid canonical IDs never fuzzy-resolve to another scientific concept.
-  Mandatory localization gaps fail build validation.
-  Layout geometry coverage fails CI if incomplete.
-  Knowledge/schema compatibility fails CI when invalid.
-  Home does not load the graph visualization bundle.
-  Detailed evidence is not unnecessarily loaded into initial graph payload.
-  No graph-analysis dependency is introduced without architectural review.
-  No Vue Flow, Cytoscape, D3 or Pinia dependency is introduced by default.
-  No backend/database/authentication is introduced for MVP.
-  No behavioural analytics is collected by default.
-  Deployment artifacts keep application, knowledge, localization and layout versions compatible.
-  Direct deep links work after static deployment.
-  English and Persian routes are independently prerenderable.
-  Human review occurs before material architecture drift is accepted.

These extend the invariant examples explicitly requested by Stage 11.

---

# 30. Codex Handoff Readiness

## 30.1 Is the architecture executable?

**Yes.**

The following are now sufficiently defined:

```text
MVP boundary
production routes
knowledge ownership
schema architecture
domain contracts
domain API
graph data flow
layout pipeline
renderer responsibility
System Map components
Visual Grammar ownership
Behaviour architecture
Context architecture
Presentation isolation
accessibility architecture
responsive architecture
localization/RTL
state ownership
safety enforcement
evidence architecture
loading/performance
error handling
test ownership
CI
dependency policy
project ownership
implementation sequence
bounded Codex work packages
repository-graph trigger policy
implementation invariants

```

Codex should not need to infer core architecture.

---

## 30.2 Remaining blockers

There are **no Stage 11 architecture blockers** preventing bounded Codex execution.

Some implementation choices intentionally remain local to work packages, including:

- exact compatible Nuxt/Vue/TypeScript patch versions
- exact JSON Schema validator version
- exact Nuxt i18n package/version
- exact lint configuration
- exact deployment provider
- exact CSS organization
- exact production Visual Grammar tokens sourced from its frozen artifact

These are implementation-level decisions rather than unresolved architecture.

---

## 30.3 First Work Package

Execute:

**WP-01 — Project Foundation**

first.

Do not begin with the graph.

The graph architecture has already been validated; the repository foundation and verification pipeline must exist before production domain/content work starts.

---

## 30.4 Exact artifacts Codex needs for WP-01

Provide Codex:

### Required authoritative artifact

**ADHD Interactive Explorer — Engineering Implementation Specification v1.0**

with WP-01 explicitly marked as current scope.

### Supporting architecture context

Codex should have access to:

- Technical Architecture v1.0
- Visualization & Technology Decision v1.0
- Validation Spike Evaluation

These are useful for constraints but WP-01 should not implement their later-stage features.

### Repository context

Codex needs:

- current repository tree
- current `package.json` if repository exists
- current lockfile if present
- current runtime/version configuration
- current CI configuration if present
- existing Nuxt configuration if repository is not empty

### WP-01 execution constraints

Codex must be explicitly told:

```text
Do not add ADHD knowledge data yet.

Do not implement graph rendering.

Do not add ELK yet unless required only to establish the agreed dependency baseline; preferably defer it to WP-04.

Do not add Vue Flow.

Do not add Cytoscape.

Do not add D3.

Do not add Pinia.

Do not add backend/database/authentication.

Do not implement application experiences.

Establish only the production foundation required by later work packages.

```

### WP-01 verification outputs

Codex must return evidence for:

```text
dependency install
typecheck
lint
unit test smoke
Nuxt production build
/en route
/fa route
basic locale switching
CI baseline

```

No WP-01 completion claim should be accepted without successful verification.

---

## 30.5 Stage 12 handoff model

Stage 12 should not generate one enormous “build the entire app” prompt.

It should produce one execution prompt at a time:

```text
WP-01
↓
human review
↓
WP-02
↓
human review
↓
WP-03
...

```

Each prompt should contain:

- authoritative source references
- current repository state
- exact package objective
- allowed areas
- forbidden areas
- required implementation
- required tests
- verification commands
- completion definition
- output/reporting format

This keeps architecture decisions human-controlled while allowing Codex to execute repository-level implementation efficiently.

---

# Final Engineering Decision

Stage 11 resolves the production implementation architecture sufficiently to begin bounded repository implementation.

The implementation baseline is:

```text
Frozen Machine-Readable Knowledge
            ↓
Schema + Domain + Safety Validation
            ↓
Knowledge Repository
            ↓
Pure Domain Query Layer
            ↓
Feature Read Models
            ↓
────────────────────────────────────
│                                  │
Visual Experiences          Semantic Experiences
│                                  │
└──────── Canonical State ─────────┘
            ↓

Static-first Nuxt 4 application
English + Persian
LTR + RTL
Prerendered educational surfaces
Selective client interaction

```

For the Master System Map:

```text
Canonical Knowledge
       ↓
Domain Queries
       ↓
GraphReadModel
       │
       │          Canonical Graph
       │                ↓
       │        ELK 0.12.0 at build time
       │                ↓
       │        reviewed LayoutArtifact
       │                ↓
       └───────────────┬───────────────
                       ↓
              Custom Vue DOM/SVG
                   Renderer
                       ↕
               selectedNodeId
                       ↕
             Semantic Relationship
                   Browser

```

The scientific model remains outside the renderer.

The renderer remains outside the domain model.

User exploration remains outside clinical assessment.

Language presentation remains outside scientific identity.

Layout generation remains outside runtime.

Accessibility remains independent from spatial interpretation.

The next stage can therefore concentrate on **bounded Codex execution**, not further architecture discovery.

IMPLEMENTATION SPEC STATUS: READY FOR CODEX WORK PACKAGES