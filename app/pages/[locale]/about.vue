<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../domain'
import { aboutContent } from '../../../features/about/content'
import { documentAttributesForLocale } from '../../../localization'
import AboutExperience from '../../components/about/AboutExperience.vue'

definePageMeta({ i18n: false, key: 'about' })
const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const content = computed(() => aboutContent[currentLocale.value])
const { data: supporting } = await useAsyncData(
  () => `about-supporting-${currentLocale.value}`,
  async () => {
    if (import.meta.server) {
      const { getSupportingKnowledge } = await import('../../../features/methodology/supporting-knowledge.server')
      return getSupportingKnowledge(currentLocale.value)
    }
  },
)

useSeoMeta({ title: () => content.value.metaTitle, description: () => content.value.metaDescription })
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template><AboutExperience v-if="supporting" :locale="currentLocale" :content="content" :global-disclaimer="supporting.globalDisclaimer" /></template>
