export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/main.css'],
  devtools: { enabled: false },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  nitro: {
    prerender: {
      routes: [
        '/en/spike/map',
        '/en/spike/map/BEH1',
        '/en/spike/map/NOT-A-NODE',
        '/fa/spike/map',
        '/fa/spike/map/BEH1',
      ],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
