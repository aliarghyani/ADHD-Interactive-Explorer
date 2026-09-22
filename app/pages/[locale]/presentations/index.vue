<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { presentationCopy } from '../../../../features/presentation-education/copy'
import { presentationRepository } from '../../../../features/presentation-education/knowledge'
import { buildPresentationIndex } from '../../../../features/presentation-education/model'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import PresentationIndex from '../../../components/presentation-education/PresentationIndex.vue'

definePageMeta({ i18n: false, key: 'presentation-index' })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const copy = computed(() => presentationCopy[currentLocale.value])
const localization = new DomainLocalization(presentationRepository)
const safety = new SafetyAccess(presentationRepository)
const model = computed(() => buildPresentationIndex(
  presentationRepository,
  localization,
  safety,
  currentLocale.value,
))

useSeoMeta({
  title: () => copy.value.metaIndex,
  description: () => copy.value.indexSummary,
})
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <PresentationIndex :locale="currentLocale" :model="model" :copy="copy" />
</template>
