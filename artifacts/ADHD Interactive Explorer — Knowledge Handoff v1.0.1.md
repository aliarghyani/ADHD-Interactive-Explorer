# ADHD Interactive Explorer — Knowledge Handoff v1.0.1

**Stage:** 7 — Knowledge Handoff
**Project:** 40 — Learning Lab
**Destination:** 50 — Engineering & Architecture
**Knowledge sources:** ADHD Canonical Ontology v1.0.1, ADHD Visual Grammar v1.0.1, ADHD Behaviour Analysis Framework v1.0.0, ADHD Machine-Readable Knowledge Model v1.0.0

This handoff freezes the Learning Lab knowledge phase and packages the scientific model, interaction semantics, data contract, safety constraints, and MVP boundary for Engineering.

---

# 1. Product Knowledge Objective

## What the product should teach

The product exists to help non-specialists understand six ideas:

1. ADHD is clinically defined by formal symptom domains.
2. ADHD should not be reduced to one cognitive deficit such as executive dysfunction, working memory, dopamine, or inhibition.
3. Day-to-day behaviour can emerge through several interacting pathways.
4. Context can amplify, buffer, or alter visible difficulties.
5. The same behaviour can occur for reasons unrelated to ADHD.
6. People with ADHD can have substantially different functional profiles.

The product therefore teaches a **heterogeneous, context-dependent conceptual system**, not a single ADHD pathway.

## What the product is

An **interactive educational explorer** of:

- formal ADHD terminology,
- associated regulatory processes,
- observable behaviour,
- context sensitivity,
- recurring behavioural patterns,
- possible functional consequences,
- scientific evidence and uncertainty.

## What the product is not

It is not:

- a diagnostic tool,
- a screening questionnaire,
- a severity assessment,
- an ADHD probability calculator,
- a presentation classifier,
- a treatment recommender,
- a personalized medical assessment.

Those boundaries are part of the product model itself, not merely disclaimer copy.

---

# 2. Terminology Rules

## ADHD

Canonical term:

**Attention-Deficit/Hyperactivity Disorder — ADHD**

Current clinical classification:

**neurodevelopmental disorder**

## Formal symptom domains

Only two formal ADHD symptom domains belong in the Clinical Anchor:

- **Inattention**
- **Hyperactivity–Impulsivity**

These must remain distinct from explanatory constructs such as:

- Working Memory
- Goal Management
- Response Inhibition
- Reward / Delay Processing
- Emotional Regulation

## Current presentations

Educational content may describe:

- **Predominantly Inattentive Presentation**
- **Predominantly Hyperactive-Impulsive Presentation**
- **Combined Presentation**

Presentation education must use formal clinical symptom domains.

It must never infer presentation from Regulation or Behaviour data.

## ADD

`ADD` is historical terminology.

It may be presented as:

> an older diagnostic term still commonly encountered, especially in reference to predominantly inattentive ADHD.

It must **not** be represented as:

- a separate current disorder,
- a fourth ADHD presentation,
- an alternative canonical label for current ADHD.

## Terminology that must not be introduced casually

Do not introduce as canonical scientific terms:

- HDD
- ADHD paralysis
- dopamine deficiency
- interest-based nervous system
- rejection sensitive dysphoria as a formal ADHD symptom
- object permanence deficit as an ADHD feature
- fixed unofficial ADHD “types”
- hyperfocus as a diagnostic criterion
- overwhelm as an ADHD-specific mechanism

Advanced concepts may only appear under the explicit epistemic rules defined in Section 17.

---

# 3. Canonical Concept Model

## Architecture

The model has two epistemically distinct parts.

### Clinical Anchor

Formal clinical definition:

**Inattention**

**Hyperactivity–Impulsivity**

This sits **outside** the explanatory mechanism network.

It must not be rendered as:

**ADHD → Regulation mechanism → Behaviour**

### Explanatory network

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

This is a many-to-many network, not a deterministic pipeline.

---

## Canonical Node Registry

### Clinical Anchor

| IDCanonical namePersian labelEvidence / statusDefinition |                           |                    |                   |                                                                            |
| -------------------------------------------------------- | ------------------------- | ------------------ | ----------------- | -------------------------------------------------------------------------- |
| `CA1`                                                    | Inattention               | بی‌توجهی           | Clinical / formal | Formal ADHD symptom domain involving persistent inattentive symptoms       |
| `CA2`                                                    | Hyperactivity–Impulsivity | بیش‌فعالی–تکانشگری | Clinical / formal | Formal ADHD symptom domain involving hyperactive and/or impulsive symptoms |

### Context Modifiers

