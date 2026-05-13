export type LeadRow = {
  id: string
  created_at: string
  name: string
  email: string | null
  phone: string
  source: string
  interest_service: string
  message: string | null
  assigned_to: string | null
  company: string | null
}

export type FollowupRow = {
  id: string
  lead_id: string
  sent_at: string
  template: string | null
  status: string
}

export const FOLLOWUP_STATUSES = ['pending', 'contacted', 'completed'] as const
export type FollowupStatus = (typeof FOLLOWUP_STATUSES)[number]

export const LEAD_SOURCES = ['online', 'referral', 'other'] as const

export const INTEREST_SERVICE_OPTIONS = [
  'Lawn Mowing',
  'Hedge Cutting',
  'Garden Clean-Ups',
  'Planting & Maintenance',
  'Power Washing',
  'Waste Removal',
] as const
