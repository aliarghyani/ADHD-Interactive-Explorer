import { describe, expect, it } from 'vitest'
import { DomainLookupError, KnowledgeRepository, type KnowledgeBundle } from '../../../domain'
import { productionKnowledge } from './fixture'

const repository = new KnowledgeRepository(productionKnowledge)

function expectLookupError(action: () => unknown, code: DomainLookupError['code']) {
  expect(action).toThrowError(DomainLookupError)
  try {
    action()
  } catch (error) {
    expect(error).toMatchObject({ code })
  }
}

describe('KnowledgeRepository construction and lookup', () => {
  it('loads the validated production release and exposes canonical records', () => {
    expect(repository.manifest.knowledgeReleaseId).toBe(productionKnowledge.manifest.knowledgeReleaseId)
    expect(repository.nodes).toHaveLength(30)
    expect(repository.edges).toHaveLength(49)
    expect(repository.getNode('BEH1')).toMatchObject({ id: 'BEH1', category: 'behaviour' })
    expect(repository.getEdge('EDGE_REG3_BEH1_CONTRIBUTES_TO')).toMatchObject({
      sourceId: 'REG3', targetId: 'BEH1', relationshipType: 'CONTRIBUTES_TO',
    })
  })

  it('uses stable typed errors and never fuzzy-resolves IDs', () => {
    expectLookupError(() => repository.getNode('beh1'), 'UNKNOWN_NODE')
    expectLookupError(() => repository.getEdge('REG3_BEH1'), 'UNKNOWN_EDGE')
    expectLookupError(() => repository.getBehaviour('BES_BEH1_01'), 'UNKNOWN_BEHAVIOUR')
    expectLookupError(() => repository.getContext('BEH1'), 'UNKNOWN_CONTEXT')
    expectLookupError(() => repository.getPresentation('PRESENTATION_UNKNOWN'), 'UNKNOWN_PRESENTATION')
    expectLookupError(() => repository.getEvidence('EVID_UNKNOWN'), 'UNKNOWN_EVIDENCE')
    expectLookupError(() => repository.getSource('SRC_UNKNOWN'), 'UNKNOWN_SOURCE')
    expectLookupError(() => repository.getSafetyCopy('SAFETY_UNKNOWN'), 'UNKNOWN_SAFETY')
  })
})

describe('canonical relationship queries', () => {
  it('returns incoming and outgoing edges in authoritative source order', () => {
    expect(repository.getIncomingRelationships('BEH1').map((edge) => edge.id)).toEqual(
      productionKnowledge.edges.edges.filter((edge) => edge.targetId === 'BEH1').map((edge) => edge.id),
    )
    expect(repository.getOutgoingRelationships('BEH1').map((edge) => edge.id)).toEqual(
      productionKnowledge.edges.edges.filter((edge) => edge.sourceId === 'BEH1').map((edge) => edge.id),
    )
  })

  it('returns incident feedback and unique deterministic neighbours only', () => {
    expect(repository.getFeedbackRelationships('CTX2')).toHaveLength(4)
    const neighbours = repository.getNeighbours('CTX2')
    expect(neighbours.map((node) => node.id)).toEqual(['REG1', 'REG2', 'REG6', 'FUN1', 'FUN2', 'FUN3', 'FUN4'])
    expect(new Set(neighbours.map((node) => node.id)).size).toBe(neighbours.length)
  })

  it('preserves Clinical Anchor separation from mechanistic edges', () => {
    for (const anchor of ['CA1', 'CA2']) {
      expect(repository.getOutgoingRelationships(anchor)).not.toContainEqual(
        expect.objectContaining({ relationshipType: expect.stringMatching(/MODULATES|CONTRIBUTES_TO/) }),
      )
    }
  })

  it('keeps canonical edges separate from curated mappings', () => {
    const contexts = repository.getRelatedContexts('BEH1')
    expect(contexts.canonicalGraph).toEqual([])
    expect(contexts.curatedContentMappings.map((node) => node.id)).toEqual(['CTX2', 'CTX3', 'CTX4', 'CTX5', 'CTX6', 'CTX7'])
    const domains = repository.getRelatedFunctionalDomains('BEH1')
    expect(domains.canonicalGraph).toEqual([])
    expect(domains.curatedContentMappings.map((node) => node.id)).toEqual(['FUN1', 'FUN2', 'FUN3', 'FUN4'])
    const patterns = repository.getRelatedPatterns('BEH1')
    expect(patterns.canonicalGraph.map((node) => node.id)).toEqual(['PAT1'])
    expect(patterns.curatedContentMappings.map((node) => node.id)).toEqual(['PAT1'])
  })
})

