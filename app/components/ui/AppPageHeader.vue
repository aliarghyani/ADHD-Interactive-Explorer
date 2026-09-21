<script setup lang="ts">
withDefaults(defineProps<{
  kicker: string
  title: string
  summary?: string
  headingId?: string
}>(), {
  summary: undefined,
  headingId: undefined,
})
</script>

<template>
  <header class="app-page-header">
    <div class="app-page-header__copy">
      <p class="app-page-header__kicker">{{ kicker }}</p>
      <h1 :id="headingId" class="app-page-header__title">{{ title }}</h1>
      <p v-if="summary" class="app-page-header__summary">{{ summary }}</p>
      <slot />
    </div>
    <div v-if="$slots.actions" class="app-page-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>
