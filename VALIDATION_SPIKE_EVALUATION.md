# Validation Spike Evaluation

## 1. What Was Implemented

The spike implements the specified 11-node, 7-edge fixture in a Nuxt 4 static-first route. The knowledge fixture feeds shared domain selectors and a library-neutral `GraphReadModel`. A separate authoring script uses `elkjs@0.12.0` to create a retained `LayoutArtifact`. The client renderer overlays ordinary HTML buttons on declarative SVG polylines and owns only visual focus and fitting; route state owns `selectedNodeId`.

The page provides English and Persian content, RTL application chrome with unchanged graph geometry, a detached Clinical Anchor region, direct-neighbour highlighting, geometry-based keyboard navigation, a server-rendered Semantic Relationship Browser, deep-link restoration, an invalid-ID state, and an intentional renderer-failure route.

## 2. Architecture / File Summary

- `app/domain/spike-fixture.json`: canonical IDs, labels, endpoints, and spike relationship-type assignments.
- `app/domain/selectors.ts`: upstream, downstream, Feedback, neighbour, and highlighted-edge selectors.
- `app/domain/graph-read-model.ts`: domain-to-renderer projection with no geometry or ELK structures.
- `app/domain/layout.ts`: technology-neutral artifact binding and exact coverage validation.
- `scripts/generate-spike-layout.mjs`: deterministic ELK input, detached anchor layout, artifact conversion, and the explicit Feedback route override.
- `app/generated/spike-layout.json`: reviewed 908 × 1298 graph geometry with 11 node and 7 edge records.
- `app/pages/[locale]/spike/map/[[nodeId]].vue`: route validation, external selection, locale state, SSR semantic content, and client error boundary.
- `app/components/VisualGraph.client.vue`: disposable client-only HTML/SVG renderer, responsive fit/reset, and roving focus.
- `app/components/SemanticRelationshipBrowser.vue`: renderer-independent relationship navigation using shared selectors.
- `tests/`: domain, artifact, synchronization, deep-link, locale, failure, and keyboard architecture tests.
- `artifacts/visual-regression/`: six required browser captures plus one diagnostic capture.

State direction remains:

```text
fixture → selectors → GraphReadModel → renderer
fixture → ELK authoring script → LayoutArtifact → renderer
route selectedNodeId → GraphReadModel + Semantic Browser
```

## 3. Dependencies Added

Runtime baseline:

- `nuxt` 4.5.2
- `vue` 3.5.43

Authoring/test-only:

- `elkjs` 0.12.0 exactly
- TypeScript and `vue-tsc`
- Vitest, Vue Test Utils, Happy DOM, and the Vue Vite plugin

No runtime graph dependency, state library, layout worker, backend, or persistence dependency was added. The production client output contains no `elkjs`/`ELK` signature.

## 4. Test Results

- `pnpm test`: 4 files, 13 tests, all passed.
- `pnpm typecheck`: passed with strict Nuxt type checking.
- `pnpm generate`: passed; 13 routes prerendered, including English/Persian default and `BEH1` routes plus the invalid-ID fixture route.
- Artifact validation covers positive metadata/coverage and negative missing, duplicate, unknown, and invalid-coordinate cases.
- Browser console after a cold reload: zero warnings, errors, or exceptions.
- Prerendered `/en/spike/map/BEH1` contains the heading, safety statement, selected summary, and Semantic Browser while containing only a graph-loading placeholder before client enhancement.

## 5. Persian / RTL Result

PASS. The Persian route renders `dir="rtl"`, real supplied Persian labels, and an isolated Latin `ADHD` token. The renderer keeps `dir="ltr"` for graph-space geometry while each Persian node uses RTL text flow. English and Persian use the same artifact and canonical selected ID. The captured Persian state shows all labels fitting the shared 220 × 96 envelope without a locale-specific coordinate or route.

## 6. Keyboard Result

PASS. Focus and selection are separate. A roving tab stop enters the graph; Left/Right follows x-order within a layer, Up/Down selects the nearest node in the adjacent visual layer, Enter and Space select, and Escape returns focus to the graph container. The algorithm is a 36-line geometry utility and does not branch on locale or traverse scientific relationships.

## 7. Nuxt / Hydration Result

PASS. Semantic content and the selected `BEH1` summary are present in generated HTML. Only `VisualGraph.client.vue` mounts on the client. A cold hydrated browser reload produced one graph instance, matching visual and semantic `BEH1` selection, and no console or hydration warnings. `elkjs` is absent from client chunks.

## 8. Graph Failure Result

PASS. `/en/spike/map/BEH1?graph=fail` intentionally throws inside the client renderer. `NuxtErrorBoundary` contains the error and displays a modest unavailable message. The heading, safety text, selected summary, upstream/downstream links, and Semantic Browser remain visible and usable.

## 9. Complexity Measurements

