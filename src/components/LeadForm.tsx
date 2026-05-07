import { type FormEvent, useState } from 'react'
import { Building2, Mail, MessageSquareText, Phone, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

type LeadSource = 'Google' | 'Referral' | 'Other'
type ServiceType =
  | 'Lawn Mowing'
  | 'Hedge Cutting'
  | 'Garden Clean-Ups'
  | 'Planting & Maintenance'
  | 'Power Washing'
  | 'Waste Removal'

type LeadFormData = {
  name: string
  email: string
  phone: string
  company: string
  contactReason: ServiceType
  details: string
}

type LeadFormErrors = {
  name?: string
  email?: string
  phone?: string
}

type LeadInsertPayload = {
  name: string
  email: string
  phone: string | null
  source: LeadSource
  interest: string | null
  note: string
  created_at: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SERVICE_OPTIONS: ServiceType[] = [
  'Lawn Mowing',
  'Hedge Cutting',
  'Garden Clean-Ups',
  'Planting & Maintenance',
  'Power Washing',
  'Waste Removal',
]

const INITIAL_FORM_DATA: LeadFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  contactReason: 'Lawn Mowing',
  details: '',
}

function controlClassName(invalid: boolean) {
  return cn(
    'w-full border-0 border-b bg-transparent px-0 py-2.5 text-sm text-foreground transition-[color,border-color]',
    'rounded-none outline-none placeholder:text-muted-foreground',
    'focus-visible:border-[#2f7a2f]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    invalid ? 'border-destructive' : 'border-slate-300 hover:border-slate-400'
  )
}

function toLeadPayload(data: LeadFormData): LeadInsertPayload {
  const trimmedDetails = data.details.trim()
  const company = data.company.trim()
  const noteLines = [
    `Contact reason: ${data.contactReason}`,
    `Company: ${company || 'Not provided'}`,
    `Details: ${trimmedDetails || 'No additional details provided'}`,
  ]

  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim() || null,
    source: 'Other',
    interest: data.contactReason,
    note: noteLines.join('\n'),
    created_at: new Date().toISOString(),
  }
}

function mapSubmitError(error: { code?: string | null; message: string }): string {
  if (error.code === '42501') {
    return 'Permission denied by Supabase policy. Please check RLS insert policy for leads.'
  }

  if (error.code === '23505') {
    return 'This lead already exists.'
  }

  return `Unable to submit right now: ${error.message}`
}

export function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<LeadFormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const clearStatus = () => {
    setIsSubmitted(false)
    setSubmitError(null)
  }

  const validate = (data: LeadFormData): LeadFormErrors => {
    const nextErrors: LeadFormErrors = {}

    if (!data.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!data.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!data.phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const validationErrors = validate(formData)

    setErrors(validationErrors)
    setIsSubmitted(false)
    setSubmitError(null)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const payload = toLeadPayload(formData)
      const { error } = await supabase.from('leads').insert(payload)

      if (error) {
        setSubmitError(mapSubmitError(error))
        return
      }

      setIsSubmitted(true)
      setFormData(INITIAL_FORM_DATA)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unexpected error while submitting.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full rounded-lg border border-slate-300 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-4xl font-semibold tracking-tight text-[#1e2a57]">Get in Touch Today</h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
        <aside className="space-y-6 border-slate-200 lg:border-r lg:pr-8">
          <div>
            <p className="text-2xl font-semibold text-[#3e61b6]">Dublin Office</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              Unit 4-5, The Capel Building,
              <br />
              Mary's Abbey, North City,
              <br />
              Dublin 7, D07 Y318.
            </p>
          </div>

          <div className="space-y-3 text-lg text-slate-700">
            <p>
              <span className="font-semibold text-[#3e61b6]">E:</span> info@mdllandscapemaintenance.ie
            </p>
            <p>
              <span className="font-semibold text-[#3e61b6]">T:</span> (01) 889 9100
            </p>
          </div>
        </aside>

        <form className="space-y-7" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium leading-none">
                <User className="size-4 shrink-0 text-slate-500" aria-hidden />
                Full Name*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(event) => {
                  clearStatus()
                  setFormData((prev) => ({ ...prev, name: event.target.value }))
                  setErrors((prev) => ({ ...prev, name: undefined }))
                }}
                className={controlClassName(Boolean(errors.name))}
                placeholder="John Doe"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name ? (
                <p id="name-error" className="text-sm text-destructive" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium leading-none">
                <Mail className="size-4 shrink-0 text-slate-500" aria-hidden />
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(event) => {
                  clearStatus()
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                  setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                className={controlClassName(Boolean(errors.email))}
                placeholder="you@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? (
                <p id="email-error" className="text-sm text-destructive" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium leading-none">
                <Phone className="size-4 shrink-0 text-slate-500" aria-hidden />
                Phone Number*
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(event) => {
                  clearStatus()
                  setFormData((prev) => ({ ...prev, phone: event.target.value }))
                  setErrors((prev) => ({ ...prev, phone: undefined }))
                }}
                className={controlClassName(Boolean(errors.phone))}
                placeholder="+1 555 010 2030"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone ? (
                <p id="phone-error" className="text-sm text-destructive" role="alert">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium leading-none">
                <Building2 className="size-4 shrink-0 text-slate-500" aria-hidden />
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={(event) => {
                  clearStatus()
                  setFormData((prev) => ({ ...prev, company: event.target.value }))
                }}
                className={controlClassName(false)}
                placeholder="Your company"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contactReason" className="flex items-center gap-2 text-sm font-medium leading-none">
              <MessageSquareText className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              Select Contact Reason
            </label>
            <div className="relative">
              <select
                id="contactReason"
                name="contactReason"
                value={formData.contactReason}
                onChange={(event) => {
                  clearStatus()
                  setFormData((prev) => ({ ...prev, contactReason: event.target.value as ServiceType }))
                }}
                className={cn(
                  controlClassName(false),
                  'h-11 cursor-pointer appearance-none rounded-md border border-[#3e61b6] bg-[#4d73cf] px-4 py-0 font-medium text-white'
                )}
              >
                {SERVICE_OPTIONS.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center text-white"
                aria-hidden
              >
                <svg className="size-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="details" className="flex items-center gap-2 text-sm font-medium leading-none">
              <MessageSquareText className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              Details*
            </label>
            <textarea
              id="details"
              name="details"
              rows={5}
              value={formData.details}
              onChange={(event) => {
                clearStatus()
                setFormData((prev) => ({ ...prev, details: event.target.value }))
              }}
              className={cn(controlClassName(false), 'min-h-[8rem] resize-y')}
              placeholder="Tell us more about your request."
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="submit"
              size="lg"
              className="w-full min-w-[10rem] bg-[#2f7a2f] text-white hover:bg-[#265f26] sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            {isSubmitted ? (
              <p
                className="text-center text-sm font-medium text-emerald-600 sm:text-left dark:text-emerald-400"
                role="status"
              >
                Thanks — we have received your information.
              </p>
            ) : submitError ? (
              <p className="text-center text-sm font-medium text-destructive sm:text-left" role="alert">
                {submitError}
              </p>
            ) : (
              <p className="text-center text-xs text-muted-foreground sm:text-left">
                We respect your privacy and only use this to respond to your request.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
