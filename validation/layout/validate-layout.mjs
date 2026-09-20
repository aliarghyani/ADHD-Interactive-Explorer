import fs from 'node:fs/promises'
import path from 'node:path'
import Ajv2020 from 'ajv/dist/2020.js'
import { ELK_VERSION, LAYOUT_VERSION, OVERRIDE_SET_VERSION } from '../../scripts/layout/config.mjs'

export async function validateLayoutArtifact(artifact, source, { root = process.cwd() } = {}) {
  const errors = []
  const schema = JSON.parse(await fs.readFile(path.join(root, 'knowledge', 'schemas', 'layout-artifact.schema.json'), 'utf8'))
  const validateSchema = new Ajv2020({ allErrors: true }).compile(schema)
  if (!validateSchema(artifact)) errors.push(...(validateSchema.errors ?? []).map((error) => `schema ${error.instancePath || '/'} ${error.message}`))

  if (artifact.layoutVersion !== LAYOUT_VERSION) errors.push(`layoutVersion must be ${LAYOUT_VERSION}`)
  if (artifact.elkVersion !== ELK_VERSION) errors.push(`elkVersion must be ${ELK_VERSION}`)
  if (artifact.overrideSetVersion !== OVERRIDE_SET_VERSION) errors.push(`overrideSetVersion must be ${OVERRIDE_SET_VERSION}`)
  if (artifact.knowledgeReleaseId !== source.knowledgeReleaseId) errors.push(`knowledgeReleaseId must be ${source.knowledgeReleaseId}`)

  validateCoverage(artifact.nodeGeometry, source.nodes, 'node', errors)
  validateCoverage(artifact.edgeGeometry, source.edges, 'edge', errors)
  if (artifact.nodeGeometry?.length !== source.expectedNodeCount) errors.push(`Expected ${source.expectedNodeCount} node geometries`)
  if (artifact.edgeGeometry?.length !== source.expectedEdgeCount) errors.push(`Expected ${source.expectedEdgeCount} edge geometries`)

  const bounds = artifact.graphBounds
  for (const node of artifact.nodeGeometry ?? []) {
    if (![node.x, node.y, node.width, node.height].every(Number.isFinite)) errors.push(`Node ${node.id} contains a non-finite number`)
    if (!(node.width > 0) || !(node.height > 0)) errors.push(`Node ${node.id} dimensions must be positive`)
    if (bounds && (node.x < bounds.x || node.y < bounds.y || node.x + node.width > bounds.x + bounds.width || node.y + node.height > bounds.y + bounds.height)) errors.push(`Node ${node.id} is outside graphBounds`)
  }
  for (const edge of artifact.edgeGeometry ?? []) {
    for (const [name, point] of [['start', edge.start], ['end', edge.end], ...(edge.bendPoints ?? []).map((point, index) => [`bendPoints[${index}]`, point])]) {
      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) errors.push(`Edge ${edge.id} has an invalid ${name} point`)
    }
  }
  return errors
}

function validateCoverage(geometry = [], canonical = [], kind, errors) {
  const expected = new Set(canonical.map(({ id }) => id))
  const seen = new Set()
  for (const entry of geometry) {
    if (seen.has(entry.id)) errors.push(`Duplicate ${kind} geometry: ${entry.id}`)
    seen.add(entry.id)
    if (!expected.has(entry.id)) errors.push(`Unknown ${kind} geometry: ${entry.id}`)
  }
  for (const id of expected) if (!seen.has(id)) errors.push(`Missing ${kind} geometry: ${id}`)
}

