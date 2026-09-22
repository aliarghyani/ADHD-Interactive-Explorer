<script setup lang="ts">
import type { HomeContent } from '../../../features/home/home-content'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'

const props = defineProps<{
  locale: 'en' | 'fa'
  content: HomeContent
  safetyText: string
  comingSoonLabel: string
  liveLabel: string
}>()

function safetyParts(): string[] {
  return props.safetyText.split(/(ADHD)/g).filter(Boolean)
}
</script>

<template>
  <div class="home-experience">
    <AppPanel as="section" class="home-hero" labelledby="home-title">
      <AppPageHeader
        heading-id="home-title"
        :kicker="content.hero.kicker"
        :title="`${content.hero.titleBefore} ADHD ${content.hero.titleAfter}`"
        :summary="content.hero.summary"
      >
        <template #title>
          {{ content.hero.titleBefore }}
          <BidiIsolation direction="ltr">ADHD</BidiIsolation>
          {{ content.hero.titleAfter }}
        </template>
      </AppPageHeader>

      <SafetyNotice :text="safetyText" kind="global">
        <template v-for="(part, index) in safetyParts()" :key="`${part}-${index}`">
          <BidiIsolation v-if="part === 'ADHD'" direction="ltr">ADHD</BidiIsolation>
          <template v-else>{{ part }}</template>
        </template>
      </SafetyNotice>
      <ul class="home-safety-boundaries" :aria-label="content.hero.kicker">
        <li v-for="boundary in content.hero.boundaries" :key="boundary">{{ boundary }}</li>
      </ul>
    </AppPanel>

    <section class="home-section" aria-labelledby="clinical-title">
      <div class="home-section__heading">
        <p>{{ content.clinical.kicker }}</p>
        <h2 id="clinical-title">{{ content.clinical.title }}</h2>
        <p>{{ content.clinical.introduction }}</p>
      </div>

      <div class="home-distinction" role="list">
        <AppPanel as="div" tone="quiet" role="listitem" class="home-distinction__card">
          <span class="home-distinction__number">01</span>
          <h3>{{ content.clinical.anchorLabel }}</h3>
          <BidiIsolation v-if="locale === 'fa'" direction="ltr" class="home-canonical-term">Clinical Anchor</BidiIsolation>
          <p>{{ content.clinical.anchorDescription }}</p>
        </AppPanel>
        <span class="home-distinction__operator" aria-label="is distinct from">≠</span>
        <AppPanel as="div" tone="quiet" role="listitem" class="home-distinction__card">
          <span class="home-distinction__number">02</span>
          <h3>{{ content.clinical.regulationLabel }}</h3>
          <BidiIsolation v-if="locale === 'fa'" direction="ltr" class="home-canonical-term">Regulation</BidiIsolation>
          <p>{{ content.clinical.regulationDescription }}</p>
        </AppPanel>
        <span class="home-distinction__operator" aria-label="is distinct from">≠</span>
        <AppPanel as="div" tone="quiet" role="listitem" class="home-distinction__card">
          <span class="home-distinction__number">03</span>
          <h3>{{ content.clinical.behaviourLabel }}</h3>
          <BidiIsolation v-if="locale === 'fa'" direction="ltr" class="home-canonical-term">Observable Behaviour</BidiIsolation>
          <p>{{ content.clinical.behaviourDescription }}</p>
        </AppPanel>
      </div>
      <p class="home-boundary"><span aria-hidden="true">—</span> {{ content.clinical.boundary }}</p>
    </section>

    <section class="home-section" aria-labelledby="model-title">
      <div class="home-section__heading">
        <p>{{ content.model.kicker }}</p>
        <h2 id="model-title">{{ content.model.title }}</h2>
        <p>{{ content.model.introduction }}</p>
      </div>

      <AppPanel as="div" class="home-model" tone="secondary">
        <ol class="home-model__layers">
          <li v-for="(layer, index) in content.modelLayers" :key="layer.id">
            <div class="home-model__step">
              <span class="home-model__index">{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <h3>{{ layer.label }}</h3>
                <BidiIsolation direction="ltr" class="home-canonical-term">{{ layer.canonical }}</BidiIsolation>
                <p>{{ layer.description }}</p>
              </div>
            </div>
            <span v-if="index < content.modelLayers.length - 1" class="home-model__connector" aria-hidden="true">↓</span>
          </li>
        </ol>
        <div class="home-model__feedback">
          <span aria-hidden="true">↺</span>
          <div>
            <h3>{{ content.model.feedbackLabel }}</h3>
            <BidiIsolation direction="ltr" class="home-canonical-term">Feedback</BidiIsolation>
            <p>{{ content.model.feedbackDescription }}</p>
          </div>
        </div>
      </AppPanel>
      <p class="home-model__caution">{{ content.model.caution }}</p>
    </section>

    <section class="home-section" aria-labelledby="network-title">
      <div class="home-section__heading">
        <p>{{ content.network.kicker }}</p>
        <h2 id="network-title">{{ content.network.title }}</h2>
        <p>{{ content.network.introduction }}</p>
      </div>

      <div class="home-network" role="list">
        <AppPanel as="div" role="listitem" tone="quiet" class="home-network__card">
          <span aria-hidden="true">1 → many</span>
          <h3>{{ content.network.behaviourTitle }}</h3>
          <p>{{ content.network.behaviourDescription }}</p>
        </AppPanel>
        <AppPanel as="div" role="listitem" tone="quiet" class="home-network__card">
          <span aria-hidden="true">many → many</span>
          <h3>{{ content.network.regulationTitle }}</h3>
          <p>{{ content.network.regulationDescription }}</p>
        </AppPanel>
        <AppPanel as="div" role="listitem" tone="quiet" class="home-network__card">
          <span aria-hidden="true">↗ ↘ ↔</span>
          <h3>{{ content.network.contextTitle }}</h3>
          <p>{{ content.network.contextDescription }}</p>
        </AppPanel>
      </div>
    </section>

    <section class="home-section" aria-labelledby="explore-title">
      <div class="home-section__heading">
        <p>{{ content.explore.kicker }}</p>
        <h2 id="explore-title">{{ content.explore.title }}</h2>
        <p>{{ content.explore.introduction }}</p>
      </div>

      <div class="home-entries">
        <AppPanel
          v-for="entry in content.entryPoints"
          :key="entry.id"
          as="div"
          :tone="entry.available ? 'primary' : 'quiet'"
          class="home-entry"
          :class="{ 'home-entry--available': entry.available }"
        >
          <p class="home-entry__eyebrow">{{ entry.eyebrow }}</p>
          <h3>{{ entry.title }}</h3>
          <p>{{ entry.description }}</p>
          <span v-if="(entry.id === 'behaviours' || entry.id === 'context') && entry.available" class="home-entry__live">{{ liveLabel }}</span>
          <NuxtLink
            v-if="entry.available && entry.href"
            class="home-entry__link"
            :to="entry.href"
            :aria-label="`${entry.title}: ${entry.eyebrow}`"
          >
            {{ entry.eyebrow }}
            <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span>
          </NuxtLink>
          <span v-else class="home-entry__unavailable" aria-disabled="true">
            {{ comingSoonLabel }}
          </span>
        </AppPanel>
      </div>
    </section>

    <details class="home-disclosure">
      <summary>{{ content.disclosure.summary }}</summary>
      <div>
        <p>{{ content.disclosure.paragraphOne }}</p>
        <p>{{ content.disclosure.paragraphTwo }}</p>
      </div>
    </details>
  </div>
</template>

<style scoped>
.home-experience {
  display: grid;
  gap: clamp(4rem, 9vw, 7.5rem);
}

.home-hero {
  overflow: hidden;
  box-shadow: var(--app-shadow-md);
}

.home-hero :deep(.app-panel__content) {
  display: grid;
  gap: var(--app-space-6);
  padding: clamp(2rem, 6vw, 5rem);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--app-accent-soft) 55%, transparent), transparent 50%),
    var(--app-surface-primary);
}

