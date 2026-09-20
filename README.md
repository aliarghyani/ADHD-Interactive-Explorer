# ADHD Interactive Explorer

The repository is at **Stage 11, WP-01: Project Foundation**. This work package establishes the Nuxt application shell and delivery toolchain only; production ADHD knowledge, graph architecture, product features, safety content, and visual grammar are intentionally not implemented yet.

## Runtime and package manager

- Node.js `22.19.0` (see `.node-version`)
- pnpm `9.12.1` (pinned by `packageManager`)
- Nuxt `4.5.2`
- Vue `3.5.43`
- TypeScript `5.9.3`

Enable Corepack before the first install if pnpm is not already available:

```sh
corepack enable
pnpm install --frozen-lockfile
```

## Commands

```sh
pnpm dev          # local development server
pnpm typecheck    # Nuxt/Vue TypeScript validation
pnpm lint         # ESLint flat-config validation
pnpm test         # Vitest unit and component tests
pnpm build        # production build
pnpm generate     # static prerender output
pnpm test:e2e     # Playwright Chromium smoke tests
```

Playwright requires its browser once per machine:

```sh
pnpm exec playwright install chromium
```

## Foundation routes

- `/en` — English, left-to-right shell
- `/fa` — Persian, right-to-left shell
- `/` — redirects to `/en`

The locale switch keeps routing explicit and changes the document `lang` and `dir` attributes. Generic shell strings are managed by the Nuxt i18n integration under `i18n/locales/`.

## Validation spike isolation

The completed architecture spike remains available under `/en/spike/map` and `/fa/spike/map` as experimental evidence. Its domain fixture, renderer, and styles are isolated from the WP-01 production shell. `elkjs@0.12.0` remains a dev-only dependency used solely by the spike's offline layout script; production browser code does not import it.

See [VALIDATION_SPIKE_EVALUATION.md](./VALIDATION_SPIKE_EVALUATION.md) for the frozen spike recommendation.

## Not implemented in WP-01

WP-01 does not include production knowledge schemas or fixtures, graph read models or selectors, graph rendering, state management, product layouts, System Map, feature pages, safety/editorial features, analytics, backend services, authentication, or persistence. Those belong to later bounded work packages.
