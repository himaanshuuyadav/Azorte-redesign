'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { SECTION_IDS } from '@/constants'
import { COLLECTION_LINKS } from '@/data/collectionLinks'

const CATEGORIES = [
  {
    title: 'WOMEN',
    description: 'Bold silhouettes. Unapologetic style.',
    cta: 'Explore Women',
    href: COLLECTION_LINKS.women,
    placeholder: 'WOMENS COLLECTION',
    image: '/images/women.jpg',
  },
  {
    title: 'MEN',
    description: 'Modern tailoring. Engineered confidence.',
    cta: 'Explore Men',
    href: COLLECTION_LINKS.men,
    placeholder: 'MENS COLLECTION',
    image: '/images/men.jpg',
  },
  {
    title: 'AZ',
    description: 'The AZORTE signature line. Refined edge.',
    cta: 'Explore AZ',
    href: COLLECTION_LINKS.az,
    placeholder: 'AZ COLLECTION',
    image: '/images/az.jpg',
  },
  {
    title: 'PROEARTH',
    description: 'Sustainable materials. Responsible design.',
    cta: 'Explore ProEarth',
    href: COLLECTION_LINKS.proEarth,
    placeholder: 'PROEARTH COLLECTION',
    image: '/images/proearth.jpg',
  },
  {
    title: 'ETHNIC',
    description: 'Heritage craft. Contemporary cut.',
    cta: 'Explore Ethnic',
    href: COLLECTION_LINKS.ethnic,
    placeholder: 'ETHNIC COLLECTION',
    image: '/images/ethnic.jpg',
  },
  {
    title: 'KIDS',
    description: 'Comfort meets creativity.',
    cta: 'Explore Kids',
    href: COLLECTION_LINKS.kids,
    placeholder: 'KIDS COLLECTION',
    image: '/images/kids.jpg',
  },
]

// ---------- Icons ------------------------------------------------------------

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 3L5 8l5 5" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  )
}

// ---------- Card -------------------------------------------------------------

