import { useEffect, useState } from 'react'
import Header from './components/Header'
import PatientTable from './components/PatientTable'
import type { Encounter, PatientSearchFilters, RiskLevel } from './types'
import './App.css'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000').replace(/\/$/, '')

const initialFilters: PatientSearchFilters = {
  patient_nbr: '',
  risk_level: '',
}

function App() {
  const [filters, setFilters] = useState<PatientSearchFilters>(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState<PatientSearchFilters>(initialFilters)
  const [encounters, setEncounters] = useState<Encounter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiOnline, setApiOnline] = useState<boolean | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({ limit: '100', offset: '0' })
    if (appliedFilters.patient_nbr) params.set('patient_nbr', appliedFilters.patient_nbr)
    if (appliedFilters.risk_level) params.set('risk_level', appliedFilters.risk_level)

    async function loadEncounters() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}/patients/search?${params}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })

        if (!response.ok) {
          const body = await response.json().catch(() => null) as { detail?: string } | null
          throw new Error(body?.detail ?? `Patient search failed (${response.status})`)
        }

        const data: Encounter[] = await response.json()
        setEncounters(data)
        setApiOnline(true)
      } catch (requestError) {
        if (controller.signal.aborted) return
        setEncounters([])
        setApiOnline(false)
        setError(requestError instanceof Error ? requestError.message : 'Unable to load patient encounters.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadEncounters()
    return () => controller.abort()
  }, [appliedFilters])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAppliedFilters(filters)
  }

  function handleRiskChange(value: string) {
    setFilters((current) => ({ ...current, risk_level: value as RiskLevel | '' }))
  }

  function handleReset() {
    setFilters(initialFilters)
    setAppliedFilters(initialFilters)
  }

  return (
    <div className="app-shell">
      <Header apiOnline={apiOnline} />
      <main className="page-content">
        <section className="page-intro">
          <p className="eyebrow">PATIENT MANAGEMENT</p>
          <h1>Patient encounters</h1>
          <p className="intro-copy">Search diabetes encounters and review their readmission risk and care intervention status.</p>
        </section>

        <section className="summary-row" aria-label="Search results summary">
          <div className="summary-card">
            <span className="summary-label">Showing encounters</span>
            <strong>{loading ? '…' : encounters.length}</strong>
          </div>
          <div className="summary-card summary-card--muted">
            <span className="summary-label">Result limit</span>
            <strong>100</strong>
          </div>
          <div className="summary-note">
            Risk scores use illustrative rules and are not clinically validated.
          </div>
        </section>

        <section className="content-card">
          <div className="card-heading">
            <div>
              <h2>Search patients</h2>
              <p>Filter by patient number or risk category.</p>
            </div>
          </div>
          <form className="filter-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Patient number</span>
              <input
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="e.g. 84002391"
                value={filters.patient_nbr}
                onChange={(event) => setFilters((current) => ({ ...current, patient_nbr: event.target.value }))}
              />
            </label>
            <label className="field">
              <span>Risk level</span>
              <select value={filters.risk_level} onChange={(event) => handleRiskChange(event.target.value)}>
                <option value="">All risk levels</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </label>
            <div className="filter-actions">
              <button className="button button--primary" type="submit" disabled={loading}>
                Search patients
              </button>
              <button className="button button--secondary" type="button" onClick={handleReset} disabled={loading}>
                Clear
              </button>
            </div>
          </form>
        </section>

        <section className="content-card results-card">
          <div className="card-heading results-heading">
            <div>
              <h2>Encounter results</h2>
              <p>{loading ? 'Fetching results from the patient API…' : `${encounters.length} encounter${encounters.length === 1 ? '' : 's'} on this page`}</p>
            </div>
            <span className="results-limit">Up to 100 per search</span>
          </div>
          <PatientTable encounters={encounters} loading={loading} error={error} />
        </section>
      </main>
      <footer className="app-footer">
        Educational prototype · Historical readmission outcome is not used to calculate risk.
      </footer>
    </div>
  )
}

export default App
