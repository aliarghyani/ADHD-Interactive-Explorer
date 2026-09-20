# Domain query layer

`KnowledgeRepository` is the read-only educational query boundary over the already validated `knowledge/source/` release. It receives an in-memory `KnowledgeBundle`; filesystem loading and WP-02 validation remain ingestion concerns outside this package.

- Queries cover canonical nodes/edges, Behaviours, Context mappings and Feedback loops, Presentations, evidence/sources, safety copy, and EN/FA scientific localization.
- Unknown IDs and unsupported locales throw `DomainLookupError` with a stable code. No fuzzy matching or fabricated localization fallback is performed.
- Collection results preserve authoritative source-array order. Related-concept results separate `canonicalGraph` edges from `curatedContentMappings` so illustrative records are never presented as canonical relationships.
- Construction performs one defensive `structuredClone` and recursively freezes the canonical bundle. Queries return those frozen records and do not clone on every call.
- Presentation lookup is independent of Behaviour and Context state. The package contains no Vue, Nuxt, ELK, renderer, layout, route, persistence, user-profile, scoring, diagnostic, prediction, or assessment API.

The package is pure TypeScript. Production callers must validate input using the WP-02 contract before constructing the repository.
