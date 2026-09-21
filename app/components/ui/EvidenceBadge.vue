<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <UBadge
    class="app-evidence-badge"
    color="neutral"
    variant="outline"
    size="sm"
    :label="label"
    :data-evidence-level="label"
  />
</template>
