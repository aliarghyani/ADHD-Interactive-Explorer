<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { nextRovingRadioIndex } from '../../../accessibility/roving-radio'
import type { ContextCopy } from '../../../features/context-feedback/copy'
import {
  isQualitativeState,
  qualitativeStates,
  type ContextDetail,
  type ContextEvidencePreview,
  type QualitativeState,
} from '../../../features/context-feedback/model'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'
import ContextEvidencePreviewPanel from './ContextEvidencePreview.vue'

const props = defineProps<{
  locale: 'en' | 'fa'
  detail: ContextDetail
  copy: ContextCopy
  requestedState: string | null
}>()

const emit = defineEmits<{
  stateChange: [state: QualitativeState]
  reset: []
}>()

const initialState = (): QualitativeState => isQualitativeState(props.requestedState) ? props.requestedState : 'neutral'
const selectedState = ref<QualitativeState>(initialState())
const openEvidenceId = ref<string | null>(null)
const evidencePreview = ref<{ focusHeading: () => void } | null>(null)
const evidenceTrigger = ref<HTMLElement | null>(null)
const openFeedbackIds = ref(new Set<string>())
const compactLayout = ref(false)
const selectedMappingId = ref(props.detail.mappings[0]?.id ?? '')
let compactQuery: MediaQueryList | null = null

const invalidState = computed(() => props.requestedState !== null && !isQualitativeState(props.requestedState))
const evidenceReturnPath = computed(() => {
  const path = `/${props.locale}/context/${props.detail.id}`
  return isQualitativeState(props.requestedState) && props.requestedState !== 'neutral'
    ? `${path}?state=${props.requestedState}`
    : path
})
const evidenceEntries = computed(() => [
  ...props.detail.mappings.flatMap((mapping) => [mapping.contextEvidence, mapping.behaviourEvidence]),
  ...props.detail.feedbackLoops.map((loop) => loop.evidenceEntry),
])
const openEvidence = computed<ContextEvidencePreview | null>(() =>
  evidenceEntries.value.find((entry) => entry.id === openEvidenceId.value) ?? null,
)
const visibleMappings = computed(() => compactLayout.value
  ? props.detail.mappings.filter((mapping) => mapping.id === selectedMappingId.value)
  : props.detail.mappings)
const stateDescription = computed(() => {
  if (selectedState.value === 'supportive') return props.copy.supportiveDescription
  if (selectedState.value === 'demanding') return props.copy.demandingDescription
  return props.copy.neutralDescription
})

watch(() => [props.detail.id, props.requestedState] as const, () => {
  selectedState.value = initialState()
  openEvidenceId.value = null
  openFeedbackIds.value = new Set()
  selectedMappingId.value = props.detail.mappings[0]?.id ?? ''
})

function syncCompactLayout(event: MediaQueryList | MediaQueryListEvent): void {
  compactLayout.value = event.matches
}

onMounted(() => {
  compactQuery = window.matchMedia('(max-width: 52rem)')
  syncCompactLayout(compactQuery)
  compactQuery.addEventListener('change', syncCompactLayout)
})

onUnmounted(() => compactQuery?.removeEventListener('change', syncCompactLayout))

function selectState(state: QualitativeState): void {
  selectedState.value = state
  openEvidenceId.value = null
  emit('stateChange', state)
}

async function moveStateRadio(state: QualitativeState, event: KeyboardEvent): Promise<void> {
  const currentIndex = qualitativeStates.indexOf(state)
  const nextIndex = nextRovingRadioIndex(qualitativeStates.length, currentIndex, event.key)
  if (nextIndex === null) return
  event.preventDefault()
  const nextState = qualitativeStates[nextIndex]
  if (!nextState) return
  const group = (event.currentTarget as HTMLElement).closest('[role="radiogroup"]')
  selectState(nextState)
  await focusRadioAt(group, nextIndex)
}

async function moveMappingRadio(mappingId: string, event: KeyboardEvent): Promise<void> {
  const currentIndex = props.detail.mappings.findIndex(mapping => mapping.id === mappingId)
  const nextIndex = nextRovingRadioIndex(props.detail.mappings.length, currentIndex, event.key)
  if (nextIndex === null) return
  event.preventDefault()
  const nextMapping = props.detail.mappings[nextIndex]
  if (!nextMapping) return
  const group = (event.currentTarget as HTMLElement).closest('[role="radiogroup"]')
  selectedMappingId.value = nextMapping.id
  openEvidenceId.value = null
  await focusRadioAt(group, nextIndex)
}

