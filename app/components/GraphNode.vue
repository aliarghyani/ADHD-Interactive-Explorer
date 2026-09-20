<script setup lang="ts">
import { categoryLabels } from '~/domain/copy'
import type { GraphNodeProjection, Locale, NodeGeometry } from '~/domain/spike-types'

defineProps<{
  node: GraphNodeProjection
  geometry: NodeGeometry
  locale: Locale
  focused: boolean
  dimmed: boolean
}>()

defineEmits<{ select: [id: string]; focus: [id: string]; keydown: [event: KeyboardEvent, id: string] }>()
</script>

<template>
  <button
    v-if="node.visible"
    type="button"
    class="graph-node"
    :class="[
      `category-${node.category}`,
      { 'is-selected': node.selected, 'is-highlighted': node.highlighted, 'is-dimmed': dimmed },
    ]"
    :style="{
      left: `${geometry.x}px`, top: `${geometry.y}px`, width: `${geometry.width}px`, height: `${geometry.height}px`,
    }"
    :tabindex="focused ? 0 : -1"
    :data-node-id="node.id"
    :aria-pressed="node.selected"
    :aria-label="`${node.label}, ${categoryLabels[locale][node.category]}, ${node.id}`"
    :dir="locale === 'fa' ? 'rtl' : 'ltr'"
    @click="$emit('select', node.id)"
    @focus="$emit('focus', node.id)"
    @keydown="$emit('keydown', $event, node.id)"
  >
    <span class="node-category">{{ categoryLabels[locale][node.category] }}</span>
    <strong>{{ node.label }}</strong>
    <code dir="ltr">{{ node.id }}</code>
  </button>
</template>
