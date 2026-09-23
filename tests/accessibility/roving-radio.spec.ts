import { describe, expect, it } from 'vitest'
import { nextRovingRadioIndex } from '../../accessibility/roving-radio'

describe('roving radio keyboard navigation', () => {
  it('moves in stable source order and wraps at either end', () => {
    expect(nextRovingRadioIndex(4, 0, 'ArrowRight')).toBe(1)
    expect(nextRovingRadioIndex(4, 0, 'ArrowDown')).toBe(1)
    expect(nextRovingRadioIndex(4, 0, 'ArrowLeft')).toBe(3)
    expect(nextRovingRadioIndex(4, 3, 'ArrowUp')).toBe(2)
  })

  it('supports Home and End without consuming unrelated keys', () => {
    expect(nextRovingRadioIndex(4, 2, 'Home')).toBe(0)
    expect(nextRovingRadioIndex(4, 1, 'End')).toBe(3)
    expect(nextRovingRadioIndex(4, 1, 'Tab')).toBeNull()
  })
})
