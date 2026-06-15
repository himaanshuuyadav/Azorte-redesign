'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SECTION_IDS } from '@/constants'
import { Container } from '@/components/ui/Container'

const FEATURES = [
  {
    number: '01',
    label: 'Smart Fitting Rooms',
    headline: 'Try without the wait.',
    description:
      'Step into a fitting room that knows what you brought. Interactive mirrors suggest pairings, adjust lighting, and let you request sizes without stepping out.',
    video: '/videos/smart_fitting_room.mp4',
  },
  {
    number: '02',
    label: 'Scan & Go',
    headline: 'Skip the line before it forms.',
    description:
      'Scan items as you shop with the AZORTE app. Bag them and checkout from anywhere in the store — no queue required.',
    video: '/videos/scan_and_go.mp4',
  },
  {
    number: '03',
    label: 'Self Checkout',
    headline: 'Pay in seconds. Not minutes.',
    description:
      'Walk up to any checkout point, tap your phone, and go. Receipts live in your app — no paper, no wait, no friction.',
    video: '/videos/self_checkout.mp4',
  },
]

export function NeoStoreSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const conclusionRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      // Dynamically position the SVG container to start EXACTLY at the center divider
      const updatePosition = () => {
        const anchor = anchorRef.current
        const section = sectionRef.current
        const svgContainer = svgContainerRef.current
        
        if (anchor && section && svgContainer) {
          const sectionRect = section.getBoundingClientRect()
          const anchorRect = anchor.getBoundingClientRect()
          const offsetTop = anchorRect.top - sectionRect.top
          
          svgContainer.style.top = `${offsetTop}px`
          svgContainer.style.height = `${sectionRect.height - offsetTop}px`
        }
      }
      
      // Call synchronously so GSAP can calculate exact ScrollTrigger positions based on the updated layout
      updatePosition()
      window.addEventListener('resize', updatePosition)

      // Intro reveal
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
      introTl.from('[data-intro-line]', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      })

      // Journey Line Drawing using robust SVG Masking instead of dasharray (prevents scaling artifacts)
      const rects = gsap.utils.toArray('.draw-mask-rect') as SVGRectElement[]
      rects.forEach((rect) => {
        gsap.fromTo(rect,
          { attr: { height: 0 } },
          {
            attr: { height: 100 },
            ease: 'none',
            scrollTrigger: {
              trigger: svgContainerRef.current,
              start: 'top 50%', // Starts drawing precisely when the divider hits the middle of the viewport
              end: 'bottom 85%',
              scrub: true,
            },
          }
        )
      })

      // Feature Video Activations synced to scroll position
      featureRefs.current.forEach((el) => {
        if (!el) return
        const videoWrapper = el.querySelector('.feature-video-wrapper')
        const videoElement = el.querySelector('video')
        if (!videoWrapper) return
        
        // Initial state: inactive / future
        gsap.set(videoWrapper, { opacity: 0.7, scale: 0.96 })

        // 1. Playback Optimization: Only play when near viewport
        if (videoElement) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 100%',
            end: 'bottom 0%',
            onEnter: () => { videoElement.play().catch(() => {}) },
            onLeave: () => { videoElement.pause() },
            onEnterBack: () => { videoElement.play().catch(() => {}) },
            onLeaveBack: () => { videoElement.pause() },
          })
        }

        // 2. Visual Animation: Fade and scale when active
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%', // Activate when card comes into view
          end: 'bottom 40%', // Deactivate when scrolling past it
          onEnter: () => {
            gsap.to(videoWrapper, { 
              opacity: 1, scale: 1, 
              duration: 0.5, ease: 'power2.out' 
            })
          },
          onLeave: () => {
            // Completed (scrolled past)
            gsap.to(videoWrapper, { 
              opacity: 0.8, scale: 0.98,
              duration: 0.5, ease: 'power2.out' 
            })
          },
          onEnterBack: () => {
            gsap.to(videoWrapper, { 
              opacity: 1, scale: 1, 
              duration: 0.5, ease: 'power2.out' 
            })
          },
          onLeaveBack: () => {
            gsap.to(videoWrapper, { 
              opacity: 0.7, scale: 0.96, 
              duration: 0.5, ease: 'power2.out' 
            })
          }
        })
      })

      // Conclusion block reveal
      if (conclusionRef.current) {
        gsap.fromTo(conclusionRef.current,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: conclusionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      return () => {
        window.removeEventListener('resize', updatePosition)
      }
    },
    [prefersReducedMotion],
    sectionRef
  )

  return (
    <section ref={sectionRef} id={SECTION_IDS.NEO_STORE} className="relative bg-azorte-black overflow-hidden">
      
      {/* Absolute SVG Journey Line Container - Set by GSAP to start precisely at anchorRef */}
      <div ref={svgContainerRef} className="absolute left-0 w-full z-0 pointer-events-none flex justify-center">
        {/* Desktop SVG */}
        <svg className="hidden lg:block w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <filter id="gold-glow-desktop" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <mask id="draw-mask-desktop" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <rect className="draw-mask-rect" x="-50" y="0" width="200" height="0" fill="white" />
            </mask>
          </defs>
          <path
            d="M 50 0 C 50 5, 80 10, 80 25 C 80 40, 20 40, 20 50 C 20 60, 80 60, 80 75 C 80 90, 50 95, 50 100"
            fill="none"
            stroke="var(--color-azorte-amber)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            filter="url(#gold-glow-desktop)"
            mask="url(#draw-mask-desktop)"
            opacity="0.8"
          />
        </svg>

        {/* Tablet & Mobile SVG (Curves out to X=90 to avoid crossing central text blocks) */}
        <svg className="block lg:hidden w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <filter id="gold-glow-mobile" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <mask id="draw-mask-mobile" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <rect className="draw-mask-rect" x="-50" y="0" width="200" height="0" fill="white" />
            </mask>
          </defs>
          <path
            d="M 50 0 C 50 10, 90 15, 90 25 L 90 85 C 90 95, 50 95, 50 100"
            fill="none"
            stroke="var(--color-azorte-amber)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            filter="url(#gold-glow-mobile)"
            mask="url(#draw-mask-mobile)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Intro */}
      <div ref={introRef} className="flex min-h-screen flex-col items-center justify-center text-center relative z-10 pt-16">
        <Container>
          <span data-intro-line className="text-caption uppercase tracking-[0.2em] text-azorte-amber">
            NeoStore Experience
          </span>
          <h2 data-intro-line className="mt-10 text-display-lg font-extrabold leading-[1.05] tracking-tight text-azorte-white md:text-display-xl xl:text-[8rem] xl:leading-[1.02]">
            SHOPPING,<br />REIMAGINED.
          </h2>
          
          <div className="relative w-full flex flex-col items-center">
            {/* The Divider - serves as the origin anchor point for the journey line */}
            <div ref={anchorRef} data-intro-line className="h-px w-16 bg-azorte-amber/50 mt-8 relative z-10" />
            
            <p data-intro-line className="mt-8 max-w-3xl text-body-lg leading-relaxed text-azorte-grey-400 md:text-subhead md:leading-normal md:text-azorte-white/50 relative z-10">
              Technology designed to make shopping faster, smarter, and more personal.
            </p>
          </div>
        </Container>
      </div>

      {/* Features Content */}
      <div className="relative z-10 space-y-24 md:space-y-40 lg:space-y-48 pt-12 pb-32 md:pb-48">
        {FEATURES.map((f, i) => {
          const isReversed = i % 2 === 1
          return (
            <div key={f.label} ref={(el) => { if (el) featureRefs.current[i] = el }}>
              <Container>
                <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-20">
                  <div className={isReversed ? 'lg:order-2' : ''}>
                    <span className="text-caption uppercase tracking-[0.15em] text-azorte-amber">
                      {f.number} &mdash; {f.label}
                    </span>
                    <h3 className="mt-4 text-display-md font-bold leading-[1.1] tracking-tight text-azorte-white md:text-display-lg md:leading-[1.08]">
                      {f.headline}
                    </h3>
                    <p className="mt-5 max-w-lg text-body-lg leading-relaxed text-azorte-grey-400">
                      {f.description}
                    </p>
                  </div>
                  
                  <div className={`feature-video-wrapper relative flex aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-azorte-black border border-[rgba(255,255,255,0.08)] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 ${isReversed ? 'lg:order-1' : ''}`}>
                    <video 
                      src={f.video} 
                      muted 
                      loop 
                      playsInline 
                      preload="none"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-azorte-black/10 mix-blend-overlay pointer-events-none" />
                  </div>
                </div>
              </Container>
            </div>
          )
        })}

        {/* Connected Experience Conclusion Block */}
        <div ref={conclusionRef} className="relative z-10 mt-32 md:mt-48 flex flex-col items-center justify-center text-center">
          <Container>
            <span className="text-caption uppercase tracking-[0.2em] text-azorte-amber">
              CONNECTED EXPERIENCE
            </span>
            <h3 className="mx-auto mt-6 max-w-4xl text-display-md font-bold leading-[1.1] tracking-tight text-azorte-white md:text-display-lg md:leading-[1.08]">
              Everything works together.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-body-lg leading-relaxed text-azorte-grey-400">
              Discover products, try them in smart fitting rooms,
              scan instantly, and checkout seamlessly —
              all within one connected AZORTE journey.
            </p>
          </Container>
        </div>
      </div>

    </section>
  )
}
