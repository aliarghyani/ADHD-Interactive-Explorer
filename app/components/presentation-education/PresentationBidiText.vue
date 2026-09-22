<script setup lang="ts">
import { computed } from 'vue'
import BidiIsolation from '../BidiIsolation.vue'

const props = defineProps<{ text: string }>()
const parts = computed(() => props.text.split(/(ADHD|ADD)/g).filter(Boolean))
</script>

<template>
  <template v-for="(part, index) in parts" :key="`${part}-${index}`">
    <BidiIsolation v-if="part === 'ADHD' || part === 'ADD'" direction="ltr">{{ part }}</BidiIsolation>
    <template v-else>{{ part }}</template>
  </template>
</template>