| Measurement | Observed result |
| --- | --- |
| Approximate renderer LOC | 204 total lines / 185 nonblank across `VisualGraph.client.vue` and `GraphNode.vue`; most are Vue template markup |
| Geometry utilities | Three small purposes: artifact translation/generation, polyline serialization, and bounds/coverage validation |
| Custom composables | None |
| Viewport utilities | Two local functions (`fit`, `updateScale`) plus one `ResizeObserver`; no pan/zoom state |
| Graph abstractions | No generic graph object/controller; one task-specific `NavigableNode` type beyond `GraphReadModel` and `LayoutArtifact` |
| External graph dependencies | Zero at runtime; `elkjs@0.12.0` authoring-only |
| Graph client chunk | Conservative route/graph chunk: 20.42 kB raw, 7.63 kB gzip |
| Accessibility code | Native buttons, accessible names/pressed state, roving tab index, visible focus, and one key handler; no patch framework |
| Keyboard complexity | Two pure functions in 36 lines plus the component event handler |

The renderer stayed declarative. The only defect found during browser validation was a stale-width responsive fit; using the `ResizeObserver` content rectangle fixed it without introducing viewport state machinery. Persian required no geometry exception. Scaling to 30 nodes would increase artifact review, edge occlusion, and keyboard candidate density, but it does not currently imply topology mutation or a generic controller.

## 10. Problems Encountered

- The empty project did not contain the frozen edge-to-relationship-type mapping. A provisional spike-only assignment was necessary to exercise all three required visual grammars.
- ELK's Feedback route was not educationally legible enough as part of the cyclic layered input, so E07 uses the specification-permitted explicit route override in the layout generator.
- The first tablet browser capture exposed stale responsive scale. The fix remained local to two viewport helpers and one observer.
- The Computer Use browser connection failed its request-header policy. Existing local Chrome headless and DevTools Protocol were used instead, without adding a project dependency.
- Nuxt static generation initially treated the missing root route as an error; a spike-only root redirect resolved it.

**KNOWLEDGE CHANGE REQUEST:** confirm the authoritative relationship-type mapping for E01–E06. The spike uses E01/E05 as `MODULATES`, E02/E03/E04/E06 as `CONTRIBUTES_TO`, and E07 as `FEEDBACK_WITH` only to validate the renderer. No endpoint or canonical ID was changed, and this provisional assignment must not be promoted as scientific knowledge without confirmation.

No Product Architecture Change Request was required.

## 11. 15-Gate PASS / FAIL Table

| Gate | Result | Concrete evidence |
| --- | --- | --- |
| 1. Layered layout | PASS | Fixed top-to-bottom Context, Regulation, Behaviour, Pattern, and Functional Domain y-levels are visible in all captures. |
| 2. Clinical Anchor separation | PASS | Detached bordered region, heading, 106-unit separation, and zero mechanistic anchor edges. |
| 3. Ordinary Vue nodes | PASS | `GraphNode.vue` renders native HTML buttons with ordinary CSS positioning. |
| 4. Feedback readability | PASS | E07 is a distinct dotted two-ended return path outside the primary flow and highlights without losing its pattern. |
| 5. External selection | PASS | Route-derived `selectedNodeId` exists before client mount; the renderer only emits selection intents. |
| 6. Domain ownership | PASS | Shared selectors compute neighbours and edge IDs; the renderer consumes booleans and IDs without relationship traversal. |
| 7. Semantic synchronization | PASS | Component test changes graph → browser and browser → graph through one external ref with no timer or duplicate store. |
| 8. Persian stability | PASS | Real Persian labels fit the same geometry in `04-fa-behaviour-rtl.png`; canonical `BEH1` is preserved. |
| 9. RTL safety | PASS | Page chrome is RTL while graph coordinates, arrows, layer order, and keyboard geometry remain LTR graph-space values. |
| 10. Responsive behaviour | PASS | 1440, 1024, and 768 captures fit immutable geometry; measured tablet scale is 0.709 with no body overflow or ELK execution. |
| 11. Deep-link restoration | PASS | Prerendered EN/FA `BEH1` routes and tests converge route, model, semantic browser, and client renderer on `BEH1`. |
| 12. Keyboard access | PASS | Roving focus, four arrow keys, visible focus, Enter, Space, and focus/selection separation are tested. |
| 13. Nuxt boundary | PASS | Generated HTML contains semantic content and only a client graph placeholder; cold hydration is warning-free. |
| 14. Failure resilience | PASS | Intentional renderer exception leaves semantic navigation and educational shell operational in the failure capture. |
| 15. Proportional renderer | PASS | No event bus, graph controller, runtime layout, pan/zoom framework, mutation service, or renderer-owned science was introduced. |

## 12. Architecture Recommendation

The implementation remained product-specific and understandable. Fixed geometry, native HTML controls, SVG polylines, a single external selection, and a one-variable viewport fit were enough to satisfy the spike. The browser-discovered responsive defect was fixed locally and did not expand into a framework. The custom renderer therefore meets the architecture hypothesis; the provisional scientific type mapping remains a separate knowledge-contract follow-up and does not weaken the renderer result.

GO — retain Custom Vue DOM/SVG renderer
