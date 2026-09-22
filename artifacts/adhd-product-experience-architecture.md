# ADHD Interactive Explorer — Product & Experience Architecture v1.0

## Document Purpose

This document defines the product and experience architecture for the **ADHD Interactive Explorer**.

The scientific knowledge model is treated as frozen.

This architecture does not:

- modify canonical concepts
- modify canonical IDs
- add or remove canonical nodes
- change canonical relationships
- reinterpret ADHD scientifically
- create diagnostic logic
- introduce scoring
- infer ADHD presentation
- recommend treatment
- choose final implementation libraries
- define low-level frontend implementation

Any future discovery that appears to require changing the knowledge model must be raised explicitly as a:

**KNOWLEDGE CHANGE REQUEST**

The frozen knowledge base contains 30 canonical nodes, 3 canonical edge semantics, 7 Behaviour categories, 2 Recurring Patterns, 4 Functional Domains, and four primary visual experiences.

---

# 1. Product Definition

## 1.1 Product Problem

ADHD is commonly encountered through fragmented explanations.

Users may encounter:

- formal diagnostic terminology
- simplified social-media explanations
- behavioural descriptions
- executive-function concepts
- context-dependent experiences
- clinical presentation labels

These concepts are often presented as though they belong to the same explanatory level.

This creates several predictable misunderstandings:

- behaviour may be mistaken for diagnosis
- explanatory mechanisms may be mistaken for formal symptoms
- context-dependent functioning may appear contradictory
- recurring patterns may be interpreted as defining ADHD
- clinical presentation terminology may be incorrectly inferred from everyday behaviour
- associations may be interpreted as deterministic causal chains

The product problem is therefore primarily an **information architecture and mental-model problem**.

The system must help users understand how different kinds of ADHD-related information relate without collapsing them into a diagnostic framework.

---

## 1.2 Product Goal

The product should enable a non-specialist to progressively understand the conceptual structure:

**Clinical Anchor**

separate from:

**Context → Regulation → Behaviour → Pattern → Functional Domain ↺ Feedback**

without implying that the explanatory graph constitutes the clinical definition of ADHD.

The product optimizes for:

**understanding**

rather than:

**classification, scoring, prediction, or self-diagnosis.**

---

## 1.3 Target Audience

Primary audiences are non-specialists seeking conceptual understanding.

Relevant usage contexts include:

- people trying to understand ADHD
- people trying to understand the experiences of someone they know
- students
- educators
- clinician-adjacent learners
- researchers or technically sophisticated readers approaching ADHD from outside clinical practice
- generally curious users

The product does not assume that the user:

- has ADHD
- suspects ADHD
- knows someone diagnosed with ADHD
- has clinical training

---

## 1.4 Primary User Value

The product gives users a navigable conceptual model rather than a flat collection of definitions.

It helps answer questions such as:

- What does ADHD formally mean?
- How are formal symptoms different from explanatory processes?
- Why can behaviour differ across situations?
- What may sit upstream of an observable behaviour?
- What consequences or repeated patterns can follow from behaviour?
- How can feedback loops reinforce difficulty?
- What are ADHD presentations?
- How strong is the evidence behind a particular relationship?

The core value proposition is therefore:

> Understand how ADHD-related concepts fit together without turning educational information into a personal diagnosis.

---

## 1.5 Main Educational Outcomes

A successful learner should understand that:

1. Formal clinical concepts and explanatory processes are related but distinct.
2. Observable behaviour can have multiple possible pathways.
3. Context can influence functioning.
4. Regulation systems interact with behaviour rather than defining a person's diagnosis.
5. Similar outward behaviour may arise through different pathways.
6. Repeated behaviours may contribute to recurring patterns.
7. Functional difficulties can both result from and influence other parts of the system.
8. Feedback relationships are not deterministic.
9. ADHD presentations belong to a formal clinical education layer.
10. Behaviour selected elsewhere in the application cannot be used to infer a presentation.
11. Scientific relationships vary in evidence strength and certainty.

---

## 1.6 Education vs Assessment

The product must maintain a strict boundary.

| DimensionEducational ExperienceAssessment Experience |                                    |                                         |
| ---------------------------------------------------- | ---------------------------------- | --------------------------------------- |
| Purpose                                              | Explain concepts and relationships | Determine something about an individual |
| Behaviour selection                                  | Explore a concept                  | Record a symptom                        |
| Context selection                                    | Understand variation               | Measure personal functioning            |
| Multiple pathways                                    | Required                           | May be collapsed into scoring           |
| Output                                               | Knowledge                          | Individual interpretation               |
| Persistence                                          | Temporary exploration state        | User profile/history                    |
| Presentation education                               | Informational                      | Classifier                              |
| Evidence                                             | Group-level scientific information | Personalized clinical evidence          |
| Product status                                       | In scope                           | Out of scope                            |

The ADHD Interactive Explorer implements only the educational side.

The source explicitly excludes diagnostic tools, screening questionnaires, likelihood calculators, severity assessments, presentation classifiers, treatment recommenders, and personalized medical assessment.

---

## 1.7 Product Principles

### Principle 1 — Explanation before complexity

The application should expose complexity gradually rather than immediately displaying the full knowledge graph.

### Principle 2 — Relationships over labels

The product should help users understand connections rather than encourage them to collect labels.

### Principle 3 — Multiple possibilities over single explanations

Where the knowledge model supports multiple pathways, the UX should expose that multiplicity.

### Principle 4 — Clinical definition remains distinct

The Clinical Anchor must not visually dissolve into the explanatory graph.

### Principle 5 — Context matters

The product should make contextual variability understandable without providing predictions.

### Principle 6 — Scientific humility

Associations, mechanisms, evidence strength, uncertainty, and alternative explanations must remain visible where relevant.

### Principle 7 — No profile accumulation

Exploration should not slowly become an implicit assessment.

### Principle 8 — Progressive disclosure

Simple understanding should come first, while scientific depth remains accessible.

### Principle 9 — Accessibility independent of visualization

The system must remain usable without interpreting a spatial graph.

### Principle 10 — Bilingual conceptual identity

English and Persian presentation may differ visually, but canonical scientific identity remains language-independent.

---

## 1.8 MVP Success Criteria

The MVP succeeds when users can:

- understand the overall conceptual model without opening the entire graph
- distinguish formal symptoms from explanatory processes
- explore Behaviour without receiving individual interpretation
- understand that multiple pathways can lead to similar behaviour
- understand why functioning may change across Contexts
- learn formal ADHD presentation terminology independently
- inspect deeper evidence when desired
- use the product effectively on desktop and mobile
- use the product in English and Persian
- navigate without relying entirely on graph visualization

