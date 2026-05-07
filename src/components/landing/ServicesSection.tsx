import { ArrowRight, Flower2, Scissors, SprayCan, Trash2, Trees, VenetianMask } from 'lucide-react'
import { Link } from 'react-router-dom'

const SERVICES = [
  { title: 'Lawn Mowing', description: 'Regular mowing to keep your lawn neat, healthy and green.', Icon: Trees },
  { title: 'Hedge Cutting', description: 'Expert trimming and shaping for clean and tidy hedges.', Icon: Scissors },
  { title: 'Garden Clean-Ups', description: 'We tidy your garden and remove leaves, weeds and debris.', Icon: Flower2 },
  { title: 'Planting & Maintenance', description: 'Planting and ongoing care to keep your garden thriving.', Icon: VenetianMask },
  { title: 'Power Washing', description: 'High-pressure cleaning for driveways, patios and paths.', Icon: SprayCan },
  { title: 'Waste Removal', description: 'Green waste and garden debris removal with clean finish.', Icon: Trash2 },
]

export function ServicesSection() {
  return (
    <section className="w-full overflow-x-hidden bg-white pb-20 pt-20 md:pt-32 lg:pb-24 lg:pt-40">
      <div className="mx-auto grid w-full max-w-full grid-cols-12 gap-12 px-6 md:max-w-7xl">
        <aside className="col-span-12 space-y-4 lg:col-span-4 lg:space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#3f8f2f]">Our Services</p>
          <h2 className="break-words text-3xl font-bold leading-tight text-slate-900 lg:text-4xl">
            Complete Landscape Care Solutions
          </h2>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            We offer a full range of professional landscaping services to keep your outdoor spaces looking their best
            all year round.
          </p>
          <Link
            to="/services"
            className="inline-flex h-12 items-center rounded-md bg-[#3f8f2f] px-5 text-base font-semibold text-white transition hover:bg-[#347728]"
          >
            View All Services <ArrowRight className="ml-2 size-4" />
          </Link>
        </aside>

        <div className="col-span-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-8">
          {SERVICES.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="w-full max-w-full rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-[5px] hover:shadow-xl"
            >
              <Icon className="size-9 text-[#3f8f2f]" />
              <h3 className="mt-4 break-words text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 break-words whitespace-normal text-base leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
