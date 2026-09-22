<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { BehaviourCopy } from '../../../features/behaviour-explorer/copy'
import type { BehaviourDetail, BehaviourPathway, EvidencePreview } from '../../../features/behaviour-explorer/model'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'
import EvidencePreviewPanel from './EvidencePreview.vue'

const props = defineProps<{
  locale: 'en' | 'fa'
  detail: BehaviourDetail
  copy: BehaviourCopy
  requestedPathway: string | null
}>()

const emit = defineEmits<{
  pathwayChange: [pathwayId: string]
  reset: []
}>()

const initialPathway = () => props.detail.pathways.find((pathway) => pathway.id === props.requestedPathway)
  ?? props.detail.pathways[0]
const selectedPathwayId = ref(initialPathway()?.id ?? '')
const openEvidenceId = ref<string | null>(null)
const compactLayout = ref(false)
const expandedSections = ref(new Set(['pattern', 'function', 'alternatives']))
let compactQuery: MediaQueryList | null = null
const invalidPathway = computed(() => Boolean(
  props.requestedPathway && !props.detail.pathways.some((pathway) => pathway.id === props.requestedPathway),
))
const selectedPathway = computed<BehaviourPathway | undefined>(() =>
  props.detail.pathways.find((pathway) => pathway.id === selectedPathwayId.value) ?? props.detail.pathways[0],
)
const availableEvidence = computed(() => [
  ...(selectedPathway.value?.evidenceEntries ?? []),
  ...props.detail.patterns.map((pattern) => pattern.evidenceEntry),
  ...props.detail.functions.flatMap((example) => example.evidenceEntry ? [example.evidenceEntry] : []),
])
const openEvidence = computed<EvidencePreview | null>(() =>
  availableEvidence.value.find((entry) => entry.id === openEvidenceId.value) ?? null,
)

watch(() => [props.detail.id, props.requestedPathway] as const, () => {
  selectedPathwayId.value = initialPathway()?.id ?? ''
  openEvidenceId.value = null
})

function syncCompactLayout(event: MediaQueryList | MediaQueryListEvent): void {
  compactLayout.value = event.matches
  expandedSections.value = new Set(event.matches ? [] : ['pattern', 'function', 'alternatives'])
}

onMounted(() => {
  compactQuery = window.matchMedia('(max-width: 52rem)')
  syncCompactLayout(compactQuery)
  compactQuery.addEventListener('change', syncCompactLayout)
})

onUnmounted(() => compactQuery?.removeEventListener('change', syncCompactLayout))

function selectPathway(pathwayId: string): void {
  selectedPathwayId.value = pathwayId
  openEvidenceId.value = null
  emit('pathwayChange', pathwayId)
}

function reset(): void {
  selectedPathwayId.value = props.detail.pathways[0]?.id ?? ''
  openEvidenceId.value = null
  expandedSections.value = new Set(compactLayout.value ? [] : ['pattern', 'function', 'alternatives'])
  emit('reset')
}

function toggleEvidence(entry: EvidencePreview): void {
  openEvidenceId.value = openEvidenceId.value === entry.id ? null : entry.id
}

function setDisclosure(section: string, event: Event): void {
  const next = new Set(expandedSections.value)
  if ((event.currentTarget as HTMLDetailsElement).open) next.add(section)
  else next.delete(section)
  expandedSections.value = next
}
</script>

