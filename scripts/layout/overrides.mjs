import fs from 'node:fs/promises'
import path from 'node:path'
import { LAYOUT_VERSION, OVERRIDE_SET_VERSION, compareCanonicalId } from './config.mjs'

export async function loadOverrides(root = process.cwd()) {
  const file = path.join(root, 'knowledge', 'layouts', 'layout-overrides.v1.json')
  return JSON.parse(await fs.readFile(file, 'utf8'))
}

export function applyOverrides(artifact, registry, source) {
  const errors = validateOverrideRegistry(registry, source)
  if (errors.length > 0) throw new Error(`Layout override validation failed:\n${errors.join('\n')}`)

  const byNode = new Map(registry.overrides.filter(({ targetType }) => targetType === 'node').map((entry) => [entry.targetId, entry]))
  const byEdge = new Map(registry.overrides.filter(({ targetType }) => targetType === 'edge').map((entry) => [entry.targetId, entry]))
  return {
    ...artifact,
    nodeGeometry: artifact.nodeGeometry.map((geometry) => byNode.has(geometry.id) ? { ...geometry, ...byNode.get(geometry.id).overrideGeometry } : geometry),
    edgeGeometry: artifact.edgeGeometry.map((geometry) => byEdge.has(geometry.id) ? { ...geometry, ...byEdge.get(geometry.id).overrideGeometry } : geometry),
  }
}

export function validateOverrideRegistry(registry, source) {
  const errors = []
  if (registry.overrideSetVersion !== OVERRIDE_SET_VERSION) errors.push(`overrideSetVersion must be ${OVERRIDE_SET_VERSION}`)
  if (registry.layoutVersion !== LAYOUT_VERSION) errors.push(`override layoutVersion must be ${LAYOUT_VERSION}`)
  if (!Array.isArray(registry.overrides)) return [...errors, 'overrides must be an array']

  const nodeIds = new Set(source.nodes.map(({ id }) => id))
  const edgeIds = new Set(source.edges.map(({ id }) => id))
  const ids = new Set()
  for (const entry of [...registry.overrides].sort((a, b) => compareCanonicalId(a.overrideId, b.overrideId))) {
    if (!entry.overrideId || ids.has(entry.overrideId)) errors.push(`Duplicate or missing overrideId: ${entry.overrideId ?? ''}`)
    ids.add(entry.overrideId)
    if (!['node', 'edge'].includes(entry.targetType)) errors.push(`Invalid targetType for ${entry.overrideId}`)
    const targets = entry.targetType === 'node' ? nodeIds : edgeIds
    if (!targets.has(entry.targetId)) errors.push(`Unknown ${entry.targetType} override target: ${entry.targetId}`)
    if (entry.layoutVersion !== LAYOUT_VERSION) errors.push(`Override ${entry.overrideId} has incompatible layoutVersion`)
    if (!entry.reason?.trim()) errors.push(`Override ${entry.overrideId} requires a reason`)
    if (!entry.overrideGeometry || typeof entry.overrideGeometry !== 'object' || Array.isArray(entry.overrideGeometry)) errors.push(`Override ${entry.overrideId} requires overrideGeometry`)
    if ('sourceId' in (entry.overrideGeometry ?? {}) || 'targetId' in (entry.overrideGeometry ?? {})) errors.push(`Override ${entry.overrideId} cannot replace edge identity`)
  }
  return errors
}

