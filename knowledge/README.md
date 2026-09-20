# Production knowledge contract

`knowledge/source/` is the authoritative runtime-independent production data for the current knowledge release. It is faithfully generated from `artifacts/ADHD_Interactive_Explorer_Production_Knowledge_Pack_v1.0.md` by `pnpm knowledge:ingest`. The Markdown pack is the approved upstream input; spike fixtures, spike edge IDs, and spike layouts are not inputs.

`knowledge/schemas/` contains reusable JSON Schema contracts. `knowledge/generated/` and `knowledge/layouts/` are reserved for future derived artifacts and are never authoritative. WP-02 does not generate a production layout.

Run `pnpm knowledge:validate` after any edit. The command validates schemas, frozen canonical invariants, release-specific registry counts, references, evidence/source provenance, EN/FA localization, mandatory safety copy, supported versions, presentation isolation, and prohibited assessment/profile fields. `pnpm test:contract` runs the positive release contract and all intentionally invalid fixtures.

Edit safely by changing the approved upstream pack, preserving stable IDs and scientific wording, then rerunning ingestion and validation. Never recycle an ID for another concept, infer a new relationship, auto-translate a missing string, invent a citation, weaken safety language, or add user assessment/profile state. Evidence IDs must resolve to `EvidenceMetadata`; every referenced source must resolve to `SourceReference`.

A future release should introduce an approved pack, retain unchanged stable IDs, update the supplied manifest versions and release expectations, regenerate `knowledge/source/`, and pass the full contract and CI suite. Scientific changes require upstream governance; this layer validates structure and provenance, not scientific truth.
