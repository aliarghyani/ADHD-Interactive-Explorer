<script setup lang="ts">
import AppPageHeader from './ui/AppPageHeader.vue'
import AppPanel from './ui/AppPanel.vue'

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
    <AppPanel as="section" class="foundation-panel" labelledby="foundation-title">
      <AppPageHeader
        heading-id="foundation-title"
        :kicker="kicker"
        :title="title"
        :summary="summary"
      >
        <div class="foundation-actions">
          <NuxtLink
            class="locale-link"
            :to="switchHref"
            :hreflang="locale === 'en' ? 'fa' : 'en'"
          >
            {{ switchLabel }}
          </NuxtLink>
        </div>
      </AppPageHeader>
    </AppPanel>
  </main>
</template>
