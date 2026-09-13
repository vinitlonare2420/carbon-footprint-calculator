import { describe, expect, it } from 'vitest'
import { calculateFootprint, calculatePercentage, getDominantCategory } from './calculations'

const values = { transportMode: 'car' as const, monthlyDistanceKm: 100, monthlyKwh: 100, wasteTreatment: 'composting' as const, monthlyOrganicWasteKg: 10 }

describe('calculateFootprint', () => {
  it.each([['twoWheeler', 0.1609], ['car', 0.3591], ['bus', 0.0315], ['train', 0.007837]] as const)('uses the exact %s transport factor', (transportMode, factor) => {
    const result = calculateFootprint({ ...values, transportMode, monthlyDistanceKm: 10 })
    expect(result?.transportationKg).toBeCloseTo(10 * factor)
  })
  it('calculates electricity using the CEA factor', () => expect(calculateFootprint(values)?.electricityKg).toBeCloseTo(71.17))
  it('calculates composting and landfill organic waste', () => {
    expect(calculateFootprint(values)?.wasteKg).toBeCloseTo(3.2)
    expect(calculateFootprint({ ...values, wasteTreatment: 'landfill' })?.wasteKg).toBeCloseTo(12.9)
  })
  it('calculates monthly and annual totals', () => {
    const result = calculateFootprint(values)
    expect(result?.monthlyTotalKg).toBeCloseTo(110.28)
    expect(result?.annualTotalKg).toBeCloseTo(1323.36)
  })
  it('handles all-zero inputs without invalid output', () => {
    expect(calculateFootprint({ ...values, monthlyDistanceKm: 0, monthlyKwh: 0, monthlyOrganicWasteKg: 0 })).toMatchObject({ monthlyTotalKg: 0, annualTotalKg: 0, percentages: { transportation: 0, electricity: 0, waste: 0 }, dominantCategory: null })
  })
  it('rejects negative and invalid input', () => {
    expect(calculateFootprint({ ...values, monthlyKwh: -1 })).toBeNull()
    expect(calculateFootprint({ ...values, monthlyKwh: Number.NaN })).toBeNull()
  })
  it('calculates percentages and the dominant category', () => {
    const result = calculateFootprint(values)
    expect(result?.percentages.electricity).toBeCloseTo((71.17 / 110.28) * 100)
    expect(result?.dominantCategory).toBe('electricity')
    expect(calculatePercentage(1, 0)).toBe(0)
    expect(getDominantCategory({ transportation: 2, electricity: 3, waste: 1 })).toBe('electricity')
  })
})
