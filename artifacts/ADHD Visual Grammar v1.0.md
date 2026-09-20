# ADHD Visual Grammar v1.0

**Stage:** 4 — Visual Grammar & Interaction Model
**Ontology:** ADHD Canonical Ontology v1.0 — Frozen
**Purpose:** Define the visual and interaction language for explaining the canonical ADHD ontology to non-specialists without turning the model into diagnosis, scoring, prediction, or treatment guidance.

The ontology used here is fixed: two Clinical Anchor nodes, eight Context nodes, seven Regulation nodes, seven Observable Behaviour nodes, two Recurring Pattern nodes, four Functional Domain nodes, and three canonical edge types.

---

# 1. Design Principles

## 1.1 Explain a network, not a pipeline

The top-level educational sequence remains:

**Context**
**→ Regulation**
**→ Observable Behaviour**
**→ Recurring Pattern**
**→ Functional Consequence**
**→ Feedback**

But the visual system must immediately communicate that this is a **many-to-many network**.

Therefore:

- one Context node may affect several Regulation nodes,
- one Regulation node may contribute to several Behaviours,
- one Behaviour may have several upstream explanations,
- the same recurring pattern may emerge from different paths,
- different people may occupy completely different subsets of the graph,
- Context may buffer as well as amplify difficulty.

No single path should visually dominate as “the ADHD pathway.”

---

## 1.2 Separate clinical definition from explanation

The Clinical Anchor:

- `CA1 Inattention`
- `CA2 Hyperactivity–Impulsivity`

must remain epistemically separate from the explanatory graph.

They answer:

> “How is ADHD clinically defined?”

The explanatory graph answers:

> “What kinds of context-sensitive processes and behaviours are relevant to understanding adult ADHD?”

The Clinical Anchor should therefore **not have outgoing arrows into Regulation**.

---

## 1.3 Preserve uncertainty visually

The visualization should communicate:

- possibility,
- association,
- modulation,
- multiple explanations,
- heterogeneous expression.

It should avoid visually communicating:

- deterministic causality,
- numerical severity,
- probability of diagnosis,
- neurological certainty.

---

## 1.4 Layer before detail

Users should first understand:

**what category a node belongs to**

before being asked to understand:

**its evidence level, scientific caveats, or exact relationships.**

Therefore the default visualization should prioritize conceptual layer identity over evidence metadata.

---

## 1.5 Observable experience should be a valid entry point

Many non-specialists understand:

> “I start tasks but do not finish them”

more easily than:

> “goal management and sustained attention interact with context.”

The system should therefore support exploration from Behaviour backward toward possible influences and forward toward possible consequences.

The experience must still explicitly state that multiple explanations are possible and that the graph cannot determine whether ADHD is present. This requirement is central to the Behaviour Explorer.

---

## 1.6 No visual precision beyond the evidence

Do not use:

- percentages,
- diagnostic likelihood,
- severity gauges,
- “brain efficiency” numbers,
- probability meters,
- weighted pathway scores.

Qualitative language is preferable.

---

# 2. Recommended Visualization Strategy