<template>
  <main class="behaviour-detail">
    <NuxtLink class="behaviour-detail__back" :to="`/${locale}/behaviours`" :prefetch="false">
      <span aria-hidden="true">{{ locale === 'fa' ? '→' : '←' }}</span>
      {{ copy.back }}
    </NuxtLink>

    <AppPanel class="behaviour-detail__hero">
      <AppPageHeader :kicker="copy.kicker" :title="detail.statement">
        <template #actions>
          <UButton type="button" color="neutral" variant="outline" @click="reset">{{ copy.reset }}</UButton>
        </template>
      </AppPageHeader>
      <div class="behaviour-detail__identity">
        <span>{{ copy.canonicalBehaviour }}</span>
        <strong>{{ detail.label }}</strong>
        <bdi dir="ltr" class="app-canonical-id">{{ detail.id }}</bdi>
      </div>
      <SafetyNotice :text="detail.safety.behaviour" kind="global" />
      <NuxtLink class="behaviour-detail__map-link" :to="`/${locale}/map/${detail.id}`" :prefetch="false">
        {{ copy.mapLink }}
        <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span>
      </NuxtLink>
      <NuxtLink class="behaviour-detail__map-link" :to="`/${locale}/context`" :prefetch="false">
        {{ copy.contextLink }}
        <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span>
      </NuxtLink>
    </AppPanel>

    <AppPanel v-if="invalidPathway" tone="quiet" role="status" class="behaviour-detail__query-state">
      <p>{{ copy.invalidPathway }}</p>
    </AppPanel>

    <section class="behaviour-detail__selector" aria-labelledby="pathway-selector-heading">
      <div>
        <p>{{ copy.possiblePathway }}</p>
        <h2 id="pathway-selector-heading">{{ copy.pathwayHeading }}</h2>
        <p>{{ copy.pathwayIntroduction }}</p>
      </div>
      <div class="behaviour-pathway-options" role="radiogroup" :aria-labelledby="'pathway-selector-heading'">
        <button
          v-for="(pathway, index) in detail.pathways"
          :key="pathway.id"
          type="button"
          role="radio"
          :aria-checked="selectedPathway?.id === pathway.id"
          :class="{ 'behaviour-pathway-option--selected': selectedPathway?.id === pathway.id }"
          @click="selectPathway(pathway.id)"
        >
          <span>{{ copy.possiblePathway }} {{ index + 1 }}</span>
          <bdi dir="ltr">{{ pathway.id }}</bdi>
        </button>
      </div>
    </section>

    <template v-if="selectedPathway">
      <AppPanel as="section" class="behaviour-pathway" labelledby="selected-pathway-heading">
        <p class="behaviour-section-kicker">{{ copy.selectedPathway }}</p>
        <h2 id="selected-pathway-heading">{{ selectedPathway.explanation }}</h2>
        <ol class="behaviour-pathway__steps">
          <li v-for="(concept, index) in selectedPathway.concepts" :key="concept.id">
            <article>
              <span>{{ index + 1 }}</span>
              <div>
                <small>{{ concept.category === 'context' ? copy.context : concept.category === 'regulation' ? copy.regulation : copy.canonicalBehaviour }}</small>
                <h3>{{ concept.label }}</h3>
                <bdi dir="ltr" class="app-canonical-id">{{ concept.id }}</bdi>
                <p v-if="concept.category === 'context'">{{ copy.contextExplanation }}</p>
                <p v-if="concept.category === 'regulation'">{{ copy.regulationExplanation }}</p>
              </div>
            </article>
            <div v-if="selectedPathway.evidenceEntries[index]" class="behaviour-pathway__relationship">
              <span aria-hidden="true">↓</span>
              <strong>{{ copy.semantics[selectedPathway.evidenceEntries[index].relationshipType!] }}</strong>
              <button type="button" @click="toggleEvidence(selectedPathway.evidenceEntries[index])">
                {{ copy.evidence }}
              </button>
            </div>
          </li>
        </ol>
        <p class="behaviour-pathway__caution">{{ selectedPathway.scientificCaution }}</p>
      </AppPanel>

      <div class="behaviour-detail__downstream">
        <details class="behaviour-disclosure" :open="expandedSections.has('pattern')" @toggle="setDisclosure('pattern', $event)">
          <summary>{{ copy.pattern }}</summary>
          <AppPanel as="section" labelledby="pattern-heading">
          <p class="behaviour-section-kicker">{{ copy.pattern }}</p>
          <h2 id="pattern-heading">{{ copy.patternIntro }}</h2>
          <SafetyNotice :text="detail.safety.pattern" kind="global" />
          <div v-if="detail.patterns.length" class="behaviour-possibilities">
            <article v-for="pattern in detail.patterns" :key="pattern.id">
              <h3>{{ pattern.concept.label }}</h3>
              <bdi dir="ltr" class="app-canonical-id">{{ pattern.concept.id }}</bdi>
              <p>{{ pattern.conceptualThreshold }}</p>
              <p>{{ pattern.singleEventCaution }}</p>
              <button type="button" @click="toggleEvidence(pattern.evidenceEntry)">{{ copy.evidence }}</button>
            </article>
          </div>
          <p v-else>{{ copy.noPattern }}</p>
          </AppPanel>
        </details>

        <details class="behaviour-disclosure" :open="expandedSections.has('function')" @toggle="setDisclosure('function', $event)">
          <summary>{{ copy.function }}</summary>
          <AppPanel as="section" labelledby="function-heading">
          <p class="behaviour-section-kicker">{{ copy.function }}</p>
          <h2 id="function-heading">{{ copy.functionIntro }}</h2>
          <SafetyNotice :text="detail.safety.function" kind="global" />
          <div v-if="detail.functions.length" class="behaviour-possibilities">
            <article v-for="example in detail.functions" :key="example.id">
              <h3>{{ example.concept.label }}</h3>
              <bdi dir="ltr" class="app-canonical-id">{{ example.concept.id }}</bdi>
              <p>{{ example.example }}</p>
              <button v-if="example.evidenceEntry" type="button" @click="toggleEvidence(example.evidenceEntry)">{{ copy.evidence }}</button>
              <small v-else>{{ copy.evidenceUnavailable }}</small>
            </article>
          </div>
          <p v-else>{{ copy.noFunction }}</p>
          </AppPanel>
        </details>
      </div>

      <details class="behaviour-disclosure" :open="expandedSections.has('alternatives')" @toggle="setDisclosure('alternatives', $event)">
        <summary>{{ copy.alternatives }}</summary>
        <AppPanel as="section" class="behaviour-alternatives" tone="secondary" labelledby="alternatives-heading">
        <p class="behaviour-section-kicker">{{ copy.alternatives }}</p>
        <h2 id="alternatives-heading">{{ copy.alternativesIntro }}</h2>
        <SafetyNotice :text="detail.safety.alternatives" kind="global" />
        <div class="behaviour-alternatives__grid">
          <article v-for="alternative in detail.alternatives" :key="alternative.id">
            <h3>{{ alternative.label }}</h3>
            <p>{{ alternative.explanation }}</p>
            <small>{{ alternative.safeWording }}</small>
          </article>
        </div>
        </AppPanel>
      </details>

      <EvidencePreviewPanel
        v-if="openEvidence"
        :entry="openEvidence"
        :copy="copy"
        :safety-text="detail.safety.evidence"
        @close="openEvidenceId = null"
      />
    </template>
  </main>
