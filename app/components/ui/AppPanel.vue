<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'aside' | 'div' | 'section'
  tone?: 'primary' | 'secondary' | 'quiet'
  padded?: boolean
  labelledby?: string
}>(), {
  as: 'section',
  tone: 'primary',
  padded: true,
  labelledby: undefined,
})
</script>

<template>
  <UCard
    :as="as"
    class="app-panel"
    :data-surface="tone"
    :aria-labelledby="labelledby"
    :ui="{ body: 'p-0 sm:p-0' }"
  >
    <div class="app-panel__content" :class="{ 'app-panel__content--flush': !padded }">
      <slot />
    </div>
  </UCard>
</template>
