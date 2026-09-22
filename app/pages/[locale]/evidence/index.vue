<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { evidenceCopy } from '../../../../features/evidence/copy'
import { evidenceRepository } from '../../../../features/evidence/knowledge'
import { buildEvidenceIndex } from '../../../../features/evidence/model'
import { documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import EvidenceIndex from '../../../components/evidence/EvidenceIndex.vue'

definePageMeta({ i18n: false, key: 'evidence-index' })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const copy = computed(() => evidenceCopy[currentLocale.value])
const records = buildEvidenceIndex(evidenceRepository)
const initialQuery = computed(() => typeof route.query.source === 'string' ? route.query.source : '')
const safety = new SafetyAccess(evidenceRepository)
const safetyText = computed(() => {
  const value = safety.getRequired('groupLevelEvidenceCaution', currentLocale.value).localized.fields.text
  return typeof value === 'string' ? value : ''
})

useSeoMeta({
  title: () => copy.value.metaTitle,
  description: () => copy.value.indexSummary,
})
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <EvidenceIndex :locale="currentLocale" :records="records" :copy="copy" :safety-text="safetyText" :initial-query="initialQuery" />
</template>
