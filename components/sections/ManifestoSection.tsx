'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SECTION_IDS } from '@/constants'
import { Container } from '@/components/ui/Container'


const PHASES = [
  {
    id: 'bold',
    watermark: 'BOLD',
    image: '/images/bold-extended.png',
    width: 1080,
    height: 1440,
    // 50vw makes BOLD (4 chars) extend ~40% beyond viewport — matching AUTHENTIC's crop ratio
    wmFontSize: 'clamp(12rem, 50vw, 80rem)',
  },
  {
    id: 'authentic',
    watermark: 'AUTHENTIC',
    image: '/images/authentic-extended.png',
    width: 1920,
    height: 1440,
    // Reference state — unchanged from original
    wmFontSize: 'clamp(8rem, 22vw, 40rem)',
  },
  {
    id: 'redefined',
    watermark: 'RE-DEFINED',
    image: '/images/redefined-extended.png',
    width: 1550,
    height: 1346,
    // 21vw for ~9.5 effective chars — same overflow ratio as AUTHENTIC
    wmFontSize: 'clamp(8rem, 21vw, 40rem)',
  },
] as const

const PILLARS = [
  { number: '01', title: 'BOLD.', description: 'Setting conventions aside.' },
  { number: '02', title: 'AUTHENTIC.', description: 'Designed for self-expression.' },
  { number: '03', title: 'RE-DEFINED.', description: 'Where fashion meets innovation.' },
] as const

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [activePhase, setActivePhase] = useState(0)
  const phaseRef = useRef(0)

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return

      function transitionTo(nextPhase: number, isMobile = false) {
        const section = sectionRef.current
        if (!section) {
          setActivePhase(nextPhase)
          return
        }

        const targets = section.querySelectorAll<HTMLElement>('.phase-transition')
        if (!targets.length) {
          setActivePhase(nextPhase)
          return
        }

        gsap.to(targets, {
          opacity: 0,
          y: -40,
          duration: isMobile ? 0.15 : 0.25,
          ease: 'power2.in',
          overwrite: true,
          onComplete: () => {
            setActivePhase(nextPhase)
            
            requestAnimationFrame(() => {
              gsap.fromTo(targets,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: isMobile ? 0.3 : 0.4, ease: 'power2.out', overwrite: true }
              )
            })
          },
        })
      }

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress
            const next = p > 0.66 ? 2 : p > 0.33 ? 1 : 0
            if (next !== phaseRef.current) {
              phaseRef.current = next
              transitionTo(next)
            }
          },
        })
      })

      mm.add('(max-width: 767px)', () => {
        const pillars = sectionRef.current?.querySelectorAll('.mobile-pillar')
        if (!pillars) return

        pillars.forEach((pillar, i) => {
          ScrollTrigger.create({
            trigger: pillar,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
              if (phaseRef.current !== i) {
                phaseRef.current = i
                transitionTo(i, true)
              }
            },
            onEnterBack: () => {
              if (phaseRef.current !== i) {
                phaseRef.current = i
                transitionTo(i, true)
              }
            }
          })
        })
      })
    },
    [prefersReducedMotion],
    sectionRef
  )

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return

      const targets = sectionRef.current.querySelectorAll<HTMLElement>('.phase-transition')
      if (!targets.length) return

      gsap.fromTo(targets, 
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }
      )
    },
    [prefersReducedMotion],
    sectionRef
  )

  const phase = PHASES[activePhase]
  const coral = '#FF5A3C'
  const grey = '#8A8A8A'

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.MANIFESTO}
      className="relative bg-azorte-black"
    >
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden">
        <span
          key="watermark"
          aria-hidden="true"
          className="phase-transition absolute font-extrabold leading-none text-azorte-white/[0.06]"
          style={{ fontSize: phase.wmFontSize, whiteSpace: 'nowrap' }}
        >
          {phase.watermark}
        </span>
      </div>

      <div className="relative w-full">
        <div className="hidden md:flex md:min-h-screen md:items-center">
          <Container className="w-full py-20">
            <div className="flex items-end gap-12 lg:gap-16">
              <div className="w-1/2 lg:w-[55%] pb-24 lg:pb-32">
                <p className="text-caption uppercase tracking-[0.15em] text-azorte-grey-400 mb-8 md:mb-14">
                  AZORTE MANIFESTO
                </p>
                <h2 className="text-4xl font-bold leading-[1.06] tracking-tight text-azorte-white md:text-5xl lg:text-[4.25rem] mb-20 md:mb-24">
                  FASHION FOR THE<br />NEXT GENERATION.
                </h2>
                <div className="space-y-16 md:space-y-20">
                  {PILLARS.map((p, i) => (
                    <div key={p.number}>
                      <div className="flex items-baseline gap-3 md:gap-4">
                        <span className="shrink-0 text-body font-medium tracking-[0.12em] text-azorte-grey-400 md:text-body-lg">
                          {p.number}
                        </span>
                        <h3
                          className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
                          style={{ color: i === activePhase ? coral : grey }}
                        >
                          {p.title}
                        </h3>
                      </div>
                      <p
                        className="mt-1 max-w-lg text-body-lg leading-relaxed md:mt-1.5"
                        style={{ opacity: i === activePhase ? 1 : 0.4 }}
                      >
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block w-1/2 lg:w-[45%] h-[75vh] relative">
                <div
                  key="desktop-model"
                  className="phase-transition w-full h-full relative"
                >
                  {PHASES.map((p, i) => (
                    <Image
                      key={p.id}
                      src={p.image}
                      alt=""
                      width={p.width}
                      height={p.height}
                      className={`h-full w-auto max-w-none absolute bottom-0 left-1/2 -translate-x-1/2 ${
                        activePhase === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                      priority={true}
                      sizes="45vw"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="md:hidden relative min-h-[100dvh] flex flex-col justify-center py-24">
          <Container>
            <p className="text-caption uppercase tracking-[0.15em] text-azorte-grey-400 mb-6">
              AZORTE MANIFESTO
            </p>
            <h2 className="text-4xl font-bold leading-[1.06] tracking-tight text-azorte-white mb-8">
              FASHION FOR THE<br />NEXT GENERATION.
            </h2>
            <div className="hidden sm:block relative h-[50vh] mb-12">
              <div
                key="mobile-model"
                className="phase-transition w-full h-full relative"
              >
                {PHASES.map((p, i) => (
                    <Image
                      key={p.id}
                      src={p.image}
                      alt=""
                      fill
                      className={`object-cover ${
                      activePhase === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    priority={i === 0}
                    sizes="100vw"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-10 sm:space-y-12">
              {PILLARS.map((p, i) => (
                <div key={p.number} className="mobile-pillar">
                  <div className="flex items-baseline gap-3">
                    <span className="shrink-0 text-body font-medium tracking-[0.12em] text-azorte-grey-400">
                      {p.number}
                    </span>
                    <h3
                      className="text-3xl font-bold tracking-tight"
                      style={{ color: i === activePhase ? coral : grey }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <p
                    className="mt-1 max-w-lg text-body-lg leading-relaxed"
                    style={{ opacity: i === activePhase ? 1 : 0.4 }}
                  >
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
