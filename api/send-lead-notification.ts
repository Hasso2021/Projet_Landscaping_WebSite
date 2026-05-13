import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

type LeadNotifyBody = {
  name?: string
  phone?: string
  email?: string | null
  company?: string | null
  interest_service?: string
  source?: string
  message?: string | null
  created_at?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function buildEmailText(body: LeadNotifyBody): string {
  const lines = [
    'New lead submitted from the website.',
    '',
    `Name: ${body.name ?? ''}`,
    `Phone: ${body.phone ?? ''}`,
    `Email: ${body.email && String(body.email).trim() ? body.email : '(not provided)'}`,
    `Company: ${body.company && String(body.company).trim() ? body.company : '(not provided)'}`,
    `Service / interest: ${body.interest_service ?? ''}`,
    `Source: ${body.source ?? ''}`,
    `Message: ${body.message && String(body.message).trim() ? body.message : '(not provided)'}`,
    `Submitted: ${body.created_at ?? '(unknown)'}`,
  ]
  return lines.join('\n')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    setCors(res)
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    setCors(res)
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  setCors(res)

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.OWNER_NOTIFICATION_EMAIL
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error('[send-lead-notification] missing RESEND_API_KEY, OWNER_NOTIFICATION_EMAIL, or RESEND_FROM_EMAIL')
    res.status(503).json({ error: 'Email notifications are not configured' })
    return
  }

  const raw = req.body
  const body: LeadNotifyBody = isRecord(raw) ? (raw as LeadNotifyBody) : {}

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const interest_service =
    typeof body.interest_service === 'string' ? body.interest_service.trim() : ''
  const source = typeof body.source === 'string' ? body.source.trim() : ''
  const created_at = typeof body.created_at === 'string' ? body.created_at.trim() : ''

  if (!name || !phone || !interest_service || !source || !created_at) {
    res.status(400).json({ error: 'Invalid payload: missing required fields' })
    return
  }

  const email = body.email == null || body.email === '' ? null : String(body.email).trim()
  const company = body.company == null || body.company === '' ? null : String(body.company).trim()
  const message = body.message == null || body.message === '' ? null : String(body.message).trim()

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: 'New landscaping lead from website',
      text: buildEmailText({
        name,
        phone,
        email,
        company,
        interest_service,
        source,
        message,
        created_at,
      }),
    })

    if (error) {
      console.error('[send-lead-notification] Resend error', error)
      res.status(502).json({ error: 'Failed to send notification email' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[send-lead-notification] unexpected error', err)
    res.status(500).json({ error: 'Internal error' })
  }
}
