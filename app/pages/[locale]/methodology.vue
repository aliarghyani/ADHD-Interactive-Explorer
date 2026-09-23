<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../../../domain'
import { methodologyContent } from '../../../features/methodology/content'
import { documentAttributesForLocale } from '../../../localization'
import MethodologyExperience from '../../components/methodology/MethodologyExperience.vue'

definePageMeta({ i18n: false, key: 'methodology' })
const route = useRoute()
const currentLocale = computed<Locale>(() => route.params.locale === 'fa' ? 'fa' : 'en')
const content = computed(() => methodologyContent[currentLocale.value])
const { data: supporting } = await useAsyncData(
  () => `methodology-supporting-${currentLocale.value}`,
  async () => {
    if (import.meta.server) {
      const { getSupportingKnowledge } = await import('../../../features/methodology/supporting-knowledge.server')
      return getSupportingKnowledge(currentLocale.value)
    }
  },
)

useSeoMeta({ title: () => content.value.metaTitle, description: () => content.value.metaDescription })
useHead(() => ({ htmlAttrs: documentAttributesForLocale(currentLocale.value) }))
</script>

<template>
  <MethodologyExperience
    v-if="supporting"
    :locale="currentLocale"
    :content="content"
    :global-disclaimer="supporting.globalDisclaimer"
    :group-level-caution="supporting.groupLevelCaution"
    :knowledge-release-id="supporting.knowledgeReleaseId"
    :evidence-review-version="supporting.evidenceReviewVersion"
  />
</template>