| RepresentationPrimary user questionRepresents wellRepresents poorlyScientific riskUX riskSuitability |                                                |                                                 |                              |                                              |                                                    |                           |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------- | ---------------------------- | -------------------------------------------- | -------------------------------------------------- | ------------------------- |
| **Layered node-link graph**                                                                          | “How do the major parts relate?”               | All ontology layers; many-to-many relationships | Temporal detail              | Can look causal if arrows are too strong     | Edge clutter                                       | **CORE MVP**              |
| **Free network graph**                                                                               | “What is connected to what?”                   | Network complexity                              | Conceptual hierarchy         | Suggests all nodes have equal status         | Spatial instability; difficult for non-specialists | **REJECT**                |
| **Causal-style graph**                                                                               | “What causes what?”                            | Directionality                                  | Scientific uncertainty       | Strongly overstates causality                | Users read arrows deterministically                | **REJECT**                |
| **Sankey-like flow**                                                                                 | “Where does flow/value move?”                  | Quantitative flows                              | Qualitative relationships    | Implies measurable flow and magnitude        | False precision                                    | **REJECT**                |
| **Feedback-loop diagram**                                                                            | “How can patterns reinforce themselves?”       | Recurring loops                                 | Whole ontology               | May imply universal loops                    | Circular diagrams can become dense                 | **SUPPORTING MVP**        |
| **Behaviour Explorer**                                                                               | “What may influence this behaviour?”           | Behaviour ↔ Regulation ↔ Context                | Whole-system overview        | Could be mistaken for symptom interpretation | Can become quasi-diagnostic                        | **CORE MVP**              |
| **Context Explorer**                                                                                 | “Why can functioning differ by situation?”     | Context modulation                              | Clinical definition          | Could look like a simulator                  | Users may search for optimal ‘settings’            | **CORE/SUPPORTING MVP**   |
| **Presentation comparison**                                                                          | “What are the formal ADHD presentations?”      | Formal symptom domains                          | Mechanisms and context       | Could become self-screening                  | Threshold interpretation                           | **SUPPORTING MVP**        |
| **Radar chart**                                                                                      | “What is my ADHD profile?”                     | Comparative dimensions                          | Scientific ontology          | Encourages pseudo-assessment                 | Strong diagnostic interpretation                   | **REJECT**                |
| **Heat map**                                                                                         | “Which areas are stronger/weaker?”             | Dense comparisons                               | Causal/network relationships | Implies measured intensity                   | Requires scores that do not exist                  | **REJECT for MVP**        |
| **Timeline / sequence view**                                                                         | “How can a specific pattern unfold over time?” | Feedback-loop narratives                        | Full ontology                | May imply fixed temporal order               | Can oversimplify                                   | **PHASE 2 / loop detail** |

## Recommendation

The visual system should use **four complementary representations**, not one universal graph:

1. **Master System Map**
2. **Behaviour Explorer**
3. **Context & Feedback Explorer**
4. **Presentation Education View**

The Master Map explains the ontology.

The other views answer narrower questions without forcing the user to understand the entire network simultaneously.

---

# 3. Master System Map

## 3.1 Overall layout

Use a **layered network with horizontal bands** on desktop:

**Context**

↓ flexible modulation links

**Regulation**

↓ probabilistic contribution links

**Observable Behaviour**

↓ repeated-pattern links

**Recurring Patterns**

↓ functional impact links

**Functional Domains**

Feedback routes travel around the outside of the main graph back toward Context.

The layout communicates conceptual progression without implying a single linear sequence.

---

## 3.2 Clinical Anchor placement

Clinical Anchor should occupy a separate region above or beside the explanatory map.

Recommended structure:

**Clinical definition of ADHD**

`Inattention`
`Hyperactivity–Impulsivity`

Then a strong visual separator:

**──── Formal diagnostic definition ────**

**Explanatory network**

Context → Regulation → Behaviour → Pattern → Function

Clinical nodes should:

- use different shape grammar,
- have no graph arrows into Regulation,
- contain a short label such as **Formal symptom domain**,
- include explanatory text stating that mechanisms below do not define diagnosis.

This directly protects against the false interpretation:

**ADHD → mechanism → behaviour**.

The source explicitly requires this epistemic separation.

---

## 3.3 Layer positions

### Layer A — Context

Top explanatory band.

Nodes distributed in compact clusters:

- internal/current state,
- task characteristics,
- environment/support.

Do not create new ontology categories; clustering is only spatial.

---

### Layer B — Regulation

Main conceptual centre of the visualization.

This layer receives the largest available space because it has the highest relationship density.

---

### Layer C — Observable Behaviour

Placed directly below Regulation.

Behaviour nodes should appear simpler than Regulation nodes because they represent observable action rather than hidden explanatory processes.

---

### Layer D — Recurring Patterns

Smaller band containing:

- Procrastination
- Performance Variability

Patterns should visually look like **aggregates over time**, not another cognitive system.

---

### Layer E — Functional Domains

Bottom layer.

Functional nodes should be visibly broader containers:

- Work
- Learning
- Relationships
- Daily Living / Self-Management

They represent domains where effects may appear, not deficits.

---

## 3.4 Node hierarchy

Default prominence:

1. Layer identity
2. Canonical node name
3. Immediate relationships
4. Evidence metadata
5. Scientific detail

