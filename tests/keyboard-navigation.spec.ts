import { describe, expect, it } from 'vitest'
import { moveFocus } from '../app/domain/keyboard-navigation'
import { geometryByNodeId } from '../app/domain/layout'
import { nodeById } from '../app/domain/spike-data'

const nodes = [...geometryByNodeId.values()].map((geometry) => ({
  ...geometry,
  category: nodeById.get(geometry.id)!.category,
}))

describe('geometry-based keyboard navigation', () => {
  it('moves within and between fixed visual layers', () => {
    expect(moveFocus(nodes, 'CTX4', 'ArrowRight')).toBe('CTX8')
    expect(moveFocus(nodes, 'CTX8', 'ArrowRight')).toBe('CTX6')
    expect(moveFocus(nodes, 'CTX6', 'ArrowDown')).toBe('REG3')
    expect(moveFocus(nodes, 'REG3', 'ArrowDown')).toBe('BEH1')
  })

  it('does not depend on locale direction', () => {
    expect(moveFocus(nodes, 'CTX8', 'ArrowLeft')).toBe('CTX4')
    expect(moveFocus(nodes, 'CTX8', 'ArrowRight')).toBe('CTX6')
  })
})
