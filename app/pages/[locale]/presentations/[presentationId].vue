<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { presentationCopy } from '../../../../features/presentation-education/copy'
import { presentationRepository } from '../../../../features/presentation-education/knowledge'
import { buildPresentationDetail } from '../../../../features/presentation-education/model'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import PresentationDetail from '../../../components/presentation-education/PresentationDetail.vue'
import AppPageHeader from '../../../components/ui/AppPageHeader.vue'
import AppPanel from '../../../components/ui/AppPanel.vue'
import SafetyNotice from '../../../components/ui/SafetyNotice.vue'

definePageMeta({ i18n: false, key: 'presentation-detail' })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const rawPresentationId = computed(() => Array.isArray(route.params.presentationId)
  ? route.params.presentationId[0]
  : route.params.presentationId)
const presentationId = computed(() => typeof rawPresentationId.value === 'string' ? rawPresentationId.value : '')
const copy = computed(() => presentationCopy[currentLocale.value])
const localization = new DomainLocalization(presentationRepository)
const safety = new SafetyAccess(presentationRepository)
const detail = computed(() => buildPresentationDetail(
  presentationRepository,
  localization,
  safety,
  presentationId.value,
  currentLocale.value,
))
const educationalSafety = computed(() => {
  const value = safety.getRequired('globalEducationalDisclaimer', currentLocale.value).localized.fields.text
  return typeof value === 'string' ? value : ''
})

useSeoMeta({
  title: () => detail.value ? `${detail.value.label} | ${copy.value.metaDetail}` : copy.value.invalidTitle,
  description: () => detail.value ? detail.value.description : copy.value.invalidMessage,
})
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <PresentationDetail v-if="detail" :locale="currentLocale" :detail="detail" :copy="copy" />
  <main v-else class="presentation-invalid">
    <AppPageHeader :kicker="copy.kicker" :title="copy.invalidTitle" :summary="copy.invalidMessage" />
    <SafetyNotice :text="educationalSafety" kind="global" />
    <AppPanel role="status">
      <p><bdi dir="ltr" class="app-canonical-id">{{ presentationId }}</bdi></p>
      <NuxtLink :to="`/${currentLocale}/presentations`" :prefetch="false">{{ copy.returnIndex }}</NuxtLink>
    </AppPanel>
  </main>
</template>

<style scoped>
.presentation-invalid {
  display: grid;
  gap: var(--app-space-6);
}
</style>
