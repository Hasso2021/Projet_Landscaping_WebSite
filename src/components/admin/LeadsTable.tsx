import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { LeadRow } from '@/types/leads'
import { INTEREST_SERVICE_OPTIONS, LEAD_SOURCES } from '@/types/leads'

export type LeadsFiltersState = {
  search: string
  source: string
  interest: string
  dateFrom: string
  dateTo: string
}

type LeadsTableProps = {
  leads: LeadRow[]
  filteredLeads: LeadRow[]
  loading: boolean
  error: string | null
  filters: LeadsFiltersState
  onFiltersChange: (next: LeadsFiltersState) => void
  selectedId: string | null
  onSelectLead: (lead: LeadRow) => void
  onRefresh: () => void
}

function formatDate(iso: string) {
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
  'h-9 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2.5 text-sm outline-none focus:border-[#2f7a2f] focus:ring-2 focus:ring-[#2f7a2f]/20'

export function LeadsTable({
  leads,
  filteredLeads,
  loading,
  error,
  filters,
  onFiltersChange,
  selectedId,
  onSelectLead,
  onRefresh,
}: LeadsTableProps) {
  const setFilter = <K extends keyof LeadsFiltersState>(key: K, value: LeadsFiltersState[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-[12rem] flex-1 space-y-1">
          <label htmlFor="lead-search" className="text-xs font-medium text-slate-600">
            Search (name, phone, email)
          </label>
          <input
            id="lead-search"
            type="search"
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className={inputClass}
            placeholder="Type to filter…"
          />
        </div>
        <div className="w-full min-w-[8rem] space-y-1 sm:w-36">
          <label htmlFor="lead-source" className="text-xs font-medium text-slate-600">
            Source
          </label>
          <select
            id="lead-source"
            value={filters.source}
            onChange={(e) => setFilter('source', e.target.value)}
            className={inputClass}
          >
            <option value="all">All sources</option>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full min-w-[10rem] space-y-1 sm:w-48">
          <label htmlFor="lead-interest" className="text-xs font-medium text-slate-600">
            Service / interest
          </label>
          <select
            id="lead-interest"
            value={filters.interest}
            onChange={(e) => setFilter('interest', e.target.value)}
            className={inputClass}
          >
            <option value="all">All services</option>
            {INTEREST_SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:min-w-[14rem]">
          <div className="space-y-1">
            <label htmlFor="lead-from" className="text-xs font-medium text-slate-600">
              From
            </label>
            <input
              id="lead-from"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilter('dateFrom', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="lead-to" className="text-xs font-medium text-slate-600">
              To
            </label>
            <input
              id="lead-to"
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilter('dateTo', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onRefresh}
          disabled={loading}
          className="h-9 shrink-0 gap-2 border-slate-300 text-slate-700"
        >
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-[#0b2d16]/[0.06] text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Phone</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Interest</th>
              <th className="px-3 py-3">Source</th>
              <th className="px-3 py-3">Created</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  Loading leads…
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  {leads.length === 0
                    ? 'No leads yet. New submissions will appear here.'
                    : 'No leads match your filters. Try adjusting search or filters.'}
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className={`cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/50 ${
                    selectedId === lead.id ? 'bg-emerald-50' : ''
                  }`}
                  onClick={() => onSelectLead(lead)}
                >
                  <td className="max-w-[140px] truncate px-3 py-2.5 font-medium text-slate-900">{lead.name}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-slate-700">{lead.phone}</td>
                  <td className="max-w-[160px] truncate px-3 py-2.5 text-slate-600">{lead.email ?? '—'}</td>
                  <td className="max-w-[140px] truncate px-3 py-2.5 text-slate-700">{lead.interest_service}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-slate-600">{lead.source}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-slate-600">{formatDate(lead.created_at)}</td>
                  <td className="px-3 py-2.5 text-right">
                    <Button
                      type="button"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectLead(lead)
                      }}
                      className="h-8 bg-[#2f7a2f] text-white hover:bg-[#265f26]"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && filteredLeads.length > 0 ? (
        <p className="text-xs text-slate-500">
          Showing {filteredLeads.length} of {leads.length} lead{leads.length === 1 ? '' : 's'}
        </p>
      ) : null}
    </div>
  )
}
