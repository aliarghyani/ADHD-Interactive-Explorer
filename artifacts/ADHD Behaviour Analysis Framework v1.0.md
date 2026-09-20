# ADHD Behaviour Analysis Framework v1.0

**Stage:** 5 — Behaviour Analysis Framework
**Depends on:** ADHD Canonical Ontology v1.0 + ADHD Visual Grammar v1.0
**Ontology status:** Frozen
**Purpose:** Define how an educational application can begin with an observable behaviour and explore multiple plausible contextual and regulatory pathways without diagnosing ADHD.

The framework uses only the seven canonical Behaviour nodes, two Recurring Pattern nodes, eight Context nodes, seven Regulation nodes and four Functional Domains already frozen in the ontology.

---

# 1. Design Principles

## 1.1 Behaviour is the entry point, not the conclusion

The framework asks:

> **What different factors could contribute to this behaviour?**

It never asks:

> **What disorder causes this behaviour?**

A selected behaviour therefore opens an educational network of possibilities rather than a diagnostic interpretation.

---

## 1.2 Observable behaviour must remain separate from mechanism

Examples:

**Behaviour**

> “I know what I need to do but keep delaying the first concrete step.”

is acceptable.

**Mechanism presented as behaviour**

> “I have poor executive functioning.”

is not.

Behaviour descriptions must remain visible, concrete and recognisable. This is explicitly required by the Stage 5 specification.

---

## 1.3 Every behaviour may have multiple pathways

A behaviour can be influenced by:

- different Context modifiers,
- different Regulation systems,
- combinations of both,
- factors unrelated to ADHD.

No pathway is definitive.

---

## 1.4 Fewer supported pathways are preferable to invented pathways

The frozen ontology does not provide an equal number of canonical upstream relationships for every Behaviour.

For example:

- `Starting` has several canonical pathways,
- `Switching Tasks` is primarily linked to `Task Switching`,
- `Completing / Following Through` is primarily linked to `Goal Management`.

The Behaviour Framework should preserve this asymmetry.

It must **not invent additional Regulation → Behaviour relationships merely to make every behaviour look equally complex**.

---

## 1.5 Context changes expression

Context may:

- increase demand,
- reduce demand,
- improve stability,
- interfere with performance,
- alter engagement.

Context must not be interpreted as proof of ADHD.

---

## 1.6 Single events are not recurring patterns

A difficult start once is not `Procrastination`.

One inconsistent day is not `Performance Variability`.

The framework distinguishes:

**single event**

↓

**repeated behaviour**

↓

**recurring pattern**

as explicitly required.

---

## 1.7 Functional impact is conditional

Difficulty with a Behaviour does not automatically mean impairment.

Functional impact depends on factors such as:

- frequency,
- persistence,
- context,
- task demands,
- compensation,
- consequences.

---

## 1.8 No user interaction produces a medical conclusion

The Behaviour Explorer must never produce:

- diagnosis,
- likelihood,
- severity,
- ADHD type,
- presentation inference,
- treatment recommendation.

These are explicit boundaries of the framework.

---

# 2. Behaviour Taxonomy

---

## BEH1 — Starting

### Plain-language Persian description

**شروع کردن کاری که قصد انجامش را داریم و برداشتن اولین قدم واقعی.**

### Typical real-world examples

- opening the document and writing the first line,
- beginning an assignment,
- making the first phone call,
- starting household paperwork,
- beginning an important but uninteresting task.

### Functioning well

The person can move from:

**“I need to do this”**

to:

**actual action**

without disproportionate delay.

### Difficulty may look like

- repeatedly preparing without beginning,
- moving between preliminary activities,
- waiting until pressure becomes high,
- knowing the next task but not taking the first concrete step.

### This behaviour does NOT prove

- ADHD,
- lack of motivation,
- executive dysfunction,
- procrastination as a stable pattern.

### Relevant Regulation systems

- `REG3 — Goal Management`
- `REG5 — Reward / Delay Processing`
- `REG6 — Emotional Regulation`

### Relevant Context modifiers

- `CTX2 — Stress / Emotional Load`
- `CTX3 — Task Salience / Interest`
- `CTX4 — Urgency / Time Pressure`
- `CTX5 — Reward Salience / Immediacy`
- `CTX6 — Task Demand / Complexity`
- `CTX7 — External Structure`

### Possible recurring patterns

- `PAT1 — Procrastination`
- potentially broader variability in starting across situations, but this should not automatically be labelled `PAT2`.

### Possible functional domains

- Work
- Learning
- Daily Living / Self-Management
- sometimes Relationships where action concerns shared responsibilities.

---

## BEH2 — Sustaining

### Plain-language Persian description

**ادامه دادن یک کار و حفظ درگیری با آن برای مدت لازم.**

### Typical real-world examples

- staying with a report for 30 minutes,
- continuing a lecture or study session,
- remaining engaged in administrative work,
- following a conversation without repeatedly drifting away.

### Functioning well

Attention and action remain sufficiently stable to continue the task until a natural transition or endpoint.

### Difficulty may look like

- frequent drift,
- repeated task abandonment,
- needing repeated re-entry into the same activity,
- switching attention toward competing stimuli.

### This behaviour does NOT prove

- ADHD,
- a sustained-attention disorder,
- lack of interest,
- low intelligence.

### Relevant Regulation systems

- `REG1 — Attention Regulation`
- `REG5 — Reward / Delay Processing`

### Relevant Context modifiers

- `CTX1 — Sleep / Energy`
- `CTX2 — Stress / Emotional Load`
- `CTX3 — Task Salience / Interest`
- `CTX5 — Reward Salience / Immediacy`
- `CTX8 — Distraction / Interruptions`

### Possible recurring patterns

- `PAT2 — Performance Variability`

### Possible functional domains

- Work
- Learning
- Relationships
- Daily Living / Self-Management

---

## BEH3 — Switching Tasks

### Plain-language Persian description

**انتقال از یک کار یا هدف فعلی به کار دیگری وقتی شرایط نیاز دارد.**

### Typical real-world examples

