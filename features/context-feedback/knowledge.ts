import { KnowledgeRepository, type KnowledgeBundle } from '../../domain'
import behaviours from '../../knowledge/source/behaviours/behaviours.json'
import feedbackLoops from '../../knowledge/source/context/feedback-loops.json'
import contexts from '../../knowledge/source/context/contexts.json'
import mappings from '../../knowledge/source/context/mappings.json'
import evidence from '../../knowledge/source/evidence/evidence.json'
import functionalExamples from '../../knowledge/source/functional-domains/examples.json'
import edges from '../../knowledge/source/graph/edges.json'
import nodes from '../../knowledge/source/graph/nodes.json'
import en from '../../knowledge/source/localization/en.json'
import fa from '../../knowledge/source/localization/fa.json'
import manifest from '../../knowledge/source/manifest.json'
import rules from '../../knowledge/source/patterns/rules.json'
import safety from '../../knowledge/source/safety/safety.json'

/**
 * Context Explorer projection boundary. It excludes source detail,
 * presentations, alternatives, pathways, and every layout/renderer artifact.
 */
const contextKnowledge = {
  manifest,
  nodes,
  edges,
  behaviours,
  pathways: { pathways: [] },
  alternatives: { alternatives: [] },
  contexts,
  mappings,
  feedbackLoops,
  patterns: { patternIds: [] },
  rules,
  domains: { domainIds: [] },
  functionalExamples,
  presentations: { presentations: [] },
  evidence,
  sources: { sources: [] },
  safety,
  en,
  fa,
} as unknown as KnowledgeBundle

export const contextRepository = new KnowledgeRepository(contextKnowledge)
