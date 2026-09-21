<script setup lang="ts">
import { documentAttributesForLocale } from '../localization'

const { locale } = useI18n()
const route = useRoute()

const documentLocale = computed<'en' | 'fa'>(() => {
  const routeLocale = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale
  if (routeLocale === 'en' || routeLocale === 'fa') return routeLocale
  return locale.value === 'fa' ? 'fa' : 'en'
})
const documentAttributes = computed(() => documentAttributesForLocale(documentLocale.value))

useHead(() => ({
  htmlAttrs: {
    lang: documentAttributes.value.lang,
    dir: documentAttributes.value.dir,
  },
}))
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