describe('Behaviour educational queries', () => {
  it('resolves all seven Behaviours with their unranked pathways and alternatives', () => {
    for (let index = 1; index <= 7; index += 1) {
      const behaviourId = `BEH${index}`
      expect(repository.getBehaviour(behaviourId).behaviourId).toBe(behaviourId)
      expect(repository.getBehaviourPathways(behaviourId)).not.toHaveLength(0)
      expect(repository.getBehaviourPathways(behaviourId).every((pathway) => pathway.behaviourId === behaviourId)).toBe(true)
      expect(repository.getAlternativeExplanations(behaviourId).every((item) => item.relevantBehaviourIds.includes(behaviourId as `BEH${number}`))).toBe(true)
      expect(repository.getFunctionalExamples(behaviourId)).toHaveLength(4)
    }
    expect('rankBehaviourPathways' in repository).toBe(false)
    expect('scoreBehaviours' in repository).toBe(false)
  })

  it('exposes related Pattern rules without executing them as prediction logic', () => {
    expect(repository.getPatternRules('BEH1').map((rule) => rule.id)).toEqual(['RULE_PAT1_PROCRASTINATION'])
    expect(repository.getPatternRules('BEH3')).toEqual([])
  })
})

describe('Context, feedback, and Presentation queries', () => {
  it('resolves Context mappings and optional Feedback-loop filtering', () => {
    expect(repository.getContext('CTX6').category).toBe('context')
    expect(repository.getContextMappings('CTX6').every((mapping) => mapping.contextId === 'CTX6')).toBe(true)
    expect(repository.getFeedbackLoops()).toHaveLength(2)
    expect(repository.getFeedbackLoops('CTX4').map((loop) => loop.id)).toEqual(['LOOP_PROCRASTINATION_URGENCY'])
    expect(repository.getFeedbackLoops('CTX1')).toEqual([])
  })

  it('resolves all four Presentation records without Behaviour state', () => {
    expect(repository.presentations).toHaveLength(4)
    for (const presentation of repository.presentations) {
      expect(repository.getPresentation(presentation.id)).toBe(presentation)
      expect(presentation).not.toHaveProperty('behaviourIds')
      expect(presentation).not.toHaveProperty('selectedBehaviourIds')
    }
    expect('getPresentationForBehaviour' in repository).toBe(false)
    expect('inferPresentation' in repository).toBe(false)
  })
})

describe('evidence, sources, safety, and localization', () => {
  it('resolves explicitly linked relationship evidence and sources', () => {
    const evidence = repository.getEvidenceForRelationship('EDGE_CTX1_REG1_MODULATES')
    expect(evidence.map((item) => item.id)).toEqual(['EVID_SLEEP_CONTEXT', 'EVID_ATTENTION_REGULATION'])
    expect(repository.getSourcesForEvidence(evidence[0]!.id)).not.toHaveLength(0)
    expect(repository.getEvidenceForNode('CA1').map((item) => item.id)).toEqual(['EVID_CLINICAL_ANCHORS'])
    expect(repository.getSourcesForPresentation('PRESENTATION_INATTENTIVE')).not.toHaveLength(0)
  })

  it('retrieves all mandatory safety records and exact semantic-purpose lookups', () => {
    const mandatoryIds = [
      'SAFETY_GLOBAL_EDUCATIONAL_DISCLAIMER', 'SAFETY_GRAPH_DISCLAIMER', 'SAFETY_BEHAVIOUR_EXPLORER',
      'SAFETY_ALTERNATIVE_EXPLANATION', 'SAFETY_RECURRING_PATTERN', 'SAFETY_FUNCTIONAL_IMPACT',
      'SAFETY_PRESENTATION_CAUTION', 'SAFETY_GROUP_LEVEL_EVIDENCE',
    ]
    for (const id of mandatoryIds) expect(repository.getSafetyCopy(id).displayRequirement).toBe('`mandatory`')
    const global = repository.getSafetyCopy('SAFETY_GLOBAL_EDUCATIONAL_DISCLAIMER')
    expect(repository.getSafetyCopyByContext(global.context)).toBe(global)
  })

  it('localizes EN and FA while retaining language-independent canonical identity', () => {
    const english = repository.getLocalizedNode('CA1', 'en')
    const persian = repository.getLocalizedNode('CA1', 'fa')
    expect(english.node).toBe(persian.node)
    expect(english.targetId).toBe('CA1')
    expect(persian.targetId).toBe('CA1')
    expect(english.fields.label).not.toBe(persian.fields.label)
    expect(repository.getLocalizedContent('PATH_BEH1_COMPLEXITY_GOAL', 'en').fields.explanation).toBeTruthy()
    expectLookupError(() => repository.getLocalizedNode('CA1', 'de'), 'UNSUPPORTED_LOCALE')
    expectLookupError(() => repository.getLocalizedContent('UNKNOWN_CONTENT', 'en'), 'MISSING_LOCALIZATION')
  })
})

describe('immutability', () => {
  it('defensively clones input and freezes records once at construction', () => {
    const mutableInput = structuredClone(productionKnowledge) as KnowledgeBundle
    const isolated = new KnowledgeRepository(mutableInput)
    ;(mutableInput.nodes.nodes[0] as { canonicalName: string }).canonicalName = 'changed outside'
    expect(isolated.getNode('CA1').canonicalName).not.toBe('changed outside')
    expect(Object.isFrozen(isolated.getNode('CA1'))).toBe(true)
    expect(Object.isFrozen(isolated.getNode('CA1').evidenceIds)).toBe(true)
    expect(() => {
      ;(isolated.getNode('CA1') as { canonicalName: string }).canonicalName = 'changed by consumer'
    }).toThrow(TypeError)
    expect(isolated.getNode('CA1').canonicalName).toBe(productionKnowledge.nodes.nodes[0]!.canonicalName)
  })
})
