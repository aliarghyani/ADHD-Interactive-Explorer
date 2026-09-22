import { KnowledgeRepository, type KnowledgeBundle } from '../../domain'
import alternatives from '../../knowledge/source/behaviours/alternatives.json'
import behaviours from '../../knowledge/source/behaviours/behaviours.json'
import pathways from '../../knowledge/source/behaviours/pathways.json'
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
 * Behaviour Explorer projection boundary. It intentionally excludes source
 * details, presentations, feedback loops, and layout data that WP-08 does not use.
 */
const behaviourKnowledge = {
  manifest,
  nodes,
  edges,
  behaviours,
  pathways,
  alternatives,
  contexts: { contextIds: [] },
  mappings,
  feedbackLoops: { feedbackLoops: [] },
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

export const behaviourRepository = new KnowledgeRepository(behaviourKnowledge)
