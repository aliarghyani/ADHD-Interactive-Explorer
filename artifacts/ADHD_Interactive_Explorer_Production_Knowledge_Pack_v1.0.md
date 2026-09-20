# ADHD Interactive Explorer — Production Knowledge Pack v1.0
**Stage:** 7.2 — Production Knowledge Gap Closure  
**Release date:** 2026-09-20  
**Purpose:** Production-readiness completion of frozen ADHD educational knowledge inputs required to resume WP-02.  
**Governance rule:** This package does **not** redesign the frozen ontology, canonical scientific meaning, Product Architecture, or Engineering Architecture.
> **Authoritative boundary.** Canonical scientific identity remains the frozen model. This pack adds deterministic production IDs, faithful bilingual content, real source provenance, and reviewed evidence metadata. Evidence review does not silently add, delete, reverse, or strengthen a canonical edge.
## 1. Release Manifest
| Field | Value | Meaning |
|---|---|---|
| `schemaVersion` | `1.0.0` | Production-pack schema contract revision; technical, not scientific. |
| `ontologyVersion` | `1.0.1` | Frozen ontology/count-corrected release; canonical structure unchanged by this pack. |
| `visualGrammarVersion` | `1.0.1` | Frozen visual grammar/count-corrected release. |
| `behaviourFrameworkVersion` | `1.0.0` | Frozen Behaviour Analysis Framework. |
| `contentModelVersion` | `1.0.0` | Frozen Machine-Readable Knowledge Model contract. |
| `evidenceReviewVersion` | `1.1.0` | New evidence/source review completed on 2026-09-20. |
| `knowledgeReleaseId` | `ADHD-KNOWLEDGE-2026-09-20-R1` | Stable non-semantic technical release identity. |
| Supported languages | `en`, `fa` | Mandatory MVP localization set. |
| Publication status | `reviewed-production` | Ready for WP-02 contract ingestion, subject to the invariants in this document. |
The `knowledgeReleaseId` intentionally carries only a date and release counter. It does not imply a new ontology, evidence theory, or diagnostic-science version. `evidenceReviewVersion` advances from the prior `1.0.0` meaning because this closure stage materially reviews and changes the source set and evidence metadata; the ontology and content-model versions remain frozen.
## 2. Gap Resolution Register
| WP-02 gap | Category | Authoritative upstream source | New research? | Completion method | Risk if filled incorrectly |
|---|---|---|---|---|---|
| No authoritative knowledgeReleaseId | A | Knowledge Handoff versioning + Stage 7.2 packaging requirements | No | Assign stable non-semantic package ID and release date. | Could falsely imply a new scientific ontology version or make bundles non-reproducible. |
| No complete stable edge-ID registry | A | Knowledge Handoff v1.0.1 canonical 49-edge registry | No | Deterministically assign IDs from frozen source, target, and relationship type. | Wrong IDs could break referential integrity or silently create/lose canonical edges. |
| Incomplete SourceReference registry | C | Frozen evidence requirements + fresh authoritative/peer-reviewed research | Yes | Verify current authoritative guidance and peer-reviewed review/meta-analysis metadata; register stable source IDs. | Fake, stale, or weak references could give unsupported scientific authority. |
| Incomplete EvidenceMetadata registry | C | Ontology/Handoff epistemic model + fresh source review | Yes | Create reusable construct-level evidence records with levels, limitations, sources, date, and reviewVersion. | Overstated evidence could turn explanatory constructs into pseudo-diagnostic claims. |
| Unresolved example source IDs such as SRC_EXEC_REVIEW | C | Machine-Readable Knowledge Model example dataset + real SourceReference registry | Yes | Remove example placeholders and replace record-by-record with real source IDs; do not create one fake one-to-one substitute. | Placeholder IDs could ship as if bibliographically real. |
| Incomplete evidence review metadata | C | Machine-Readable Knowledge Model evidence contract | Yes | Set actual closure-stage review date and evidenceReviewVersion after genuine source review. | Fabricated dates or stale review status would undermine auditability. |
| Incomplete bilingual pathway explanations | B | Behaviour Analysis Framework upstream pathway library | No | Faithful EN/FA localization of approved pathways; preserve uncertainty language. | Translation could accidentally strengthen 'may' into causal certainty. |
| Incomplete Persian Context-mapping explanations | B | Behaviour Framework Context Mapping + canonical chains | No | Translate/structure approved qualitative mappings only. | Could create predictive or unsupported direct Context→Behaviour claims. |
| Incomplete Persian Pattern-rule content | B | Behaviour Framework pattern rules + Handoff PAT1/PAT2 cautions | No | Faithful Persian threshold/caution/example content. | Could turn conceptual repetition into a diagnostic threshold. |
| Incomplete Persian Functional examples | B | Behaviour Framework Functional Impact Mapping | No | Translate all approved illustrative domain examples with conditional wording. | Could imply clinically significant impairment or create new causal edges. |
| Incomplete Persian Alternative Explanation content | B | Behaviour Framework Alternative Explanation Framework | No | Localize approved broad contributor categories and safe wording. | Could become differential diagnosis or condition ranking. |
| Incomplete Persian Feedback-loop content | B | Handoff feedback-loop model | No | Faithfully localize the two frozen educational loops and their cautions. | Could imply deterministic causality or treatment advice. |
| Incomplete bilingual Presentation Education content | B | Handoff Clinical Anchor/presentation rules + current clinical terminology sources | No for translation; evidence verified under C | Create EN/FA records referencing CA1/CA2 only and presentation safety copy. | Could let Behaviour Explorer imply a clinical presentation. |
| Missing English Behaviour entry statements | B | Finalized Persian representative statements in Handoff | No | Create faithful plain-language English equivalents with stable statement IDs. | Could change behavioural meaning or turn entry statements into screening items. |

**Category key:** A = deterministic packaging; B = derivable content; C = evidence gap requiring scientific verification. Category C was never filled by translation or unsupported inference.
## 3. Canonical Node Registry
Exactly **30** frozen canonical nodes are retained. No node is added, merged, renamed, or repurposed.
| ID | Category | Canonical name | Persian label | Frozen evidence/status | Definition | EvidenceMetadata |
|---|---|---|---|---|---|---|
| `CA1` | Clinical Anchor | Inattention | بی‌توجهی | Clinical / formal | Formal ADHD symptom domain involving persistent inattentive symptoms. | `EVID_CLINICAL_ANCHORS` |
| `CA2` | Clinical Anchor | Hyperactivity–Impulsivity | بیش‌فعالی–تکانشگری | Clinical / formal | Formal ADHD symptom domain involving hyperactive and/or impulsive symptoms. | `EVID_CLINICAL_ANCHORS` |
| `CTX1` | Context | Sleep / Energy | خواب / انرژی | Strong non-specific | Current sleep, fatigue, and available energy. | `EVID_SLEEP_CONTEXT` |
| `CTX2` | Context | Stress / Emotional Load | استرس / بار هیجانی | Moderate | Psychological or emotional demand competing with regulatory resources. | `EVID_STRESS_CONTEXT` |
| `CTX3` | Context | Task Salience / Interest | برجستگی / جذابیت کار | Moderate | Degree to which a task captures interest, relevance, or meaning. | `EVID_SALIENCE_REWARD_CONTEXT` |
| `CTX4` | Context | Urgency / Time Pressure | فوریت / فشار زمانی | Moderate | Immediacy of deadline or consequence. | `EVID_SALIENCE_REWARD_CONTEXT` |
| `CTX5` | Context | Reward Salience / Immediacy | برجستگی / فوریت پاداش | Moderate | Prominence and temporal proximity of expected outcomes. | `EVID_SALIENCE_REWARD_CONTEXT` |
| `CTX6` | Context | Task Demand / Complexity | تقاضا / پیچیدگی کار | Strong non-specific | Cognitive and organizational demand imposed by a task. | `EVID_TASK_COMPLEXITY` |
| `CTX7` | Context | External Structure | ساختار بیرونی | Moderate | Organization supplied through routines, reminders, deadlines, or guidance. | `EVID_EXTERNAL_STRUCTURE` |
| `CTX8` | Context | Distraction / Interruptions | حواس‌پرتی / وقفه‌ها | Strong non-specific | Competing stimuli or events disrupting ongoing activity. | `EVID_INTERRUPTION_CONTEXT` |
| `REG1` | Regulation | Attention Regulation | تنظیم توجه | Strong associated | Allocation, maintenance, and redirection of task-relevant attention. | `EVID_ATTENTION_REGULATION` |
| `REG2` | Regulation | Working Memory | حافظهٔ کاری | Strong associated | Temporary maintenance and manipulation of information required for action. | `EVID_WORKING_MEMORY` |
| `REG3` | Regulation | Goal Management | مدیریت هدف | Strong–Moderate associated | Planning, sequencing, and prioritizing actions toward a goal. | `EVID_GOAL_MANAGEMENT` |
| `REG4` | Regulation | Response Inhibition | مهار پاسخ | Strong associated | Suppressing or stopping a prepotent response. | `EVID_RESPONSE_INHIBITION` |
| `REG5` | Regulation | Reward / Delay Processing | پردازش پاداش / تأخیر | Strong–Moderate associated | How reward value and delay affect engagement and choice. | `EVID_REWARD_DELAY` |
| `REG6` | Regulation | Emotional Regulation | تنظیم هیجان | Strong association | Modulation of emotional intensity, duration, and expression. | `EVID_EMOTIONAL_REGULATION` |
| `REG7` | Regulation | Task Switching | جابه‌جایی بین کارها | Moderate associated | Transition between task sets, goals, or rules. | `EVID_TASK_SWITCHING` |
| `BEH1` | Behaviour | Starting | شروع کردن | Descriptive | Beginning an intended action. | Pathway-linked; descriptive node |
| `BEH2` | Behaviour | Sustaining | ادامه دادن | Descriptive / strongly relevant | Maintaining goal-directed activity over time. | Pathway-linked; descriptive node |
| `BEH3` | Behaviour | Switching Tasks | تغییر کار | Descriptive | Moving from one active task or goal to another. | Pathway-linked; descriptive node |
| `BEH4` | Behaviour | Keeping Track | پیگیری / در ذهن نگه‌داشتن | Descriptive | Maintaining awareness of relevant steps, intentions, and commitments. | Pathway-linked; descriptive node |
| `BEH5` | Behaviour | Organizing / Sequencing | سازمان‌دهی / ترتیب‌دادن | Descriptive | Ordering actions, materials, or information into a workable sequence. | Pathway-linked; descriptive node |
| `BEH6` | Behaviour | Completing / Following Through | تکمیل / پیگیری تا پایان | Descriptive | Carrying an intended action through to its endpoint. | Pathway-linked; descriptive node |
| `BEH7` | Behaviour | Pausing / Waiting Before Acting | مکث / صبر پیش از عمل | Descriptive | Delaying or withholding an immediate response when required. | Pathway-linked; descriptive node |
| `PAT1` | Pattern | Procrastination | اهمال‌کاری | Moderate associated | Repeated maladaptive delay of intended action. | `EVID_PROCRASTINATION_PATTERN` |
| `PAT2` | Pattern | Performance Variability | نوسان عملکرد | Strong experimental / Moderate broad real-world | Variation in performance or engagement across time or context. | `EVID_PERFORMANCE_VARIABILITY_EXPERIMENTAL`, `EVID_PERFORMANCE_VARIABILITY_EVERYDAY` |
| `FUN1` | Functional Domain | Work | کار | Functional domain | Occupational functioning. | `EVID_FUNCTIONAL_DOMAINS` |
| `FUN2` | Functional Domain | Learning | یادگیری | Functional domain | Educational and learning functioning. | `EVID_FUNCTIONAL_DOMAINS` |
| `FUN3` | Functional Domain | Relationships | روابط | Functional domain | Interpersonal functioning. | `EVID_FUNCTIONAL_DOMAINS` |
| `FUN4` | Functional Domain | Daily Living / Self-Management | زندگی روزمره / خودمدیریتی | Functional domain | Everyday routines and personal management. | `EVID_FUNCTIONAL_DOMAINS` |

