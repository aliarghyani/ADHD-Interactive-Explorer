# Production layout artifacts

`production-layout.v1.json` is the single language-independent geometry artifact for knowledge release `ADHD-KNOWLEDGE-2026-09-20-R1`. Generate it with `pnpm layout:generate`, validate it with `pnpm layout:validate`, and run its contract suite with `pnpm test:layout`.

The generator reads validated canonical nodes and edges from `knowledge/source/`, orders nodes by frozen visual layer then canonical ID, and orders edges by canonical edge ID. ELK.js `0.12.0` runs only in `scripts/layout/`; application/runtime code never imports it. English and Persian use the same coordinates: locale is absent from layout identity, geometry is not mirrored for RTL, and scientific source-to-target direction is unchanged.

Node envelopes are fixed per category and sized for the larger wrapped label form across both locales. Clinical Anchor is laid out as a separate, edge-free region above the explanatory network. The five canonical `FEEDBACK_WITH` edges use deterministic outer return lanes so they remain visually distinct without inventing relationships.

`layout-v1.0.0` is coupled to the knowledge release, ELK version, `elk-layered-v1` configuration, and `layout-overrides-v1` registry recorded in the artifact. Increment `layoutVersion` when any of those inputs changes in a geometry-affecting way or when reviewed geometry changes; ordinary UI releases do not change it.

Overrides are optional and live in `layout-overrides.v1.json`. Each future override must have an ID, node/edge target, compatible layout version, geometry, and review reason. Overrides cannot replace scientific source/target identity. The initial registry is intentionally empty.

`layout-review.v1.svg` is a generated human-review aid only. It is explicitly marked **LAYOUT REVIEW TOOL - NOT PRODUCTION UI** and is not a System Map renderer.

The old validation spike remains available as `pnpm layout:spike`; its 11-node fixture, geometry, styling, and route logic are not production inputs.