- stopping email work to join a scheduled meeting,
- moving from research to writing,
- changing from one household task to another,
- returning to the original task after an interruption.

### Functioning well

The person can transition between tasks without excessive delay or loss of orientation.

### Difficulty may look like

- delayed transitions,
- continuing one activity longer than intended,
- difficulty reorienting after an interruption,
- repeatedly losing the thread after task changes.

### This behaviour does NOT prove

- ADHD,
- hyperfocus,
- cognitive inflexibility,
- a specific executive-function disorder.

### Relevant Regulation systems

- `REG7 — Task Switching`

### Relevant Context modifiers

Canonical Context relationship:

- `CTX8 — Distraction / Interruptions`

Other Context conditions may matter in real life, but they should not be presented as canonical ontology edges unless later evidence review expands the frozen model.

### Possible recurring patterns

No unique canonical Pattern is required.

Repeated unstable switching may contribute indirectly to broader `Performance Variability`, but the ontology should not invent a direct canonical edge unless formally added in a later ontology revision.

### Possible functional domains

- Work
- Learning
- Relationships
- Daily Living / Self-Management

---

## BEH4 — Keeping Track

### Plain-language Persian description

**در ذهن یا در سیستم بیرونی نگه‌داشتن این‌که الان چه کاری، چه مرحله‌ای یا چه تعهدی باید پیگیری شود.**

### Typical real-world examples

- remembering where you were in a multi-step task,
- keeping track of several instructions,
- remembering what still needs to be done,
- retaining the next action after an interruption.

### Functioning well

Relevant steps, intentions and commitments remain accessible enough to continue action.

### Difficulty may look like

- losing place in a sequence,
- forgetting an intermediate step,
- repeatedly reopening material to reconstruct what happened,
- overlooking pending commitments.

### This behaviour does NOT prove

- ADHD,
- a general memory disorder,
- low ability,
- lack of caring.

### Relevant Regulation systems

- `REG2 — Working Memory`

### Relevant Context modifiers

- `CTX2 — Stress / Emotional Load`
- `CTX6 — Task Demand / Complexity`
- `CTX7 — External Structure`

### Possible recurring patterns

- `PAT2 — Performance Variability`

### Possible functional domains

Especially relevant to:

- Work
- Daily Living / Self-Management

Also possible in:

- Learning
- Relationships

depending on the task.

---

## BEH5 — Organizing / Sequencing

### Plain-language Persian description

**مرتب‌کردن مراحل، اطلاعات یا کارها به شکلی که بتوان آن‌ها را اجرا کرد.**

### Typical real-world examples

- deciding the order of project steps,
- structuring an assignment,
- organizing materials before beginning,
- turning a broad task into workable actions.

### Functioning well

The person can convert a goal into a usable sequence and maintain enough structure to act.

### Difficulty may look like

- unclear order of operations,
- missing prerequisite steps,
- repeatedly reorganizing instead of executing,
- tasks becoming harder as complexity increases.

### This behaviour does NOT prove

- ADHD,
- poor executive functioning as a global trait,
- inability to plan in every context.

### Relevant Regulation systems

- `REG2 — Working Memory`
- `REG3 — Goal Management`

### Relevant Context modifiers

- `CTX2 — Stress / Emotional Load`
- `CTX6 — Task Demand / Complexity`
- `CTX7 — External Structure`

### Possible recurring patterns

No unique canonical Pattern is required.

If organization varies substantially across context and time, it may contribute to a broader lived experience of variability, but this should not be treated as a direct canonical `PAT2` edge unless encoded separately later.

### Possible functional domains

- Work
- Learning
- Daily Living / Self-Management
- sometimes Relationships where shared coordination is involved.

---

## BEH6 — Completing / Following Through

### Plain-language Persian description

**ادامه دادن یک کار تا نقطه‌ای که واقعاً تمام یا تحویل شده باشد.**

### Typical real-world examples

- submitting a report,
- finishing an assignment,
- completing every step of an administrative process,
- carrying a household responsibility through to its endpoint.

### Functioning well

Intentions are translated into sustained action through the required endpoint.

### Difficulty may look like

- many partly completed tasks,
- stopping near the final steps,
- forgetting to submit completed work,
- losing structure before reaching the endpoint.

### This behaviour does NOT prove

- ADHD,
- procrastination,
- lack of motivation,
- inability to finish anything.

### Relevant Regulation systems

Canonical direct relationship:

- `REG3 — Goal Management`

The frozen ontology intentionally avoids making every plausible contributor a direct canonical edge.

### Relevant Context modifiers

Most directly through Goal Management:

- `CTX6 — Task Demand / Complexity`
- `CTX7 — External Structure`

### Possible recurring patterns

- `PAT2 — Performance Variability`

Repeated incomplete follow-through may also coexist with procrastination, but this should not replace the canonical `Starting → Procrastination` relationship.

### Possible functional domains

- Work
- Learning
- Daily Living / Self-Management
- Relationships where commitments are shared.

---

## BEH7 — Pausing / Waiting Before Acting

### Plain-language Persian description

**ایجاد فاصله‌ی کافی بین میل به واکنش و خودِ واکنش، وقتی شرایط نیاز به صبر یا مکث دارد.**

### Typical real-world examples

- waiting before interrupting,
- pausing before sending an angry message,
- waiting for another person to finish,
- stopping an immediate response long enough to reconsider.

### Functioning well

An immediate action can be delayed or withheld when necessary.

### Difficulty may look like

- responding before enough reflection,
- interrupting,
- acting quickly during emotional activation,
- difficulty waiting in situations that require restraint.

### This behaviour does NOT prove

- ADHD,
- impulsive personality,
- lack of respect,
- poor emotional control in general.

### Relevant Regulation systems

- `REG4 — Response Inhibition`
- `REG6 — Emotional Regulation`

### Relevant Context modifiers

- `CTX1 — Sleep / Energy`
- `CTX2 — Stress / Emotional Load`

### Possible recurring patterns

No separate `Impulsive Action` pattern exists in the frozen ontology.