Clinical Anchors remain formal symptom domains. Regulation nodes remain explanatory/associated constructs rather than criteria. Behaviour nodes remain observable educational entry points. Functional Domains do not themselves assert clinically significant impairment.
## 4. Stable Edge Registry
**ID convention:** `EDGE_<SOURCE>_<TARGET>_<TYPE>`. Relationship type is included even though the current source/target pairs are unique, because it protects long-term referential safety if a future governed ontology revision permits a second semantic relationship between the same endpoints. Ordering below is deterministic and follows the frozen registry: Context→Regulation, Regulation→Behaviour, Behaviour→Pattern, Behaviour/Pattern→Functional Domain, Feedback.
| # | Stable edge ID | Source | Target | Relationship type | Frozen meaning |
|---:|---|---|---|---|---|
| 1 | `EDGE_CTX1_REG1_MODULATES` | `CTX1` | `REG1` | `MODULATES` | Sleep / Energy modulates Attention Regulation |
| 2 | `EDGE_CTX1_REG4_MODULATES` | `CTX1` | `REG4` | `MODULATES` | Sleep / Energy modulates Response Inhibition |
| 3 | `EDGE_CTX2_REG1_MODULATES` | `CTX2` | `REG1` | `MODULATES` | Stress / Emotional Load modulates Attention Regulation |
| 4 | `EDGE_CTX2_REG2_MODULATES` | `CTX2` | `REG2` | `MODULATES` | Stress / Emotional Load modulates Working Memory |
| 5 | `EDGE_CTX2_REG6_MODULATES` | `CTX2` | `REG6` | `MODULATES` | Stress / Emotional Load modulates Emotional Regulation |
| 6 | `EDGE_CTX3_REG1_MODULATES` | `CTX3` | `REG1` | `MODULATES` | Task Salience / Interest modulates Attention Regulation |
| 7 | `EDGE_CTX3_REG5_MODULATES` | `CTX3` | `REG5` | `MODULATES` | Task Salience / Interest modulates Reward / Delay Processing |
| 8 | `EDGE_CTX4_REG5_MODULATES` | `CTX4` | `REG5` | `MODULATES` | Urgency / Time Pressure modulates Reward / Delay Processing |
| 9 | `EDGE_CTX5_REG5_MODULATES` | `CTX5` | `REG5` | `MODULATES` | Reward Salience / Immediacy modulates Reward / Delay Processing |
| 10 | `EDGE_CTX6_REG2_MODULATES` | `CTX6` | `REG2` | `MODULATES` | Task Demand / Complexity increases Working Memory demand |
| 11 | `EDGE_CTX6_REG3_MODULATES` | `CTX6` | `REG3` | `MODULATES` | Task Demand / Complexity increases Goal Management demand |
| 12 | `EDGE_CTX7_REG2_MODULATES` | `CTX7` | `REG2` | `MODULATES` | External Structure may buffer Working Memory demand |
| 13 | `EDGE_CTX7_REG3_MODULATES` | `CTX7` | `REG3` | `MODULATES` | External Structure may buffer Goal Management demand |
| 14 | `EDGE_CTX8_REG1_MODULATES` | `CTX8` | `REG1` | `MODULATES` | Distraction / Interruptions interferes with Attention Regulation |
| 15 | `EDGE_CTX8_REG7_MODULATES` | `CTX8` | `REG7` | `MODULATES` | Distraction / Interruptions increases Task Switching demand |
| 16 | `EDGE_REG1_BEH2_CONTRIBUTES_TO` | `REG1` | `BEH2` | `CONTRIBUTES_TO` | Attention Regulation contributes to Sustaining |
| 17 | `EDGE_REG2_BEH4_CONTRIBUTES_TO` | `REG2` | `BEH4` | `CONTRIBUTES_TO` | Working Memory contributes to Keeping Track |
| 18 | `EDGE_REG2_BEH5_CONTRIBUTES_TO` | `REG2` | `BEH5` | `CONTRIBUTES_TO` | Working Memory contributes to Organizing / Sequencing |
| 19 | `EDGE_REG3_BEH1_CONTRIBUTES_TO` | `REG3` | `BEH1` | `CONTRIBUTES_TO` | Goal Management contributes to Starting |
| 20 | `EDGE_REG3_BEH5_CONTRIBUTES_TO` | `REG3` | `BEH5` | `CONTRIBUTES_TO` | Goal Management contributes to Organizing / Sequencing |
| 21 | `EDGE_REG3_BEH6_CONTRIBUTES_TO` | `REG3` | `BEH6` | `CONTRIBUTES_TO` | Goal Management contributes to Completing / Following Through |
| 22 | `EDGE_REG4_BEH7_CONTRIBUTES_TO` | `REG4` | `BEH7` | `CONTRIBUTES_TO` | Response Inhibition contributes to Pausing / Waiting |
| 23 | `EDGE_REG5_BEH1_CONTRIBUTES_TO` | `REG5` | `BEH1` | `CONTRIBUTES_TO` | Reward / Delay Processing contributes to Starting |
| 24 | `EDGE_REG5_BEH2_CONTRIBUTES_TO` | `REG5` | `BEH2` | `CONTRIBUTES_TO` | Reward / Delay Processing contributes to Sustaining |
| 25 | `EDGE_REG6_BEH1_CONTRIBUTES_TO` | `REG6` | `BEH1` | `CONTRIBUTES_TO` | Emotional Regulation contributes to Starting |
| 26 | `EDGE_REG6_BEH7_CONTRIBUTES_TO` | `REG6` | `BEH7` | `CONTRIBUTES_TO` | Emotional Regulation contributes to Pausing / Waiting |
| 27 | `EDGE_REG7_BEH3_CONTRIBUTES_TO` | `REG7` | `BEH3` | `CONTRIBUTES_TO` | Task Switching contributes to Switching Tasks |
| 28 | `EDGE_BEH1_PAT1_CONTRIBUTES_TO` | `BEH1` | `PAT1` | `CONTRIBUTES_TO` | BEH1 may contribute to recurring PAT1 when the pattern criteria are met |
| 29 | `EDGE_BEH2_PAT2_CONTRIBUTES_TO` | `BEH2` | `PAT2` | `CONTRIBUTES_TO` | BEH2 may contribute to recurring PAT2 when the pattern criteria are met |
| 30 | `EDGE_BEH4_PAT2_CONTRIBUTES_TO` | `BEH4` | `PAT2` | `CONTRIBUTES_TO` | BEH4 may contribute to recurring PAT2 when the pattern criteria are met |
| 31 | `EDGE_BEH6_PAT2_CONTRIBUTES_TO` | `BEH6` | `PAT2` | `CONTRIBUTES_TO` | BEH6 may contribute to recurring PAT2 when the pattern criteria are met |
| 32 | `EDGE_BEH4_FUN1_CONTRIBUTES_TO` | `BEH4` | `FUN1` | `CONTRIBUTES_TO` | BEH4 may contribute to difficulty within FUN1 |
| 33 | `EDGE_BEH4_FUN4_CONTRIBUTES_TO` | `BEH4` | `FUN4` | `CONTRIBUTES_TO` | BEH4 may contribute to difficulty within FUN4 |
| 34 | `EDGE_BEH5_FUN1_CONTRIBUTES_TO` | `BEH5` | `FUN1` | `CONTRIBUTES_TO` | BEH5 may contribute to difficulty within FUN1 |
| 35 | `EDGE_BEH5_FUN2_CONTRIBUTES_TO` | `BEH5` | `FUN2` | `CONTRIBUTES_TO` | BEH5 may contribute to difficulty within FUN2 |
| 36 | `EDGE_BEH6_FUN1_CONTRIBUTES_TO` | `BEH6` | `FUN1` | `CONTRIBUTES_TO` | BEH6 may contribute to difficulty within FUN1 |
| 37 | `EDGE_BEH6_FUN2_CONTRIBUTES_TO` | `BEH6` | `FUN2` | `CONTRIBUTES_TO` | BEH6 may contribute to difficulty within FUN2 |
| 38 | `EDGE_BEH6_FUN4_CONTRIBUTES_TO` | `BEH6` | `FUN4` | `CONTRIBUTES_TO` | BEH6 may contribute to difficulty within FUN4 |
| 39 | `EDGE_BEH7_FUN3_CONTRIBUTES_TO` | `BEH7` | `FUN3` | `CONTRIBUTES_TO` | BEH7 may contribute to difficulty within FUN3 |
| 40 | `EDGE_PAT1_FUN1_CONTRIBUTES_TO` | `PAT1` | `FUN1` | `CONTRIBUTES_TO` | PAT1 may contribute to difficulty within FUN1 |
| 41 | `EDGE_PAT1_FUN2_CONTRIBUTES_TO` | `PAT1` | `FUN2` | `CONTRIBUTES_TO` | PAT1 may contribute to difficulty within FUN2 |
| 42 | `EDGE_PAT1_FUN4_CONTRIBUTES_TO` | `PAT1` | `FUN4` | `CONTRIBUTES_TO` | PAT1 may contribute to difficulty within FUN4 |
| 43 | `EDGE_PAT2_FUN1_CONTRIBUTES_TO` | `PAT2` | `FUN1` | `CONTRIBUTES_TO` | PAT2 may contribute to difficulty within FUN1 |
| 44 | `EDGE_PAT2_FUN2_CONTRIBUTES_TO` | `PAT2` | `FUN2` | `CONTRIBUTES_TO` | PAT2 may contribute to difficulty within FUN2 |
| 45 | `EDGE_PAT1_CTX4_FEEDBACK_WITH` | `PAT1` | `CTX4` | `FEEDBACK_WITH` | Procrastination / Urgency feedback |
| 46 | `EDGE_FUN1_CTX2_FEEDBACK_WITH` | `FUN1` | `CTX2` | `FEEDBACK_WITH` | Work difficulty / Stress feedback |
| 47 | `EDGE_FUN2_CTX2_FEEDBACK_WITH` | `FUN2` | `CTX2` | `FEEDBACK_WITH` | Learning difficulty / Stress feedback |
| 48 | `EDGE_FUN3_CTX2_FEEDBACK_WITH` | `FUN3` | `CTX2` | `FEEDBACK_WITH` | Relationship difficulty / Stress feedback |
| 49 | `EDGE_FUN4_CTX2_FEEDBACK_WITH` | `FUN4` | `CTX2` | `FEEDBACK_WITH` | Daily-life difficulty / Stress feedback |

**Integrity count:** 49/49 canonical edges registered. No invented edge. `CONTRIBUTES_TO` remains probabilistic and neither necessary nor sufficient. `FEEDBACK_WITH` remains a possible reciprocal influence, never an inevitable loop.
## 5. Behaviour Entry Library
Each record is a navigation statement, not a screening item. The approved Persian representative statement is preserved; English is a faithful plain-language equivalent.
| Statement ID | Behaviour | Persian — approved | English — derived equivalent | Publication status |
|---|---|---|---|---|
| `BES_BEH1_01` | `BEH1` | «می‌دونم باید این کار رو انجام بدم، ولی شروع اولین قدمش مدام عقب می‌افته.» | I know I need to do this, but I keep putting off taking the first step. | `active` |
| `BES_BEH2_01` | `BEH2` | «کار رو شروع می‌کنم ولی بعد از مدتی ذهنم میره سراغ چیز دیگه.» | I start the task, but after a while my mind drifts to something else. | `active` |
| `BES_BEH3_01` | `BEH3` | «وقتی باید از یک کار برم سراغ کار بعدی، تغییر حالت برام زمان می‌بره.» | When I need to move from one task to the next, it takes me time to shift gears. | `active` |
| `BES_BEH4_01` | `BEH4` | «وسط یک کار چندمرحله‌ای گاهی یادم میره دقیقاً کجای کار بودم.» | In the middle of a multi-step task, I sometimes forget exactly where I was. | `active` |
| `BES_BEH5_01` | `BEH5` | «وقتی یک کار چند مرحله داره، مشخص کردن ترتیب درست مراحل برام سخت میشه.» | When a task has several steps, it can be hard for me to work out the right order. | `active` |
| `BES_BEH6_01` | `BEH6` | «چند کار رو شروع می‌کنم ولی بردنشون تا مرحله‌ی پایان سخت میشه.» | I start several tasks, but getting them all the way to the finish can be difficult. | `active` |
| `BES_BEH7_01` | `BEH7` | «گاهی قبل از اینکه فرصت فکر کردن داشته باشم واکنش نشون میدم.» | Sometimes I react before I have had a chance to think. | `active` |

No score, symptom weight, severity value, threshold contribution, or diagnostic weight attaches to these statements.
## 6. Educational Pathways
The registry below contains the complete MVP upstream pathway set structured from the frozen Behaviour Framework. Unequal pathway counts are intentional. `PATH_BEH3_REPEATED_INTERRUPTION` is explicitly a second educational framing of the same canonical CTX8→REG7→BEH3 chain, not a new mechanism. The frozen BEH5 External Structure wording referenced both Working Memory and Goal Management; it is split into two ordered records so every production pathway resolves to canonical edges without inventing a multi-target pseudo-edge.
### `PATH_BEH1_COMPLEXITY_GOAL` — Complexity / Goal Management / پیچیدگی / مدیریت هدف

- **Behaviour:** `BEH1`
- **Ordered nodes:** `CTX6` → `REG3` → `BEH1`
- **Canonical edges:** `EDGE_CTX6_REG3_MODULATES`, `EDGE_REG3_BEH1_CONTRIBUTES_TO`
- **EN:** Higher task demand or complexity may increase Goal Management demand, which may make Starting more difficult.
- **FA:** تقاضا یا پیچیدگی بیشترِ کار می‌تواند نیاز به مدیریت هدف را افزایش دهد و در بعضی موقعیت‌ها شروع کردن را دشوارتر کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_TASK_COMPLEXITY`, `EVID_GOAL_MANAGEMENT`
- **MVP status:** `mvp`

### `PATH_BEH1_DELAYED_REWARD` — Delayed Reward / پاداش با تأخیر

- **Behaviour:** `BEH1`
- **Ordered nodes:** `CTX5` → `REG5` → `BEH1`
- **Canonical edges:** `EDGE_CTX5_REG5_MODULATES`, `EDGE_REG5_BEH1_CONTRIBUTES_TO`
- **EN:** Reward salience or immediacy may interact with Reward / Delay Processing and alter immediate engagement with Starting.
- **FA:** برجستگی یا فوری‌بودن پاداش می‌تواند با پردازش پاداش / تأخیر تعامل داشته باشد و درگیری فوری با شروع کار را تغییر دهد.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY`
- **MVP status:** `mvp`

### `PATH_BEH1_URGENCY` — Urgency / فوریت

- **Behaviour:** `BEH1`
- **Ordered nodes:** `CTX4` → `REG5` → `BEH1`
- **Canonical edges:** `EDGE_CTX4_REG5_MODULATES`, `EDGE_REG5_BEH1_CONTRIBUTES_TO`
- **EN:** Urgency or time pressure changes the immediacy of consequences through Reward / Delay Processing and may change the timing of Starting; the effect is not uniformly helpful.
- **FA:** فوریت یا فشار زمانی از طریق پردازش پاداش / تأخیر، فوری‌بودن پیامدها را تغییر می‌دهد و ممکن است زمان شروع را تغییر دهد؛ این اثر همیشه تسهیل‌کننده نیست.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY`
- **MVP status:** `mvp`

### `PATH_BEH1_STRESS` — Stress / Emotional Load / استرس / بار هیجانی

- **Behaviour:** `BEH1`
- **Ordered nodes:** `CTX2` → `REG6` → `BEH1`
- **Canonical edges:** `EDGE_CTX2_REG6_MODULATES`, `EDGE_REG6_BEH1_CONTRIBUTES_TO`
- **EN:** Stress or emotional load may increase demands on Emotional Regulation and make Starting more difficult in some situations.
- **FA:** استرس یا بار هیجانی می‌تواند نیاز به تنظیم هیجان را افزایش دهد و در بعضی موقعیت‌ها شروع کردن را دشوارتر کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_STRESS_CONTEXT`, `EVID_EMOTIONAL_REGULATION`
- **MVP status:** `mvp`

### `PATH_BEH2_INTERRUPTION` — Interruptions / وقفه‌ها

- **Behaviour:** `BEH2`
- **Ordered nodes:** `CTX8` → `REG1` → `BEH2`
- **Canonical edges:** `EDGE_CTX8_REG1_MODULATES`, `EDGE_REG1_BEH2_CONTRIBUTES_TO`
- **EN:** Distraction or interruptions can increase attentional demand, which may make Sustaining less stable.
- **FA:** حواس‌پرتی یا وقفه‌ها می‌توانند تقاضای توجهی را افزایش دهند و ادامه دادن را کم‌ثبات‌تر کنند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_INTERRUPTION_CONTEXT`, `EVID_ATTENTION_REGULATION`
- **MVP status:** `mvp`

### `PATH_BEH2_SLEEP` — Sleep / Energy / خواب / انرژی

- **Behaviour:** `BEH2`
- **Ordered nodes:** `CTX1` → `REG1` → `BEH2`
- **Canonical edges:** `EDGE_CTX1_REG1_MODULATES`, `EDGE_REG1_BEH2_CONTRIBUTES_TO`
- **EN:** Sleep and available energy can modulate Attention Regulation and may influence Sustaining.
- **FA:** خواب و انرژی در دسترس می‌توانند تنظیم توجه را تعدیل کنند و بر ادامه دادن اثر بگذارند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_SLEEP_CONTEXT`, `EVID_ATTENTION_REGULATION`
- **MVP status:** `mvp`

### `PATH_BEH2_TASK_SALIENCE` — Task Salience / برجستگی / جذابیت کار

- **Behaviour:** `BEH2`
- **Ordered nodes:** `CTX3` → `REG5` → `BEH2`
- **Canonical edges:** `EDGE_CTX3_REG5_MODULATES`, `EDGE_REG5_BEH2_CONTRIBUTES_TO`
- **EN:** Task salience or interest can alter engagement-related processing through Reward / Delay Processing and may influence persistence.
- **FA:** برجستگی یا جذابیت کار می‌تواند از مسیر پردازش پاداش / تأخیر، درگیری با کار را تغییر دهد و بر تداوم آن اثر بگذارد.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY`
- **MVP status:** `mvp`

### `PATH_BEH2_REWARD_IMMEDIACY` — Reward Immediacy / فوری‌بودن پاداش

- **Behaviour:** `BEH2`
- **Ordered nodes:** `CTX5` → `REG5` → `BEH2`
- **Canonical edges:** `EDGE_CTX5_REG5_MODULATES`, `EDGE_REG5_BEH2_CONTRIBUTES_TO`
- **EN:** Reward salience or immediacy may interact with Reward / Delay Processing and influence continued engagement.
- **FA:** برجستگی یا فوری‌بودن پاداش می‌تواند با پردازش پاداش / تأخیر تعامل داشته باشد و بر ادامهٔ درگیری با کار اثر بگذارد.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY`
- **MVP status:** `mvp`

### `PATH_BEH3_INTERRUPTION_REORIENTATION` — Interruptions Requiring Reorientation / وقفه‌های نیازمند بازجهت‌گیری

- **Behaviour:** `BEH3`
- **Ordered nodes:** `CTX8` → `REG7` → `BEH3`
- **Canonical edges:** `EDGE_CTX8_REG7_MODULATES`, `EDGE_REG7_BEH3_CONTRIBUTES_TO`
- **EN:** Interruptions can increase switching or reorientation demand, which may make Switching Tasks more difficult.
- **FA:** وقفه‌ها می‌توانند نیاز به جابه‌جایی یا بازجهت‌گیری را افزایش دهند و تغییر کار را دشوارتر کنند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_INTERRUPTION_CONTEXT`, `EVID_TASK_SWITCHING`
- **MVP status:** `mvp`

### `PATH_BEH3_REPEATED_INTERRUPTION` — Repeated Interruption Context / زمینهٔ وقفه‌های تکرارشونده

- **Behaviour:** `BEH3`
- **Ordered nodes:** `CTX8` → `REG7` → `BEH3`
- **Canonical edges:** `EDGE_CTX8_REG7_MODULATES`, `EDGE_REG7_BEH3_CONTRIBUTES_TO`
- **EN:** Repeated interruptions repeatedly recruit Task Switching and may increase transition burden. This is a second educational framing of the same canonical pathway, not a new mechanism.
- **FA:** وقفه‌های تکرارشونده به‌طور مکرر جابه‌جایی بین کارها را درگیر می‌کنند و ممکن است بار انتقال را افزایش دهند. این یک صورت‌بندی آموزشی دوم از همان مسیر canonical است، نه یک سازوکار جدید.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_INTERRUPTION_CONTEXT`, `EVID_TASK_SWITCHING`
- **MVP status:** `mvp`