Evidence level should **not determine node size**, because larger nodes would be interpreted as more important or more common.

---

## 3.5 Edge routing

Default state should not display every edge at full strength.

Use:

- low-prominence background edges,
- bundled routing between layers where possible,
- explicit edges only on node selection,
- avoid edge crossings through nodes.

Edges between non-adjacent conceptual layers should be minimized in the main map.

---

## 3.6 Feedback representation

Feedback links should run outside the main layered flow.

Recommended shape:

**large curved return paths**

rather than backward arrows through the graph.

This visually says:

> downstream outcomes can change later context

without suggesting that the main hierarchy is invalid.

---

## 3.7 Progressive disclosure

### Default

Show:

- all canonical nodes,
- layer headings,
- very faint relationship structure,
- no scientific descriptions.

### Hover / focus

Show:

- immediate upstream and downstream neighbours,
- relationship labels,
- evidence badge.

Fade unrelated nodes but do not completely hide them.

### Selected node

Lock highlight state.

Open side panel containing:

- definition,
- category,
- evidence level,
- upstream influences,
- downstream relationships,
- caution.

### Deep detail

User explicitly opens evidence/research detail.

---

## 3.8 Hover state

Hover is informative only.

It should:

- highlight node outline,
- reveal immediate edges,
- reveal compact relationship labels.

Hover must never be required for essential information because mobile and keyboard users cannot depend on hover.

---

## 3.9 Focus state

Keyboard focus should visually match selected/hover semantics but have a distinct focus outline.

Focus should:

- expose node title to screen readers,
- allow Enter/Space to select,
- allow Escape to clear selection.

---

## 3.10 Filtering

Allowed filters:

### By layer

- Context
- Regulation
- Behaviour
- Pattern
- Functional Domain

### By evidence level

- Clinical
- Strong
- Moderate
- Limited

### By selected node neighbourhood

- direct connections only,
- upstream only,
- downstream only.

Do **not** provide filters such as:

- “my symptoms,”
- “my ADHD type,”
- “severity.”

---

## 3.11 Zoom / pan

Desktop:

- limited zoom,
- pan only when graph exceeds viewport,
- “Reset view” always visible,
- selecting a node should auto-centre gently.

Avoid infinite-canvas interaction.

The graph is an educational diagram, not graph-analysis software.

---

## 3.12 Mobile layout

Do not shrink the desktop graph.

Mobile should become a **layered vertical explorer**.

Example:

**Context**

[8 nodes horizontally scrollable or wrapped]

↓

**Regulation**

↓

**Behaviour**

↓

**Patterns**

↓

**Function**

Selecting a node switches to a focused pathway view:

**Possible upstream influences**

↓

**Selected node**

↓

**Possible downstream relationships**

This is easier to understand than pinch-zooming a dense graph.

---

# 4. Node Visual Grammar

The system must remain understandable without colour. The source explicitly requires grayscale, colour-blind, keyboard, screen-reader and mobile compatibility.

## 4.1 Clinical Anchor

**Shape:** double-bordered capsule or framed card
**Visual weight:** highest epistemic distinction, not largest size
**Hierarchy:** category badge → node label
**Label length:** 1–2 lines
**Secondary info:** “Formal symptom domain”
**Evidence indicator:** `CLINICAL` textual badge
**Expandable content:** formal educational definition and presentation relationship
**Interaction:** selectable but no outgoing mechanism edges

---

## 4.2 Context

**Shape:** rounded rectangle with clipped/marked top-left corner
**Visual weight:** medium-light
**Hierarchy:** icon/glyph → name
**Secondary info:** “Context modifier”
**Evidence indicator:** compact textual chip
**Expandable content:** how it may amplify, buffer or change demands
**Interaction:** selecting highlights affected Regulation nodes

Important:

Context should not visually look “pathological.”

---

## 4.3 Regulation

**Shape:** hexagonal/structured card or rectangle with distinct side rails
**Visual weight:** strongest within explanatory network
**Hierarchy:** canonical name → category
**Secondary info:** one-sentence process definition
**Evidence indicator:** `Strong`, `Moderate`, etc.
**Expandable content:** evidence, behaviours influenced, caution
**Interaction:** highlights upstream Context and downstream Behaviour

---