Impulsive behaviour remains connected to the formal `Hyperactivity–Impulsivity` clinical domain at the diagnostic level, while `Response Inhibition` remains an associated explanatory process.

### Possible functional domains

Especially relevant to:

- Relationships
- Work

Also possible in:

- Learning
- Daily Living / Self-Management.

---

# 3. Plain-Language Behaviour Entry Library

These are recognition-oriented educational statements.

They are not questionnaire items and must never be counted or scored.

---

## BEH1 — Starting

- «می‌دونم باید این کار رو انجام بدم، ولی شروع اولین قدمش مدام عقب می‌افته.»
- «گاهی مدت زیادی درباره‌ی یک کار فکر می‌کنم ولی وارد انجام واقعی‌اش نمی‌شم.»
- «برای شروع بعضی کارهای مهم باید خیلی به خودم فشار بیارم.»
- «گاهی تا زمانی که کار فوری نشه، شروعش نمی‌کنم.»

---

## BEH2 — Sustaining

- «کار رو شروع می‌کنم ولی بعد از مدتی ذهنم میره سراغ چیز دیگه.»
- «برای ادامه دادن کارهای طولانی باید چند بار خودم رو برگردونم سر کار.»
- «اگر وسط کار حواس‌پرتی پیش بیاد، ادامه دادن برام سخت‌تر میشه.»
- «بعضی وقت‌ها شروع خوبه ولی حفظ تمرکز تا آخر سخت میشه.»

---

## BEH3 — Switching Tasks

- «وقتی باید از یک کار برم سراغ کار بعدی، تغییر حالت برام زمان می‌بره.»
- «بعد از یک وقفه سخت می‌تونم دقیقاً برگردم به کاری که داشتم انجام می‌دادم.»
- «گاهی بیشتر از چیزی که قصد داشتم روی یک کار می‌مونم و دیر سراغ بعدی میرم.»
- «تعویض مداوم بین چند کار باعث میشه رشته‌ی کار از دستم بره.»

---

## BEH4 — Keeping Track

- «وسط یک کار چندمرحله‌ای گاهی یادم میره دقیقاً کجای کار بودم.»
- «اگر چند دستور با هم داده بشه، ممکنه یکی از مراحل از دستم در بره.»
- «گاهی بعد از وقفه باید دوباره بررسی کنم که چه چیزهایی انجام شده و چه چیزهایی مونده.»
- «ممکنه قصد انجام کاری رو داشته باشم ولی در جریان کارهای دیگه از ذهنم خارج بشه.»

---

## BEH5 — Organizing / Sequencing

- «وقتی یک کار چند مرحله داره، مشخص کردن ترتیب درست مراحل برام سخت میشه.»
- «گاهی نمی‌دونم از بین چند کار کدوم رو باید اول انجام بدم.»
- «ممکنه زمان زیادی صرف مرتب‌کردن کارها کنم ولی هنوز مسیر اجرا واضح نباشه.»
- «کارهای مبهم و پیچیده خیلی سخت‌تر از کارهایی هستن که قدم‌های مشخص دارن.»

---

## BEH6 — Completing / Following Through

- «چند کار رو شروع می‌کنم ولی بردنشون تا مرحله‌ی پایان سخت میشه.»
- «گاهی قسمت اصلی کار انجام شده ولی مرحله‌ی آخر یا تحویلش عقب می‌افته.»
- «ممکنه روی کاری وقت زیادی گذاشته باشم ولی هنوز کامل بسته نشده باشه.»
- «بعضی کارها نزدیک پایان متوقف میشن و بعداً باید دوباره برگردم سراغشون.»

---

## BEH7 — Pausing / Waiting Before Acting

- «گاهی قبل از اینکه فرصت فکر کردن داشته باشم واکنش نشون میدم.»
- «بعضی وقت‌ها وسط حرف دیگران وارد صحبت میشم بدون اینکه قصدش رو داشته باشم.»
- «وقتی احساساتم شدیده، مکث قبل از واکنش سخت‌تر میشه.»
- «گاهی بعد از انجام یا گفتن چیزی تازه فرصت می‌کنم کامل درباره‌اش فکر کنم.»

The Stage 5 specification requires 3–5 non-clinical Persian starting statements for every canonical Behaviour.

---

# 4. Analysis Pathway

Every behaviour analysis uses one stable structure:

## Step 1 — Observed Situation

What was happening?

Example:

> “I had to prepare a report with several unclear steps.”

---

## Step 2 — Behaviour

Map the observation to one canonical behaviour:

> `BEH1 — Starting`

The interface should explain the mapping rather than claim it is medically meaningful.

---

## Step 3 — Relevant Context

Show Context nodes plausibly relevant to the situation.

Example:

- Task Demand / Complexity
- Stress / Emotional Load
- External Structure

---

## Step 4 — Possible Regulation Mechanisms

Show several supported possibilities.

Example:

- Goal Management
- Emotional Regulation

Language:

> “These systems may be relevant.”

Never:

> “This behaviour is caused by these systems.”

---

## Step 5 — Possible Immediate Consequences

Examples:

- task remains unstarted,
- deadline becomes closer,
- another task receives attention instead.

These are situational consequences, not new canonical nodes.

---

## Step 6 — Possible Recurring Pattern

Only if repetition exists.

Example:

Repeated delayed Starting may contribute to:

`PAT1 — Procrastination`

---

## Step 7 — Possible Functional Impact

Show where repeated difficulty **may** matter:

- Work
- Learning
- Relationships
- Daily Living / Self-Management.

---

## Step 8 — Alternative Explanations

Always show:

> **Similar difficulties can occur for reasons unrelated to ADHD.**

The required analysis sequence explicitly prevents a direct `Behaviour → ADHD` jump.

---

# 5. Upstream Pathway Library

These pathways are educational possibilities.

Allowed language:

- may contribute,
- can influence,
- can increase demand,
- may make the behaviour harder,
- may reduce demand.

Forbidden:

- causes,
- proves,
- explains the person.

This language constraint is explicit in the specification.

---

