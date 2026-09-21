<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { moveSpatialFocus, type SpatialNavigationKey } from '../../../accessibility/system-map/spatial-navigation'
import type { CanonicalNodeId, Locale } from '../../../domain'
import type { GraphReadModel } from '../../../features/system-map/graph-read-model'
import type { SystemMapCopy } from '../../../features/system-map/copy'
import type { LayoutArtifact, NodeGeometry } from '../../../visualization/system-map/layout'
import { nodeGeometryById } from '../../../visualization/system-map/layout'
import { categoryVisualTokens, semanticText } from '../../../visualization/system-map/semantic-tokens'
import GraphEdgeLayer from './GraphEdgeLayer.vue'
import GraphNode from './GraphNode.vue'

export interface ViewportTransformOptions {
  readonly minScale: number
  readonly maxScale: number
  readonly padding: number
}

const props = withDefaults(defineProps<{
  model: GraphReadModel
  layout: LayoutArtifact
  locale: Locale
  copy: SystemMapCopy
  viewportTransform?: ViewportTransformOptions
}>(), {
  viewportTransform: () => ({ minScale: 0.18, maxScale: 1, padding: 20 }),
})

const emit = defineEmits<{
  nodeSelected: [id: CanonicalNodeId]
  resetRequested: []
  nodeFocused: [id: CanonicalNodeId]
  escapeRequested: []
  ready: []
}>()

const viewport = ref<HTMLElement | null>(null)
const scale = ref(1)
const geometry = nodeGeometryById(props.layout)
let resizeObserver: ResizeObserver | undefined
let lastMeasuredWidth = 0

const hasSelection = computed(() => Boolean(props.model.selectedNodeId))
const visibleGeometry = computed(() => props.model.nodes
  .filter((node) => node.visible)
  .map((node) => geometry.get(node.id))
  .filter((item): item is NodeGeometry => Boolean(item)))
const firstFocusableNodeId = () => visibleGeometry.value
  .toSorted((a, b) => a.y - b.y || a.x - b.x || a.id.localeCompare(b.id))[0]?.id ?? null
const focusedNodeId = ref<CanonicalNodeId | null>(firstFocusableNodeId())
const scaledWidth = computed(() => props.layout.graphBounds.width * scale.value)
const scaledHeight = computed(() => props.layout.graphBounds.height * scale.value)
const anchorGeometry = computed(() => props.model.nodes
  .filter((node) => node.category === 'clinical-anchor')
  .map((node) => geometry.get(node.id))
  .filter((item): item is NodeGeometry => Boolean(item)))
const anchorBounds = computed(() => {
  const items = anchorGeometry.value
  const left = Math.min(...items.map((item) => item.x)) - 42
  const top = Math.min(...items.map((item) => item.y)) - 58
  const right = Math.max(...items.map((item) => item.x + item.width)) + 42
  const bottom = Math.max(...items.map((item) => item.y + item.height)) + 38
  return { left, top, width: right - left, height: bottom - top }
})
const layerBands = computed(() => Object.entries(categoryVisualTokens)
  .filter(([category]) => category !== 'clinical-anchor')
  .map(([category, token]) => {
    const items = props.model.nodes
      .filter((node) => node.category === category)
      .map((node) => geometry.get(node.id))
      .filter((item): item is NodeGeometry => Boolean(item))
    const top = Math.min(...items.map((item) => item.y)) - 42
    const bottom = Math.max(...items.map((item) => item.y + item.height)) + 28
    return { category, token, top, height: bottom - top }
  }))

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    const width = entries[0]?.contentRect.width
    if (width && Math.abs(width - lastMeasuredWidth) >= 1) fitToGraph(false, width)
  })
  if (viewport.value) resizeObserver.observe(viewport.value)
  requestAnimationFrame(() => {
    fitToGraph()
    emit('ready')
  })
})

onBeforeUnmount(() => resizeObserver?.disconnect())

watch(visibleGeometry, (nodes) => {
  if (!focusedNodeId.value || !nodes.some((node) => node.id === focusedNodeId.value)) {
    focusedNodeId.value = firstFocusableNodeId()
  }
})

function fitToGraph(resetScroll = false, measuredWidth?: number) {
  const width = measuredWidth ?? viewport.value?.clientWidth ?? props.layout.graphBounds.width
  lastMeasuredWidth = width
  const availableWidth = Math.max(1, width - props.viewportTransform.padding * 2)
  const nextScale = Math.min(
    props.viewportTransform.maxScale,
    Math.max(props.viewportTransform.minScale, availableWidth / props.layout.graphBounds.width),
  )
  if (Math.abs(nextScale - scale.value) >= 0.001) scale.value = nextScale
  if (resetScroll && viewport.value) viewport.value.scrollTo({ top: 0, left: 0 })
}

