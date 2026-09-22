<script setup lang="ts">
import type { PresentationCopy } from '../../../features/presentation-education/copy'
import type { PresentationSourcePreview } from '../../../features/presentation-education/model'
import AppPanel from '../ui/AppPanel.vue'

defineProps<{
  sources: readonly PresentationSourcePreview[]
  copy: PresentationCopy
}>()
</script>

<template>
  <AppPanel as="aside" class="presentation-sources" labelledby="presentation-sources-heading">
    <div class="presentation-sources__heading">
      <h2 id="presentation-sources-heading">{{ copy.sourcesHeading }}</h2>
      <p>{{ copy.sourcesIntroduction }}</p>
      <small>{{ copy.sourceLanguage }}</small>
    </div>
    <article v-for="source in sources" :key="source.id" class="presentation-source" lang="en" dir="ltr">
      <div class="presentation-source__meta">
        <bdi dir="ltr" class="app-canonical-id">{{ source.id }}</bdi>
        <span>{{ source.year }}</span>
      </div>
      <h3>{{ source.title }}</h3>
      <p>{{ source.authorsOrOrganization }}</p>
      <dl>
        <div><dt>{{ copy.sourceType }}</dt><dd>{{ source.publicationType }}</dd></div>
        <div><dt>{{ copy.relevance }}</dt><dd>{{ source.relevanceNote }}</dd></div>
        <div><dt>{{ copy.citation }}</dt><dd>{{ source.citationText }}</dd></div>
      </dl>
      <a :href="source.url" target="_blank" rel="noreferrer">{{ copy.openSource }}</a>
    </article>
  </AppPanel>
</template>

<style scoped>
.presentation-sources :deep(.app-panel__content),
.presentation-sources__heading,
.presentation-source,
.presentation-source dl,
.presentation-source dl div {
  display: grid;
  gap: var(--app-space-3);
}

.presentation-sources__heading h2,
.presentation-sources__heading p,
.presentation-source h3,
.presentation-source p,
.presentation-source dl {
  margin: 0;
}

.presentation-sources__heading p,
.presentation-sources__heading small,
.presentation-source p {
  color: var(--app-text-muted);
}

.presentation-source {
  padding-block-start: var(--app-space-5);
  border-block-start: 1px solid var(--app-border);
}

.presentation-source__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-3);
}

.presentation-source dl div {
  gap: var(--app-space-1);
}

.presentation-source dt {
  color: var(--app-text-muted);
  font-size: 0.76rem;
  font-weight: 800;
}

.presentation-source dd {
  margin: 0;
  line-height: 1.6;
}

.presentation-source a {
  width: fit-content;
  font-weight: 780;
}
</style>