| IDCanonical namePersian labelEvidence / statusDefinition |                             |                       |                     |                                                                           |
| -------------------------------------------------------- | --------------------------- | --------------------- | ------------------- | ------------------------------------------------------------------------- |
| `CTX1`                                                   | Sleep / Energy              | خواب / انرژی          | Strong non-specific | Current sleep, fatigue, and available energy                              |
| `CTX2`                                                   | Stress / Emotional Load     | استرس / بار هیجانی    | Moderate            | Psychological or emotional demand competing with regulatory resources     |
| `CTX3`                                                   | Task Salience / Interest    | برجستگی / جذابیت کار  | Moderate            | Degree to which a task captures interest, relevance, or meaning           |
| `CTX4`                                                   | Urgency / Time Pressure     | فوریت / فشار زمانی    | Moderate            | Immediacy of deadline or consequence                                      |
| `CTX5`                                                   | Reward Salience / Immediacy | برجستگی / فوریت پاداش | Moderate            | Prominence and temporal proximity of expected outcomes                    |
| `CTX6`                                                   | Task Demand / Complexity    | تقاضا / پیچیدگی کار   | Strong non-specific | Cognitive and organizational demand imposed by a task                     |
| `CTX7`                                                   | External Structure          | ساختار بیرونی         | Moderate            | Organization supplied through routines, reminders, deadlines, or guidance |
| `CTX8`                                                   | Distraction / Interruptions | حواس‌پرتی / وقفه‌ها   | Strong non-specific | Competing stimuli or events disrupting ongoing activity                   |

### Regulation Systems

| IDCanonical namePersian labelEvidence / statusDefinition |                           |                      |                            |                                                                           |
| -------------------------------------------------------- | ------------------------- | -------------------- | -------------------------- | ------------------------------------------------------------------------- |
| `REG1`                                                   | Attention Regulation      | تنظیم توجه           | Strong associated          | Allocation, maintenance, and redirection of task-relevant attention       |
| `REG2`                                                   | Working Memory            | حافظهٔ کاری          | Strong associated          | Temporary maintenance and manipulation of information required for action |
| `REG3`                                                   | Goal Management           | مدیریت هدف           | Strong–Moderate associated | Planning, sequencing, and prioritizing actions toward a goal              |
| `REG4`                                                   | Response Inhibition       | مهار پاسخ            | Strong associated          | Suppressing or stopping a prepotent response                              |
| `REG5`                                                   | Reward / Delay Processing | پردازش پاداش / تأخیر | Strong–Moderate associated | How reward value and delay affect engagement and choice                   |
| `REG6`                                                   | Emotional Regulation      | تنظیم هیجان          | Strong association         | Modulation of emotional intensity, duration, and expression               |
| `REG7`                                                   | Task Switching            | جابه‌جایی بین کارها  | Moderate associated        | Transition between task sets, goals, or rules                             |

### Observable Behaviours

| IDCanonical namePersian labelEvidence / statusDefinition |                                 |                           |                                 |                                                                      |
| -------------------------------------------------------- | ------------------------------- | ------------------------- | ------------------------------- | -------------------------------------------------------------------- |
| `BEH1`                                                   | Starting                        | شروع کردن                 | Descriptive                     | Beginning an intended action                                         |
| `BEH2`                                                   | Sustaining                      | ادامه دادن                | Descriptive / strongly relevant | Maintaining goal-directed activity over time                         |
| `BEH3`                                                   | Switching Tasks                 | تغییر کار                 | Descriptive                     | Moving from one active task or goal to another                       |
| `BEH4`                                                   | Keeping Track                   | پیگیری / در ذهن نگه‌داشتن | Descriptive                     | Maintaining awareness of relevant steps, intentions, and commitments |
| `BEH5`                                                   | Organizing / Sequencing         | سازمان‌دهی / ترتیب‌دادن   | Descriptive                     | Ordering actions, materials, or information into a workable sequence |
| `BEH6`                                                   | Completing / Following Through  | تکمیل / پیگیری تا پایان   | Descriptive                     | Carrying an intended action through to its endpoint                  |
| `BEH7`                                                   | Pausing / Waiting Before Acting | مکث / صبر پیش از عمل      | Descriptive                     | Delaying or withholding an immediate response when required          |

### Recurring Patterns

| IDCanonical namePersian labelEvidence / statusDefinition |                         |              |                                                 |                                                               |
| -------------------------------------------------------- | ----------------------- | ------------ | ----------------------------------------------- | ------------------------------------------------------------- |
| `PAT1`                                                   | Procrastination         | اهمال‌کاری   | Moderate associated                             | Repeated maladaptive delay of intended action                 |
| `PAT2`                                                   | Performance Variability | نوسان عملکرد | Strong experimental / Moderate broad real-world | Variation in performance or engagement across time or context |

### Functional Domains

| IDCanonical namePersian labelEvidence / statusDefinition |                                |                           |                   |                                           |
| -------------------------------------------------------- | ------------------------------ | ------------------------- | ----------------- | ----------------------------------------- |
| `FUN1`                                                   | Work                           | کار                       | Functional domain | Occupational functioning                  |
| `FUN2`                                                   | Learning                       | یادگیری                   | Functional domain | Educational and learning functioning      |
| `FUN3`                                                   | Relationships                  | روابط                     | Functional domain | Interpersonal functioning                 |
| `FUN4`                                                   | Daily Living / Self-Management | زندگی روزمره / خودمدیریتی | Functional domain | Everyday routines and personal management |

**Canonical registry total: 30 nodes.**

---

# 4. Relationship Model

Only three canonical relationship types exist.

## MODULATES

### Meaning

A Context variable may change:

- demand,
- stability,
- expression,
- ease,
- interference.

