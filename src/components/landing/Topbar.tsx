import { Clock3, MapPin, Phone } from 'lucide-react'

export function Topbar() {
  return (
    <div className="w-full bg-[#0b2d16] text-white">
      <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-between px-6 text-sm">
        <div className="flex items-center gap-3 sm:gap-5">
          <p className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            Dublin, Ireland
          </p>
          <p className="hidden items-center gap-1.5 sm:inline-flex">
            <Phone className="size-3.5" />
            083 123 4567
          </p>
          <p className="hidden items-center gap-1.5 md:inline-flex">
            <Clock3 className="size-3.5" />
            Mon - Sat: 8:00 AM - 6:00 PM
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-semibold text-white/90">
          <span>f</span>
          <span>ig</span>
          <span>wa</span>
        </div>
      </div>
    </div>
  )
}
