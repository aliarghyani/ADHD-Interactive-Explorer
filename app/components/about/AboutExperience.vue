<script setup lang="ts">
import type { AboutContent } from '../../../features/about/content'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'
defineProps<{ locale: 'en' | 'fa', content: AboutContent, globalDisclaimer: string }>()
</script>

<template>
  <main class="about">
    <AppPageHeader :kicker="content.kicker" :title="content.title" :summary="content.summary" />
    <section class="about__section" aria-labelledby="purpose-title"><h2 id="purpose-title">{{ content.purposeTitle }}</h2><ul><li v-for="item in content.purpose" :key="item">{{ item }}</li></ul></section>
    <section class="about__section" aria-labelledby="explore-title"><h2 id="explore-title">{{ content.exploreTitle }}</h2><div class="about__experiences"><AppPanel v-for="item in content.experiences" :key="item.href" as="article"><h3>{{ item.title }}</h3><p>{{ item.description }}</p><NuxtLink :to="`/${locale}/${item.href}`" :prefetch="false">{{ item.title }} <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span></NuxtLink></AppPanel></div></section>
    <AppPanel as="section" tone="secondary" labelledby="evidence-role-title" class="about__section"><h2 id="evidence-role-title">{{ content.evidenceTitle }}</h2><p>{{ content.evidence }}</p><NuxtLink :to="`/${locale}/evidence`" :prefetch="false">{{ content.evidenceLink }}</NuxtLink></AppPanel>
    <section class="about__section" aria-labelledby="boundaries-about-title"><h2 id="boundaries-about-title">{{ content.boundariesTitle }}</h2><ul class="about__boundaries"><li v-for="item in content.boundaries" :key="item">{{ item }}</li></ul></section>
    <div class="about__two-column"><AppPanel as="section" tone="quiet" labelledby="language-title"><h2 id="language-title">{{ content.languageTitle }}</h2><p>{{ content.language }}</p></AppPanel><AppPanel as="section" tone="quiet" labelledby="state-title"><h2 id="state-title">{{ content.stateTitle }}</h2><p>{{ content.state }}</p></AppPanel></div>
    <section class="about__section" aria-labelledby="disclaimer-title"><h2 id="disclaimer-title">{{ content.disclaimerTitle }}</h2><SafetyNotice :text="globalDisclaimer" kind="global" /></section>
    <nav class="about__support" :aria-label="content.supportingTitle"><h2>{{ content.supportingTitle }}</h2><NuxtLink :to="`/${locale}/methodology`" :prefetch="false">{{ content.methodologyLink }}</NuxtLink><NuxtLink :to="`/${locale}/presentations`" :prefetch="false">{{ content.presentationsLink }}</NuxtLink></nav>
  </main>
</template>

<style scoped>
.about { display: grid; gap: clamp(2.5rem, 6vw, 5rem); max-width: 76rem; margin-inline: auto; }.about__section > h2, .about__section :deep(.app-panel__content) > h2, .about__support h2 { margin: 0 0 var(--app-space-4); font-size: clamp(1.5rem, 3vw, 2.25rem); }.about__section > ul:not(.about__boundaries) { display: grid; gap: var(--app-space-3); max-width: 68ch; padding-inline-start: 1.3rem; }.about__section li, .about__section p, .about__two-column p { color: var(--app-text-secondary); line-height: 1.8; }.about__experiences { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--app-space-4); }.about__experiences :deep(.app-panel__content) { display: grid; height: 100%; }.about__experiences h3 { margin: 0; }.about__experiences a { align-self: end; font-weight: 780; }.about__boundaries { display: flex; flex-wrap: wrap; gap: var(--app-space-2); padding: 0; list-style: none; }.about__boundaries li { padding: .35rem .65rem; border: 1px solid var(--app-border); border-radius: 999px; background: var(--app-surface-primary); font-weight: 700; }.about__two-column { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--app-space-4); }.about__two-column h2 { margin-top: 0; }.about__support { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--app-space-3) var(--app-space-6); padding-block: var(--app-space-5); border-block: 1px solid var(--app-border); }.about__support h2 { width: 100%; }.about__support a { font-weight: 780; }
@media (max-width: 47.99rem) { .about__experiences, .about__two-column { grid-template-columns: 1fr; } }
</style>