Success should primarily be evaluated through comprehension and usability, not engagement maximization or behaviour likely to reinforce self-diagnosis.

---

# 2. Users / Usage Contexts

The product does not require elaborate personas.

Four broad usage contexts are sufficient.

## 2.1 Conceptual Learner

### Knowledge level

Low to moderate.

### Core question

“What actually is ADHD, and how do all these concepts fit together?”

### Needs

- orientation
- clear terminology
- conceptual hierarchy
- separation of formal and explanatory concepts
- simple pathways before scientific detail

### Likely misunderstanding

Assuming every concept associated with ADHD belongs to the formal diagnostic definition.

### UX implication

Entry should begin with the conceptual distinction between formal symptom domains and the wider explanatory system.

---

## 2.2 Behaviour-Led Learner

### Knowledge level

Usually low.

### Core question

“I recognize this behaviour. What could be connected to it?”

### Needs

- plain-language entry
- canonical Behaviour mapping
- multiple possible upstream pathways
- Context explanation
- alternative explanations
- strong non-diagnostic framing

### Likely misunderstanding

“Because this behaviour is associated with ADHD, it means I or someone else has ADHD.”

### UX implication

Behaviour exploration must explicitly present possibilities rather than conclusions.

---

## 2.3 Student / Educator / Clinician-Adjacent Learner

### Knowledge level

Moderate.

### Core question

“How are these concepts related, and what evidence supports the relationships?”

### Needs

- canonical terminology
- relationship structure
- evidence access
- formal presentation education
- clear source attribution

### Likely misunderstanding

Treating an explanatory construct as equivalent to a formal diagnostic criterion.

### UX implication

Fast movement between conceptual relationships and scientific evidence should be supported.

---

## 2.4 Context-Led Learner

### Knowledge level

Any.

### Core question

“Why might functioning vary so much between different situations?”

### Needs

- Context-first exploration
- qualitative comparison
- relationship to Regulation
- Behaviour consequences
- Feedback explanation

### Likely misunderstanding

Assuming variation in functioning invalidates the underlying difficulty, or conversely assuming contextual improvement proves a specific clinical explanation.

### UX implication

The product should teach interaction and variability without performing simulation or prediction.

---

# 3. Information Architecture

The application should be understood as one educational system with four primary exploratory experiences plus supporting educational material.

## 3.1 Top-Level Structure

### Home / Introduction

Purpose:

- establish product identity
- establish safety boundary
- teach the core mental model
- provide exploration choices

Recommended architectural role:

**Top-level destination**

---

### Master System Map

Purpose:

- explore the overall system
- navigate relationships
- move between conceptual layers

Recommended architectural role:

**Top-level destination**

---

### Behaviour Explorer

Purpose:

- enter through recognizable behaviours
- explore multiple possible explanatory pathways

Recommended architectural role:

**Top-level destination**

---

### Context & Feedback Explorer

Purpose:

- understand situational variability
- explore Context → Regulation → Behaviour relationships
- inspect feedback loops

Recommended architectural role:

**Top-level destination**

---

### ADHD Presentation Education

Purpose:

- explain formal presentation terminology
- explain historical ADD terminology
- preserve separation from behavioural exploration

Recommended architectural role:

**Top-level destination**

---

### Evidence / Sources

Purpose:

- inspect scientific support
- understand uncertainty
- access references

Recommended architectural role:

**Dedicated supporting destination plus contextual entry points**

Evidence should also be reachable from relevant concepts and relationships.

---

### About / Methodology / Disclaimer

Purpose:

- explain how the model was constructed
- clarify educational scope
- explain terminology
- provide global disclaimers

Recommended architectural role:

**Supporting top-level destination**

---

## 3.2 Content Container Decisions

| ContentPrimary container  |                                              |
| ------------------------- | -------------------------------------------- |
| Experience switching      | Main navigation                              |
| Concept summary           | Primary experience surface                   |
| Relationship explanation  | Side panel / drawer                          |
| Quick definition          | Tooltip or popover where appropriate         |
| Scientific explanation    | Side panel / drawer                          |
| Evidence preview          | Side panel / drawer                          |
| Complete evidence details | Evidence view or modal/page                  |
| Safety reminder           | Inline contextual notice                     |
| Global disclaimer         | Introduction + persistent methodology access |
| Mobile concept detail     | Drawer or dedicated detail surface           |

Modal interfaces should not contain core navigation.

Core information should remain linkable and recoverable.

---

# 4. Entry Experience

The first 60–90 seconds should build the user's mental model before exposing the complex graph.

The requirement explicitly states that the experience should not begin with a dense 30-node graph.

## 4.1 Entry Sequence

### Step 1 — What this product is

Short explanation:

An interactive educational model for understanding ADHD terminology, contexts, regulation processes, behaviours, patterns, functional impact, and scientific relationships.

---

### Step 2 — What it is not

Compact visible clarification:

- not a diagnostic test
- not screening
- not personalized medical assessment

This should be visible without requiring the user to open legal or methodology content.

---

### Step 3 — Establish the Clinical Anchor

Teach:

ADHD is formally described clinically through specific symptom domains and presentations.

Do not display the full explanatory graph yet.

---

### Step 4 — Introduce the wider explanatory system

Reveal the conceptual sequence progressively:

**Context**

↓

**Regulation**

↓

**Observable Behaviour**

↓

**Recurring Pattern**

↓

**Functional Domain**

↺

**Feedback**

The wording should emphasize that this is an explanatory educational model, not a diagnostic chain.

---

### Step 5 — Teach many-to-many relationships

Before showing the graph, establish:

- one Behaviour can connect to several possible pathways
- one Regulation concept may influence several Behaviours
- the same Context may interact with multiple parts of the system
- relationships are not necessarily deterministic

---

### Step 6 — Choose an exploration path

Provide four clear entry choices:

**See the whole system**

→ Master System Map

**Start with a behaviour**

→ Behaviour Explorer

**Explore why context changes functioning**

→ Context & Feedback Explorer

**Learn formal ADHD presentations**

→ ADHD Presentation Education

---

## 4.2 Returning Users

Returning users should not be forced through onboarding.

They should reach a compact orientation surface containing:

- model summary
- four experience entry points
- optional “How this model works” explanation

---

# 5. Master System Map

## 5.1 User Goal

Understand how the major conceptual layers connect and explore relationships without treating the graph as a diagnostic model.

