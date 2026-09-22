import { FormEvent, useEffect, useState } from 'react'
import { calculateFootprint } from './calculations'
import { getDominantMessage, getRecommendations } from './insights'
import { CalculatorValues, FootprintResult } from './types'
import { CalculatorErrors, validateCalculator } from './validation'
import { EmissionsDonutChart } from '../charts/EmissionsDonutChart'
import { HistoryEntry, clearHistory, loadHistory, saveEntry } from '../history/historyStore'
import { ProgressDashboard } from '../history/ProgressDashboard'
import { ALL_BADGES, Badge, getEarnedBadgeIds } from '../badges/badges'
import { BadgePanel } from '../badges/BadgePanel'
import { MilestoneToast } from '../badges/MilestoneToast'

const initialValues: CalculatorValues = { transportMode: '', distance: '', electricity: '', wasteTreatment: '', waste: '' }
const labels = { transportation: 'Transportation', electricity: 'Electricity', waste: 'Organic waste' }
const formatKg = (value: number) => `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg CO2e`

type TextFieldProps = { id: 'distance' | 'electricity' | 'waste'; label: string; hint: string; unit: string; value: string; error?: string; onChange: (value: string) => void }
function TextField({ id, label, hint, unit, value, error, onChange }: TextFieldProps) {
  const errorId = `${id}-error`
  return <div className="field"><label htmlFor={id}>{label}</label><p className="field-hint" id={`${id}-hint`}>{hint}</p><div className="input-with-unit"><input id={id} name={id} type="number" inputMode="decimal" min="0" max="1000000" step="any" value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={`${id}-hint${error ? ` ${errorId}` : ''}`} /><span>{unit}</span></div>{error && <p className="field-error" id={errorId} role="alert">{error}</p>}</div>
}