### Allowed interpretation

> “This Context may change how demanding or stable this Regulation process is.”

### Forbidden interpretation

> “This Context causes the Regulation difficulty.”

### Primary use

**Context → Regulation**

---

## CONTRIBUTES_TO

### Meaning

Variation in one node may probabilistically contribute to another.

### Allowed interpretation

> “This process may contribute to this behaviour.”

### Forbidden interpretation

> “This process necessarily produces this behaviour.”

`CONTRIBUTES_TO` means neither necessary nor sufficient.

### Primary use

- Regulation → Behaviour
- Behaviour → Pattern
- Behaviour/Pattern → Functional Domain

---

## FEEDBACK_WITH

### Meaning

A downstream outcome may alter later Context, producing a reciprocal pattern over time.

### Allowed interpretation

> “These factors may reinforce or alter each other over time.”

### Forbidden interpretation

> “This loop inevitably occurs.”

### Primary use

**Functional/Pattern outcome ↺ Context**

---

## Canonical MVP Edge Registry

### Context → Regulation

- `CTX1 → REG1` — Sleep/Energy modulates Attention Regulation
- `CTX1 → REG4` — Sleep/Energy modulates Response Inhibition
- `CTX2 → REG1` — Stress/Emotional Load modulates Attention Regulation
- `CTX2 → REG2` — Stress/Emotional Load modulates Working Memory
- `CTX2 → REG6` — Stress/Emotional Load modulates Emotional Regulation
- `CTX3 → REG1` — Task Salience/Interest modulates Attention Regulation
- `CTX3 → REG5` — Task Salience/Interest modulates Reward/Delay Processing
- `CTX4 → REG5` — Urgency/Time Pressure modulates Reward/Delay Processing
- `CTX5 → REG5` — Reward Salience/Immediacy modulates Reward/Delay Processing
- `CTX6 → REG2` — Task Demand/Complexity increases Working Memory demand
- `CTX6 → REG3` — Task Demand/Complexity increases Goal Management demand
- `CTX7 → REG2` — External Structure may buffer Working Memory demand
- `CTX7 → REG3` — External Structure may buffer Goal Management demand
- `CTX8 → REG1` — Distraction/Interruptions interferes with Attention Regulation
- `CTX8 → REG7` — Distraction/Interruptions increases Task Switching demand

### Regulation → Behaviour

- `REG1 → BEH2` — Attention Regulation contributes to Sustaining
- `REG2 → BEH4` — Working Memory contributes to Keeping Track
- `REG2 → BEH5` — Working Memory contributes to Organizing/Sequencing
- `REG3 → BEH1` — Goal Management contributes to Starting
- `REG3 → BEH5` — Goal Management contributes to Organizing/Sequencing
- `REG3 → BEH6` — Goal Management contributes to Completing/Following Through
- `REG4 → BEH7` — Response Inhibition contributes to Pausing/Waiting
- `REG5 → BEH1` — Reward/Delay Processing contributes to Starting
- `REG5 → BEH2` — Reward/Delay Processing contributes to Sustaining
- `REG6 → BEH1` — Emotional Regulation contributes to Starting
- `REG6 → BEH7` — Emotional Regulation contributes to Pausing/Waiting
- `REG7 → BEH3` — Task Switching contributes to Switching Tasks

### Behaviour → Pattern

- `BEH1 → PAT1`
- `BEH2 → PAT2`
- `BEH4 → PAT2`
- `BEH6 → PAT2`

### Behaviour / Pattern → Functional Domain

- `BEH4 → FUN1`
- `BEH4 → FUN4`
- `BEH5 → FUN1`
- `BEH5 → FUN2`
- `BEH6 → FUN1`
- `BEH6 → FUN2`
- `BEH6 → FUN4`
- `BEH7 → FUN3`
- `PAT1 → FUN1`
- `PAT1 → FUN2`
- `PAT1 → FUN4`
- `PAT2 → FUN1`
- `PAT2 → FUN2`

### Feedback

- `PAT1 ↺ CTX4` — Procrastination / Urgency
- `FUN1 ↺ CTX2` — Work difficulty / Stress
- `FUN2 ↺ CTX2` — Learning difficulty / Stress
- `FUN3 ↺ CTX2` — Relationship difficulty / Stress
- `FUN4 ↺ CTX2` — Daily-life difficulty / Stress

---

# 5. Epistemic Model

## Evidence levels

### Clinical

Part of the formal diagnostic definition.

Only formal clinical constructs should use this status.

### Strong

Converging research consistently supports a group-level association or construct relevance.

Does not mean:

- universal,
- ADHD-specific,
- diagnostic.

### Moderate

Meaningful evidence exists, but:

- findings may be heterogeneous,
- specificity may be low,
- construct boundaries may be less stable.

### Limited / Emerging

Evidence is incomplete, heterogeneous, or conceptually immature.

Limited concepts belong outside MVP unless explicitly approved.

---

## Construct status

The product must also distinguish **what kind of thing** a concept is:

### Formal clinical construct

Example:

`CA1 Inattention`

### Associated explanatory process

Example:

`REG2 Working Memory`

### Contextual modifier

Example:

`CTX1 Sleep / Energy`

