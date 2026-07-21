import { describe, expect, it } from 'vitest'
import { scenarioForSliders } from '../src/lib/scenario'

const defaults = { startingSalary: 100_000, stayRaisePercent: 8, switchBumpPercent: 15, horizonYears: 10 }

describe('scenarioForSliders', () => {
  it('uses changed slider values in the returned earnings data', () => {
    const highRaise = scenarioForSliders(defaults, '8', '15')
    const realisticRaise = scenarioForSliders(defaults, '3', '15')

    expect(realisticRaise.projection?.years.at(-1)?.staySalary).toBeLessThan(highRaise.projection?.years.at(-1)?.staySalary ?? 0)
    expect(realisticRaise.projection?.cumulativeGap).toBeGreaterThan(0)
    expect(highRaise.projection?.years.at(-1)?.staySalary).not.toBe(
      realisticRaise.projection?.years.at(-1)?.staySalary,
    )
  })

  it('makes the gap positive when switching has a bump', () => {
    const projection = scenarioForSliders(defaults, '0', '15')
    expect(projection.projection?.cumulativeGap).toBeGreaterThan(0)
  })

  it('passes malformed slider values through validation at the input boundary', () => {
    const scenario = scenarioForSliders(defaults, 'nope', '15')
    expect(scenario.projection).toBeNull()
    expect(scenario.error).toMatch(/between/)
  })
})
