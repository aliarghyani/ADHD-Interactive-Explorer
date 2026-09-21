<script setup lang="ts">
import type { Locale } from '../../../domain'
import { allFilterableLayers, type FilterableLayer } from '../../../features/system-map/graph-read-model'
import { categoryVisualTokens, semanticText } from '../../../visualization/system-map/semantic-tokens'
import AppPanel from '../ui/AppPanel.vue'

defineProps<{
  locale: Locale
  visibleLayers: ReadonlySet<FilterableLayer>
  heading: string
  itemLabel: string
}>()

defineEmits<{ change: [layer: FilterableLayer, visible: boolean] }>()
</script>

<template>
  <AppPanel class="system-layer-filter-panel" tone="quiet">
    <fieldset class="system-layer-filter">
      <legend>{{ heading }}</legend>
      <label
        v-for="layer in allFilterableLayers"
        :key="layer"
        :class="{ 'is-active': visibleLayers.has(layer) }"
        :data-selected="visibleLayers.has(layer)"
      >
        <input
          type="checkbox"
          :checked="visibleLayers.has(layer)"
          :aria-label="`${itemLabel}: ${semanticText(categoryVisualTokens[layer].label, locale)}`"
          @change="$emit('change', layer, ($event.target as HTMLInputElement).checked)"
        >
        <span class="system-filter-shape" :class="categoryVisualTokens[layer].className" aria-hidden="true" />
        <span>{{ semanticText(categoryVisualTokens[layer].label, locale) }}</span>
      </label>
    </fieldset>
  </AppPanel>
</template>
