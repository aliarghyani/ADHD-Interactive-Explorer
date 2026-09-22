<script setup lang="ts">
import { createHomeContent } from '../../features/home/home-content'

const { locale, t } = useI18n()

const currentLocale = computed<'en' | 'fa'>(() => locale.value === 'fa' ? 'fa' : 'en')
const content = computed(() => createHomeContent(t, currentLocale.value))
const { data: safetyText } = await useAsyncData(
  () => `home-safety-${currentLocale.value}`,
  async () => {
    if (import.meta.server) {
      const { getHomeSafetyText } = await import('../../features/home/home-safety.server')
      return getHomeSafetyText(currentLocale.value)
    }
    return ''
  },
)

useSeoMeta({
  title: () => t('home.metaTitle'),
  description: () => t('home.metaDescription'),
  ogTitle: () => t('home.metaTitle'),
  ogDescription: () => t('home.metaDescription'),
})
</script>

<template>
  <main>
    <HomeExperience
      :locale="currentLocale"
      :content="content"
      :safety-text="safetyText ?? ''"
      :coming-soon-label="content.shell.comingSoonLabel"
      :live-label="t('home.shell.live')"
    />
  </main>
</template>
