import { ALL_BADGES, isBadgeEarned } from './badges'
import { HistoryEntry } from '../history/historyStore'

interface BadgePanelProps {
  history: HistoryEntry[]
}

export function BadgePanel({ history }: BadgePanelProps) {
  const earnedCount = ALL_BADGES.filter((b) => isBadgeEarned(b.id, history)).length

  return (
    <section className="badges-section" aria-labelledby="badges-title">
      <div className="badges-header">
        <div>
          <p className="eyebrow">Achievements & Impact</p>
          <h2 id="badges-title">Your Milestones</h2>
        </div>
        <div className="badge-score">
          {earnedCount} / {ALL_BADGES.length} Unlocked
        </div>
      </div>

      <div className="badges-grid" role="list" aria-label="Achievement Badges">
        {ALL_BADGES.map((badge) => {
          const earned = isBadgeEarned(badge.id, history)
          return (
            <div
              key={badge.id}
              className={`badge-card ${earned ? 'earned' : 'locked'}`}
              role="listitem"
              aria-label={`${badge.title} badge: ${earned ? 'Unlocked' : 'Locked'}`}
            >
              <div className="badge-icon" aria-hidden="true">
                {earned ? badge.icon : '🔒'}
              </div>
              <div className="badge-info">
                <h4>{badge.title}</h4>
                <p>{badge.description}</p>
                <span className={`badge-status ${earned ? 'earned' : 'locked'}`}>
                  {earned ? '✓ Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
