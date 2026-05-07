import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import mdlLogo from '@/assets/mdl-logo.png'
import { WhatsAppButton, WhatsAppIconLink } from '@/components/WhatsAppButton'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex h-10 items-center border-b-2 px-1 text-sm font-medium transition-colors ${
      isActive ? 'border-[#3f8f2f] text-[#2f7a2f]' : 'border-transparent text-slate-700 hover:text-[#2f7a2f]'
    }`

  return (
    <header className={`sticky top-0 z-50 w-full max-w-full overflow-x-hidden bg-white transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between px-6 py-2 md:py-2.5">
        <Link to="/" className="inline-flex items-center gap-3">
          <img src={mdlLogo} alt="MDL logo" className="h-10 w-10 rounded-sm object-cover md:h-12 md:w-12" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-w-0 items-center gap-3 lg:flex">
          <WhatsAppButton variant="solid" className="h-10 shrink-0 px-3 py-2 text-sm" />
          <Link
            to="/contact"
            className="inline-flex h-10 shrink-0 items-center rounded-md bg-[#3f8f2f] px-4 text-sm font-semibold text-white hover:bg-[#347728]"
          >
            Get a Free Quote <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <WhatsAppIconLink />
          <button
            type="button"
            className="inline-flex rounded-md border border-slate-200 p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex min-h-12 w-full items-center justify-center rounded-md bg-[#3f8f2f] px-4 text-sm font-semibold text-white hover:bg-[#347728]"
          >
            Get a Free Quote <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      ) : null}
    </header>
  )
}
