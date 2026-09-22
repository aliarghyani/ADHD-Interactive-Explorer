<script setup lang="ts">
import { ref } from 'vue'
import type { PresentationCopy } from '../../../features/presentation-education/copy'
import type { PresentationDetailModel } from '../../../features/presentation-education/model'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'
import BidiIsolation from '../BidiIsolation.vue'
import PresentationBidiText from './PresentationBidiText.vue'
import PresentationSourcePreview from './PresentationSourcePreview.vue'

defineProps<{
  locale: 'en' | 'fa'
  detail: PresentationDetailModel
  copy: PresentationCopy
}>()

const sourcesOpen = ref(false)
</script>

<template>
  <main class="presentation-detail">
    <NuxtLink class="presentation-detail__back" :to="`/${locale}/presentations`" :prefetch="false">
      <span aria-hidden="true">{{ locale === 'fa' ? '→' : '←' }}</span>
      {{ copy.allPresentations }}
    </NuxtLink>

    <AppPanel class="presentation-detail__hero">
      <AppPageHeader :kicker="copy.formalStatus" :title="detail.label" :summary="detail.description">
        <template #title><PresentationBidiText :text="detail.label" /></template>
        <template #summary><PresentationBidiText :text="detail.description" /></template>
      </AppPageHeader>
      <div class="presentation-detail__identity">
        <span>{{ copy.canonicalId }}</span>
        <bdi dir="ltr" class="app-canonical-id">{{ detail.id }}</bdi>
      </div>
      <SafetyNotice :text="detail.safety.presentation" kind="global"><PresentationBidiText :text="detail.safety.presentation" /></SafetyNotice>
      <div class="presentation-boundaries" :aria-label="copy.safetyHeading">
        <strong>{{ copy.safetyHeading }}</strong>
        <ul>
          <li><PresentationBidiText :text="copy.safetyTerms" /></li>
          <li><PresentationBidiText :text="copy.safetyApplication" /></li>
          <li><PresentationBidiText :text="copy.safetyBehaviour" /></li>
        </ul>
      </div>
    </AppPanel>

    <section class="presentation-section" aria-labelledby="presentation-anchor-heading">
      <div class="presentation-section__heading">
        <p>{{ copy.clinicalDomains }}</p>
        <h2 id="presentation-anchor-heading">{{ copy.anchorHeading }}</h2>
        <p>{{ copy.anchorIntroduction }}</p>
      </div>
      <div class="presentation-anchors" role="list">
        <AppPanel v-for="anchor in detail.anchors" :key="anchor.id" as="article" tone="secondary" role="listitem">
          <div class="presentation-anchor__meta">
            <bdi dir="ltr" class="app-canonical-id">{{ anchor.id }}</bdi>
            <BidiIsolation v-if="locale === 'fa'" direction="ltr">Clinical Anchor</BidiIsolation>
          </div>
          <h3>{{ anchor.label }}</h3>
          <p v-if="anchor.canonicalName !== anchor.label" lang="en" dir="ltr">{{ anchor.canonicalName }}</p>
          <details>
            <summary>{{ copy.anchorDefinition }}</summary>
            <p lang="en" dir="ltr">{{ anchor.definition }}</p>
          </details>
        </AppPanel>
      </div>
    </section>

    <section class="presentation-section" aria-labelledby="presentation-separation-heading">
      <AppPanel tone="secondary">
        <h2 id="presentation-separation-heading">{{ copy.distinctionHeading }}</h2>
        <BidiIsolation direction="ltr" class="presentation-separation__sequence">{{ copy.modelSequence }}</BidiIsolation>
        <p><PresentationBidiText :text="copy.distinctionBody" /></p>
        <NuxtLink :to="`/${locale}/map`" :prefetch="false">{{ copy.modelLink }}</NuxtLink>
      </AppPanel>
    </section>

    <section class="presentation-history" aria-labelledby="presentation-history-heading">
      <AppPanel tone="quiet">
        <div class="presentation-history__status">
          <span>{{ copy.historicalStatus }}</span>
          <bdi dir="ltr" class="app-canonical-id">{{ detail.historical.id }}</bdi>
        </div>
        <h2 id="presentation-history-heading"><PresentationBidiText :text="detail.historical.label" /></h2>
        <p><PresentationBidiText :text="detail.historical.description" /></p>
        <strong><PresentationBidiText :text="copy.historyBoundary" /></strong>
      </AppPanel>
    </section>

    <section class="presentation-evidence" aria-labelledby="presentation-evidence-heading">
      <div class="presentation-section__heading">
        <p>{{ copy.sourcesHeading }}</p>
        <h2 id="presentation-evidence-heading">{{ copy.sourcesHeading }}</h2>
        <p>{{ copy.sourcesIntroduction }}</p>
      </div>
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        :aria-expanded="sourcesOpen"
        aria-controls="presentation-source-preview"
        @click="sourcesOpen = !sourcesOpen"
      >
        {{ sourcesOpen ? copy.hideSources : copy.showSources }}
      </UButton>
      <div v-if="sourcesOpen" id="presentation-source-preview">
        <PresentationSourcePreview :locale="locale" :sources="detail.sources" :copy="copy" />
      </div>
    </section>

    <nav class="presentation-switcher" :aria-label="copy.switchHeading">
      <h2>{{ copy.switchHeading }}</h2>
      <ul>
        <li v-for="item in detail.navigation" :key="item.id">
          <span v-if="item.id === detail.id" aria-current="page">
            {{ item.label }} <small>{{ copy.currentPage }}</small>
          </span>
          <NuxtLink v-else :to="`/${locale}/presentations/${item.id}`" :prefetch="false">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <SafetyNotice :text="detail.safety.educational" kind="global"><PresentationBidiText :text="detail.safety.educational" /></SafetyNotice>
  </main>
