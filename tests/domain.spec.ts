import { describe, expect, it } from 'vitest'
import rawLayout from '../app/generated/spike-layout.json'
import { buildGraphReadModel } from '../app/domain/graph-read-model'
import { validateLayoutArtifact } from '../app/domain/layout'
import {
  selectDirectNeighbourIds,
  selectDownstream,
  selectFeedback,
  selectUpstream,
} from '../app/domain/selectors'
import type { LayoutArtifact } from '../app/domain/spike-types'

describe('domain selectors', () => {
  it('projects upstream, downstream, feedback and direct neighbours', () => {
    expect(selectUpstream('BEH1').map((edge) => edge.id)).toEqual(['E02'])
    expect(selectDownstream('BEH1').map((edge) => edge.id)).toEqual(['E03'])
    expect(selectFeedback('PAT1').map((edge) => edge.id)).toEqual(['E07'])
    expect(selectDirectNeighbourIds('BEH1').sort()).toEqual(['PAT1', 'REG3'])
  })
})

describe('GraphReadModel', () => {
  it('projects external selection and direct highlighting without renderer structures', () => {
    const model = buildGraphReadModel('BEH1', 'en')
    expect(model.selectedNodeId).toBe('BEH1')
    expect(model.nodes.find((node) => node.id === 'BEH1')?.selected).toBe(true)
    expect(model.highlightedNodeIds.sort()).toEqual(['PAT1', 'REG3'])
    expect(model.highlightedEdgeIds.sort()).toEqual(['E02', 'E03'])
    expect(model.nodes.find((node) => node.id === 'FUN1')?.highlighted).toBe(false)
    expect(JSON.stringify(model)).not.toMatch(/bendPoints|layoutOptions|elk/i)
  })

  it('uses Persian labels without changing canonical state', () => {
    const en = buildGraphReadModel('BEH1', 'en')
    const fa = buildGraphReadModel('BEH1', 'fa')
    expect(fa.selectedNodeId).toBe(en.selectedNodeId)
    expect(fa.nodes.find((node) => node.id === 'CTX6')?.label).toBe('تقاضا / پیچیدگی کار')
    expect(fa.nodes.map((node) => node.id)).toEqual(en.nodes.map((node) => node.id))
  })

  it('projects a simple visible-layer filter without leaking hidden edges', () => {
    const model = buildGraphReadModel(null, 'en', ['context'])
    expect(model.nodes.filter((node) => node.visible).map((node) => node.id).sort()).toEqual(['CTX4', 'CTX6', 'CTX8'])
    expect(model.edges.every((edge) => !edge.visible)).toBe(true)
  })
})

describe('LayoutArtifact', () => {
  it('has valid metadata and exact node/edge geometry coverage', () => {
    const layout = rawLayout as LayoutArtifact
    expect(validateLayoutArtifact(layout)).toEqual([])
    expect(layout.layoutVersion).toBeTruthy()
    expect(layout.generatorVersion).toBeTruthy()
    expect(layout.elkVersion).toBe('0.12.0')
    expect(layout.nodes).toHaveLength(11)
    expect(layout.edges).toHaveLength(7)
  })

  it('rejects missing, duplicate, unknown and invalid geometry', () => {
    const invalid = structuredClone(rawLayout) as LayoutArtifact
    invalid.nodes = [...invalid.nodes.slice(1), { ...invalid.nodes[1]!, id: 'UNKNOWN' }, invalid.nodes[1]!]
    invalid.edges[0]!.start.x = Number.NaN
    const errors = validateLayoutArtifact(invalid).join('\n')
    expect(errors).toContain('Missing node geometry: BEH1')
    expect(errors).toContain('Unknown node geometry: UNKNOWN')
    expect(errors).toContain('Duplicate node geometry')
    expect(errors).toContain('Invalid edge geometry: E01')
  })
})
