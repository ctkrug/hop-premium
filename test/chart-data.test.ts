import { describe, expect, it } from 'vitest'
import { chartCeiling, toChartPoints } from '../src/lib/chart-data'
import { projectEarnings } from '../src/lib/model'

describe('chart data', () => {
  it('preserves every annual model value for rendering', () => {
    const projection = projectEarnings({
      startingSalary: 100_000,
      stayRaisePercent: 3,
      switchBumpPercent: 15,
      horizonYears: 2,
    })

    expect(toChartPoints(projection)).toEqual(projection.years)
  })

  it('rounds the scale upward to a legible ten-thousand boundary', () => {
    expect(chartCeiling([{ year: 0, staySalary: 100_001, switchSalary: 99_999 }])).toBe(110_000)
    expect(chartCeiling([{ year: 0, staySalary: 100_000, switchSalary: 80_000 }])).toBe(100_000)
  })

  it('does not discard zero salary points', () => {
    expect(chartCeiling([{ year: 0, staySalary: 0, switchSalary: 0 }])).toBe(0)
  })
})
