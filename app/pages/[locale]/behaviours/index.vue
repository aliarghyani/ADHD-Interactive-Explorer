<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { behaviourCopy } from '../../../../features/behaviour-explorer/copy'
import { behaviourRepository } from '../../../../features/behaviour-explorer/knowledge'
import { buildBehaviourLibrary } from '../../../../features/behaviour-explorer/model'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import BehaviourLibrary from '../../../components/behaviour-explorer/BehaviourLibrary.vue'

definePageMeta({ i18n: false, key: 'behaviour-library' })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const copy = computed(() => behaviourCopy[currentLocale.value])
const items = computed(() => buildBehaviourLibrary(
  behaviourRepository,
  new DomainLocalization(behaviourRepository),
  currentLocale.value,
))

useSeoMeta({
  title: () => copy.value.metaLibrary,
  description: () => copy.value.librarySummary,
})
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <BehaviourLibrary :locale="currentLocale" :items="items" :copy="copy" />
</template>