## 4.4 Observable Behaviour

**Shape:** simple rounded rectangle
**Visual weight:** medium
**Hierarchy:** plain-language action first
**Secondary info:** “Observable behaviour”
**Evidence indicator:** optional in detail, not primary
**Expandable content:** several possible upstream pathways
**Interaction:** primary entry point for Behaviour Explorer

Behaviour nodes should feel concrete and readable:

- Starting
- Sustaining
- Keeping Track

rather than neuroscientific.

---

## 4.5 Recurring Pattern

**Shape:** stacked or repeated-line card suggesting repetition over time
**Visual weight:** medium
**Hierarchy:** pattern name → “Repeated pattern”
**Secondary info:** short distinction from single behaviour
**Evidence indicator:** visible because scientific status is important
**Expandable content:** multiple possible routes into the pattern
**Interaction:** highlight contributing behaviours and functional domains

---

## 4.6 Functional Domain

**Shape:** broad container / pill / bracketed region
**Visual weight:** low structural, high spatial presence
**Hierarchy:** domain name
**Secondary info:** “Area of life”
**Evidence indicator:** unnecessary in default state
**Expandable content:** examples of possible effects
**Interaction:** selecting highlights behaviours/patterns that may affect the domain

---

## 4.7 Evidence indicator

Never encode evidence solely by saturation or colour.

Use short textual indicators:

- `Clinical`
- `Strong`
- `Moderate`
- `Limited`

Optional glyph reinforcement:

- Clinical: double outline
- Strong: filled evidence mark
- Moderate: half-filled evidence mark
- Limited: outline evidence mark

But textual labels remain authoritative.

---

# 5. Edge Visual Grammar

Three canonical edge types exist:

- `MODULATES`
- `CONTRIBUTES_TO`
- `FEEDBACK_WITH`

These must remain the only semantic relationship classes.

---

## 5.1 MODULATES

### Meaning

Context may change demand, stability or expression.

### Directionality

Directional.

Usually:

**Context → Regulation**

### Line style

Thin dashed line.

### Arrow style

Small open arrowhead.

### Visual strength

Low.

### Interaction

On selection, display effect qualifier if available:

- may increase demand,
- may interfere,
- may support,
- may buffer,
- effect can vary.

### Tooltip wording

> “This context can change how demanding or stable this process is.”

Never:

> “This context causes this difficulty.”

---

## 5.2 CONTRIBUTES_TO

### Meaning

One node may probabilistically contribute to another.

### Directionality

Directional.

### Line style

Thin solid line.

### Arrow style

Open chevron rather than a heavy causal arrow.

### Visual strength

Medium.

### Interaction

Selecting the edge reveals:

- source,
- target,
- evidence level,
- caution.

### Tooltip wording

> “This factor may contribute to this behaviour or pattern, but it is neither necessary nor sufficient.”

---

## 5.3 FEEDBACK_WITH

### Meaning

A downstream outcome can change future Context, creating a recurring loop.

### Directionality

Bidirectional or curved return relationship.

### Line style

Long-dash curved path.

### Arrow style

Small arrows at relevant direction points.

### Visual strength

Low by default; highlighted only in loop mode.

### Tooltip wording

> “These factors can influence each other over time, creating a reinforcing or buffering loop.”

---

# 6. Evidence / Uncertainty Language

## Clinical

Use:

> “Part of the formal ADHD diagnostic definition.”

Do not use:

> “Proven ADHD mechanism.”

---

## Strong

Use:

> “Research consistently finds this pattern or association at the group level.”

Add:

> “It is not present in every person with ADHD and is not necessarily specific to ADHD.”

---

## Moderate

Use:

> “Research supports a relationship, but findings are heterogeneous or the concept is not specific to ADHD.”

---

## Limited

Use:

> “The concept is plausible or emerging, but current evidence is not strong enough for a central explanatory role.”

---

## Relationship wording

Preferred:

- can influence,
- may contribute,
- is associated with,
- can change demand,
- may buffer,
- may amplify,
- can interact with.

Avoid:

- causes,
- leads to,
- results in,
- produces,
- proves.

Unless a specific claim genuinely warrants stronger causal language.

---

# 7. Behaviour Explorer

The Behaviour Explorer begins with an observable experience rather than an explanatory mechanism.