---

## 5.2 Starting State

The initial experience should not expose every node and every edge equally.

The starting state should emphasize the layer structure:

- Clinical Anchor
- Context
- Regulation
- Behaviour
- Pattern
- Functional Domain
- Feedback

The Clinical Anchor must remain visually and conceptually separate from the explanatory sequence.

---

## 5.3 Initial Visibility

Initially show:

- layer names
- conceptual relationship between layers
- limited representative content or collapsed node groups
- explanation of the model's purpose

Initially de-emphasize:

- all evidence metadata
- complete edge density
- secondary descriptions
- scientific caveats attached to individual relationships
- advanced pathways

The user should opt into complexity.

---

## 5.4 Node Selection

Selecting a node should:

1. establish the node as the focus
2. visually emphasize the selected node
3. highlight directly related neighbours
4. reduce unrelated visual emphasis
5. reveal a contextual detail panel
6. expose available upstream and downstream navigation
7. expose evidence access where available

Selection must not produce language implying that the node describes the user.

---

## 5.5 Neighbour Highlighting

Neighbour highlighting should prioritize comprehension.

Suggested logical categories:

- directly upstream
- directly downstream
- Feedback-related
- same conceptual layer

The purpose is not network analysis.

Metrics such as:

- centrality
- node importance scores
- graph ranking
- path probabilities

do not belong in the MVP.

---

## 5.6 Upstream / Downstream Exploration

Users should be able to ask conceptually:

- “What may influence this?”
- “What may follow from this?”
- “What Contexts are related?”
- “What Regulation pathways are related?”
- “What Behaviour connections exist?”
- “What Patterns or Functional Domains connect?”

Navigation should follow knowledge relationships, not a forced linear chain.

---

## 5.7 Evidence Reveal

Evidence should initially remain secondary.

From a selected node or edge:

**relationship summary**

→ **scientific explanation**

→ **evidence**

This follows the product's progressive disclosure model.

---

## 5.8 Side Panel Behaviour

The side panel should present, in order:

1. display label
2. canonical scientific name where relevant
3. concise explanation
4. conceptual category
5. related relationships
6. possible upstream/downstream exploration
7. caution where necessary
8. deeper scientific explanation
9. evidence access

The panel should preserve the current map state when opened or closed.

---

## 5.9 Layer Filtering

Filtering is an educational simplification mechanism.

Users may temporarily focus on combinations such as:

- Context + Regulation
- Regulation + Behaviour
- Behaviour + Pattern
- Pattern + Functional Domain

Filtering must not imply that hidden layers are irrelevant.

A visible reset action should always exist.

---

## 5.10 Reset Behaviour

Reset should restore:

- default layer visibility
- no selected node
- no relationship focus
- closed evidence detail
- default disclosure level

It should not:

- change language
- navigate away from the experience
- modify persistent user settings

---

## 5.11 Desktop Behaviour

Desktop should support:

- spatial overview
- node selection
- contextual side panel
- neighbour highlighting
- controlled filtering
- evidence drill-down

The graph can act as the main exploratory surface.

---

## 5.12 Mobile Behaviour

Mobile should not attempt to reproduce a dense desktop graph at smaller scale.

Primary mobile interaction should use a **focused-path model**:

selected concept

→ related concepts

→ choose relationship

→ move forward/backward

A simplified mini-map may provide orientation, but core navigation must remain usable without spatial graph interpretation.

---

## 5.13 Empty / Default State

The map should explain:

- what the layers mean
- that relationships are many-to-many
- that the map explains concepts rather than diagnosing people
- how to begin selecting nodes

---

## 5.14 Deep Linking

The product should conceptually support links to:

- the System Map
- a specific canonical node
- a selected relationship
- a meaningful filtered conceptual view where practical

Deep links must reconstruct educational state, not user history.

---

# 6. Behaviour Explorer

The Behaviour Explorer is one of the product's most important user-facing experiences. The source explicitly defines its conceptual sequence and prohibits accumulating selections into a profile.

## 6.1 User Goal

Start from recognizable everyday language and learn how that behaviour may relate to several different parts of the ADHD explanatory model.

---

## 6.2 Core Experience

The experience follows:

**Plain-language statement**

↓

**Canonical Behaviour**

↓

**Possible Context**

↓

**Possible Regulation pathways**

↓

**Possible repeated Pattern**

↓

**Possible Functional Domain**

↓

**Alternative explanations**

↓

**Scientific caution**

This is exploration, not interpretation.

---

## 6.3 Entry Library

The initial library should organize plain-language behaviour statements without presenting them as symptoms selected by the user.

Users may:

- browse
- search
- filter by Behaviour category
- open a behaviour

The interface language should favor:

**“Explore this behaviour”**

rather than:

**“Select the symptoms you experience.”**

---

## 6.4 Behaviour Selection

Selecting a plain-language statement should reveal:

- the canonical Behaviour
- concise explanation
- related possible Contexts
- multiple possible Regulation pathways where supported
- downstream Pattern and Functional Domain possibilities
- alternative explanations
- scientific caution

A behaviour should not become part of a persistent personal checklist.

---

## 6.5 Pathway Switching

Where several pathways exist, the user should explicitly be able to switch among them.

Example conceptual structure:

Behaviour

→ possible pathway A

→ possible pathway B

→ possible pathway C

No default pathway should appear as “the explanation” unless the underlying knowledge model explicitly establishes that relationship uniquely.

---

## 6.6 Context Exploration

From a Behaviour, users should be able to inspect related Contexts.

The product should explain that:

- Context may influence whether behaviour appears
- Context may change intensity or functional consequences
- Context is not itself diagnostic evidence

---

## 6.7 Alternative Explanations

Alternative explanations should be an integral part of the Behaviour experience, not buried in evidence detail.

They should appear after the primary pathway explanation but before users could reasonably leave with a diagnostic interpretation.

Purpose:

- reduce over-attribution
- reinforce uncertainty
- prevent “behaviour → ADHD” reasoning

---

## 6.8 Repeated Pattern Reveal

Patterns should not appear immediately as guaranteed outcomes.

Use conditional framing such as:

- “When this occurs repeatedly…”
- “This may contribute to…”
- “One possible recurring pattern is…”

Pattern content must carry its dedicated caution.

---

## 6.9 Functional Domain Reveal

Functional Domains should describe potential areas of impact.

They must not be presented as:

- severity measurement
- evidence that someone has ADHD
- individualized impairment assessment

---

## 6.10 Evidence Detail

