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

export function validateInputs(inputs: CompensationInputs): string | null {
  if (!Number.isFinite(inputs.startingSalary) || inputs.startingSalary <= 0) {
    return 'Starting salary must be a positive number.'
  }
  if (!Number.isFinite(inputs.stayRaisePercent) || inputs.stayRaisePercent < 0 || inputs.stayRaisePercent > 20) {
    return 'Stay raise must be between 0% and 20%.'
  }
  if (!Number.isFinite(inputs.switchBumpPercent) || inputs.switchBumpPercent < 0 || inputs.switchBumpPercent > 50) {
    return 'Switch bump must be between 0% and 50%.'
  }
  if (!Number.isInteger(inputs.horizonYears) || inputs.horizonYears < 1 || inputs.horizonYears > 40) {
    return 'Horizon must be a whole number between 1 and 40 years.'
  }
  return null
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
