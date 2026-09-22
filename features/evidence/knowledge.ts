import { KnowledgeRepository, type KnowledgeBundle } from '../../domain'
import evidence from '../../knowledge/source/evidence/evidence.json'
import sources from '../../knowledge/source/evidence/sources.json'
import en from '../../knowledge/source/localization/en.json'
import fa from '../../knowledge/source/localization/fa.json'
import manifest from '../../knowledge/source/manifest.json'
import safety from '../../knowledge/source/safety/safety.json'

/** Evidence-owned projection. It excludes graph, layout, and exploration feature data. */
const evidenceKnowledge = {
  manifest,
  nodes: { nodes: [] },
  edges: { edges: [] },
  behaviours: { behaviours: [] },
  pathways: { pathways: [] },
  alternatives: { alternatives: [] },
  contexts: { contextIds: [] },
  mappings: { mappings: [] },
  feedbackLoops: { feedbackLoops: [] },
  patterns: { patternIds: [] },
  rules: { rules: [] },
  domains: { domainIds: [] },
  functionalExamples: { functionalExamples: [] },
  presentations: { presentations: [] },
  evidence,
  sources,
  safety,
  en,
  fa,
} as unknown as KnowledgeBundle

export const evidenceRepository = new KnowledgeRepository(evidenceKnowledge)
