import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadCanonicalLayoutSource } from '../../scripts/layout/source.mjs'
import { validateLayoutArtifact } from './validate-layout.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const artifact = JSON.parse(await fs.readFile(path.join(root, 'knowledge', 'layouts', 'production-layout.v1.json'), 'utf8'))
const source = await loadCanonicalLayoutSource(root)
const errors = await validateLayoutArtifact(artifact, source, { root })
if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Layout validation passed (${artifact.nodeGeometry.length} nodes, ${artifact.edgeGeometry.length} edges).`)
}

