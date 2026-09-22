import { useState } from 'react'
import { EmissionCategory } from '../calculator/types'

interface EmissionsChartProps {
  categoryValues: Record<EmissionCategory, number>
  percentages: Record<EmissionCategory, number>
  totalKg: number
}

const CATEGORY_COLORS: Record<EmissionCategory, string> = {
  transportation: '#e6c76d',
  electricity: '#83b9b0',
  waste: '#dc8e68',
}

const CATEGORY_LABELS: Record<EmissionCategory, string> = {
  transportation: 'Transportation',
  electricity: 'Electricity',
  waste: 'Organic Waste',
}

const categories: EmissionCategory[] = ['transportation', 'electricity', 'waste']

export function EmissionsDonutChart({ categoryValues, percentages, totalKg }: EmissionsChartProps) {
  const [activeCategory, setActiveCategory] = useState<EmissionCategory | null>(null)
  const [chartMode, setChartMode] = useState<'donut' | 'bar'>('donut')

  const radius = 64
  const strokeWidth = 24
  const circumference = 2 * Math.PI * radius

  let cumulativePercent = 0
  const segments = categories.map((cat) => {
    const pct = percentages[cat] || 0
    const strokeDasharray = `${(pct / 100) * circumference} ${circumference}`
    const strokeDashoffset = -((cumulativePercent / 100) * circumference)
    cumulativePercent += pct
    return {
      category: cat,
      pct,
      strokeDasharray,
      strokeDashoffset,
      color: CATEGORY_COLORS[cat],
      label: CATEGORY_LABELS[cat],
      valKg: categoryValues[cat] || 0,
    }
  })

  return (
    <div className="interactive-chart-container">
      <div className="chart-controls">
        <div className="view-toggle" role="group" aria-label="Chart display type">
          <button
            type="button"
            className={`toggle-btn ${chartMode === 'donut' ? 'active' : ''}`}
            onClick={() => setChartMode('donut')}
            aria-pressed={chartMode === 'donut'}
          >
            Donut View
          </button>
          <button
            type="button"
            className={`toggle-btn ${chartMode === 'bar' ? 'active' : ''}`}
            onClick={() => setChartMode('bar')}
            aria-pressed={chartMode === 'bar'}
          >
            Bar View
          </button>
        </div>
      </div>

      {chartMode === 'donut' ? (
        <div className="donut-chart-wrapper">
          <svg
            className="donut-svg"
            viewBox="0 0 180 180"
            role="img"
            aria-label={`Monthly emission contribution chart: ${segments.map((s) => `${s.label} ${s.pct.toFixed(1)}%`).join(', ')}`}
          >
            <circle
              cx="90"
              cy="90"
              r={radius}
              className="donut-bg"
              strokeWidth={strokeWidth}
            />
            {segments.map((seg) => {
              if (seg.pct <= 0) return null
              const isHovered = activeCategory === seg.category
              return (
                <circle
                  key={seg.category}
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  className={`donut-segment ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => setActiveCategory(seg.category)}
                  onMouseLeave={() => setActiveCategory(null)}
                  onFocus={() => setActiveCategory(seg.category)}
                  onBlur={() => setActiveCategory(null)}
                  tabIndex={0}
                  role="graphics-symbol"
                  aria-label={`${seg.label}: ${seg.pct.toFixed(1)}% (${seg.valKg.toFixed(1)} kg CO2e)`}
                >
                  <title>{`${seg.label}: ${seg.pct.toFixed(1)}% (${seg.valKg.toFixed(1)} kg CO2e)`}</title>
                </circle>
              )
            })}
            <g className="donut-center-text">
              <text x="90" y="84" textAnchor="middle" className="center-value">
                {activeCategory
                  ? `${percentages[activeCategory].toFixed(1)}%`
                  : totalKg.toFixed(0)}
              </text>
              <text x="90" y="102" textAnchor="middle" className="center-unit">
                {activeCategory
                  ? CATEGORY_LABELS[activeCategory]
                  : 'kg CO₂e/mo'}
              </text>
            </g>
          </svg>
        </div>
      ) : (
        <div className="bar-breakdown-wrapper" role="region" aria-label="Emissions breakdown bars">
          {segments.map((seg) => (
            <div
              key={seg.category}
              className={`bar-row ${activeCategory === seg.category ? 'active' : ''}`}
              onMouseEnter={() => setActiveCategory(seg.category)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="bar-row-label">
                <span className="dot" style={{ backgroundColor: seg.color }} />
                <span>{seg.label}</span>
                <span className="bar-val">{seg.valKg.toFixed(1)} kg ({seg.pct.toFixed(1)}%)</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${Math.max(seg.pct, 2)}%`,
                    backgroundColor: seg.color,
                }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <ul className="chart-legend-interactive">
        {segments.map((seg) => (
          <li
            key={seg.category}
            className={`legend-item ${activeCategory === seg.category ? 'active' : ''}`}
            onMouseEnter={() => setActiveCategory(seg.category)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <span className="category-dot" style={{ backgroundColor: seg.color }} />
            <span className="legend-name">{seg.label}</span>
            <strong className="legend-pct">{seg.pct.toFixed(1)}%</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
