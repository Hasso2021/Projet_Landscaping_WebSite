import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { isCurrentUserAdmin } from '@/lib/admin'
import { supabase } from '@/lib/supabase'

export function AdminLoginPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const initialInfo = useMemo(() => {
    if (searchParams.get('reason') === 'denied') {
      return 'Access denied. This account is not an admin.'
    }
    return null
  }, [searchParams])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setErrorMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setErrorMessage('Login failed. Please check your email and password.')
      setIsSubmitting(false)
      return
    }

    const isAdmin = await isCurrentUserAdmin()

    if (!isAdmin) {
      await supabase.auth.signOut()
      setErrorMessage('Access denied. This account is not an admin.')
      setIsSubmitting(false)
      return
    }

    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(100deg,#0b2d16_0%,#1a5a24_60%,#2f7a2f_100%)] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-emerald-100/50 bg-white p-6 shadow-xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#2f7a2f]">Private Admin Access</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in with your admin account to manage leads.</p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="admin-email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#2f7a2f] focus:ring-2 focus:ring-[#2f7a2f]/20"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="admin-password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#2f7a2f] focus:ring-2 focus:ring-[#2f7a2f]/20"
              placeholder="Enter your password"
            />
          </div>

          {errorMessage || initialInfo ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage ?? initialInfo}</p>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full bg-[#2f7a2f] text-white hover:bg-[#265f26] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </section>
    </main>
  )
}
