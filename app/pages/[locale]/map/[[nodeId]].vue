<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, ref } from 'vue'
import type { CanonicalNodeId, Locale } from '../../../../domain'
import { systemMapCopy } from '../../../../features/system-map/copy'
import { systemMapRepository } from '../../../../features/system-map/knowledge'
import { useSystemMapExperience } from '../../../../features/system-map/system-map-experience'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import { productionLayout } from '../../../../visualization/system-map/layout'
import GraphLegend from '../../../components/system-map/GraphLegend.vue'
import LayerFilter from '../../../components/system-map/LayerFilter.vue'
import SemanticRelationshipBrowser from '../../../components/system-map/SemanticRelationshipBrowser.vue'
import AppPageHeader from '../../../components/ui/AppPageHeader.vue'
import AppPanel from '../../../components/ui/AppPanel.vue'
import SafetyNotice from '../../../components/ui/SafetyNotice.vue'

const VisualGraph = defineAsyncComponent(
  () => import('../../../components/system-map/VisualGraph.client.vue'),
)

definePageMeta({ i18n: false, key: 'system-map' })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const rawNodeId = computed(() => Array.isArray(route.params.nodeId) ? route.params.nodeId[0] : route.params.nodeId)
const requestedNodeId = computed(() => typeof rawNodeId.value === 'string' ? rawNodeId.value : null)
const copy = computed(() => systemMapCopy[currentLocale.value])
const visualGraph = ref<{ focusNode: (nodeId?: CanonicalNodeId | null) => Promise<void> } | null>(null)
const semanticBrowser = ref<{ focusHeading: () => void } | null>(null)
const lastSelectionSource = ref<'graph' | 'semantic'>('graph')
const pendingGraphFocusId = ref<CanonicalNodeId | null>(null)
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
  semantic,
  graphSafetyText,
  globalSafetyText,
} = experience

async function selectFromGraph(nodeId: CanonicalNodeId): Promise<void> {
  lastSelectionSource.value = 'graph'
  await experience.selectNode(nodeId)
}

async function selectFromSemantic(nodeId: CanonicalNodeId): Promise<void> {
  lastSelectionSource.value = 'semantic'
  await experience.selectNode(nodeId)
  await settleFocusTarget()
  semanticBrowser.value?.focusHeading()
}

async function showSelectedInGraph(): Promise<void> {
  if (!selectedNodeId.value) return
  lastSelectionSource.value = 'graph'
  await visualGraph.value?.focusNode(selectedNodeId.value)
}

async function clearSelectionAndRestoreFocus(): Promise<void> {
  const previousNodeId = selectedNodeId.value
  if (lastSelectionSource.value === 'graph') pendingGraphFocusId.value = previousNodeId
  await experience.clearSelection()
  await settleFocusTarget()
  if (lastSelectionSource.value === 'graph' && previousNodeId) {
    await restorePendingGraphFocus()
  } else {
    semanticBrowser.value?.focusHeading()
  }
}

async function handleGraphEscape(): Promise<void> {
  if (selectedNodeId.value) await experience.clearSelection()
}

async function settleFocusTarget(): Promise<void> {
  await nextTick()
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
  await nextTick()
}

async function restorePendingGraphFocus(): Promise<void> {
  if (!pendingGraphFocusId.value || !visualGraph.value) return
  const nodeId = pendingGraphFocusId.value
  pendingGraphFocusId.value = null
  await visualGraph.value.focusNode(nodeId)
}

useHead(() => ({
  title: copy.value.metaTitle,
  htmlAttrs: documentAttributesForLocale(currentLocale.value),
}))
</script>

<template>
  <main class="system-map-page" :dir="currentLocale === 'fa' ? 'rtl' : 'ltr'">
    <UContainer class="system-map-container">
      <AppPageHeader :kicker="copy.kicker" :title="copy.title" :summary="copy.introduction" />

      <section class="system-safety-stack" aria-label="Educational safety information">
        <SafetyNotice :text="globalSafetyText" kind="global" />
        <SafetyNotice :text="graphSafetyText" kind="graph" />
      </section>

      <AppPanel v-if="invalidNodeId" class="system-invalid-state" role="status">
        <p class="system-map-eyebrow">{{ copy.invalidTitle }}</p>
        <h2><BidiIsolation direction="ltr">{{ requestedNodeId }}</BidiIsolation></h2>
        <p>{{ copy.invalidMessage }}</p>
        <UButton :to="experience.routeFor(null)" color="primary" variant="soft">
          {{ copy.backToMap }}
        </UButton>
      </AppPanel>

      <template v-else>
        <LayerFilter
          :locale="currentLocale"
          :visible-layers="visibleLayers"
          :heading="copy.layers"
          :item-label="copy.showLayer"
          @change="experience.setLayerVisible"
        />

        <AppPanel class="system-mobile-boundary" tone="secondary" role="note">
          <h2>{{ copy.mobileTitle }}</h2>
          <p>{{ copy.mobileMessage }}</p>
        </AppPanel>

        <div class="system-map-workspace">
          <div class="system-renderer-boundary-shell">
            <NuxtErrorBoundary>
              <AppPanel class="system-renderer-boundary" :padded="false">
                <ClientOnly>
                  <VisualGraph
                    ref="visualGraph"
                    :model="graph"
                    :layout="experience.layout"
                    :locale="currentLocale"
                    :copy="copy"
                    @node-selected="selectFromGraph"
                    @escape-requested="handleGraphEscape"
                    @ready="restorePendingGraphFocus"
                  />
                  <template #fallback>
                    <div class="system-graph-loading" aria-hidden="true">{{ copy.loading }}</div>
                  </template>
                </ClientOnly>
              </AppPanel>
              <template #error="{ clearError }">
                <AppPanel class="system-renderer-boundary">
                  <section class="system-renderer-error" role="status">
                    <p>{{ copy.rendererUnavailable }}</p>
                    <UButton type="button" color="primary" variant="soft" @click="clearError">
                      {{ copy.resetView }}
                    </UButton>
                  </section>
                </AppPanel>
              </template>
            </NuxtErrorBoundary>
          </div>

          <SemanticRelationshipBrowser
            ref="semanticBrowser"
            :model="semantic"
            :locale="currentLocale"
            :copy="copy"
            @node-selected="selectFromSemantic"
            @show-in-graph="showSelectedInGraph"
            @close="clearSelectionAndRestoreFocus"
          />
        </div>

        <GraphLegend :locale="currentLocale" :heading="copy.legend" />
      </template>
    </UContainer>
  </main>
</template>
