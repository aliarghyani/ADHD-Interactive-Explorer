import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ELK from 'elkjs/lib/elk.bundled.js'
import {
  ANCHOR_LAYOUT_OPTIONS,
  CONFIGURATION_VERSION,
  ELK_VERSION,
  GENERATOR_VERSION,
  LAYER_ORDER,
  LAYOUT_VERSION,
  MAIN_LAYOUT_OPTIONS,
  NODE_DIMENSIONS,
  OVERRIDE_SET_VERSION,
  compareCanonicalId,
} from './config.mjs'
import { applyOverrides, loadOverrides } from './overrides.mjs'
import { loadCanonicalLayoutSource } from './source.mjs'
import { validateLayoutArtifact } from '../../validation/layout/validate-layout.mjs'
import { generateReviewSvg } from './review-svg.mjs'

const currentFile = fileURLToPath(import.meta.url)
const defaultRoot = path.resolve(path.dirname(currentFile), '..', '..')

export async function generateLayoutArtifact({ root = defaultRoot } = {}) {
  const source = await loadCanonicalLayoutSource(root)
  const overrides = await loadOverrides(root)
  const elk = new ELK()
  const anchors = source.nodes.filter(({ category }) => category === 'clinical-anchor')
  const explanatory = source.nodes.filter(({ category }) => category !== 'clinical-anchor')
  const forwardEdges = source.edges.filter(({ relationshipType }) => relationshipType !== 'FEEDBACK_WITH')
  const feedbackEdges = source.edges.filter(({ relationshipType }) => relationshipType === 'FEEDBACK_WITH')

  const [main, anchorGraph] = await Promise.all([
    elk.layout({
      id: 'explanatory-network',
      layoutOptions: MAIN_LAYOUT_OPTIONS,
      children: explanatory.map((node) => ({
        id: node.id,
        ...NODE_DIMENSIONS[node.category],
        layoutOptions: { 'org.eclipse.elk.partitioning.partition': String(LAYER_ORDER[node.category]) },
      })),
      edges: forwardEdges.map((edge) => ({ id: edge.id, sources: [edge.sourceId], targets: [edge.targetId] })),
    }),
    elk.layout({
      id: 'clinical-anchor-region',
      layoutOptions: ANCHOR_LAYOUT_OPTIONS,
      children: anchors.map((node) => ({ id: node.id, ...NODE_DIMENSIONS[node.category] })),
      edges: [],
    }),
  ])

  const margin = 72
  const feedbackLaneSpacing = 44
  const feedbackReserve = feedbackEdges.length * feedbackLaneSpacing + 40
  const mainWidth = requireFinite(main.width, 'main graph width')
  const mainHeight = requireFinite(main.height, 'main graph height')
  const anchorWidth = requireFinite(anchorGraph.width, 'anchor graph width')
  const anchorHeight = requireFinite(anchorGraph.height, 'anchor graph height')
  const contentWidth = Math.max(mainWidth, anchorWidth)
  const anchorOffset = { x: feedbackReserve + margin + (contentWidth - anchorWidth) / 2, y: margin }
  const mainOffset = { x: feedbackReserve + margin + (contentWidth - mainWidth) / 2, y: margin + anchorHeight + 132 }

  const nodeGeometry = [
    ...(anchorGraph.children ?? []).map((node) => normalizeNode(node, anchorOffset)),
    ...(main.children ?? []).map((node) => normalizeNode(node, mainOffset)),
  ].sort((left, right) => compareCanonicalId(left.id, right.id))

  const edgeGeometry = (main.edges ?? []).map((edge) => normalizeElkEdge(edge, mainOffset))
  const nodeById = new Map(nodeGeometry.map((geometry) => [geometry.id, geometry]))
  const canonicalNodeById = new Map(source.nodes.map((node) => [node.id, node]))
  const contextTop = Math.min(...source.nodes.filter(({ category }) => category === 'context').map(({ id }) => nodeById.get(id).y))
  const mainBottom = mainOffset.y + mainHeight
  feedbackEdges.forEach((edge, index) => edgeGeometry.push(routeFeedbackEdge(edge, nodeById, canonicalNodeById, {
    laneX: margin + index * feedbackLaneSpacing,
    topY: contextTop - 28 - index * 14,
    bottomY: mainBottom + 28 + index * 18,
  })))
  edgeGeometry.sort((left, right) => compareCanonicalId(left.id, right.id))

  const draft = {
    layoutVersion: LAYOUT_VERSION,
    generatorVersion: GENERATOR_VERSION,
    knowledgeReleaseId: source.knowledgeReleaseId,
    elkVersion: ELK_VERSION,
    configurationVersion: CONFIGURATION_VERSION,
    overrideSetVersion: OVERRIDE_SET_VERSION,
    graphBounds: {
      x: 0,
      y: 0,
      width: round(feedbackReserve + margin * 2 + contentWidth),
      height: round(mainBottom + 28 + (feedbackEdges.length - 1) * 18 + margin),
    },
    nodeGeometry,
    edgeGeometry,
  }
  const artifact = applyOverrides(draft, overrides, source)
  const errors = await validateLayoutArtifact(artifact, source, { root })
  if (errors.length > 0) throw new Error(`Generated layout is invalid:\n${errors.join('\n')}`)
  return { artifact, source, overrides }
}

