<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import type { SystemMapCopy } from '../../../../features/system-map/copy'
import type { MobileFocusedPathModel } from '../../../../features/system-map/mobile/focused-path'
import type { SemanticRelationshipItem } from '../../../../features/system-map/semantic-browser'
import {
  categoryVisualTokens,
  relationshipVisualTokens,
  semanticText,
} from '../../../../visualization/system-map/semantic-tokens'
import AppPanel from '../../ui/AppPanel.vue'
import EvidenceBadge from '../../ui/EvidenceBadge.vue'

const props = defineProps<{
  model: MobileFocusedPathModel
  locale: Locale
  copy: SystemMapCopy
}>()

const selected = computed(() => props.model.selectedConcept)
const groups = computed(() => selected.value ? [
  { key: 'upstream', label: props.copy.upstreamQuestion, items: selected.value.upstream },
  { key: 'downstream', label: props.copy.downstreamQuestion, items: selected.value.downstream },
  { key: 'feedback', label: props.copy.feedbackQuestion, items: selected.value.feedback },
] as const : [])

function mapRoute(nodeId?: string): string {
  return `/${props.locale}/map${nodeId ? `/${nodeId}` : ''}`
}

function categoryLabel(category: keyof typeof categoryVisualTokens): string {
  return semanticText(categoryVisualTokens[category].label, props.locale)
}

function categoryDescription(category: keyof typeof categoryVisualTokens): string {
  return semanticText(categoryVisualTokens[category].secondaryLabel, props.locale)
}

function relationshipLabel(item: SemanticRelationshipItem): string {
  return semanticText(relationshipVisualTokens[item.relationshipType].label, props.locale)
}

function relationshipDescription(item: SemanticRelationshipItem): string {
  return semanticText(relationshipVisualTokens[item.relationshipType].description, props.locale)
}

function relationshipDirection(item: SemanticRelationshipItem): string {
  return item.relationshipType === 'FEEDBACK_WITH'
    ? `${selected.value?.id ?? ''} ↔ ${item.nodeId}`
    : `${item.sourceId} → ${item.targetId}`
}
</script>

