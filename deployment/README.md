# Static release contract

Run `pnpm release:verify` with Node `>=22.19.0 <23` and pnpm `9.12.1`. The gate installs from the frozen lockfile, validates canonical knowledge and layout, runs contract/domain/all unit tests, typecheck, lint, build, static generation, artifact validation, and the accepted functional and deployment Playwright suites against `.output/public` served as static files. The directory `.output/public` is the deployment artifact; `.output/server` is not needed at runtime. Keep the artifact and its `release-manifest.json` together.

`release-manifest.json` records the canonical knowledge release and schema versions, layout version, source fingerprints, route count, and a release ID derived from those inputs and the complete public artifact contents. The gate fails before delivery if the knowledge or layout validator fails, expected canonical routes are missing, the artifact lacks fingerprinted JS/CSS, or source/test files appear in public output. The host should serve the directory as static files, resolve `/path` to `/path/index.html`, serve `200.html` for unknown client routes with an HTTP 404 where supported, and redirect `/` to `/en`.

## Cache policy

`cache-policy.json` is the host-neutral contract, exercised by `pnpm release:serve` and Playwright. Configure the production host to match it:

- Route HTML, `200.html`, and `404.html`: `Cache-Control: public, max-age=0, must-revalidate`.
- Fingerprinted `_nuxt` JS/CSS only: `Cache-Control: public, max-age=31536000, immutable`.
- Non-hashed static files, including `favicon.svg`, `_i18n` files, and `release-manifest.json`: `Cache-Control: public, max-age=0, must-revalidate`.

Publish new hashed assets before switching the route HTML. Retain old hashed assets while older HTML may still reference them. The local server proves the policy implementation, but a real host must be configured and its response headers verified before production cutover. No provider is configured in this repository.

## Release and rollback

1. Keep the current artifact in an immutable directory named with its `releaseId`; record its location and the previous known-good release ID/location in the deployment record.
2. Run the gate and copy the new `.output/public` into a new immutable release directory. Verify its manifest and smoke the new directory before switching the host's active artifact pointer.
3. Switch the active pointer to the new artifact. Recheck `/en`, `/fa`, `/en/map/BEH1`, `/fa/map/BEH1`, `/en/evidence/EVID_GOAL_MANAGEMENT`, and `/fa/evidence/EVID_GOAL_MANAGEMENT` by fresh direct HTTP/browser navigation.
4. Roll back if a release fails the deployment gate, direct routes, asset loading, canonical identity, or critical functional smoke. Set the active artifact pointer to the recorded previous known-good directory. Keep both releases and their hashed assets available.
5. After rollback, repeat the six routes above, confirm the previous release manifest ID, and check the host's HTML and hashed-asset cache headers.

Locally, the pointer can be simulated by setting `RELEASE_ARTIFACT` to either versioned directory when launching `pnpm release:serve`; a real provider must supply the pointer/switch mechanism. A release ID here fingerprints key source/version files, not every output byte. Production storage, credentials, DNS, and provider header rules remain operational configuration.