async function focusRadioAt(group: Element | null, index: number): Promise<void> {
  await nextTick()
  group?.querySelectorAll<HTMLElement>('[role="radio"]')[index]?.focus()
}

async function toggleEvidence(entry: ContextEvidencePreview, event: MouseEvent): Promise<void> {
  const closing = openEvidenceId.value === entry.id
  if (closing) {
    openEvidenceId.value = null
    return
  }
  evidenceTrigger.value = event.currentTarget as HTMLElement
  openEvidenceId.value = entry.id
  await nextTick()
  evidencePreview.value?.focusHeading()
}

async function closeEvidence(): Promise<void> {
  openEvidenceId.value = null
  await nextTick()
  evidenceTrigger.value?.focus({ preventScroll: true })
}

function toggleFeedback(id: string): void {
  const next = new Set(openFeedbackIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  openFeedbackIds.value = next
  openEvidenceId.value = null
}

function reset(): void {
  selectedState.value = 'neutral'
  openEvidenceId.value = null
  openFeedbackIds.value = new Set()
  emit('reset')
}
</script>

<template>
  <main class="context-detail">
    <NuxtLink class="context-detail__back" :to="`/${locale}/context`" :prefetch="false">
      <span aria-hidden="true">{{ locale === 'fa' ? '→' : '←' }}</span>
      {{ copy.back }}
    </NuxtLink>

    <AppPanel class="context-detail__hero">
      <AppPageHeader :kicker="copy.kicker" :title="detail.label" :summary="copy.librarySummary">
        <template #actions>
          <UButton type="button" color="neutral" variant="outline" @click="reset">{{ copy.reset }}</UButton>
        </template>
      </AppPageHeader>
      <div class="context-detail__identity">
        <span>{{ copy.canonicalContext }}</span>
        <strong v-if="detail.canonicalName !== detail.label" lang="en" dir="ltr">{{ detail.canonicalName }}</strong>
        <bdi dir="ltr" class="app-canonical-id">{{ detail.id }}</bdi>
      </div>
      <div class="context-detail__safety">
        <SafetyNotice :text="detail.safety.educational" kind="global" />
        <SafetyNotice :text="detail.safety.relationships" kind="graph" />
      </div>
      <NuxtLink class="context-detail__map-link" :to="`/${locale}/map/${detail.id}`" :prefetch="false">
        {{ copy.mapLink }}
        <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span>
      </NuxtLink>
    </AppPanel>

    <AppPanel v-if="invalidState" tone="quiet" role="status"><p class="context-detail__status">{{ copy.invalidState }}</p></AppPanel>

    <section class="context-state" aria-labelledby="context-state-heading">
      <div>
        <p class="context-section-kicker">{{ copy.context }}</p>
        <h2 id="context-state-heading">{{ copy.stateHeading }}</h2>
        <p>{{ copy.stateIntroduction }}</p>
      </div>
      <div class="context-state__options" role="radiogroup" :aria-labelledby="'context-state-heading'">
        <button
          v-for="state in qualitativeStates"
          :key="state"
          type="button"
          role="radio"
          :aria-checked="selectedState === state"
          :tabindex="selectedState === state ? 0 : -1"
          :class="{ 'context-state__option--selected': selectedState === state }"
          @click="selectState(state)"
          @keydown="moveStateRadio(state, $event)"
        >
          {{ copy[state] }}
        </button>
      </div>
      <AppPanel tone="secondary" class="context-state__explanation" role="status">
        <strong>{{ copy[selectedState] }}</strong>
        <p>{{ stateDescription }}</p>
      </AppPanel>
    </section>

    <section class="context-relationships" aria-labelledby="context-relationships-heading">
      <div class="context-section-heading">
        <p class="context-section-kicker">{{ copy.relationshipHeading }}</p>
        <h2 id="context-relationships-heading">{{ copy.relationshipHeading }}</h2>
        <p>{{ copy.relationshipIntroduction }}</p>
      </div>

      <div v-if="compactLayout" class="context-mapping-picker" role="radiogroup" :aria-label="copy.relationshipHeading">
        <button
          v-for="(mapping, index) in detail.mappings"
          :key="mapping.id"
          type="button"
          role="radio"
          :aria-checked="selectedMappingId === mapping.id"
          :tabindex="selectedMappingId === mapping.id ? 0 : -1"
          @click="selectedMappingId = mapping.id; openEvidenceId = null"
          @keydown="moveMappingRadio(mapping.id, $event)"
        >
          <span>{{ copy.possibleRelationship }} {{ index + 1 }}</span>
          <small>{{ mapping.regulation.label }} → {{ mapping.behaviour.label }}</small>
        </button>
      </div>

      <AppPanel v-for="mapping in visibleMappings" :key="mapping.id" as="article" class="context-mapping">
        <div class="context-mapping__heading">
          <bdi dir="ltr" class="app-canonical-id">{{ mapping.id }}</bdi>
          <span>{{ copy.qualitativeRole }}: <strong>{{ copy.roles[mapping.role] }}</strong></span>
        </div>
        <p>{{ mapping.explanation }}</p>
        <ol class="context-mapping__steps">
          <li>
            <small>{{ copy.context }}</small>
            <strong>{{ mapping.context.label }}</strong>
            <bdi dir="ltr">{{ mapping.context.id }}</bdi>
          </li>
          <li class="context-mapping__relationship">
            <span aria-hidden="true">↓</span><strong>{{ copy.modulates }}</strong>
            <button type="button" :aria-expanded="openEvidenceId === mapping.contextEvidence.id" :aria-controls="openEvidenceId === mapping.contextEvidence.id ? 'context-evidence-preview' : undefined" @click="toggleEvidence(mapping.contextEvidence, $event)">{{ copy.evidence }}</button>
          </li>
          <li>
            <small>{{ copy.regulation }}</small>
            <strong>{{ mapping.regulation.label }}</strong>
            <bdi dir="ltr">{{ mapping.regulation.id }}</bdi>
            <NuxtLink :to="`/${locale}/map/${mapping.regulation.id}`" :prefetch="false">{{ copy.regulationMapLink }}</NuxtLink>
          </li>
          <li class="context-mapping__relationship">
            <span aria-hidden="true">↓</span><strong>{{ copy.contributes }}</strong>
            <button type="button" :aria-expanded="openEvidenceId === mapping.behaviourEvidence.id" :aria-controls="openEvidenceId === mapping.behaviourEvidence.id ? 'context-evidence-preview' : undefined" @click="toggleEvidence(mapping.behaviourEvidence, $event)">{{ copy.evidence }}</button>
          </li>
          <li>
            <small>{{ copy.behaviour }}</small>
            <strong>{{ mapping.behaviour.label }}</strong>
            <bdi dir="ltr">{{ mapping.behaviour.id }}</bdi>
            <NuxtLink :to="`/${locale}/behaviours/${mapping.behaviour.id}`" :prefetch="false">{{ copy.behaviourLink }}</NuxtLink>
          </li>
        </ol>
      </AppPanel>
    </section>

    <details class="context-disclosure" :open="!compactLayout">
      <summary>{{ copy.downstreamHeading }}</summary>
      <AppPanel as="section" labelledby="context-downstream-heading">
        <div class="context-section-heading">
          <p class="context-section-kicker">{{ copy.downstreamHeading }}</p>
          <h2 id="context-downstream-heading">{{ copy.downstreamHeading }}</h2>
        </div>
        <div v-if="detail.downstream.length" class="context-downstream">
          <details v-for="item in detail.downstream" :key="item.id">
            <summary>
              <span>{{ item.kind === 'pattern' ? copy.pattern : copy.function }}</span>
              <strong>{{ item.concept.label }}</strong>
              <bdi dir="ltr" class="app-canonical-id">{{ item.concept.id }}</bdi>
            </summary>
            <div class="context-downstream__body">
              <ul class="context-downstream__examples">
                <li v-for="example in item.explanations" :key="`${example.sourceBehaviourId}:${example.text}`">
                  <bdi dir="ltr" class="app-canonical-id">{{ example.sourceBehaviourId }}</bdi>
                  <span>{{ example.text }}</span>
                </li>
              </ul>
              <SafetyNotice :text="item.kind === 'pattern' ? detail.safety.pattern : detail.safety.function" kind="global" />
            </div>
          </details>
        </div>
        <p v-else>{{ copy.noDownstream }}</p>
      </AppPanel>
    </details>

    <section class="context-feedback" aria-labelledby="context-feedback-heading">
      <div class="context-section-heading">
        <p class="context-section-kicker">{{ copy.feedbackHeading }}</p>
        <h2 id="context-feedback-heading">{{ copy.feedbackPrompt }}</h2>
        <p>{{ copy.feedbackIntroduction }}</p>
      </div>
      <template v-if="detail.feedbackLoops.length">
        <article v-for="loop in detail.feedbackLoops" :key="loop.id" class="context-feedback__loop">
          <button type="button" :aria-expanded="openFeedbackIds.has(loop.id)" :aria-controls="openFeedbackIds.has(loop.id) ? `context-feedback-${loop.id}` : undefined" @click="toggleFeedback(loop.id)">
            <span>↺ {{ loop.title }}</span>
            <bdi dir="ltr">{{ loop.id }}</bdi>
          </button>
          <AppPanel v-if="openFeedbackIds.has(loop.id)" :id="`context-feedback-${loop.id}`" tone="secondary">
            <dl class="context-feedback__details">
              <div>
                <dt>{{ copy.startingConcept }}</dt>
                <dd>{{ loop.concepts[0]?.label }} <bdi dir="ltr">{{ loop.concepts[0]?.id }}</bdi></dd>
              </div>
              <div>
                <dt>{{ copy.downstreamEffect }}</dt>
                <dd>{{ loop.orderedSteps }}</dd>
              </div>
              <div>
                <dt>{{ copy.returningInfluence }}</dt>
                <dd v-for="relationship in loop.returningRelationships" :key="relationship.id" class="context-feedback__chain" dir="ltr">
                  <bdi :dir="locale === 'fa' ? 'rtl' : 'ltr'">{{ relationship.source.label }}</bdi>
                  <span aria-hidden="true">→</span>
                  <bdi :dir="locale === 'fa' ? 'rtl' : 'ltr'">{{ relationship.target.label }}</bdi>
                  <bdi dir="ltr">{{ relationship.id }}</bdi>
                </dd>
              </div>
              <div>
                <dt>{{ copy.loopMeaning }}</dt>
                <dd>{{ loop.explanation }}</dd>
              </div>
            </dl>
            <SafetyNotice :text="loop.caution" kind="graph" />
            <button class="context-feedback__evidence" type="button" :aria-expanded="openEvidenceId === loop.evidenceEntry.id" :aria-controls="openEvidenceId === loop.evidenceEntry.id ? 'context-evidence-preview' : undefined" @click="toggleEvidence(loop.evidenceEntry, $event)">{{ copy.feedbackEvidence }}</button>
          </AppPanel>
        </article>
      </template>
      <AppPanel v-else tone="quiet"><p class="context-detail__status">{{ copy.noFeedback }}</p></AppPanel>
    </section>

    <ContextEvidencePreviewPanel
      v-if="openEvidence"
      ref="evidencePreview"
      :locale="locale"
      :return-path="evidenceReturnPath"
      :entry="openEvidence"
      :copy="copy"
      :safety-text="detail.safety.evidence"
      @close="closeEvidence"
    />
  </main>
</template>

<style scoped>
.context-detail,
.context-relationships,
.context-feedback {
  display: grid;
  gap: var(--app-space-6);
}

.context-detail > *,
.context-state > *,
.context-relationships > *,
.context-feedback > *,
.context-mapping__steps > * {
  min-width: 0;
  max-width: 100%;
}

.context-detail__back,
.context-detail__map-link,
.context-mapping a {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--app-space-2);
  font-weight: 760;
}