</template>

<style scoped>
.behaviour-detail {
  display: grid;
  gap: var(--app-space-6);
}

.behaviour-detail__back,
.behaviour-detail__map-link {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-2);
  width: fit-content;
  font-weight: 760;
}

.behaviour-detail__hero :deep(.app-panel__content) {
  display: grid;
  gap: var(--app-space-5);
}

.behaviour-detail__identity {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--app-space-3);
  color: var(--app-text-secondary);
}

.behaviour-detail__identity strong {
  color: var(--app-text);
  font-size: 1.15rem;
}

.behaviour-detail__query-state p {
  margin: 0;
}

.behaviour-detail__selector {
  display: grid;
  grid-template-columns: minmax(15rem, 0.75fr) minmax(0, 1.25fr);
  gap: var(--app-space-6);
  align-items: start;
}

.behaviour-detail__selector h2,
.behaviour-detail__selector p,
.behaviour-pathway h2,
.behaviour-alternatives h2,
.behaviour-detail__downstream h2 {
  margin: 0;
}

.behaviour-detail__selector > div:first-child > p:last-child,
.behaviour-detail__downstream h2,
.behaviour-alternatives h2 {
  color: var(--app-text-secondary);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.65;
}

.behaviour-pathway-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: var(--app-space-3);
}

