import { loadKnowledgeBundle, validateKnowledgeBundle } from '../../validation/knowledge-validator.mjs'
import { LAYER_ORDER, compareCanonicalId } from './config.mjs'

export async function loadCanonicalLayoutSource(root = process.cwd()) {
  const bundle = await loadKnowledgeBundle(root)
  const errors = await validateKnowledgeBundle(bundle, { root })
  if (errors.length > 0) throw new Error(`Canonical knowledge validation failed:\n${errors.join('\n')}`)

  const nodes = [...bundle.nodes.nodes].sort((left, right) => {
    const leftLayer = left.category === 'clinical-anchor' ? -1 : LAYER_ORDER[left.category]
    const rightLayer = right.category === 'clinical-anchor' ? -1 : LAYER_ORDER[right.category]
    return leftLayer - rightLayer || compareCanonicalId(left.id, right.id)
  })
  const edges = [...bundle.edges.edges].sort((left, right) => compareCanonicalId(left.id, right.id))

  return Object.freeze({
    knowledgeReleaseId: bundle.manifest.knowledgeReleaseId,
    expectedNodeCount: bundle.manifest.releaseExpectations.nodes,
    expectedEdgeCount: bundle.manifest.releaseExpectations.edges,
    nodes,
    edges,
  })
}

