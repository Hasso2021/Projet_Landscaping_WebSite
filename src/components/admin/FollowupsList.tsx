import { useCallback, useEffect, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { FollowupRow, FollowupStatus } from '@/types/leads'
import { FOLLOWUP_STATUSES } from '@/types/leads'

type FollowupsListProps = {
  leadId: string
}

function formatSentAt(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm outline-none focus:border-[#2f7a2f] focus:ring-2 focus:ring-[#2f7a2f]/20'

export function FollowupsList({ leadId }: FollowupsListProps) {
  const [rows, setRows] = useState<FollowupRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<FollowupStatus>('pending')
  const [template, setTemplate] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: qError } = await supabase
      .from('followups')
      .select('*')
      .eq('lead_id', leadId)
      .order('sent_at', { ascending: false })

    if (qError) {
      setError(qError.message || 'Could not load follow-ups.')
      setRows([])
    } else {
      setRows((data ?? []) as FollowupRow[])
    }
    setLoading(false)
  }, [leadId])

  useEffect(() => {
    const id = window.setTimeout(() => {
      void load()
    }, 0)
    return () => window.clearTimeout(id)
  }, [load])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (saving) return
    setSaving(true)
    setSaveError(null)

    const { error: insertError } = await supabase.from('followups').insert({
      lead_id: leadId,
      sent_at: new Date().toISOString(),
      template: template.trim() || null,
      status,
    })

    if (insertError) {
      setSaveError(insertError.message || 'Failed to save follow-up.')
      setSaving(false)
      return
    }

    setTemplate('')
    setStatus('pending')
    await load()
    setSaving(false)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900">Follow-ups</h3>

      {loading ? (
        <p className="text-sm text-slate-500">Loading follow-ups…</p>
      ) : error ? (
        <p className="text-sm text-red-700">{error}</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate-500">No follow-ups logged yet.</p>
      ) : (
        <ul className="max-h-48 space-y-2 overflow-y-auto text-sm">
          {rows.map((f) => (
            <li key={f.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium capitalize text-[#2f7a2f]">{f.status}</span>
                <span className="text-xs text-slate-500">{formatSentAt(f.sent_at)}</span>
              </div>
              {f.template ? <p className="mt-1 text-slate-700">{f.template}</p> : null}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
        <div className="space-y-1">
          <label htmlFor="fu-status" className="text-xs font-medium text-slate-600">
            Status
          </label>
          <select
            id="fu-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as FollowupStatus)}
            className={inputClass}
          >
            {FOLLOWUP_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="fu-template" className="text-xs font-medium text-slate-600">
            Template / note
          </label>
          <textarea
            id="fu-template"
            rows={3}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className={inputClass}
            placeholder="e.g. Called — left voicemail"
          />
        </div>
        {saveError ? <p className="text-xs text-red-700">{saveError}</p> : null}
        <Button
          type="submit"
          disabled={saving}
          className="h-9 w-full bg-[#2f7a2f] text-white hover:bg-[#265f26] sm:w-auto"
        >
          {saving ? 'Saving…' : 'Add follow-up'}
        </Button>
      </form>
    </div>
  )
}
