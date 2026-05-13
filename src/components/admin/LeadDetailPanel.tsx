import { Mail, Phone, X } from 'lucide-react'

import { FollowupsList } from '@/components/admin/FollowupsList'
import { Button } from '@/components/ui/button'
import { phoneToTelHref, phoneToWhatsAppUrl } from '@/lib/phoneLinks'
import type { LeadRow } from '@/types/leads'

type LeadDetailPanelProps = {
  lead: LeadRow
  onClose: () => void
}

function formatDetailDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'full',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

const WA_PREFILL = 'Hi, following up regarding your landscaping enquiry.'

export function LeadDetailPanel({ lead, onClose }: LeadDetailPanelProps) {
  const tel = phoneToTelHref(lead.phone)
  const wa = phoneToWhatsAppUrl(lead.phone, WA_PREFILL)
  const hasEmail = Boolean(lead.email?.trim())

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/40"
        aria-label="Close detail panel"
        onClick={onClose}
      />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-2 border-b border-slate-200 bg-[#0b2d16] px-4 py-3 text-white">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-200/90">Lead</p>
            <h2 className="truncate text-lg font-bold">{lead.name}</h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-9 shrink-0 text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="flex flex-wrap gap-2">
            <a
              href={tel}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#2f7a2f] px-3 text-sm font-semibold text-white hover:bg-[#265f26]"
            >
              <Phone className="size-4" />
              Call
            </a>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-md bg-[#25D366] px-3 text-sm font-semibold text-white hover:bg-[#20bd5a]"
              >
                WhatsApp
              </a>
            ) : null}
            {hasEmail ? (
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <Mail className="size-4 text-[#2f7a2f]" />
                Email
              </a>
            ) : null}
          </div>

          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</dt>
              <dd className="mt-0.5 text-slate-900">{lead.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
              <dd className="mt-0.5 break-all text-slate-900">{lead.email ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company</dt>
              <dd className="mt-0.5 text-slate-900">{lead.company?.trim() || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Source</dt>
              <dd className="mt-0.5 text-slate-900">{lead.source}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Service / interest</dt>
              <dd className="mt-0.5 text-slate-900">{lead.interest_service}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Message</dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-slate-700">{lead.message?.trim() || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Created</dt>
              <dd className="mt-0.5 text-slate-900">{formatDetailDate(lead.created_at)}</dd>
            </div>
            {lead.assigned_to ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Assigned to</dt>
                <dd className="mt-0.5 font-mono text-xs text-slate-700">{lead.assigned_to}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <FollowupsList leadId={lead.id} />
          </div>
        </div>
      </aside>
    </>
  )
}
