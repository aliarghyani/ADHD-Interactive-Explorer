<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { CanonicalNodeId, Locale } from '../../../domain'
import type { SystemMapCopy } from '../../../features/system-map/copy'
import type { FilterableLayer, GraphReadModel } from '../../../features/system-map/graph-read-model'
import type { SemanticRelationshipModel } from '../../../features/system-map/semantic-browser'
import { productionLayout } from '../../../visualization/system-map/layout'
import AppPanel from '../ui/AppPanel.vue'
import GraphLegend from './GraphLegend.vue'
import LayerFilter from './LayerFilter.vue'
import SemanticRelationshipBrowser from './SemanticRelationshipBrowser.vue'
import VisualGraph from './VisualGraph.client.vue'

const props = defineProps<{
  locale: Locale
  copy: SystemMapCopy
  graph: GraphReadModel
  semantic: SemanticRelationshipModel | null
  selectedNodeId: CanonicalNodeId | null
  visibleLayers: ReadonlySet<FilterableLayer>
  selectNode: (nodeId: CanonicalNodeId) => Promise<unknown>
  clearSelection: () => Promise<unknown>
  setLayerVisible: (layer: FilterableLayer, visible: boolean) => void
}>()

const visualGraph = ref<{ focusNode: (nodeId?: CanonicalNodeId | null) => Promise<void> } | null>(null)
const semanticBrowser = ref<{ focusHeading: () => void } | null>(null)
const lastSelectionSource = ref<'graph' | 'semantic'>('graph')
const pendingGraphFocusId = ref<CanonicalNodeId | null>(null)

async function selectFromGraph(nodeId: CanonicalNodeId): Promise<void> {
  lastSelectionSource.value = 'graph'
  await props.selectNode(nodeId)
}

async function selectFromSemantic(nodeId: CanonicalNodeId): Promise<void> {
  lastSelectionSource.value = 'semantic'
  await props.selectNode(nodeId)
  await settleFocusTarget()
  semanticBrowser.value?.focusHeading()
}

async function showSelectedInGraph(): Promise<void> {
  if (!props.selectedNodeId) return
  lastSelectionSource.value = 'graph'
  await visualGraph.value?.focusNode(props.selectedNodeId)
}

async function clearSelectionAndRestoreFocus(): Promise<void> {
  const previousNodeId = props.selectedNodeId
  if (lastSelectionSource.value === 'graph') pendingGraphFocusId.value = previousNodeId
  await props.clearSelection()
  await settleFocusTarget()
  if (lastSelectionSource.value === 'graph' && previousNodeId) {
    await restorePendingGraphFocus()
  } else {
    semanticBrowser.value?.focusHeading()
  }
}

async function handleGraphEscape(): Promise<void> {
  if (props.selectedNodeId) await props.clearSelection()
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
</script>

<template>
  <section class="system-desktop-experience" aria-label="Desktop system map">
    <LayerFilter
      :locale="locale"
      :visible-layers="visibleLayers"
      :heading="copy.layers"
      :item-label="copy.showLayer"
      @change="setLayerVisible"
    />

    <div class="system-map-workspace">
      <div class="system-renderer-boundary-shell">
        <NuxtErrorBoundary>
          <AppPanel class="system-renderer-boundary" :padded="false">
            <VisualGraph
              ref="visualGraph"
              :model="graph"
              :layout="productionLayout"
              :locale="locale"
              :copy="copy"
              @node-selected="selectFromGraph"
              @escape-requested="handleGraphEscape"
              @ready="restorePendingGraphFocus"
            />
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
        :locale="locale"
        :copy="copy"
        @node-selected="selectFromSemantic"
        @show-in-graph="showSelectedInGraph"
        @close="clearSelectionAndRestoreFocus"
      />
    </div>

    <GraphLegend :locale="locale" :heading="copy.legend" />
  </section>
</template>
