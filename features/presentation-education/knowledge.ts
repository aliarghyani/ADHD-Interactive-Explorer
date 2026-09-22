import { KnowledgeRepository, type KnowledgeBundle } from '../../domain'
import sources from '../../knowledge/source/evidence/sources.json'
import nodes from '../../knowledge/source/graph/nodes.json'
import en from '../../knowledge/source/localization/en.json'
import fa from '../../knowledge/source/localization/fa.json'
import manifest from '../../knowledge/source/manifest.json'
import presentations from '../../knowledge/source/presentations/presentations.json'
import safety from '../../knowledge/source/safety/safety.json'

/**
 * Presentation Education projection boundary. It intentionally excludes
 * Behaviour, Context, graph relationships, evidence records, and layout data.
 */
const presentationKnowledge = {
  manifest,
  nodes,
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
  presentations,
  evidence: { evidence: [] },
  sources,
  safety,
  en,
  fa,
} as unknown as KnowledgeBundle

export const presentationRepository = new KnowledgeRepository(presentationKnowledge)
