import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import heroImage from '@/assets/garden-bg.png'

const CHECKLIST = ['Experienced Team', 'Quality Work', 'Affordable Pricing']

export function CTASection() {
  return (
    <section className="w-full max-w-full overflow-x-hidden pb-24">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-6">
        <div
          className="relative overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat px-6 py-12 shadow-lg sm:px-8 lg:px-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-[#0b2d16]/80" />
          <div className="relative grid min-w-0 items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div className="min-w-0 space-y-4 text-white">
              <h3 className="break-words text-3xl font-bold leading-tight lg:text-4xl">
                Looking for reliable landscape maintenance in Dublin?
              </h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {CHECKLIST.map((item) => (
                  <p key={item} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-100">
                    <Check className="size-4 text-[#7ccf4d]" /> {item}
                  </p>
                ))}
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex h-12 max-w-full shrink-0 items-center justify-center rounded-md bg-white px-6 text-base font-semibold text-[#1f5d22] transition hover:bg-emerald-50"
            >
              Get a Free Quote <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
