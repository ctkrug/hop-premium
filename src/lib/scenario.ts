import { projectEarnings, type CompensationInputs, type EarningsProjection } from './model'

export function scenarioForSliders(
  defaults: CompensationInputs,
  stayRaiseValue: string,
  switchBumpValue: string,
): EarningsProjection {
  return projectEarnings({
    ...defaults,
    stayRaisePercent: Number(stayRaiseValue),
    switchBumpPercent: Number(switchBumpValue),
  })
}
