<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BehaviourLibraryItem } from '../../../features/behaviour-explorer/model'
import type { BehaviourCopy } from '../../../features/behaviour-explorer/copy'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'

const props = defineProps<{
  locale: 'en' | 'fa'
  items: readonly BehaviourLibraryItem[]
  copy: BehaviourCopy
}>()

const query = ref('')
const filteredItems = computed(() => {
  const normalized = query.value.trim().toLocaleLowerCase(props.locale)
  if (!normalized) return props.items
  return props.items.filter((item) =>
    [item.statement, item.label, item.canonicalName, item.id]
      .some((value) => value.toLocaleLowerCase(props.locale).includes(normalized)),
  )
})
</script>

<template>
  <main class="behaviour-library">
    <AppPageHeader :kicker="copy.kicker" :title="copy.libraryTitle" :summary="copy.librarySummary" />

    <div class="behaviour-library__search">
      <label for="behaviour-search">{{ copy.searchLabel }}</label>
      <input
        id="behaviour-search"
        v-model="query"
        class="behaviour-library__input"
        type="search"
        size="xl"
        :placeholder="copy.searchPlaceholder"
        autocomplete="off"
      >
      <p aria-live="polite">{{ filteredItems.length }} {{ copy.results }}</p>
    </div>

    <div v-if="filteredItems.length" class="behaviour-library__grid" role="list">
      <AppPanel
        v-for="item in filteredItems"
        :key="item.id"
        as="article"
        class="behaviour-card"
        role="listitem"
      >
        <div class="behaviour-card__meta">
          <span>{{ copy.canonicalBehaviour }}</span>
          <bdi dir="ltr" class="app-canonical-id">{{ item.id }}</bdi>
        </div>
        <blockquote>{{ item.statement }}</blockquote>
        <h2>{{ item.label }}</h2>
        <p>{{ copy.orientation }}</p>
        <NuxtLink class="behaviour-card__link" :to="`/${locale}/behaviours/${item.id}`" :prefetch="false">
          {{ copy.explore }}
          <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span>
        </NuxtLink>
      </AppPanel>
    </div>
    <AppPanel v-else tone="quiet" role="status">
      <p>{{ copy.noResults }}</p>
    </AppPanel>
  </main>
</template>

<style scoped>
.behaviour-library {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
}

.behaviour-library__search {
  display: grid;
  max-width: 44rem;
  gap: var(--app-space-2);
}

.behaviour-library__search label {
  font-weight: 780;
}

.behaviour-library__search p {
  margin: 0;
  color: var(--app-text-muted);
  font-size: 0.85rem;
}

.behaviour-library__input {
  width: 100%;
  min-height: 3rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--app-border-strong);
  border-radius: var(--app-radius-md);
  background: var(--app-surface-primary);
  color: var(--app-text);
}

.behaviour-library__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
  gap: var(--app-space-5);
}

.behaviour-card :deep(.app-panel__content) {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: var(--app-space-3);
}

.behaviour-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-3);
  color: var(--app-text-muted);
  font-size: 0.75rem;
  font-weight: 760;
}

.behaviour-card blockquote {
  margin: var(--app-space-2) 0 0;
  color: var(--app-text);
  font-size: 1.12rem;
  line-height: 1.65;
}

.behaviour-card h2 {
  margin: 0;
  font-size: 1rem;
}

.behaviour-card p {
  margin: 0;
  color: var(--app-text-secondary);
  font-size: 0.9rem;
}

.behaviour-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-2);
  width: fit-content;
  margin-block-start: auto;
  padding-block-start: var(--app-space-3);
  font-weight: 780;
}
</style>
