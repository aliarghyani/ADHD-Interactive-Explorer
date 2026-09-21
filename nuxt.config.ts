import { readFileSync } from 'node:fs'

const canonicalNodes = JSON.parse(
  readFileSync(new URL('./knowledge/source/graph/nodes.json', import.meta.url), 'utf8'),
) as { nodes: Array<{ id: string }> }
const systemMapRoutes = ['en', 'fa'].flatMap((locale) => [
  `/${locale}/map`,
  ...canonicalNodes.nodes.map((node) => `/${locale}/map/${node.id}`),
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
