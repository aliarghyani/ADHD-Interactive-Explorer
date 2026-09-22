<script setup lang="ts">
import type { ContextCopy } from '../../../features/context-feedback/copy'
import type { ContextLibraryItem } from '../../../features/context-feedback/model'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'

defineProps<{
  locale: 'en' | 'fa'
  items: readonly ContextLibraryItem[]
  copy: ContextCopy
}>()
</script>

<template>
  <main class="context-library">
    <AppPanel as="section" tone="secondary" labelledby="context-library-title">
      <AppPageHeader
        heading-id="context-library-title"
        :kicker="copy.kicker"
        :title="copy.libraryTitle"
        :summary="copy.librarySummary"
      />
      <p class="context-library__orientation">{{ copy.libraryOrientation }}</p>
    </AppPanel>

    <section class="context-library__grid" :aria-label="copy.libraryTitle">
      <AppPanel v-for="item in items" :key="item.id" as="article" class="context-library-card">
        <div class="context-library-card__identity">
          <bdi dir="ltr" class="app-canonical-id">{{ item.id }}</bdi>
          <span>{{ item.mappingCount }} {{ copy.mappings }}</span>
        </div>
        <h2>{{ item.label }}</h2>
        <p v-if="item.canonicalName !== item.label" lang="en" dir="ltr">{{ item.canonicalName }}</p>
        <span v-if="item.feedbackCount" class="context-library-card__feedback">↺ {{ copy.feedbackAvailable }}</span>
        <NuxtLink :to="`/${locale}/context/${item.id}`" :prefetch="false">
          {{ copy.explore }}
          <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span>
        </NuxtLink>
      </AppPanel>
    </section>
  </main>
</template>

<style scoped>
.context-library {
  display: grid;
  gap: var(--app-space-7);
}

.context-library__orientation {
  max-width: 52rem;
  margin: var(--app-space-4) 0 0;
  color: var(--app-text-secondary);
}

.context-library__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: var(--app-space-4);
}

.context-library-card {
  position: relative;
}

.context-library-card :deep(.app-panel__content) {
  display: grid;
  height: 100%;
  gap: var(--app-space-3);
}

.context-library-card h2,
.context-library-card p {
  margin: 0;
}

.context-library-card p,
.context-library-card__identity,
.context-library-card__feedback {
  color: var(--app-text-secondary);
}

.context-library-card__identity {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-2);
  font-size: 0.8rem;
}

.context-library-card__feedback {
  font-size: 0.82rem;
  font-weight: 760;
}

.context-library-card a {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-2);
  width: fit-content;
  margin-block-start: auto;
  font-weight: 800;
}

.context-library-card a::after {
  position: absolute;
  content: '';
  inset: 0;
  border-radius: var(--app-radius-lg);
}
</style>
