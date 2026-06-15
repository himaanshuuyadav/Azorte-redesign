'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Container } from '@/components/ui/Container'


export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const loaderWordmarkRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Fallback timeout
    const timer = setTimeout(() => setIsLoaded(true), 2500)
    
    // Check if video is already ready
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsLoaded(true)
      clearTimeout(timer)
    }
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoaded && tlRef.current) {
      tlRef.current.play()
    }
  }, [isLoaded])

  useGSAP(
    () => {
      if (!prefersReducedMotion && loaderWordmarkRef.current) {
        gsap.fromTo(
          loaderWordmarkRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
        )
      }

      if (prefersReducedMotion) return

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        paused: true,
      })
      tlRef.current = tl

      if (loaderRef.current) {
        tl.to(loaderRef.current, { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' }, 0.2)
      }

      tl.fromTo(
        imageRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
        0
      )

      const words = headlineRef.current?.querySelectorAll('.hero-word')
      if (words?.length) {
        tl.fromTo(
          words,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power4.out' },
          '-=0.6'
        )
      }

      tl.fromTo(
        subheadRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      )

      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        '-=0.3'
      )

      tl.fromTo(
        indicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          if (!sectionRef.current) return
          const progress = self.progress
          gsap.set(sectionRef.current, {
            opacity: Math.max(0, 1 - progress * 1.2),
          })
        },
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (!imageRef.current) return
          const offset = (self.progress - 0.5) * 10
          gsap.set(imageRef.current, {
            yPercent: offset,
          })
        },
      })
    },
    [prefersReducedMotion],
    sectionRef
  )

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-azorte-black"
    >
      {/* Premium Launch Loader */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-azorte-black"
      >
        <span 
          ref={loaderWordmarkRef}
          className="text-[clamp(2.5rem,8vw,7rem)] tracking-[0.2em] font-extrabold text-azorte-white opacity-0 translate-y-[10px]"
          style={{ textShadow: '0 0 10px rgba(255,255,255,0.05)' }}
        >
          AZORTE
        </span>
      </div>

      <div
        ref={imageRef}
        className="absolute inset-0 h-[110%] w-full -top-[5%]"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/placeholders/hero.webp"
          onLoadedData={() => setIsLoaded(true)}
          className="absolute inset-0 h-full w-full object-cover scale-[1.05] brightness-[0.85]"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-azorte-coral/[0.12] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-azorte-black/50 via-azorte-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-azorte-black/40 via-transparent to-transparent" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[42%] -translate-y-1/2 flex select-none items-center justify-center">
        <span className="text-[clamp(6.5rem,18vw,32rem)] font-extrabold leading-none tracking-[0.06em] text-azorte-white/[0.04]">
          AZORTE
        </span>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end pb-20 md:pb-32">
        <Container>
          <div className="max-w-4xl">
            <h1
              ref={headlineRef}
              className="overflow-hidden text-display-md leading-[1.08] tracking-tight text-azorte-white sm:text-display-lg md:text-display-xl md:leading-[1.05]"
            >
              <span className="block overflow-hidden">
                <span className="hero-word inline-block">STYLE</span>
              </span>{' '}
              <span className="block overflow-hidden">
                <span className="hero-word inline-block">WITHOUT</span>
              </span>{' '}
              <span className="block overflow-hidden">
                <span className="hero-word inline-block text-azorte-coral">RULES.</span>
              </span>
            </h1>

            <p
              ref={subheadRef}
              className="mt-4 max-w-xl text-body-lg text-azorte-white/70 sm:text-body-lg md:mt-6 md:text-subhead"
            >
              Contemporary fashion, immersive retail experiences, and technology
              that transforms the way India shops.
            </p>

            <div
              ref={ctaRef}
              className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-10"
            >
              <a
                href="#collections"
                className="inline-flex items-center justify-center rounded bg-azorte-coral px-8 py-3 text-body font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral focus-visible:ring-offset-2 focus-visible:ring-offset-azorte-black active:scale-95"
              >
                Explore Collections
              </a>
              <a
                href="#neo-store"
                className="inline-flex items-center justify-center rounded border border-azorte-white/30 px-8 py-3 text-body font-medium text-azorte-white transition-all duration-200 hover:bg-azorte-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral focus-visible:ring-offset-2 focus-visible:ring-offset-azorte-black"
              >
                Discover NeoStore
              </a>
            </div>
          </div>
        </Container>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#manifesto"
          className="flex h-12 w-8 flex-col items-center justify-center gap-1 rounded-full border border-azorte-white/20 transition-colors hover:border-azorte-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral focus-visible:ring-offset-2 focus-visible:ring-offset-azorte-black"
          aria-label="Scroll to next section"
        >
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-azorte-coral" />
        </a>
      </div>
    </section>
  )
}
