<script setup lang="ts">
import type { Locale } from '../../../domain'
import { categoryVisualTokens, relationshipVisualTokens, semanticText } from '../../../visualization/system-map/semantic-tokens'
import AppPanel from '../ui/AppPanel.vue'

defineProps<{ locale: Locale; heading: string }>()
</script>

<template>
  <AppPanel class="system-map-legend" tone="secondary" labelledby="system-map-legend-heading">
    <h2 id="system-map-legend-heading">{{ heading }}</h2>
    <div class="system-legend-categories">
      <div v-for="(token, category) in categoryVisualTokens" :key="category" class="system-legend-item">
        <span class="system-legend-node" :class="token.className" aria-hidden="true" />
        <span>
          <strong>{{ semanticText(token.label, locale) }}</strong>
          <small>{{ semanticText(token.secondaryLabel, locale) }}</small>
        </span>
      </div>
    </div>
    <div class="system-legend-relationships">
      <div v-for="(token, relationship) in relationshipVisualTokens" :key="relationship" class="system-legend-item">
        <span class="system-legend-line" :class="token.className" aria-hidden="true" />
        <span>
          <strong><bdi dir="ltr">{{ relationship }}</bdi> · {{ semanticText(token.label, locale) }}</strong>
          <small>{{ semanticText(token.description, locale) }}</small>
        </span>
      </div>
    </div>
  </AppPanel>
</template>
