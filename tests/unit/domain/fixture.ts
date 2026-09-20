import { loadKnowledgeBundle, validateKnowledgeBundle } from '../../../validation/knowledge-validator.mjs'
import type { KnowledgeBundle } from '../../../domain'

const loaded = await loadKnowledgeBundle()
const validationErrors = await validateKnowledgeBundle(loaded)

if (validationErrors.length > 0) {
  throw new Error(`Production knowledge is invalid: ${JSON.stringify(validationErrors)}`)
}

export const productionKnowledge = loaded as KnowledgeBundle
