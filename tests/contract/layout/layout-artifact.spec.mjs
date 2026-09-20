import fs from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { generateLayoutArtifact } from '../../../scripts/layout/generate.mjs'
import { loadCanonicalLayoutSource } from '../../../scripts/layout/source.mjs'
import { validateLayoutArtifact } from '../../../validation/layout/validate-layout.mjs'

const root = process.cwd()
const artifactFile = path.join(root, 'knowledge', 'layouts', 'production-layout.v1.json')

async function fixture() {
  const artifact = JSON.parse(await fs.readFile(artifactFile, 'utf8'))
  const source = await loadCanonicalLayoutSource(root)
  return { artifact, source }
}

describe('production LayoutArtifact contract', () => {
  it('covers all canonical nodes and edges and validates cleanly', async () => {
    const { artifact, source } = await fixture()
    expect(artifact.nodeGeometry).toHaveLength(30)
    expect(artifact.edgeGeometry).toHaveLength(49)
    expect(await validateLayoutArtifact(artifact, source, { root })).toEqual([])
  })

  it.each([
    ['unknown node', (artifact) => artifact.nodeGeometry.push({ id: 'UNKNOWN', x: 0, y: 0, width: 1, height: 1 }), 'Unknown node geometry'],
    ['unknown edge', (artifact) => artifact.edgeGeometry.push({ id: 'UNKNOWN', start: { x: 0, y: 0 }, bendPoints: [], end: { x: 1, y: 1 } }), 'Unknown edge geometry'],
    ['duplicate node', (artifact) => artifact.nodeGeometry.push({ ...artifact.nodeGeometry[0] }), 'Duplicate node geometry'],
    ['duplicate edge', (artifact) => artifact.edgeGeometry.push(structuredClone(artifact.edgeGeometry[0])), 'Duplicate edge geometry'],
  ])('rejects %s geometry', async (_name, mutate, message) => {
    const { artifact, source } = await fixture()
    mutate(artifact)
    expect((await validateLayoutArtifact(artifact, source, { root })).join('\n')).toContain(message)
  })

  it('rejects invalid bounds, dimensions, coordinates, points, and versions', async () => {
    const { artifact, source } = await fixture()
    artifact.nodeGeometry[0].x = artifact.graphBounds.width + 1
    artifact.nodeGeometry[1].width = 0
    artifact.nodeGeometry[2].y = Number.NaN
    artifact.edgeGeometry[0].start.x = Number.POSITIVE_INFINITY
    artifact.layoutVersion = 'wrong'
    artifact.knowledgeReleaseId = 'wrong'
    const errors = (await validateLayoutArtifact(artifact, source, { root })).join('\n')
    expect(errors).toContain('outside graphBounds')
    expect(errors).toContain('dimensions must be positive')
    expect(errors).toContain('non-finite')
    expect(errors).toContain('invalid start point')
    expect(errors).toContain('layoutVersion')
    expect(errors).toContain('knowledgeReleaseId')
  })

  it('generates deterministic byte-equivalent geometry', async () => {
    const first = (await generateLayoutArtifact({ root })).artifact
    const second = (await generateLayoutArtifact({ root })).artifact
    expect(JSON.stringify(first)).toBe(JSON.stringify(second))
    expect(`${JSON.stringify(first, null, 2)}\n`).toBe(await fs.readFile(artifactFile, 'utf8'))
  })

  it('uses one locale-free artifact and preserves canonical edge direction', async () => {
    const { artifact, source } = await fixture()
    expect(JSON.stringify(artifact)).not.toMatch(/\b(en|fa|locale|rtl)\b/i)
    const nodeById = new Map(artifact.nodeGeometry.map((node) => [node.id, node]))
    const edgeById = new Map(artifact.edgeGeometry.map((edge) => [edge.id, edge]))
    for (const edge of source.edges) {
      const route = edgeById.get(edge.id)
      expect(pointIsOnBoundary(route.start, nodeById.get(edge.sourceId))).toBe(true)
      expect(pointIsOnBoundary(route.end, nodeById.get(edge.targetId))).toBe(true)
    }
  })

  it('has no overlapping node envelopes', async () => {
    const { artifact } = await fixture()
    for (const [index, left] of artifact.nodeGeometry.entries()) {
      for (const right of artifact.nodeGeometry.slice(index + 1)) {
        expect(rectanglesOverlap(left, right), `${left.id} overlaps ${right.id}`).toBe(false)
      }
    }
  })

  it('keeps Clinical Anchor detached and routes every feedback edge through a return lane', async () => {
    const { artifact, source } = await fixture()
    const nodeById = new Map(artifact.nodeGeometry.map((node) => [node.id, node]))
    const anchors = ['CA1', 'CA2'].map((id) => nodeById.get(id))
    const contexts = source.nodes.filter(({ category }) => category === 'context').map(({ id }) => nodeById.get(id))
    expect(Math.max(...anchors.map((node) => node.y + node.height))).toBeLessThan(Math.min(...contexts.map((node) => node.y)))
    expect(source.edges.filter(({ sourceId }) => sourceId === 'CA1' || sourceId === 'CA2')).toEqual([])
    for (const edge of source.edges.filter(({ relationshipType }) => relationshipType === 'FEEDBACK_WITH')) {
      expect(artifact.edgeGeometry.find(({ id }) => id === edge.id).bendPoints.length).toBeGreaterThanOrEqual(3)
    }
  })
})

function pointIsOnBoundary(point, rectangle) {
  const epsilon = 0.01
  const withinX = point.x >= rectangle.x - epsilon && point.x <= rectangle.x + rectangle.width + epsilon
  const withinY = point.y >= rectangle.y - epsilon && point.y <= rectangle.y + rectangle.height + epsilon
  const onVertical = Math.abs(point.x - rectangle.x) <= epsilon || Math.abs(point.x - rectangle.x - rectangle.width) <= epsilon
  const onHorizontal = Math.abs(point.y - rectangle.y) <= epsilon || Math.abs(point.y - rectangle.y - rectangle.height) <= epsilon
  return withinX && withinY && (onVertical || onHorizontal)
}

function rectanglesOverlap(left, right) {
  return left.x < right.x + right.width
    && left.x + left.width > right.x
    && left.y < right.y + right.height
    && left.y + left.height > right.y
}