Evidence access should be available for:

- Behaviour explanation
- Behaviour ↔ Regulation relationships
- Context relationships
- Pattern relationships
- Functional Domain relationships

The user should not need evidence detail to complete basic exploration.

---

## 6.11 Return to Exploration

After finishing one Behaviour:

- return to Behaviour library
- explore another possible pathway
- open related node in System Map
- open related Context
- inspect evidence

The system must not summarize several explored Behaviours into a profile.

---

## 6.12 Desktop Behaviour

Desktop may show:

- Behaviour content
- current pathway
- alternatives
- related Contexts
- relationship map

simultaneously where cognitive load remains manageable.

---

## 6.13 Mobile Behaviour

Mobile should use sequential disclosure:

Behaviour

→ pathway options

→ selected pathway

→ Context

→ Pattern / Functional Domain

→ alternatives

→ evidence

Navigation should clearly preserve the user's place in the pathway.

---

## 6.14 Default State

The default experience should explicitly explain:

> Choose a behaviour to understand possible relationships. Exploring a behaviour does not indicate that you have ADHD.

---

## 6.15 Deep Linking

Deep links may identify:

- canonical Behaviour
- selected pathway
- relevant Context
- evidence relationship

They must not encode a collection of personal behaviour selections.

---

# 7. Context & Feedback Explorer

## 7.1 User Goal

Understand the question:

**Why might the same person function differently in different situations?**

This is the core educational question defined for the experience.

---

## 7.2 Entry State

Introduce Context as a modifier of functioning rather than as a diagnostic signal.

Available Context factors may include the frozen model's supported factors such as:

- sleep / energy
- stress
- task salience
- urgency
- reward immediacy
- task demand
- external structure
- distraction

Only canonical supported Context content should appear.

---

## 7.3 Qualitative States

The product may use qualitative educational states such as:

- supportive
- neutral
- demanding

These represent explanatory framing, not measured personal conditions.

The UI must avoid:

- percentages
- predicted behaviour
- ADHD likelihood
- performance scores
- risk scores

The source explicitly prohibits a simulation engine and numeric prediction.

---

## 7.4 Core Interaction

Conceptual sequence:

Choose a Context factor

→ understand how the Context changes

→ inspect related Regulation systems

→ inspect possible Behaviour effects

→ inspect downstream consequences

→ inspect possible Feedback relationships

The system should show several related pathways where supported.

---

## 7.5 Context Comparison

A user may compare:

**more supportive**

versus:

**more demanding**

conditions conceptually.

Comparison should explain direction or nature of influence qualitatively.

It must not simulate:

“If your sleep decreases by X, your performance decreases by Y.”

---

## 7.6 Feedback Loops

Feedback should initially remain secondary.

A user may explicitly open:

**“What can reinforce this pattern over time?”**

The Feedback view should show:

1. starting concept
2. downstream effect
3. returning influence
4. explanation of the loop
5. scientific caution

Feedback loops should not imply inevitability.

---

## 7.7 Cross-Linking

From Context Explorer users may:

- open related Regulation concept in System Map
- open related Behaviour in Behaviour Explorer
- inspect Feedback relationship
- inspect evidence

---

## 7.8 Desktop Behaviour

Desktop may support:

- Context selector
- qualitative state comparison
- related Regulation and Behaviour panel
- Feedback overlay

---

## 7.9 Mobile Behaviour

Mobile should prioritize one Context factor at a time.

Suggested conceptual sequence:

Context

→ qualitative state

→ Regulation

→ Behaviour

→ Feedback

The full graph is unnecessary.

---

## 7.10 Default State

Default explanation:

> Context can affect how regulation and behaviour appear. This explorer demonstrates possible relationships, not predictions about an individual.

---

# 8. ADHD Presentation Education

## 8.1 Purpose

Provide a clearly separate formal clinical educational experience covering:

- Predominantly Inattentive Presentation
- Predominantly Hyperactive-Impulsive Presentation
- Combined Presentation
- historical ADD terminology

These requirements are explicitly defined in the source.

---

## 8.2 Separation Rule

This experience must not consume or react to state from:

- Behaviour Explorer
- Context Explorer
- System Map selections

Examples of prohibited behaviour:

- “Based on the behaviours you explored, learn about Combined Presentation.”
- “Your selections match Inattentive Presentation.”
- automatically emphasizing one presentation
- presentation recommendation

---

## 8.3 Information Hierarchy

### Level 1

What ADHD presentations are.

### Level 2

The three formal presentation names and high-level distinction.

### Level 3

Scientific/clinical detail from the frozen knowledge source.

### Level 4

Evidence and sources.

---

## 8.4 Historical ADD Note

The historical ADD explanation should clarify terminology without suggesting that users should determine which historical or current label applies to them.

---

## 8.5 Interaction Model

This experience should behave primarily like structured educational content.

Useful interactions:

- switch among presentations
- compare terminology
- expand definitions
- inspect evidence
- learn why the broader explanatory graph is separate

Not allowed:

- quiz
- symptom checklist
- scoring
- presentation inference

---

## 8.6 Safety Messaging

Presentation Education should explicitly state that:

- the content explains diagnostic terminology
- the application does not determine presentation
- Behaviour exploration elsewhere does not determine presentation

---

# 9. Cross-Experience Navigation

The four experiences should form a connected educational system without creating uncontrolled navigation loops.

## 9.1 Navigation Principle

Cross-links should answer the user's **next conceptual question**.

They should not simply maximize navigation.

---

## 9.2 Primary Cross-Links

### Behaviour Explorer → System Map

Action:

**“See this Behaviour in the full system.”**

Preserve:

- canonical Behaviour focus

Do not preserve:

- personal exploration history

---

### System Map → Behaviour Explorer

Action:

**“Explore this Behaviour in plain language.”**

Relevant Behaviour becomes the entry point.

---

### Context Explorer → System Map

Action:

**“Open related Regulation concept.”**

Preserve the targeted concept only.

---

### System Map → Context Explorer

For supported Context concepts:

**“Explore how this Context may affect functioning.”**

---

### Context Explorer → Behaviour Explorer

Action:

**“Explore related Behaviour.”**

The user enters Behaviour Explorer at that canonical Behaviour.

---

### Behaviour Explorer → Context Explorer

Action:

**“Explore why this Behaviour may vary across situations.”**

---

### Presentation Education → System Map

One conceptual bridge is appropriate:

**“Why is the explanatory model separate from formal presentations?”**

This should open an explanatory transition, not a presentation-specific node path implying diagnostic mapping.

