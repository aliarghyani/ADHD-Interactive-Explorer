<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { contextCopy } from '../../../../features/context-feedback/copy'
import { contextRepository } from '../../../../features/context-feedback/knowledge'
import { buildContextDetail } from '../../../../features/context-feedback/model'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import ContextDetail from '../../../components/context-feedback/ContextDetail.vue'
import AppPageHeader from '../../../components/ui/AppPageHeader.vue'
import AppPanel from '../../../components/ui/AppPanel.vue'
import SafetyNotice from '../../../components/ui/SafetyNotice.vue'

definePageMeta({ i18n: false, key: 'context-detail' })

const route = useRoute()
const router = useRouter()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const rawContextId = computed(() => Array.isArray(route.params.contextId) ? route.params.contextId[0] : route.params.contextId)
const contextId = computed(() => typeof rawContextId.value === 'string' ? rawContextId.value : '')
const requestedState = computed(() => {
  if (typeof route.query.state === 'string') return route.query.state
  return route.query.state === undefined ? null : '__INVALID_CONTEXT_STATE__'
})
const copy = computed(() => contextCopy[currentLocale.value])
const localization = new DomainLocalization(contextRepository)
const safety = new SafetyAccess(contextRepository)
const detail = computed(() => buildContextDetail(
  contextRepository,
  localization,
  safety,
  contextId.value,
  currentLocale.value,
))
const educationalSafety = computed(() => {
  const value = safety.getRequired('globalEducationalDisclaimer', currentLocale.value).localized.fields.text
  return typeof value === 'string' ? value : ''
})

async function setState(state: string): Promise<void> {
  await router.replace({ path: route.path, query: state === 'neutral' ? {} : { state } })
}

async function reset(): Promise<void> {
  await router.replace({ path: route.path, query: {} })
}

useSeoMeta({
  title: () => detail.value ? `${detail.value.label} | ${copy.value.metaDetail}` : copy.value.invalidTitle,
  description: () => detail.value ? copy.value.librarySummary : copy.value.invalidMessage,
})
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <ContextDetail
    v-if="detail"
    :locale="currentLocale"
    :detail="detail"
    :copy="copy"
    :requested-state="requestedState"
    @state-change="setState"
    @reset="reset"
  />
  <main v-else class="context-invalid">
    <AppPageHeader :kicker="copy.kicker" :title="copy.invalidTitle" :summary="copy.invalidMessage" />
    <SafetyNotice :text="educationalSafety" kind="global" />
    <AppPanel role="status">
      <p><bdi dir="ltr" class="app-canonical-id">{{ contextId }}</bdi></p>
      <NuxtLink :to="`/${currentLocale}/context`" :prefetch="false">{{ copy.returnLibrary }}</NuxtLink>
    </AppPanel>
  </main>
</template>

<style scoped>
.context-invalid {
  display: grid;
  gap: var(--app-space-6);
}
</style>
