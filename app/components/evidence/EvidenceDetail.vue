<script setup lang="ts">
import type { EvidenceCopy } from '../../../features/evidence/copy'
import { evidenceDisplayName, readableEvidenceContext, type EvidenceDetailModel } from '../../../features/evidence/model'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import EvidenceBadge from '../ui/EvidenceBadge.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'
import CitationSource from './CitationSource.vue'

defineProps<{ locale: 'en' | 'fa', detail: EvidenceDetailModel, copy: EvidenceCopy, returnTarget?: string | null }>()
</script>

<template>
  <main class="evidence-detail">
    <nav class="evidence-detail__return" :aria-label="copy.backToIndex">
      <NuxtLink v-if="returnTarget" :to="returnTarget" :prefetch="false">{{ copy.backToExploration }}</NuxtLink>
      <NuxtLink :to="`/${locale}/evidence`" :prefetch="false">{{ copy.backToIndex }}</NuxtLink>
    </nav>

    <AppPanel class="evidence-detail__hero">
      <AppPageHeader :kicker="copy.kicker" :title="evidenceDisplayName(detail.id)" :summary="copy.detailSummary" />
      <div class="evidence-detail__identity">
        <bdi dir="ltr" class="app-canonical-id">{{ detail.id }}</bdi>
        <EvidenceBadge :label="detail.level" />
        <span>{{ copy.evidenceLevel }}</span>
      </div>
      <p class="evidence-detail__language">{{ copy.authoritativeLanguage }}</p>
      <p class="evidence-detail__summary" lang="en" dir="ltr">{{ detail.summary }}</p>
    </AppPanel>

    <AppPanel as="section" class="evidence-detail__limitations" tone="secondary" labelledby="evidence-limitations-heading">
      <h2 id="evidence-limitations-heading">{{ copy.limitations }}</h2>
      <ul lang="en" dir="ltr"><li v-for="item in detail.limitations" :key="item">{{ item }}</li></ul>
    </AppPanel>

    <AppPanel as="section" class="evidence-detail__context" labelledby="evidence-context-heading">
      <h2 id="evidence-context-heading">{{ copy.epistemicContext }}</h2>
      <dl>
        <div><dt>{{ copy.epistemicContext }}</dt><dd lang="en" dir="ltr">{{ readableEvidenceContext(detail.epistemicStatus) }}</dd></div>
        <div><dt>{{ copy.constructContext }}</dt><dd lang="en" dir="ltr">{{ readableEvidenceContext(detail.constructStatus) }}</dd></div>
      </dl>
    </AppPanel>

    <section class="evidence-detail__sources" aria-labelledby="evidence-sources-heading">
      <div><p>{{ copy.kicker }}</p><h2 id="evidence-sources-heading">{{ copy.sources }}</h2></div>
      <CitationSource v-for="source in detail.sources" :key="source.id" :source="source" :copy="copy" />
    </section>

    <SafetyNotice :text="detail.groupLevelCaution" kind="evidence" />

    <AppPanel as="section" tone="quiet" class="evidence-detail__review" labelledby="evidence-review-heading">
      <h2 id="evidence-review-heading">{{ copy.reviewMetadata }}</h2>
      <dl>
        <div><dt>{{ copy.lastReviewed }}</dt><dd><bdi dir="ltr">{{ detail.lastReviewed }}</bdi></dd></div>
        <div><dt>{{ copy.reviewVersion }}</dt><dd><bdi dir="ltr">{{ detail.reviewVersion }}</bdi></dd></div>
        <div><dt>{{ copy.languageStrategy }}</dt><dd lang="en" dir="ltr">{{ detail.languageStrategy }}</dd></div>
      </dl>
    </AppPanel>
  </main>
</template>

<style scoped>
.evidence-detail { display: grid; gap: var(--app-space-6); max-width: 70rem; margin-inline: auto; }
.evidence-detail__return { display: flex; flex-wrap: wrap; gap: var(--app-space-4); }
.evidence-detail__return a { font-weight: 780; }
.evidence-detail__hero :deep(.app-panel__content), .evidence-detail__limitations :deep(.app-panel__content), .evidence-detail__context :deep(.app-panel__content), .evidence-detail__review :deep(.app-panel__content) { display: grid; gap: var(--app-space-4); }
.evidence-detail__identity { display: flex; flex-wrap: wrap; align-items: center; gap: var(--app-space-3); }
.evidence-detail__identity span, .evidence-detail__language { color: var(--app-text-muted); font-size: 0.82rem; }
.evidence-detail__language, .evidence-detail__summary, .evidence-detail h2, .evidence-detail dl { margin: 0; }
.evidence-detail__summary { font-size: 1.08rem; line-height: 1.8; }
.evidence-detail__limitations { border-inline-start: 0.3rem solid var(--app-warning, #a16207); }
.evidence-detail__limitations ul { display: grid; gap: var(--app-space-3); margin: 0; }
.evidence-detail__context dl, .evidence-detail__review dl { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--app-space-4); }
.evidence-detail__context dt, .evidence-detail__review dt { color: var(--app-text-muted); font-size: 0.76rem; font-weight: 800; }
.evidence-detail__context dd, .evidence-detail__review dd { margin: var(--app-space-1) 0 0; overflow-wrap: anywhere; }
.evidence-detail__sources { display: grid; gap: var(--app-space-3); }
.evidence-detail__sources > div > p { margin: 0; color: var(--app-accent-strong); font-size: 0.76rem; font-weight: 800; text-transform: uppercase; }
@media (max-width: 40rem) { .evidence-detail__context dl, .evidence-detail__review dl { grid-template-columns: 1fr; } }
</style>
