# Shared localization, RTL, and safety contract

Generic interface strings remain in `i18n/locales/` and use Nuxt i18n. Scientific and safety content never enters those files: `DomainLocalization` and `SafetyAccess` resolve the validated `knowledge/source/localization/` records through `KnowledgeRepository`. Supported locales are `en` and `fa`; a missing record fails explicitly and is never auto-translated.

Canonical/content IDs are language-independent. Locale switching replaces only the leading `/en` or `/fa` segment, preserving the remaining path, query, fragment, and canonical entity ID. The application root owns document `lang`/`dir`: English is `en/ltr`, Persian is `fa/rtl`, on direct navigation, hydration, and client switches.

RTL uses normal document inheritance and logical layout. Scientific `LayoutArtifact` coordinates, edge routes, layer order, and source-to-target semantics are shared by both locales and must not be mirrored.

Mixed-direction values use semantic `<bdi>` isolation through `BidiIsolation`. Natural-language titles/authors use `dir="auto"`; canonical English terms, acronyms, IDs, DOI values, URLs, and publication identifiers use `dir="ltr"`. Citations stay as separate authors, title, publication, year, DOI, and URL fields rather than one concatenated bilingual string.

`SafetyAccess` maps semantic purposes to the eight authoritative mandatory records. It returns the canonical safety record beside its localized content and rejects non-mandatory or mismatched records. Features may choose presentation later, but may not invent wording, silently fall back, or redefine mandatory medical meaning.

Persistence is policy-only in WP-05: no browser storage adapter is created because no current experience consumes a stored preference. The sole reserved key is `preferredLocale`; explicit locale-prefixed routes remain authoritative. Behaviour/symptom history, profiles, inferred presentation, diagnostic/medical state, evidence-view history, safety suppression, and entire feature/store state are prohibited. Pinia is intentionally absent.
