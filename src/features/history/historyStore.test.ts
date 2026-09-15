import { beforeEach, describe, expect, it } from 'vitest'
import { clearHistory, loadHistory, saveEntry } from './historyStore'
import { FootprintResult } from '../calculator/types'

const mockResult: FootprintResult = {
  monthlyTotalKg: 150,
  annualTotalKg: 1800,
  transportationKg: 50,
  electricityKg: 70,
  wasteKg: 30,
  percentages: {
    transportation: 33.3,
    electricity: 46.7,
    waste: 20,
  },
  dominantCategory: 'electricity',
}

describe('historyStore', () => {
  beforeEach(() => {
    clearHistory()
  })

  it('loads empty history initially', () => {
    expect(loadHistory()).toEqual([])
  })

  it('saves and loads entries', () => {
    const updated = saveEntry(mockResult)
    expect(updated).toHaveLength(1)
    expect(updated[0].monthlyTotalKg).toBe(150)
    expect(loadHistory()).toHaveLength(1)
  })

  it('clears history', () => {
    saveEntry(mockResult)
    clearHistory()
    expect(loadHistory()).toEqual([])
  })
})
