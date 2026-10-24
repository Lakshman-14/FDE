import type { Encounter } from '../types'

interface PatientRowProps {
  encounter: Encounter
}

function PatientRow({ encounter }: PatientRowProps) {
  const status = encounter.intervention_status ?? encounter.status

  return (
    <tr>
      <td>
        <span className="encounter-id">#{encounter.encounter_id}</span>
        <span className="patient-id">Patient {encounter.patient_nbr}</span>
      </td>
      <td>{encounter.age ?? '—'}</td>
      <td>
        <span className={`risk-badge risk-badge--${encounter.risk_level.toLowerCase()}`}>
          {encounter.risk_level}
        </span>
      </td>
      <td>
        <span className="risk-score">{encounter.risk_score}</span>
        <span className="score-out-of">/ 8</span>
      </td>
      <td>{encounter.time_in_hospital ?? '—'} days</td>
      <td>{status ? status.replaceAll('_', ' ') : 'Not queued'}</td>
      <td>{encounter.readmitted ?? '—'}</td>
    </tr>
  )
}

export default PatientRow
