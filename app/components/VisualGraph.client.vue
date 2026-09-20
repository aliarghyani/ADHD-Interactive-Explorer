<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import GraphNode from './GraphNode.vue'
import { categoryLabels, copy } from '~/domain/copy'
import { geometryByNodeId } from '~/domain/layout'
import { moveFocus, orderedNodes, type NavigableNode } from '~/domain/keyboard-navigation'
import type { GraphReadModel, LayoutArtifact, Locale } from '~/domain/spike-types'

const props = defineProps<{
  model: GraphReadModel
  layout: LayoutArtifact
  locale: Locale
  simulateFailure?: boolean
}>()
const emit = defineEmits<{ select: [id: string] }>()

if (props.simulateFailure) throw new Error('Intentional visual graph failure for resilience validation')

const container = ref<HTMLElement | null>(null)
const scale = ref(1)
const focusedNodeId = ref<string | null>(props.model.selectedNodeId)
let observer: ResizeObserver | undefined

const navigableNodes = computed<NavigableNode[]>(() =>
  props.model.nodes.flatMap((node) => {
    const geometry = geometryByNodeId.get(node.id)
    return node.visible && geometry ? [{ ...geometry, category: node.category }] : []
  }),
)

const hasSelection = computed(() => Boolean(props.model.selectedNodeId))
const anchorBounds = computed(() => {
  const values = props.model.nodes
    .filter((node) => node.category === 'clinical-anchor')
    .map((node) => geometryByNodeId.get(node.id))
    .filter((value): value is NonNullable<typeof value> => Boolean(value))
  const left = Math.min(...values.map((item) => item.x)) - 24
  const top = Math.min(...values.map((item) => item.y)) - 34
  const right = Math.max(...values.map((item) => item.x + item.width)) + 24
  const bottom = Math.max(...values.map((item) => item.y + item.height)) + 24
  return { left, top, width: right - left, height: bottom - top }
})

watchEffect(() => {
  if (!focusedNodeId.value || !navigableNodes.value.some((node) => node.id === focusedNodeId.value)) {
    focusedNodeId.value = props.model.selectedNodeId ?? orderedNodes(navigableNodes.value)[0]?.id ?? null
  }
})

onMounted(() => {
  observer = new ResizeObserver((entries) => {
    const width = entries[0]?.contentRect.width
    if (width) updateScale(width)
  })
  if (container.value) observer.observe(container.value)
  requestAnimationFrame(fit)
})
onBeforeUnmount(() => observer?.disconnect())

function fit() {
  const width = container.value?.getBoundingClientRect().width ?? props.layout.width
  updateScale(width)
}

function updateScale(width: number) {
  scale.value = Math.min(1, Math.max(0.42, (width - 2) / props.layout.width))
}

function edgePoints(id: string) {
  const edge = props.layout.edges.find((candidate) => candidate.id === id)
  return edge ? [edge.start, ...edge.bendPoints, edge.end].map((point) => `${point.x},${point.y}`).join(' ') : ''
}

async function onKeydown(event: KeyboardEvent, id: string) {
  if (['Enter', ' '].includes(event.key)) {
    event.preventDefault()
    emit('select', id)
    return
  }
  if (event.key === 'Escape') {
    event.preventDefault()
    container.value?.focus()
    return
  }
  if (!event.key.startsWith('Arrow')) return
  event.preventDefault()
  focusedNodeId.value = moveFocus(navigableNodes.value, id, event.key)
  await nextTick()
  container.value?.querySelector<HTMLElement>(`[data-node-id="${focusedNodeId.value}"]`)?.focus()
}
</script>

<template>
  <section class="visual-graph-shell" aria-labelledby="visual-graph-title">
    <div class="graph-toolbar">
      <div>
        <p class="eyebrow">Client enhancement</p>
        <h2 id="visual-graph-title">{{ copy[locale].graphHeading }}</h2>
      </div>
      <button type="button" class="secondary-button" @click="fit">{{ copy[locale].reset }}</button>
    </div>

    <div
      ref="container"
      class="graph-viewport"
      tabindex="-1"
      role="group"
      :aria-label="copy[locale].graphHeading"
      :style="{ height: `${layout.height * scale}px` }"
      dir="ltr"
      data-testid="visual-graph"
    >
      <div class="graph-stage" :style="{ width: `${layout.width}px`, height: `${layout.height}px`, transform: `scale(${scale})` }">
        <div
          class="clinical-region"
          :style="{ left: `${anchorBounds.left}px`, top: `${anchorBounds.top}px`, width: `${anchorBounds.width}px`, height: `${anchorBounds.height}px` }"
        >
          <span :dir="locale === 'fa' ? 'rtl' : 'ltr'">{{ copy[locale].clinicalHeading }}</span>
        </div>

        <svg class="edge-layer" :viewBox="`0 0 ${layout.width} ${layout.height}`" aria-hidden="true">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="context-stroke" />
            </marker>
            <marker id="feedback-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto-start-reverse" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="context-stroke" />
            </marker>
          </defs>
          <polyline
            v-for="edge in model.edges.filter((item) => item.visible)"
            :key="edge.id"
            :points="edgePoints(edge.id)"
            class="graph-edge"
            :class="[`relationship-${edge.relationshipType.toLowerCase()}`, { 'is-highlighted': edge.highlighted, 'is-dimmed': hasSelection && !edge.highlighted }]"
            fill="none"
            :marker-start="edge.relationshipType === 'FEEDBACK_WITH' ? 'url(#feedback-arrow)' : undefined"
            :marker-end="edge.relationshipType === 'FEEDBACK_WITH' ? 'url(#feedback-arrow)' : 'url(#arrow)'"
          />
        </svg>

        <GraphNode
          v-for="node in model.nodes"
          :key="node.id"
          :node="node"
          :geometry="geometryByNodeId.get(node.id)!"
          :locale="locale"
          :focused="focusedNodeId === node.id"
          :dimmed="hasSelection && !node.selected && !node.highlighted"
          @select="emit('select', $event)"
          @focus="focusedNodeId = $event"
          @keydown="onKeydown"
        />
      </div>
    </div>

    <div class="edge-legend" aria-label="Relationship legend">
      <span class="legend-solid">MODULATES</span>
      <span class="legend-dashed">CONTRIBUTES_TO</span>
      <span class="legend-feedback">FEEDBACK_WITH ↺</span>
    </div>
  </section>
</template>
