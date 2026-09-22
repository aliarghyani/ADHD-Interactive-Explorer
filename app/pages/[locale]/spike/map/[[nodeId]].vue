<script setup lang="ts">
import { buildGraphReadModel } from '~/domain/graph-read-model'
import { copy, categoryLabels } from '~/domain/copy'
import { isCanonicalNodeId, nodeById } from '~/domain/spike-data'
import { spikeLayout } from '~/domain/layout'
import type { Locale } from '~/domain/spike-types'

definePageMeta({ i18n: false })

const route = useRoute()
const locale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const rawNodeId = computed(() => Array.isArray(route.params.nodeId) ? route.params.nodeId[0] : route.params.nodeId)
const requestedNodeId = computed(() => typeof rawNodeId.value === 'string' ? rawNodeId.value : null)
const selectedNodeId = computed(() => isCanonicalNodeId(requestedNodeId.value) ? requestedNodeId.value : null)
const invalidNodeId = computed(() => Boolean(requestedNodeId.value && !selectedNodeId.value))
const model = computed(() => buildGraphReadModel(selectedNodeId.value, locale.value))
const selected = computed(() => selectedNodeId.value ? nodeById.get(selectedNodeId.value) ?? null : null)
const graphFailure = computed(() => route.query.graph === 'fail')

useHead(() => ({
  htmlAttrs: { lang: locale.value, dir: locale.value === 'fa' ? 'rtl' : 'ltr' },
  title: copy[locale.value].title,
}))

function routeFor(id?: string | null, targetLocale = locale.value) {
  return `/${targetLocale}/spike/map${id ? `/${id}` : ''}`
}

async function select(id: string) {
  await navigateTo(routeFor(id))
}
</script>

<template>
  <main class="spike-page" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
    <header class="hero">
      <div>
        <p class="eyebrow">Stage 10.1 · Architecture experiment</p>
        <h1>{{ copy[locale].title }}</h1>
        <p class="lede">{{ copy[locale].description }}</p>
        <p class="mixed-copy">{{ copy[locale].mixed }}</p>
      </div>
    </header>

    <aside class="safety-note">{{ copy[locale].safety }}</aside>

    <section v-if="selected" class="server-summary" data-testid="server-selected-summary">
      <p class="eyebrow">{{ copy[locale].selected }}</p>
      <h2>{{ selected.labels[locale] }} <code dir="ltr">{{ selected.id }}</code></h2>
      <p>{{ categoryLabels[locale][selected.category] }}</p>
    </section>

    <section v-if="invalidNodeId" class="invalid-state" role="status">
      <p>{{ copy[locale].invalid }} <code dir="ltr">{{ requestedNodeId }}</code></p>
      <NuxtLink :to="routeFor()">{{ copy[locale].back }}</NuxtLink>
    </section>

    <NuxtErrorBoundary>
      <ClientOnly>
        <VisualGraph
          :model="model"
          :layout="spikeLayout"
          :locale="locale"
          :simulate-failure="graphFailure"
          @select="select"
        />
        <template #fallback>
          <div class="graph-loading" aria-hidden="true">Visual graph enhancement loads on the client.</div>
        </template>
      </ClientOnly>
      <template #error="{ clearError }">
        <section class="graph-error" role="status">
          <p>{{ copy[locale].graphUnavailable }}</p>
          <NuxtLink :to="routeFor(selectedNodeId)" @click="clearError">{{ copy[locale].restoreGraph }}</NuxtLink>
        </section>
      </template>
    </NuxtErrorBoundary>

    <div class="failure-control">
      <NuxtLink v-if="!graphFailure" :to="{ path: routeFor(selectedNodeId), query: { graph: 'fail' } }">{{ copy[locale].simulateFailure }}</NuxtLink>
      <NuxtLink v-else :to="routeFor(selectedNodeId)">{{ copy[locale].restoreGraph }}</NuxtLink>
    </div>

    <SemanticRelationshipBrowser :selected-node-id="selectedNodeId" :locale="locale" @select="select" />
  </main>
</template>

<style src="~/assets/spike.css"></style>