### Observable behaviour

Example:

`BEH1 Starting`

### Recurring pattern

Example:

`PAT1 Procrastination`

### Functional domain

Example:

`FUN1 Work`

### Educational hypothesis

Used only for lower-confidence explanatory content such as some future feedback or Advanced concepts.

---

## Fundamental evidence rule

> **Group-level evidence ≠ individual profile.**

A research finding showing an average difference in adults with ADHD must never be transformed into:

> “A person with ADHD has this deficit.”

---

# 6. Visual Model

The MVP contains four visual experiences.

## 6.1 Master System Map

### User question

> “How do Context, Regulation, Behaviour, recurring patterns, and life consequences relate?”

### Knowledge purpose

Teach the overall heterogeneous system.

### Layers

- Clinical Anchor, epistemically separated
- Context
- Regulation
- Behaviour
- Pattern
- Functional Domain
- Feedback

### Essential interaction

Select a node to reveal:

- direct upstream links,
- direct downstream links,
- evidence status,
- plain-language explanation.

### Guardrail

Clinical Anchor has no outgoing mechanistic edges.

### Mobile principle

Use vertically stacked layers and focused-path exploration rather than shrinking a desktop graph.

---

## 6.2 Behaviour Explorer

### User question

> “What different factors could contribute to this behaviour?”

### Knowledge purpose

Start from observable experience and reveal multiple plausible explanations.

### Layers

Behaviour ↔ Regulation ↔ Context, then Pattern/Function.

### Interaction

Select a Behaviour or plain-language entry statement and explore multiple pathways.

### Guardrail

Never infer:

- ADHD,
- severity,
- presentation,
- one definitive mechanism.

### Mobile principle

Sequential focused flow rather than a dense graph.

---

## 6.3 Context & Feedback Explorer

### User question

> “Why might functioning differ across situations?”

### Knowledge purpose

Explain contextual amplification, buffering, and feedback.

### Layers

Context, Regulation, Behaviour, Pattern, Function, Feedback.

### Interaction

Explore one or two Context variables and selected feedback loops.

### Guardrail

No mathematical simulation or predicted outcome.

### Mobile principle

Context cards → affected pathways → optional loop sequence.

---

## 6.4 ADHD Presentation Education

### User question

> “What do the formal ADHD presentations mean?”

### Knowledge purpose

Teach current clinical presentation terminology.

### Layers

Clinical Anchor only.

### Interaction

Compare:

- Predominantly Inattentive
- Predominantly Hyperactive-Impulsive
- Combined

### Guardrail

Must not consume Behaviour Explorer state.

### Mobile principle

Three simple stacked educational cards.

---

## Rejected visual metaphors

### Diagnostic radar

Rejected because it strongly implies an individualized ADHD profile or score.

### Sankey

Rejected because width implies measurable flow or magnitude that the model does not possess.

### Causal DAG

Rejected because it overstates causal certainty.

### Force-directed network

Rejected because conceptual layers and epistemic distinctions become unclear.

### Severity heat map

Rejected because no validated severity measurements exist in the model.

### ADHD brain dashboard

Rejected because it collapses heterogeneous group-level research into a fictional standardized individual brain.

### Single deterministic flowchart

Rejected because the explanatory system is multi-path and context-dependent.

---

# 7. Behaviour Analysis Framework

Canonical educational sequence:

**Observed Situation**

↓

**Canonical Behaviour**

↓

**Relevant Context**

↓

**Possible Regulation Pathways**

↓

**Possible Immediate Consequences**

↓

**Recurring Pattern, where applicable**

↓

**Functional Domains**

↓

**Alternative Explanations**

↓

**Scientific Caution**

A Behaviour must never jump directly to ADHD.

---

## BEH1 — Starting

**Persian:** شروع کردن

**Representative statement:**

> «می‌دونم باید این کار رو انجام بدم، ولی شروع اولین قدمش مدام عقب می‌افته.»

**Direct Regulation:**

- REG3 Goal Management
- REG5 Reward / Delay Processing
- REG6 Emotional Regulation

**Relevant Context:**

- Stress / Emotional Load
- Task Salience / Interest
- Urgency / Time Pressure
- Reward Salience / Immediacy
- Task Demand / Complexity
- External Structure

**Possible Pattern:**

- PAT1 Procrastination

**Relevant functional examples:**

- Work
- Learning
- Daily Living / Self-Management
- shared responsibilities in Relationships

---

## BEH2 — Sustaining

**Persian:** ادامه دادن

**Representative statement:**

> «کار رو شروع می‌کنم ولی بعد از مدتی ذهنم میره سراغ چیز دیگه.»

**Direct Regulation:**

- REG1 Attention Regulation
- REG5 Reward / Delay Processing

**Relevant Context:**

- Sleep / Energy
- Stress / Emotional Load
- Task Salience / Interest
- Reward Salience / Immediacy
- Distraction / Interruptions

**Possible Pattern:**

- PAT2 Performance Variability

**Relevant functional examples:**

- Work
- Learning
- Relationships
- Daily Living

---

## BEH3 — Switching Tasks

**Persian:** تغییر کار

**Representative statement:**

