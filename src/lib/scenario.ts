import { projectEarnings, validateInputs, type CompensationInputs, type EarningsProjection } from './model'

export type SliderScenario =
  | { projection: EarningsProjection; error: null }
  | { projection: null; error: string }

export function scenarioForSliders(
  defaults: CompensationInputs,
  stayRaiseValue: string,
  switchBumpValue: string,
): SliderScenario {
  const inputs = {
    ...defaults,
    stayRaisePercent: Number(stayRaiseValue),
    switchBumpPercent: Number(switchBumpValue),
  }
  const error = validateInputs(inputs)
  return error ? { projection: null, error } : { projection: projectEarnings(inputs), error: null }
}