## BEH1 — Starting

### Pathway A — Complexity / Goal Management

`CTX6 Task Demand / Complexity`

→ may increase demand on

`REG3 Goal Management`

→ which may make

`BEH1 Starting`

more difficult.

---

### Pathway B — Delayed Reward

`CTX5 Reward Salience / Immediacy`

→ interacts with

`REG5 Reward / Delay Processing`

→ which may alter immediate engagement with

`BEH1 Starting`.

---

### Pathway C — Urgency

`CTX4 Urgency / Time Pressure`

→ changes immediacy of consequences through

`REG5 Reward / Delay Processing`

→ which may change likelihood or timing of

`BEH1 Starting`.

This relationship can facilitate or complicate behaviour; it is not uniformly positive.

---

### Pathway D — Stress

`CTX2 Stress / Emotional Load`

→ may increase demand on

`REG6 Emotional Regulation`

→ which may make

`BEH1 Starting`

more difficult in some situations.

---

## BEH2 — Sustaining

### Pathway A — Interruptions

`CTX8 Distraction / Interruptions`

→ increases attentional demand on

`REG1 Attention Regulation`

→ which may make

`BEH2 Sustaining`

less stable.

---

### Pathway B — Sleep / Energy

`CTX1 Sleep / Energy`

→ modulates

`REG1 Attention Regulation`

→ which may influence

`BEH2 Sustaining`.

---

### Pathway C — Task Salience

`CTX3 Task Salience / Interest`

→ can alter engagement-related processing through

`REG5 Reward / Delay Processing`

→ which may influence persistence in

`BEH2 Sustaining`.

---

### Pathway D — Reward Immediacy

`CTX5 Reward Salience / Immediacy`

→ interacts with

`REG5 Reward / Delay Processing`

→ which may influence continued engagement.

---

## BEH3 — Switching Tasks

The frozen ontology provides a narrower canonical explanation here.

### Pathway A — Interruptions requiring reorientation

`CTX8 Distraction / Interruptions`

→ increase switching/reorientation demand on

`REG7 Task Switching`

→ which may make

`BEH3 Switching Tasks`

more difficult.

---

### Pathway B — Repeated interruption context

Repeated interruptions

→ repeatedly recruit

`REG7 Task Switching`

→ which may increase transition burden and make behavioural switching less stable.

This is intentionally a second contextual form of the same canonical Regulation pathway rather than a newly invented mechanism.

---

## BEH4 — Keeping Track

### Pathway A — Complexity

`CTX6 Task Demand / Complexity`

→ increases demand on

`REG2 Working Memory`

→ which may make

`BEH4 Keeping Track`

harder.

---

### Pathway B — Stress / Emotional Load

`CTX2 Stress / Emotional Load`

→ may compete with or increase demand on

`REG2 Working Memory`

→ which may affect Keeping Track.

---

### Pathway C — External Structure as buffer

`CTX7 External Structure`

→ may reduce internal Working Memory demand

→ supporting

`BEH4 Keeping Track`.

---

## BEH5 — Organizing / Sequencing

### Pathway A — Complex task / Goal Management

`CTX6 Task Demand / Complexity`

→ increases demand on

`REG3 Goal Management`

→ which may affect

`BEH5 Organizing / Sequencing`.

---

### Pathway B — Complex task / Working Memory

`CTX6 Task Demand / Complexity`

→ increases demand on

`REG2 Working Memory`

→ which may make maintaining an action sequence harder.

---

### Pathway C — Stress

`CTX2 Stress / Emotional Load`

→ may increase effective demand on

`REG2 Working Memory`

→ which may contribute to difficulty maintaining the sequence.

---

### Pathway D — External Structure

`CTX7 External Structure`

→ may reduce Working Memory and Goal Management demands

→ potentially supporting Organizing / Sequencing.

---

## BEH6 — Completing / Following Through

The frozen ontology intentionally provides a relatively narrow direct canonical pathway.

### Pathway A — Complexity

`CTX6 Task Demand / Complexity`

→ increases demand on

`REG3 Goal Management`

→ which may make

`BEH6 Completing / Following Through`

more difficult.

---

### Pathway B — External Structure

`CTX7 External Structure`

→ may reduce Goal Management demand

→ supporting Following Through.

No additional direct Regulation mechanisms should be invented in MVP merely because completion is intuitively multi-determined.

---

## BEH7 — Pausing / Waiting Before Acting

### Pathway A — Sleep / Energy

`CTX1 Sleep / Energy`

→ may influence

`REG4 Response Inhibition`

→ which may affect

`BEH7 Pausing / Waiting Before Acting`.

---

### Pathway B — Emotional Load

`CTX2 Stress / Emotional Load`

→ increases demand on

`REG6 Emotional Regulation`

→ which may affect the ability to pause during emotionally intense situations.

---

# 6. Context Mapping

The Context Explorer associated with Behaviour Analysis must remain qualitative.

No scores, percentages or predicted performance are allowed.

| BehaviourContext that may make demands higherContext that may reduce demand/support functioning |                                                      |                                                           |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| **Starting**                                                                                    | high complexity, high emotional load, delayed reward | clearer structure, more immediate task relevance          |
| **Sustaining**                                                                                  | interruptions, low energy, competing stimuli         | lower distraction, adequate energy, greater task salience |
| **Switching Tasks**                                                                             | repeated interruptions, frequent forced transitions  | fewer unnecessary transitions                             |
| **Keeping Track**                                                                               | high complexity, stress, many concurrent steps       | external reminders and structure                          |
| **Organizing / Sequencing**                                                                     | ambiguous/complex tasks, emotional load              | explicit steps, external organization                     |
| **Completing / Following Through**                                                              | complex multi-step work                              | external structure and clear sequence                     |
| **Pausing / Waiting**                                                                           | fatigue, emotionally intense situations              | lower emotional load, greater opportunity to pause        |

These statements describe **possible contextual influences**, not predictions.

---

# 7. Alternative Explanation Framework

Every Behaviour Analysis must contain a dedicated section:

