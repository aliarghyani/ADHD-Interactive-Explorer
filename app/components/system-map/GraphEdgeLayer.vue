<script setup lang="ts">
import type { GraphEdgeView } from '../../../features/system-map/graph-read-model'
import type { LayoutArtifact } from '../../../visualization/system-map/layout'
import { edgeGeometryById } from '../../../visualization/system-map/layout'
import { relationshipVisualTokens } from '../../../visualization/system-map/semantic-tokens'

const props = defineProps<{
  edges: readonly GraphEdgeView[]
  layout: LayoutArtifact
  hasSelection: boolean
}>()

const geometry = edgeGeometryById(props.layout)

function pointsFor(edge: GraphEdgeView): string {
  const route = geometry.get(edge.id)
  if (!route) throw new Error(`Missing production edge geometry: ${edge.id}`)
  return [route.start, ...route.bendPoints, route.end]
    .map((point) => `${point.x},${point.y}`)
    .join(' ')
}

function tokenFor(edge: GraphEdgeView) {
  return relationshipVisualTokens[edge.relationshipType]
}
</script>

<template>
  <svg
    class="system-edge-layer"
    :viewBox="`0 0 ${layout.graphBounds.width} ${layout.graphBounds.height}`"
    aria-hidden="true"
  >
    <defs>
      <marker id="system-open-arrow" markerWidth="11" markerHeight="11" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
        <path d="M1 1 L9 5 L1 9" fill="none" stroke="context-stroke" stroke-width="1.5" />
      </marker>
      <marker id="system-feedback-arrow" markerWidth="11" markerHeight="11" refX="9" refY="5" orient="auto-start-reverse" markerUnits="strokeWidth">
        <path d="M1 1 L9 5 L1 9" fill="none" stroke="context-stroke" stroke-width="1.5" />
      </marker>
    </defs>
    <polyline
      v-for="edge in edges.filter((candidate) => candidate.visible)"
      :key="edge.id"
      class="system-graph-edge"
      :class="[
        tokenFor(edge).className,
        {
          'is-highlighted': edge.highlighted,
          'is-deemphasized': hasSelection && !edge.highlighted,
        },
      ]"
      :data-edge-id="edge.id"
      :data-relationship-type="edge.relationshipType"
      :points="pointsFor(edge)"
      fill="none"
      :marker-start="tokenFor(edge).marker === 'feedback' ? 'url(#system-feedback-arrow)' : undefined"
      :marker-end="tokenFor(edge).marker === 'feedback' ? 'url(#system-feedback-arrow)' : 'url(#system-open-arrow)'"
    />
  </svg>
</template>
