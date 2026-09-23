export type RovingRadioKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'Home' | 'End'

export function nextRovingRadioIndex(
  itemCount: number,
  currentIndex: number,
  key: string,
): number | null {
  if (itemCount <= 0 || currentIndex < 0 || currentIndex >= itemCount) return null
  if (key === 'Home') return 0
  if (key === 'End') return itemCount - 1
  if (key === 'ArrowRight' || key === 'ArrowDown') return (currentIndex + 1) % itemCount
  if (key === 'ArrowLeft' || key === 'ArrowUp') return (currentIndex - 1 + itemCount) % itemCount
  return null
}