> «وقتی باید از یک کار برم سراغ کار بعدی، تغییر حالت برام زمان می‌بره.»

**Direct Regulation:**

- REG7 Task Switching

**Canonical Context:**

- Distraction / Interruptions

**Possible Pattern:**

No dedicated canonical Pattern edge.

**Relevant functional examples:**

- Work
- Learning
- Relationships
- Daily Living

---

## BEH4 — Keeping Track

**Persian:** پیگیری / در ذهن نگه‌داشتن

**Representative statement:**

> «وسط یک کار چندمرحله‌ای گاهی یادم میره دقیقاً کجای کار بودم.»

**Direct Regulation:**

- REG2 Working Memory

**Relevant Context:**

- Stress / Emotional Load
- Task Demand / Complexity
- External Structure

**Possible Pattern:**

- PAT2 Performance Variability

**Relevant Functional Domains:**

- Work
- Daily Living / Self-Management
- illustrative Learning and Relationship contexts where relevant

---

## BEH5 — Organizing / Sequencing

**Persian:** سازمان‌دهی / ترتیب‌دادن

**Representative statement:**

> «وقتی یک کار چند مرحله داره، مشخص کردن ترتیب درست مراحل برام سخت میشه.»

**Direct Regulation:**

- REG2 Working Memory
- REG3 Goal Management

**Relevant Context:**

- Stress / Emotional Load
- Task Demand / Complexity
- External Structure

**Possible Pattern:**

No dedicated canonical Pattern edge.

**Relevant Functional Domains:**

- Work
- Learning
- illustrative Daily Living / Relationship contexts

---

## BEH6 — Completing / Following Through

**Persian:** تکمیل / پیگیری تا پایان

**Representative statement:**

> «چند کار رو شروع می‌کنم ولی بردنشون تا مرحله‌ی پایان سخت میشه.»

**Direct Regulation:**

- REG3 Goal Management

**Relevant Context:**

- Task Demand / Complexity
- External Structure

**Possible Pattern:**

- PAT2 Performance Variability

**Relevant Functional Domains:**

- Work
- Learning
- Daily Living / Self-Management
- illustrative shared commitments in Relationships

---

## BEH7 — Pausing / Waiting Before Acting

**Persian:** مکث / صبر پیش از عمل

**Representative statement:**

> «گاهی قبل از اینکه فرصت فکر کردن داشته باشم واکنش نشون میدم.»

**Direct Regulation:**

- REG4 Response Inhibition
- REG6 Emotional Regulation

**Relevant Context:**

- Sleep / Energy
- Stress / Emotional Load

**Possible Pattern:**

No separate canonical “Impulsive Action” pattern exists.

**Relevant Functional Domains:**

- Relationships
- Work
- illustrative Learning/Daily Living contexts

---

# 8. Alternative Explanation Requirement

Every Behaviour exploration must visibly state:

> **Similar difficulties can occur for reasons unrelated to ADHD.**

Approved broad categories:

- sleep / physical state,
- acute stress,
- anxiety / emotional distress,
- low mood,
- burnout,
- grief,
- task design,
- excessive workload,
- environment / distraction,
- skill gap,
- ordinary motivation / preference,
- physical illness,
- medication/substance effects where relevant.

These categories are educational explanations, not alternative diagnoses.

## Explicitly prohibited

The product must not perform:

- differential diagnosis,
- condition ranking,
- exclusion logic,
- “most likely diagnosis” reasoning.

---

# 9. Recurring Pattern Model

The model distinguishes three levels:

**single event**

↓

**repeated behaviour**

↓

**recurring pattern**

A single event never automatically becomes a Pattern.

---

## PAT1 — Procrastination

Discuss educationally only when there is:

- intended action,
- repeated delay,
- maladaptive or meaningful negative consequences.

Example:

One task beginning late:

**not enough**

Repeated maladaptive delayed Starting:

**PAT1 may become a useful educational description**

No diagnostic threshold is encoded.

---

## PAT2 — Performance Variability

Discuss only when there is meaningful repeated variation across:

- occasions,
- contexts,
- time.

A single bad or unusually productive day is insufficient.

Important epistemic caution:

Experimental evidence for specific performance variability measures is stronger than evidence supporting every everyday experience described as “inconsistent.”

---

# 10. Functional Domains

## FUN1 — Work

Occupational responsibilities and work functioning.

## FUN2 — Learning

Education, study, training, and skill acquisition.

## FUN3 — Relationships

Interpersonal and social functioning.

## FUN4 — Daily Living / Self-Management

Routines, appointments, administration, household responsibilities, and personal organization.

## Fundamental rule

> **Functional Domain ≠ impairment diagnosis.**

The application may show possible examples.

It may not determine whether clinically significant impairment exists.

---

# 11. Feedback Loops

## 11.1 Procrastination / Urgency Loop

Conceptual sequence:

**Delayed Starting**

↓

**Procrastination pattern**

↓

**deadline becomes closer**

↓

**Urgency / Time Pressure increases**

↓

**reward/consequence becomes more immediate**

↓

**Starting or Sustaining may change**

↓

**task may sometimes be completed under pressure**

↺

**future reliance on urgency may become reinforced**

