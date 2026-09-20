<script setup lang="ts">
import type { Locale } from '../../../domain'
import type { SelectedNodeDetail } from '../../../features/system-map/detail'
import type { SystemMapCopy } from '../../../features/system-map/copy'
import { categoryVisualTokens, relationshipVisualTokens, semanticText } from '../../../visualization/system-map/semantic-tokens'

defineProps<{
  detail: SelectedNodeDetail | null
  locale: Locale
  copy: SystemMapCopy
}>()

defineEmits<{ close: [] }>()
</script>

<template>
  <aside class="system-detail-panel" aria-labelledby="system-detail-heading">
    <div class="system-detail-heading">
      <div>
        <p class="system-map-eyebrow">{{ copy.details }}</p>
        <h2 id="system-detail-heading">{{ detail?.label ?? copy.selectPrompt }}</h2>
      </div>
      <button v-if="detail" type="button" class="system-icon-button" :aria-label="copy.close" @click="$emit('close')">×</button>
    </div>

    <p v-if="!detail" class="system-detail-empty">{{ copy.selectPrompt }}</p>

    <template v-else>
      <section>
        <h3>{{ copy.overview }}</h3>
        <div class="system-detail-badges">
          <span>{{ semanticText(categoryVisualTokens[detail.category].secondaryLabel, locale) }}</span>
          <bdi dir="ltr">{{ detail.id }}</bdi>
          <span>{{ detail.evidenceLabel }}</span>
        </div>
        <p v-if="detail.canonicalName !== detail.label" lang="en" dir="ltr" class="system-canonical-name">
          {{ detail.canonicalName }}
        </p>
      </section>

      <section>
        <h3>{{ copy.relationships }}</h3>
        <div class="system-relationship-summary">
          <div>
            <h4>{{ copy.incoming }}</h4>
            <ul v-if="detail.incoming.length">
              <li v-for="relationship in detail.incoming" :key="relationship.edgeId">
                <bdi dir="ltr">{{ relationship.nodeId }}</bdi>
                <span>{{ relationship.label }}</span>
                <small>{{ semanticText(relationshipVisualTokens[relationship.relationshipType].label, locale) }}</small>
              </li>
            </ul>
            <p v-else>{{ copy.none }}</p>
          </div>
          <div>
            <h4>{{ copy.outgoing }}</h4>
            <ul v-if="detail.outgoing.length">
              <li v-for="relationship in detail.outgoing" :key="relationship.edgeId">
                <bdi dir="ltr">{{ relationship.nodeId }}</bdi>
                <span>{{ relationship.label }}</span>
                <small>{{ semanticText(relationshipVisualTokens[relationship.relationshipType].label, locale) }}</small>
              </li>
            </ul>
            <p v-else>{{ copy.none }}</p>
          </div>
        </div>
      </section>

      <section>
        <h3>{{ copy.scientificExplanation }}</h3>
        <p lang="en" dir="ltr">{{ detail.definition }}</p>
      </section>

      <section class="system-evidence-entry">
        <h3>{{ copy.evidenceEntry }}</h3>
        <p><strong>{{ detail.evidenceCount }}</strong> {{ copy.evidenceRecords }}</p>
      </section>
    </template>
  </aside>
</template>