export async function writeLayoutOutputs({ root = defaultRoot } = {}) {
  const generated = await generateLayoutArtifact({ root })
  const directory = path.join(root, 'knowledge', 'layouts')
  const artifactFile = path.join(directory, 'production-layout.v1.json')
  const reviewFile = path.join(directory, 'layout-review.v1.svg')
  const serialized = `${JSON.stringify(generated.artifact, null, 2)}\n`
  await fs.writeFile(artifactFile, serialized, 'utf8')
  await fs.writeFile(reviewFile, generateReviewSvg(generated.artifact, generated.source), 'utf8')
  return { ...generated, artifactFile, reviewFile, serialized }
}

function normalizeNode(node, offset) {
  return {
    id: node.id,
    x: round(requireFinite(node.x, `${node.id} x`) + offset.x),
    y: round(requireFinite(node.y, `${node.id} y`) + offset.y),
    width: round(requireFinite(node.width, `${node.id} width`)),
    height: round(requireFinite(node.height, `${node.id} height`)),
  }
}

function normalizeElkEdge(edge, offset) {
  if (edge.sections?.length !== 1) throw new Error(`ELK must return exactly one route section for ${edge.id}`)
  const [section] = edge.sections
  return {
    id: edge.id,
    start: translate(section.startPoint, offset),
    bendPoints: (section.bendPoints ?? []).map((point) => translate(point, offset)),
    end: translate(section.endPoint, offset),
  }
}

function routeFeedbackEdge(edge, nodeById, canonicalNodeById, { laneX, topY, bottomY }) {
  const source = nodeById.get(edge.sourceId)
  const target = nodeById.get(edge.targetId)
  const sourceNode = canonicalNodeById.get(edge.sourceId)
  if (!source || !target) throw new Error(`Feedback edge ${edge.id} has no endpoint geometry`)
  const end = { x: round(target.x + target.width / 2), y: target.y }
  if (sourceNode?.category === 'functional-domain') {
    const start = { x: round(source.x + source.width / 2), y: round(source.y + source.height) }
    return {
      id: edge.id,
      start,
      bendPoints: [
        { x: start.x, y: bottomY },
        { x: laneX, y: bottomY },
        { x: laneX, y: topY },
        { x: end.x, y: topY },
      ],
      end,
    }
  }
  const start = { x: source.x, y: round(source.y + source.height / 2) }
  return { id: edge.id, start, bendPoints: [{ x: laneX, y: start.y }, { x: laneX, y: topY }, { x: end.x, y: topY }], end }
}

function translate(point, offset) {
  if (!point) throw new Error('ELK returned an incomplete edge point')
  return { x: round(point.x + offset.x), y: round(point.y + offset.y) }
}

function requireFinite(value, label) {
  if (!Number.isFinite(value)) throw new Error(`Invalid ${label}`)
  return value
}

function round(value) {
  return Math.round(value * 1000) / 1000
}

if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  const { artifact, artifactFile, reviewFile } = await writeLayoutOutputs()
  console.log(`Generated ${artifact.nodeGeometry.length} nodes and ${artifact.edgeGeometry.length} edges.`)
  console.log(`Artifact: ${path.relative(defaultRoot, artifactFile)}`)
  console.log(`Review: ${path.relative(defaultRoot, reviewFile)} (LAYOUT REVIEW TOOL - NOT PRODUCTION UI)`)
}