.context-detail__hero :deep(.app-panel__content),
.context-mapping :deep(.app-panel__content),
.context-disclosure :deep(.app-panel__content) {
  display: grid;
  gap: var(--app-space-4);
}

.context-detail__identity,
.context-mapping__heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-3);
  color: var(--app-text-secondary);
}

.context-detail__safety {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--app-space-3);
}

.context-detail__status,
.context-state__explanation p,
.context-mapping p,
.context-section-heading h2,
.context-section-heading p {
  margin: 0;
}

.context-state {
  display: grid;
  grid-template-columns: minmax(14rem, 0.7fr) minmax(0, 1.3fr);
  gap: var(--app-space-5);
  align-items: start;
}

.context-state__options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--app-space-3);
}

.context-state__options button,
.context-feedback__loop > button {
  min-height: 3rem;
  padding: var(--app-space-3) var(--app-space-4);
  border: 1px solid var(--app-border-strong);
  border-radius: var(--app-radius-md);
  background: var(--app-surface-primary);
  color: var(--app-text-secondary);
  font: inherit;
  font-weight: 760;
  cursor: pointer;
}

.context-state__options .context-state__option--selected {
  border-color: var(--app-accent);
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--app-accent) 18%, transparent);
}

.context-state__explanation {
  grid-column: 2;
}

