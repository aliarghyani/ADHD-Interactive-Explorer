import { KnowledgeRepository, type KnowledgeBundle } from '../../domain'
import alternatives from '../../knowledge/source/behaviours/alternatives.json'
import behaviours from '../../knowledge/source/behaviours/behaviours.json'
import pathways from '../../knowledge/source/behaviours/pathways.json'
import contexts from '../../knowledge/source/context/contexts.json'
import feedbackLoops from '../../knowledge/source/context/feedback-loops.json'
import mappings from '../../knowledge/source/context/mappings.json'
import evidence from '../../knowledge/source/evidence/evidence.json'
import sources from '../../knowledge/source/evidence/sources.json'
import domains from '../../knowledge/source/functional-domains/domains.json'
import functionalExamples from '../../knowledge/source/functional-domains/examples.json'
import edges from '../../knowledge/source/graph/edges.json'
import nodes from '../../knowledge/source/graph/nodes.json'
import en from '../../knowledge/source/localization/en.json'
import fa from '../../knowledge/source/localization/fa.json'
import manifest from '../../knowledge/source/manifest.json'
import patterns from '../../knowledge/source/patterns/patterns.json'
import rules from '../../knowledge/source/patterns/rules.json'
import presentations from '../../knowledge/source/presentations/presentations.json'
import safety from '../../knowledge/source/safety/safety.json'

/**
 * The production bundle is parsed once for the whole feature. Validation is a
 * build/CI responsibility; this boundary only adapts the validated JSON to the
 * immutable domain repository.
 */
const productionKnowledge = {
  manifest,
  nodes,
  edges,
  behaviours,
  pathways,
  alternatives,
  contexts,
  mappings,
  feedbackLoops,
  patterns,
  rules,
  domains,
  functionalExamples,
  presentations,
  evidence,
  sources,
  safety,
  en,
  fa,
} as unknown as KnowledgeBundle

export const systemMapRepository = new KnowledgeRepository(productionKnowledge)
