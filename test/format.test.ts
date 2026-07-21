import { describe, expect, it } from 'vitest'
import { formatCurrency, formatPercent } from '../src/lib/format'

describe('formatPercent', () => {
  it('renders a compact slider value', () => {
    expect(formatPercent(3)).toBe('3')
    expect(formatPercent(3.25)).toBe('3.3')
  })
})

describe('formatCurrency', () => {
  it('groups and rounds dollar figures without cents', () => {
    expect(formatCurrency(123456.5)).toBe('$123,457')
  })

  it('keeps zero and negative values legible', () => {
    expect(formatCurrency(0)).toBe('$0')
    expect(formatCurrency(-2500)).toBe('-$2,500')
  })
})
