import { HistoryEntry } from '../history/historyStore'

export interface Badge {
  id: string
  icon: string
  title: string
  description: string
  category: 'milestone' | 'reduction' | 'streak'
}

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_step',
    icon: '🌱',
    title: 'First Step',
    description: 'Calculate and record your initial carbon footprint.',
    category: 'milestone',
  },
  {
    id: 'trending_down',
    icon: '📉',
    title: 'Trending Down',
    description: 'Recorded 2 or more logs and reduced monthly footprint from your baseline.',
    category: 'reduction',
  },
  {
    id: 'ten_percent',
    icon: '🏅',
    title: '10% Lighter',
    description: 'Latest monthly footprint is 10% lower than your baseline.',
    category: 'reduction',
  },
  {
    id: 'twenty_five_percent',
    icon: '🥇',
    title: '25% Lighter',
    description: 'Latest monthly footprint is 25% lower than your baseline.',
    category: 'reduction',
  },
  {
    id: 'saved_100kg',
    icon: '🌍',
    title: 'Saved 100 kg CO₂',
    description: 'Cut at least 100 kg CO₂e compared to your baseline entry.',
    category: 'milestone',
  },
  {
    id: 'saved_1ton',
    icon: '💚',
    title: 'Saved 1 Ton CO₂!',
    description: 'Cut at least 1,000 kg CO₂e in cumulative reductions vs baseline.',
    category: 'milestone',
  },
]

export function isBadgeEarned(badgeId: string, history: HistoryEntry[]): boolean {
  if (!history || history.length === 0) return false

  const baseline = history[0]
  const latest = history[history.length - 1]

  switch (badgeId) {
    case 'first_step':
      return history.length >= 1

    case 'trending_down':
      return history.length >= 2 && latest.monthlyTotalKg < baseline.monthlyTotalKg

    case 'ten_percent':
      return (
        history.length >= 2 &&
        latest.monthlyTotalKg <= baseline.monthlyTotalKg * 0.9 &&
        baseline.monthlyTotalKg > 0
      )

    case 'twenty_five_percent':
      return (
        history.length >= 2 &&
        latest.monthlyTotalKg <= baseline.monthlyTotalKg * 0.75 &&
        baseline.monthlyTotalKg > 0
      )

    case 'saved_100kg': {
      if (history.length < 2) return false
      const maxMonthlySaved = baseline.monthlyTotalKg - latest.monthlyTotalKg
      return maxMonthlySaved >= 100
    }

    case 'saved_1ton': {
      if (history.length < 2) return false
      const totalSaved = history.slice(1).reduce((acc, entry) => {
        const diff = baseline.monthlyTotalKg - entry.monthlyTotalKg
        return acc + (diff > 0 ? diff : 0)
      }, 0)
      return totalSaved >= 1000
    }

    default:
      return false
  }
}

export function getEarnedBadgeIds(history: HistoryEntry[]): string[] {
  return ALL_BADGES.filter((b) => isBadgeEarned(b.id, history)).map((b) => b.id)
}