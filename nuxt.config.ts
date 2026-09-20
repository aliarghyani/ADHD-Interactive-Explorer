export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  css: ['~/assets/main.css'],
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
