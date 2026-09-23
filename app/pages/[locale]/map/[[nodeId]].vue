<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Locale } from '../../../../domain'
import { systemMapCopy } from '../../../../features/system-map/copy'
import { systemMapRepository } from '../../../../features/system-map/knowledge'
import { useSystemMapExperience } from '../../../../features/system-map/system-map-experience'
import { DomainLocalization, documentAttributesForLocale } from '../../../../localization'
import { SafetyAccess } from '../../../../safety'
import AppPageHeader from '../../../components/ui/AppPageHeader.vue'
import AppPanel from '../../../components/ui/AppPanel.vue'
import SafetyNotice from '../../../components/ui/SafetyNotice.vue'
import FocusedPathNavigator from '../../../components/system-map/mobile/FocusedPathNavigator.vue'

const DesktopSystemMap = defineAsyncComponent(
  () => import('../../../components/system-map/DesktopSystemMap.client.vue'),
)

definePageMeta({ i18n: false, key: 'system-map' })

const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const rawNodeId = computed(() => Array.isArray(route.params.nodeId) ? route.params.nodeId[0] : route.params.nodeId)
const requestedNodeId = computed(() => typeof rawNodeId.value === 'string' ? rawNodeId.value : null)
const copy = computed(() => systemMapCopy[currentLocale.value])
const desktopMediaMatches = ref(false)
let desktopMediaQuery: MediaQueryList | undefined

function updateDesktopMedia(event: MediaQueryList | MediaQueryListEvent) {
  desktopMediaMatches.value = event.matches
}

onMounted(() => {
  desktopMediaQuery = window.matchMedia('(min-width: 48rem)')
  updateDesktopMedia(desktopMediaQuery)
  desktopMediaQuery.addEventListener('change', updateDesktopMedia)
})

onBeforeUnmount(() => {
  desktopMediaQuery?.removeEventListener('change', updateDesktopMedia)
})

const experience = useSystemMapExperience({
  repository: systemMapRepository,
  localization: new DomainLocalization(systemMapRepository),
  safety: new SafetyAccess(systemMapRepository),
  locale: currentLocale,
  requestedNodeId,
  navigate: (path) => navigateTo(path),
})

const {
  selectedNodeId,
  invalidNodeId,
  visibleLayers,
  graph,
  semantic,
  mobile,
  graphSafetyText,
  globalSafetyText,
} = experience

useHead(() => ({
  title: copy.value.metaTitle,
  htmlAttrs: documentAttributesForLocale(currentLocale.value),
}))
</script>

<template>
  <main class="system-map-page" :dir="currentLocale === 'fa' ? 'rtl' : 'ltr'">
    <UContainer class="system-map-container">
      <AppPageHeader :kicker="copy.kicker" :title="copy.title" :summary="copy.introduction" />

      <section class="system-safety-stack" aria-label="Educational safety information">
        <SafetyNotice :text="globalSafetyText" kind="global" />
        <SafetyNotice :text="graphSafetyText" kind="graph" />
      </section>

      <AppPanel v-if="invalidNodeId" class="system-invalid-state" role="status">
        <p class="system-map-eyebrow">{{ copy.invalidTitle }}</p>
        <h2><BidiIsolation direction="ltr">{{ requestedNodeId }}</BidiIsolation></h2>
        <p>{{ copy.invalidMessage }}</p>
        <UButton :to="experience.routeFor(null)" color="primary" variant="soft">
          {{ copy.backToMap }}
        </UButton>
      </AppPanel>

      <template v-else>
        <FocusedPathNavigator
          class="system-mobile-experience"
          :model="mobile"
          :locale="currentLocale"
          :copy="copy"
        />

        <DesktopSystemMap
          v-if="desktopMediaMatches"
          :locale="currentLocale"
          :copy="copy"
          :graph="graph"
          :semantic="semantic"
          :selected-node-id="selectedNodeId"
          :visible-layers="visibleLayers"
          :select-node="experience.selectNode"
          :clear-selection="experience.clearSelection"
          :set-layer-visible="experience.setLayerVisible"
        />
      </template>
    </UContainer>
  </main>
</template>