### Epistemic caution

This is an educationally useful possible loop.

It is:

- not universal,
- not ADHD-specific,
- not a proven single neurobiological mechanism.

### Educational value

It explains how a behaviour can alter future Context rather than simply being caused by Context.

---

## 11.2 Functional Difficulty → Stress Loop

Conceptual sequence:

**Behaviour / Pattern difficulty**

↓

**Functional difficulty**

↓

**Stress / Emotional Load increases**

↓

**regulatory demands increase**

↓

**behaviour may become less stable**

↓

**further functional difficulty**

### Epistemic caution

The relationship is probabilistic and transdiagnostic.

### Educational value

It demonstrates why Functional Domains can become part of a feedback system rather than merely endpoints.

No treatment recommendation belongs in either loop.

---

# 12. Data Contract Summary

The detailed machine-readable contract remains **ADHD Machine-Readable Knowledge Model v1.0.0**.

## ConceptNode

**Responsibility:** canonical scientific concept.

**Key references:** stable canonical ID, EvidenceMetadata, SourceReference.

**Must never infer:** user state, diagnosis, severity.

---

## RelationshipEdge

**Responsibility:** frozen canonical relationship.

**Key references:** source node ID, target node ID, relationship type.

**Must never infer:** probability or numeric causal strength.

---

## BehaviourEntryStatement

**Responsibility:** plain-language navigation into a Behaviour.

**Key reference:** Behaviour ID.

**Must never infer:** symptom score or screening weight.

---

## EducationalPathway

**Responsibility:** curated educational sequence through canonical concepts.

**Key references:** Context, Regulation, Behaviour, optional Pattern/Function, canonical edges.

**Must never infer:** personalized explanation or probability.

---

## ContextMapping

**Responsibility:** qualitative interpretation of Context effects within Behaviour exploration.

**Key references:** Context ID, Behaviour ID, optional Regulation ID.

**Must never infer:** predicted performance.

---

## RecurringPatternRule

**Responsibility:** represent the difference between single event, repetition, and recurring pattern.

**Key references:** Behaviour ID(s), Pattern ID.

**Must never infer:** diagnostic threshold or automated classification.

---

## FunctionalExample

**Responsibility:** illustrate possible life-domain consequences.

**Key references:** Behaviour ID, Functional Domain ID.

**Must never infer:** clinically significant impairment.

---

## AlternativeExplanation

**Responsibility:** represent broad non-ADHD contributors.

**Key references:** relevant Behaviour IDs.

**Must never infer:** differential diagnosis or condition ranking.

---

## EvidenceMetadata

**Responsibility:** reusable evidence interpretation.

**Key references:** SourceReference IDs.

**Must never infer:** individual-level traits from group-level evidence.

---

## SourceReference

**Responsibility:** bibliographic/source provenance.

**Must never infer:** unsupported claims beyond the source.

---

## FeedbackLoop

**Responsibility:** curated reciprocal educational sequence.

**Key references:** canonical nodes and relationships.

**Must never infer:** inevitability or treatment.

---

## PresentationEducation

**Responsibility:** current ADHD presentation education and historical ADD note.

**Key references:** Clinical Anchor only.

**Must never infer:** presentation from Behaviour Explorer state.

---

## SafetyCopy

**Responsibility:** mandatory reusable safety wording.

**Must never infer:** medical advice.

---

## LocalizationText

**Responsibility:** localized display wording.

**Must never alter:** canonical scientific identity.

---

## KnowledgeModelMetadata

**Responsibility:** package-level version and compatibility information.

**Must never alter:** canonical semantics without a corresponding version change.

---

# 13. Versioning

Five independent version axes exist.

## ontologyVersion

Changes when:

- canonical nodes,
- canonical edges,
- scientific ontology structure

change.

Canonical IDs remain stable across compatible versions.

The documentation/count correction from v1.0.0 to v1.0.1 does **not** change canonical structure.

---

## visualGrammarVersion

Changes when:

- visual semantics,
- node/edge grammar,
- interaction meaning

change.

v1.0.1 contains only the corrected canonical-node count; visual semantics remain unchanged.

---

## behaviourFrameworkVersion

Changes when:

- Behaviour analysis rules,
- pathway interpretation,
- Behaviour educational mappings

change.

Current version remains:

**1.0.0**

---

## contentModelVersion

Changes when:

- machine-readable entity structure,
- field contract,
- validation contract

changes.

Current version remains:

**1.0.0**

---

## evidenceReviewVersion

Changes when:

- evidence level,
- limitations,
- source interpretation,
- source set

changes.

This count correction does not change the evidence-review version.

---

## Auditability rule

Published knowledge bundles should remain immutable and historically retrievable.

A wording-only update must not silently modify scientific ontology.

An evidence update must not silently modify canonical edges.

A canonical ID must never be repurposed.

---

# 14. Safety Copy Requirements

The following safety contexts are mandatory.

