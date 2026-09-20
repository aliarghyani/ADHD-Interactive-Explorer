<script setup lang="ts">
import { computed } from 'vue'
import { categoryLabels, copy, relationshipLabels } from '~/domain/copy'
import { nodeById } from '~/domain/spike-data'
import { selectDownstream, selectFeedback, selectNode, selectUpstream } from '~/domain/selectors'
import type { Locale, SpikeEdge } from '~/domain/spike-types'

const props = defineProps<{ selectedNodeId: string | null; locale: Locale }>()
const emit = defineEmits<{ select: [id: string] }>()

const selected = computed(() => selectNode(props.selectedNodeId))
const groups = computed(() => [
  { key: 'upstream', label: copy[props.locale].upstream, edges: selectUpstream(props.selectedNodeId) },
  { key: 'downstream', label: copy[props.locale].downstream, edges: selectDownstream(props.selectedNodeId) },
  { key: 'feedback', label: copy[props.locale].feedback, edges: selectFeedback(props.selectedNodeId) },
])

function relatedId(edge: SpikeEdge) {
  return edge.sourceId === props.selectedNodeId ? edge.targetId : edge.sourceId
}
</script>

<template>
  <section class="semantic-browser" aria-labelledby="relationship-browser-title">
    <div class="section-heading">
      <p class="eyebrow">Semantic Relationship Browser</p>
      <h2 id="relationship-browser-title">{{ copy[locale].selected }}</h2>
    </div>

    <p v-if="!selected" class="empty-state">{{ copy[locale].selectPrompt }}</p>
    <template v-else>
      <div class="selected-summary" data-testid="selected-summary">
        <span class="category-pill">{{ categoryLabels[locale][selected.category] }}</span>
        <strong>{{ selected.labels[locale] }}</strong>
        <code dir="ltr">{{ selected.id }}</code>
      </div>

      <div class="relationship-groups">
        <section v-for="group in groups" :key="group.key">
          <h3>{{ group.label }}</h3>
          <p v-if="!group.edges.length" class="muted">{{ copy[locale].none }}</p>
          <ul v-else>
            <li v-for="edge in group.edges" :key="edge.id">
              <button type="button" @click="emit('select', relatedId(edge))">
                <span>{{ nodeById.get(relatedId(edge))?.labels[locale] }}</span>
                <small>
                  {{ relationshipLabels[locale][edge.relationshipType] }} ·
                  {{ categoryLabels[locale][nodeById.get(relatedId(edge))!.category] }}
                </small>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </template>
  </section>
</template>
