<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { contextCopy } from '../../../../features/context-feedback/copy'
import { contextRepository } from '../../../../features/context-feedback/knowledge'
import { buildContextLibrary } from '../../../../features/context-feedback/model'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import ContextLibrary from '../../../components/context-feedback/ContextLibrary.vue'

definePageMeta({ i18n: false, key: 'context-library' })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const copy = computed(() => contextCopy[currentLocale.value])
const items = computed(() => buildContextLibrary(
  contextRepository,
  new DomainLocalization(contextRepository),
  currentLocale.value,
))

useSeoMeta({
  title: () => copy.value.metaLibrary,
  description: () => copy.value.librarySummary,
})
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <ContextLibrary :locale="currentLocale" :items="items" :copy="copy" />
</template>
