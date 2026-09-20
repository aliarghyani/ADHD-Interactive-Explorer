import { describe, expect, it } from 'vitest'
import { buildGraphReadModel } from '../app/domain/graph-read-model'
import { isCanonicalNodeId, nodeById } from '../app/domain/spike-data'
import { selectRelatedEdges } from '../app/domain/selectors'

function restoreRouteState(localeParam: string, nodeParam?: string) {
  const locale = localeParam === 'fa' ? 'fa' : 'en'
  const selectedNodeId = isCanonicalNodeId(nodeParam) ? nodeParam : null
  return {
    locale,
    selectedNodeId,
    selected: selectedNodeId ? nodeById.get(selectedNodeId) : null,
    relationships: selectRelatedEdges(selectedNodeId),
    model: buildGraphReadModel(selectedNodeId, locale),
  }
}

describe('deep-link restoration', () => {
  it('restores BEH1 before renderer projection for English and Persian', () => {
    for (const locale of ['en', 'fa']) {
      const state = restoreRouteState(locale, 'BEH1')
      expect(state.selectedNodeId).toBe('BEH1')
      expect(state.selected?.labels[state.locale]).toBe(locale === 'fa' ? 'شروع کردن' : 'Starting')
      expect(state.relationships.map((edge) => edge.id).sort()).toEqual(['E02', 'E03'])
      expect(state.model.nodes.find((node) => node.id === 'BEH1')?.selected).toBe(true)
    }
  })

  it('does not fabricate invalid canonical IDs', () => {
    const state = restoreRouteState('en', 'NOT-A-NODE')
    expect(state.selectedNodeId).toBeNull()
    expect(state.selected).toBeNull()
    expect(state.relationships).toEqual([])
  })
})
