import { describe, expect, it } from 'vitest'
import { getEarnedBadgeIds, isBadgeEarned } from './badges'
import { HistoryEntry } from '../history/historyStore'

const createEntry = (kg: number): HistoryEntry => ({
  id: Math.random().toString(),
  date: 'Test Date',
  monthlyTotalKg: kg,
  annualTotalKg: kg * 12,
  transportationKg: kg / 3,
  electricityKg: kg / 3,
  wasteKg: kg / 3,
})

describe('badges', () => {
  it('earns first_step badge on first calculation', () => {
    expect(isBadgeEarned('first_step', [])).toBe(false)
    expect(isBadgeEarned('first_step', [createEntry(200)])).toBe(true)
  })

  it('earns trending_down and ten_percent badges when reduced', () => {
    const history = [createEntry(200), createEntry(170)]
    expect(isBadgeEarned('trending_down', history)).toBe(true)
    expect(isBadgeEarned('ten_percent', history)).toBe(true)
    expect(isBadgeEarned('twenty_five_percent', history)).toBe(false)
  })

  it('earns saved_100kg badge when drop exceeds 100kg', () => {
    const history = [createEntry(300), createEntry(180)]
    expect(isBadgeEarned('saved_100kg', history)).toBe(true)
  })

  it('retrieves all earned badge ids', () => {
    const history = [createEntry(200)]
    expect(getEarnedBadgeIds(history)).toEqual(['first_step'])
  })
})
