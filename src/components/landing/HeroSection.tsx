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
    <section className="relative w-full overflow-hidden">
      <div
        className="relative min-h-[560px] w-full overflow-hidden bg-cover bg-center bg-no-repeat md:min-h-[620px] lg:min-h-[700px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#062411]/78 via-[#062411]/45 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full w-full min-w-0 max-w-7xl flex-col items-center px-6 pb-24 pt-12 md:items-start md:pb-32 md:pt-16 lg:pb-40 lg:pt-24">
          <div className="min-w-0 max-w-2xl text-white lg:mt-6">
            <h1 className="break-words text-center text-4xl font-bold leading-tight sm:text-left md:text-5xl lg:text-6xl">
              RELIABLE SERVICE.
              <br />
              <span className="text-[#7ccf4d]">BEAUTIFUL RESULTS.</span>
            </h1>
            <p className="mt-4 text-center text-base text-white/90 sm:text-left md:text-lg">
              Professional landscape maintenance for homes and businesses in Dublin.
            </p>
            <div className="mb-6 mt-5 flex flex-col items-center gap-3 sm:items-start md:mb-0 md:mt-8">
              <Link
                to="/contact"
                className="inline-flex h-10 w-full max-w-xs items-center justify-center rounded-md bg-[#3f8f2f] px-5 text-sm font-semibold text-white transition hover:bg-[#347728] md:h-12 md:max-w-none md:px-6 md:text-base"
              >
                Get a Free Quote <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                to="/services"
                className="hidden h-12 w-full items-center justify-center rounded-md border border-white/60 px-6 text-base font-semibold text-white transition hover:bg-white/10 md:inline-flex md:w-auto"
              >
                Our Services
              </Link>
            </div>
          </div>

          <div className="static bottom-auto left-auto right-auto z-20 mt-6 w-full max-w-full min-w-0 translate-y-0 px-0 md:absolute md:bottom-[-4rem] md:left-1/2 md:mt-0 md:w-full md:max-w-5xl md:-translate-x-1/2 md:px-6 lg:bottom-[-4.5rem]">
            <div className="flex max-w-full flex-col gap-4 rounded-xl border border-white/20 bg-[#0b2d16]/95 p-4 text-left shadow-sm md:grid md:grid-cols-3 md:gap-3 md:rounded-2xl md:p-5 md:shadow-xl">
              {HIGHLIGHTS.map(({ title, description, Icon }) => (
                <article key={title} className="flex min-w-0 items-start gap-3 rounded-lg p-1 text-white md:gap-3 md:rounded-xl md:p-2">
                  <div className="shrink-0 rounded-full bg-[#3f8f2f] p-1.5 md:p-2.5">
                    <Icon className="size-3.5 md:size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-semibold md:text-base">{title}</h3>
                    <p className="break-words text-xs text-emerald-100 md:text-sm">{description}</p>
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
