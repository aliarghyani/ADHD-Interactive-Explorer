import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadKnowledgeBundle, validateKnowledgeBundle } from '../../validation/knowledge-validator.mjs'

type Bundle = Awaited<ReturnType<typeof loadKnowledgeBundle>>
type Fixture = { name: string; mutation: string; expectedCode: string }

const fixturePath = join(process.cwd(), 'tests', 'contract', 'fixtures', 'invalid-cases.json')
const fixtures = JSON.parse(await readFile(fixturePath, 'utf8')) as Fixture[]

function mutate(original: Bundle, mutation: string): Bundle {
  const bundle = structuredClone(original)
  const nodes = bundle.nodes.nodes
  const edges = bundle.edges.edges
  switch (mutation) {
    case 'remove-node': nodes.pop(); break
    case 'add-node': nodes.push({ ...nodes.at(-1)!, id: 'FUN5' }); break
    case 'duplicate-node': nodes.push(structuredClone(nodes[0])); break
    case 'duplicate-edge': edges.push(structuredClone(edges[0])); break
    case 'unknown-edge-source': edges[0].sourceId = 'UNKNOWN1'; break
    case 'unknown-edge-target': edges[0].targetId = 'UNKNOWN1'; break
    case 'unsupported-relationship': edges[0].relationshipType = 'CAUSES'; break
    case 'clinical-anchor-edge': edges[0].sourceId = 'CA1'; edges[0].relationshipType = 'MODULATES'; break
    case 'prohibited-field': (bundle.manifest as Record<string, unknown>).score = 4; break
    case 'missing-safety': bundle.safety.safety.pop(); break
    case 'missing-en': bundle.en.records.shift(); break
    case 'missing-fa': bundle.fa.records.shift(); break
    case 'unknown-evidence': edges[0].evidenceIds = ['EVID_UNKNOWN']; break
    case 'unknown-source': bundle.evidence.evidence[0].sourceIds = ['SRC_UNKNOWN']; break
    case 'invalid-schema-version': bundle.manifest.schemaVersion = '9.9.9'; break
    case 'presentation-behaviour-state': (bundle.presentations.presentations[0] as Record<string, unknown>).selectedBehaviourIds = ['BEH1']; break
    default: throw new Error(`Unknown fixture mutation: ${mutation}`)
  }
  return bundle
}

describe('production knowledge contract', () => {
  it('accepts the complete authoritative release', async () => {
    const errors = await validateKnowledgeBundle(await loadKnowledgeBundle())
    expect(errors).toEqual([])
  })

  for (const fixture of fixtures) {
    it(`rejects ${fixture.name} for the intended reason`, async () => {
      const bundle = mutate(await loadKnowledgeBundle(), fixture.mutation)
      const errors = await validateKnowledgeBundle(bundle)
      expect(errors.map((error) => error.code)).toContain(fixture.expectedCode)
    })
  }
})