---

## 9.3 Loop Prevention

Avoid showing every possible cross-link simultaneously.

Each surface should prioritize:

1. continue current exploration
2. one or two contextually useful next destinations
3. global navigation remains available separately

---

## 9.4 State Transfer Rule

Cross-experience navigation may transfer:

- canonical concept ID
- relationship ID
- requested focus

It should not transfer:

- accumulated Behaviour history
- inferred profile
- assessment-like composite state

---

# 10. Progressive Disclosure

The product uses four information levels defined by the knowledge contract:

1. Simple overview
2. Relationships
3. Scientific explanation
4. Evidence / sources

These must become explicit product behaviours.

## 10.1 Level 1 — Simple Overview

Primary surface.

Contains:

- plain-language definition
- concept category
- one key idea
- basic relationship orientation
- primary interaction

Goal:

Allow understanding without specialist knowledge.

---

## 10.2 Level 2 — Relationships

Shown after concept interaction.

Contains:

- related concepts
- direction or semantic relationship
- multiple pathways
- Context relationships
- Feedback links

Appropriate container:

- primary experience
- selected-node state
- compact side panel

---

## 10.3 Level 3 — Scientific Explanation

User-initiated expansion.

Contains:

- canonical terminology
- mechanism/explanatory detail
- nuance
- uncertainty
- evidence interpretation context

Appropriate container:

- side panel
- drawer
- expanded concept view

---

## 10.4 Level 4 — Evidence / Sources

User-initiated.

Contains:

- evidence statement
- source references
- relationship support
- evidence limitations
- uncertainty or group-level caution

Appropriate container:

- evidence drawer for preview
- evidence modal/page for complete inspection

---

## 10.5 Tooltip / Popover

Suitable only for:

- short definitions
- terminology clarification
- visual legend
- category meaning

Not suitable for:

- safety-critical messaging
- complex scientific explanation
- primary evidence
- important alternative explanations

---

# 11. Application State Requirements

Application state must be explicitly separated from knowledge data.

## 11.1 Navigation State

May include:

- active experience
- active sub-view
- navigation origin
- deep-link target

---

## 11.2 Exploration State

May include:

- selected node
- selected Behaviour
- selected pathway
- active Context
- qualitative Context state
- active Feedback loop
- active layer filters
- highlighted neighbours
- current disclosure level
- evidence panel state

---

## 11.3 Presentation State

May include:

- open drawer
- open side panel
- expanded section
- current tab
- mobile navigation depth
- onboarding completion for the current device/session where appropriate

---

## 11.4 Preference State

May include:

- language
- reduced-motion preference when product-controlled
- optional display preferences

---

## 11.5 Knowledge Data

Must remain separate from UI state.

Knowledge data includes, conceptually:

- canonical IDs
- canonical nodes
- canonical edge semantics
- Behaviour mappings
- Context relationships
- Patterns
- Functional Domains
- evidence
- localization
- safety copy

---

## 11.6 State That Must Not Exist

The product must not create or persist:

- ADHD profile
- ADHD score
- symptom score
- symptom history
- Behaviour profile
- inferred presentation
- inferred clinical state
- personal clinical history
- personalized psychological interpretation

This prohibition is explicit in the source.

---

## 11.7 Persistence Principle

Persist only genuine application preferences or non-clinical UX continuity.

Do not persist exploratory state in a way that gradually becomes a personal health record.

A user revisiting the application should not encounter messaging such as:

> “Last time you selected these six behaviours.”

---

# 12. Accessibility Requirements

Accessibility must be product architecture, not a later graph enhancement.

The source explicitly requires that accessibility continue working even when the graph cannot be visually interpreted.

## 12.1 Keyboard Navigation

All meaningful interactions must be reachable without pointer input.

This includes:

- experience navigation
- node browsing
- layer filtering
- pathway switching
- evidence opening
- drawer interaction
- language switching
- reset controls

---

## 12.2 Screen Reader Alternative

The graph must have a semantic non-spatial alternative.

For example, conceptually:

Selected concept

→ upstream relationships

→ downstream relationships

→ same-layer relationships

→ Feedback relationships

This representation must communicate the same educational meaning as the spatial visualization.

---

## 12.3 Colour Independence

No category or relationship may rely solely on colour.

Different concepts should also use:

- text labels
- semantic grouping
- icons/shapes where appropriate
- legends

---

## 12.4 Focus Visibility

Keyboard focus must remain visually obvious across:

- nodes
- filters
- drawers
- cards
- navigation
- evidence links

---

## 12.5 Reduced Motion

Core understanding must not depend on animation.

Animations should enhance orientation but not encode scientific meaning unavailable elsewhere.

---

## 12.6 Mobile Accessibility

Touch targets, reading order, drawer behaviour, focus management, and conceptual navigation must remain usable on small screens.

The desktop graph cannot be treated as the canonical experience with mobile considered a degraded copy.

---

## 12.7 Graph Fallback

A structured relationship browser must exist as a first-class fallback.

Minimum conceptual hierarchy:

- concept
- category
- definition
- related upstream concepts
- related downstream concepts
- related Feedback relationships
- scientific explanation
- evidence

---

# 13. Bilingual / RTL Requirements

The application supports:

- English
- Persian

Canonical IDs and scientific identity remain language-independent.

## 13.1 Canonical Identity

Each knowledge entity should conceptually have:

- language-independent canonical ID
- canonical English scientific name where required by the knowledge contract
- English display content
- Persian display content

Localization must not duplicate scientific identity into separate entities.

---

## 13.2 RTL Layout

Persian mode should use intentional RTL layout rather than simply translating strings.

RTL considerations apply to:

- navigation
- panels
- drawers
- breadcrumb direction
- cards
- text alignment
- controls
- disclosure indicators
- long-form scientific content

---

## 13.3 Graph Directionality

Scientific relationship semantics must not reverse when interface direction changes.

RTL is a presentation concern.

Edge meaning remains determined by canonical relationship semantics.

For example, an upstream/downstream scientific relationship must remain logically identical in both languages even if the graph layout mirrors.

---

## 13.4 Mixed Persian / English Terminology

The system must support mixed text containing:

- Persian explanation
- canonical English term
- acronyms
- scientific names
- citations

Text components must be designed to handle bidirectional content explicitly.

---

## 13.5 Labels

Display labels may differ by language.

Canonical identity may not.

Example conceptual pattern:

Canonical concept ID

→ English label

→ Persian label

rather than independent Persian and English concepts.

---

## 13.6 Evidence Citations