### `PATH_BEH4_COMPLEXITY` — Complexity / پیچیدگی

- **Behaviour:** `BEH4`
- **Ordered nodes:** `CTX6` → `REG2` → `BEH4`
- **Canonical edges:** `EDGE_CTX6_REG2_MODULATES`, `EDGE_REG2_BEH4_CONTRIBUTES_TO`
- **EN:** Task demand or complexity may increase Working Memory demand and make Keeping Track harder.
- **FA:** تقاضا یا پیچیدگی کار می‌تواند نیاز به حافظهٔ کاری را افزایش دهد و پیگیری را دشوارتر کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_TASK_COMPLEXITY`, `EVID_WORKING_MEMORY`
- **MVP status:** `mvp`

### `PATH_BEH4_STRESS` — Stress / Emotional Load / استرس / بار هیجانی

- **Behaviour:** `BEH4`
- **Ordered nodes:** `CTX2` → `REG2` → `BEH4`
- **Canonical edges:** `EDGE_CTX2_REG2_MODULATES`, `EDGE_REG2_BEH4_CONTRIBUTES_TO`
- **EN:** Stress or emotional load may compete with or increase Working Memory demand and affect Keeping Track.
- **FA:** استرس یا بار هیجانی می‌تواند با منابع حافظهٔ کاری رقابت کند یا تقاضای آن را افزایش دهد و بر پیگیری اثر بگذارد.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_STRESS_CONTEXT`, `EVID_WORKING_MEMORY`
- **MVP status:** `mvp`

### `PATH_BEH4_STRUCTURE` — External Structure as Buffer / ساختار بیرونی به‌عنوان عامل حمایتی

- **Behaviour:** `BEH4`
- **Ordered nodes:** `CTX7` → `REG2` → `BEH4`
- **Canonical edges:** `EDGE_CTX7_REG2_MODULATES`, `EDGE_REG2_BEH4_CONTRIBUTES_TO`
- **EN:** External structure may reduce internal Working Memory demand and support Keeping Track.
- **FA:** ساختار بیرونی می‌تواند نیاز داخلی به حافظهٔ کاری را کاهش دهد و از پیگیری حمایت کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_EXTERNAL_STRUCTURE`, `EVID_WORKING_MEMORY`
- **MVP status:** `mvp`

### `PATH_BEH5_COMPLEXITY_GOAL` — Complex Task / Goal Management / کار پیچیده / مدیریت هدف

- **Behaviour:** `BEH5`
- **Ordered nodes:** `CTX6` → `REG3` → `BEH5`
- **Canonical edges:** `EDGE_CTX6_REG3_MODULATES`, `EDGE_REG3_BEH5_CONTRIBUTES_TO`
- **EN:** Task complexity may increase Goal Management demand and affect Organizing / Sequencing.
- **FA:** پیچیدگی کار می‌تواند نیاز به مدیریت هدف را افزایش دهد و بر سازمان‌دهی / ترتیب‌دادن اثر بگذارد.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_TASK_COMPLEXITY`, `EVID_GOAL_MANAGEMENT`
- **MVP status:** `mvp`

### `PATH_BEH5_COMPLEXITY_WM` — Complex Task / Working Memory / کار پیچیده / حافظهٔ کاری

- **Behaviour:** `BEH5`
- **Ordered nodes:** `CTX6` → `REG2` → `BEH5`
- **Canonical edges:** `EDGE_CTX6_REG2_MODULATES`, `EDGE_REG2_BEH5_CONTRIBUTES_TO`
- **EN:** Task complexity may increase Working Memory demand and make maintaining an action sequence harder.
- **FA:** پیچیدگی کار می‌تواند نیاز به حافظهٔ کاری را افزایش دهد و حفظ توالی اقدامات را دشوارتر کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_TASK_COMPLEXITY`, `EVID_WORKING_MEMORY`
- **MVP status:** `mvp`

### `PATH_BEH5_STRESS` — Stress / استرس

- **Behaviour:** `BEH5`
- **Ordered nodes:** `CTX2` → `REG2` → `BEH5`
- **Canonical edges:** `EDGE_CTX2_REG2_MODULATES`, `EDGE_REG2_BEH5_CONTRIBUTES_TO`
- **EN:** Stress or emotional load may increase effective Working Memory demand and contribute to difficulty maintaining a sequence.
- **FA:** استرس یا بار هیجانی می‌تواند تقاضای مؤثر از حافظهٔ کاری را افزایش دهد و به دشواری در حفظ ترتیب مراحل کمک کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_STRESS_CONTEXT`, `EVID_WORKING_MEMORY`
- **MVP status:** `mvp`

### `PATH_BEH5_STRUCTURE_WM` — External Structure / Working Memory / ساختار بیرونی / حافظهٔ کاری

- **Behaviour:** `BEH5`
- **Ordered nodes:** `CTX7` → `REG2` → `BEH5`
- **Canonical edges:** `EDGE_CTX7_REG2_MODULATES`, `EDGE_REG2_BEH5_CONTRIBUTES_TO`
- **EN:** External structure may reduce Working Memory demand and support Organizing / Sequencing.
- **FA:** ساختار بیرونی می‌تواند نیاز به حافظهٔ کاری را کاهش دهد و از سازمان‌دهی / ترتیب‌دادن حمایت کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_EXTERNAL_STRUCTURE`, `EVID_WORKING_MEMORY`
- **MVP status:** `mvp`

### `PATH_BEH5_STRUCTURE_GOAL` — External Structure / Goal Management / ساختار بیرونی / مدیریت هدف

- **Behaviour:** `BEH5`
- **Ordered nodes:** `CTX7` → `REG3` → `BEH5`
- **Canonical edges:** `EDGE_CTX7_REG3_MODULATES`, `EDGE_REG3_BEH5_CONTRIBUTES_TO`
- **EN:** External structure may reduce Goal Management demand and support Organizing / Sequencing.
- **FA:** ساختار بیرونی می‌تواند نیاز به مدیریت هدف را کاهش دهد و از سازمان‌دهی / ترتیب‌دادن حمایت کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_EXTERNAL_STRUCTURE`, `EVID_GOAL_MANAGEMENT`
- **MVP status:** `mvp`

### `PATH_BEH6_COMPLEXITY` — Complexity / پیچیدگی

- **Behaviour:** `BEH6`
- **Ordered nodes:** `CTX6` → `REG3` → `BEH6`
- **Canonical edges:** `EDGE_CTX6_REG3_MODULATES`, `EDGE_REG3_BEH6_CONTRIBUTES_TO`
- **EN:** Complex multi-step work may increase Goal Management demand and make Completing / Following Through more difficult.
- **FA:** کار پیچیده و چندمرحله‌ای می‌تواند نیاز به مدیریت هدف را افزایش دهد و تکمیل / پیگیری تا پایان را دشوارتر کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_TASK_COMPLEXITY`, `EVID_GOAL_MANAGEMENT`
- **MVP status:** `mvp`

### `PATH_BEH6_STRUCTURE` — External Structure / ساختار بیرونی

- **Behaviour:** `BEH6`
- **Ordered nodes:** `CTX7` → `REG3` → `BEH6`
- **Canonical edges:** `EDGE_CTX7_REG3_MODULATES`, `EDGE_REG3_BEH6_CONTRIBUTES_TO`
- **EN:** External structure may reduce Goal Management demand and support Following Through.
- **FA:** ساختار بیرونی می‌تواند نیاز به مدیریت هدف را کاهش دهد و از پیگیری تا پایان حمایت کند.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_EXTERNAL_STRUCTURE`, `EVID_GOAL_MANAGEMENT`
- **MVP status:** `mvp`

### `PATH_BEH7_SLEEP` — Sleep / Energy / خواب / انرژی

- **Behaviour:** `BEH7`
- **Ordered nodes:** `CTX1` → `REG4` → `BEH7`
- **Canonical edges:** `EDGE_CTX1_REG4_MODULATES`, `EDGE_REG4_BEH7_CONTRIBUTES_TO`
- **EN:** Sleep or energy state may influence Response Inhibition and affect Pausing / Waiting Before Acting.
- **FA:** وضعیت خواب یا انرژی می‌تواند بر مهار پاسخ اثر بگذارد و مکث / صبر پیش از عمل را تغییر دهد.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_SLEEP_CONTEXT`, `EVID_RESPONSE_INHIBITION`
- **MVP status:** `mvp`

### `PATH_BEH7_EMOTIONAL_LOAD` — Emotional Load / بار هیجانی

- **Behaviour:** `BEH7`
- **Ordered nodes:** `CTX2` → `REG6` → `BEH7`
- **Canonical edges:** `EDGE_CTX2_REG6_MODULATES`, `EDGE_REG6_BEH7_CONTRIBUTES_TO`
- **EN:** Stress or emotional load may increase demand on Emotional Regulation and affect the ability to pause in emotionally intense situations.
- **FA:** استرس یا بار هیجانی می‌تواند نیاز به تنظیم هیجان را افزایش دهد و توانایی مکث در موقعیت‌های هیجانی شدید را تحت تأثیر قرار دهد.
- **Scientific caution EN:** This is one educationally plausible pathway, not a diagnosis, probability, or individualized explanation.
- **Scientific caution FA:** این فقط یکی از مسیرهای آموزشیِ ممکن است و به‌معنای تشخیص، احتمال یا توضیح فردی نیست.
- **EvidenceMetadata:** `EVID_STRESS_CONTEXT`, `EVID_EMOTIONAL_REGULATION`
- **MVP status:** `mvp`

## 7. Context Mappings
These are qualitative educational mappings through existing canonical Context→Regulation and Regulation→Behaviour relationships. They are not new direct Context→Behaviour edges and contain no score or predicted performance.
| ID | Context | Behaviour | Regulation | Qualitative role | English explanation | Persian explanation | EvidenceMetadata |
|---|---|---|---|---|---|---|---|
| `CM_CTX6_BEH1_REG3` | `CTX6` | `BEH1` | `REG3` | `increases-demand` | Higher task demand or complexity may increase Goal Management demand and make Starting harder. | تقاضا یا پیچیدگی بیشترِ کار می‌تواند نیاز به مدیریت هدف را افزایش دهد و شروع کردن را دشوارتر کند. | `EVID_TASK_COMPLEXITY`, `EVID_GOAL_MANAGEMENT` |
| `CM_CTX5_BEH1_REG5` | `CTX5` | `BEH1` | `REG5` | `variable` | More or less immediate reward may change immediate engagement with Starting through Reward / Delay Processing. | فوری‌تر یا دیرتر بودن پاداش می‌تواند از مسیر پردازش پاداش / تأخیر، درگیری فوری با شروع کار را تغییر دهد. | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY` |
| `CM_CTX4_BEH1_REG5` | `CTX4` | `BEH1` | `REG5` | `variable` | Urgency can change the immediacy of consequences and may alter when Starting occurs; it is not uniformly helpful. | فوریت می‌تواند فوری‌بودن پیامدها را تغییر دهد و زمان شروع را جابه‌جا کند؛ اثر آن همیشه مفید نیست. | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY` |
| `CM_CTX2_BEH1_REG6` | `CTX2` | `BEH1` | `REG6` | `increases-demand` | Emotional load may increase Emotional Regulation demand and make Starting harder in some situations. | بار هیجانی می‌تواند نیاز به تنظیم هیجان را افزایش دهد و در بعضی موقعیت‌ها شروع کردن را دشوارتر کند. | `EVID_STRESS_CONTEXT`, `EVID_EMOTIONAL_REGULATION` |
| `CM_CTX7_BEH1_REG3` | `CTX7` | `BEH1` | `REG3` | `buffering` | Clear external structure may reduce Goal Management demand and can support Starting. | ساختار بیرونی روشن می‌تواند نیاز به مدیریت هدف را کاهش دهد و از شروع کردن حمایت کند. | `EVID_EXTERNAL_STRUCTURE`, `EVID_GOAL_MANAGEMENT` |
| `CM_CTX3_BEH1_REG5` | `CTX3` | `BEH1` | `REG5` | `variable` | Task salience or interest may alter engagement through Reward / Delay Processing and can influence Starting. | برجستگی یا جذابیت کار می‌تواند از مسیر پردازش پاداش / تأخیر، درگیری با کار را تغییر دهد و بر شروع کردن اثر بگذارد. | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY` |
| `CM_CTX8_BEH2_REG1` | `CTX8` | `BEH2` | `REG1` | `interfering` | Interruptions can increase attentional demand and make Sustaining less stable. | وقفه‌ها می‌توانند تقاضای توجهی را افزایش دهند و ادامه دادن را کم‌ثبات‌تر کنند. | `EVID_INTERRUPTION_CONTEXT`, `EVID_ATTENTION_REGULATION` |
| `CM_CTX1_BEH2_REG1` | `CTX1` | `BEH2` | `REG1` | `variable` | Sleep and energy state can modulate Attention Regulation and influence Sustaining. | وضعیت خواب و انرژی می‌تواند تنظیم توجه را تعدیل کند و بر ادامه دادن اثر بگذارد. | `EVID_SLEEP_CONTEXT`, `EVID_ATTENTION_REGULATION` |
| `CM_CTX3_BEH2_REG5` | `CTX3` | `BEH2` | `REG5` | `variable` | Greater task salience or interest may alter engagement-related processing and influence persistence. | برجستگی یا جذابیت بیشترِ کار می‌تواند پردازش مرتبط با درگیری را تغییر دهد و بر تداوم اثر بگذارد. | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY` |
| `CM_CTX5_BEH2_REG5` | `CTX5` | `BEH2` | `REG5` | `variable` | Reward immediacy may influence continued engagement through Reward / Delay Processing. | فوری‌بودن پاداش می‌تواند از مسیر پردازش پاداش / تأخیر بر ادامهٔ درگیری با کار اثر بگذارد. | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY` |
| `CM_CTX2_BEH2_REG1` | `CTX2` | `BEH2` | `REG1` | `increases-demand` | Stress or emotional load may increase attentional demand and make Sustaining less stable. | استرس یا بار هیجانی می‌تواند تقاضای توجهی را افزایش دهد و ادامه دادن را کم‌ثبات‌تر کند. | `EVID_STRESS_CONTEXT`, `EVID_ATTENTION_REGULATION` |
| `CM_CTX8_BEH3_REG7` | `CTX8` | `BEH3` | `REG7` | `increases-demand` | Repeated interruptions or forced transitions can increase Task Switching demand. | وقفه‌های تکرارشونده یا انتقال‌های اجباری می‌توانند نیاز به جابه‌جایی بین کارها را افزایش دهند. | `EVID_INTERRUPTION_CONTEXT`, `EVID_TASK_SWITCHING` |
| `CM_CTX6_BEH4_REG2` | `CTX6` | `BEH4` | `REG2` | `increases-demand` | Multi-step complexity may increase Working Memory demand and make Keeping Track harder. | پیچیدگی چندمرحله‌ای می‌تواند نیاز به حافظهٔ کاری را افزایش دهد و پیگیری را دشوارتر کند. | `EVID_TASK_COMPLEXITY`, `EVID_WORKING_MEMORY` |
| `CM_CTX2_BEH4_REG2` | `CTX2` | `BEH4` | `REG2` | `increases-demand` | Stress can increase effective Working Memory demand and affect Keeping Track. | استرس می‌تواند تقاضای مؤثر از حافظهٔ کاری را افزایش دهد و بر پیگیری اثر بگذارد. | `EVID_STRESS_CONTEXT`, `EVID_WORKING_MEMORY` |
| `CM_CTX7_BEH4_REG2` | `CTX7` | `BEH4` | `REG2` | `buffering` | External reminders or structure may reduce internal Working Memory demand and support Keeping Track. | یادآورها یا ساختار بیرونی می‌توانند نیاز داخلی به حافظهٔ کاری را کاهش دهند و از پیگیری حمایت کنند. | `EVID_EXTERNAL_STRUCTURE`, `EVID_WORKING_MEMORY` |
| `CM_CTX6_BEH5_REG3` | `CTX6` | `BEH5` | `REG3` | `increases-demand` | Complex tasks may increase Goal Management demand and affect Organizing / Sequencing. | کارهای پیچیده می‌توانند نیاز به مدیریت هدف را افزایش دهند و بر سازمان‌دهی / ترتیب‌دادن اثر بگذارند. | `EVID_TASK_COMPLEXITY`, `EVID_GOAL_MANAGEMENT` |
| `CM_CTX6_BEH5_REG2` | `CTX6` | `BEH5` | `REG2` | `increases-demand` | Complex tasks may increase Working Memory demand and make maintaining a sequence harder. | کارهای پیچیده می‌توانند نیاز به حافظهٔ کاری را افزایش دهند و حفظ ترتیب مراحل را دشوارتر کنند. | `EVID_TASK_COMPLEXITY`, `EVID_WORKING_MEMORY` |
| `CM_CTX2_BEH5_REG2` | `CTX2` | `BEH5` | `REG2` | `increases-demand` | Emotional load may increase effective Working Memory demand and destabilize sequencing. | بار هیجانی می‌تواند تقاضای مؤثر از حافظهٔ کاری را افزایش دهد و حفظ ترتیب مراحل را کم‌ثبات‌تر کند. | `EVID_STRESS_CONTEXT`, `EVID_WORKING_MEMORY` |
| `CM_CTX7_BEH5_REG2` | `CTX7` | `BEH5` | `REG2` | `buffering` | External organization may reduce Working Memory demand and support sequencing. | سازمان‌دهی بیرونی می‌تواند نیاز به حافظهٔ کاری را کاهش دهد و از ترتیب‌دادن مراحل حمایت کند. | `EVID_EXTERNAL_STRUCTURE`, `EVID_WORKING_MEMORY` |
| `CM_CTX7_BEH5_REG3` | `CTX7` | `BEH5` | `REG3` | `buffering` | External organization may reduce Goal Management demand and support sequencing. | سازمان‌دهی بیرونی می‌تواند نیاز به مدیریت هدف را کاهش دهد و از ترتیب‌دادن مراحل حمایت کند. | `EVID_EXTERNAL_STRUCTURE`, `EVID_GOAL_MANAGEMENT` |
| `CM_CTX6_BEH6_REG3` | `CTX6` | `BEH6` | `REG3` | `increases-demand` | Complex multi-step work may increase Goal Management demand and make Following Through harder. | کار پیچیده و چندمرحله‌ای می‌تواند نیاز به مدیریت هدف را افزایش دهد و پیگیری تا پایان را دشوارتر کند. | `EVID_TASK_COMPLEXITY`, `EVID_GOAL_MANAGEMENT` |
| `CM_CTX7_BEH6_REG3` | `CTX7` | `BEH6` | `REG3` | `buffering` | External structure and a clear sequence may reduce Goal Management demand and support completion. | ساختار بیرونی و ترتیب روشن می‌توانند نیاز به مدیریت هدف را کاهش دهند و از تکمیل کار حمایت کنند. | `EVID_EXTERNAL_STRUCTURE`, `EVID_GOAL_MANAGEMENT` |
| `CM_CTX1_BEH7_REG4` | `CTX1` | `BEH7` | `REG4` | `variable` | Sleep or energy state may influence Response Inhibition and affect the ability to pause before acting. | وضعیت خواب یا انرژی می‌تواند بر مهار پاسخ اثر بگذارد و توانایی مکث پیش از عمل را تغییر دهد. | `EVID_SLEEP_CONTEXT`, `EVID_RESPONSE_INHIBITION` |
| `CM_CTX2_BEH7_REG6` | `CTX2` | `BEH7` | `REG6` | `increases-demand` | Emotional load may increase Emotional Regulation demand and make pausing harder in emotionally intense situations. | بار هیجانی می‌تواند نیاز به تنظیم هیجان را افزایش دهد و مکث در موقعیت‌های هیجانی شدید را دشوارتر کند. | `EVID_STRESS_CONTEXT`, `EVID_EMOTIONAL_REGULATION` |

