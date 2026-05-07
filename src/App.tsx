import { LeadForm } from '@/components/LeadForm'
import { CTASection } from '@/components/landing/CTASection'
import { HeroSection } from '@/components/landing/HeroSection'
import { Navbar } from '@/components/landing/Navbar'
import { ServicesSection } from '@/components/landing/ServicesSection'
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
import { UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

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

function PlaceholderPage({ title }: { title: string }) {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#2f7a2f]">
            <UserRound className="size-4" /> Coming Soon
          </p>
          <h1 className="mt-4 text-4xl font-bold">{title}</h1>
          <p className="mt-3 text-lg text-slate-600">This page is available in navigation and will be filled with content soon.</p>
        </section>
      </main>
    </PageShell>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<PlaceholderPage title="Services" />} />
      <Route path="/about" element={<PlaceholderPage title="About Us" />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
