<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { systemMapCopy } from '../../../../features/system-map/copy'
import { systemMapRepository } from '../../../../features/system-map/knowledge'
import { useSystemMapExperience } from '../../../../features/system-map/system-map-experience'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import { productionLayout } from '../../../../visualization/system-map/layout'
import GraphLegend from '../../../components/system-map/GraphLegend.vue'
import LayerFilter from '../../../components/system-map/LayerFilter.vue'
import NodeDetailPanel from '../../../components/system-map/NodeDetailPanel.vue'
import VisualGraph from '../../../components/system-map/VisualGraph.client.vue'

definePageMeta({ i18n: false })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const rawNodeId = computed(() => Array.isArray(route.params.nodeId) ? route.params.nodeId[0] : route.params.nodeId)
const requestedNodeId = computed(() => typeof rawNodeId.value === 'string' ? rawNodeId.value : null)
const copy = computed(() => systemMapCopy[currentLocale.value])
const experience = useSystemMapExperience({
  repository: systemMapRepository,
  localization: new DomainLocalization(systemMapRepository),
  safety: new SafetyAccess(systemMapRepository),
  layout: productionLayout,
  locale: currentLocale,
  requestedNodeId,
  navigate: (path) => navigateTo(path),
})

const {
  selectedNodeId,
  invalidNodeId,
  visibleLayers,
  graph,
  detail,
  graphSafetyText,
  globalSafetyText,
} = experience

useHead(() => ({
  title: copy.value.metaTitle,
  htmlAttrs: documentAttributesForLocale(currentLocale.value),
}))
</script>

<template>
  <main class="system-map-page" :dir="currentLocale === 'fa' ? 'rtl' : 'ltr'">
    <header class="system-map-hero">
      <div>
        <p class="system-map-eyebrow">{{ copy.kicker }}</p>
        <h1>{{ copy.title }}</h1>
        <p>{{ copy.introduction }}</p>
      </div>
      <nav class="system-locale-switcher" :aria-label="copy.languageNavigation">
        <NuxtLink :to="experience.routeFor(selectedNodeId, 'en')" hreflang="en" :aria-current="currentLocale === 'en' ? 'page' : undefined">EN</NuxtLink>
        <NuxtLink :to="experience.routeFor(selectedNodeId, 'fa')" hreflang="fa" :aria-current="currentLocale === 'fa' ? 'page' : undefined">FA</NuxtLink>
      </nav>
    </header>

    <section class="system-safety-stack" aria-label="Educational safety information">
      <p>{{ globalSafetyText }}</p>
      <p>{{ graphSafetyText }}</p>
    </section>

    <section v-if="invalidNodeId" class="system-invalid-state" role="status">
      <p class="system-map-eyebrow">{{ copy.invalidTitle }}</p>
      <h2><BidiIsolation direction="ltr">{{ requestedNodeId }}</BidiIsolation></h2>
      <p>{{ copy.invalidMessage }}</p>
      <NuxtLink :to="experience.routeFor(null)">{{ copy.backToMap }}</NuxtLink>
    </section>

    <template v-else>
      <LayerFilter
        :locale="currentLocale"
        :visible-layers="visibleLayers"
        :heading="copy.layers"
        :item-label="copy.showLayer"
        @change="experience.setLayerVisible"
      />

      <div class="system-mobile-boundary" role="note">
        <h2>{{ copy.mobileTitle }}</h2>
        <p>{{ copy.mobileMessage }}</p>
      </div>

      <div class="system-map-workspace">
        <div class="system-renderer-boundary">
          <NuxtErrorBoundary>
            <ClientOnly>
              <VisualGraph
                :model="graph"
                :layout="experience.layout"
                :locale="currentLocale"
                :copy="copy"
                @node-selected="experience.selectNode"
              />
              <template #fallback>
                <div class="system-graph-loading" aria-hidden="true">{{ copy.loading }}</div>
              </template>
            </ClientOnly>
            <template #error="{ clearError }">
              <section class="system-renderer-error" role="status">
                <p>{{ copy.rendererUnavailable }}</p>
                <button type="button" @click="clearError">{{ copy.resetView }}</button>
              </section>
            </template>
          </NuxtErrorBoundary>
        </div>

        <NodeDetailPanel
          :detail="detail"
          :locale="currentLocale"
          :copy="copy"
          @close="experience.clearSelection"
        />
      </div>

      <GraphLegend :locale="currentLocale" :heading="copy.legend" />
    </template>
  </main>
</template>