**Context caution — EN:** These mappings describe possible contextual influences, not predictions.  
**Context caution — FA:** این mappingها اثرهای زمینه‌ایِ ممکن را توصیف می‌کنند و پیش‌بینی دربارهٔ عملکرد فرد نیستند.
## 8. Pattern Rules
### `RULE_PAT1_PROCRASTINATION` → `PAT1`

- **Source Behaviour IDs:** `BEH1`
- **Repetition requirement:** Repeated Starting delay; intended action; maladaptive or meaningful negative consequences.
- **Conceptual threshold — EN:** When intended actions are repeatedly started substantially later than intended and the delay is maladaptive or has meaningful consequences, Procrastination may be a useful educational description.
- **Conceptual threshold — FA:** وقتی اقدامِ موردنظر به‌طور تکرارشونده بسیار دیرتر از زمانِ قصدشده شروع می‌شود و این تأخیر ناسازگارانه است یا پیامد معناداری دارد، «اهمال‌کاری» می‌تواند یک توصیف آموزشیِ مفید باشد.
- **Single-event caution — EN:** One delayed start is not enough to establish a recurring Procrastination pattern.
- **Single-event caution — FA:** یک شروعِ دیرهنگام به‌تنهایی برای نتیجه‌گیری دربارهٔ یک الگوی تکرارشوندهٔ اهمال‌کاری کافی نیست.
- **Examples — EN:** Example that does not meet the pattern: one important task starts late. Example that may fit educationally: important intended tasks are repeatedly started late and this repeatedly creates meaningful negative consequences.
- **Examples — FA:** نمونه‌ای که برای الگو کافی نیست: یک کار مهم دیر شروع می‌شود. نمونه‌ای که ممکن است از نظر آموزشی با الگو سازگار باشد: کارهای مهمی که فرد قصد انجامشان را دارد به‌طور تکرارشونده دیر شروع می‌شوند و این تأخیر بارها پیامد منفی معنادار ایجاد می‌کند.
- **EvidenceMetadata:** `EVID_PROCRASTINATION_PATTERN`

### `RULE_PAT2_PERFORMANCE_VARIABILITY` → `PAT2`

- **Source Behaviour IDs:** `BEH2`, `BEH4`, `BEH6`
- **Repetition requirement:** Meaningful repeated variation across occasions, contexts, or time.
- **Conceptual threshold — EN:** When performance or engagement varies meaningfully across repeated occasions, contexts, or time, Performance Variability may be a useful educational description.
- **Conceptual threshold — FA:** وقتی عملکرد یا میزان درگیری با کار در موقعیت‌ها، زمینه‌ها یا زمان‌های تکرارشونده به‌طور معنادار تغییر می‌کند، «نوسان عملکرد» می‌تواند یک توصیف آموزشیِ مفید باشد.
- **Single-event caution — EN:** One bad day or one unusually productive day is insufficient. Everyday inconsistency must not be treated as equivalent to laboratory reaction-time variability findings.
- **Single-event caution — FA:** یک روز بد یا یک روز غیرمعمولِ پربازده کافی نیست. ناهماهنگی روزمره نباید معادل یافته‌های آزمایشگاهیِ نوسان زمان واکنش در نظر گرفته شود.
- **Examples — EN:** Example that does not meet the pattern: performance is poor once. Example that may fit educationally: performance is repeatedly much more stable in some contexts than others across multiple occasions.
- **Examples — FA:** نمونه‌ای که برای الگو کافی نیست: عملکرد فقط یک‌بار ضعیف است. نمونه‌ای که ممکن است از نظر آموزشی با الگو سازگار باشد: در چندین موقعیت، عملکرد به‌طور تکرارشونده در بعضی زمینه‌ها بسیار باثبات‌تر از زمینه‌های دیگر است.
- **EvidenceMetadata:** `EVID_PERFORMANCE_VARIABILITY_EXPERIMENTAL`, `EVID_PERFORMANCE_VARIABILITY_EVERYDAY`

No diagnostic threshold, automated classifier, or user label is encoded. For `PAT2`, the laboratory evidence and broad everyday educational concept remain explicitly separated.
## 9. Functional Examples
The frozen Behaviour Framework supplies illustrative examples across all seven Behaviours and all four Functional Domains and explicitly states that these do **not** add canonical causal edges. The `canonical edge` column therefore distinguishes examples that coincide with a frozen Behaviour→Functional edge from illustrative-only combinations.
| ID | Behaviour | Domain | Canonical edge | Relationship status | English example | Persian example |
|---|---|---|---|---|---|---|
| `FEX_BEH1_FUN1` | `BEH1` | `FUN1` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be delaying the start of a report. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند به‌تعویق‌افتادن شروع یک گزارش باشد. |
| `FEX_BEH1_FUN2` | `BEH1` | `FUN2` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be delaying the start of studying or an assignment. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند به‌تعویق‌افتادن شروع مطالعه یا تکلیف باشد. |
| `FEX_BEH1_FUN3` | `BEH1` | `FUN3` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be postponing a shared responsibility. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند به‌تعویق‌انداختن یک مسئولیت مشترک باشد. |
| `FEX_BEH1_FUN4` | `BEH1` | `FUN4` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be putting off paperwork or appointments. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند عقب‌انداختن کارهای اداری یا قرارها باشد. |
| `FEX_BEH2_FUN1` | `BEH2` | `FUN1` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be repeatedly drifting away during long work. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند پرت‌شدن مکرر ذهن در کارهای طولانی باشد. |
| `FEX_BEH2_FUN2` | `BEH2` | `FUN2` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be difficulty staying with reading or study material. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند دشواری در ادامه‌دادن مطالعه یا ماندن روی محتوای آموزشی باشد. |
| `FEX_BEH2_FUN3` | `BEH2` | `FUN3` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be losing track during long conversations. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند از دست دادن پیگیری در گفت‌وگوهای طولانی باشد. |
| `FEX_BEH2_FUN4` | `BEH2` | `FUN4` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be leaving chores unfinished after starting them. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند ناتمام‌گذاشتن کارهای روزمره پس از شروع باشد. |
| `FEX_BEH3_FUN1` | `BEH3` | `FUN1` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be a slow transition between meetings or projects. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند انتقال کند بین جلسه‌ها یا پروژه‌ها باشد. |
| `FEX_BEH3_FUN2` | `BEH3` | `FUN2` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be difficulty moving from one subject to another. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند دشواری در رفتن از یک موضوع درسی به موضوع دیگر باشد. |
| `FEX_BEH3_FUN3` | `BEH3` | `FUN3` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be difficulty shifting attention when an interaction requires it. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند دشواری در تغییر جهت توجه وقتی تعامل به آن نیاز دارد باشد. |
| `FEX_BEH3_FUN4` | `BEH3` | `FUN4` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be remaining in one activity while another task becomes due. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند ماندن در یک فعالیت در حالی که زمان کار دیگری فرا می‌رسد باشد. |
| `FEX_BEH4_FUN1` | `BEH4` | `FUN1` | `EDGE_BEH4_FUN1_CONTRIBUTES_TO` | canonical-edge-supported | If this behaviour is frequent or consequential enough, one possible example in this domain could be losing track of action items. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند گم‌کردن پیگیری اقدام‌های موردنیاز باشد. |
| `FEX_BEH4_FUN2` | `BEH4` | `FUN2` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be losing one’s place in multi-step learning material. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند گم‌کردن جای خود در محتوای آموزشی چندمرحله‌ای باشد. |
| `FEX_BEH4_FUN3` | `BEH4` | `FUN3` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be forgetting part of an agreed plan. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند فراموش‌کردن بخشی از یک برنامهٔ توافق‌شده باشد. |
| `FEX_BEH4_FUN4` | `BEH4` | `FUN4` | `EDGE_BEH4_FUN4_CONTRIBUTES_TO` | canonical-edge-supported | If this behaviour is frequent or consequential enough, one possible example in this domain could be forgetting steps in errands or administrative tasks. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند فراموش‌کردن مراحل کارهای روزمره یا اداری باشد. |
| `FEX_BEH5_FUN1` | `BEH5` | `FUN1` | `EDGE_BEH5_FUN1_CONTRIBUTES_TO` | canonical-edge-supported | If this behaviour is frequent or consequential enough, one possible example in this domain could be having difficulty establishing an execution order for a project. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند دشواری در مشخص‌کردن ترتیب اجرای یک پروژه باشد. |
| `FEX_BEH5_FUN2` | `BEH5` | `FUN2` | `EDGE_BEH5_FUN2_CONTRIBUTES_TO` | canonical-edge-supported | If this behaviour is frequent or consequential enough, one possible example in this domain could be having difficulty structuring an assignment. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند دشواری در ساختاربندی یک تکلیف باشد. |
| `FEX_BEH5_FUN3` | `BEH5` | `FUN3` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be having difficulty coordinating a shared plan. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند دشواری در هماهنگ‌کردن یک برنامهٔ مشترک باشد. |
| `FEX_BEH5_FUN4` | `BEH5` | `FUN4` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be having trouble ordering several daily tasks. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند دشواری در مرتب‌کردن چند کار روزانه باشد. |
| `FEX_BEH6_FUN1` | `BEH6` | `FUN1` | `EDGE_BEH6_FUN1_CONTRIBUTES_TO` | canonical-edge-supported | If this behaviour is frequent or consequential enough, one possible example in this domain could be deliverables remaining unfinished. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند ناتمام‌ماندن خروجی‌های کاری باشد. |
| `FEX_BEH6_FUN2` | `BEH6` | `FUN2` | `EDGE_BEH6_FUN2_CONTRIBUTES_TO` | canonical-edge-supported | If this behaviour is frequent or consequential enough, one possible example in this domain could be assignments remaining incomplete. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند ناتمام‌ماندن تکالیف باشد. |
| `FEX_BEH6_FUN3` | `BEH6` | `FUN3` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be a shared commitment not being carried through. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند پیگیری‌نشدن یک تعهد مشترک تا پایان باشد. |
| `FEX_BEH6_FUN4` | `BEH6` | `FUN4` | `EDGE_BEH6_FUN4_CONTRIBUTES_TO` | canonical-edge-supported | If this behaviour is frequent or consequential enough, one possible example in this domain could be administrative or household tasks remaining incomplete. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند ناتمام‌ماندن کارهای اداری یا خانگی باشد. |
| `FEX_BEH7_FUN1` | `BEH7` | `FUN1` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be responding before enough reflection in a meeting. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند پاسخ‌دادن در جلسه پیش از فرصت کافی برای فکرکردن باشد. |
| `FEX_BEH7_FUN2` | `BEH7` | `FUN2` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be answering before fully processing a question. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند پاسخ‌دادن پیش از پردازش کامل سؤال باشد. |
| `FEX_BEH7_FUN3` | `BEH7` | `FUN3` | `EDGE_BEH7_FUN3_CONTRIBUTES_TO` | canonical-edge-supported | If this behaviour is frequent or consequential enough, one possible example in this domain could be interrupting or reacting rapidly in an interaction. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند قطع‌کردن صحبت یا واکنش سریع در یک تعامل باشد. |
| `FEX_BEH7_FUN4` | `BEH7` | `FUN4` | — | illustrative-only; not a canonical causal edge | If this behaviour is frequent or consequential enough, one possible example in this domain could be making a quick day-to-day decision before enough reflection. | اگر این رفتار به‌اندازهٔ کافی تکرارشونده یا پیامددار باشد، یکی از نمونه‌های ممکن در این حوزه می‌تواند گرفتن یک تصمیم روزمرهٔ سریع پیش از فرصت کافی برای فکرکردن باشد. |

**Mandatory caution — EN:** These examples are illustrative and do not establish clinically significant impairment or predict the user.  
**Mandatory caution — FA:** این مثال‌ها صرفاً آموزشی‌اند و نه اختلال عملکرد بالینیِ قابل‌توجه را اثبات می‌کنند و نه دربارهٔ کاربر پیش‌بینی انجام می‌دهند.
## 10. Alternative Explanations
These are broad **possible contributors**, not alternative diagnoses. `relevantBehaviourIds` controls curated display eligibility only; it is never a probability, exclusion rule, or ranking.
### `ALT_SLEEP_PHYSICAL_STATE` — Sleep / physical state / خواب / وضعیت جسمی

- **Explanation EN:** Insufficient sleep, fatigue, or another temporary physical state can affect attention, energy, inhibition, and task performance.
- **Explanation FA:** کمبود خواب، خستگی یا وضعیت جسمی موقت دیگری می‌تواند بر توجه، انرژی، مهار پاسخ و عملکرد در کار اثر بگذارد.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH3`, `BEH4`, `BEH5`, `BEH6`, `BEH7`
- **Safe wording EN:** Current physical state can also affect this behaviour.
- **Safe wording FA:** وضعیت جسمی فعلی نیز می‌تواند بر این رفتار اثر بگذارد.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_ACUTE_STRESS` — Acute stress / استرس حاد

