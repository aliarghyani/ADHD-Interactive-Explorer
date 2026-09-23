<script setup lang="ts">
import type { MethodologyContent } from '../../../features/methodology/content'
import AppPageHeader from '../ui/AppPageHeader.vue'
import AppPanel from '../ui/AppPanel.vue'
import EvidenceBadge from '../ui/EvidenceBadge.vue'
import SafetyNotice from '../ui/SafetyNotice.vue'

defineProps<{ locale: 'en' | 'fa', content: MethodologyContent, globalDisclaimer: string, groupLevelCaution: string, knowledgeReleaseId: string, evidenceReviewVersion: string }>()
</script>

<template>
  <main class="methodology">
    <AppPageHeader :kicker="content.kicker" :title="content.title" :summary="content.summary" />

    <nav class="methodology__toc" :aria-label="content.navLabel">
      <a href="#structure">{{ content.sections.read.title }}</a>
      <a href="#relationships">{{ content.sections.relationships.title }}</a>
      <a href="#evidence">{{ content.sections.evidence.title }}</a>
      <a href="#boundaries">{{ content.sections.boundaries.title }}</a>
    </nav>

    <section id="structure" class="methodology__section" aria-labelledby="read-title">
      <h2 id="read-title">{{ content.sections.read.title }}</h2>
      <p v-for="paragraph in content.sections.read.paragraphs" :key="paragraph">{{ paragraph }}</p>
      <ul class="methodology__not-list">
        <li v-for="item in content.sections.read.notList" :key="item">{{ item }}</li>
      </ul>
    </section>

    <AppPanel as="section" tone="quiet" labelledby="anchor-title" class="methodology__section methodology__anchor">
      <h2 id="anchor-title">{{ content.sections.anchor.title }}</h2>
      <p v-for="paragraph in content.sections.anchor.paragraphs" :key="paragraph">{{ paragraph }}</p>
      <div class="methodology__anchor-terms" aria-label="Clinical Anchor">
        <BidiIsolation direction="ltr">Inattention</BidiIsolation>
        <span aria-hidden="true">+</span>
        <BidiIsolation direction="ltr">Hyperactivity–Impulsivity</BidiIsolation>
        <span aria-hidden="true">≠</span>
        <BidiIsolation direction="ltr">Regulation / Behaviour</BidiIsolation>
      </div>
    </AppPanel>

    <section class="methodology__section" aria-labelledby="layers-title">
      <h2 id="layers-title">{{ content.sections.layers.title }}</h2>
      <p>{{ content.sections.layers.introduction }}</p>
      <ol class="methodology__layers">
        <li v-for="(item, index) in content.sections.layers.items" :key="item.canonical">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <div><h3>{{ item.label }}</h3><BidiIsolation direction="ltr">{{ item.canonical }}</BidiIsolation><p>{{ item.description }}</p></div>
        </li>
      </ol>
      <p class="methodology__feedback"><BidiIsolation direction="ltr">Feedback</BidiIsolation> — {{ content.sections.layers.feedback }}</p>
      <p class="methodology__caution">
        <BidiIsolation direction="ltr">Context → Regulation → Observable Behaviour → Recurring Pattern → Functional Domain ↺ Feedback</BidiIsolation><br>
        {{ content.sections.layers.caution }}
      </p>
    </section>

    <section id="relationships" class="methodology__section" aria-labelledby="relationships-title">
      <h2 id="relationships-title">{{ content.sections.relationships.title }}</h2>
      <p>{{ content.sections.relationships.introduction }}</p>
      <div class="methodology__cards">
        <AppPanel v-for="item in content.sections.relationships.items" :key="item.id" as="article">
          <h3><BidiIsolation direction="ltr">{{ item.title }}</BidiIsolation></h3>
          <p>{{ item.description }}</p>
          <p class="methodology__boundary">{{ item.boundary }}</p>
        </AppPanel>
      </div>
    </section>

    <section class="methodology__section" aria-labelledby="uncertainty-title">
      <h2 id="uncertainty-title">{{ content.sections.uncertainty.title }}</h2>
      <p v-for="paragraph in content.sections.uncertainty.paragraphs" :key="paragraph">{{ paragraph }}</p>
      <dl class="methodology__definitions">
        <div v-for="item in content.sections.uncertainty.distinctions" :key="item.label"><dt>{{ item.label }}</dt><dd>{{ item.text }}</dd></div>
      </dl>
    </section>

    <section id="evidence" class="methodology__section" aria-labelledby="evidence-title">
      <h2 id="evidence-title">{{ content.sections.evidence.title }}</h2>
      <p>{{ content.sections.evidence.introduction }}</p>
      <div class="methodology__evidence-levels">
        <article v-for="item in content.sections.evidence.levels" :key="item.level">
          <EvidenceBadge :label="item.level" />
          <p>{{ item.description }}</p>
        </article>
      </div>
      <p>{{ content.sections.evidence.context }}</p>
      <p>{{ content.sections.evidence.limitations }}</p>
      <SafetyNotice :text="groupLevelCaution" kind="evidence" />
      <NuxtLink class="methodology__primary-link" :to="`/${locale}/evidence`" :prefetch="false">{{ content.sections.evidence.linkLabel }} <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span></NuxtLink>
    </section>

    <AppPanel as="section" tone="secondary" labelledby="individual-title" class="methodology__section">
      <h2 id="individual-title">{{ content.sections.individual.title }}</h2>
      <p v-for="paragraph in content.sections.individual.paragraphs" :key="paragraph">{{ paragraph }}</p>
    </AppPanel>

    <section id="boundaries" class="methodology__section" aria-labelledby="boundaries-title">
      <h2 id="boundaries-title">{{ content.sections.boundaries.title }}</h2>
      <p>{{ content.sections.boundaries.introduction }}</p>
      <SafetyNotice :text="globalDisclaimer" kind="global" />
      <ul class="methodology__boundaries"><li v-for="item in content.sections.boundaries.items" :key="item">{{ item }}</li></ul>
      <NuxtLink :to="`/${locale}/presentations`" :prefetch="false">{{ content.sections.boundaries.presentationLink }}</NuxtLink>
    </section>

    <AppPanel as="section" tone="quiet" labelledby="provenance-title" class="methodology__section methodology__provenance">
      <h2 id="provenance-title">{{ content.sections.provenance.title }}</h2>
      <p>{{ content.sections.provenance.description }}</p>
      <dl>
        <div><dt>{{ content.sections.provenance.releaseLabel }}</dt><dd><BidiIsolation direction="ltr" class="app-canonical-id">{{ knowledgeReleaseId }}</BidiIsolation></dd></div>
        <div><dt>{{ content.sections.provenance.reviewLabel }}</dt><dd><BidiIsolation direction="ltr" class="app-canonical-id">{{ evidenceReviewVersion }}</BidiIsolation></dd></div>
      </dl>
    </AppPanel>
  </main>
