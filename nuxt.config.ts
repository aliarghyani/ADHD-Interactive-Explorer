import { readFileSync } from 'node:fs'

const canonicalNodes = JSON.parse(
  readFileSync(new URL('./knowledge/source/graph/nodes.json', import.meta.url), 'utf8'),
) as { nodes: Array<{ id: string }> }
const systemMapRoutes = ['en', 'fa'].flatMap((locale) => [
  `/${locale}/map`,
  ...canonicalNodes.nodes.map((node) => `/${locale}/map/${node.id}`),
])
const behaviourEntries = JSON.parse(
  readFileSync(new URL('./knowledge/source/behaviours/behaviours.json', import.meta.url), 'utf8'),
) as { behaviours: Array<{ behaviourId: string }> }
const behaviourRoutes = ['en', 'fa'].flatMap((locale) => [
  `/${locale}/behaviours`,
  ...behaviourEntries.behaviours.map((entry) => `/${locale}/behaviours/${entry.behaviourId}`),
])
const contextEntries = JSON.parse(
  readFileSync(new URL('./knowledge/source/context/contexts.json', import.meta.url), 'utf8'),
) as { contextIds: string[] }
const contextRoutes = ['en', 'fa'].flatMap((locale) => [
  `/${locale}/context`,
  ...contextEntries.contextIds.map((contextId) => `/${locale}/context/${contextId}`),
])
const presentationEntries = JSON.parse(
  readFileSync(new URL('./knowledge/source/presentations/presentations.json', import.meta.url), 'utf8'),
) as { presentations: Array<{ id: string, status: string }> }
const presentationRoutes = ['en', 'fa'].flatMap((locale) => [
  `/${locale}/presentations`,
  ...presentationEntries.presentations
    .filter((entry) => entry.status === 'current-formal')
    .map((entry) => `/${locale}/presentations/${entry.id}`),
])
const evidenceEntries = JSON.parse(
  readFileSync(new URL('./knowledge/source/evidence/evidence.json', import.meta.url), 'utf8'),
) as { evidence: Array<{ id: string }> }
const evidenceRoutes = ['en', 'fa'].flatMap((locale) => [
  `/${locale}/evidence`,
  ...evidenceEntries.evidence.map((entry) => `/${locale}/evidence/${entry.id}`),
])

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n'],
  ui: {
    fonts: false,
    colorMode: false,
  },
  css: ['~/assets/main.css', '~/assets/system-map.css'],
  devtools: { enabled: false },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', language: 'en', dir: 'ltr', file: 'en.json' },
      { code: 'fa', name: 'فارسی', language: 'fa', dir: 'rtl', file: 'fa.json' },
    ],
    strategy: 'prefix',
  },
  nitro: {
    prerender: {
      routes: [
        '/en',
        '/fa',
        '/en/spike/map',
        '/en/spike/map/BEH1',
        '/en/spike/map/NOT-A-NODE',
        '/fa/spike/map',
        '/fa/spike/map/BEH1',
        ...systemMapRoutes,
        ...behaviourRoutes,
        ...contextRoutes,
        ...presentationRoutes,
        ...evidenceRoutes,
      ],
    },
  },
  routeRules: {
    '/': { redirect: '/en' },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
