<script setup lang="ts">
import type { EvidencePreview } from '../../../features/behaviour-explorer/model'
import type { BehaviourCopy } from '../../../features/behaviour-explorer/copy'
import AppPanel from '../ui/AppPanel.vue'
import EvidenceBadge from '../ui/EvidenceBadge.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'

defineProps<{
  entry: EvidencePreview
  copy: BehaviourCopy
  safetyText: string
}>()

defineEmits<{ close: [] }>()
</script>

<template>
  <AppPanel as="aside" class="behaviour-evidence" labelledby="behaviour-evidence-title">
    <div class="behaviour-evidence__heading">
      <div>
        <p>{{ copy.evidencePreview }}</p>
        <h2 id="behaviour-evidence-title">
          <bdi v-if="entry.edgeId" dir="ltr">{{ entry.edgeId }}</bdi>
          <template v-else>{{ copy.pattern }}</template>
        </h2>
      </div>
      <UButton type="button" color="neutral" variant="ghost" @click="$emit('close')">
        {{ copy.closeEvidence }}
      </UButton>
    </div>
    <p class="behaviour-evidence__language">{{ copy.sourceLanguage }}</p>
    <SafetyNotice :text="safetyText" kind="evidence" />

    <p v-if="entry.relationshipLimitation" class="behaviour-evidence__relationship" lang="en" dir="ltr">
      <strong>{{ copy.relationshipLimitation }}:</strong> {{ entry.relationshipLimitation }}
    </p>

    <article v-for="record in entry.evidence" :key="record.id" class="behaviour-evidence__record" lang="en" dir="ltr">
      <div>
        <bdi dir="ltr" class="app-canonical-id">{{ record.id }}</bdi>
        <EvidenceBadge :label="record.level" />
      </div>
      <p>{{ record.summary }}</p>
      <h3>{{ copy.evidenceLimitations }}</h3>
      <ul>
        <li v-for="limitation in record.limitations" :key="limitation">{{ limitation }}</li>
      </ul>
      <small>{{ record.sourceIds.length }} {{ copy.sourceCount }}</small>
    </article>
  </AppPanel>
</template>

<style scoped>
.behaviour-evidence :deep(.app-panel__content) {
  display: grid;
  gap: var(--app-space-4);
}

.behaviour-evidence__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--app-space-4);
}

.behaviour-evidence__heading p,
.behaviour-evidence__heading h2,
.behaviour-evidence__language,
.behaviour-evidence__relationship,
.behaviour-evidence__record p,
.behaviour-evidence__record h3 {
  margin: 0;
}

.behaviour-evidence__heading > div > p {
  color: var(--app-accent-strong);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.behaviour-evidence__language,
.behaviour-evidence__record small {
  color: var(--app-text-muted);
  font-size: 0.82rem;
}

.behaviour-evidence__record {
  display: grid;
  gap: var(--app-space-3);
  padding-block-start: var(--app-space-4);
  border-block-start: 1px solid var(--app-border);
}

.behaviour-evidence__record > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--app-space-3);
}

.behaviour-evidence__record h3 {
  font-size: 0.95rem;
}

.behaviour-evidence__record ul {
  margin: 0;
}
</style>