Its purpose is:

> “What different factors could contribute to this behaviour?”

Not:

> “Why do I have this symptom?”

---

## 7.1 Entry point

User selects one canonical Behaviour node.

Examples:

**Starting**

> “شروع کردن یک کار برایم سخت است.”

**Sustaining**

> “وسط کار زیاد حواسم پرت می‌شود.”

**Completing / Following Through**

> “کارها را شروع می‌کنم ولی تمام نمی‌کنم.”

**Pausing / Waiting Before Acting**

> “قبل از فکر کردن واکنش نشان می‌دهم.”

---

## 7.2 Main visual structure

Use a focused pathway:

**Relevant Context**

↓

**Possible Regulation Systems**

↓

### Selected Behaviour

↓

**Possible Recurring Patterns**

↓

**Possible Functional Domains**

Multiple branches must be visible simultaneously.

---

## 7.3 Example: Starting

Selected:

**Starting**

Possible upstream Regulation:

- Goal Management
- Reward / Delay Processing
- Emotional Regulation

Relevant Context:

- Task Salience / Interest
- Urgency / Time Pressure
- Reward Salience / Immediacy
- Task Demand / Complexity
- External Structure
- Stress / Emotional Load

Possible downstream:

- Procrastination
- Work
- Learning
- Daily Living / Self-Management

The interface should say:

> “Starting can be influenced by several interacting factors. No single pathway explains all cases.”

---

## 7.4 Alternative explanations

Every Behaviour Explorer should contain an expandable section:

**Similar difficulties can occur outside ADHD**

Examples should remain broad rather than diagnostic:

- insufficient sleep,
- high stress,
- low task clarity,
- emotional distress,
- competing demands,
- ordinary fatigue.

No differential diagnosis engine.

---

## 7.5 Forbidden behaviour

The explorer must never:

- count selected behaviours,
- calculate a likelihood,
- compare user patterns to ADHD thresholds,
- assign presentation,
- output “consistent with ADHD.”

The source explicitly forbids ADHD-likelihood calculation.

---

# 8. Context Explorer

## Core educational question

> “Why might the same person function differently in different situations?”

The source explicitly frames Context Explorer as explanation rather than simulation or prediction.

---

## 8.1 Interaction model

Users select one Context modifier.

Example:

**External Structure**

The view highlights:

- which Regulation systems it may affect,
- whether it can increase or reduce demand,
- which Behaviours may consequently become easier or harder.

No predicted outcome is generated.

---

## 8.2 Qualitative states

Where comparison is useful, use three-state language such as:

### Sleep / Energy

- Lower
- Typical
- Higher

### Task Demand

- Lower demand
- Moderate demand
- Higher demand

### External Structure

- Less structured
- Moderately structured
- More structured

### Distraction

- Lower
- Moderate
- Higher

However, these states should control **explanatory emphasis only**.

They should not run a hidden mathematical model.

---

## 8.3 Visual response

Changing a Context state can:

- highlight affected regulation nodes,
- change explanatory annotations,
- reveal possible buffering/amplifying relationships.

It should **not**:

- change an overall performance score,
- predict a behaviour,
- generate a diagnosis,
- calculate “ADHD impact.”

---

## 8.4 Multi-context exploration

Allow at most two Context modifiers to be actively compared simultaneously in MVP.

Reason:

Activating all eight creates the false impression of a computational simulation.

The interface should explain:

> “These examples illustrate possible interactions. They do not predict how an individual will perform.”

---

# 9. Feedback Loop Explorer

Feedback loops should be explored as short educational sequences.

Do not display every loop simultaneously.

---

## 9.1 Procrastination / Urgency Loop

### Sequence

**Starting is delayed**

↓

**Procrastination**

↓

**Deadline gets closer**

↓

**Urgency / Time Pressure rises**

↓

**Reward/consequence becomes more immediate**

↓

**Starting or Sustaining may change**

↓

**Task may be completed under pressure**

↓

**Future reliance on urgency may be reinforced**

### What begins the loop

Possible delayed Starting.

### What maintains it

Short-term effectiveness of increased urgency in some situations.

### What changes Context

Deadline proximity.

### Possible interruption points

Label these:

