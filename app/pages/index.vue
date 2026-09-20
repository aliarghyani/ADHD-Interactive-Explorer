<script setup lang="ts">
import { documentAttributesForLocale } from '../../localization'

const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = computed<'en' | 'fa'>(() => locale.value === 'fa' ? 'fa' : 'en')
const direction = computed(() => documentAttributesForLocale(currentLocale.value).dir)
const alternateLocale = computed<'en' | 'fa'>(() => currentLocale.value === 'en' ? 'fa' : 'en')

useHead(() => ({ title: t('foundation.metaTitle') }))
</script>

<template>
  <FoundationShell
    :locale="currentLocale"
    :direction="direction"
    :kicker="t('foundation.kicker')"
    :title="t('foundation.title')"
    :summary="t('foundation.summary')"
    :switch-href="switchLocalePath(alternateLocale)"
    :switch-label="t('foundation.switchLocale')"
  />
</template>