[dir="rtl"] .home-hero :deep(.app-panel__content) {
  background:
    linear-gradient(-90deg, color-mix(in srgb, var(--app-accent-soft) 55%, transparent), transparent 50%),
    var(--app-surface-primary);
}

.home-hero :deep(.app-safety-notice) {
  max-width: 58rem;
}

.home-safety-boundaries {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-2);
  margin: calc(var(--app-space-4) * -1) 0 0;
  padding: 0;
  color: var(--app-text-secondary);
  font-size: 0.78rem;
  font-weight: 750;
  list-style: none;
}

.home-safety-boundaries li {
  padding: 0.2rem 0.55rem;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  background: var(--app-surface-secondary);
}

.home-entry__live {
  width: fit-content;
  padding: 0.15rem 0.55rem;
  border: 1px solid var(--app-accent);
  border-radius: 999px;
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
  font-size: 0.72rem;
  font-weight: 800;
}

.home-section {
  display: grid;
  gap: var(--app-space-6);
}

.home-section__heading {
  max-width: 52rem;
}

.home-section__heading > p:first-child,
.home-entry__eyebrow {
  margin: 0 0 var(--app-space-2);
  color: var(--app-accent-strong);
  font-size: 0.76rem;
  font-weight: 820;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

[dir="rtl"] .home-section__heading > p:first-child,
[dir="rtl"] .home-entry__eyebrow {
  letter-spacing: 0;
}

.home-section__heading h2 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 3rem);
  letter-spacing: -0.025em;
  line-height: 1.15;
}

