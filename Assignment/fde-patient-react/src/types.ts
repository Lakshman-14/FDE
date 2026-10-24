export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export type InterventionStatus =
  | 'PENDING_REVIEW'
  | 'ASSIGNED'
  | 'CONTACTED'
  | 'FOLLOW_UP_SCHEDULED'
  | 'CLOSED'

export interface Encounter {
  encounter_id: number
  patient_nbr: number
  age: string | null
  time_in_hospital: number | null
  number_inpatient: number | null
  number_emergency: number | null
  number_outpatient: number | null
  num_medications: number | null
  readmitted: '<30' | '>30' | 'NO' | null
  risk_score: number
  risk_level: RiskLevel
  review_reason: string | null
  intervention_id: number | null
  status: InterventionStatus | null
  intervention_status: InterventionStatus | null
  assigned_to: string | null
}

export interface PatientSearchFilters {
  patient_nbr: string
  risk_level: RiskLevel | ''
}