- **Explanation EN:** Acute stress can compete with cognitive resources and alter attention, working memory, flexibility, and emotional responding.
- **Explanation FA:** استرس حاد می‌تواند با منابع شناختی رقابت کند و توجه، حافظهٔ کاری، انعطاف‌پذیری و واکنش هیجانی را تغییر دهد.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH3`, `BEH4`, `BEH5`, `BEH6`, `BEH7`
- **Safe wording EN:** Acute stress can produce similar difficulties without establishing ADHD.
- **Safe wording FA:** استرس حاد می‌تواند دشواری‌های مشابهی ایجاد کند، بدون اینکه ADHD را اثبات کند.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_ANXIETY_EMOTIONAL_DISTRESS` — Anxiety / emotional distress / اضطراب / ناراحتی هیجانی

- **Explanation EN:** Anxiety or emotional distress can make concentration, task engagement, organization, and pausing before reaction more difficult.
- **Explanation FA:** اضطراب یا ناراحتی هیجانی می‌تواند تمرکز، درگیری با کار، سازمان‌دهی و مکث پیش از واکنش را دشوارتر کند.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH4`, `BEH5`, `BEH6`, `BEH7`
- **Safe wording EN:** Emotional difficulties can produce similar patterns; this does not mean anxiety is the explanation for a specific person.
- **Safe wording FA:** دشواری‌های هیجانی می‌توانند الگوهای مشابهی ایجاد کنند؛ این به‌معنای آن نیست که اضطراب توضیح یک فرد مشخص است.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_LOW_MOOD` — Low mood / خلق پایین

- **Explanation EN:** Low mood can reduce energy, engagement, concentration, and follow-through in ways that may resemble some of these behaviours.
- **Explanation FA:** خلق پایین می‌تواند انرژی، درگیری، تمرکز و پیگیری تا پایان را کاهش دهد و بعضی از این رفتارها را شبیه‌سازی کند.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH4`, `BEH5`, `BEH6`
- **Safe wording EN:** Low mood is one possible non-ADHD contributor, not a conclusion about the user.
- **Safe wording FA:** خلق پایین یکی از عوامل ممکنِ غیرمرتبط با ADHD است، نه نتیجه‌گیری دربارهٔ کاربر.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_BURNOUT` — Burnout / فرسودگی

- **Explanation EN:** Sustained overload or burnout can reduce available energy and cognitive capacity for starting, sustaining, organizing, tracking, and completing tasks.
- **Explanation FA:** فشار طولانی‌مدت یا فرسودگی می‌تواند انرژی و ظرفیت شناختی در دسترس برای شروع، ادامه، سازمان‌دهی، پیگیری و تکمیل کارها را کاهش دهد.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH4`, `BEH5`, `BEH6`
- **Safe wording EN:** Burnout can create similar difficulties and should not be ranked against ADHD by this product.
- **Safe wording FA:** فرسودگی می‌تواند دشواری‌های مشابهی ایجاد کند و این محصول نباید آن را در برابر ADHD رتبه‌بندی کند.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_GRIEF` — Grief / سوگ

- **Explanation EN:** Grief can temporarily affect attention, memory, energy, emotional load, and everyday task functioning.
- **Explanation FA:** سوگ می‌تواند به‌طور موقت بر توجه، حافظه، انرژی، بار هیجانی و انجام کارهای روزمره اثر بگذارد.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH4`, `BEH5`, `BEH6`, `BEH7`
- **Safe wording EN:** Grief may contribute to similar difficulties; the product does not determine whether it applies.
- **Safe wording FA:** سوگ ممکن است به دشواری‌های مشابه کمک کند؛ محصول تعیین نمی‌کند که آیا این توضیح دربارهٔ فرد صدق می‌کند یا نه.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_TASK_DESIGN` — Task design / طراحی کار

- **Explanation EN:** Unclear definitions, excessive complexity, poor sequencing, or ambiguous completion criteria can make a task difficult regardless of ADHD.
- **Explanation FA:** تعریف مبهم، پیچیدگی زیاد، ترتیب نامناسب مراحل یا معیار نامشخص برای پایان کار می‌تواند مستقل از ADHD انجام کار را دشوار کند.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH3`, `BEH4`, `BEH5`, `BEH6`
- **Safe wording EN:** The structure of the task itself may contribute.
- **Safe wording FA:** ساختار خودِ کار ممکن است نقش داشته باشد.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_WORKLOAD` — Workload / حجم کار

- **Explanation EN:** Excessive or competing workload can increase cognitive and organizational demand and leave tasks delayed, unstable, or unfinished.
- **Explanation FA:** حجم کار بیش‌ازحد یا رقابت چند کار می‌تواند تقاضای شناختی و سازمانی را افزایش دهد و باعث تأخیر، بی‌ثباتی یا ناتمام‌ماندن کارها شود.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH3`, `BEH4`, `BEH5`, `BEH6`
- **Safe wording EN:** Excessive workload is a possible contributor and is not evidence of ADHD.
- **Safe wording FA:** حجم کار بیش‌ازحد یکی از عوامل ممکن است و شواهدی برای ADHD محسوب نمی‌شود.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_ENVIRONMENT` — Environment / distraction / محیط / حواس‌پرتی

- **Explanation EN:** Noise, interruptions, competing stimuli, or frequent forced transitions can make attention and task continuity more difficult.
- **Explanation FA:** سر و صدا، وقفه‌ها، محرک‌های رقیب یا انتقال‌های اجباریِ مکرر می‌توانند توجه و تداوم کار را دشوارتر کنند.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH3`, `BEH4`, `BEH5`, `BEH6`
- **Safe wording EN:** Some environments make this behaviour harder even without ADHD.
- **Safe wording FA:** بعضی محیط‌ها حتی بدون ADHD نیز می‌توانند این رفتار را دشوارتر کنند.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_SKILL_GAP` — Skill gap / شکاف مهارتی

- **Explanation EN:** An unfamiliar process, missing knowledge, or insufficient practice can make starting, tracking, sequencing, switching, or completing a task harder.
- **Explanation FA:** فرایند ناآشنا، دانش ناکافی یا تمرین کم می‌تواند شروع، پیگیری، ترتیب‌دادن، جابه‌جایی یا تکمیل کار را دشوارتر کند.
- **Relevant Behaviour IDs:** `BEH1`, `BEH3`, `BEH4`, `BEH5`, `BEH6`
- **Safe wording EN:** Difficulty may reflect missing knowledge or experience rather than a regulation problem.
- **Safe wording FA:** دشواری ممکن است بازتاب کمبود دانش یا تجربه باشد، نه الزاماً یک مشکل تنظیمی.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_ORDINARY_MOTIVATION` — Ordinary motivation / preference / انگیزه / ترجیح معمول

- **Explanation EN:** Low personal relevance, ordinary dislike of a task, or competing priorities can reduce engagement without implying a clinical problem.
- **Explanation FA:** اهمیت شخصی پایین، نپسندیدن معمول یک کار یا اولویت‌های رقیب می‌تواند درگیری با کار را کاهش دهد، بدون اینکه مسئله‌ای بالینی را نشان دهد.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH6`
- **Safe wording EN:** Not every difficult or uninteresting task reflects a clinical problem.
- **Safe wording FA:** هر کار دشوار یا غیرجذاب نشان‌دهندهٔ یک مشکل بالینی نیست.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_PHYSICAL_ILLNESS` — Physical illness / بیماری جسمی

- **Explanation EN:** Physical illness can alter energy, concentration, memory, and everyday functioning.
- **Explanation FA:** بیماری جسمی می‌تواند انرژی، تمرکز، حافظه و عملکرد روزمره را تغییر دهد.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH3`, `BEH4`, `BEH5`, `BEH6`, `BEH7`
- **Safe wording EN:** Physical illness can produce similar difficulties; the product does not infer whether this applies to a user.
- **Safe wording FA:** بیماری جسمی می‌تواند دشواری‌های مشابهی ایجاد کند؛ محصول تعیین نمی‌کند که آیا این توضیح دربارهٔ کاربر صدق می‌کند یا نه.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

### `ALT_MEDICATION_SUBSTANCE` — Medication / substance effects / اثرات دارو / مواد

- **Explanation EN:** Medication or substance effects can alter attention, arousal, inhibition, memory, or energy in ways that may affect these behaviours.
- **Explanation FA:** اثرات دارو یا مواد می‌تواند توجه، برانگیختگی، مهار پاسخ، حافظه یا انرژی را تغییر دهد و بر این رفتارها اثر بگذارد.
- **Relevant Behaviour IDs:** `BEH1`, `BEH2`, `BEH3`, `BEH4`, `BEH5`, `BEH6`, `BEH7`
- **Safe wording EN:** Medication or substance effects are a possible contributor where relevant; this product does not make medication or substance-use judgments.
- **Safe wording FA:** اثرات دارو یا مواد در صورت مرتبط‌بودن یکی از عوامل ممکن است؛ این محصول دربارهٔ دارو یا مصرف مواد قضاوت نمی‌کند.
- **EvidenceMetadata:** `EVID_ALTERNATIVE_EXPLANATIONS`
- **Caution:** Display as “Other possible contributors.” Never use this record to infer a diagnosis, eliminate a condition, rank explanations, or state what is most likely for the user.

## 11. Feedback Loops
### `LOOP_PROCRASTINATION_URGENCY` — Procrastination / Urgency / اهمال‌کاری / فوریت

**Ordered conceptual steps — EN**

Starting is delayed → Repeated maladaptive delay may form a Procrastination pattern → The deadline becomes closer → Urgency / Time Pressure increases → Consequences or rewards become more immediate → Reward / Delay Processing changes → Starting or Sustaining may change → A task may sometimes be completed under pressure → Future reliance on urgency may be reinforced

**Ordered conceptual steps — FA**

شروع به تعویق می‌افتد ← تأخیر ناسازگارانهٔ تکرارشونده ممکن است به الگوی اهمال‌کاری تبدیل شود ← مهلت انجام کار نزدیک‌تر می‌شود ← فوریت / فشار زمانی افزایش می‌یابد ← پیامد یا پاداش فوری‌تر می‌شود ← پردازش پاداش / تأخیر تغییر می‌کند ← شروع یا ادامه‌دادن ممکن است تغییر کند ← کار ممکن است گاهی زیر فشار تکمیل شود ← وابستگی آینده به فوریت ممکن است تقویت شود

- **Canonical node references:** `BEH1`, `PAT1`, `CTX4`, `REG5`, `BEH1`, `BEH2`
- **Canonical relationship references:** `EDGE_BEH1_PAT1_CONTRIBUTES_TO`, `EDGE_PAT1_CTX4_FEEDBACK_WITH`, `EDGE_CTX4_REG5_MODULATES`, `EDGE_REG5_BEH1_CONTRIBUTES_TO`, `EDGE_REG5_BEH2_CONTRIBUTES_TO`
- **Explanation EN:** This loop is an educational synthesis showing how delayed Starting and Procrastination can alter future urgency, which can in turn change reward immediacy and task engagement.
- **Explanation FA:** این حلقه یک synthesis آموزشی است که نشان می‌دهد تأخیر در شروع و اهمال‌کاری چگونه می‌تواند فوریت آینده را تغییر دهد و فوریت نیز از راه تغییر فوری‌بودن پاداش یا پیامد بر درگیری با کار اثر بگذارد.
- **Evidence / epistemic status:** Limited / educational synthesis; transdiagnostic; `EVID_URGENCY_FEEDBACK_LOOP`, `EVID_PROCRASTINATION_PATTERN`, `EVID_REWARD_DELAY`
- **Caution EN:** This loop is not universal, not ADHD-specific, and not a proven single neurobiological mechanism.
- **Caution FA:** این حلقه همگانی یا مختص ADHD نیست و به‌عنوان یک سازوکار عصب‌زیستی واحد و اثبات‌شده ارائه نمی‌شود.
- **Optional educational interruption points:** Show recurring-pattern caution before PAT1; Show evidence limitation before the feedback return; Offer Alternative Explanations before any individualized interpretation

### `LOOP_FUNCTIONAL_DIFFICULTY_STRESS` — Functional Difficulty → Stress / دشواری عملکردی ← استرس

**Ordered conceptual steps — EN**

A Behaviour or Pattern difficulty occurs → Difficulty may matter in a Functional Domain → Stress / Emotional Load may increase → Regulatory demands may increase → Behaviour may become less stable → Further functional difficulty may occur

**Ordered conceptual steps — FA**

یک دشواری در رفتار یا الگو رخ می‌دهد ← دشواری ممکن است در یک حوزهٔ عملکردی اثر بگذارد ← استرس / بار هیجانی ممکن است افزایش یابد ← تقاضا از فرایندهای تنظیمی ممکن است بیشتر شود ← رفتار ممکن است کم‌ثبات‌تر شود ← دشواری عملکردی بیشتری ممکن است رخ دهد

- **Canonical node references:** `FUN1`, `FUN2`, `FUN3`, `FUN4`, `CTX2`, `REG1`, `REG2`, `REG6`, `BEH1`, `BEH2`, `BEH4`, `BEH5`, `BEH7`
- **Canonical relationship references:** `EDGE_FUN1_CTX2_FEEDBACK_WITH`, `EDGE_FUN2_CTX2_FEEDBACK_WITH`, `EDGE_FUN3_CTX2_FEEDBACK_WITH`, `EDGE_FUN4_CTX2_FEEDBACK_WITH`, `EDGE_CTX2_REG1_MODULATES`, `EDGE_CTX2_REG2_MODULATES`, `EDGE_CTX2_REG6_MODULATES`, `EDGE_REG1_BEH2_CONTRIBUTES_TO`, `EDGE_REG2_BEH4_CONTRIBUTES_TO`, `EDGE_REG2_BEH5_CONTRIBUTES_TO`, `EDGE_REG6_BEH1_CONTRIBUTES_TO`, `EDGE_REG6_BEH7_CONTRIBUTES_TO`
- **Explanation EN:** This loop is a transdiagnostic educational synthesis: functional difficulty may increase stress, and stress may increase demands on regulation systems that can affect subsequent behaviour.
- **Explanation FA:** این حلقه یک synthesis آموزشیِ transdiagnostic است: دشواری عملکردی می‌تواند استرس را افزایش دهد و استرس نیز ممکن است تقاضا از فرایندهای تنظیمی را بیشتر کند و بر رفتار بعدی اثر بگذارد.
- **Evidence / epistemic status:** Limited / transdiagnostic educational synthesis; `EVID_FUNCTION_STRESS_FEEDBACK_LOOP`, `EVID_STRESS_CONTEXT`, `EVID_FUNCTIONAL_DOMAINS`
- **Caution EN:** The relationship is probabilistic and transdiagnostic. The application must not infer a deterministic stress cycle for a specific person.
- **Caution FA:** این رابطه احتمالی و transdiagnostic است. برنامه نباید برای یک فرد مشخص وجود چرخهٔ قطعی استرس را استنباط کند.
- **Optional educational interruption points:** Show Functional-impact caution before the feedback return; Show group-level evidence caution; Offer Alternative Explanations before interpretation

