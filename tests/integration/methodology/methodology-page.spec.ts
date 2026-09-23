import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { methodologyContent } from '../../../features/methodology/content'
import { aboutContent } from '../../../features/about/content'
import { getSupportingKnowledge } from '../../../features/methodology/supporting-knowledge.server'

describe('WP-11.5 routes and architecture boundaries', () => {
  it('registers all EN/FA routes for prerender', () => {
    const config = readFileSync('nuxt.config.ts', 'utf8')
    expect(config).toContain('`/${locale}/methodology`')
    expect(config).toContain('`/${locale}/about`')
    expect(config).toContain('...supportingRoutes')
  })

  it.each(['en', 'fa'] as const)('uses centralized mandatory safety and current metadata for %s', (locale) => {
    const support = getSupportingKnowledge(locale)
    expect(support.globalDisclaimer).toBeTruthy()
    expect(support.groupLevelCaution).toBeTruthy()
    expect(support.knowledgeReleaseId).toMatch(/^ADHD-KNOWLEDGE-/)
    expect(support.evidenceReviewVersion).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('keeps supporting client surfaces free of graph, layout, ELK, feature state, and evidence corpus imports', () => {
    const sources = ['app/pages/[locale]/methodology.vue', 'app/pages/[locale]/about.vue', 'app/components/methodology/MethodologyExperience.vue', 'app/components/about/AboutExperience.vue', 'features/methodology/content.ts', 'features/about/content.ts'].map((path) => readFileSync(path, 'utf8')).join('\n')
    expect(sources).not.toMatch(/VisualGraph|LayoutArtifact|elkjs|production-layout|features\/behaviour-explorer|features\/context-feedback|features\/presentation-education|evidence\.json|sources\.json|Pinia/)
    expect(readFileSync('features/methodology/supporting-knowledge.server.ts', 'utf8')).toContain('new SafetyAccess')
  })

  it('activates Methodology and About globally with no dead supporting destination', () => {
    const home = readFileSync('features/home/home-content.ts', 'utf8')
    const shell = readFileSync('app/components/AppShell.vue', 'utf8')
    expect(home).toContain("href: `${prefix}/methodology`, available: true")
    expect(home).toContain("href: `${prefix}/about`, available: true")
    expect(shell).toContain('globalDisclaimer')
    expect(shell).toContain('app-shell__footer')
  })

  it('contains no forbidden runtime claims or internal work-package language', () => {
    const runtime = JSON.stringify({ methodologyContent, aboutContent })
    expect(runtime).not.toMatch(/clinically validated model|proven causal model|comprehensive model of ADHD|diagnostic framework|predicts ADHD|determines presentation|systematic review/i)
    expect(runtime).not.toMatch(/WP-\d+|Codex|Codebase Memory|implementation stage/i)
  })
})