.behaviour-pathway-options button {
  display: grid;
  gap: var(--app-space-2);
  padding: var(--app-space-4);
  border: 1px solid var(--app-border-strong);
  border-radius: var(--app-radius-md);
  background: var(--app-surface-primary);
  color: var(--app-text-secondary);
  text-align: start;
  cursor: pointer;
}

.behaviour-pathway-options button span {
  font-weight: 780;
}

.behaviour-pathway-options button bdi {
  overflow-wrap: anywhere;
  font-size: 0.72rem;
}

.behaviour-pathway-options .behaviour-pathway-option--selected {
  border-color: var(--app-accent);
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--app-accent) 18%, transparent);
}

.behaviour-section-kicker {
  margin: 0 0 var(--app-space-2);
  color: var(--app-accent-strong);
  font-size: 0.76rem;
  font-weight: 820;
  text-transform: uppercase;
}

.behaviour-pathway :deep(.app-panel__content),
.behaviour-detail__downstream :deep(.app-panel__content),
.behaviour-alternatives :deep(.app-panel__content) {
  display: grid;
  gap: var(--app-space-4);
}

.behaviour-pathway__steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--app-space-3);
  margin: var(--app-space-3) 0;
  padding: 0;
  list-style: none;
}

.behaviour-pathway__steps article {
  display: flex;
  gap: var(--app-space-3);
  min-height: 100%;
  padding: var(--app-space-4);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-md);
  background: var(--app-surface-secondary);
}

.behaviour-pathway__steps article > span {
  display: grid;
  flex: 0 0 2rem;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 50%;
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
  font-weight: 800;
}

.behaviour-pathway__steps h3,
.behaviour-pathway__steps p {
  margin: 0;
}

.behaviour-pathway__steps small {
  color: var(--app-text-muted);
  font-weight: 700;
}

.behaviour-pathway__relationship {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--app-space-2);
  min-height: 3rem;
  color: var(--app-text-secondary);
  font-size: 0.82rem;
}

.behaviour-pathway__relationship button,
.behaviour-possibilities button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--app-accent-strong);
  font-weight: 760;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.behaviour-pathway__caution {
  margin: 0;
  color: var(--app-text-secondary);
  font-size: 0.9rem;
}

.behaviour-detail__downstream {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--app-space-5);
}

.behaviour-disclosure > summary {
  display: none;
}

.behaviour-possibilities,
.behaviour-alternatives__grid {
  display: grid;
  gap: var(--app-space-3);
}

.behaviour-possibilities article,
.behaviour-alternatives__grid article {
  padding-block-start: var(--app-space-3);
  border-block-start: 1px solid var(--app-border);
}

.behaviour-possibilities h3,
.behaviour-possibilities p,
.behaviour-alternatives__grid h3,
.behaviour-alternatives__grid p {
  margin: 0 0 var(--app-space-2);
}

.behaviour-possibilities small,
.behaviour-alternatives__grid small {
  color: var(--app-text-muted);
}

.behaviour-alternatives__grid {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
}

@media (max-width: 52rem) {
  .behaviour-detail__selector,
  .behaviour-detail__downstream,
  .behaviour-pathway__steps {
    grid-template-columns: minmax(0, 1fr);
  }

  .behaviour-pathway-options {
    grid-template-columns: minmax(0, 1fr);
  }

  .behaviour-pathway__relationship {
    justify-content: flex-start;
    padding-inline-start: var(--app-space-6);
  }

  .behaviour-disclosure > summary {
    display: flex;
    min-height: 3rem;
    align-items: center;
    justify-content: space-between;
    padding: var(--app-space-4);
    border: 1px solid var(--app-border-strong);
    border-radius: var(--app-radius-md);
    background: var(--app-surface-primary);
    color: var(--app-accent-strong);
    font-weight: 800;
    cursor: pointer;
  }

  .behaviour-disclosure > summary::after {
    content: '+';
    font-size: 1.25rem;
  }

  .behaviour-disclosure[open] > summary {
    margin-block-end: var(--app-space-3);
  }

  .behaviour-disclosure[open] > summary::after {
    content: '−';
  }
}
</style>
