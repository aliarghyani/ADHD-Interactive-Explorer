import type { Category, NodeGeometry } from './spike-types'

const layerRank: Category[] = [
  'clinical-anchor',
  'context',
  'regulation',
  'behaviour',
  'pattern',
  'functional-domain',
]

export interface NavigableNode extends NodeGeometry { category: Category }

export function orderedNodes(nodes: NavigableNode[]): NavigableNode[] {
  return [...nodes].sort(
    (a, b) => layerRank.indexOf(a.category) - layerRank.indexOf(b.category) || a.x - b.x || a.id.localeCompare(b.id),
  )
}

export function moveFocus(nodes: NavigableNode[], currentId: string, key: string): string {
  const current = nodes.find((node) => node.id === currentId)
  if (!current) return orderedNodes(nodes)[0]?.id ?? currentId
  const sameLayer = nodes.filter((node) => node.category === current.category).sort((a, b) => a.x - b.x || a.id.localeCompare(b.id))
  const sameIndex = sameLayer.findIndex((node) => node.id === current.id)
  if (key === 'ArrowLeft') return sameLayer[sameIndex - 1]?.id ?? current.id
  if (key === 'ArrowRight') return sameLayer[sameIndex + 1]?.id ?? current.id

  const rank = layerRank.indexOf(current.category)
  const targetRank = key === 'ArrowUp' ? rank - 1 : key === 'ArrowDown' ? rank + 1 : rank
  if (targetRank === rank || targetRank < 0 || targetRank >= layerRank.length) return current.id
  const center = current.x + current.width / 2
  const candidates = nodes.filter((node) => node.category === layerRank[targetRank])
  return candidates.sort(
    (a, b) => Math.abs(a.x + a.width / 2 - center) - Math.abs(b.x + b.width / 2 - center) || a.id.localeCompare(b.id),
  )[0]?.id ?? current.id
}