No interruption point is treatment advice; all are education/safety presentation controls.
## 12. Presentation Education
This registry is isolated from Behaviour Explorer state and may reference Clinical Anchors only.
| ID | Canonical English label | Persian label | Clinical Anchors | Description EN | Description FA | Status | SourceReference IDs | Safety copy |
|---|---|---|---|---|---|---|---|---|
| `PRESENTATION_INATTENTIVE` | Predominantly Inattentive Presentation | presentation غالباً بی‌توجه | `CA1` | A current ADHD presentation in which the formal inattention symptom domain predominates under clinical diagnostic criteria. | یکی از presentationهای فعلی ADHD که در آن، بر اساس معیارهای تشخیصی بالینی، حوزهٔ رسمی علائم بی‌توجهی غالب است. | `current-formal` | `SRC_NIMH_ADHD_2024`, `SRC_CDC_ADHD_SYMPTOMS_2026`, `SRC_NICE_NG87_2018` | `SAFETY_PRESENTATION_CAUTION` |
| `PRESENTATION_HYPERACTIVE_IMPULSIVE` | Predominantly Hyperactive-Impulsive Presentation | presentation غالباً بیش‌فعال-تکانشگر | `CA2` | A current ADHD presentation in which the formal hyperactivity–impulsivity symptom domain predominates under clinical diagnostic criteria. | یکی از presentationهای فعلی ADHD که در آن، بر اساس معیارهای تشخیصی بالینی، حوزهٔ رسمی علائم بیش‌فعالی–تکانشگری غالب است. | `current-formal` | `SRC_NIMH_ADHD_2024`, `SRC_CDC_ADHD_SYMPTOMS_2026`, `SRC_NICE_NG87_2018` | `SAFETY_PRESENTATION_CAUTION` |
| `PRESENTATION_COMBINED` | Combined Presentation | presentation ترکیبی | `CA1, CA2` | A current ADHD presentation in which formal symptoms from both inattention and hyperactivity–impulsivity domains meet clinical criteria. | یکی از presentationهای فعلی ADHD که در آن علائم رسمی هر دو حوزهٔ بی‌توجهی و بیش‌فعالی–تکانشگری معیارهای بالینی را برآورده می‌کنند. | `current-formal` | `SRC_NIMH_ADHD_2024`, `SRC_CDC_ADHD_SYMPTOMS_2026`, `SRC_NICE_NG87_2018` | `SAFETY_PRESENTATION_CAUTION` |
| `HISTORICAL_ADD_NOTE` | Historical ADD terminology | اصطلاح تاریخی ADD | `CA1` | ADD is an older diagnostic term still commonly encountered, especially in references to predominantly inattentive ADHD. It is not a separate current disorder, a fourth presentation, or a current canonical synonym for ADHD. | ADD یک اصطلاح تشخیصی قدیمی است که هنوز، به‌ویژه در اشاره به ADHD با presentation غالباً بی‌توجه، دیده می‌شود. این اصطلاح یک اختلال فعلیِ جداگانه، presentation چهارم یا مترادف canonical فعلی برای ADHD نیست. | `historical-only` | `SRC_NIMH_ADHD_2024`, `SRC_CDC_ADHD_SYMPTOMS_2026` | `SAFETY_PRESENTATION_CAUTION` |

The application must not derive any Presentation ID from Behaviour selections, Regulation nodes, pathways, Pattern rules, or session state.
## 13. SourceReference Registry
All sources below were actually reviewed for this closure stage on **2026-09-20**. Government/clinical sources are used for clinical definitions and safety boundaries; meta-analyses/systematic reviews are preferred for research constructs. General cognitive reviews are used only for non-specific contextual claims, never as ADHD-specific proof.
### `SRC_NIMH_ADHD_2024`

- **sourceType:** `government-medical`
- **title:** Attention-Deficit/Hyperactivity Disorder: What You Need to Know
- **authors/organization:** National Institute of Mental Health (NIMH)
- **year:** 2024
- **publicationType:** Government health publication
- **journal/series:** NIH Publication No. 24-MH-3573
- **citationText:** National Institute of Mental Health. Attention-Deficit/Hyperactivity Disorder: What You Need to Know. NIH Publication No. 24-MH-3573. 2024.
- **relevanceNote:** Clinical symptom domains, presentation education, functional interference, alternative explanations, and separation of cognitive testing from diagnosis.
- **URL:** https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know

### `SRC_CDC_ADHD_SYMPTOMS_2026`

- **sourceType:** `government-medical`
- **title:** Symptoms of ADHD
- **authors/organization:** Centers for Disease Control and Prevention (CDC)
- **year:** 2026
- **publicationType:** Government health webpage; updated July 30, 2026
- **journal/series:** CDC ADHD
- **citationText:** Centers for Disease Control and Prevention. Symptoms of ADHD. Updated July 30, 2026.
- **relevanceNote:** Current presentation terminology and high-level symptom education.
- **URL:** https://www.cdc.gov/adhd/signs-symptoms/index.html

### `SRC_CDC_ADHD_DIAGNOSIS_2026`

- **sourceType:** `government-medical`
- **title:** Diagnosing ADHD
- **authors/organization:** Centers for Disease Control and Prevention (CDC)
- **year:** 2026
- **publicationType:** Government health webpage; updated July 30, 2026
- **journal/series:** CDC ADHD
- **citationText:** Centers for Disease Control and Prevention. Diagnosing ADHD. Updated July 30, 2026.
- **relevanceNote:** Diagnostic process, absence of a single test, and non-ADHD conditions that can produce similar symptoms.
- **URL:** https://www.cdc.gov/adhd/diagnosis/index.html

### `SRC_NICE_NG87_2018`

- **sourceType:** `clinical-guideline`
- **title:** Attention deficit hyperactivity disorder: diagnosis and management (NG87)
- **authors/organization:** National Institute for Health and Care Excellence (NICE)
- **year:** 2018
- **publicationType:** Clinical guideline; last updated September 13, 2019; current page includes later amendments
- **journal/series:** NICE Guideline NG87
- **citationText:** National Institute for Health and Care Excellence. Attention deficit hyperactivity disorder: diagnosis and management. NG87. Published March 14, 2018; last updated September 13, 2019.
- **relevanceNote:** Formal diagnosis guardrails, impairment across settings, environmental modifications, structure, work/education/social functioning.
- **URL:** https://www.nice.org.uk/guidance/ng87/chapter/recommendations

### `SRC_WILLCUTT_EF_META_2005`

- **sourceType:** `meta-analysis`
- **title:** Validity of the executive function theory of attention-deficit/hyperactivity disorder: a meta-analytic review
- **authors/organization:** Willcutt EG, Doyle AE, Nigg JT, Faraone SV, Pennington BF
- **year:** 2005
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** Biological Psychiatry 57(11):1336–1346
- **citationText:** Willcutt EG, Doyle AE, Nigg JT, Faraone SV, Pennington BF. Validity of the executive function theory of ADHD: a meta-analytic review. Biol Psychiatry. 2005;57(11):1336-1346. doi:10.1016/j.biopsych.2005.02.006.
- **relevanceNote:** Executive-function constructs including vigilance, working memory, planning and response inhibition; explicitly shows heterogeneity and lack of necessity/sufficiency.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/15950006/
- **DOI:** `10.1016/j.biopsych.2005.02.006`

### `SRC_ALDERSON_WM_META_2013`

- **sourceType:** `meta-analysis`
- **title:** Attention-deficit/hyperactivity disorder (ADHD) and working memory in adults: a meta-analytic review
- **authors/organization:** Alderson RM, Kasper LJ, Hudec KL, Patros CHG
- **year:** 2013
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** Neuropsychology 27(3):287–302
- **citationText:** Alderson RM, Kasper LJ, Hudec KL, Patros CHG. ADHD and working memory in adults: a meta-analytic review. Neuropsychology. 2013;27(3):287-302. doi:10.1037/a0032371.
- **relevanceNote:** Adult working-memory evidence and limitations.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/23688211/
- **DOI:** `10.1037/a0032371`

### `SRC_ALDERSON_INHIBITION_META_2007`

- **sourceType:** `meta-analysis`
- **title:** Attention-Deficit/Hyperactivity Disorder and Behavioral Inhibition: A Meta-Analytic Review of the Stop-signal Paradigm
- **authors/organization:** Alderson RM, Rapport MD, Kofler MJ
- **year:** 2007
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** Journal of Abnormal Child Psychology 35(5):745–758
- **citationText:** Alderson RM, Rapport MD, Kofler MJ. Attention-Deficit/Hyperactivity Disorder and Behavioral Inhibition: A Meta-Analytic Review of the Stop-signal Paradigm. J Abnorm Child Psychol. 2007;35(5):745-758. doi:10.1007/s10802-007-9131-6.
- **relevanceNote:** Response-inhibition evidence with an important specificity qualification.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/17668315/
- **DOI:** `10.1007/s10802-007-9131-6`

### `SRC_JACKSON_DELAY_META_2016`

- **sourceType:** `meta-analysis`
- **title:** Attention-Deficit/Hyperactivity Disorder and Monetary Delay Discounting: A Meta-Analysis of Case-Control Studies
- **authors/organization:** Jackson JNS, MacKillop J
- **year:** 2016
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** Biological Psychiatry: Cognitive Neuroscience and Neuroimaging 1(4):316–325
- **citationText:** Jackson JNS, MacKillop J. Attention-Deficit/Hyperactivity Disorder and Monetary Delay Discounting: A Meta-Analysis of Case-Control Studies. Biol Psychiatry Cogn Neurosci Neuroimaging. 2016;1(4):316-325. doi:10.1016/j.bpsc.2016.01.007.
- **relevanceNote:** Reward/delay-processing evidence; supports group-level association, not individual prediction.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/27722208/
- **DOI:** `10.1016/j.bpsc.2016.01.007`

### `SRC_BEHESHTI_EMOTION_META_2020`

- **sourceType:** `meta-analysis`
- **title:** Emotion dysregulation in adults with attention deficit hyperactivity disorder: a meta-analysis
- **authors/organization:** Beheshti A, Chavanon ML, Christiansen H
- **year:** 2020
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** BMC Psychiatry 20:120
- **citationText:** Beheshti A, Chavanon ML, Christiansen H. Emotion dysregulation in adults with ADHD: a meta-analysis. BMC Psychiatry. 2020;20:120. doi:10.1186/s12888-020-2442-7.
- **relevanceNote:** Adult emotional-regulation association; not a formal diagnostic criterion.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/32164655/
- **DOI:** `10.1186/s12888-020-2442-7`

### `SRC_HUANG_VIGILANCE_META_2012`

- **sourceType:** `meta-analysis`
- **title:** Evaluating vigilance deficits in ADHD: a meta-analysis of CPT performance
- **authors/organization:** Huang-Pollock CL, Karalunas SL, Tam H, Moore AN
- **year:** 2012
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** Journal of Abnormal Psychology 121(2):360–371
- **citationText:** Huang-Pollock CL, Karalunas SL, Tam H, Moore AN. Evaluating vigilance deficits in ADHD: a meta-analysis of CPT performance. J Abnorm Psychol. 2012;121(2):360-371. doi:10.1037/a0027205.
- **relevanceNote:** Sustained attention/vigilance and neurocognitive heterogeneity.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/22428793/
- **DOI:** `10.1037/a0027205`

### `SRC_KOFLER_RTV_META_2013`

- **sourceType:** `meta-analysis`
- **title:** Reaction time variability in ADHD: a meta-analytic review of 319 studies
- **authors/organization:** Kofler MJ, Rapport MD, Sarver DE, Raiker JS, Orban SA, Friedman LM, Kolomeyer EG
- **year:** 2013
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** Clinical Psychology Review 33(6):795–811
- **citationText:** Kofler MJ, Rapport MD, Sarver DE, et al. Reaction time variability in ADHD: a meta-analytic review of 319 studies. Clin Psychol Rev. 2013;33(6):795-811. doi:10.1016/j.cpr.2013.06.001.
- **relevanceNote:** Experimental performance variability; also demonstrates limited specificity versus clinical controls.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/23872284/
- **DOI:** `10.1016/j.cpr.2013.06.001`

### `SRC_SURIANO_PROCRASTINATION_2026`

- **sourceType:** `systematic-review`
- **title:** A systematic review on the association between ADHD and procrastination
- **authors/organization:** Suriano R
- **year:** 2026
- **publicationType:** Peer-reviewed systematic review
- **journal/series:** Research in Developmental Disabilities 175:105342
- **citationText:** Suriano R. A systematic review on the association between ADHD and procrastination. Res Dev Disabil. 2026;175:105342. doi:10.1016/j.ridd.2026.105342.
- **relevanceNote:** Current review of ADHD–procrastination association; mechanisms remain uncertain and procrastination is transdiagnostic.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/42456607/
- **DOI:** `10.1016/j.ridd.2026.105342`

### `SRC_SHIELDS_STRESS_META_2016`

- **sourceType:** `meta-analysis`
- **title:** The effects of acute stress on core executive functions: A meta-analysis and comparison with cortisol
- **authors/organization:** Shields GS, Sazma MA, Yonelinas AP
- **year:** 2016
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** Neuroscience & Biobehavioral Reviews 68:651–668
- **citationText:** Shields GS, Sazma MA, Yonelinas AP. The effects of acute stress on core executive functions: A meta-analysis and comparison with cortisol. Neurosci Biobehav Rev. 2016;68:651-668. doi:10.1016/j.neubiorev.2016.06.038.
- **relevanceNote:** Transdiagnostic evidence that acute stress can alter working memory, cognitive flexibility and aspects of inhibition.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/27371161/
- **DOI:** `10.1016/j.neubiorev.2016.06.038`

### `SRC_CAO_SLEEP_META_2025`

- **sourceType:** `meta-analysis`
- **title:** The impairments of sleep loss on core executive functions: General and task-specific effects
- **authors/organization:** Cao Y, Xie T, Ma N
- **year:** 2025
- **publicationType:** Peer-reviewed meta-analysis
- **journal/series:** Sleep Medicine Reviews 84:102163
- **citationText:** Cao Y, Xie T, Ma N. The impairments of sleep loss on core executive functions: General and task-specific effects. Sleep Med Rev. 2025;84:102163. doi:10.1016/j.smrv.2025.102163.
- **relevanceNote:** Non-specific sleep-loss effects on executive functions including inhibitory control and cognitive flexibility.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/40946426/
- **DOI:** `10.1016/j.smrv.2025.102163`

### `SRC_COUFFE_INTERRUPTION_REVIEW_2017`

- **sourceType:** `peer-reviewed-review`
- **title:** Failures Due to Interruptions or Distractions: A Review and a New Framework
- **authors/organization:** Couffe C, Michael GA
- **year:** 2017
- **publicationType:** Peer-reviewed review
- **journal/series:** American Journal of Psychology 130(2):163–181
- **citationText:** Couffe C, Michael GA. Failures Due to Interruptions or Distractions: A Review and a New Framework. Am J Psychol. 2017;130(2):163-181. doi:10.5406/amerjpsyc.130.2.0163.
- **relevanceNote:** General, non-ADHD-specific interruption/distraction effects and task resumption.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/29461714/
- **DOI:** `10.5406/amerjpsyc.130.2.0163`

### `SRC_IRWIN_SHIFTING_2019`

- **sourceType:** `peer-reviewed-study`
- **title:** Do children with attention-deficit/hyperactivity disorder (ADHD) have set shifting deficits?
- **authors/organization:** Irwin LN, Kofler MJ, Soto EF, Groves NB
- **year:** 2019
- **publicationType:** Peer-reviewed experimental study with critical review of prior shifting literature
- **journal/series:** Neuropsychology 33(4):470–481
- **citationText:** Irwin LN, Kofler MJ, Soto EF, Groves NB. Do children with ADHD have set shifting deficits? Neuropsychology. 2019;33(4):470-481. doi:10.1037/neu0000546.
- **relevanceNote:** Supports conservative Moderate status for task switching/set shifting; highlights construct-validity and specificity limits.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/30945912/
- **DOI:** `10.1037/neu0000546`

### `SRC_BOTVINICK_MOTIVATION_REVIEW_2015`

- **sourceType:** `peer-reviewed-review`
- **title:** Motivation and cognitive control: from behavior to neural mechanism
- **authors/organization:** Botvinick M, Braver T
- **year:** 2015
- **publicationType:** Peer-reviewed review
- **journal/series:** Annual Review of Psychology 66:83–113
- **citationText:** Botvinick M, Braver T. Motivation and cognitive control: from behavior to neural mechanism. Annu Rev Psychol. 2015;66:83-113. doi:10.1146/annurev-psych-010814-015044.
- **relevanceNote:** General motivation/reward–cognitive-control interaction; used only for non-specific contextual modulation, not as ADHD-specific evidence.
- **URL:** https://pubmed.ncbi.nlm.nih.gov/25251491/
- **DOI:** `10.1146/annurev-psych-010814-015044`

