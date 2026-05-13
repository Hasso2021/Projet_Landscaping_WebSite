import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LeadDetailPanel } from '@/components/admin/LeadDetailPanel'
import { LeadsTable, type LeadsFiltersState } from '@/components/admin/LeadsTable'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { LeadRow } from '@/types/leads'

const defaultFilters: LeadsFiltersState = {
  search: '',
  source: 'all',
  interest: 'all',
  dateFrom: '',
  dateTo: '',
}

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState<LeadRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<LeadsFiltersState>(defaultFilters)
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: qError } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (qError) {
      setError(qError.message || 'Could not load leads. Check your connection and permissions.')
      setLeads([])
    } else {
      setLeads((data ?? []) as LeadRow[])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => {
      void fetchLeads()
    }, 0)
    return () => window.clearTimeout(id)
  }, [fetchLeads])

  const filteredLeads = useMemo(() => {
    let list = leads
    const q = filters.search.trim().toLowerCase()
    if (q) {
      list = list.filter((l) => {
        const name = l.name.toLowerCase()
        const phone = l.phone.toLowerCase()
        const email = (l.email ?? '').toLowerCase()
        return name.includes(q) || phone.includes(q) || email.includes(q)
      })
    }
    if (filters.source !== 'all') {
      list = list.filter((l) => l.source === filters.source)
    }
    if (filters.interest !== 'all') {
      list = list.filter((l) => l.interest_service === filters.interest)
    }
    if (filters.dateFrom) {
      const from = new Date(`${filters.dateFrom}T00:00:00`)
      list = list.filter((l) => new Date(l.created_at) >= from)
    }
    if (filters.dateTo) {
      const to = new Date(`${filters.dateTo}T23:59:59.999`)
      list = list.filter((l) => new Date(l.created_at) <= to)
    }
    return list
  }, [leads, filters])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2f7a2f]">Admin</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Lead management</h1>
            <p className="mt-1 text-sm text-slate-600">Review enquiries, contact leads, and log follow-ups.</p>
          </div>
          <Button
            type="button"
            onClick={handleLogout}
            variant="outline"
            className="h-10 w-full shrink-0 border-slate-300 text-slate-700 hover:bg-slate-100 sm:w-auto"
          >
            Log out
          </Button>
        </header>

        <LeadsTable
          leads={leads}
          filteredLeads={filteredLeads}
          loading={loading}
          error={error}
          filters={filters}
          onFiltersChange={setFilters}
          selectedId={selectedLead?.id ?? null}
          onSelectLead={setSelectedLead}
          onRefresh={fetchLeads}
        />
      </div>

      {selectedLead ? <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} /> : null}
    </main>
  )
}
