<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EvidenceLevel } from '../../../domain'
import type { EvidenceCopy } from '../../../features/evidence/copy'
import { evidenceDisplayName, readableEvidenceContext, type EvidenceIndexItem } from '../../../features/evidence/model'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import EvidenceBadge from '../ui/EvidenceBadge.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'

const props = defineProps<{ locale: 'en' | 'fa', records: readonly EvidenceIndexItem[], copy: EvidenceCopy, safetyText: string, initialQuery?: string }>()
const query = ref(props.initialQuery ?? '')
const selectedLevel = ref<'all' | EvidenceLevel>('all')
const levels: readonly EvidenceLevel[] = ['Clinical', 'Strong', 'Moderate', 'Limited']

const visibleRecords = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase()
  return props.records.filter((record) => {
    if (selectedLevel.value !== 'all' && record.level !== selectedLevel.value) return false
    if (!needle) return true
    return [record.id, record.summary, record.constructStatus, record.epistemicStatus, record.searchableSourceText]
      .some((value) => value.toLocaleLowerCase().includes(needle))
  })
})
</script>

<template>
  <main class="evidence-index">
    <AppPageHeader :kicker="copy.kicker" :title="copy.indexTitle" :summary="copy.indexSummary" />

    <AppPanel class="evidence-index__controls" tone="secondary" labelledby="evidence-filter-heading">
      <h2 id="evidence-filter-heading" class="visually-hidden">{{ copy.searchLabel }}</h2>
      <label>
        <span>{{ copy.searchLabel }}</span>
        <input v-model="query" type="search" :placeholder="copy.searchPlaceholder">
      </label>
      <label>
        <span>{{ copy.levelLabel }}</span>
        <select v-model="selectedLevel">
          <option value="all">{{ copy.allLevels }}</option>
          <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
        </select>
      </label>
      <p role="status"><strong>{{ visibleRecords.length }}</strong> {{ copy.resultCount }}</p>
    </AppPanel>

    <p class="evidence-index__language">{{ copy.authoritativeLanguage }}</p>
    <SafetyNotice :text="safetyText" kind="evidence" />
    <div v-if="visibleRecords.length" class="evidence-index__records">
      <AppPanel v-for="record in visibleRecords" :key="record.id" as="article" class="evidence-card">
        <div class="evidence-card__meta">
          <bdi dir="ltr" class="app-canonical-id">{{ record.id }}</bdi>
          <EvidenceBadge :label="record.level" />
        </div>
        <h2>{{ evidenceDisplayName(record.id) }}</h2>
        <p lang="en" dir="ltr">{{ record.summary }}</p>
        <dl>
          <div><dt>{{ copy.epistemicContext }}</dt><dd lang="en" dir="ltr">{{ readableEvidenceContext(record.epistemicStatus) }}</dd></div>
          <div><dt>{{ copy.constructContext }}</dt><dd lang="en" dir="ltr">{{ readableEvidenceContext(record.constructStatus) }}</dd></div>
        </dl>
        <div class="evidence-card__footer">
          <small>{{ record.sourceCount }} {{ copy.sourceCount }}</small>
          <NuxtLink :to="`/${locale}/evidence/${record.id}`" :prefetch="false">{{ copy.openDetail }}</NuxtLink>
        </div>
      </AppPanel>
    </div>
    <AppPanel v-else tone="quiet" role="status"><p>{{ copy.noResults }}</p></AppPanel>
  </main>
</template>

<style scoped>
.evidence-index { display: grid; gap: var(--app-space-6); }
.evidence-index__controls :deep(.app-panel__content) {
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(12rem, 0.35fr) auto; align-items: end; gap: var(--app-space-4);
}
.evidence-index__controls label { display: grid; gap: var(--app-space-2); font-weight: 760; }
.evidence-index__controls input, .evidence-index__controls select {
  width: 100%; min-height: 2.75rem; padding: 0.55rem 0.75rem; border: 1px solid var(--app-border-strong); border-radius: var(--app-radius-sm); background: var(--app-surface-primary); color: var(--app-text); font: inherit;
}
.evidence-index__controls p, .evidence-index__language { margin: 0; color: var(--app-text-muted); }
.evidence-index__records { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr)); gap: var(--app-space-4); }
.evidence-card :deep(.app-panel__content) { display: grid; height: 100%; gap: var(--app-space-4); }
.evidence-card__meta, .evidence-card__footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--app-space-3); }
.evidence-card h2, .evidence-card p, .evidence-card dl { margin: 0; }
.evidence-card p { color: var(--app-text-secondary); line-height: 1.7; }
.evidence-card dl { display: grid; gap: var(--app-space-3); }
.evidence-card dt { color: var(--app-text-muted); font-size: 0.76rem; font-weight: 800; }
.evidence-card dd { margin: var(--app-space-1) 0 0; }
.evidence-card__footer { align-self: end; padding-block-start: var(--app-space-3); border-block-start: 1px solid var(--app-border); }
.evidence-card__footer a { font-weight: 780; }
.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 52rem) { .evidence-index__controls :deep(.app-panel__content) { grid-template-columns: 1fr; } }
</style>
