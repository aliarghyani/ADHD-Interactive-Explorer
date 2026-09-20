<script setup lang="ts">
defineProps<{
  locale: 'en' | 'fa'
  direction: 'ltr' | 'rtl'
  kicker: string
  title: string
  summary: string
  switchHref: string
  switchLabel: string
}>()
</script>

<template>
  <main class="foundation-shell" :dir="direction" :data-locale="locale">
    <section class="foundation-panel" aria-labelledby="foundation-title">
      <p class="foundation-kicker">{{ kicker }}</p>
      <h1 id="foundation-title">{{ title }}</h1>
      <p class="foundation-summary">{{ summary }}</p>
      <NuxtLink
        class="locale-link"
        :to="switchHref"
        :hreflang="locale === 'en' ? 'fa' : 'en'"
      >
        {{ switchLabel }}
      </NuxtLink>
    </section>
  </main>
</template>
