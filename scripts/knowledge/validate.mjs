import { loadKnowledgeBundle, validateKnowledgeBundle } from '../../validation/knowledge-validator.mjs'

const phaseIndex = process.argv.indexOf('--phase')
const phases = phaseIndex >= 0 ? [process.argv[phaseIndex + 1]] : undefined
const bundle = await loadKnowledgeBundle()
const errors = await validateKnowledgeBundle(bundle, { phases })
if (errors.length) {
  for (const error of errors) console.error(`[${error.phase}:${error.code}] ${error.message}`)
  process.exitCode = 1
} else {
  console.log(`Knowledge validation passed${phases ? ` (${phases.join(', ')})` : ''}.`)
}
