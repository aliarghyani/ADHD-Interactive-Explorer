<script setup lang="ts">
import type { PresentationCopy } from '../../../features/presentation-education/copy'
import type { PresentationIndexModel } from '../../../features/presentation-education/model'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'
import BidiIsolation from '../BidiIsolation.vue'
import PresentationBidiText from './PresentationBidiText.vue'

defineProps<{
  locale: 'en' | 'fa'
  model: PresentationIndexModel
  copy: PresentationCopy
}>()
</script>

<template>
  <main class="presentation-index">
    <AppPanel class="presentation-index__hero">
      <AppPageHeader :kicker="copy.kicker" :title="copy.indexTitle" :summary="copy.indexSummary">
        <template #title><PresentationBidiText :text="copy.indexTitle" /></template>
        <template #summary><PresentationBidiText :text="copy.indexSummary" /></template>
      </AppPageHeader>
      <SafetyNotice :text="model.safety.presentation" kind="global"><PresentationBidiText :text="model.safety.presentation" /></SafetyNotice>
      <div class="presentation-boundaries" :aria-label="copy.safetyHeading">
        <strong>{{ copy.safetyHeading }}</strong>
        <ul>
          <li><PresentationBidiText :text="copy.safetyTerms" /></li>
          <li><PresentationBidiText :text="copy.safetyApplication" /></li>
          <li><PresentationBidiText :text="copy.safetyBehaviour" /></li>
        </ul>
      </div>
    </AppPanel>

    <section class="presentation-section" aria-labelledby="presentation-options-heading">
      <div class="presentation-section__heading">
        <p>{{ copy.formalStatus }}</p>
        <h2 id="presentation-options-heading">{{ copy.orientation }}</h2>
      </div>
      <div class="presentation-grid" role="list">
        <AppPanel
          v-for="item in model.presentations"
          :key="item.id"
          as="article"
          class="presentation-card"
          role="listitem"
        >
          <div class="presentation-card__meta">
            <span>{{ copy.formalStatus }}</span>
            <bdi dir="ltr" class="app-canonical-id">{{ item.id }}</bdi>
          </div>
          <h3><PresentationBidiText :text="item.label" /></h3>
          <p><PresentationBidiText :text="item.description" /></p>
          <dl>
            <dt>{{ item.anchorLabels.length > 1 ? copy.clinicalDomains : copy.clinicalDomain }}</dt>
            <dd>{{ item.anchorLabels.join(' · ') }}</dd>
          </dl>
          <NuxtLink class="presentation-card__link" :to="`/${locale}/presentations/${item.id}`" :prefetch="false">
            {{ copy.learnAbout }}
            <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span>
          </NuxtLink>
        </AppPanel>
      </div>
    </section>

    <section class="presentation-separation" aria-labelledby="presentation-separation-heading">
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
          <bdi dir="ltr" class="app-canonical-id">{{ model.historical.id }}</bdi>
        </div>
        <h2 id="presentation-history-heading"><PresentationBidiText :text="model.historical.label" /></h2>
        <p><PresentationBidiText :text="model.historical.description" /></p>
        <strong><PresentationBidiText :text="copy.historyBoundary" /></strong>
      </AppPanel>
    </section>

    <SafetyNotice :text="model.safety.educational" kind="global"><PresentationBidiText :text="model.safety.educational" /></SafetyNotice>
  </main>
</template>

<style scoped>
.presentation-index {
  display: grid;
  gap: clamp(2.5rem, 6vw, 5rem);
}

.presentation-index__hero :deep(.app-panel__content),
.presentation-section,
.presentation-separation :deep(.app-panel__content),
.presentation-history :deep(.app-panel__content) {
  display: grid;
  gap: var(--app-space-5);
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
  max-width: 55rem;
  gap: var(--app-space-2);
}

.presentation-section__heading p,
.presentation-section__heading h2,
.presentation-card h3,
.presentation-card p,
.presentation-history h2,
.presentation-history p,
.presentation-separation h2,
.presentation-separation p {
  margin: 0;
}

.presentation-section__heading p,
.presentation-card__meta,
.presentation-history__status {
  color: var(--app-accent-strong);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.presentation-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--app-space-4);
}

.presentation-card :deep(.app-panel__content) {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: var(--app-space-4);
}

.presentation-card__meta,
.presentation-history__status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-3);
}

.presentation-card h3 {
  font-size: 1.2rem;
}

.presentation-card p,
.presentation-separation p,
.presentation-history p {
  color: var(--app-text-secondary);
  line-height: 1.7;
}

.presentation-card dl {
  display: grid;
  gap: var(--app-space-2);
  margin: 0;
  padding-block-start: var(--app-space-3);
  border-block-start: 1px solid var(--app-border);
}

.presentation-card dt {
  color: var(--app-text-muted);
  font-size: 0.78rem;
  font-weight: 760;
}

.presentation-card dd {
  margin: 0;
  font-weight: 740;
}

.presentation-card__link,
.presentation-separation a {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--app-space-2);
  margin-block-start: auto;
  font-weight: 780;
}

.presentation-separation__sequence {
  width: fit-content;
  color: var(--app-text);
  font-weight: 760;
}

.presentation-history__status span {
  padding: 0.15rem 0.5rem;
  border: 1px solid var(--app-border-strong);
  border-radius: 999px;
}

@media (max-width: 52rem) {
  .presentation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
