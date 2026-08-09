import { LeadForm } from '@/components/LeadForm'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { AdminDashboardPage } from '@/components/admin/AdminDashboardPage'
import { AdminLoginPage } from '@/components/admin/AdminLoginPage'
import { RequireAdmin } from '@/components/admin/RequireAdmin'
import { CTASection } from '@/components/landing/CTASection'
import { HeroSection } from '@/components/landing/HeroSection'
import { Navbar } from '@/components/landing/Navbar'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { SERVICES } from '@/components/landing/services'
import { Topbar } from '@/components/landing/Topbar'
import heroImage from '@/assets/garden-bg.png'
import afterLawnCut from '@/assets/gallery/after-lawn-cut.jpg'
import beforeOvergrownGarden from '@/assets/gallery/before-overgrown-garden.jpg'
import commercialLawnMaintenance from '@/assets/gallery/commercial-lawn-maintenance.jpg'
import formalGardenTrimmed from '@/assets/gallery/formal-garden-trimmed.jpg'
import gardenMaintenance from '@/assets/gallery/garden-maintenance.jpg'
import hedgeMaintenance from '@/assets/gallery/hedge-maintenance.jpg'
import mapleTreeLandscaping from '@/assets/gallery/maple-tree-landscaping.jpg'
import plantBedAfter from '@/assets/gallery/plant-bed-after.jpg'
import plantBedBefore from '@/assets/gallery/plant-bed-before.jpg'
import { ArrowRight, BadgeEuro, Leaf, MapPin, ShieldCheck, ThumbsUp, X } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen max-w-full overflow-x-hidden bg-white text-slate-900">
      <Topbar />
      <Navbar />
      {children}
    </div>
  )
}

function LandingPage() {
  return (
    <PageShell>
      <main className="w-full min-w-0 max-w-full overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <CTASection />
      </main>
    </PageShell>
  )
}

function ContactPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="rounded-2xl bg-[linear-gradient(100deg,#103d19_0%,#1a5a24_60%,#2f7a2f_100%)] px-6 py-10 text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mt-3 text-lg text-emerald-100">Home &nbsp;&gt;&nbsp; Contact</p>
        </section>

        <section className="mt-6">
          <LeadForm />
        </section>
      </main>
    </PageShell>
  )
}

const RECENT_WORK_ITEMS = [
  { src: afterLawnCut, alt: 'Neatly cut residential lawn in Dublin', caption: 'Lawn Maintenance' },
  { src: hedgeMaintenance, alt: 'Trimmed hedge and tidy garden perimeter', caption: 'Hedge Trimming' },
  { src: beforeOvergrownGarden, alt: 'Before state with overgrown grass and weeds', caption: 'Garden Clean-Up' },
  { src: gardenMaintenance, alt: 'Finished residential garden maintenance result', caption: 'Residential Landscaping' },
  { src: mapleTreeLandscaping, alt: 'Manicured garden with trimmed hedges and red maple tree', caption: 'Decorative Hedge Shaping' },
  { src: formalGardenTrimmed, alt: 'Neatly trimmed formal garden layout in a green park setting', caption: 'Formal Garden Maintenance' },
  { src: commercialLawnMaintenance, alt: 'Commercial lawn striped after cutting near industrial units', caption: 'Commercial Lawn Maintenance' },
  { src: plantBedBefore, alt: 'Overgrown plant bed before cleanup and trimming', caption: 'Plant Bed Before' },
  { src: plantBedAfter, alt: 'Plant bed after cleanup with trimmed and tidied foliage', caption: 'Plant Bed After' },
]

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <PageShell>
      <main className="w-full bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <section className="py-20">
            <div
              className="relative h-[240px] overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat text-white shadow-sm md:h-[320px]"
              style={{ backgroundImage: `url(${heroImage})` }}
            >
              <div className="absolute inset-0 bg-[#0b2d16]/80" />
              <div className="relative flex h-full flex-col justify-center px-6 sm:px-8 lg:px-10">
                <h1 className="text-4xl font-bold sm:text-5xl">Our Work</h1>
                <p className="mt-3 text-lg text-emerald-100">Recent landscaping and maintenance projects in Dublin</p>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Garden Clean-Up &amp; Lawn Cutting</h2>
              <p className="mt-2 text-base text-slate-600">
                A complete garden clean-up and lawn cutting service for a residential property in Dublin.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={beforeOvergrownGarden} alt="Before: overgrown garden with tall grass" className="h-full w-full object-cover" />
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#2f7a2f]">Before</p>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={afterLawnCut} alt="After: cleaned and cut lawn in the same garden" className="h-full w-full object-cover" />
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#2f7a2f]">After</p>
                </div>
              </article>
            </div>
          </section>

          <section className="py-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Recent Work</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {RECENT_WORK_ITEMS.map((item) => (
                <button
                  key={`${item.caption}-${item.src}`}
                  type="button"
                  onClick={() => setSelectedImage({ src: item.src, alt: item.alt })}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="px-4 py-3 text-sm font-semibold text-slate-700">{item.caption}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="py-20">
            <div className="rounded-2xl bg-[linear-gradient(100deg,#103d19_0%,#1a5a24_60%,#2f7a2f_100%)] px-6 py-10 text-white shadow-sm sm:px-8">
              <h3 className="text-3xl font-bold">Want results like this for your garden?</h3>
              <a
                href="/contact"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-[#1f5d22] transition hover:bg-emerald-50"
              >
                Get a Free Quote
              </a>
            </div>
          </section>
        </div>
      </main>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-black"
            >
              <X className="size-5" />
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[85vh] w-full rounded-xl object-cover" />
          </div>
        </div>
      ) : null}
    </PageShell>
  )
}

