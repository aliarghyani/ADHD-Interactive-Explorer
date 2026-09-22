<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../../domain'
import { behaviourCopy } from '../../../../features/behaviour-explorer/copy'
import { behaviourRepository } from '../../../../features/behaviour-explorer/knowledge'
import { buildBehaviourDetail } from '../../../../features/behaviour-explorer/model'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import BehaviourDetail from '../../../components/behaviour-explorer/BehaviourDetail.vue'
import AppPageHeader from '../../../components/ui/AppPageHeader.vue'
import AppPanel from '../../../components/ui/AppPanel.vue'
import SafetyNotice from '../../../components/ui/SafetyNotice.vue'

definePageMeta({ i18n: false, key: 'behaviour-detail' })

const route = useRoute()
const router = useRouter()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const rawBehaviourId = computed(() => Array.isArray(route.params.behaviourId) ? route.params.behaviourId[0] : route.params.behaviourId)
const behaviourId = computed(() => typeof rawBehaviourId.value === 'string' ? rawBehaviourId.value : '')
const requestedPathway = computed(() => {
  if (typeof route.query.pathway === 'string') return route.query.pathway
  return route.query.pathway === undefined ? null : '__INVALID_PATHWAY_QUERY__'
})
const copy = computed(() => behaviourCopy[currentLocale.value])
const localization = new DomainLocalization(behaviourRepository)
const safety = new SafetyAccess(behaviourRepository)
const detail = computed(() => buildBehaviourDetail(
  behaviourRepository,
  localization,
  safety,
  behaviourId.value,
  currentLocale.value,
))
const behaviourSafetyText = computed(() => {
  const value = safety.getRequired('behaviourCaution', currentLocale.value).localized.fields.text
  return typeof value === 'string' ? value : ''
})

async function setPathway(pathwayId: string): Promise<void> {
  await router.replace({ path: route.path, query: { pathway: pathwayId } })
}

async function reset(): Promise<void> {
  await router.replace({ path: route.path, query: {} })
}

useSeoMeta({
  title: () => detail.value ? `${detail.value.label} | ${copy.value.metaDetail}` : copy.value.invalidTitle,
  description: () => detail.value?.statement ?? copy.value.invalidMessage,
})
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <BehaviourDetail
    v-if="detail"
    :locale="currentLocale"
    :detail="detail"
    :copy="copy"
    :requested-pathway="requestedPathway"
    @pathway-change="setPathway"
    @reset="reset"
  />
  <main v-else class="behaviour-invalid">
    <AppPageHeader :kicker="copy.kicker" :title="copy.invalidTitle" :summary="copy.invalidMessage" />
    <SafetyNotice :text="behaviourSafetyText" kind="global" />
    <AppPanel role="status">
      <p><bdi dir="ltr" class="app-canonical-id">{{ behaviourId }}</bdi></p>
      <NuxtLink :to="`/${currentLocale}/behaviours`" :prefetch="false">{{ copy.returnLibrary }}</NuxtLink>
    </AppPanel>
  </main>
</template>

<style scoped>
.behaviour-invalid {
  display: grid;
  gap: var(--app-space-6);
}
</style>