> **مشکلات مشابه می‌توانند به دلایلی غیر از ADHD هم اتفاق بیفتند.**

The system does not attempt to determine which alternative applies. It does not perform differential diagnosis. This requirement is explicit.

---

## 7.1 State / physical condition

Possible examples:

- insufficient sleep,
- physical illness,
- fatigue,
- medication or substance effects where relevant.

Safe wording:

> “Current physical state can also affect this behaviour.”

Not:

> “Your difficulty is probably caused by sleep.”

---

## 7.2 Stress and emotional condition

Possible examples:

- acute stress,
- anxiety,
- depression / low mood,
- burnout,
- grief,
- emotional distress.

Safe wording:

> “Stress or emotional difficulties can produce similar patterns.”

Not:

> “This means you have anxiety instead.”

---

## 7.3 Task design and workload

Possible examples:

- unclear task definition,
- excessive workload,
- unrealistic planning,
- excessive complexity.

Safe wording:

> “The structure of the task itself may contribute.”

---

## 7.4 Environment

Possible examples:

- high distraction,
- frequent interruptions,
- competing demands.

Safe wording:

> “Some environments make this behaviour harder even without ADHD.”

---

## 7.5 Skills / knowledge

Possible examples:

- skill gap,
- unfamiliar process,
- insufficient practice.

Safe wording:

> “Difficulty may sometimes reflect missing knowledge or experience rather than a regulation problem.”

---

## 7.6 Motivation / ordinary preference

Possible examples:

- low motivation,
- low personal relevance,
- ordinary dislike of a task,
- competing priorities.

Safe wording:

> “Not every difficult or uninteresting task reflects a clinical problem.”

---

## UI presentation rule

Alternatives should appear as:

**Other possible contributors**

not:

**Other possible diagnoses**

The user should not choose alternatives in order to eliminate them.

No elimination logic.

No likelihood.

No ranking.

---

# 8. Repeated Behaviour → Pattern Rules

## 8.1 Single event

A behaviour occurs once or occasionally.

Example:

> One important task starts late.

Classification:

**Behaviour event**

Not `Procrastination`.

---

## 8.2 Repeated behaviour

The same Behaviour difficulty occurs repeatedly.

Example:

> Important tasks are repeatedly started much later than intended.

Classification:

**Repeated Starting difficulty**

Still not automatically Procrastination.

---

## 8.3 Recurring pattern

A repeated pattern becomes sufficiently stable and consequential to be educationally described by one of the canonical Pattern nodes.

---

## PAT1 — Procrastination

Canonical pathway:

`BEH1 Starting`

→ repeated maladaptive delay

→ `PAT1 Procrastination`

Conditions for educational display:

- delay is repeated,
- action was intended,
- delay is maladaptive or produces meaningful consequences.

The tool must not label one delayed start as procrastination.

---

## PAT2 — Performance Variability

Canonical contributing behaviours include:

- `BEH2 Sustaining`
- `BEH4 Keeping Track`
- `BEH6 Completing / Following Through`

The interface should require variation across occasions or contexts before discussing this as a recurring pattern.

Example:

> “Performance appears much more stable in some contexts than others across repeated situations.”

Not:

> “Today was inconsistent, therefore Performance Variability.”

---

# 9. Functional Impact Mapping

These are **illustrative domain examples**, not additional canonical causal edges.

Difficulty does not automatically equal impairment. This distinction is required by the Stage 5 specification.

| BehaviourWorkLearningRelationshipsDaily Living / Self-Management |                                           |                                      |                                                         |                                                         |
| ---------------------------------------------------------------- | ----------------------------------------- | ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------- |
| **Starting**                                                     | delaying a report                         | delaying study/assignment start      | postponing a shared responsibility                      | putting off paperwork or appointments                   |
| **Sustaining**                                                   | repeatedly drifting during long work      | difficulty remaining with reading    | losing track during long conversations                  | abandoning chores midway                                |
| **Switching Tasks**                                              | slow transition between meetings/projects | difficulty moving between subjects   | difficulty shifting attention when interaction needs it | getting stuck in one activity while another becomes due |
| **Keeping Track**                                                | losing track of action items              | losing place in multi-step material  | forgetting part of an agreed plan                       | forgetting steps in errands or administration           |
| **Organizing / Sequencing**                                      | unclear project execution order           | difficulty structuring an assignment | difficulty coordinating a shared plan                   | trouble ordering several daily tasks                    |
| **Completing / Following Through**                               | unfinished deliverables                   | incomplete assignments               | commitments not carried through                         | administrative or household tasks left incomplete       |
| **Pausing / Waiting**                                            | premature responses in meetings           | answering before fully processing    | interrupting or reacting rapidly                        | impulsive day-to-day decisions                          |

The interface should say:

> “These are possible ways the behaviour could matter if it is frequent enough and consequential enough.”

---

# 10. Standard Analysis Result Format

After the user explores a Behaviour, the result should always follow the same structure.

---

## 10.1 What you selected

Example:

**Starting**

> شروع کردن یک اقدام یا کار موردنظر.

---

## 10.2 What this does not mean

Always visible:

> “Difficulty with this behaviour does not by itself indicate ADHD.”

---

## 10.3 Possible contributing systems

Show only canonical Regulation nodes linked to the selected Behaviour.

Example for Starting:

- Goal Management
- Reward / Delay Processing
- Emotional Regulation

Wording:

> “These systems may contribute in some situations.”

---

## 10.4 Relevant Context

Show Context modifiers relevant to the selected pathways.

Example:

- Task Demand / Complexity
- Stress / Emotional Load
- Urgency / Time Pressure
- External Structure

---

## 10.5 Several possible pathways

Show 2–4 routes where supported.

Example:

**High task complexity**

→ increases Goal Management demand

→ Starting may become harder.

and:

**Delayed reward**

→ interacts with Reward / Delay Processing

→ immediate engagement may be lower.

---

## 10.6 Similar difficulties can occur outside ADHD

Always displayed.

Show broad categories rather than diagnoses or rankings.

---

## 10.7 Possible consequences if repeated