const WHY_CHOOSE_US = [
  {
    title: 'Reliable service',
    description: 'We show up when we say we will and keep your garden looking its best all year round.',
    Icon: ThumbsUp,
  },
  {
    title: 'Fully insured',
    description: 'Your property is in safe hands with a fully insured landscaping and maintenance service.',
    Icon: ShieldCheck,
  },
  {
    title: 'Local Dublin service',
    description: 'Based in Dublin and proudly serving homes and businesses across the surrounding areas.',
    Icon: MapPin,
  },
  {
    title: 'Free quotes',
    description: 'Tell us what you need and we will give you a clear, no-obligation quote for the work.',
    Icon: BadgeEuro,
  },
]

function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="rounded-2xl bg-[linear-gradient(100deg,#103d19_0%,#1a5a24_60%,#2f7a2f_100%)] px-6 py-10 text-white sm:px-8">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-200">
            <Leaf className="size-4 shrink-0" /> About Us
          </p>
          <h1 className="mt-3 break-words text-4xl font-bold sm:text-5xl">About MDL Landscape Maintenance</h1>
          <p className="mt-3 text-lg text-emerald-100">Home &nbsp;&gt;&nbsp; About</p>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#3f8f2f]">Who we are</p>
            <h2 className="max-w-full break-words text-3xl font-bold leading-tight text-slate-900 lg:text-4xl">
              Dublin-based landscaping and garden maintenance
            </h2>
            <p className="max-w-full break-words text-base leading-relaxed text-slate-600 lg:text-lg">
              MDL Landscape Maintenance is a Dublin-based landscaping and garden maintenance service working with both
              residential and small commercial customers. We focus on practical, dependable work that keeps your
              outdoor spaces clean, tidy, healthy and well maintained.
            </p>
            <p className="max-w-full break-words text-base leading-relaxed text-slate-600 lg:text-lg">
              From regular lawn care to seasonal clean-ups, we take pride in doing the job properly and leaving your
              garden looking its best. We are fully insured and always happy to provide a free, no-obligation quote.
            </p>
          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl shadow-md">
            <img
              src={heroImage}
              alt="Well maintained garden in Dublin by MDL Landscape Maintenance"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="mt-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#3f8f2f]">Why choose us</p>
            <h2 className="mt-2 break-words text-3xl font-bold leading-tight text-slate-900 lg:text-4xl">
              A reliable local service you can count on
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WHY_CHOOSE_US.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-[5px] hover:shadow-xl"
              >
                <div className="inline-flex rounded-full bg-emerald-50 p-3">
                  <Icon className="size-6 shrink-0 text-[#3f8f2f]" />
                </div>
                <h3 className="mt-4 min-w-0 break-words text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 min-w-0 break-words text-base leading-relaxed text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-2xl bg-[linear-gradient(100deg,#103d19_0%,#1a5a24_60%,#2f7a2f_100%)] px-6 py-10 text-white shadow-sm sm:px-8">
            <h3 className="break-words text-3xl font-bold">Need help with your garden?</h3>
            <p className="mt-2 text-emerald-100">Get in touch for a free, no-obligation quote in Dublin.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-[#1f5d22] transition hover:bg-emerald-50"
              >
                Get a Free Quote <ArrowRight className="ml-2 size-4 shrink-0" />
              </Link>
              <WhatsAppButton variant="solid" className="h-11" />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}

function ServicesPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="rounded-2xl bg-[linear-gradient(100deg,#103d19_0%,#1a5a24_60%,#2f7a2f_100%)] px-6 py-10 text-white sm:px-8">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-200">
            <Leaf className="size-4 shrink-0" /> Our Services
          </p>
          <h1 className="mt-3 break-words text-4xl font-bold sm:text-5xl">Our Services</h1>
          <p className="mt-3 text-lg text-emerald-100">Home &nbsp;&gt;&nbsp; Services</p>
        </section>

        <section className="mt-8 max-w-3xl">
          <p className="max-w-full break-words text-base leading-relaxed text-slate-600 lg:text-lg">
            We offer a full range of practical landscaping and garden maintenance services for homes and small
            businesses across Dublin. Whatever your garden needs, we help keep it clean, tidy, healthy and well
            maintained.
          </p>
        </section>

        <section className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-[5px] hover:shadow-xl"
              >
                <div className="inline-flex w-fit rounded-full bg-emerald-50 p-3">
                  <Icon className="size-7 shrink-0 text-[#3f8f2f]" />
                </div>
                <h3 className="mt-4 min-w-0 break-words text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 min-w-0 flex-1 break-words text-base leading-relaxed text-slate-600">{description}</p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-[#2f7a2f] transition-colors hover:text-[#265f26]"
                >
                  Get a Free Quote <ArrowRight className="ml-1.5 size-4 shrink-0" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-2xl bg-[linear-gradient(100deg,#103d19_0%,#1a5a24_60%,#2f7a2f_100%)] px-6 py-10 text-white shadow-sm sm:px-8">
            <h3 className="break-words text-3xl font-bold">Need a reliable landscaping service in Dublin?</h3>
            <p className="mt-2 text-emerald-100">Tell us what you need and we will get back to you with a free quote.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-[#1f5d22] transition hover:bg-emerald-50"
              >
                Get a Free Quote <ArrowRight className="ml-2 size-4 shrink-0" />
              </Link>
              <WhatsAppButton variant="solid" className="h-11" />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdmin>
            <AdminDashboardPage />
          </RequireAdmin>
        }
      />
      <Route path="/" element={<LandingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