Citations should remain structurally readable in both LTR and RTL contexts.

Source names, DOI-like identifiers, English article titles, years, and Persian surrounding text must not scramble reading order.

---

## 13.7 Long Text

Drawers and evidence surfaces must support long Persian content without:

- excessive narrow columns
- broken inline English phrases
- unreadable citation alignment
- incorrect paragraph direction

---

## 13.8 Language Switching

Language switching should preserve:

- current experience
- selected canonical concept
- selected relationship
- filters where meaningful
- disclosure level

It should change:

- labels
- explanatory content
- interface direction
- localized safety copy

It must not map between different scientific entities.

---

# 14. Safety UX

Safety should be layered.

The product should avoid both burying safeguards and overwhelming every screen with repeated warnings.

## 14.1 Layer 1 — Global Educational Disclaimer

Placement:

- onboarding / Home
- About / Methodology
- globally accessible from navigation or footer

Purpose:

Establish that the application is educational and not diagnostic.

---

## 14.2 Layer 2 — Experience-Level Safety

### Master System Map

Clarify that:

The graph represents educational relationships between concepts, not a diagnostic model of an individual.

### Behaviour Explorer

Clarify that:

Recognizing a behaviour does not mean someone has ADHD.

### Context Explorer

Clarify that:

Context relationships are qualitative educational relationships, not personal predictions.

### Presentation Education

Clarify that:

The application explains presentations but does not determine which presentation applies to a user.

---

## 14.3 Layer 3 — Contextual Safety

Displayed when relevant.

### Alternative explanation reminder

Near Behaviour interpretation.

### Pattern caution

When repeated patterns are introduced.

### Functional impact caution

When Functional Domains are discussed.

### Evidence caution

When group-level research is opened.

---

## 14.4 Layer 4 — Detailed Methodological Safety

In methodology/evidence surfaces explain:

- association versus causation
- evidence limitations
- group-level findings
- model boundaries
- uncertainty
- why explanatory constructs are separated from diagnosis

---

## 14.5 Safety Copy Hierarchy

Safety content should become more specific as the user approaches greater interpretive risk.

Thus:

Home

→ broad educational scope

Behaviour

→ non-diagnostic caution

Pattern

→ repeated behaviour is not diagnostic

Evidence

→ group-level evidence cannot determine individual clinical status

---

# 15. MVP User Flows

## Flow A — New User → Understand Model → Explore System Map

### Entry

Home.

### Steps

1. User learns what the product is.
2. User sees explicit non-diagnostic framing.
3. User learns Clinical Anchor versus explanatory system.
4. User sees Context → Regulation → Behaviour → Pattern → Functional Domain ↺ Feedback.
5. User chooses “See the whole system.”
6. System Map opens in simplified state.
7. User selects a concept.
8. Neighbours appear.
9. User explores upstream/downstream relationship.
10. User optionally opens scientific explanation or evidence.

### Decision points

- continue onboarding or start exploring
- select layer
- select concept
- inspect relationship
- inspect evidence

### Exit state

User may return Home, open another experience, or leave with no persistent personal profile.

### Knowledge learned

The explanatory model contains different conceptual layers and is distinct from formal ADHD diagnosis.

---

## Flow B — New User → Recognize Behaviour → Explore Multiple Pathways

### Entry

Home or Behaviour Explorer.

### Steps

1. User reads Behaviour Explorer safety framing.
2. User browses plain-language Behaviour statements.
3. User chooses one.
4. Canonical Behaviour is introduced.
5. Several possible pathways appear where supported.
6. User selects one pathway.
7. Context and Regulation relationships are explained.
8. User switches to another pathway.
9. Possible Pattern and Functional Domain connections appear.
10. Alternative explanations are shown.
11. User optionally opens evidence.

### Decision points

- which Behaviour
- which pathway
- whether to explore Context
- whether to inspect Pattern
- whether to inspect evidence

### Exit state

No Behaviour checklist or profile remains.

### Knowledge learned

One observable Behaviour can have multiple explanations and does not establish ADHD.

---

## Flow C — User → Explore Context → Understand Why Performance Changes

### Entry

Context & Feedback Explorer.

### Steps

1. User reads Context explanation.
2. User selects a Context factor.
3. User compares qualitative supportive / neutral / demanding states.
4. Related Regulation concepts appear.
5. Related Behaviour possibilities appear.
6. User opens a Feedback relationship.
7. Feedback loop is explained.
8. User may open related System Map node.

### Decision points

- Context factor
- qualitative state
- Regulation relationship
- Feedback exploration

### Exit state

Context state remains temporary exploration state.

### Knowledge learned

Functioning can vary with Context without the application making a numerical or clinical prediction.

---

## Flow D — User → Understand ADHD Presentations

### Entry

Presentation Education.

### Steps

1. User learns what “presentation” means in ADHD terminology.
2. User views the three presentation categories.
3. User moves between them.
4. User reads the historical ADD note.
5. User learns why presentations are separate from the explanatory graph.
6. User optionally opens evidence.

### Decision points

- presentation to inspect
- historical terminology
- evidence

### Exit state

No presentation is selected “for the user.”

### Knowledge learned

Presentations are formal clinical terminology and cannot be inferred from Behaviour exploration in this product.

---

## Flow E — Advanced User → Inspect Evidence Behind a Relationship

### Entry

Any supported concept or relationship.

### Steps

1. User selects relationship.
2. Level 2 relationship summary appears.
3. User opens scientific explanation.
4. User opens evidence.
5. Evidence source and uncertainty information appear.
6. User returns to previous experience without losing conceptual location.

### Decision points

- summary sufficient?
- scientific explanation?
- evidence detail?
- inspect another source?

### Exit state

Returns to original relationship context.

### Knowledge learned

The scientific basis and limits of the specific relationship.

---

# 16. Content Consumption Requirements

Engineering needs machine-readable content but should consume the existing frozen knowledge contract rather than recreate it.

## 16.1 Canonical Content

Engineering requires:

- canonical node IDs
- node type/category
- canonical names
- canonical edges
- edge semantics
- layer membership
- Behaviour categories
- Recurring Pattern identities
- Functional Domain identities
- Clinical Anchor content
- presentation identities

Canonical identity must be stable and language-independent.

---

## 16.2 Educational Content

Engineering requires:

- plain-language concept summaries
- Level 1 explanations
- Level 2 relationship descriptions
- Level 3 scientific explanations
- Behaviour entry statements
- Context explanations
- presentation explanations
- historical ADD note
- alternative explanation content where defined

