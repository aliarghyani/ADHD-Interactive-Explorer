import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '~': fileURLToPath(new URL('./app', import.meta.url)) },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.spec.{ts,mjs}'],
    exclude: ['tests/e2e/**'],
    // The repository's contract fixtures are intentionally large. A single
    // worker avoids duplicate knowledge bundles exhausting constrained CI/dev hosts.
    minWorkers: 1,
    maxWorkers: 1,
  },
})