</template>

<style scoped>
.presentation-detail,
.presentation-section,
.presentation-evidence {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
}

.presentation-detail__back,
.presentation-section a {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--app-space-2);
  font-weight: 780;
}

.presentation-detail__hero :deep(.app-panel__content),
.presentation-section :deep(.app-panel__content),
.presentation-history :deep(.app-panel__content) {
  display: grid;
  gap: var(--app-space-5);
}

.presentation-detail__identity,
.presentation-anchor__meta,
.presentation-history__status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-3);
  color: var(--app-text-muted);
  font-size: 0.78rem;
  font-weight: 760;
}

.presentation-boundaries {
  display: grid;
  gap: var(--app-space-2);
  padding: var(--app-space-4);
  border-inline-start: 0.25rem solid var(--app-accent);
  background: var(--app-surface-secondary);
}

.presentation-boundaries ul {
  display: grid;
  gap: var(--app-space-2);
  margin: 0;
  padding-inline-start: 1.25rem;
}

.presentation-section__heading {
  display: grid;
  max-width: 56rem;
  gap: var(--app-space-2);
}

.presentation-section__heading p,
.presentation-section__heading h2,
.presentation-section h2,
.presentation-section p,
.presentation-history h2,
.presentation-history p,
.presentation-evidence h2,
.presentation-switcher h2 {
  margin: 0;
}

.presentation-section__heading > p:first-child {
  color: var(--app-accent-strong);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.presentation-section__heading > p:last-child,
.presentation-section :deep(.app-panel__content) > p,
.presentation-history p {
  color: var(--app-text-secondary);
  line-height: 1.7;
}

.presentation-separation__sequence {
  width: fit-content;
  color: var(--app-text);
  font-weight: 760;
}

.presentation-anchors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: var(--app-space-4);
}

.presentation-anchors h3,
.presentation-anchors p {
  margin: 0;
}

.presentation-anchors summary {
  color: var(--app-accent-strong);
  cursor: pointer;
  font-weight: 760;
}

.presentation-anchors details p {
  margin-block-start: var(--app-space-3);
}

.presentation-history__status span {
  padding: 0.15rem 0.5rem;
  border: 1px solid var(--app-border-strong);
  border-radius: 999px;
}

.presentation-evidence > button {
  width: fit-content;
}

.presentation-switcher {
  display: grid;
  gap: var(--app-space-4);
}

.presentation-switcher ul {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--app-space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.presentation-switcher a,
.presentation-switcher span {
  display: grid;
  height: 100%;
  gap: var(--app-space-2);
  padding: var(--app-space-4);
  border: 1px solid var(--app-border-strong);
  border-radius: var(--app-radius-md);
  text-decoration: none;
}

.presentation-switcher span[aria-current='page'] {
  border-color: var(--app-accent);
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
}

.presentation-switcher small {
  color: var(--app-text-muted);
}

@media (max-width: 52rem) {
  .presentation-switcher ul {
    grid-template-columns: 1fr;
  }
}
</style>
