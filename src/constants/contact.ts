/** Ireland mobile display; international dial without leading zero for wa.me / tel. */
export const CONTACT_DISPLAY_PHONE = '083 123 4567'
export const CONTACT_E164_NO_PLUS = '353831234567'
export const CONTACT_TEL_HREF = `tel:+${CONTACT_E164_NO_PLUS}`

const WHATSAPP_PREFILL = 'Hi MDL Landscape Maintenance, I would like a free quote.'

export const CONTACT_WHATSAPP_URL =
  `https://wa.me/${CONTACT_E164_NO_PLUS}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`
