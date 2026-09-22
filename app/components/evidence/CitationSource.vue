<script setup lang="ts">
import { computed } from 'vue'
import type { EvidenceCopy } from '../../../features/evidence/copy'
import type { NormalizedSource } from '../../../features/evidence/model'
import BidiIsolation from '../BidiIsolation.vue'

const props = defineProps<{ source: NormalizedSource, copy: EvidenceCopy }>()

const fieldLabels = computed(() => ({
  authors: props.copy.authors,
  title: props.copy.title,
  publication: props.copy.publication,
  year: props.copy.year,
  doi: props.copy.doi,
  url: props.copy.url,
}))
</script>

<template>
  <article class="citation-source" :aria-labelledby="`source-${source.id}`">
    <header>
      <bdi dir="ltr" class="app-canonical-id">{{ source.id }}</bdi>
      <span>{{ source.publicationType }}</span>
    </header>
    <h3 :id="`source-${source.id}`">
      <BidiIsolation :direction="source.fields.find((field) => field.name === 'title')?.dir ?? 'auto'">
        {{ source.fields.find((field) => field.name === 'title')?.value }}
      </BidiIsolation>
    </h3>
    <dl class="citation-source__fields">
      <div v-for="field in source.fields.filter((item) => item.name !== 'title')" :key="field.name">
        <dt>{{ fieldLabels[field.name] }}</dt>
        <dd><BidiIsolation :direction="field.dir">{{ field.value }}</BidiIsolation></dd>
      </div>
      <div>
        <dt>{{ copy.sourceType }}</dt>
        <dd><BidiIsolation direction="ltr">{{ source.sourceType }}</BidiIsolation></dd>
      </div>
      <div>
        <dt>{{ copy.relevance }}</dt>
        <dd lang="en" dir="ltr">{{ source.relevanceNote }}</dd>
      </div>
    </dl>
    <details class="citation-source__authoritative">
      <summary>{{ copy.citationText }}</summary>
      <p lang="en" dir="ltr">{{ source.citationText }}</p>
    </details>
    <a v-if="source.url" :href="source.url" target="_blank" rel="noopener noreferrer">
      {{ copy.openSource }}: <BidiIsolation direction="ltr">{{ source.fields.find((field) => field.name === 'title')?.value }}</BidiIsolation>
    </a>
  </article>
</template>

<style scoped>
.citation-source {
  display: grid;
  gap: var(--app-space-4);
  padding-block: var(--app-space-5);
  border-block-start: 1px solid var(--app-border);
}

.citation-source header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-3);
  color: var(--app-text-muted);
  font-size: 0.78rem;
}

.citation-source h3,
.citation-source p,
.citation-source dl {
  margin: 0;
}

.citation-source__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--app-space-4);
}

.citation-source__fields div {
  min-width: 0;
}

.citation-source dt {
  color: var(--app-text-muted);
  font-size: 0.76rem;
  font-weight: 800;
}

.citation-source dd {
  margin: var(--app-space-1) 0 0;
  overflow-wrap: anywhere;
  line-height: 1.6;
}

.citation-source__authoritative summary {
  color: var(--app-accent-strong);
  cursor: pointer;
  font-weight: 760;
}

.citation-source__authoritative p {
  margin-block-start: var(--app-space-3);
}

.citation-source > a {
  width: fit-content;
  max-width: 100%;
  overflow-wrap: anywhere;
  font-weight: 780;
}

@media (max-width: 40rem) {
  .citation-source__fields { grid-template-columns: 1fr; }
}
</style>