function CollectionCard({
  cat,
  revealDelay = 0,
  alwaysVisible = false,
}: {
  cat: (typeof CATEGORIES)[number]
  revealDelay?: number
  alwaysVisible?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(alwaysVisible)

  useEffect(() => {
    if (alwaysVisible) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [alwaysVisible])

  return (
    <Link
      ref={ref}
      href={cat.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease-out ${revealDelay}ms, transform 0.6s ease-out ${revealDelay}ms`,
      }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-azorte-grey-900 ring-1 ring-inset ring-azorte-grey-600/15 transition-all duration-500 group-hover:ring-azorte-coral/30">
        <Image
          src={cat.image}
          alt={cat.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 84vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-azorte-black/60 via-transparent to-azorte-black/10 transition-opacity duration-500 group-hover:opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="h-0.5 w-8 bg-azorte-coral transition-all duration-500 group-hover:w-12" />
        </div>
      </div>

      <div className="mt-5 transition-transform duration-500 group-hover:-translate-y-0.5">
        <h3 className="text-headline font-bold tracking-tight text-azorte-white transition-colors duration-500 group-hover:text-azorte-coral md:text-display-md md:leading-[1.1]">
          {cat.title}
        </h3>
        <p className="mt-2 text-body-lg leading-relaxed text-azorte-grey-400">
          {cat.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-body font-medium text-azorte-coral transition-all duration-500 group-hover:gap-3">
          {cat.cta}
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}

// ---------- Desktop + Tablet Carousel (md+) ----------------------------------
//
// Mechanism: grouped-page sliding track.
// All pages sit side-by-side in a flex row. Each page-div is exactly
// `containerWidth` px wide (measured by ResizeObserver). Cards inside each
// page-div use flex:1 with CSS gap, filling the slot exactly.
//
// Slide = translateX(-page * containerWidth) -- clean integer pixels.
// perPage: 3 on lg+ (>=1024px), 2 on md (768-1023px).
// Swipe threshold: 50px horizontal delta.

const CAROUSEL_GAP = 24 // px -- matches original lg:gap-6

function DesktopCarousel() {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(3)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  // Breakpoint: lg (>=1024px) -> 3 per page, md (768-1023px) -> 2 per page
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      setPerPage(mql.matches ? 3 : 2)
      setPage(0)
    }
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  // Measure container width for pixel-perfect slide translation
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setContainerWidth(el.offsetWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const numPages = Math.ceil(CATEGORIES.length / perPage)

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(numPages - 1, p + 1))

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) next()
    if (delta < -50) prev()
  }

  const pages = Array.from({ length: numPages }, (_, i) =>
    CATEGORIES.slice(i * perPage, (i + 1) * perPage)
  )

  return (
    <div className="hidden md:block">
      {/* Navigation row */}
      <div className="mt-10 mb-6 flex items-center justify-end gap-2">
        <button
          onClick={prev}
          disabled={page === 0}
          aria-label="Previous collections"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-azorte-grey-600 text-azorte-white transition-colors duration-300 hover:border-azorte-coral hover:text-azorte-coral disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          disabled={page === numPages - 1}
          aria-label="Next collections"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-azorte-grey-600 text-azorte-white transition-colors duration-300 hover:border-azorte-coral hover:text-azorte-coral disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight />
        </button>

        {/* Page indicator dots */}
        <div className="ml-3 flex items-center gap-1.5">
          {Array.from({ length: numPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className="h-px rounded-full transition-all duration-300"
              style={{
                width: i === page ? '2rem' : '0.5rem',
                backgroundColor:
                  i === page
                    ? 'var(--color-azorte-coral)'
                    : 'var(--color-azorte-grey-600)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Sliding track */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: 'flex',
            transform: `translateX(-${page * containerWidth}px)`,
            transition:
              containerWidth > 0
                ? 'transform 0.5s cubic-bezier(0.25, 0, 0, 1)'
                : 'none',
          }}
        >
          {pages.map((pageCats, pageIdx) => (
            <div
              key={pageIdx}
              style={{
                display: 'flex',
                gap: `${CAROUSEL_GAP}px`,
                width: containerWidth || undefined,
                flexShrink: 0,
              }}
            >
              {pageCats.map((cat, catIdx) => (
                <div key={cat.title} style={{ flex: 1, minWidth: 0 }}>
                  <CollectionCard
                    cat={cat}
                    revealDelay={catIdx * 80}
                    alwaysVisible
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------- Mobile Snap Carousel (<md) -- unchanged --------------------------

function MobileCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const { scrollLeft, clientWidth } = track
      const idx = Math.round(scrollLeft / (clientWidth * 0.84))
      setActiveIndex(Math.min(idx, CATEGORIES.length - 1))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: track.clientWidth * 0.84 * idx, behavior: 'smooth' })
  }

  return (
    <>
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          touchAction: 'pan-x',
        }}
      >
        <div className="w-[calc(50%-42vw)] shrink-0" aria-hidden="true" />
        {CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="w-[84vw] shrink-0"
            style={{ scrollSnapAlign: 'center' }}
          >
            <CollectionCard cat={cat} revealDelay={0} />
          </div>
        ))}
        <div className="w-[calc(50%-42vw)] shrink-0" aria-hidden="true" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {CATEGORIES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to ${CATEGORIES[i].title}`}
            className="h-0.5 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? '2rem' : '0.5rem',
              backgroundColor:
                i === activeIndex
                  ? 'var(--color-azorte-coral)'
                  : 'var(--color-azorte-grey-600)',
            }}
          />
        ))}
      </div>
    </>
  )
}

// ---------- Section ----------------------------------------------------------

export function CollectionsSection() {
  return (
    <section id={SECTION_IDS.COLLECTIONS} className="bg-azorte-black py-section-sm md:py-section">
      <Container>
        <span className="text-caption uppercase tracking-[0.15em] text-azorte-coral">
          COLLECTIONS
        </span>
        <h2 className="mt-4 max-w-3xl text-display-md font-bold leading-[1.06] tracking-tight text-azorte-white md:text-display-lg md:leading-[1.08]">
          DISCOVER YOUR
          <br />
          NEXT LOOK.
        </h2>
        <p className="mt-4 max-w-xl text-body-lg leading-relaxed text-azorte-grey-400 md:mt-5">
          Six collections. One identity.
          <br />
          Designed for every expression of modern style.
        </p>

        <DesktopCarousel />

        <div className="mt-10 md:hidden">
          <MobileCarousel />
        </div>
      </Container>
    </section>
  )
}