.context-state__explanation :deep(.app-panel__content) {
  display: grid;
  gap: var(--app-space-2);
}

.context-section-heading {
  display: grid;
  max-width: 54rem;
  gap: var(--app-space-2);
}

.context-section-heading > p:last-child,
.context-state > div:first-child > p:last-child {
  color: var(--app-text-secondary);
  line-height: 1.65;
}

.context-section-kicker {
  color: var(--app-accent-strong);
  font-size: 0.76rem;
  font-weight: 820;
  text-transform: uppercase;
}

.context-mapping__heading {
  font-size: 0.82rem;
}

.context-mapping bdi,
.context-feedback bdi {
  overflow-wrap: anywhere;
}

.context-mapping__steps {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: stretch;
  gap: var(--app-space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.context-mapping-picker {
  display: grid;
  gap: var(--app-space-2);
}

.context-mapping-picker button {
  display: grid;
  gap: var(--app-space-1);
  padding: var(--app-space-3);
  border: 1px solid var(--app-border-strong);
  border-radius: var(--app-radius-md);
  background: var(--app-surface-primary);
  color: var(--app-text-secondary);
  text-align: start;
  cursor: pointer;
}

.context-mapping-picker button[aria-checked='true'] {
  border-color: var(--app-accent);
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
}

.context-mapping__steps > li:not(.context-mapping__relationship) {
  display: grid;
  align-content: start;
  gap: var(--app-space-2);
  padding: var(--app-space-4);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-md);
  background: var(--app-surface-secondary);
}

.context-mapping__steps small {
  color: var(--app-text-muted);
  font-weight: 720;
}

.context-mapping__relationship {
  display: grid;
  min-width: 8rem;
  place-content: center;
  gap: var(--app-space-2);
  text-align: center;
}

.context-mapping__relationship button,
.context-feedback__evidence {
  min-height: 2.75rem;
  padding: 0.55rem 0.25rem;
  border: 0;
  background: transparent;
  color: var(--app-accent-strong);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 760;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.context-disclosure > summary {
  display: none;
}

.context-downstream {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: var(--app-space-4);
}

.context-downstream details {
  display: grid;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-md);
  overflow: hidden;
}

.context-downstream summary {
  display: grid;
  gap: var(--app-space-2);
  padding: var(--app-space-4);
  cursor: pointer;
}

.context-downstream summary span {
  color: var(--app-text-muted);
  font-size: 0.78rem;
  font-weight: 760;
}

.context-downstream__body {
  display: grid;
  gap: var(--app-space-4);
  padding: 0 var(--app-space-4) var(--app-space-4);
}

.context-downstream__examples {
  display: grid;
  gap: var(--app-space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.context-downstream__examples li {
  display: grid;
  gap: var(--app-space-2);
  padding-block-start: var(--app-space-3);
  border-block-start: 1px solid var(--app-border);
}

.context-feedback__loop {
  display: grid;
  gap: var(--app-space-3);
}

.context-feedback__loop > button {
  display: flex;
  justify-content: space-between;
  gap: var(--app-space-3);
  text-align: start;
}

.context-feedback__details {
  display: grid;
  gap: var(--app-space-4);
  margin: 0;
}

.context-feedback__details div {
  display: grid;
  gap: var(--app-space-2);
}

.context-feedback__details dt {
  color: var(--app-text-muted);
  font-size: 0.78rem;
  font-weight: 800;
}

.context-feedback__details dd {
  margin: 0;
}

.context-feedback__chain {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--app-space-2);
}

@media (max-width: 52rem) {
  .context-detail__safety,
  .context-state,
  .context-state__options,
  .context-mapping__steps {
    grid-template-columns: 1fr;
  }

  .context-state__explanation {
    grid-column: 1;
  }

  .context-mapping__relationship {
    min-width: 0;
    min-height: 4rem;
  }

  .context-disclosure > summary {
    display: block;
    padding: var(--app-space-4);
    border: 1px solid var(--app-border-strong);
    border-radius: var(--app-radius-md);
    color: var(--app-accent-strong);
    cursor: pointer;
    font-weight: 800;
  }

  .context-disclosure[open] > summary {
    margin-block-end: var(--app-space-3);
  }
}
</style>
