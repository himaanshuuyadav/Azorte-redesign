'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { buildAjioUrl } from '@/lib/ajio'
import { useLenis } from '@/hooks/useLenis'

const NAV_LINKS = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Collections', href: '#collections' },
  { label: 'NeoStore', href: '#neo-store' },
  { label: 'Stores', href: '#store-discovery' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { lenis } = useLenis()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMenu()
  }, [pathname, closeMenu])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [menuOpen, lenis])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, closeMenu])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'h-14 bg-azorte-black/90 backdrop-blur-md shadow-lg'
          : 'h-20 bg-transparent'
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5"
      >
        <Link
          href="/"
          className="relative z-50 text-display-md md:text-display-lg font-bold tracking-tight text-azorte-white transition-colors hover:text-azorte-coral"
        >
          AZORTE
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-body font-medium text-azorte-white/80 transition-colors hover:text-azorte-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral focus-visible:ring-offset-2 focus-visible:ring-offset-azorte-black rounded-sm',
                pathname === link.href && 'text-azorte-coral'
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={buildAjioUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded bg-azorte-coral px-5 py-2 text-body font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral focus-visible:ring-offset-2 focus-visible:ring-offset-azorte-black lg:inline-flex"
          >
            Shop on Ajio ↗
          </a>

          <button
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative z-50 flex items-center justify-center min-h-[44px] min-w-[44px] text-azorte-white/80 transition-colors hover:text-azorte-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral rounded-sm lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-0 z-40 bg-azorte-black transition-transform duration-300 lg:hidden',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-10 px-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={cn(
                'text-display-md font-bold tracking-tight text-azorte-white transition-colors hover:text-azorte-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral rounded-sm',
                pathname === link.href && 'text-azorte-coral'
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildAjioUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded bg-azorte-coral px-10 py-4 text-body font-medium text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral"
          >
            Shop on Ajio ↗
          </a>
        </div>
      </div>
    </header>
  )
}
