import { CalculatorValues } from './types'
export type { CalculatorValues } from './types'
export type CalculatorErrors = Partial<Record<keyof CalculatorValues, string>>

const MAX_VALUE = 1_000_000

function validateAmount(value: string, label: string): string | undefined {
  if (value.trim() === '') return `Enter a ${label} value greater than or equal to 0.`
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return `Enter a valid ${label} number.`
  if (parsed < 0) return `Enter a ${label} value greater than or equal to 0.`
  if (parsed > MAX_VALUE) return `Enter a ${label} value below ${MAX_VALUE.toLocaleString()}.`
  return undefined
}

export function validateCalculator(values: CalculatorValues): CalculatorErrors {
  const errors: CalculatorErrors = {}
  if (!values.transportMode) errors.transportMode = 'Select a transport mode.'
  errors.distance = validateAmount(values.distance, 'travel distance')
  errors.electricity = validateAmount(values.electricity, 'monthly electricity')
  if (!values.wasteTreatment) errors.wasteTreatment = 'Select an organic waste treatment.'
  errors.waste = validateAmount(values.waste, 'monthly organic waste')
  return Object.fromEntries(Object.entries(errors).filter(([, value]) => value)) as CalculatorErrors
}
