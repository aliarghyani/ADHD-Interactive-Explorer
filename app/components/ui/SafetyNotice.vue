<script setup lang="ts">
withDefaults(defineProps<{
  text: string
  kind?: 'global' | 'graph' | 'evidence'
}>(), {
  kind: 'global',
})
</script>

<template>
  <UAlert
    class="app-safety-notice"
    color="warning"
    variant="soft"
    role="note"
    :data-safety-kind="kind"
    :description="text"
  >
    <template v-if="$slots.default" #description>
      <slot />
    </template>
  </UAlert>
</template>
