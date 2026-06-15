'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SECTION_IDS } from '@/constants'
import { Container } from '@/components/ui/Container'
import Link from 'next/link'


export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      })
    },
    [prefersReducedMotion],
    sectionRef
  )

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.FINAL_CTA}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-azorte-black"
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-azorte-black via-azorte-grey-900/40 to-azorte-black" />
      <div
        className="absolute left-1/2 top-1/3 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azorte-coral/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-azorte-coral/20 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        <Container>
          <div ref={contentRef} className="text-center">
            <h2 className="text-display-lg font-extrabold leading-[1.05] tracking-tight text-azorte-white md:text-display-xl xl:text-[8rem] xl:leading-[1.02]">
              JOIN THE
              <br />
              EVOLUTION.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body-lg leading-relaxed text-azorte-grey-400 md:text-subhead md:leading-normal md:text-azorte-white/50">
              Experience the future of fashion. Discover the world of AZORTE.
            </p>
            <div className="mt-10">
              <Link
                href="https://azorte.ajio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded bg-azorte-coral px-10 py-4 text-body font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] md:text-subhead"
              >
                SHOP ON AJIO
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
