/**
 * Single source of truth for public business contact details and owner notification target.
 * Update phone numbers here only — UI should use `@/constants/contact` (re-exports helpers below).
 */

const WHATSAPP_PREFILL = 'Hi MDL Landscape Maintenance, I would like a free quote.'

export const business = {
  /** Owner inbox for lead notification emails (Resend → this address). */
  ownerEmail: 'infomdllanscaping@gmail.com',

  /** Shown on website (Irish national format). */
  ownerPhoneDisplay: '0851079144',

  /** Irish mobile in international format (with leading +). */
  ownerPhoneWhatsapp: '+353851079144',

  /** Public “office” line shown on contact page. */
  publicContactEmail: 'infomdllanscaping@gmail.com',

  whatsappPrefill: WHATSAPP_PREFILL,
} as const

/** Digits only, for `tel:` and `wa.me` (no +). */
export const ownerPhoneE164NoPlus = business.ownerPhoneWhatsapp.replace(/^\+/, '')

export const ownerPhoneTelHref = `tel:${business.ownerPhoneWhatsapp}`

export const ownerWhatsappUrl =
  `https://wa.me/${ownerPhoneE164NoPlus}?text=${encodeURIComponent(business.whatsappPrefill)}`
