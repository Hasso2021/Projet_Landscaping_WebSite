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
        className="relative min-h-[600px] w-full bg-cover bg-center bg-no-repeat lg:min-h-[700px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#062411]/78 via-[#062411]/45 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 pb-36 pt-20 lg:pb-40 lg:pt-24">
          <div className="max-w-2xl text-white lg:mt-6">
            <h1 className="text-center text-4xl font-bold leading-tight sm:text-left sm:text-5xl lg:text-6xl">
              RELIABLE SERVICE.
              <br />
              <span className="text-[#7ccf4d]">BEAUTIFUL RESULTS.</span>
            </h1>
            <p className="mt-6 text-center text-lg text-white/90 sm:text-left">
              Professional landscape maintenance for homes and businesses in Dublin.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-[#3f8f2f] px-6 text-base font-semibold text-white transition hover:bg-[#347728] sm:w-auto"
              >
                Get a Free Quote <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex h-12 w-full items-center justify-center rounded-md border border-white/60 px-6 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Our Services
              </Link>
            </div>
          </div>

          <div className="absolute bottom-[-4.5rem] left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 px-6">
            <div className="grid gap-3 rounded-2xl border border-white/20 bg-[#0b2d16]/95 p-4 shadow-xl sm:grid-cols-3 sm:p-5">
              {HIGHLIGHTS.map(({ title, description, Icon }) => (
                <article key={title} className="flex items-start gap-3 rounded-xl p-2 text-white">
                  <div className="rounded-full bg-[#3f8f2f] p-2.5">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="text-sm text-emerald-100">{description}</p>
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
