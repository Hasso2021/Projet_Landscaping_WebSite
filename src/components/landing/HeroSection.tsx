import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import heroImage from '@/assets/garden-bg.png'

const HIGHLIGHTS = [
  {
    title: 'Free Quotes',
    description: 'No obligation, easy and fast.',
    Icon: Sparkles,
  },
  {
    title: 'Fully Insured',
    description: 'Your property is in safe hands.',
    Icon: ShieldCheck,
  },
  {
    title: 'Local & Reliable',
    description: 'Proudly serving Dublin and surrounding areas.',
    Icon: CheckCircle2,
  },
]

export function HeroSection() {
  return (
    <section className="relative w-full">
      <div
        className="relative min-h-[560px] w-full bg-cover bg-center bg-no-repeat md:min-h-[620px] lg:min-h-[700px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#062411]/78 via-[#062411]/45 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 pb-24 pt-12 md:pb-32 md:pt-16 lg:pb-40 lg:pt-24">
          <div className="max-w-2xl text-white lg:mt-6">
            <h1 className="text-center text-4xl font-bold leading-tight sm:text-left md:text-5xl lg:text-6xl">
              RELIABLE SERVICE.
              <br />
              <span className="text-[#7ccf4d]">BEAUTIFUL RESULTS.</span>
            </h1>
            <p className="mt-4 text-center text-base text-white/90 sm:text-left md:text-lg">
              Professional landscape maintenance for homes and businesses in Dublin.
            </p>
            <div className="mb-12 mt-5 flex flex-col gap-3 sm:flex-row sm:items-center md:mb-0 md:mt-8">
              <Link
                to="/contact"
                className="inline-flex h-10 w-full max-w-sm items-center justify-center rounded-md bg-[#3f8f2f] px-5 text-sm font-semibold text-white transition hover:bg-[#347728] sm:w-auto md:h-12 md:max-w-none md:px-6 md:text-base"
              >
                Get a Free Quote <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                to="/services"
                className="hidden h-12 w-full items-center justify-center rounded-md border border-white/60 px-6 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto md:inline-flex"
              >
                Our Services
              </Link>
            </div>
          </div>

          <div className="absolute bottom-[-1.25rem] left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 px-6 md:bottom-[-3rem] lg:bottom-[-4.5rem]">
            <div className="grid gap-4 rounded-xl border border-white/20 bg-[#0b2d16]/95 p-4 shadow-sm sm:grid-cols-3 sm:gap-3 sm:rounded-2xl sm:p-5 sm:shadow-xl">
              {HIGHLIGHTS.map(({ title, description, Icon }) => (
                <article key={title} className="flex items-start gap-2 rounded-lg p-1 text-white sm:gap-3 sm:rounded-xl sm:p-2">
                  <div className="rounded-full bg-[#3f8f2f] p-1.5 sm:p-2.5">
                    <Icon className="size-3.5 sm:size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold sm:text-base">{title}</h3>
                    <p className="text-xs text-emerald-100 sm:text-sm">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