---

## 16.3 Evidence Content

Engineering requires:

- evidence records
- relationship-to-evidence mapping
- citations
- source metadata
- evidence strength/uncertainty information where present in the knowledge contract
- group-level evidence cautions

---

## 16.4 Localization Content

Engineering requires localization for:

- navigation
- UI labels
- canonical concept display labels
- explanatory content
- Behaviour statements
- Context content
- presentation education
- evidence explanations
- methodology
- safety copy

Canonical IDs remain outside localization.

---

## 16.5 Safety Content

Engineering requires structured safety copy for:

- global disclaimer
- graph disclaimer
- Behaviour caution
- alternative explanations
- Pattern caution
- Functional Domain caution
- presentation caution
- group-level evidence caution

Safety text should be identifiable by semantic purpose rather than duplicated manually across screens.

---

## 16.6 Content Consumption Principle

Engineering should consume the knowledge model as structured domain content.

The UI must not become the source of scientific truth.

Scientific content should not be embedded independently into individual visual components in ways that can diverge from the frozen source.

---

# 17. MVP Boundary

## 17.1 MVP Includes

The four frozen experiences:

1. Master System Map
2. Behaviour Explorer
3. Context & Feedback Explorer
4. ADHD Presentation Education

Supporting requirements include:

- onboarding
- Evidence / Sources access
- About / Methodology / Disclaimer
- English
- Persian
- responsive/mobile experience
- accessibility fallback
- layered safety UX
- progressive disclosure
- conceptual deep linking

---

## 17.2 Phase 2 Candidates

Potential future additions already identified by the product brief include:

- advanced concept exploration
- curated pathway stories
- richer timeline views
- evidence map
- deeper Context comparison

These should not expand MVP implementation scope.

---

## 17.3 Explicitly Outside MVP

Remain outside the product:

- free-text psychological interpretation
- user profiling
- screening
- treatment
- AI diagnosis
- personal clinical memory
- personalized clinical assessment
- ADHD scoring
- symptom tracking
- presentation prediction
- individual risk prediction
- numeric Context simulation

The first six are explicitly excluded by the supplied product contract.

---

# 18. Product Acceptance Criteria

The following criteria are intended to be testable at product level.

## 18.1 Entry Experience

**AC-01**

Given a new user entering Home, the product communicates both:

- what the Explorer does
- that it is not diagnostic

before the user reaches personalized-looking exploratory interactions.

**AC-02**

A new user can access all four primary experiences without first interacting with the complete 30-node graph.

**AC-03**

The onboarding explains the distinction between the Clinical Anchor and explanatory model.

---

## 18.2 Master System Map

**AC-04**

The default System Map does not present all nodes, all relationships, scientific explanations, and evidence simultaneously.

**AC-05**

Selecting a node highlights directly relevant neighbouring relationships without implying diagnostic significance.

**AC-06**

The Clinical Anchor remains visually/conceptually distinguishable from Context → Regulation → Behaviour → Pattern → Functional Domain.

**AC-07**

A user can reset the System Map to its default state.

**AC-08**

A mobile user can explore node relationships without operating the full spatial graph.

---

## 18.3 Behaviour Explorer

**AC-09**

Selecting a Behaviour never produces wording equivalent to:

“You have ADHD.”

**AC-10**

Where multiple pathways exist in the knowledge model, the Behaviour Explorer exposes multiple possible pathways rather than presenting one pathway as the user's explanation.

**AC-11**

Alternative explanations are reachable from the Behaviour experience without opening external methodology content.

**AC-12**

Exploring multiple Behaviours does not create a cumulative profile, score, summary, or presentation inference.

**AC-13**

Pattern and Functional Domain content uses non-deterministic educational framing.

---

## 18.4 Context Explorer

**AC-14**

Context can be explored using qualitative states.

**AC-15**

No Context interaction produces numeric behavioural, clinical, or performance prediction.

**AC-16**

A user can trace a Context to at least its supported related Regulation/Behaviour concepts.

**AC-17**

Feedback loops can be opened without implying inevitability or diagnosis.

---

## 18.5 Presentation Education

**AC-18**

All three formal presentations are available as educational content.

**AC-19**

The historical ADD note is present.

**AC-20**

Presentation Education contains no quiz, symptom selection, score, or inference.

**AC-21**

Behaviour Explorer state cannot automatically select, rank, highlight, or recommend a presentation.

---

## 18.6 Evidence

**AC-22**

A supported concept/relationship with evidence can progress from simple explanation to scientific explanation to source detail.

**AC-23**

Evidence content communicates relevant uncertainty/limitations available in the knowledge contract.

**AC-24**

Group-level evidence is not presented as individualized clinical evidence.

---

## 18.7 Accessibility

**AC-25**

All primary navigation and exploration actions are keyboard accessible.

**AC-26**

Meaning encoded through category colour is also available through non-colour cues.

**AC-27**

A non-spatial representation exists for graph relationships.

**AC-28**

Reduced-motion users can access the same conceptual information.

**AC-29**

Core learning remains possible without visually interpreting the graph.

---

## 18.8 Bilingual / RTL

**AC-30**

Switching between English and Persian preserves the selected canonical concept.

**AC-31**

Language switching does not create different canonical entities.

**AC-32**

Persian layouts display correct RTL structure.

**AC-33**

Mixed Persian/English scientific terminology remains readable.

**AC-34**

Scientific edge direction does not change semantically when layout direction changes.

---

## 18.9 Safety

**AC-35**

Every primary experience has safety messaging appropriate to its interpretive risk.

**AC-36**

The global disclaimer is discoverable from every primary experience.

**AC-37**

Safety content does not require the user to repeatedly dismiss modal warnings during ordinary navigation.

**AC-38**

No application state stores an inferred clinical status.

---

## 18.10 Product Understanding

Usability validation should establish that users can correctly explain, in their own words:

- formal ADHD symptoms are not equivalent to every explanatory construct in the graph
- observable Behaviour can have more than one possible pathway
- Context can affect functioning
- graph relationships do not constitute diagnosis
- presentations are formal clinical terminology separate from Behaviour exploration

These criteria directly operationalize several product-level success examples in the source.

---

# 19. Open Engineering Questions

These questions belong to the next stage.

They should not be resolved prematurely at the product architecture level.

## 19.1 Visualization

- Which visualization library best supports the required graph interactions?
- Is one visualization approach sufficient for desktop and mobile?
- Does mobile require a separate focused-path renderer?
- How should spatial layout remain stable between languages?

