import { business, ownerPhoneTelHref, ownerWhatsappUrl, ownerPhoneE164NoPlus } from '@/config/business'

/** @deprecated Prefer importing from `@/config/business` for new code. */
export const CONTACT_DISPLAY_PHONE = business.ownerPhoneDisplay

/** @deprecated Prefer `ownerPhoneE164NoPlus` from `@/config/business`. */
export const CONTACT_E164_NO_PLUS = ownerPhoneE164NoPlus

export const CONTACT_TEL_HREF = ownerPhoneTelHref

export const CONTACT_WHATSAPP_URL = ownerWhatsappUrl