| ContextEnglishPersian                |                                                                                                                                         |                                                                                                                           |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Global educational disclaimer**    | This is an educational model of ADHD-related concepts and research. It does not diagnose ADHD or provide individualized medical advice. | این یک مدل آموزشی درباره مفاهیم و پژوهش‌های مرتبط با ADHD است و برای تشخیص ADHD یا ارائه توصیه پزشکی شخصی طراحی نشده است. |
| **Graph disclaimer**                 | Connections show possible associations or influences, not universal causal pathways.                                                    | ارتباط‌ها مسیرهای احتمالی اثرگذاری یا ارتباط را نشان می‌دهند، نه زنجیره‌های علّی قطعی و همگانی.                           |
| **Behaviour Explorer**               | This behaviour alone does not indicate ADHD and may have several different explanations.                                                | این رفتار به‌تنهایی نشان‌دهنده ADHD نیست و می‌تواند توضیح‌های متفاوتی داشته باشد.                                         |
| **Alternative explanation reminder** | Similar difficulties can occur for reasons unrelated to ADHD.                                                                           | مشکلات مشابه می‌توانند به دلایلی غیرمرتبط با ADHD هم رخ دهند.                                                             |
| **Recurring-pattern caution**        | One event is not enough to establish a recurring pattern.                                                                               | یک اتفاق منفرد برای شکل‌گیری یا نتیجه‌گیری درباره یک الگوی تکرارشونده کافی نیست.                                          |
| **Functional-impact caution**        | A difficulty in this area does not automatically mean clinically significant impairment.                                                | وجود دشواری در این حوزه به‌تنهایی به معنای اختلال عملکرد بالینی قابل‌توجه نیست.                                           |
| **Presentation caution**             | ADHD presentations are based on formal clinical symptom domains, not this explanatory graph.                                            | presentationهای ADHD بر اساس حوزه‌های رسمی علائم بالینی تعریف می‌شوند، نه بر اساس این نمودار توضیحی.                      |
| **Group-level evidence caution**     | Research findings describe group-level tendencies and do not define an individual profile.                                              | یافته‌های پژوهشی روندهای سطح گروه را توصیف می‌کنند و پروفایل یک فرد را تعیین نمی‌کنند.                                    |

Mandatory safety content cannot be disabled by ordinary content configuration.

---

# 15. Prohibited Product Capabilities

The product must never implement:

- ADHD likelihood,
- diagnostic confidence,
- severity scoring,
- symptom scoring,
- ADHD risk percentage,
- presentation prediction,
- user clinical profile,
- mechanism probability,
- mechanism strength,
- causal weight,
- predicted performance,
- predicted behaviour,
- screening result,
- screening threshold,
- treatment plan,
- medication recommendation,
- therapy recommendation,
- differential diagnosis,
- condition ranking,
- personalized medical advice.

Also prohibited are disguised equivalents such as:

- “ADHD match”
- “Your ADHD profile”
- “Most likely mechanism”
- “Your dominant ADHD pathway”
- “Clinical similarity”
- “Probability this is ADHD”

## Enforcement layers

These restrictions apply at all three levels:

### Data Model

Prohibited values/fields must not exist.

### Business Logic

No hidden calculation may derive them.

### UI

No presentation may imply them indirectly.

Safety cannot rely on copy alone.

---

# 16. MVP Content Boundary

## Included

The MVP includes:

- **30 canonical nodes**
- 2 Clinical Anchor nodes
- 8 Context nodes
- 7 Regulation nodes
- 7 Behaviour nodes
- 2 Recurring Pattern nodes
- 4 Functional Domain nodes
- 3 canonical edge semantics
- 7 Behaviour entry categories
- 2 canonical recurring patterns
- 4 Functional Domains
- 4 visual experiences
- curated EducationalPathways
- Context mappings
- broad alternative-explanation content
- formal presentation education
- evidence metadata
- source references
- mandatory safety copy
- Persian + English content architecture
- version metadata

## Not MVP

- Hyperfocus-like Absorption
- Overwhelm
- Urgency-Driven Productivity
- Disengagement Difficulty
- State / Arousal Regulation
- detailed Sustained Attention submodel
- free-text psychological interpretation
- user clinical profile persistence
- screening
- treatment guidance

---

# 17. Advanced / Phase 2 Content

Advanced concepts remain outside MVP.

## Hyperfocus-like Absorption

### Why excluded

Evidence remains limited/emerging and definition is inconsistent.

### Inclusion condition

A later evidence review supports sufficiently clear construct boundaries and educational value.

### Required label

**Advanced / Emerging**

---

## Overwhelm

### Why excluded

Highly non-specific experiential construct.

### Inclusion condition

A sufficiently disciplined educational representation can explain overload without implying an ADHD-specific mechanism.

### Required label

**Advanced / Non-specific**

---

## Urgency-Driven Productivity

### Why excluded

Useful explanatory pattern, but insufficiently established as a canonical ADHD construct.

### Inclusion condition

Improved evidence and a clear separation from general human deadline effects.

### Required label

**Advanced / Educational hypothesis**

---

## Disengagement Difficulty

### Why excluded

Less established as a distinct ADHD-specific mechanism than Task Switching.

### Inclusion condition

Evidence clearly supports an independent educational role.

### Required label

**Advanced / Emerging explanatory process**

---

## State / Arousal Regulation

### Why excluded

Legitimate research theory but less settled than current MVP Regulation systems.

### Inclusion condition

