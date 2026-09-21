<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../domain'
import type { GraphNodeView } from '../../../features/system-map/graph-read-model'
import type { NodeGeometry } from '../../../visualization/system-map/layout'
import { categoryVisualTokens, semanticText } from '../../../visualization/system-map/semantic-tokens'

const props = withDefaults(defineProps<{
  node: GraphNodeView
  geometry: NodeGeometry
  locale: Locale
  deemphasized: boolean
  tabIndex?: 0 | -1
}>(), { tabIndex: -1 })

defineEmits<{
  select: [id: GraphNodeView['id']]
  focusNode: [id: GraphNodeView['id']]
  navigate: [id: GraphNodeView['id'], event: KeyboardEvent]
}>()

const token = computed(() => categoryVisualTokens[props.node.category])
const categoryLabel = computed(() => semanticText(token.value.label, props.locale))
const secondaryLabel = computed(() => semanticText(token.value.secondaryLabel, props.locale))
const evidenceLabel = computed(() => token.value.fixedEvidenceLabel
  ? semanticText(token.value.fixedEvidenceLabel, props.locale)
  : props.node.evidenceLabel)
const ariaLabel = computed(() => [
  props.node.label,
  categoryLabel.value,
  secondaryLabel.value,
  token.value.showEvidenceOnNode ? evidenceLabel.value : null,
  props.node.id,
].filter(Boolean).join(', '))
</script>

<template>
  <button
    v-if="node.visible"
    type="button"
    class="system-graph-node"
    :class="[
      token.className,
      {
        'is-selected': node.selected,
        'is-highlighted': node.highlighted && !node.selected,
        'is-deemphasized': deemphasized,
      },
    ]"
    :style="{
      left: `${geometry.x}px`,
      top: `${geometry.y}px`,
      width: `${geometry.width}px`,
      height: `${geometry.height}px`,
    }"
    :data-node-id="node.id"
    :aria-pressed="node.selected"
    :aria-label="ariaLabel"
    :tabindex="tabIndex"
    :dir="locale === 'fa' ? 'rtl' : 'ltr'"
    @click="$emit('select', node.id)"
    @focus="$emit('focusNode', node.id)"
    @keydown="$emit('navigate', node.id, $event)"
  >
    <span class="system-node-category">{{ secondaryLabel }}</span>
    <strong>{{ node.label }}</strong>
    <span class="system-node-meta">
      <span v-if="token.showEvidenceOnNode && node.evidenceAvailable" class="system-evidence-badge">
        {{ evidenceLabel }}
      </span>
      <bdi dir="ltr">{{ node.id }}</bdi>
    </span>
  </button>
</template>