---

## 19.2 Graph Layout

- Which layout engine best represents the conceptual layers?
- How should Clinical Anchor separation be implemented visually?
- How should Feedback edges be routed?
- How should dense many-to-many relationships be controlled?

---

## 19.3 Rendering Strategy

- Which views require server rendering?
- Which graph surfaces are client-only?
- What content should remain indexable?
- How should hydration affect visualization?

---

## 19.4 State Management

- Which state belongs in URL/navigation state?
- Which state requires client state management?
- Which preferences may persist?
- What state resets when switching experiences?
- How should cross-experience concept state be transferred?

---

## 19.5 Schema Validation

- What runtime validation should protect the frozen knowledge contract?
- How should invalid canonical IDs or edges fail?
- How should localization completeness be validated?
- How should breaking knowledge-schema changes be detected?

---

## 19.6 Content Packaging

- Build-time content versus runtime API?
- Single knowledge package versus split packages?
- Versioning strategy?
- Localization packaging?
- Evidence bundle size?

---

## 19.7 Storage

- Is persistent client storage needed at all beyond preferences?
- Where should language preference live?
- Should onboarding completion persist?
- How do we guarantee prohibited personal clinical state is never persisted?

---

## 19.8 Caching

- Which knowledge assets are immutable/versioned?
- Which evidence content can be cached aggressively?
- How should localization assets be cached?
- What invalidation strategy follows a future knowledge release?

---

## 19.9 Testing Architecture

- unit testing strategy
- schema contract testing
- relationship integrity testing
- accessibility testing
- RTL testing
- visual regression testing
- keyboard interaction testing
- content/safety invariant testing
- deep-link restoration testing

---

## 19.10 Deployment

- hosting model
- CDN strategy
- static assets
- knowledge-data delivery
- version rollback
- observability
- privacy-preserving analytics

These categories correspond directly to the unresolved technical areas reserved for the next stage in the supplied brief.

---

# 20. Product Architecture Decisions

The following decisions are sufficiently resolved at product level and should become constraints for Technical Architecture.

## PAD-01 — Product identity

ADHD Interactive Explorer is an **educational conceptual exploration system**, not an assessment product.

---

## PAD-02 — Knowledge authority

The frozen Knowledge Handoff remains the scientific source of truth.

Product and Engineering layers consume it rather than redefine it.

---

## PAD-03 — Primary mental model

The product preserves:

**Clinical Anchor**

separate from:

**Context → Regulation → Behaviour → Pattern → Functional Domain ↺ Feedback**

---

## PAD-04 — Four first-class experiences

The MVP contains exactly four primary educational experiences:

- Master System Map
- Behaviour Explorer
- Context & Feedback Explorer
- ADHD Presentation Education

---

## PAD-05 — Home is educational onboarding

Home is not merely navigation.

It establishes:

- product scope
- non-diagnostic boundary
- central mental model
- four exploration choices

---

## PAD-06 — Progressive complexity

The complete graph is not the default entry experience.

The model is disclosed progressively.

---

## PAD-07 — Behaviour is an educational entry point

Plain-language Behaviour may be used as an entry mechanism.

Behaviour selection never becomes:

- symptom tracking
- profiling
- diagnosis
- scoring

---

## PAD-08 — Multiple pathways are fundamental

Where supported by the frozen knowledge model, the UX exposes multiple possible explanatory pathways.

The product must not collapse many-to-many knowledge into simplistic one-to-one explanations.

---

## PAD-09 — Context remains qualitative

Context Explorer uses qualitative explanation only.

No prediction engine or quantitative simulation belongs in MVP.

---

## PAD-10 — Presentation Education is isolated

Formal presentation education is structurally separated from Behaviour exploration.

No Behaviour or Context state can produce presentation inference.

---

## PAD-11 — Evidence is progressively disclosed

Evidence remains accessible but secondary to initial comprehension.

Information depth follows:

overview

→ relationships

→ scientific explanation

→ evidence

---

## PAD-12 — Navigation transfers concepts, not profiles

Cross-experience navigation may transfer canonical entity focus.

It does not transfer accumulated personal interpretation.

---

## PAD-13 — Spatial graph is not the only interface

The conceptual model must have an accessible non-spatial representation.

This is mandatory rather than fallback-only technical debt.

---

## PAD-14 — Mobile is a distinct interaction architecture

Mobile may use focused-path navigation rather than reproducing the complete desktop graph.

The scientific model remains identical.

The interaction model may differ.

---

## PAD-15 — Canonical identity is localization-independent

English and Persian interfaces reference the same canonical scientific entities.

Localization affects presentation, not ontology.

---

## PAD-16 — RTL cannot change scientific semantics

Visual mirroring must never reverse conceptual relationship meaning.

---

## PAD-17 — Safety is layered

Safety appears at:

- global product level
- experience level
- contextual interpretation points
- evidence/methodology level

It is neither hidden nor presented as repetitive modal friction.

---

## PAD-18 — Personal clinical state is prohibited

The application does not create:

- user symptom history
- ADHD profile
- diagnostic inference
- presentation inference
- clinical score
- personal clinical memory

---

## PAD-19 — MVP analytics must not distort product purpose

Future analytics may evaluate:

- comprehension
- navigation success
- accessibility
- technical performance
- experience completion

Product optimization should not reward interactions that encourage repeated self-classification or self-diagnosis.

---

## PAD-20 — Engineering must preserve domain boundaries

Technical implementation must preserve explicit separation among:

- canonical knowledge
- localized educational content
- evidence
- safety content
- UI/navigation state

This prevents the interface layer from becoming an uncontrolled second knowledge model.

---

## Architecture Readiness Assessment

No unresolved product-level blocker currently prevents movement into Technical Architecture.

The following are sufficiently defined:

- product purpose
- user contexts
- top-level information architecture
- onboarding
- four experience models
- navigation relationships
- progressive disclosure
- application-state boundaries
- accessibility requirements
- bilingual/RTL behaviour
- layered safety
- MVP user flows
- content consumption responsibilities
- MVP boundary
- acceptance criteria

The remaining unresolved questions concern technical implementation choices intentionally reserved for the next engineering stage rather than missing product decisions.

The supplied brief defines Stage 8 as the transition from the frozen scientific model to product and UX architecture before low-level implementation, and explicitly reserves visualization libraries, graph engines, rendering strategy, state management, schema validation, storage, caching, testing, and deployment for the following stage.

PRODUCT ARCHITECTURE STATUS: READY FOR TECHNICAL ARCHITECTURE