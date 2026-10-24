import type { Encounter } from '../types'
import PatientRow from './PatientRow'

interface PatientTableProps {
  encounters: Encounter[]
  loading: boolean
  error: string | null
}

function PatientTable({ encounters, loading, error }: PatientTableProps) {
  if (loading) {
    return <div className="table-message" role="status">Loading patient encounters…</div>
  }

  if (error) {
    return <div className="table-message table-message--error" role="alert">{error}</div>
  }

  if (encounters.length === 0) {
    return <div className="table-message">No encounters match these filters.</div>
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th scope="col">Encounter / Patient</th>
            <th scope="col">Age</th>
            <th scope="col">Risk level</th>
            <th scope="col">Score</th>
            <th scope="col">Stay</th>
            <th scope="col">Intervention status</th>
            <th scope="col">Readmitted</th>
          </tr>
        </thead>
        <tbody>
          {encounters.map((encounter) => (
            <PatientRow key={encounter.encounter_id} encounter={encounter} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PatientTable