<template>
  <section class="mobile-focused-path" data-testid="mobile-focused-path" :aria-label="copy.focusedPath">
    <AppPanel v-if="!selected" class="mobile-focused-path__orientation" tone="secondary">
      <p class="system-map-eyebrow">{{ copy.focusedPath }}</p>
      <h2>{{ copy.mobileTitle }}</h2>
      <p>{{ copy.mobileMessage }}</p>
      <p>{{ copy.mobileManyToMany }}</p>
      <p>{{ copy.mobileHowToStart }}</p>
      <p class="mobile-focused-path__clinical-note">{{ copy.clinicalSeparation }}</p>
    </AppPanel>

    <template v-if="!selected">
      <h2 class="mobile-focused-path__browse-heading">{{ copy.browseByLayer }}</h2>
      <div class="mobile-focused-path__layers">
        <AppPanel
          v-for="group in model.groups"
          :key="group.category"
          class="mobile-focused-path__layer"
          :class="categoryVisualTokens[group.category].className"
          :data-category="group.category"
        >
          <header>
            <div>
              <h3>{{ categoryLabel(group.category) }}</h3>
              <p>{{ categoryDescription(group.category) }}</p>
            </div>
            <span>{{ group.concepts.length }} {{ copy.conceptCount }}</span>
          </header>
          <p v-if="group.category === 'clinical-anchor'" class="mobile-focused-path__clinical-note">
            {{ copy.clinicalSeparation }}
          </p>
          <ul>
            <li v-for="concept in group.concepts" :key="concept.id">
              <NuxtLink class="mobile-focused-path__concept-link" :to="mapRoute(concept.id)" :prefetch="false">
                <span>{{ concept.label }}</span>
                <bdi dir="ltr">{{ concept.id }}</bdi>
              </NuxtLink>
            </li>
          </ul>
        </AppPanel>
      </div>
    </template>

    <template v-else>
      <p class="system-visually-hidden" aria-live="polite">
        {{ copy.currentConceptAnnouncement }}: {{ selected.label }}
      </p>

      <AppPanel class="mobile-focused-path__current" :class="categoryVisualTokens[selected.category].className">
        <header class="mobile-focused-path__current-heading">
          <div>
            <p class="system-map-eyebrow">{{ copy.focusedPath }}</p>
            <h2>{{ selected.label }}</h2>
          </div>
          <NuxtLink class="mobile-focused-path__reset" :to="mapRoute()" :prefetch="false">
            {{ copy.startOver }}
          </NuxtLink>
        </header>

        <div class="system-detail-badges">
          <UBadge color="neutral" variant="subtle">{{ categoryDescription(selected.category) }}</UBadge>
          <UBadge color="neutral" variant="outline"><bdi dir="ltr">{{ selected.id }}</bdi></UBadge>
          <EvidenceBadge :label="selected.evidenceLabel" />
        </div>

        <section class="mobile-focused-path__explanation">
          <h3>{{ copy.educationalExplanation }}</h3>
          <p lang="en" dir="ltr">{{ selected.definition }}</p>
        </section>
      </AppPanel>

      <div class="mobile-focused-path__relationships">
        <AppPanel
          v-for="group in groups"
          :key="group.key"
          class="mobile-focused-path__relationship-group"
          :data-relationship-group="group.key"
        >
          <h2>{{ group.label }}</h2>
          <p v-if="group.key === 'feedback'" class="mobile-focused-path__feedback-note">
            {{ copy.feedbackCaution }}
          </p>
          <p v-if="!group.items.length" class="system-detail-empty">{{ copy.none }}</p>
          <ul v-else>
            <li v-for="item in group.items" :key="item.edgeId">
              <NuxtLink class="mobile-focused-path__relationship" :to="mapRoute(item.nodeId)" :prefetch="false">
                <span class="mobile-focused-path__relationship-title">
                  <strong>{{ item.label }}</strong>
                  <bdi dir="ltr">{{ item.nodeId }}</bdi>
                </span>
                <span>{{ categoryDescription(item.category) }}</span>
                <span><strong>{{ relationshipLabel(item) }}</strong> — {{ relationshipDescription(item) }}</span>
                <span class="mobile-focused-path__direction">
                  {{ item.relationshipType === 'FEEDBACK_WITH' ? copy.reciprocalDirection : copy.scientificDirection }}:
                  <bdi dir="ltr">{{ relationshipDirection(item) }}</bdi>
                </span>
                <span>{{ item.supportClassification }}</span>
              </NuxtLink>
              <details v-if="item.evidenceIds.length" class="mobile-focused-path__evidence-links">
                <summary>{{ item.evidenceIds.length }} {{ copy.relationshipEvidence }}</summary>
                <NuxtLink
                  v-for="evidenceId in item.evidenceIds"
                  :key="evidenceId"
                  :to="`/${locale}/evidence/${evidenceId}?from=${encodeURIComponent(mapRoute(selected.id))}`"
                  :prefetch="false"
                >
                  {{ copy.inspectEvidence }} <bdi dir="ltr">{{ evidenceId }}</bdi>
                </NuxtLink>
              </details>
            </li>
          </ul>
        </AppPanel>
      </div>

      <AppPanel class="mobile-focused-path__detail" tone="quiet">
        <details>
          <summary>{{ copy.moreDetail }}</summary>
          <p v-if="selected.canonicalName !== selected.label" lang="en" dir="ltr">{{ selected.canonicalName }}</p>
          <p>{{ copy.semanticDescription }}</p>
          <p v-if="selected.category === 'clinical-anchor'" class="mobile-focused-path__clinical-note">
            {{ copy.clinicalSeparation }}
          </p>
        </details>
      </AppPanel>

      <AppPanel class="mobile-focused-path__evidence" tone="quiet">
        <h2>{{ copy.evidenceEntry }}</h2>
        <p v-if="selected.evidenceIds.length">{{ copy.evidenceAvailable }} — {{ selected.evidenceCount }} {{ copy.evidenceRecords }}</p>
        <p v-else>{{ copy.evidenceUnavailable }}</p>
        <ul v-if="selected.evidenceIds.length">
          <li v-for="evidenceId in selected.evidenceIds" :key="evidenceId">
            <NuxtLink
              :to="`/${locale}/evidence/${evidenceId}?from=${encodeURIComponent(mapRoute(selected.id))}`"
              :prefetch="false"
            >
              {{ copy.inspectEvidence }} <bdi dir="ltr">{{ evidenceId }}</bdi>
            </NuxtLink>
          </li>
        </ul>
      </AppPanel>

      <AppPanel class="mobile-focused-path__actions" tone="quiet">
        <h2>{{ copy.nextActions }}</h2>
        <div>
          <NuxtLink v-if="selected.category === 'behaviour'" :to="`/${locale}/behaviours/${selected.id}`" :prefetch="false">
            {{ copy.exploreBehaviour }}
          </NuxtLink>
          <NuxtLink v-if="selected.category === 'context'" :to="`/${locale}/context/${selected.id}`" :prefetch="false">
            {{ copy.exploreContext }}
          </NuxtLink>
          <NuxtLink :to="`/${locale}/methodology`" :prefetch="false">{{ copy.methodologyAction }}</NuxtLink>
        </div>
      </AppPanel>
    </template>
  </section>
</template>

