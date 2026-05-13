import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { isCurrentUserAdmin } from '@/lib/admin'
import { supabase } from '@/lib/supabase'

type GuardState = 'loading' | 'allowed' | 'unauthenticated' | 'denied'

export function RequireAdmin({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GuardState>('loading')

  useEffect(() => {
    let cancelled = false

    const verify = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        if (!cancelled) setState('unauthenticated')
        return
      }

      const isAdmin = await isCurrentUserAdmin()

      if (!isAdmin) {
        await supabase.auth.signOut()
        if (!cancelled) setState('denied')
        return
      }

      if (!cancelled) setState('allowed')
    }

    void verify()

    return () => {
      cancelled = true
    }
  }, [])

  if (state === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-sm font-medium text-slate-600">Verifying admin access...</p>
      </main>
    )
  }

  if (state === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />
  }

  if (state === 'denied') {
    return <Navigate to="/admin/login?reason=denied" replace />
  }

  return <>{children}</>
}
