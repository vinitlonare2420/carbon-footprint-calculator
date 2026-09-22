import { useState } from 'react'
import { HistoryEntry } from './historyStore'

interface ProgressDashboardProps {
  history: HistoryEntry[]
  onClearHistory: () => void
}

export function ProgressDashboard({ history, onClearHistory }: ProgressDashboardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)

  if (!history || history.length < 2) {
    return (
      <section className="progress-dashboard empty" aria-labelledby="progress-title">
        <p className="eyebrow">Long-Term Tracking</p>
        <h2 id="progress-title">Your Progress Over Time</h2>
        <p className="empty-hint">
          Log at least 2 estimates to unlock your emissions trend line and see how your reduction efforts pay off!
        </p>
      </section>
    )
  }

  const first = history[0]
  const latest = history[history.length - 1]
  const diff = first.monthlyTotalKg - latest.monthlyTotalKg
  const percentChange = first.monthlyTotalKg > 0 ? (diff / first.monthlyTotalKg) * 100 : 0

  const height = 150
  const width = 500
  const padding = 30
  const values = history.map((d) => d.monthlyTotalKg)
  const max = Math.max(...values) * 1.1 || 1
  const min = Math.max(0, Math.min(...values) * 0.9)

  const points = history.map((entry, index) => {
    const x = padding + (index / (history.length - 1)) * (width - 2 * padding)
    const y = height - padding - ((entry.monthlyTotalKg - min) / (max - min || 1)) * (height - 2 * padding)
    return { x, y, entry }
  })

  const polylinePath = points.map((p) => `${p.x},${p.y}`).join(' ')
  const areaPath = `${points[0].x},${height - padding} ${polylinePath} ${points[points.length - 1].x},${height - padding}`

  return (
    <section className="progress-dashboard" aria-labelledby="progress-title">
      <div className="progress-header">
        <div>
          <p className="eyebrow">Long-Term Tracking</p>
          <h2 id="progress-title">Your Footprint Trend</h2>
        </div>
        <div className="progress-stat">
          {diff >= 0 ? (
            <span className="stat-value good">
              &#8595; {percentChange.toFixed(1)}% reduction
            </span>
          ) : (
            <span className="stat-value warn">
              &#8593; +{Math.abs(percentChange).toFixed(1)}% increase
            </span>
          )}
          <small className="stat-label">vs baseline ({first.monthlyTotalKg.toFixed(0)} kg)</small>
        </div>
      </div>

      <div className="trend-chart-container">
        <svg
          className="trend-svg"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Trend chart over time"
        >
          <line
            x1={padding}
            y1={padding}
            x2={width - padding}
            y2={padding}
            className="grid-line"
          / >
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            className="grid-line"
          / >

          <polygon points={areaPath} className="trend-area" / >
          <polyline points={polylinePath} className="trend-line" / >

          {points.map((p, i) => {
            const isActive = activeIndex === i
            return (
              <g key={p.entry.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 7 : 4.5}
                  className={`trend-point ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  aria-label={`${p.entry.date}: ${p.entry.monthlyTotalKg.toFixed(0)} kg CO2e`}
              >
                <title>{`${p.entry.date}: ${p.entry.monthlyTotalKg.toFixed(0)} kg CO2e`}</title>
              </circle>
            </g>
          )
        })}
        </svg>

        <div className="trend-tooltip">
          {activeIndex !== null ? (
            <span>
              <strong>{history[activeIndex].date}:</strong> {history[activeIndex].monthlyTotalKg.toFixed(1)} kg CO₂
            </span>
          ) : (
            <span className="tooltip-hint">Hover over dots to inspect past records</span>
          )}
        </div>
      </div>

      <div className="progress-footer">
        <button
          type="button"
          className="btn-toggle"
          onClick={() => setShowTable((prev) => !prev)}
        >
          {showTable ? '▾ Hide log history' : '▸ View log history table'}
        </button>

        <button
          type="button"
          className="btn-clear"
          onClick={onClearHistory}
        >
          Clear history
        </button>
      </div>

      {showTable && (
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total</th>
                <th>Transport</th>
                <th>Energy</th>
                <th>Waste</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td><strong>{entry.monthlyTotalKg.toFixed(1)} kg</strong></td>
                  <td>{entry.transportationKg.toFixed(1)} kg</td>
                  <td>{entry.electricityKg.toFixed(1)} kg</td>
                  <td>{entry.wasteKg.toFixed(1)} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
