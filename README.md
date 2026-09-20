# ADHD Interactive Explorer — Validation Spike

This repository is a bounded Nuxt 4 architecture spike. It tests whether a small custom Vue DOM/SVG renderer can present the frozen educational graph without a runtime graph framework.

## Run it

```sh
corepack pnpm install
corepack pnpm layout:generate
corepack pnpm test
corepack pnpm typecheck
corepack pnpm dev
```

Open:

- `/en/spike/map`
- `/en/spike/map/BEH1`
- `/fa/spike/map/BEH1`
- `/en/spike/map/NOT-A-NODE`
- `/en/spike/map/BEH1?graph=fail` to exercise renderer failure isolation

`elkjs` is used only by `scripts/generate-spike-layout.mjs`. The generated, reviewed geometry is retained in `app/generated/spike-layout.json`; browser code does not import ELK.

See [VALIDATION_SPIKE_EVALUATION.md](./VALIDATION_SPIKE_EVALUATION.md) for the architecture decision and evidence.
