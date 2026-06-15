'use client'

import { createContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Single authoritative plugin registration for the whole app
gsap.registerPlugin(ScrollTrigger)

interface LenisContextValue {
  lenis: Lenis | null
}

export const LenisContext = createContext<LenisContextValue>({ lenis: null })

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(lenisInstance)

    lenisInstance.on('scroll', ScrollTrigger.update)

    // Named reference so gsap.ticker.remove() can target it precisely
    const onTick = (time: number) => lenisInstance.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenisInstance.destroy()
      gsap.ticker.remove(onTick)
      gsap.ticker.lagSmoothing(1)
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
}