## 14. EvidenceMetadata Registry
Evidence records are reusable across nodes, edges and pathways; there is intentionally **not** one EvidenceMetadata record per edge. All records use `lastReviewedDate: 2026-09-20` and `reviewVersion: 1.1.0`.
| Evidence ID | Level | Epistemic status | Construct status | Language strategy | Summary | Limitations | SourceReference IDs | Last reviewed | Review version |
|---|---|---|---|---|---|---|---|---|---|
| `EVID_CLINICAL_ANCHORS` | `Clinical` | `formal-clinical` | `formal-diagnostic-domain` | language-neutral core + localized consumer caution | ADHD clinical criteria are organized around inattention and hyperactivity/impulsivity, with diagnosis requiring persistent symptoms, functional impact and multi-setting assessment. | Formal clinical definitions do not make explanatory Regulation constructs diagnostic criteria. | `SRC_NIMH_ADHD_2024`, `SRC_CDC_ADHD_SYMPTOMS_2026`, `SRC_NICE_NG87_2018` | `2026-09-20` | `1.1.0` |
| `EVID_PRESENTATION_TERMINOLOGY` | `Clinical` | `formal-clinical` | `formal-presentation-terminology` | language-neutral core + localized consumer caution | Current educational terminology distinguishes inattentive, hyperactive-impulsive, and combined presentations; historical ADD is not a fourth current presentation. | Presentation terminology must not be inferred from Behaviour Explorer state. | `SRC_NIMH_ADHD_2024`, `SRC_CDC_ADHD_SYMPTOMS_2026` | `2026-09-20` | `1.1.0` |
| `EVID_ATTENTION_REGULATION` | `Strong` | `group-level-association` | `associated-process` | language-neutral core + localized consumer caution | Attention/vigilance difficulties are well represented in ADHD research at group level. | Attention findings are heterogeneous, task-dependent, not ADHD-specific, and do not define an individual profile. | `SRC_WILLCUTT_EF_META_2005`, `SRC_HUANG_VIGILANCE_META_2012` | `2026-09-20` | `1.1.0` |
| `EVID_WORKING_MEMORY` | `Strong` | `group-level-association` | `associated-process` | language-neutral core + localized consumer caution | Working-memory weaknesses are supported across ADHD research, including adult meta-analytic evidence. | Group differences are heterogeneous and working-memory performance is not a diagnostic criterion. | `SRC_WILLCUTT_EF_META_2005`, `SRC_ALDERSON_WM_META_2013` | `2026-09-20` | `1.1.0` |
| `EVID_GOAL_MANAGEMENT` | `Moderate` | `group-level-association` | `associated-process` | language-neutral core + localized consumer caution | Planning and goal-directed executive processes are relevant to ADHD research and to everyday organization and follow-through. | The frozen Goal Management node is a broader educational construct than any single laboratory measure. | `SRC_WILLCUTT_EF_META_2005`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_RESPONSE_INHIBITION` | `Strong` | `group-level-association` | `associated-process` | language-neutral core + localized consumer caution | Response-inhibition differences are supported in ADHD research, while some stop-signal findings may also reflect broader attention/cognitive processing. | Response inhibition is associated, not necessary, sufficient, or equivalent to clinical impulsivity. | `SRC_WILLCUTT_EF_META_2005`, `SRC_ALDERSON_INHIBITION_META_2007` | `2026-09-20` | `1.1.0` |
| `EVID_REWARD_DELAY` | `Moderate` | `group-level-association` | `associated-process` | language-neutral core + localized consumer caution | ADHD groups show a reliable association with steeper monetary delay discounting, supporting relevance of reward/delay processing. | Delay discounting is not an ADHD-specific marker and cannot predict an individual's choices. | `SRC_JACKSON_DELAY_META_2016`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_EMOTIONAL_REGULATION` | `Strong` | `group-level-association` | `associated-process` | language-neutral core + localized consumer caution | Emotional dysregulation is strongly associated with adult ADHD samples. | It is not one of the two formal Clinical Anchor symptom domains and is not diagnostic by itself. | `SRC_BEHESHTI_EMOTION_META_2020`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_TASK_SWITCHING` | `Moderate` | `mixed-association` | `associated-process` | language-neutral core + localized consumer caution | Set shifting/task switching has moderate group-level support in prior meta-analytic literature, but construct validity and specificity are contested. | Do not present task switching as a universal or uniquely ADHD-specific deficit. | `SRC_WILLCUTT_EF_META_2005`, `SRC_IRWIN_SHIFTING_2019` | `2026-09-20` | `1.1.0` |
| `EVID_SLEEP_CONTEXT` | `Strong` | `transdiagnostic-context` | `non-specific-context` | language-neutral core + localized consumer caution | Sleep loss can alter attention and executive performance, including inhibitory control and flexibility. | This evidence is transdiagnostic; sleep-related effects do not indicate ADHD. | `SRC_CAO_SLEEP_META_2025`, `SRC_CDC_ADHD_DIAGNOSIS_2026`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_STRESS_CONTEXT` | `Moderate` | `transdiagnostic-context` | `non-specific-context` | language-neutral core + localized consumer caution | Acute stress can alter working memory and cognitive flexibility, with more nuanced effects on inhibition. | Stress effects vary by task and person and are not specific to ADHD. | `SRC_SHIELDS_STRESS_META_2016`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_INTERRUPTION_CONTEXT` | `Strong` | `transdiagnostic-context` | `non-specific-context` | language-neutral core + localized consumer caution | Interruptions and distractions can impair ongoing performance and create resumption/reorientation demands. | The review is general human-performance evidence, not ADHD-specific evidence. | `SRC_COUFFE_INTERRUPTION_REVIEW_2017` | `2026-09-20` | `1.1.0` |
| `EVID_EXTERNAL_STRUCTURE` | `Moderate` | `clinical-guidance-plus-synthesis` | `supportive-context` | language-neutral core + localized consumer caution | Clinical guidance recognizes environmental modifications and daily structure as relevant supports for functioning with ADHD. | Guidance supports the practical relevance of structure; it does not directly prove each frozen Working Memory or Goal Management mechanism. | `SRC_NICE_NG87_2018`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_TASK_COMPLEXITY` | `Strong` | `construct-level-synthesis` | `non-specific-context` | language-neutral core + localized consumer caution | Greater multi-step cognitive/organizational demand is compatible with increased working-memory and planning demands. | The context-to-specific-regulation links are educational construct mappings, not ADHD-specific causal claims. | `SRC_WILLCUTT_EF_META_2005`, `SRC_ALDERSON_WM_META_2013`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_SALIENCE_REWARD_CONTEXT` | `Moderate` | `construct-level-synthesis` | `non-specific-context` | language-neutral core + localized consumer caution | Task salience, reward value and temporal immediacy can influence attention, motivation and cognitive control; ADHD research also supports delay-related differences at group level. | Specific Context → Regulation edges are qualitative educational mappings, not individual predictions. | `SRC_JACKSON_DELAY_META_2016`, `SRC_BOTVINICK_MOTIVATION_REVIEW_2015`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_PROCRASTINATION_PATTERN` | `Moderate` | `association` | `recurring-pattern` | language-neutral core + localized consumer caution | A 2026 systematic review supports an association between ADHD and procrastination, especially with inattentive symptoms, while mechanisms remain incompletely resolved. | Procrastination is transdiagnostic; one delayed start is insufficient and no diagnostic threshold is encoded. | `SRC_SURIANO_PROCRASTINATION_2026`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_PERFORMANCE_VARIABILITY_EXPERIMENTAL` | `Strong` | `experimental-association` | `recurring-pattern` | language-neutral core + localized consumer caution | Reaction-time variability is robustly elevated in ADHD groups relative to nonclinical controls across many laboratory studies. | Experimental reaction-time variability is not specific to ADHD and is not equivalent to every everyday experience of inconsistency. | `SRC_KOFLER_RTV_META_2013` | `2026-09-20` | `1.1.0` |
| `EVID_PERFORMANCE_VARIABILITY_EVERYDAY` | `Moderate` | `educational-synthesis` | `recurring-pattern` | language-neutral core + localized consumer caution | The frozen everyday Performance Variability pattern is an educational bridge from repeated context/time variation to a broader lived-experience concept. | Do not equate everyday inconsistency with laboratory reaction-time variability or use it as a diagnostic marker. | `SRC_KOFLER_RTV_META_2013`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_FUNCTIONAL_DOMAINS` | `Clinical` | `formal-functional-relevance` | `functional-domain` | language-neutral core + localized consumer caution | ADHD diagnosis and clinical guidance require attention to interference/impairment across important life settings and domains. | A FunctionalExample in this product illustrates where a difficulty could matter; it does not establish clinically significant impairment. | `SRC_NIMH_ADHD_2024`, `SRC_NICE_NG87_2018` | `2026-09-20` | `1.1.0` |
| `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `Moderate` | `educational-synthesis` | `functional-link` | language-neutral core + localized consumer caution | Frozen Behaviour/Pattern → Functional Domain links are curated educational mappings consistent with recognized work, learning, relationship and daily-life impacts. | Specific edges are not quantitative causal estimates and do not predict impairment. | `SRC_NIMH_ADHD_2024`, `SRC_NICE_NG87_2018` | `2026-09-20` | `1.1.0` |
| `EVID_URGENCY_FEEDBACK_LOOP` | `Limited` | `educational-synthesis` | `feedback-loop` | language-neutral core + localized consumer caution | The Procrastination/Urgency loop combines supported procrastination, reward/delay and urgency concepts into a plausible educational reciprocal sequence. | The complete loop has not been established as one universal ADHD mechanism; it is not ADHD-specific. | `SRC_SURIANO_PROCRASTINATION_2026`, `SRC_JACKSON_DELAY_META_2016`, `SRC_BOTVINICK_MOTIVATION_REVIEW_2015` | `2026-09-20` | `1.1.0` |
| `EVID_FUNCTION_STRESS_FEEDBACK_LOOP` | `Limited` | `transdiagnostic-educational-synthesis` | `feedback-loop` | language-neutral core + localized consumer caution | Functional difficulty and stress can plausibly reinforce each other through transdiagnostic executive demands. | The frozen feedback edges are educational synthesis, not proof of a deterministic reciprocal causal loop. | `SRC_SHIELDS_STRESS_META_2016`, `SRC_NICE_NG87_2018`, `SRC_NIMH_ADHD_2024` | `2026-09-20` | `1.1.0` |
| `EVID_ALTERNATIVE_EXPLANATIONS` | `Clinical` | `clinical-safety-context` | `differential-caution` | language-neutral core + localized consumer caution | Sleep problems, stress, anxiety, depression/low mood, physical illness and other factors can produce ADHD-like difficulties, requiring clinical evaluation rather than product inference. | The product must present these only as broad possible contributors and must not perform differential diagnosis. | `SRC_NIMH_ADHD_2024`, `SRC_CDC_ADHD_DIAGNOSIS_2026`, `SRC_NICE_NG87_2018` | `2026-09-20` | `1.1.0` |

### 14.1 Evidence-level interpretation

`Clinical` means formal clinical definition/guidance, not stronger mechanistic causality. `Strong` means converging evidence supports group-level association or construct relevance. `Moderate` means meaningful but heterogeneous/non-specific evidence. `Limited` is retained for educational syntheses whose complete loop or exact mapping is weaker than the evidence for their constituent constructs.
No evidence level is an individual probability, diagnostic weight, or edge strength.
## 15. Edge-to-Evidence Mapping
All 49 canonical edges map to reusable evidence metadata. Support classification means: `direct` = evidence directly bears on the relationship at the relevant construct level; `construct-level` = the endpoints are supported but the exact frozen educational wording is broader than a directly tested relation; `synthesis` = an educational mapping/feedback relation assembled from multiple supported constructs without claiming a single directly tested causal pathway.
| Edge ID | EvidenceMetadata IDs | Support | Caution / qualification |
|---|---|---|---|
| `EDGE_CTX1_REG1_MODULATES` | `EVID_SLEEP_CONTEXT`, `EVID_ATTENTION_REGULATION` | `construct-level` | Sleep effects are transdiagnostic; no individual prediction. |
| `EDGE_CTX1_REG4_MODULATES` | `EVID_SLEEP_CONTEXT`, `EVID_RESPONSE_INHIBITION` | `construct-level` | Sleep effects are transdiagnostic and task-dependent. |
| `EDGE_CTX2_REG1_MODULATES` | `EVID_STRESS_CONTEXT`, `EVID_ATTENTION_REGULATION` | `construct-level` | Stress effects vary by task and are not ADHD-specific. |
| `EDGE_CTX2_REG2_MODULATES` | `EVID_STRESS_CONTEXT`, `EVID_WORKING_MEMORY` | `direct` | Meta-analytic acute-stress evidence supports Working Memory effects; still transdiagnostic. |
| `EDGE_CTX2_REG6_MODULATES` | `EVID_STRESS_CONTEXT`, `EVID_EMOTIONAL_REGULATION` | `construct-level` | The exact Context→Regulation formulation is qualitative. |
| `EDGE_CTX3_REG1_MODULATES` | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_ATTENTION_REGULATION` | `construct-level` | Motivation/salience can shape attention generally; not an ADHD-specific edge. |
| `EDGE_CTX3_REG5_MODULATES` | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY` | `construct-level` | Task interest/salience is broader than laboratory delay-discounting measures. |
| `EDGE_CTX4_REG5_MODULATES` | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY` | `synthesis` | Urgency is represented as changing consequence immediacy; direction is variable. |
| `EDGE_CTX5_REG5_MODULATES` | `EVID_SALIENCE_REWARD_CONTEXT`, `EVID_REWARD_DELAY` | `direct` | Reward delay/immediacy is directly relevant at construct level; no individual prediction. |
| `EDGE_CTX6_REG2_MODULATES` | `EVID_TASK_COMPLEXITY`, `EVID_WORKING_MEMORY` | `construct-level` | Non-specific cognitive-demand mapping; not ADHD-specific causality. |
| `EDGE_CTX6_REG3_MODULATES` | `EVID_TASK_COMPLEXITY`, `EVID_GOAL_MANAGEMENT` | `construct-level` | Non-specific planning/organizational-demand mapping. |
| `EDGE_CTX7_REG2_MODULATES` | `EVID_EXTERNAL_STRUCTURE`, `EVID_WORKING_MEMORY` | `synthesis` | Guidance supports external structure; the Working Memory mechanism is an educational synthesis. |
| `EDGE_CTX7_REG3_MODULATES` | `EVID_EXTERNAL_STRUCTURE`, `EVID_GOAL_MANAGEMENT` | `synthesis` | Guidance supports external structure; the Goal Management mechanism is an educational synthesis. |
| `EDGE_CTX8_REG1_MODULATES` | `EVID_INTERRUPTION_CONTEXT`, `EVID_ATTENTION_REGULATION` | `direct` | General interruption evidence, not ADHD-specific. |
| `EDGE_CTX8_REG7_MODULATES` | `EVID_INTERRUPTION_CONTEXT`, `EVID_TASK_SWITCHING` | `construct-level` | Interruptions create resumption/reorientation demand; ADHD-specific switching evidence is mixed. |
| `EDGE_REG1_BEH2_CONTRIBUTES_TO` | `EVID_ATTENTION_REGULATION` | `construct-level` | Sustaining is an observable educational Behaviour, not a laboratory vigilance score. |
| `EDGE_REG2_BEH4_CONTRIBUTES_TO` | `EVID_WORKING_MEMORY` | `construct-level` | Keeping Track is an educational behavioural expression, not a direct Working Memory test. |
| `EDGE_REG2_BEH5_CONTRIBUTES_TO` | `EVID_WORKING_MEMORY`, `EVID_GOAL_MANAGEMENT` | `construct-level` | Organizing/Sequencing can draw on multiple executive processes. |
| `EDGE_REG3_BEH1_CONTRIBUTES_TO` | `EVID_GOAL_MANAGEMENT` | `synthesis` | Starting is multi-determined; Goal Management is one plausible contributor. |
| `EDGE_REG3_BEH5_CONTRIBUTES_TO` | `EVID_GOAL_MANAGEMENT` | `construct-level` | Planning/sequencing evidence supports the construct-level mapping. |
| `EDGE_REG3_BEH6_CONTRIBUTES_TO` | `EVID_GOAL_MANAGEMENT` | `synthesis` | Follow-through is multi-determined; this is not a unique mechanism. |
| `EDGE_REG4_BEH7_CONTRIBUTES_TO` | `EVID_RESPONSE_INHIBITION` | `construct-level` | Response Inhibition is distinct from formal clinical impulsivity. |
| `EDGE_REG5_BEH1_CONTRIBUTES_TO` | `EVID_REWARD_DELAY` | `construct-level` | Group-level delay/reward evidence does not predict an individual's Starting. |
| `EDGE_REG5_BEH2_CONTRIBUTES_TO` | `EVID_REWARD_DELAY`, `EVID_SALIENCE_REWARD_CONTEXT` | `synthesis` | Persistence/continued engagement is a broader behavioural interpretation. |
| `EDGE_REG6_BEH1_CONTRIBUTES_TO` | `EVID_EMOTIONAL_REGULATION`, `EVID_STRESS_CONTEXT` | `synthesis` | Emotional Regulation is one possible contributor to Starting. |
| `EDGE_REG6_BEH7_CONTRIBUTES_TO` | `EVID_EMOTIONAL_REGULATION` | `synthesis` | Pausing behaviour is not equivalent to an Emotional Regulation measure. |
| `EDGE_REG7_BEH3_CONTRIBUTES_TO` | `EVID_TASK_SWITCHING` | `construct-level` | Task-switching specificity in ADHD is mixed; keep Moderate status. |
| `EDGE_BEH1_PAT1_CONTRIBUTES_TO` | `EVID_PROCRASTINATION_PATTERN` | `construct-level` | Repeated intended maladaptive delay is required; one delayed start is insufficient. |
| `EDGE_BEH2_PAT2_CONTRIBUTES_TO` | `EVID_PERFORMANCE_VARIABILITY_EXPERIMENTAL`, `EVID_PERFORMANCE_VARIABILITY_EVERYDAY` | `synthesis` | Everyday inconsistency must not be equated with laboratory reaction-time variability. |
| `EDGE_BEH4_PAT2_CONTRIBUTES_TO` | `EVID_PERFORMANCE_VARIABILITY_EXPERIMENTAL`, `EVID_PERFORMANCE_VARIABILITY_EVERYDAY` | `synthesis` | Everyday inconsistency must not be equated with laboratory reaction-time variability. |
| `EDGE_BEH6_PAT2_CONTRIBUTES_TO` | `EVID_PERFORMANCE_VARIABILITY_EXPERIMENTAL`, `EVID_PERFORMANCE_VARIABILITY_EVERYDAY` | `synthesis` | Everyday inconsistency must not be equated with laboratory reaction-time variability. |
| `EDGE_BEH4_FUN1_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_BEH4_FUN4_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_BEH5_FUN1_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_BEH5_FUN2_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_BEH6_FUN1_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_BEH6_FUN2_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_BEH6_FUN4_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_BEH7_FUN3_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_PAT1_FUN1_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_PAT1_FUN2_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_PAT1_FUN4_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_PAT2_FUN1_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_PAT2_FUN2_CONTRIBUTES_TO` | `EVID_FUNCTIONAL_DOMAINS`, `EVID_FUNCTIONAL_EDGE_SYNTHESIS` | `synthesis` | Functional-domain linkage is educational; it does not establish clinically significant impairment. |
| `EDGE_PAT1_CTX4_FEEDBACK_WITH` | `EVID_URGENCY_FEEDBACK_LOOP`, `EVID_PROCRASTINATION_PATTERN`, `EVID_REWARD_DELAY` | `synthesis` | Educational reciprocal loop; not universal or ADHD-specific. |
| `EDGE_FUN1_CTX2_FEEDBACK_WITH` | `EVID_FUNCTION_STRESS_FEEDBACK_LOOP`, `EVID_STRESS_CONTEXT`, `EVID_FUNCTIONAL_DOMAINS` | `synthesis` | Transdiagnostic educational feedback relation; not deterministic. |
| `EDGE_FUN2_CTX2_FEEDBACK_WITH` | `EVID_FUNCTION_STRESS_FEEDBACK_LOOP`, `EVID_STRESS_CONTEXT`, `EVID_FUNCTIONAL_DOMAINS` | `synthesis` | Transdiagnostic educational feedback relation; not deterministic. |
| `EDGE_FUN3_CTX2_FEEDBACK_WITH` | `EVID_FUNCTION_STRESS_FEEDBACK_LOOP`, `EVID_STRESS_CONTEXT`, `EVID_FUNCTIONAL_DOMAINS` | `synthesis` | Transdiagnostic educational feedback relation; not deterministic. |
| `EDGE_FUN4_CTX2_FEEDBACK_WITH` | `EVID_FUNCTION_STRESS_FEEDBACK_LOOP`, `EVID_STRESS_CONTEXT`, `EVID_FUNCTIONAL_DOMAINS` | `synthesis` | Transdiagnostic educational feedback relation; not deterministic. |