**Places where the pattern could change**

rather than:

**How to fix the problem**

Examples:

- task structure,
- reward timing,
- starting behaviour,
- external structure.

Do not provide intervention instructions yet.

---

## 9.2 Functional Difficulty → Stress Loop

### Sequence

**Behaviour / recurring pattern**

↓

**Functional difficulty**

↓

**Stress / Emotional Load increases**

↓

**Regulatory demand increases**

↓

**Behaviour may become less stable**

↓

**Further functional difficulty**

This is intentionally generic because the loop can occur in:

- Work,
- Learning,
- Relationships,
- Daily Living.

---

## 9.3 Visual form

Use:

**horizontal sequence + curved return arrow**

rather than a circular infographic.

Reason:

A literal circle implies inevitability and continuous recurrence.

---

# 10. Presentation Education View

This must remain a completely separate educational view.

It uses only formal symptom domains.

The source explicitly prohibits inferring presentation from the Regulation/Behaviour graph or turning this into a score or quiz.

---

## 10.1 Structure

Two formal domain columns:

### Inattention

### Hyperactivity–Impulsivity

Then three presentation cards:

### Predominantly Inattentive Presentation

Clinical threshold is met for inattention but not hyperactivity–impulsivity.

### Predominantly Hyperactive-Impulsive Presentation

Clinical threshold is met for hyperactivity–impulsivity but not inattention.

### Combined Presentation

Clinical thresholds are met for both domains.

---

## 10.2 Visual grammar

Use simple overlap logic.

For example:

**Presentation card A**

Inattention: active
Hyperactivity–Impulsivity: inactive

**Presentation card B**

Inattention: inactive
Hyperactivity–Impulsivity: active

**Presentation card C**

Both active

Do not use numerical symptom counts in the general educational visualization.

---

## 10.3 ADD note

Include a small historical note:

> **ADD** is an older diagnostic term. It is not a separate current diagnosis and should not appear as a fourth ADHD presentation.

Keep this secondary to the current terminology.

---

# 11. Progressive Disclosure

The ontology contains more information than should appear simultaneously.

## Level 1 — Simple educational overview

Visible:

- layer names,
- node labels,
- major conceptual flow,
- Clinical Anchor distinction.

No research detail.

---

## Level 2 — Relationships

Visible after selecting a node:

- direct upstream relationships,
- direct downstream relationships,
- edge type,
- plain-language explanation.

---

## Level 3 — Scientific explanation

Side panel shows:

- definition,
- scientific status,
- upstream influences,
- downstream effects,
- common cautions,
- alternative explanations.

---

## Level 4 — Evidence and sources

Research/evidence modal shows:

- evidence level,
- evidence interpretation,
- primary supporting sources,
- uncertainty,
- what evidence does **not** establish.

---

## Information placement

### Node label

Only:

- canonical name,
- optional category symbol.

### Tooltip

- one-sentence definition,
- category,
- evidence label.

### Side panel

- definition,
- major relationships,
- caution,
- plain-language explanation.

### Detail drawer

- deeper mechanism explanation,
- alternative pathways,
- functional implications.

### Evidence modal

- evidence status,
- sources,
- limitations,
- clinical vs associated distinction.

---

# 12. Accessibility

## Colour

Colour may reinforce categories but never define them.

Each category must also differ by:

- shape,
- border style,
- category label,
- structural placement.

---

## Grayscale

The entire graph must remain interpretable using:

- border styles,
- line patterns,
- shapes,
- textual badges.

---

## Keyboard

Required actions:

- Tab between nodes,
- Enter/Space select,
- Escape close detail,
- arrow keys optionally navigate within a layer,
- visible focus state.

---

## Screen readers

Each node requires semantic text such as:

> “Working Memory. Regulation System. Strong evidence. Connected to Keeping Track and Organizing/Sequencing.”

Edges exposed through accessible relationship lists rather than requiring the graph itself to be spatially interpreted.

---

## Motion

Animations should be:

- subtle,
- short,
- optional under reduced-motion settings.

No continuously moving network.

---

## Mobile

Prefer:

- stacked layers,
- tap-to-focus pathways,
- bottom sheet / drawer details,
- no requirement for pinch zoom,
- no hover-dependent interaction.