<style scoped>
.mobile-focused-path { display: grid; gap: var(--app-space-4); }
.mobile-focused-path h2, .mobile-focused-path h3, .mobile-focused-path p { margin-block-start: 0; }
.mobile-focused-path__orientation h2 { font-size: 1.45rem; }
.mobile-focused-path__orientation p { line-height: 1.65; }
.mobile-focused-path__browse-heading { margin: var(--app-space-2) 0 0; font-size: 1.35rem; }
.mobile-focused-path__layers { display: grid; gap: var(--app-space-3); }
.mobile-focused-path__layer { border-inline-start: 0.4rem solid var(--app-border-strong); }
.mobile-focused-path__layer.category-clinical-anchor { border-style: double; border-inline-start-width: 0.55rem; }
.mobile-focused-path__layer.category-context { border-inline-start-color: #b98919; }
.mobile-focused-path__layer.category-regulation { border-inline-start-color: #377665; }
.mobile-focused-path__layer.category-behaviour { border-inline-start-color: #5472a9; }
.mobile-focused-path__layer.category-pattern { border-inline-start-color: #765485; }
.mobile-focused-path__layer.category-functional-domain { border-inline-start-color: #a05d49; }
.mobile-focused-path__layer header { display: flex; justify-content: space-between; gap: var(--app-space-3); }
.mobile-focused-path__layer header h3 { margin-bottom: 0.2rem; font-size: 1.1rem; }
.mobile-focused-path__layer header p, .mobile-focused-path__layer header > span { color: var(--app-text-muted); font-size: 0.82rem; }
.mobile-focused-path__layer ul, .mobile-focused-path__relationship-group ul, .mobile-focused-path__evidence ul { display: grid; gap: 0.55rem; margin: var(--app-space-3) 0 0; padding: 0; list-style: none; }
.mobile-focused-path__concept-link, .mobile-focused-path__reset, .mobile-focused-path__evidence a, .mobile-focused-path__actions a, .mobile-focused-path__evidence-links a { display: flex; min-height: 2.75rem; align-items: center; justify-content: space-between; gap: var(--app-space-2); padding: 0.65rem 0.75rem; border: 1px solid var(--app-border); border-radius: var(--app-radius-sm); background: var(--app-surface-secondary); color: inherit; font-weight: 700; text-decoration: none; }
.mobile-focused-path__current { border-inline-start: 0.45rem solid var(--app-accent); }
.mobile-focused-path__current-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--app-space-3); }
.mobile-focused-path__current-heading h2 { margin: 0; font-size: 1.65rem; }
.mobile-focused-path__reset { flex: 0 0 auto; }
.mobile-focused-path__explanation { margin-top: var(--app-space-4); padding-top: var(--app-space-4); border-top: 1px solid var(--app-border); }
.mobile-focused-path__explanation h3 { font-size: 1rem; }
.mobile-focused-path__explanation p { margin-bottom: 0; line-height: 1.65; }
.mobile-focused-path__relationships { display: grid; gap: var(--app-space-3); }
.mobile-focused-path__relationship-group h2, .mobile-focused-path__evidence h2, .mobile-focused-path__actions h2 { font-size: 1.2rem; }
.mobile-focused-path__relationship-group li { display: grid; gap: 0.4rem; }
.mobile-focused-path__relationship { display: grid; min-height: 2.75rem; gap: 0.35rem; padding: 0.85rem; border: 1px solid var(--app-border); border-radius: var(--app-radius-md); background: var(--app-surface-secondary); color: inherit; text-decoration: none; }
.mobile-focused-path__relationship > span:not(.mobile-focused-path__relationship-title) { color: var(--app-text-muted); font-size: 0.86rem; line-height: 1.45; }
.mobile-focused-path__relationship-title { display: flex; justify-content: space-between; gap: var(--app-space-2); }
.mobile-focused-path__direction { direction: inherit; }
.mobile-focused-path__feedback-note, .mobile-focused-path__clinical-note { padding: 0.75rem; border-inline-start: 0.3rem solid #695546; border-radius: var(--app-radius-sm); background: var(--app-surface-quiet); font-size: 0.88rem; line-height: 1.55; }
.mobile-focused-path__evidence-links { display: grid; gap: 0.35rem; }
.mobile-focused-path__evidence-links summary { min-height: 2.75rem; padding: 0.65rem 0.75rem; border: 1px solid var(--app-border); border-radius: var(--app-radius-sm); background: var(--app-surface-quiet); cursor: pointer; font-size: 0.84rem; font-weight: 750; }
.mobile-focused-path__evidence-links a, .mobile-focused-path__evidence a { font-size: 0.88rem; }
.mobile-focused-path__evidence-links a bdi, .mobile-focused-path__evidence a bdi { overflow-wrap: anywhere; }
.mobile-focused-path__detail summary { min-height: 2.75rem; padding-block: 0.7rem; cursor: pointer; font-weight: 800; }
.mobile-focused-path__detail details > *:not(summary) { margin-top: var(--app-space-3); }
.mobile-focused-path__actions > :last-child { display: grid; gap: 0.55rem; }
.mobile-focused-path a:focus-visible, .mobile-focused-path summary:focus-visible { outline: 4px solid var(--app-focus); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .mobile-focused-path * { scroll-behavior: auto; } }
</style>
