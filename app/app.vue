<script setup lang="ts">
import { createHomeContent } from '../features/home/home-content'
import { documentAttributesForLocale, switchLocaleInPath } from '../localization'

const { locale, t } = useI18n()
const route = useRoute()

const documentLocale = computed<'en' | 'fa'>(() => {
  const routeLocale = Array.isArray(route.params.locale) ? route.params.locale[0] : route.params.locale
  if (routeLocale === 'en' || routeLocale === 'fa') return routeLocale
  return locale.value === 'fa' ? 'fa' : 'en'
})
const documentAttributes = computed(() => documentAttributesForLocale(documentLocale.value))
const alternateLocale = computed<'en' | 'fa'>(() => documentLocale.value === 'en' ? 'fa' : 'en')
const shellContent = computed(() => createHomeContent(t, documentLocale.value))
const switchHref = computed(() => {
  if (!/^\/(en|fa)(?=\/|\?|#|$)/.test(route.fullPath)) return `/${alternateLocale.value}`
  return switchLocaleInPath(route.fullPath, alternateLocale.value)
})

useHead(() => ({
  htmlAttrs: {
    lang: documentAttributes.value.lang,
    dir: documentAttributes.value.dir,
  },
}))
</script>

<template>
  <UApp>
    <AppShell
      :locale="documentLocale"
      :direction="documentAttributes.dir"
      :product-name="shellContent.shell.productName"
      :navigation-label="shellContent.shell.navigationLabel"
      :coming-soon-label="shellContent.shell.comingSoonLabel"
      :live-label="t('home.shell.live')"
      :skip-label="shellContent.shell.skipLabel"
      :switch-href="switchHref"
      :switch-label="t('home.shell.switchLocale')"
      :current-path="route.path"
      :navigation="shellContent.navigation"
    >
      <NuxtPage />
    </AppShell>
  </UApp>
</template>