function Results({ result, onRecalculate }: { result: FootprintResult; onRecalculate: () => void }) {
  const categoryValues = { transportation: result.transportationKg, electricity: result.electricityKg, waste: result.wasteKg }
  const categories = ['transportation', 'electricity', 'waste'] as const
  const recommendations = getRecommendations(result.dominantCategory)
  return (
    <section className="results" aria-labelledby="results-title" aria-live="polite" aria-atomic="true" tabIndex={-1}>
      <div className="results-summary">
        <div>
          <p className="eyebrow">Your monthly estimate</p>
          <h2 id="results-title">{formatKg(result.monthlyTotalKg)} <span>per month</span></h2>
          <p className="annual-total">Annual estimate: <strong>{formatKg(result.annualTotalKg)}</strong></p>
        </div>
        <p className="result-disclaimer">An educational estimate using the documented India-specific methodology.</p>
      </div>

      <div className="result-grid">
        {categories.map((category) => (
          <article key={category} className={`result-card ${category}`}>
            <span className="category-key" aria-hidden="true" />
            <h3>{labels[category]}</h3>
            <p>{formatKg(categoryValues[category])}</p>
            <span>{result.percentages[category].toFixed(1)}% of monthly total</span>
          </article>
        ))}
      </div>

      <section className="chart-section" aria-labelledby="chart-title">
        <div>
          <h3 id="chart-title">Interactive Emissions Breakdown</h3>
          <p>Explore individual categories or switch between donut and bar visualizations.</p>
        </div>
        <EmissionsDonutChart
          categoryValues={categoryValues}
          percentages={result.percentages}
          totalKg={result.monthlyTotalKg}
        />
      </section>

      <section className="insight-panel" aria-labelledby="insight-title">
        <p className="eyebrow">Key observation</p>
        <h3 id="insight-title">{getDominantMessage(result)}</h3>
      </section>

      {recommendations.length > 0 && (
        <section className="recommendations" aria-labelledby="recommendations-title">
          <p className="eyebrow">Practical next steps</p>
          <h3 id="recommendations-title">Ways to make progress</h3>
          <ul>
            {recommendations.map((recommendation) => (
              <li key={recommendation.title}>
                <strong>{recommendation.title}</strong>
                <span>{recommendation.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button className="button button-secondary" type="button" onClick={onRecalculate}>
        Calculate again <span aria-hidden="true">↗</span>
      </button>
    </section>
  )
}

export function CalculatorForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<CalculatorErrors>({})
  const [result, setResult] = useState<FootprintResult | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [newBadge, setNewBadge] = useState<Badge | null>(null)

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const update = (key: keyof CalculatorValues) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    setResult(null)
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateCalculator(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    if (!values.transportMode || !values.wasteTreatment) return

    const calculated = calculateFootprint({
      transportMode: values.transportMode,
      monthlyDistanceKm: Number(values.distance),
      monthlyKwh: Number(values.electricity),
      wasteTreatment: values.wasteTreatment,
      monthlyOrganicWasteKg: Number(values.waste),
    })
    setResult(calculated)

    if (calculated) {
      const prevEarnedIds = getEarnedBadgeIds(history)
      const updatedHistory = saveEntry(calculated)
      setHistory(updatedHistory)

      const newEarnedIds = getEarnedBadgeIds(updatedHistory)
      const justUnlockedId = newEarnedIds.find((id) => !prevEarnedIds.includes(id))
      if (justUnlockedId) {
        const badge = ALL_BADGES.find((b) => b.id === justUnlockedId)
        if (badge) setNewBadge(badge)
      }
    }
  }

  const resetResult = () => {
    setResult(null)
    const calculator = document.getElementById('calculator')
    if (calculator && typeof calculator.scrollIntoView === 'function') {
      calculator.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleClearHistory = () => {
    clearHistory()
    setHistory([])
  }

  return (
    <section className="calculator-section" id="calculator" aria-labelledby="calculator-title">
      <div className="calculator-heading">
        <p className="eyebrow">Your monthly profile</p>
        <h2 id="calculator-title">Tell us about a typical month.</h2>
        <p>Every field is required. Enter <strong>0</strong> where an activity does not apply.</p>
      </div>
      <form noValidate onSubmit={submit}>
        <fieldset>
          <legend>
            <span className="legend-number">01</span>
            <span>
              <strong>Transportation</strong>
              <small>How do you usually get around?</small>
            </span>
          </legend>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="transportMode">Main transport mode</label>
              <p className="field-hint" id="transportMode-hint">Select the mode you use most often.</p>
              <select id="transportMode" value={values.transportMode} onChange={(event) => update('transportMode')(event.target.value)} aria-invalid={Boolean(errors.transportMode)} aria-describedby={`transportMode-hint${errors.transportMode ? ' transportMode-error' : ''}`}>
                <option value="">Choose a mode</option>
                <option value="twoWheeler">Two-wheeler</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
              </select>
              {errors.transportMode && <p className="field-error" id="transportMode-error" role="alert">{errors.transportMode}</p>}
            </div>
            <TextField id="distance" label="Distance travelled per month" hint="Include your typical travel for one month." unit="km/month" value={values.distance} error={errors.distance} onChange={update('distance')} />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <span className="legend-number">02</span>
            <span>
              <strong>Electricity</strong>
              <small>Energy used at home</small>
            </span>
          </legend>
          <TextField id="electricity" label="Monthly electricity consumption" hint="Find this on a recent utility bill if available." unit="kWh/month" value={values.electricity} error={errors.electricity} onChange={update('electricity')} />
        </fieldset>

        <fieldset>
          <legend>
            <span className="legend-number">03</span>
            <span>
              <strong>Organic waste</strong>
              <small>Food and garden waste from your household</small>
            </span>
          </legend>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="wasteTreatment">Waste treatment</label>
              <p className="field-hint" id="wasteTreatment-hint">Choose how this organic waste is handled.</p>
              <select id="wasteTreatment" value={values.wasteTreatment} onChange={(event) => update('wasteTreatment')(event.target.value)} aria-invalid={Boolean(errors.wasteTreatment)} aria-describedby={`wasteTreatment-hint${errors.wasteTreatment ? ' wasteTreatment-error' : ''}`}>
                <option value="">Choose a treatment</option>
                <option value="composting"> Composting</option>
                <option value="landfill">Landfill</option>
              </select>
              {errors.wasteTreatment && <p className="field-error" id="wasteTreatment-error" role="alert">{errors.wasteTreatment}</p>}
            </div>
            <TextField id="waste" label="Monthly organic waste generated" hint="An approximate total is enough to get started." unit="kg/month" value={values.waste} error={errors.waste} onChange={update('waste')} />
          </div>
        </fieldset>

        <div className="form-action">
          <button className="button button-primary" type="submit">
            Calculate my footprint <span aria-hidden="true">→</span>
          </button>
          <p>Your result is an educational estimate using documented India-specific factors.</p>
        </div>
      </form>

      {result && <Results result={result} onRecalculate={resetResult} />}
      <ProgressDashboard history={history} onClearHistory={handleClearHistory} />
      <BadgePanel history={history} />
      {newBadge && <MilestoneToast badge={newBadge} onClose={() => setNewBadge(null)} />}
    </section>
  )
}