[dir="rtl"] .home-section__heading h2 {
  letter-spacing: 0;
  line-height: 1.4;
}

.home-section__heading > p:last-child,
.home-distinction__card p,
.home-model p,
.home-network__card p,
.home-entry > :deep(.app-panel__content) > p,
.home-disclosure p {
  color: var(--app-text-secondary);
  line-height: 1.75;
}

.home-section__heading > p:last-child {
  margin: var(--app-space-3) 0 0;
}

.home-distinction {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: stretch;
  gap: var(--app-space-3);
}

.home-distinction__card :deep(.app-panel__content) {
  height: 100%;
}

.home-distinction__number,
.home-model__index {
  color: var(--app-text-muted);
  font-family: var(--app-font-mono);
  font-size: 0.76rem;
  font-weight: 800;
}

.home-distinction__card h3,
.home-model h3,
.home-network h3,
.home-entry h3 {
  margin: var(--app-space-2) 0 0;
  font-size: 1.15rem;
}

.home-distinction__card p,
.home-model p,
.home-network__card p,
.home-entry > :deep(.app-panel__content) > p {
  margin: var(--app-space-3) 0 0;
}

.home-distinction__operator {
  align-self: center;
  color: var(--app-accent-strong);
  font-size: 1.7rem;
  font-weight: 800;
}

.home-canonical-term {
  display: inline-block;
  margin-block-start: var(--app-space-2);
  color: var(--app-text-muted);
  font-size: 0.75rem;
  font-weight: 750;
}

.home-boundary,
.home-model__caution {
  max-width: 60rem;
  margin: 0;
  color: var(--app-text-secondary);
  font-weight: 650;
}

.home-model :deep(.app-panel__content) {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 0.34fr);
  gap: var(--app-space-6);
  padding: clamp(1.25rem, 3vw, 2.5rem);
}

.home-model__layers {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--app-space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.home-model__layers li {
  display: contents;
}

.home-model__step {
  min-width: 0;
  padding: var(--app-space-4);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-md);
  background: var(--app-surface-primary);
}

.home-model__connector {
  display: none;
}

.home-model__feedback {
  display: flex;
  align-items: flex-start;
  gap: var(--app-space-3);
  padding: var(--app-space-5);
  border-inline-start: 0.25rem solid var(--app-accent);
  border-radius: var(--app-radius-md);
  background: var(--app-accent-soft);
}

.home-model__feedback > span {
  color: var(--app-accent-strong);
  font-size: 1.8rem;
  line-height: 1;
}

.home-network,
.home-entries {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--app-space-4);
}

.home-network__card :deep(.app-panel__content),
.home-entry :deep(.app-panel__content) {
  height: 100%;
}

.home-network__card > :deep(.app-panel__content) > span:first-child {
  color: var(--app-accent-strong);
  font-family: var(--app-font-mono);
  font-weight: 800;
}

.home-entries {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.home-entry {
  position: relative;
}

.home-entry--available {
  border-color: var(--app-accent);
  box-shadow: var(--app-shadow-md);
}

.home-entry__link,
.home-entry__unavailable {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-2);
  margin-block-start: var(--app-space-5);
  font-weight: 800;
}

.home-entry__link::after {
  position: absolute;
  content: "";
  inset: 0;
  border-radius: var(--app-radius-lg);
}

.home-entry__unavailable {
  padding: 0.25rem 0.55rem;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  color: var(--app-text-muted);
  font-size: 0.78rem;
}

.home-disclosure {
  max-width: 60rem;
  padding-block: var(--app-space-4);
  border-block: 1px solid var(--app-border);
}

.home-disclosure summary {
  width: fit-content;
  color: var(--app-accent-strong);
  cursor: pointer;
  font-weight: 800;
}

.home-disclosure > div {
  max-width: 52rem;
  padding-block-start: var(--app-space-3);
}

@media (max-width: 70rem) {
  .home-model :deep(.app-panel__content) {
    grid-template-columns: 1fr;
  }

  .home-model__layers {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .home-entries {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 47.99rem) {
  .home-experience {
    gap: 4rem;
  }

  .home-hero :deep(.app-panel__content) {
    padding: var(--app-space-5);
  }

  .home-distinction,
  .home-network,
  .home-entries,
  .home-model__layers {
    grid-template-columns: 1fr;
  }

  .home-distinction__operator {
    justify-self: center;
    transform: rotate(90deg);
  }

  .home-model__layers li {
    display: grid;
    gap: var(--app-space-2);
  }

  .home-model__connector {
    display: block;
    justify-self: center;
    color: var(--app-accent-strong);
    font-size: 1.35rem;
  }
}
</style>