Examples:

- Procrastination,
- Performance Variability where canonical,
- accumulated unfinished work,
- deadline pressure.

Non-canonical immediate consequences must be clearly described as examples rather than nodes.

---

## 10.8 Where this may show up

Display relevant Functional Domains.

---

## 10.9 Scientific caution

Standard wording:

> **This model describes possible relationships found in ADHD research and general human functioning. It cannot determine why a specific person behaves this way, whether they have ADHD, or how severe any difficulty is.**

---

# 11. Complete Worked Examples

---

## Example 1 — Difficulty starting a boring but important task

### Situation

A person knows they need to prepare an important administrative report, but the task feels uninteresting and has several unclear steps.

### Behaviour

`BEH1 — Starting`

The first concrete action is repeatedly delayed.

### Context

Relevant Context may include:

- `CTX3 Task Salience / Interest`
- `CTX6 Task Demand / Complexity`
- `CTX5 Reward Salience / Immediacy`
- `CTX7 External Structure`

### Possible Regulation pathway A

High Task Demand

→ may increase demand on

`REG3 Goal Management`

→ Starting may become harder.

### Possible Regulation pathway B

Low immediate reward salience

→ interacts with

`REG5 Reward / Delay Processing`

→ immediate engagement may be lower.

### Alternative explanations

Similar delay can also occur with:

- fatigue,
- unclear task definition,
- ordinary dislike of the task,
- excessive workload,
- stress,
- low mood.

### Possible recurring pattern

If delayed Starting repeatedly occurs despite intention and creates negative consequences:

`PAT1 — Procrastination`

may become a useful educational description.

### Possible functional consequence

- Work deadlines,
- Daily Living administration.

### Scientific caution

One boring task starting late does not establish either Procrastination as a stable pattern or ADHD.

---

## Example 2 — Frequently losing track during a multi-step task

### Situation

A person is completing a process involving several steps and repeatedly forgets which step was just completed.

### Behaviour

`BEH4 — Keeping Track`

### Context

- `CTX6 Task Demand / Complexity`
- `CTX2 Stress / Emotional Load`
- `CTX7 External Structure`

### Possible Regulation pathway A

High complexity

→ increases Working Memory demand

→ Keeping Track may become harder.

### Possible Regulation pathway B

Stress / emotional load

→ may increase effective Working Memory burden

→ task state may be harder to maintain.

### Possible Regulation pathway C

External Structure

→ may reduce internal Working Memory demand

→ Keeping Track may become easier.

### Alternative explanations

Similar difficulty may occur with:

- insufficient sleep,
- acute stress,
- unfamiliar task structure,
- excessive workload,
- interruptions,
- illness.

### Possible recurring pattern

If performance varies repeatedly according to task load or context:

`PAT2 — Performance Variability`

may become relevant.

### Possible functional consequence

- errors in Work,
- difficulty following Learning material,
- incomplete Daily Living procedures.

### Scientific caution

Keeping Track difficulty is not equivalent to a general memory disorder and is not specific to ADHD.

---

## Example 3 — Starting many tasks but struggling to finish them

### Situation

Several tasks are opened or begun, but a significant number remain incomplete.

### Behaviour

Primary canonical Behaviour:

`BEH6 — Completing / Following Through`

Starting may be functioning adequately; the observable difficulty is completion.

### Context

- `CTX6 Task Demand / Complexity`
- `CTX7 External Structure`

### Possible Regulation pathway A

Complex multi-step work

→ increases Goal Management demand

→ Following Through may become harder.

### Possible Regulation pathway B

External structure

→ may reduce Goal Management burden

→ completion may become more stable.

### Alternative explanations

Similar outcomes can occur with:

- excessive workload,
- unrealistic planning,
- changing priorities,
- unclear definitions of “done,”
- skill gaps,
- fatigue,
- stress.

### Possible recurring pattern

Repeated variation in follow-through may contribute to:

`PAT2 — Performance Variability`

### Possible functional consequence

- unfinished Work,
- incomplete Learning assignments,
- Daily Living responsibilities remaining open,
- unmet shared responsibilities in Relationships.

### Scientific caution

“Many unfinished tasks” does not identify a unique underlying mechanism.

---

## Example 4 — Reacting quickly during an emotionally intense conversation

### Situation

During a stressful discussion, a person speaks or acts before having enough time to reflect.

### Behaviour

`BEH7 — Pausing / Waiting Before Acting`

### Context

- `CTX2 Stress / Emotional Load`
- potentially `CTX1 Sleep / Energy`

### Possible Regulation pathway A

High emotional load

→ increases demand on

`REG6 Emotional Regulation`

→ pausing before responding may become harder.

### Possible Regulation pathway B

Low sleep / energy

→ may affect

`REG4 Response Inhibition`

→ immediate responses may become harder to withhold.

### Alternative explanations

Similar reactions may occur with:

- acute stress,
- anxiety,
- grief,
- interpersonal conflict,
- sleep deprivation,
- ordinary anger or excitement.

### Possible recurring pattern

No additional canonical Pattern is required.

### Possible functional consequence

Most directly:

- Relationships,
- Work interactions.

### Scientific caution

Rapid emotional reaction does not establish ADHD or a specific inhibition deficit.

---

## Example 5 — Functioning very differently depending on deadline pressure

### Situation

A task remains difficult to start when the deadline is distant, while engagement increases sharply when the deadline becomes immediate.

### Behaviour

Primary:

`BEH1 — Starting`

Potentially also:

`BEH2 — Sustaining`

### Context

- `CTX4 Urgency / Time Pressure`
- `CTX5 Reward Salience / Immediacy`

### Possible Regulation pathway

Increasing urgency

→ changes the immediacy of consequences through

`REG5 Reward / Delay Processing`

→ Starting or Sustaining may change.

### Alternative explanations

The same pattern may occur because of:

- ordinary prioritization,
- workload overload,
- unrealistic planning,
- changing priorities,
- low task relevance,
- competing deadlines.

### Possible recurring pattern

Repeated delayed Starting may contribute to:

`PAT1 — Procrastination`.

Repeated changes in performance across deadline conditions may also resemble:

`PAT2 — Performance Variability`.

### Possible functional consequence

- Work,
- Learning,
- Daily Living / Self-Management.

### Scientific caution

Deadline-responsive productivity is not a diagnostic marker and should not be presented as an ADHD-specific rule.

---

## Example 6 — Losing focus in a high-interruption environment

### Situation

A person works in an environment with frequent notifications, questions and task interruptions.

### Behaviour

`BEH2 — Sustaining`

### Context

`CTX8 — Distraction / Interruptions`

### Possible Regulation pathway

High interruption load

→ increases demand on

`REG1 Attention Regulation`

→ Sustaining may become less stable.

A secondary issue may arise when interruptions require repeated transitions:

`CTX8`

→ increased demand on

`REG7 Task Switching`

→ `BEH3 Switching Tasks`

may also become harder.

### Alternative explanations

Similar difficulty occurs commonly under:

- high environmental distraction,
- fatigue,
- stress,
- excessive workload,
- poor task design,
- insufficient opportunity for uninterrupted work.

### Possible recurring pattern

Repeated unstable engagement may contribute to:

`PAT2 — Performance Variability`.

### Possible functional consequence

- Work productivity,
- Learning continuity,
- Daily Living task completion.

### Scientific caution

Difficulty maintaining attention in a highly interruptive environment is not specific to ADHD.

The six worked cases above correspond to the required Stage 5 example set.

---

# 12. Behaviour Explorer Interaction Model

The interaction follows:

**Entry Statement**

↓

**Canonical Behaviour**

↓

**Relevant Context**

↓

**Possible Regulation Pathways**

↓

**Pattern / Functional Impact**

↓

**Scientific Explanation**

This sequence is required by the Behaviour Explorer specification.

---

## 12.1 Entry

User sees natural-language statements grouped by Behaviour.

Example:

> «می‌دونم باید این کار رو انجام بدم ولی شروعش نمی‌کنم.»

No checkbox list.

No “select all that apply.”

Selecting the statement opens the Behaviour, not a profile.

---

## 12.2 Behaviour mapping

The interface shows:

> **This example relates to: Starting**

Then immediately:

> “This behaviour can occur for many reasons and is not specific to ADHD.”

---

## 12.3 Initial focused state

Show only:

- selected Behaviour,
- its directly relevant Regulation nodes,
- its most relevant Context nodes.

Hide:

- unrelated behaviours,
- unrelated Regulation systems,
- most Functional Domains,
- advanced scientific detail.

This prevents cognitive overload.

---

## 12.4 Pathway selection

Several possible pathways are displayed as separate cards or tracks.

Example:

**Path A**

Complex task
→ Goal Management demand
→ Starting may become harder

**Path B**

Delayed reward
→ Reward / Delay Processing
→ immediate engagement may change

The user switches between pathways.

They do not rank them.

---

## 12.5 Context exploration

Selecting a Context node reveals qualitative wording:

- may increase demand,
- may reduce demand,
- may interfere,
- may support,
- effect can vary.

No slider produces a performance prediction.

---

## 12.6 Downstream expansion

After upstream exploration, the user may expand:

**If this repeats over time...**

This reveals:

- relevant Recurring Pattern if canonical,
- possible Functional Domains.

This wording reinforces the distinction between one event and a repeated pattern.

---

## 12.7 Alternative explanations

Displayed before the final scientific explanation.

Not hidden behind “More.”

Reason:

The user should encounter non-ADHD possibilities before interpreting the pathway medically.

---

## 12.8 Scientific detail

Optional deeper layer includes:

- Regulation definition,
- Context relationship,
- evidence level,
- scientific caution,
- distinction from formal diagnostic criteria.

---

## 12.9 Uncertainty display

Every pathway uses a persistent language marker:

**Possible pathway**

not:

**Explanation**

Edge descriptions use:

- may,
- can,
- associated,
- may increase demand.

---

## 12.10 Return to overview

A persistent action:

**Explore another behaviour**

returns to the seven canonical Behaviour entry points.

It does not preserve a cumulative symptom profile.

---

## 12.11 Mobile interaction

Mobile flow should be sequential:

**Entry statement**

↓

**Behaviour summary**

↓

**Possible pathways**

↓

**Context**

↓

**Repeated-pattern consequences**

↓

**Alternative explanations**

↓

**Scientific caution**

Only one pathway should be expanded at a time.

No dense node-link graph is required on small screens.

---

# 13. Scientific / Diagnostic Guardrails

These rules are mandatory.

The Stage 5 specification explicitly requires behaviour-level safety boundaries including non-diagnostic interpretation, multiple mechanisms, contextual alternatives and no presentation inference.

## Rule 1 — Behaviour does not establish ADHD

No Behaviour node or combination of behaviours is diagnostic.

---

## Rule 2 — Multiple mechanisms may contribute

The interface must never select one Regulation mechanism as “the reason.”

---

## Rule 3 — Context can create similar difficulties without ADHD

Context is not merely an ADHD amplifier.

It affects human performance generally.

---

## Rule 4 — Associated mechanisms are not diagnostic criteria

Examples:

- Working Memory,
- Goal Management,
- Response Inhibition,
- Reward / Delay Processing,
- Emotional Regulation

must never be visually presented as ADHD criteria.

---

## Rule 5 — Repeated patterns are different from isolated events

One late start ≠ Procrastination.

One variable day ≠ Performance Variability.

---

## Rule 6 — Functional impairment belongs to clinical assessment

The educational tool may illustrate functional domains.

It must not decide whether impairment is clinically significant.

---

## Rule 7 — Never infer ADHD presentation

The Behaviour Explorer cannot infer:

- Predominantly Inattentive Presentation,
- Predominantly Hyperactive-Impulsive Presentation,
- Combined Presentation.

Presentations belong only to the separate Clinical Education view.

---

## Rule 8 — No user-entered behaviour produces a medical conclusion

Forbidden outputs:

