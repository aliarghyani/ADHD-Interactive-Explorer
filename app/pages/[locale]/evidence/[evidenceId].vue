<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { evidenceCopy } from '../../../../features/evidence/copy'
import { evidenceRepository } from '../../../../features/evidence/knowledge'
import { buildEvidenceDetail, safeEvidenceReturnTarget } from '../../../../features/evidence/model'
import { documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import EvidenceDetail from '../../../components/evidence/EvidenceDetail.vue'
import AppPageHeader from '../../../components/ui/AppPageHeader.vue'
import AppPanel from '../../../components/ui/AppPanel.vue'
import SafetyNotice from '../../../components/ui/SafetyNotice.vue'

definePageMeta({ i18n: false, key: 'evidence-detail' })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const rawEvidenceId = computed(() => Array.isArray(route.params.evidenceId) ? route.params.evidenceId[0] : route.params.evidenceId)
const evidenceId = computed(() => typeof rawEvidenceId.value === 'string' ? rawEvidenceId.value : '')
const copy = computed(() => evidenceCopy[currentLocale.value])
const safety = new SafetyAccess(evidenceRepository)
const detail = computed(() => buildEvidenceDetail(evidenceRepository, safety, evidenceId.value, currentLocale.value))
const returnTarget = computed(() => safeEvidenceReturnTarget(route.query.from, currentLocale.value))
const groupLevelCaution = computed(() => {
  const value = safety.getRequired('groupLevelEvidenceCaution', currentLocale.value).localized.fields.text
  return typeof value === 'string' ? value : ''
})

useSeoMeta({
  title: () => detail.value ? `${evidenceId.value} | ${copy.value.metaTitle}` : copy.value.invalidTitle,
  description: () => detail.value?.summary ?? copy.value.invalidMessage,
})
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <EvidenceDetail v-if="detail" :locale="currentLocale" :detail="detail" :copy="copy" :return-target="returnTarget" />
  <main v-else class="evidence-invalid">
    <AppPageHeader :kicker="copy.kicker" :title="copy.invalidTitle" :summary="copy.invalidMessage" />
    <SafetyNotice :text="groupLevelCaution" kind="evidence" />
    <AppPanel role="status">
      <p><bdi dir="ltr" class="app-canonical-id">{{ evidenceId }}</bdi></p>
      <NuxtLink :to="`/${currentLocale}/evidence`" :prefetch="false">{{ copy.backToIndex }}</NuxtLink>
    </AppPanel>
  </main>
</template>

<style scoped>
.evidence-invalid { display: grid; gap: var(--app-space-6); }
</style>
