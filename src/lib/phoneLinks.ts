/** Digits suitable for tel:+ and wa.me (no leading +). */
export function normalizePhoneDigits(phone: string): string | null {
  const d = phone.replace(/\D/g, '')
  if (!d) return null
  if (d.startsWith('353')) return d
  if (d.startsWith('0') && d.length >= 9) return `353${d.slice(1)}`
  return d
}

export function phoneToTelHref(phone: string): string {
  const n = normalizePhoneDigits(phone)
  if (!n) return '#'
  return `tel:+${n}`
}

export function phoneToWhatsAppUrl(phone: string, prefill?: string): string | null {
  const n = normalizePhoneDigits(phone)
  if (!n) return null
  const base = `https://wa.me/${n}`
  if (prefill?.trim()) {
    return `${base}?text=${encodeURIComponent(prefill.trim())}`
  }
  return base
}
