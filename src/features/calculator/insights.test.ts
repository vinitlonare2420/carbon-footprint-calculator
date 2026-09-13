import { describe, expect, it } from 'vitest'
import { getDominantMessage, getRecommendations } from './insights'
import { FootprintResult } from './types'

const result: FootprintResult = { transportationKg: 10, electricityKg: 30, wasteKg: 5, monthlyTotalKg: 45, annualTotalKg: 540, percentages: { transportation: 22.22, electricity: 66.67, waste: 11.11 }, dominantCategory: 'electricity' }

describe('result insights', () => {
  it('creates a dominant-category interpretation', () => expect(getDominantMessage(result)).toBe('Electricity is your largest emission source, contributing approximately 67% of your monthly footprint.'))
  it('uses an all-zero interpretation without a dominant category', () => expect(getDominantMessage({ ...result, monthlyTotalKg: 0, dominantCategory: null })).toBe('No emissions were recorded for the activities entered.'))
  it.each(['transportation', 'electricity', 'waste'] as const)('provides constructive %s recommendations', (category) => expect(getRecommendations(category)).toHaveLength(3))
  it('does not recommend changes for an all-zero result', () => expect(getRecommendations(null)).toEqual([]))
})
