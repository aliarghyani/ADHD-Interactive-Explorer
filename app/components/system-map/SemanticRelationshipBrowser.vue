<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CanonicalNodeId, Locale } from '../../../domain'
import type { SystemMapCopy } from '../../../features/system-map/copy'
import type { SemanticRelationshipItem, SemanticRelationshipModel } from '../../../features/system-map/semantic-browser'
import { categoryVisualTokens, relationshipVisualTokens, semanticText } from '../../../visualization/system-map/semantic-tokens'
import AppPanel from '../ui/AppPanel.vue'
import EvidenceBadge from '../ui/EvidenceBadge.vue'

const props = defineProps<{
  model: SemanticRelationshipModel | null
  locale: Locale
  copy: SystemMapCopy
}>()

const emit = defineEmits<{
  nodeSelected: [id: CanonicalNodeId]
  showInGraph: []
  close: []
}>()

const heading = ref<HTMLElement | null>(null)
const groups = computed(() => props.model ? [
  { key: 'upstream', label: props.copy.upstream, items: props.model.upstream },
  { key: 'downstream', label: props.copy.downstream, items: props.model.downstream },
  { key: 'feedback', label: props.copy.feedback, items: props.model.feedback },
] as const : [])

function categoryLabel(item: SemanticRelationshipItem): string {
  return semanticText(categoryVisualTokens[item.category].secondaryLabel, props.locale)
}

function relationshipLabel(item: SemanticRelationshipItem): string {
  return semanticText(relationshipVisualTokens[item.relationshipType].label, props.locale)
}

function relationshipDescription(item: SemanticRelationshipItem): string {
  return semanticText(relationshipVisualTokens[item.relationshipType].description, props.locale)
}

function focusHeading(): void {
  heading.value?.focus({ preventScroll: true })
}

defineExpose({ focusHeading })
</script>

<template>
  <AppPanel
    as="aside"
    class="system-semantic-browser system-detail-panel"
    labelledby="system-semantic-heading"
    aria-describedby="system-semantic-description"
  >
    <header class="system-detail-heading">
      <div>
        <p class="system-map-eyebrow">{{ copy.relationshipBrowser }}</p>
        <h2 id="system-semantic-heading" ref="heading" tabindex="-1">
          {{ model?.label ?? copy.selectedConcept }}
        </h2>
      </div>
      <UButton
        v-if="model"
        type="button"
        class="system-icon-button"
        color="neutral"
        variant="ghost"
        square
        :aria-label="copy.close"
        @click="emit('close')"
      >
        <span aria-hidden="true">×</span>
      </UButton>
    </header>
    <p id="system-semantic-description" class="system-detail-empty">{{ copy.semanticDescription }}</p>
    <p class="system-clinical-separation">{{ copy.clinicalSeparation }}</p>

    <p v-if="!model" class="system-detail-empty">{{ copy.selectPrompt }}</p>

    <template v-else>
      <section class="system-selected-summary" data-testid="semantic-selected-summary">
        <h3>{{ copy.selectedConcept }}</h3>
        <strong class="system-selected-concept-label">{{ model.label }}</strong>
        <div class="system-detail-badges">
          <UBadge color="neutral" variant="subtle">
            {{ semanticText(categoryVisualTokens[model.category].secondaryLabel, locale) }}
          </UBadge>
          <UBadge color="neutral" variant="outline">
            <bdi dir="ltr" class="app-canonical-id">{{ model.id }}</bdi>
          </UBadge>
          <EvidenceBadge :label="model.evidenceLabel" />
        </div>
        <p v-if="model.canonicalName !== model.label" lang="en" dir="ltr" class="system-canonical-name">
          {{ model.canonicalName }}
        </p>
        <UButton type="button" class="system-show-in-graph" color="primary" variant="soft" @click="emit('showInGraph')">
          {{ copy.showInGraph }}
        </UButton>
      </section>

      <div class="system-semantic-groups">
        <section v-for="group in groups" :key="group.key" :data-relationship-group="group.key">
          <h3>{{ group.label }}</h3>
          <p v-if="!group.items.length" class="system-detail-empty">{{ copy.none }}</p>
          <ul v-else>
            <li v-for="item in group.items" :key="item.edgeId">
              <button type="button" class="system-semantic-relationship" @click="emit('nodeSelected', item.nodeId)">
                <span>
                  <strong>{{ item.label }}</strong>
                  <bdi dir="ltr">{{ item.nodeId }}</bdi>
                </span>
                <small>{{ relationshipLabel(item) }} · {{ categoryLabel(item) }}</small>
                <small>{{ relationshipDescription(item) }}</small>
                <small v-if="item.evidenceIds.length">
                  <strong>{{ item.evidenceIds.length }}</strong> {{ copy.relationshipEvidence }}
                </small>
              </button>
              <div v-if="item.evidenceIds.length" class="system-semantic-evidence-links" role="list">
                <span v-for="evidenceId in item.evidenceIds" :key="evidenceId" role="listitem">
                  <NuxtLink
                    :to="`/${locale}/evidence/${evidenceId}?from=${encodeURIComponent(`/${locale}/map/${model.id}`)}`"
                    :prefetch="false"
                  >
                    {{ copy.inspectEvidence }} <bdi dir="ltr">{{ evidenceId }}</bdi>
                  </NuxtLink>
                </span>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <section>
        <h3>{{ copy.scientificExplanation }}</h3>
        <p lang="en" dir="ltr">{{ model.definition }}</p>
      </section>

      <section class="system-evidence-entry">
        <h3>{{ copy.evidenceEntry }}</h3>
        <p><strong>{{ model.evidenceCount }}</strong> {{ copy.evidenceRecords }}</p>
        <div v-if="model.evidenceIds.length" role="list">
          <span v-for="evidenceId in model.evidenceIds" :key="evidenceId" role="listitem">
            <NuxtLink
              :to="`/${locale}/evidence/${evidenceId}?from=${encodeURIComponent(`/${locale}/map/${model.id}`)}`"
              :prefetch="false"
            >
              {{ copy.inspectEvidence }} <bdi dir="ltr">{{ evidenceId }}</bdi>
            </NuxtLink>
          </span>
        </div>
      </section>
    </template>
  </AppPanel>
</template>
