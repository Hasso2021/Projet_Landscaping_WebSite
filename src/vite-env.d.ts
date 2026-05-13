/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  /** Optional absolute URL for POST / lead notification when not same-origin. */
  readonly VITE_LEAD_NOTIFICATION_URL?: string
  /**
   * Local dev only: your deployed site origin (no trailing slash). Proxies `/api/*` to Vercel so
   * `fetch('/api/send-lead-notification')` reaches the serverless function.
   */
  readonly VITE_DEV_NOTIFY_API_ORIGIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
