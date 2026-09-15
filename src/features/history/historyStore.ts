import { FootprintResult } from '../calculator/types'

export interface HistoryEntry {
  id: string
  date: string
  monthlyTotalKg: number
  annualTotalKg: number
  transportationKg: number
  electricityKg: number
  wasteKg: number
}

const STORAGE_KEY = 'terratrack_history'
const MAX_ENTRIES = 24

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed
    }
    return []
  } catch {
    return []
  }
}

export function saveEntry(result: FootprintResult): HistoryEntry[] {
  const current = loadHistory()
  const newEntry: HistoryEntry = {
    id: 'entry-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    monthlyTotalKg: result.monthlyTotalKg,
    annualTotalKg: result.annualTotalKg,
    transportationKg: result.transportationKg,
    electricityKg: result.electricityKg,
    wasteKg: result.wasteKg,
  }

  const updated = [...current, newEntry].slice(-MAX_ENTRIES)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to save to localStorage:', err)
  }
  return updated
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Failed to clear history:', err)
  }
}