Evidence review justifies adding a more theoretical explanatory layer.

### Required label

**Advanced / Theoretical**

---

## Detailed Sustained Attention Submodel

### Why excluded

Already contained as a facet of `REG1 Attention Regulation`; separate canonical treatment would add complexity.

### Inclusion condition

A deeper attention-specific educational experience becomes a product requirement.

### Required label

**Advanced facet of Attention Regulation**

None of these concepts may enter MVP through copy alone. Inclusion requires explicit knowledge-model governance.

---

# 18. Engineering Decisions Still Open

The following belong entirely to **50 — Engineering & Architecture** and are intentionally unanswered here:

- frontend visualization library,
- Nuxt architecture,
- rendering strategy,
- graph layout engine,
- graph interaction implementation,
- content loading strategy,
- localization implementation,
- state management,
- accessibility implementation,
- responsive rendering strategy,
- content storage format,
- static versus API-backed knowledge package,
- caching strategy,
- content validation tooling,
- schema validation implementation,
- version migration strategy,
- test strategy,
- visual regression strategy,
- evidence/source content delivery mechanism,
- deployment architecture.

---

# 19. Non-Negotiable Invariants

Product and Engineering must verify:

-  Clinical Anchor remains epistemically separate from the explanatory graph.
-  `CA1` and `CA2` have no outgoing mechanistic edges.
-  Behaviour never infers ADHD.
-  Behaviour selections are never counted as symptoms.
-  Alternative explanations are visibly available in Behaviour exploration.
-  No numeric diagnostic interpretation exists.
-  Exactly **30 canonical node IDs** are present in the frozen registry.
-  Only approved canonical IDs are used.
-  Canonical IDs are never repurposed.
-  Only `MODULATES`, `CONTRIBUTES_TO`, and `FEEDBACK_WITH` are canonical edge semantics.
-  `MODULATES` never means “causes.”
-  `CONTRIBUTES_TO` never means “necessary or sufficient.”
-  `FEEDBACK_WITH` never means “inevitable.”
-  Regulation systems remain separate from formal diagnostic criteria.
-  Context nodes remain non-specific.
-  One event never automatically becomes a recurring Pattern.
-  Functional Domain never becomes an impairment diagnosis.
-  Advanced concepts remain visually and epistemically distinct.
-  Group-level evidence is never converted into an individual profile.
-  Presentation Education never consumes Behaviour Explorer state.
-  ADD is never represented as a fourth current presentation.
-  Mandatory safety copy cannot be disabled through normal configuration.
-  Persian wording may evolve without changing canonical identity.
-  Evidence updates are versioned independently from ontology changes.
-  No assessment-like fields exist in the data contract.
-  No hidden business logic calculates diagnostic or clinical outputs.

---

# 20. Engineering Handoff Summary

## What Engineering receives

### 1. Frozen ontology

**30 canonical nodes**, their stable IDs, categories, and approved relationships defining the educational knowledge graph.

### 2. Visual semantics

Rules for:

- layer distinction,
- Clinical Anchor separation,
- node categories,
- edge meaning,
- uncertainty,
- progressive disclosure,
- mobile adaptation.

### 3. Behaviour analysis rules

A non-diagnostic framework starting from observable Behaviour and exploring:

- Context,
- possible Regulation pathways,
- recurring patterns,
- Functional Domains,
- alternative explanations.

### 4. Data contract

Machine-readable entities for:

- nodes,
- edges,
- pathways,
- statements,
- Context mappings,
- recurring patterns,
- functional examples,
- evidence,
- sources,
- presentation education,
- feedback loops,
- localization,
- safety,
- versioning.

### 5. Evidence model

A four-level evidence framework:

- Clinical
- Strong
- Moderate
- Limited

with explicit epistemic and construct status.

### 6. Safety rules

Hard prohibition of:

- diagnosis,
- scoring,
- prediction,
- presentation inference,
- treatment,
- personalized medical conclusions.

### 7. MVP boundary

A constrained educational product using:

- 30 frozen canonical nodes,
- three relationship semantics,
- seven Behaviour entry categories,
- two recurring Patterns,
- four Functional Domains,
- four visual experiences,
- bilingual educational/safety content.

### 8. Open engineering decisions

Technology choices, application architecture, visualization implementation, storage, state, testing, and deployment remain intentionally unselected for the Engineering & Architecture phase.

---

# Final Consistency Verification

- Canonical node count: **30**
- Unique canonical IDs: **30**
- Clinical Anchor: **2**
- Context: **8**
- Regulation: **7**
- Behaviour: **7**
- Recurring Pattern: **2**
- Functional Domain: **4**
- Canonical edge semantics: **3**
- Behaviour categories: **7**
- Canonical recurring patterns: **2**
- Functional Domains: **4**
- MVP visual experiences: **4**
- Duplicate canonical IDs: **0**
- Missing canonical IDs: **0**

The canonical registry, scientific meaning, canonical edges, evidence levels, Behaviour mappings, Visual Grammar semantics, and machine-readable data contract remain unchanged.

The documentation/count inconsistency has been fully resolved.

KNOWLEDGE PHASE STATUS: READY FOR ENGINEERING