<script setup lang="ts">
import type { ContextCopy } from '../../../features/context-feedback/copy'
import type { ContextEvidencePreview } from '../../../features/context-feedback/model'
import AppPanel from '../ui/AppPanel.vue'
import EvidenceBadge from '../ui/EvidenceBadge.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'

defineProps<{
  locale: 'en' | 'fa'
  returnPath: string
  entry: ContextEvidencePreview
  copy: ContextCopy
  safetyText: string
}>()

defineEmits<{ close: [] }>()
</script>

<template>
  <AppPanel as="aside" class="context-evidence" labelledby="context-evidence-title">
    <div class="context-evidence__heading">
      <div>
        <p>{{ copy.evidencePreview }}</p>
        <h2 id="context-evidence-title">{{ entry.label }}</h2>
        <bdi v-if="entry.edgeId" dir="ltr" class="app-canonical-id">{{ entry.edgeId }}</bdi>
      </div>
      <UButton type="button" color="neutral" variant="ghost" @click="$emit('close')">{{ copy.closeEvidence }}</UButton>
    </div>
    <p class="context-evidence__language">{{ copy.sourceLanguage }}</p>
    <SafetyNotice :text="safetyText" kind="evidence" />
    <p v-if="entry.relationshipLimitation" class="context-evidence__relationship" lang="en" dir="ltr">
      <strong>{{ copy.relationshipLimitation }}:</strong> {{ entry.relationshipLimitation }}
    </p>
    <article v-for="record in entry.evidence" :key="record.id" class="context-evidence__record" lang="en" dir="ltr">
      <div>
        <bdi dir="ltr" class="app-canonical-id">{{ record.id }}</bdi>
        <EvidenceBadge :label="record.level" />
      </div>
      <p>{{ record.summary }}</p>
      <h3>{{ copy.evidenceLimitations }}</h3>
      <ul><li v-for="limitation in record.limitations" :key="limitation">{{ limitation }}</li></ul>
      <small>{{ record.sourceCount }} {{ copy.sourceCount }}</small>
      <NuxtLink
        class="context-evidence__detail-link"
        :to="`/${locale}/evidence/${record.id}?from=${encodeURIComponent(returnPath)}`"
        :prefetch="false"
      >
        {{ locale === 'fa' ? 'مشاهدهٔ جزئیات شواهد و منابع' : 'View full evidence and sources' }}
      </NuxtLink>
    </article>
    <p v-if="!entry.evidence.length">{{ copy.evidenceUnavailable }}</p>
  </AppPanel>
</template>

<style scoped>
.context-evidence :deep(.app-panel__content),
.context-evidence__record {
  display: grid;
  gap: var(--app-space-4);
}

.context-evidence__heading,
.context-evidence__record > div {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--app-space-3);
}

.context-evidence__heading p,
.context-evidence__heading h2,
.context-evidence__language,
.context-evidence__relationship,
.context-evidence__record p,
.context-evidence__record h3 {
  margin: 0;
}

.context-evidence__heading p {
  color: var(--app-accent-strong);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.context-evidence__language,
.context-evidence__record small {
  color: var(--app-text-muted);
  font-size: 0.82rem;
}

.context-evidence__record {
  padding-block-start: var(--app-space-4);
  border-block-start: 1px solid var(--app-border);
}

.context-evidence__record h3 {
  font-size: 0.95rem;
}

.context-evidence__record ul {
  margin: 0;
}

.context-evidence__detail-link { width: fit-content; font-weight: 780; }
</style>