function resetView() {
  fitToGraph(true)
  emit('resetRequested')
}

function zoomBy(factor: number) {
  scale.value = Math.min(props.viewportTransform.maxScale, Math.max(props.viewportTransform.minScale, scale.value * factor))
}

function graphNodeElement(nodeId: CanonicalNodeId): HTMLElement | undefined {
  return [...(viewport.value?.querySelectorAll<HTMLElement>('[data-node-id]') ?? [])]
    .find((element) => element.dataset.nodeId === nodeId)
}

async function focusNode(nodeId: CanonicalNodeId | null = props.model.selectedNodeId): Promise<void> {
  const targetId = nodeId && visibleGeometry.value.some((node) => node.id === nodeId)
    ? nodeId
    : focusedNodeId.value ?? firstFocusableNodeId()
  if (!targetId) return
  focusedNodeId.value = targetId
  await nextTick()
  graphNodeElement(targetId)?.focus({ preventScroll: true })
}

function handleNodeFocus(nodeId: CanonicalNodeId): void {
  focusedNodeId.value = nodeId
  emit('nodeFocused', nodeId)
}

function handleNodeKeydown(nodeId: CanonicalNodeId, event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('escapeRequested')
    return
  }
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('nodeSelected', nodeId)
    return
  }
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
  event.preventDefault()
  const targetId = moveSpatialFocus(visibleGeometry.value, nodeId, event.key as SpatialNavigationKey)
  void focusNode(targetId)
}

defineExpose({ focusedNodeId, focusNode })
</script>

<template>
  <section class="system-visual-graph" aria-labelledby="system-visual-graph-heading" aria-describedby="system-visual-graph-description system-visual-graph-instructions">
    <header class="system-graph-toolbar">
      <div>
        <p class="system-map-eyebrow">{{ copy.explanatoryNetwork }}</p>
        <h2 id="system-visual-graph-heading">{{ copy.mapHeading }}</h2>
      </div>
      <div class="system-viewport-controls">
        <button type="button" :aria-label="copy.zoomOut" @click="zoomBy(0.82)">−</button>
        <button type="button" :aria-label="copy.zoomIn" @click="zoomBy(1.22)">+</button>
        <button type="button" class="system-reset-button" @click="resetView">{{ copy.resetView }}</button>
      </div>
    </header>

    <p id="system-visual-graph-description" class="system-visually-hidden">{{ copy.graphDescription }}</p>
    <p id="system-visual-graph-instructions" class="system-visually-hidden">{{ copy.graphKeyboardInstructions }}</p>

    <div
      ref="viewport"
      class="system-graph-viewport"
      dir="ltr"
      role="group"
      :aria-label="copy.graphKeyboardInstructions"
      :data-focused-node-id="focusedNodeId"
      data-testid="system-visual-graph"
    >
      <div class="system-graph-canvas" :style="{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }">
        <div
          class="system-graph-stage"
          :style="{
            width: `${layout.graphBounds.width}px`,
            height: `${layout.graphBounds.height}px`,
            transform: `scale(${scale})`,
          }"
        >
          <div
            v-for="band in layerBands"
            :key="band.category"
            class="system-layer-band"
            :class="band.token.className"
            :style="{ top: `${band.top}px`, height: `${band.height}px` }"
          >
            <span>{{ semanticText(band.token.label, locale) }}</span>
          </div>

          <div
            class="system-clinical-region"
            :style="{
              left: `${anchorBounds.left}px`,
              top: `${anchorBounds.top}px`,
              width: `${anchorBounds.width}px`,
              height: `${anchorBounds.height}px`,
            }"
          >
            <strong>{{ copy.clinicalRegion }}</strong>
            <span>{{ copy.clinicalRegionNote }}</span>
          </div>

          <GraphEdgeLayer :edges="model.edges" :layout="layout" :has-selection="hasSelection" />
          <GraphNode
            v-for="node in model.nodes"
            :key="node.id"
            :node="node"
            :geometry="geometry.get(node.id)!"
            :locale="locale"
            :deemphasized="hasSelection && !node.highlighted"
            :tab-index="focusedNodeId === node.id ? 0 : -1"
            @select="emit('nodeSelected', $event)"
            @focus-node="handleNodeFocus"
            @navigate="handleNodeKeydown"
          />
        </div>
      </div>
    </div>
  </section>
</template>
