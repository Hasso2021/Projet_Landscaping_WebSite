export type NewLeadNotifyPayload = {
  name: string
  phone: string
  email: string | null
  company: string | null
  interest_service: string
  source: string
  message: string | null
  created_at: string
}

/**
 * Fire-and-forget: lead is already persisted. Failures are logged only.
 * Uses same-origin `/api/send-lead-notification` on Vercel, or override with VITE_LEAD_NOTIFICATION_URL.
 */
export async function notifyOwnerOfNewLead(payload: NewLeadNotifyPayload): Promise<void> {
  const base = import.meta.env.VITE_LEAD_NOTIFICATION_URL as string | undefined
  const url = (base && base.trim()) || '/api/send-lead-notification'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const raw = await response.text()
    const looksLikeJson = raw.trimStart().startsWith('{')

    if (!response.ok) {
      console.warn('[lead-notify] request failed', response.status, raw.slice(0, 500))
      return
    }

    if (!looksLikeJson) {
      console.warn(
        '[lead-notify] response was not JSON — the request likely did not hit the Vercel API. ' +
          'On local dev, set VITE_DEV_NOTIFY_API_ORIGIN in .env (see .env.example) or VITE_LEAD_NOTIFICATION_URL to your deployed API URL.',
        raw.slice(0, 120)
      )
      return
    }

    try {
      const data = JSON.parse(raw) as { ok?: boolean; error?: string }
      if (data.error) {
        console.warn('[lead-notify] API returned error', data.error)
      }
    } catch {
      console.warn('[lead-notify] could not parse JSON body', raw.slice(0, 200))
    }
  } catch (err) {
    console.warn('[lead-notify] network error', err)
  }
}