- “You have ADHD.”
- “This suggests ADHD.”
- “High likelihood of ADHD.”
- “Moderate ADHD.”
- “Your type is inattentive.”
- “This means your working memory is impaired.”

---

## Rule 9 — Never count behavioural selections

The entry library is not a screening questionnaire.

Selections must not accumulate into:

- totals,
- percentages,
- severity bars,
- profile charts.

---

## Rule 10 — Alternative explanations are educational, not diagnostic

Do not ask:

> “Could this instead be depression?”

Do not rank conditions.

Do not eliminate possible explanations.

---

## Rule 11 — Context effects remain probabilistic

Do not predict:

> “If sleep improves, attention will improve by X.”

Use:

> “Sleep can influence attentional stability.”

---

## Rule 12 — Mechanism labels require epistemic separation

The UI should explicitly label Regulation nodes as:

**Associated explanatory process**

not:

**ADHD mechanism**

unless future scientific evidence justifies stronger terminology.

---

# 14. Open Questions

## Q1 — Should every Behaviour require exactly two upstream pathways?

**Recommendation: No.**

The frozen ontology provides unequal canonical evidence and connectivity.

Forcing equal pathway counts would encourage invented relationships.

---

## Q2 — Should Behaviour difficulty have binary states?

Example:

- functioning well,
- difficulty.

**Recommendation: only in educational examples, not as user scoring states.**

No toggle should imply clinical severity.

---

## Q3 — Should users enter free text?

Potentially Phase 2.

Risk:

Free-text interpretation can easily drift toward personalized psychological assessment.

MVP should use curated entry statements.

---

## Q4 — Should alternative explanations be customised per Behaviour?

Yes, but only through curated relevance.

No algorithm should infer which explanation is most likely.

---

## Q5 — Should `Performance Variability` be shown whenever a Behaviour varies?

No.

It should require an explicit repeated-across-time/context framing.

---

## Q6 — Should Starting and Completing be combined for simplicity?

No.

They are behaviourally distinct and already frozen as separate canonical nodes.

---

## Q7 — Should Pausing / Waiting map directly to clinical Impulsivity?

No.

The distinction between:

`REG4 Response Inhibition`

`BEH7 Pausing / Waiting`

and formal clinical `Hyperactivity–Impulsivity`

must remain visible.

---

# 15. Data Requirements for Implementation

No frontend architecture or TypeScript model is defined here.

This section specifies only the **information that the future data model must be capable of storing**.

---

## 15.1 Canonical Behaviour record

For each of the seven behaviours:

- stable canonical ID,
- canonical English name,
- Persian display name,
- plain-language definition,
- examples,
- functioning-well examples,
- difficulty examples,
- “does not prove” cautions,
- linked canonical Regulation IDs,
- linked Context IDs,
- linked Pattern IDs,
- relevant Functional Domain IDs,
- scientific caution text.

---

## 15.2 Entry Statement record

Required data:

- stable statement ID,
- Behaviour ID,
- language,
- statement text,
- optional situation category,
- active/inactive publication status.

No score value.

No diagnostic weight.

---

## 15.3 Educational Pathway record

Required:

- stable pathway ID,
- Behaviour ID,
- ordered canonical Context IDs where applicable,
- Regulation ID,
- qualitative relationship wording,
- evidence level,
- pathway explanation,
- scientific caution,
- whether the pathway is MVP or Advanced.

No probability.

No strength percentage.

---

## 15.4 Context Mapping record

Required:

- Behaviour ID,
- Context ID,
- qualitative role:
  - increases-demand,
  - interfering,
  - buffering,
  - variable,
- plain-language explanation,
- evidence status.

---

## 15.5 Repeated Pattern rule

Required:

- Behaviour ID,
- Pattern ID,
- repetition requirement,
- plain-language threshold wording,
- single-event caution,
- examples.

This is conceptual logic, not diagnostic thresholding.

---

## 15.6 Functional Example record

Required:

- Behaviour ID,
- Functional Domain ID,
- example text,
- conditional-impact wording.

These examples must remain illustrative.

---

## 15.7 Alternative Explanation record

Required:

- broad category,
- display label,
- example explanations,
- safe wording,
- Behaviour relevance,
- caution against differential diagnosis.

---

## 15.8 Evidence metadata

For every Regulation pathway:

- evidence level,
- epistemic status,
- supporting research references,
- caution,
- last review date.

Evidence metadata should be maintained separately from visual wording so scientific review does not require redesigning the UX copy.

---

## 15.9 Safety copy

The future implementation requires reusable text for:

- initial disclaimer,
- behaviour disclaimer,
- alternative-explanation reminder,
- repeated-pattern caution,
- functional-impact caution,
- scientific-detail caution.

These messages should be centrally managed.

---

## 15.10 Session interaction state

The application may temporarily track:

- currently selected Behaviour,
- currently selected pathway,
- active Context exploration,
- expanded scientific detail.

It does **not** require a persistent ADHD score or behavioural profile.

---

## 15.11 Prohibited data fields

The future data model should not contain fields such as:

- `adhdLikelihood`
- `severityScore`
- `presentationPrediction`
- `diagnosticConfidence`
- `symptomScore`
- `mechanismProbability`
- `treatmentRecommendation`

Their absence at the data-model level provides a stronger safety boundary than merely hiding them in the UI.

---

# Final Framework

The canonical educational analysis pattern is:

**Observed situation**

↓

**Canonical Behaviour**

↓

**Several relevant Context conditions**

↓

**One or more plausible Regulation pathways**

↓

**Immediate behavioural consequences**

↓

**Repeated behaviour, where applicable**

↓

**Procrastination / Performance Variability, where justified**

↓

**Possible Functional Domains**

↓

**Alternative non-ADHD explanations**

↓

**Scientific caution**

The key interpretive rule is:

> **A Behaviour is something to explore, not something to diagnose from.**

The system should make it easy to understand several possible pathways while making it impossible to derive an ADHD score or medical conclusion from those pathways.

BEHAVIOUR MODEL STATUS: READY FOR DATA MODEL