</template>

<style scoped>
.methodology { display: grid; gap: clamp(2.5rem, 6vw, 5rem); max-width: 76rem; margin-inline: auto; }
.methodology__toc { display: flex; flex-wrap: wrap; gap: var(--app-space-2) var(--app-space-5); padding-block: var(--app-space-4); border-block: 1px solid var(--app-border); }
.methodology__toc a, .methodology__primary-link { font-weight: 780; }
.methodology__section { scroll-margin-block-start: var(--app-space-5); }
.methodology__section > h2, .methodology__section :deep(.app-panel__content) > h2 { margin: 0 0 var(--app-space-4); font-size: clamp(1.55rem, 3vw, 2.3rem); line-height: 1.25; }
.methodology__section > p, .methodology__section :deep(.app-panel__content) > p { max-width: 68ch; color: var(--app-text-secondary); line-height: 1.85; }
.methodology__not-list, .methodology__boundaries { display: flex; flex-wrap: wrap; gap: var(--app-space-2); padding: 0; list-style: none; }
.methodology__not-list li, .methodology__boundaries li { padding: .35rem .65rem; border: 1px solid var(--app-border); border-radius: 999px; background: var(--app-surface-secondary); font-weight: 680; }
.methodology__anchor-terms { display: flex; flex-wrap: wrap; align-items: center; gap: var(--app-space-3); margin-block-start: var(--app-space-5); color: var(--app-accent-strong); font-weight: 800; }
.methodology__layers { display: grid; gap: var(--app-space-3); margin: var(--app-space-5) 0; padding: 0; list-style: none; }
.methodology__layers li { display: grid; grid-template-columns: 2.5rem minmax(0, 1fr); gap: var(--app-space-3); padding: var(--app-space-4); border-inline-start: .25rem solid var(--app-accent); background: var(--app-surface-primary); }
.methodology__layers li > span { color: var(--app-text-muted); font-family: var(--app-font-mono); }
.methodology__layers h3, .methodology__layers p { margin: 0; }.methodology__layers bdi { color: var(--app-text-muted); font-size: .78rem; }.methodology__layers p { margin-block-start: var(--app-space-2); color: var(--app-text-secondary); }
.methodology__feedback, .methodology__caution { padding: var(--app-space-4); border-radius: var(--app-radius-md); background: var(--app-accent-soft); }.methodology__caution { border: 1px solid var(--app-border-strong); background: transparent; font-weight: 700; }
.methodology__cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--app-space-4); margin-block-start: var(--app-space-5); }.methodology__cards :deep(.app-panel__content) { height: 100%; }.methodology__cards h3 { margin: 0; }.methodology__cards p { color: var(--app-text-secondary); }.methodology__boundary { padding-block-start: var(--app-space-3); border-block-start: 1px solid var(--app-border); font-weight: 700; }
.methodology__definitions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--app-space-3); max-width: 70rem; }.methodology__definitions div { padding: var(--app-space-4); border: 1px solid var(--app-border); border-radius: var(--app-radius-md); background: var(--app-surface-primary); }.methodology__definitions dt { font-weight: 800; }.methodology__definitions dd { margin: var(--app-space-2) 0 0; color: var(--app-text-secondary); }
.methodology__evidence-levels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--app-space-3); margin-block: var(--app-space-5); }.methodology__evidence-levels article { padding: var(--app-space-4); border: 1px solid var(--app-border); border-radius: var(--app-radius-md); background: var(--app-surface-primary); }.methodology__evidence-levels p { margin: var(--app-space-3) 0 0; color: var(--app-text-secondary); }.methodology__primary-link { display: inline-block; margin-block-start: var(--app-space-4); }
.methodology__provenance dl { display: flex; flex-wrap: wrap; gap: var(--app-space-4) var(--app-space-7); margin-block-end: 0; }.methodology__provenance dt { color: var(--app-text-muted); font-size: .78rem; font-weight: 800; }.methodology__provenance dd { margin: var(--app-space-1) 0 0; }
@media (max-width: 52rem) { .methodology__cards, .methodology__definitions, .methodology__evidence-levels { grid-template-columns: 1fr; } }
</style>
