import { Clock3, MapPin, Phone } from 'lucide-react'

import { WhatsAppIcon } from '@/components/WhatsAppButton'
import { CONTACT_DISPLAY_PHONE, CONTACT_TEL_HREF, CONTACT_WHATSAPP_URL } from '@/constants/contact'

export function Topbar() {
  return (
    <div className="w-full bg-[#0b2d16] text-white">
      <div className="mx-auto flex h-10 w-full min-w-0 max-w-7xl items-center justify-between gap-2 px-6 text-sm">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
          <p className="inline-flex min-w-0 items-center gap-1.5 truncate">
            <MapPin className="size-3.5" />
            Dublin, Ireland
          </p>
          <a className="hidden items-center gap-1.5 sm:inline-flex" href={CONTACT_TEL_HREF}>
            <Phone className="size-3.5 shrink-0" />
            <span>{CONTACT_DISPLAY_PHONE}</span>
          </a>
          <p className="hidden items-center gap-1.5 md:inline-flex">
            <Clock3 className="size-3.5" />
            Mon - Sat: 8:00 AM - 6:00 PM
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex items-center gap-1.5 text-white/90 transition-colors hover:text-white"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            <span className="hidden text-[11px] font-semibold sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
