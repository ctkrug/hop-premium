import { describe, expect, it } from 'vitest'
import { projectEarnings, validateInputs } from '../src/lib/model'

describe('projectEarnings', () => {
  it('returns one annual salary for each year including today', () => {
    const result = projectEarnings({
      startingSalary: 100_000,
      stayRaisePercent: 3,
      switchBumpPercent: 10,
      horizonYears: 2,
    })

    expect(result.years).toHaveLength(3)
    expect(result.years.map(({ year }) => year)).toEqual([0, 1, 2])
    expect(result.years[0]?.staySalary).toBe(100_000)
    expect(result.years[0]?.switchSalary).toBeCloseTo(110_000)
  })

  it('keeps salaries flat when both rates are zero', () => {
    const result = projectEarnings({
      startingSalary: 80_000,
      stayRaisePercent: 0,
      switchBumpPercent: 0,
      horizonYears: 3,
    })

    expect(result.years.every((year) => year.staySalary === 80_000)).toBe(true)
    expect(result.cumulativeGap).toBe(0)
  })

  it('compounds a switching bump through every later year', () => {
    const result = projectEarnings({
      startingSalary: 100_000,
      stayRaisePercent: 10,
      switchBumpPercent: 20,
      horizonYears: 2,
    })

    expect(result.years[2].staySalary).toBeCloseTo(121_000)
    expect(result.years[2].switchSalary).toBeCloseTo(145_200)
    expect(result.switchCumulative).toBeCloseTo(397_200)
    expect(result.cumulativeGap).toBeCloseTo(66_200)
  })

  it('makes cumulative totals equal the returned annual values', () => {
    const result = projectEarnings({
      startingSalary: 92_500,
      stayRaisePercent: 3.5,
      switchBumpPercent: 15,
      horizonYears: 10,
    })

    expect(result.stayCumulative).toBeCloseTo(
      result.years.reduce((sum, year) => sum + year.staySalary, 0),
    )
    expect(result.switchCumulative).toBeCloseTo(
      result.years.reduce((sum, year) => sum + year.switchSalary, 0),
    )
  })
})

describe('validateInputs', () => {
  const valid = { startingSalary: 100_000, stayRaisePercent: 3, switchBumpPercent: 15, horizonYears: 10 }

  it('accepts zero rates and configured maximum rates', () => {
    expect(validateInputs({ ...valid, stayRaisePercent: 0, switchBumpPercent: 0 })).toBeNull()
    expect(validateInputs({ ...valid, stayRaisePercent: 20, switchBumpPercent: 50, horizonYears: 40 })).toBeNull()
  })

  it('rejects malformed, negative, and out-of-range values', () => {
    expect(validateInputs({ ...valid, startingSalary: 0 })).toMatch(/positive/)
    expect(validateInputs({ ...valid, stayRaisePercent: Number.NaN })).toMatch(/between/)
    expect(validateInputs({ ...valid, switchBumpPercent: 51 })).toMatch(/between/)
    expect(validateInputs({ ...valid, horizonYears: 1.5 })).toMatch(/whole number/)
  })
})