---

# 13. Scientific / Diagnostic Guardrails

## 13.1 Global disclaimer

Visible near first entry into the model:

> **This is an educational model of ADHD-related concepts and research. It does not diagnose ADHD, estimate likelihood, measure severity, or provide individualized medical advice.**

---

## 13.2 Graph disclaimer

Near the Master Map:

> **Connections represent possible associations or influences, not universal causal pathways. Different people can show different patterns.**

---

## 13.3 Behaviour Explorer reminder

Before exploring a behaviour:

> **The same behaviour can arise for many reasons, including reasons unrelated to ADHD.**

---

## 13.4 Presentation View reminder

> **ADHD presentations are determined clinically from formal diagnostic criteria, not from this explanatory graph.**

---

## 13.5 Evidence reminder

Where Strong/Moderate evidence is shown:

> **Evidence describes group-level research and does not define an individual profile.**

---

## 13.6 Formal symptoms vs mechanisms

Clinical Anchor must use:

**Formal diagnostic domain**

Regulation nodes must use:

**Associated explanatory process**

This distinction should be visible, not hidden in documentation.

---

## 13.7 Advanced concepts

Future lower-confidence concepts should use a persistent visible marker such as:

**Advanced / Emerging**

They must never use the same visual grammar as Clinical Anchor nodes.

---

## 13.8 No score-producing interaction

Do not provide:

- checkboxes accumulating symptoms,
- profile score,
- “your strongest ADHD dimension,”
- diagnostic radar,
- severity result,
- presentation inference.

The requested safety boundary explicitly excludes diagnosis, severity testing, personalized assessment and treatment recommendation.

---

# 14. MVP Visual Architecture

Version 1 should contain **four major experiences**.

---

## View 1 — Master System Map

### User goal

Understand the full conceptual structure.

### Ontology elements

All 28 canonical nodes and all three edge types.

### Interaction

- select node,
- inspect neighbours,
- filter layer/evidence,
- open scientific detail.

### Primary insight

> ADHD-related functioning is better understood as a context-sensitive network than as one simple deficit.

### Scientific guardrail

Clinical Anchor is visually disconnected from causal/explanatory flow.

### Mobile strategy

Stacked layer explorer with focused pathway mode.

---

## View 2 — Behaviour Explorer

### User goal

Start from a recognisable behaviour and understand several possible contributing pathways.

### Ontology elements

Behaviour + upstream Regulation + Context + downstream Pattern/Function.

### Interaction

Select a Behaviour node and explore several pathways.

### Primary insight

> The same behaviour may arise through different combinations of context and regulation.

### Scientific guardrail

Always show multiple candidate pathways and alternative non-ADHD explanations.

### Mobile strategy

Vertical upstream → selected behaviour → downstream path.

---

## View 3 — Context & Feedback Explorer

### User goal

Understand why functioning may differ across situations and how some patterns can reinforce themselves.

### Ontology elements

Context, Regulation, Behaviour, PAT1/PAT2, Functional Domains, feedback edges.

### Interaction

- select one/two Context modifiers,
- inspect affected systems,
- open a feedback-loop example.

### Primary insight

> Context can change demands, expression and feedback without changing whether ADHD exists.

### Scientific guardrail

No mathematical simulation or prediction.

### Mobile strategy

Context cards → affected pathways → optional loop sequence.

---

## View 4 — ADHD Presentation Education

### User goal

Understand formal current ADHD presentations.

### Ontology elements

Clinical Anchor only, plus educational presentation labels.

### Interaction

Simple presentation comparison.

### Primary insight

> Presentations derive from formal symptom domains, not from explanatory cognitive profiles.

### Scientific guardrail

No quiz, score or inferred presentation.

### Mobile strategy

Three vertically stacked comparison cards.

---

# 15. Phase 2 Ideas

These should remain outside MVP.

## Advanced concept layer

Potential later educational concepts:

- Sustained Attention as separate facet,
- Disengagement Difficulty,
- State / Arousal Regulation,
- Hyperfocus-like Absorption,
- Overwhelm,
- Urgency-Driven Productivity.

These must retain lower-confidence status.

---

## Pathway stories

Curated examples such as:

**High task complexity → Working Memory demand → Keeping Track difficulty → incomplete daily task**

