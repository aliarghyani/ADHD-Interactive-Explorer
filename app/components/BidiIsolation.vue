<script setup lang="ts">
withDefaults(defineProps<{
  direction?: 'auto' | 'ltr'
}>(), {
  direction: 'auto',
})
</script>

<template>
  <bdi :dir="direction"><slot /></bdi>
</template>
