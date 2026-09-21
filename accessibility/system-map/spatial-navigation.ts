import type { CanonicalNodeId } from '../../domain'
import type { NodeGeometry } from '../../visualization/system-map/layout'

export type SpatialNavigationKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown'

interface RankedCandidate {
  readonly id: CanonicalNodeId
  readonly primaryDistance: number
  readonly secondaryDistance: number
  readonly distance: number
}

function centerOf(node: NodeGeometry): { x: number; y: number } {
  return { x: node.x + node.width / 2, y: node.y + node.height / 2 }
}

/**
 * Moves focus using only reviewed layout geometry. Scientific relationships are
 * deliberately absent from this API so keyboard navigation cannot become graph traversal.
 */
export function moveSpatialFocus(
  nodes: readonly NodeGeometry[],
  currentId: CanonicalNodeId,
  key: SpatialNavigationKey,
): CanonicalNodeId {
  const current = nodes.find((node) => node.id === currentId)
  if (!current) return nodes.toSorted((a, b) => a.y - b.y || a.x - b.x || a.id.localeCompare(b.id))[0]?.id ?? currentId

  const origin = centerOf(current)
  const candidates = nodes.flatMap<RankedCandidate>((node) => {
    if (node.id === current.id) return []
    const target = centerOf(node)
    const dx = target.x - origin.x
    const dy = target.y - origin.y
    const horizontal = key === 'ArrowLeft' || key === 'ArrowRight'
    const primary = horizontal ? Math.abs(dx) : Math.abs(dy)
    const secondary = horizontal ? Math.abs(dy) : Math.abs(dx)
    const inDirection = key === 'ArrowLeft'
      ? dx < 0
      : key === 'ArrowRight'
        ? dx > 0
        : key === 'ArrowUp'
          ? dy < 0
          : dy > 0
    if (!inDirection) return []
    return [{
      id: node.id,
      primaryDistance: primary,
      secondaryDistance: secondary,
      distance: Math.hypot(dx, dy),
    }]
  })

  return candidates.toSorted((a, b) => {
    const aScore = a.primaryDistance + a.secondaryDistance * 2
    const bScore = b.primaryDistance + b.secondaryDistance * 2
    return aScore - bScore
      || a.distance - b.distance
      || a.secondaryDistance - b.secondaryDistance
      || a.id.localeCompare(b.id)
  })[0]?.id ?? current.id
}
