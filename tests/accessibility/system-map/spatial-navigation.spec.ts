import { describe, expect, it } from 'vitest'
import { moveSpatialFocus } from '../../../accessibility/system-map/spatial-navigation'
import { systemMapRepository } from '../../../features/system-map/knowledge'
import { productionLayout } from '../../../visualization/system-map/layout'

describe('System Map spatial keyboard navigation', () => {
  it.each([
    ['BEH1', 'ArrowRight', 'BEH2'],
    ['BEH4', 'ArrowUp', 'REG1'],
    ['REG3', 'ArrowDown', 'BEH6'],
    ['FUN4', 'ArrowDown', 'FUN4'],
    ['CA1', 'ArrowDown', 'CA2'],
    ['CA2', 'ArrowUp', 'CA1'],
  ] as const)('moves from %s with %s to %s using production coordinates', (from, key, expected) => {
    expect(moveSpatialFocus(productionLayout.nodeGeometry, from, key)).toBe(expected)
  })

  it('is geometric rather than scientific traversal', () => {
    const target = moveSpatialFocus(productionLayout.nodeGeometry, 'BEH1', 'ArrowRight')
    const scientificNeighbours = systemMapRepository.getNeighbours('BEH1').map((node) => node.id)

    expect(target).toBe('BEH2')
    expect(scientificNeighbours).not.toContain(target)
  })

  it('uses a stable canonical-ID tie break', () => {
    const nodes = [
      { id: 'BEH1', x: 0, y: 0, width: 10, height: 10 },
      { id: 'BEH3', x: 20, y: -10, width: 10, height: 10 },
      { id: 'BEH2', x: 20, y: 10, width: 10, height: 10 },
    ] as const

    expect(moveSpatialFocus(nodes, 'BEH1', 'ArrowRight')).toBe('BEH2')
  })
})
