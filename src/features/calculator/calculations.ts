import { ELECTRICITY_FACTOR, TRANSPORT_FACTORS, WASTE_FACTORS } from './factors'
import { EmissionCategory, FootprintResult, NumericCalculatorValues } from './types'

const finiteNonNegative = (value: number) => Number.isFinite(value) && value >= 0

export function calculatePercentage(value: number, total: number): number {
  return total > 0 && finiteNonNegative(value) && finiteNonNegative(total) ? (value / total) * 100 : 0
}

export function getDominantCategory(values: Record<EmissionCategory, number>): EmissionCategory | null {
  const entries = Object.entries(values) as [EmissionCategory, number][]
  const largest = entries.reduce<[EmissionCategory, number] | null>((current, entry) => !current || entry[1] > current[1] ? entry : current, null)
  return largest && largest[1] > 0 ? largest[0] : null
}

export function calculateFootprint(values: NumericCalculatorValues): FootprintResult | null {
  const activities = [values.monthlyDistanceKm, values.monthlyKwh, values.monthlyOrganicWasteKg]
  if (!activities.every(finiteNonNegative)) return null
  const transportationKg = values.monthlyDistanceKm * TRANSPORT_FACTORS[values.transportMode].value
  const electricityKg = values.monthlyKwh * ELECTRICITY_FACTOR.value
  const wasteKg = values.monthlyOrganicWasteKg * WASTE_FACTORS[values.wasteTreatment].value
  const categoryValues = { transportation: transportationKg, electricity: electricityKg, waste: wasteKg }
  const monthlyTotalKg = transportationKg + electricityKg + wasteKg
  if (![...Object.values(categoryValues), monthlyTotalKg].every(finiteNonNegative)) return null
  return { transportationKg, electricityKg, wasteKg, monthlyTotalKg, annualTotalKg: monthlyTotalKg * 12, percentages: { transportation: calculatePercentage(transportationKg, monthlyTotalKg), electricity: calculatePercentage(electricityKg, monthlyTotalKg), waste: calculatePercentage(wasteKg, monthlyTotalKg) }, dominantCategory: getDominantCategory(categoryValues) }
}