**Evidence review flags:** No frozen edge is deleted or silently upgraded. No edge remains without an evidence basis appropriate to its intended educational status. Several edges intentionally remain `synthesis` and the two feedback-loop evidence records remain `Limited`; that limitation is a resolved epistemic classification, not an unfilled production field.
## 16. Safety Registry
The eight mandatory bilingual safety contexts are normalized under stable family IDs. The production localization layer resolves the EN/FA text for each family; ordinary content configuration must not disable them.
| Stable safety ID | Context | English | Persian | Display requirement |
|---|---|---|---|---|
| `SAFETY_GLOBAL_EDUCATIONAL_DISCLAIMER` | `global-educational-disclaimer` | This is an educational model of ADHD-related concepts and research. It does not diagnose ADHD or provide individualized medical advice. | این یک مدل آموزشی درباره مفاهیم و پژوهش‌های مرتبط با ADHD است و برای تشخیص ADHD یا ارائه توصیه پزشکی شخصی طراحی نشده است. | `mandatory` |
| `SAFETY_GRAPH_DISCLAIMER` | `graph-disclaimer` | Connections show possible associations or influences, not universal causal pathways. | ارتباط‌ها مسیرهای احتمالی اثرگذاری یا ارتباط را نشان می‌دهند، نه زنجیره‌های علّی قطعی و همگانی. | `mandatory` |
| `SAFETY_BEHAVIOUR_EXPLORER` | `behaviour-explorer` | This behaviour alone does not indicate ADHD and may have several different explanations. | این رفتار به‌تنهایی نشان‌دهنده ADHD نیست و می‌تواند توضیح‌های متفاوتی داشته باشد. | `mandatory` |
| `SAFETY_ALTERNATIVE_EXPLANATION` | `alternative-explanation-reminder` | Similar difficulties can occur for reasons unrelated to ADHD. | مشکلات مشابه می‌توانند به دلایلی غیرمرتبط با ADHD هم رخ دهند. | `mandatory` |
| `SAFETY_RECURRING_PATTERN` | `recurring-pattern-caution` | One event is not enough to establish a recurring pattern. | یک اتفاق منفرد برای شکل‌گیری یا نتیجه‌گیری درباره یک الگوی تکرارشونده کافی نیست. | `mandatory` |
| `SAFETY_FUNCTIONAL_IMPACT` | `functional-impact-caution` | A difficulty in this area does not automatically mean clinically significant impairment. | وجود دشواری در این حوزه به‌تنهایی به معنای اختلال عملکرد بالینی قابل‌توجه نیست. | `mandatory` |
| `SAFETY_PRESENTATION_CAUTION` | `presentation-caution` | ADHD presentations are based on formal clinical symptom domains, not this explanatory graph. | presentationهای ADHD بر اساس حوزه‌های رسمی علائم بالینی تعریف می‌شوند، نه بر اساس این نمودار توضیحی. | `mandatory` |
| `SAFETY_GROUP_LEVEL_EVIDENCE` | `group-level-evidence-caution` | Research findings describe group-level tendencies and do not define an individual profile. | یافته‌های پژوهشی روندهای سطح گروه را توصیف می‌کنند و پروفایل یک فرد را تعیین نمی‌کنند. | `mandatory` |

These records preserve the frozen medical meaning. Any future wording-only edit must remain semantically equivalent and may not weaken diagnosis, causality, impairment, presentation, or group-to-individual cautions.
## 17. Localization Completeness Matrix
| Production category | EN | FA | Verification |
|---|---|---|---|
| Canonical node labels | Complete | Complete | 30/30 node labels present. |
| Behaviour statements | Complete | Complete | 7/7 representative entry records bilingual. |
| Pathway explanations | Complete | Complete | 22/22 MVP pathway records bilingual. |
| Context mappings | Complete | Complete | 24/24 finalized mapping records bilingual. |
| Pattern rules | Complete | Complete | PAT1 and PAT2 rule, caution and examples bilingual. |
| Functional examples | Complete | Complete | 28/28 illustrative records bilingual across FUN1–FUN4. |
| Alternative explanations | Complete | Complete | 13/13 approved broad categories bilingual. |
| Feedback loops | Complete | Complete | 2/2 MVP loops bilingual. |
| Presentation education | Complete | Complete | 4/4 records bilingual. |
| Evidence explanation where localized | Complete | Complete | Evidence core remains language-neutral; all user-facing evidence/safety cautions have EN/FA localization strategy. |
| Safety copy | Complete | Complete | 8/8 mandatory safety families bilingual. |

No mandatory MVP localization row remains incomplete.
## 18. Evidence Review Notes
### 18.1 Review date and version

Fresh scientific/source review was completed on **2026-09-20**. Therefore all new EvidenceMetadata records use `lastReviewedDate: 2026-09-20`; no historical review date is fabricated. The source/evidence set changes materially relative to the illustrative machine-readable example, so `evidenceReviewVersion` is `1.1.0` while ontology/content versions stay frozen.
### 18.2 Placeholder-source cleanup

The Machine-Readable Knowledge Model's example IDs are not production bibliography. `SRC_EXEC_REVIEW` is removed and replaced contextually by real records such as `SRC_WILLCUTT_EF_META_2005`, `SRC_ALDERSON_WM_META_2013`, and `SRC_ALDERSON_INHIBITION_META_2007`. Generic example IDs such as `SRC_ADULT_ADHD_REVIEW` are not given a fake one-to-one alias; each production claim now references the specific authoritative or peer-reviewed source(s) appropriate to that claim.
### 18.3 Important scientific limitations retained

- Executive-function differences are associated with ADHD at group level, but are neither necessary nor sufficient for ADHD and are heterogeneous.
- Emotional Regulation is an associated explanatory construct, not a formal Clinical Anchor symptom domain.
- Response Inhibition is distinct from formal clinical impulsivity.
- Task Switching remains `Moderate` because construct validity and ADHD specificity are mixed.
- Experimental reaction-time variability has stronger evidence than the broad everyday notion of inconsistency; PAT2 preserves that distinction.
- Stress, sleep, distraction, task demand, external structure and motivation/reward contexts are substantially non-specific or transdiagnostic; they must not be displayed as ADHD markers.
- Feedback loops are educational syntheses and remain `Limited`, not universal mechanisms.
### 18.4 Source Conflict Check

| Check | Result |
|---|---|
| Canonical node identity vs Ontology/Handoff | Pass — exactly 30 frozen nodes; no new node or repurposed ID. |
| Canonical edges vs Handoff/Machine Model | Pass — exactly 49 endpoint/type pairs; no edge added, removed, reversed, weighted, or made numeric. |
| Relationship semantics vs Visual Grammar/Handoff | Pass — `MODULATES`, `CONTRIBUTES_TO`, `FEEDBACK_WITH` only; language remains qualitative. |
| Behaviour Framework pathways | Pass — pathways preserve supported asymmetry; no equal-count fabrication. |
| Causal wording | Pass — new text uses `may`, `can`, `associated`, `increase demand`, `buffer`, or `synthesis`; no frozen `may contribute` was strengthened to `causes`. |
| Group evidence vs individual interpretation | Pass — every evidence class is explicitly non-predictive at individual level. |
| Pattern thresholds | Pass — conceptual repetition rules only; no diagnostic threshold. |
| Functional examples | Pass — illustrative; canonical-edge status is explicitly separated from non-edge examples. |
| Presentations | Pass — Clinical Anchor only; isolated from Behaviour Explorer state. |
| Alternative explanations | Pass — contributors only; no differential diagnosis, elimination, ranking, or likelihood. |
| Safety copy | Pass — eight frozen contexts preserved and mandatory. |
### 18.5 Research interpretation notes

The evidence registry intentionally combines authoritative clinical sources with peer-reviewed reviews/meta-analyses. Directness is not treated as uniform: for example, acute-stress effects on Working Memory have meta-analytic support, while External Structure → Working Memory is a clinically plausible educational synthesis based on guidance and construct evidence rather than a directly tested ADHD-specific causal pathway. This distinction is encoded in Section 15 rather than hidden.
## 19. Production Invariants
- [x] Canonical node count is exactly 30.
- [x] Canonical edge count is exactly 49.
- [x] Canonical IDs are immutable within compatible releases and are never repurposed.
- [x] Only MODULATES, CONTRIBUTES_TO, and FEEDBACK_WITH are canonical relationship types.
- [x] No edge contains numeric strength, probability, percentage, causal weight, or confidence.
- [x] Clinical Anchors CA1/CA2 do not become sources of mechanistic explanatory edges.
- [x] Regulation constructs are not presented as formal ADHD diagnostic criteria.
- [x] BehaviourEntryStatement is navigation content, never a questionnaire or scoring item.
- [x] EducationalPathway is a curated possibility, never personalized inference.
- [x] ContextMapping is qualitative and never predicts user performance.
- [x] One event cannot establish PAT1 or PAT2.
- [x] PAT2 everyday content never claims equivalence with laboratory reaction-time variability.
- [x] FunctionalExample never establishes clinically significant impairment.
- [x] AlternativeExplanation never performs differential diagnosis, ranking, exclusion, or likelihood.
- [x] PresentationEducation references Clinical Anchors only and is isolated from Behaviour Explorer state.
- [x] Feedback loops are possible educational syntheses, not inevitable mechanisms and not treatment advice.
- [x] English and Persian share the same canonical IDs, edges, evidence IDs, and scientific semantics.
- [x] Localization may change wording but not scientific identity.
- [x] Group-level evidence never becomes an individual profile.
- [x] All source IDs in production resolve to real SourceReference records; illustrative placeholder source IDs are prohibited.
- [x] All EvidenceMetadata records have explicit sources, limitations, actual last-reviewed date, and reviewVersion.
- [x] Mandatory safety content cannot be disabled by ordinary content configuration.
- [x] No ADHD likelihood, diagnostic confidence, severity score, symptom score, screening threshold, presentation prediction, mechanism probability, treatment recommendation, or personalized medical advice exists in this knowledge pack.

### 19.1 Final Production Package Manifest

```text
schemaVersion: 1.0.0
ontologyVersion: 1.0.1
visualGrammarVersion: 1.0.1
behaviourFrameworkVersion: 1.0.0
contentModelVersion: 1.0.0
evidenceReviewVersion: 1.1.0
knowledgeReleaseId: ADHD-KNOWLEDGE-2026-09-20-R1
releaseDate: 2026-09-20
languages: [en, fa]
publicationStatus: reviewed-production
```
## 20. WP-02 Readiness Audit
| Original blocker | Status | Verification |
|---|---|---|
| knowledgeReleaseId | Resolved | `ADHD-KNOWLEDGE-2026-09-20-R1` |
| stable 49-edge ID registry | Resolved | 49/49 deterministic IDs in Section 4 |
| SourceReference registry | Resolved | 17 real authoritative/peer-reviewed source records in Section 13 |
| EvidenceMetadata registry | Resolved | 23 reusable evidence records in Section 14 |
| unresolved example source IDs removed/resolved | Resolved | Production registry contains no `SRC_EXEC_REVIEW` or other placeholder source ID |
| evidence review dates | Resolved | 2026-09-20 on all closure-stage EvidenceMetadata |
| bilingual pathways | Resolved | 22/22 complete |
| Persian Context mappings | Resolved | 24/24 complete |
| Persian Pattern rules | Resolved | PAT1/PAT2 complete |
| bilingual Functional examples | Resolved | 28/28 complete |
| Persian Alternative Explanations | Resolved | 13/13 complete |
| Persian Feedback loops | Resolved | 2/2 complete |
| bilingual Presentation Education | Resolved | 4/4 complete |
| English Behaviour entry statements | Resolved | 7/7 complete |

**Readiness conclusion:** All mandatory blocker fields listed by Stage 7.2 are populated. Evidence limitations remain explicit where science is weaker or transdiagnostic, but no mandatory production record is absent. WP-02 can resume using this package as the production knowledge input while retaining the frozen ontology, visual grammar, Behaviour Framework, machine-readable content contract, and Engineering Architecture.

PRODUCTION KNOWLEDGE STATUS: READY FOR WP-02