Presented explicitly as hypothetical educational pathways.

---

## Timeline mode

Show how Context and behaviour may change during a single task.

Should remain illustrative rather than predictive.

---

## Compare-context mode

Show the same hypothetical task under:

- lower structure,
- higher structure,
- lower distraction,
- higher distraction.

Again, no predicted score.

---

## Evidence map

Research-focused view for advanced users:

- nodes by evidence level,
- sources,
- uncertainty notes,
- construct status.

---

# 16. Rejected Visualization Approaches

## Free force-directed network

Rejected because:

- layer distinction is lost,
- spatial layout changes unpredictably,
- scientific hierarchy becomes unclear.

---

## Causal DAG-style diagram

Rejected because:

- arrow language strongly implies causal mechanisms,
- current ontology intentionally contains probabilistic and associated relationships.

---

## Sankey diagram

Rejected because:

- width implies magnitude,
- there is no validated “flow quantity” between these constructs.

---

## Radar chart

Rejected because:

- strongly encourages individual profiling,
- appears like psychological scoring,
- would invite diagnostic interpretation.

---

## Heat map

Rejected for MVP because:

- requires meaningful quantitative dimensions,
- likely to imply measured impairment or severity.

---

## “ADHD brain” dashboard

Rejected because:

- collapses heterogeneous group-level findings into a fictional individual brain profile,
- encourages biological essentialism.

---

## Single linear flowchart

Rejected because:

> Context → Regulation → Behaviour → Pattern → Function

is useful as conceptual scaffolding but scientifically misleading if rendered as one mandatory chain.

---

# 17. Open Design Questions

These are design questions, not ontology questions.

## Q1 — How many background edges should be visible by default?

Recommendation:

Very few.

The exact threshold should be tested for comprehensibility.

---

## Q2 — Should evidence badges appear on every node in Level 1?

Recommendation:

Probably no.

They should become visible at Level 2 or Level 3 unless the node is:

- Clinical,
- Advanced / Emerging.

Those epistemic distinctions are important enough for persistent display.

---

## Q3 — How much plain-language localization should labels receive?

Canonical English terminology must remain stable internally.

Persian UI labels can become more natural as display text, provided the canonical ID/name remains unchanged in the data model.

---

## Q4 — Should Context nodes visually distinguish supportive from demanding conditions?

Yes, but only after selection.

A Context variable is not inherently good or bad.

Example:

Urgency may help engagement in one situation and increase stress in another.

---

## Q5 — Should edge evidence be visible directly in the Master Map?

Recommendation:

No.

Relationship type should be visible.

Evidence level belongs in tooltip/detail unless specifically requested.

Otherwise the graph becomes too visually dense.

---

# 18. Ontology Design Issues

## No blocking ontology design issue identified

The frozen ontology can support the proposed visualization system without structural modification.

One caution should remain visible during implementation:

### `PAT2 Performance Variability`

The canonical label is broader than the strongest experimental evidence, which often concerns specific measures such as reaction-time variability.

Therefore the visualization should describe it conservatively as:

> **variation in performance or engagement across time or context**

and should not imply that every form of real-world inconsistency has the same evidence base.

This is a **visual/scientific wording caution**, not a reason to modify the frozen ontology.

---

# Final Visual Architecture

The stable visual system is:

**Clinical definition**

`Inattention | Hyperactivity–Impulsivity`

epistemically separated from:

**Context**

↓

`MODULATES`

↓

**Regulation**

↓

`CONTRIBUTES_TO`

↓

**Observable Behaviour**

↓

**Recurring Pattern**

↓

**Functional Domain**

↺

`FEEDBACK_WITH`

with the following interaction principle:

> **Start simple, reveal relationships on demand, show multiple pathways, and expose scientific uncertainty only as the user asks for deeper explanation.**

The resulting MVP should teach three ideas above all others:

1. **ADHD is clinically defined by formal symptom domains, not by an executive-function profile.**
2. **Day-to-day behaviours can arise through multiple interacting pathways.**
3. **Context can amplify, buffer or change expression without turning the model into a prediction engine.**

VISUAL MODEL STATUS: READY FOR BEHAVIOUR ANALYSIS DESIGN