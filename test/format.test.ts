import { describe, expect, it } from 'vitest'
import { formatPercent } from '../src/lib/format'

describe('formatPercent', () => {
  it('renders a compact slider value', () => {
    expect(formatPercent(3)).toBe('3')
    expect(formatPercent(3.25)).toBe('3.3')
  })
})
