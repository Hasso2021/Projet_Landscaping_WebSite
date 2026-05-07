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
    <section className="w-full max-w-full overflow-x-hidden bg-white pb-20 pt-20 md:pt-32 lg:pb-24 lg:pt-40">
      <div className="mx-auto w-full min-w-0 max-w-full overflow-hidden px-6 md:max-w-7xl">
        <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <aside className="col-span-12 min-w-0 space-y-4 lg:col-span-4 lg:space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#3f8f2f]">Our Services</p>
            <h2 className="max-w-full break-words text-3xl font-bold leading-tight text-slate-900 lg:text-4xl">
              Complete Landscape Care Solutions
            </h2>
            <p className="max-w-full break-words whitespace-normal text-base leading-relaxed text-slate-600 lg:text-lg">
              We offer a full range of professional landscaping services to keep your outdoor spaces looking their best
              all year round.
            </p>
            <Link
              to="/services"
              className="inline-flex h-12 max-w-full items-center rounded-md bg-[#3f8f2f] px-5 text-base font-semibold text-white transition hover:bg-[#347728]"
            >
              View All Services <ArrowRight className="ml-2 size-4 shrink-0" />
            </Link>
          </aside>

          <div className="col-span-12 grid min-w-0 w-full max-w-full grid-cols-1 gap-5 lg:col-span-8 md:grid-cols-2">
            {SERVICES.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-[5px] hover:shadow-xl"
              >
                <Icon className="size-9 shrink-0 text-[#3f8f2f]" />
                <h3 className="mt-4 min-w-0 break-words text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 min-w-0 break-words whitespace-normal text-base leading-relaxed text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
