export type CompensationInputs = {
  startingSalary: number
  stayRaisePercent: number
  switchBumpPercent: number
  horizonYears: number
}

export type EarningsYear = {
  year: number
  staySalary: number
  switchSalary: number
}

export type EarningsProjection = {
  years: EarningsYear[]
  stayCumulative: number
  switchCumulative: number
  cumulativeGap: number
}

export function projectEarnings(inputs: CompensationInputs): EarningsProjection {
  const { startingSalary, stayRaisePercent, switchBumpPercent, horizonYears } = inputs
  const years: EarningsYear[] = []
  let stayCumulative = 0
  let switchCumulative = 0

  for (let year = 0; year <= horizonYears; year += 1) {
    const staySalary = startingSalary * (1 + stayRaisePercent / 100) ** year
    const switchSalary = startingSalary * (1 + switchBumpPercent / 100) *
      (1 + stayRaisePercent / 100) ** year

    years.push({ year, staySalary, switchSalary })
    stayCumulative += staySalary
    switchCumulative += switchSalary
  }

  return {
    years,
    stayCumulative,
    switchCumulative,
    cumulativeGap: switchCumulative - stayCumulative,
  }
}
