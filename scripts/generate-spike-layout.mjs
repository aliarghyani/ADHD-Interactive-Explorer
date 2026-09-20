import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ELK from 'elkjs/lib/elk.bundled.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixture = JSON.parse(await fs.readFile(path.join(root, 'app/domain/spike-fixture.json'), 'utf8'))
const elk = new ELK()
const STANDARD = { width: 220, height: 96 }
const ANCHOR = { width: 220, height: 88 }
const layer = { context: 0, regulation: 1, behaviour: 2, pattern: 3, 'functional-domain': 4 }

const orderedNodes = [...fixture.nodes].sort((a, b) => {
  const aRank = a.category === 'clinical-anchor' ? -1 : layer[a.category]
  const bRank = b.category === 'clinical-anchor' ? -1 : layer[b.category]
  return aRank - bRank || a.id.localeCompare(b.id)
})
const orderedEdges = [...fixture.edges].sort((a, b) => a.id.localeCompare(b.id))
const anchors = orderedNodes.filter((node) => node.category === 'clinical-anchor')
const explanatory = orderedNodes.filter((node) => node.category !== 'clinical-anchor')
const forwardEdges = orderedEdges.filter((edge) => edge.relationshipType !== 'FEEDBACK_WITH')

const main = await elk.layout({
  id: 'explanatory-system',
  layoutOptions: {
    'elk.algorithm': 'layered',
    'elk.direction': 'DOWN',
    'elk.edgeRouting': 'ORTHOGONAL',
    'elk.partitioning.activate': 'true',
    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
    'elk.spacing.nodeNode': '70',
    'elk.layered.spacing.nodeNodeBetweenLayers': '90',
    'elk.padding': '[top=24,left=24,bottom=24,right=24]'
  },
  children: explanatory.map((node) => ({
    id: node.id,
    ...STANDARD,
    layoutOptions: { 'org.eclipse.elk.partitioning.partition': String(layer[node.category]) }
  })),
  edges: forwardEdges.map((edge) => ({ id: edge.id, sources: [edge.sourceId], targets: [edge.targetId] }))
})

const anchorGraph = await elk.layout({
  id: 'clinical-anchor',
  layoutOptions: {
    'elk.algorithm': 'layered',
    'elk.direction': 'RIGHT',
    'elk.spacing.nodeNode': '60',
    'elk.padding': '[top=20,left=20,bottom=20,right=20]'
  },
  children: anchors.map((node) => ({ id: node.id, ...ANCHOR })),
  edges: []
})

const margin = 80
const anchorGap = 110
const mainWidth = main.width ?? 0
const anchorWidth = anchorGraph.width ?? 0
const contentWidth = Math.max(mainWidth, anchorWidth)
const anchorOffset = { x: margin + (contentWidth - anchorWidth) / 2, y: 48 }
const mainOffset = { x: margin + (contentWidth - mainWidth) / 2, y: (anchorGraph.height ?? 0) + anchorGap }

const nodes = [
  ...(anchorGraph.children ?? []).map((node) => geometryNode(node, anchorOffset)),
  ...(main.children ?? []).map((node) => geometryNode(node, mainOffset))
].sort((a, b) => a.id.localeCompare(b.id))

const edges = (main.edges ?? []).map((edge) => {
  const section = edge.sections?.[0]
  if (!section) throw new Error(`ELK returned no route for ${edge.id}`)
  return {
    id: edge.id,
    start: translate(section.startPoint, mainOffset),
    bendPoints: (section.bendPoints ?? []).map((point) => translate(point, mainOffset)),
    end: translate(section.endPoint, mainOffset)
  }
})

const nodeMap = new Map(nodes.map((node) => [node.id, node]))
const feedback = orderedEdges.find((edge) => edge.relationshipType === 'FEEDBACK_WITH')
if (!feedback) throw new Error('Feedback fixture edge is required')
const source = nodeMap.get(feedback.sourceId)
const target = nodeMap.get(feedback.targetId)
if (!source || !target) throw new Error('Feedback endpoints are missing geometry')
const feedbackX = 28
edges.push({
  id: feedback.id,
  start: { x: source.x, y: source.y + source.height / 2 },
  bendPoints: [
    { x: feedbackX, y: source.y + source.height / 2 },
    { x: feedbackX, y: target.y + target.height / 2 }
  ],
  end: { x: target.x, y: target.y + target.height / 2 }
})
edges.sort((a, b) => a.id.localeCompare(b.id))

const artifact = {
  width: Math.ceil(contentWidth + margin * 2),
  height: Math.ceil(mainOffset.y + (main.height ?? 0) + 64),
  layoutVersion: 'spike-layout-v1',
  generatorVersion: 'elk-layout-generator-v1',
  elkVersion: '0.12.0',
  knowledgeVersion: fixture.version,
  nodes,
  edges
}

validate(artifact)
await fs.writeFile(path.join(root, 'app/generated/spike-layout.json'), `${JSON.stringify(artifact, null, 2)}\n`, 'utf8')
console.log(`Generated ${artifact.nodes.length} nodes and ${artifact.edges.length} edges (${artifact.width}×${artifact.height}).`)

function geometryNode(node, offset) {
  if (![node.x, node.y, node.width, node.height].every(Number.isFinite)) throw new Error(`Invalid ELK node ${node.id}`)
  return { id: node.id, x: node.x + offset.x, y: node.y + offset.y, width: node.width, height: node.height }
}

function translate(point, offset) {
  return { x: point.x + offset.x, y: point.y + offset.y }
}

function validate(artifact) {
  const expectedNodes = orderedNodes.map((node) => node.id)
  const expectedEdges = orderedEdges.map((edge) => edge.id)
  assertCoverage(artifact.nodes.map((node) => node.id), expectedNodes, 'node')
  assertCoverage(artifact.edges.map((edge) => edge.id), expectedEdges, 'edge')
}

function assertCoverage(actual, expected, kind) {
  if (new Set(actual).size !== actual.length) throw new Error(`Duplicate ${kind} geometry`)
  const missing = expected.filter((id) => !actual.includes(id))
  const unknown = actual.filter((id) => !expected.includes(id))
  if (missing.length || unknown.length) throw new Error(`${kind} coverage mismatch: missing=${missing.join(',')} unknown=${unknown.join(',')}`)
}
