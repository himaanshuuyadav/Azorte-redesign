'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SECTION_IDS } from '@/constants'
import { Container } from '@/components/ui/Container'
import { IndiaMap } from '@/components/ui/IndiaMap'

import { STORE_DATA, STATE_PINS } from '@/data/stores'

const Pin = ({ x, y, isActive }: { x: string; y: string; isActive: boolean }) => (
  <div 
    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500"
    style={{ left: x, top: y, zIndex: isActive ? 10 : 1 }}
  >
    <div className={`relative flex items-center justify-center transition-transform duration-500 ${isActive ? 'scale-150' : 'scale-100'}`}>
      <div className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-azorte-amber shadow-[0_0_15px_theme(colors.azorte.amber)]' : 'bg-azorte-amber/50'}`} />
      {isActive && <div className="absolute h-6 w-6 animate-ping rounded-full bg-azorte-amber/30" />}
    </div>
  </div>
)

export function StoreDiscovery() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const storeCountRef = useRef<HTMLDivElement>(null)
  const stateCountRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  // Filtering
  const filteredStores = useMemo(() => {
    if (!searchQuery) return STORE_DATA
    const q = searchQuery.toLowerCase()
    return STORE_DATA.filter(store => 
      store.state.toLowerCase().includes(q) ||
      store.city.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Grouping by State
  const statesMap = useMemo(() => {
    return filteredStores.reduce((acc, store) => {
      if (!acc[store.state]) acc[store.state] = []
      acc[store.state].push(store)
      return acc
    }, {} as Record<string, typeof STORE_DATA>)
  }, [filteredStores])

  const activeStatesList = Object.keys(statesMap)
  const targetState = hoveredState || selectedState

  // 1. Initial Scroll Reveal + Counters
  useGSAP(() => {
    if (prefersReducedMotion) return

    // Entrance Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
    tl.from(leftColRef.current?.children || [], {
      y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
    })
    tl.from(mapRef.current, { 
      y: 50, opacity: 0, scale: 0.98, duration: 0.8, ease: 'power3.out' 
    }, '-=0.4')

    // Counter Animation
    const counts = { stores: 0, states: 0 }
    gsap.to(counts, {
      stores: STORE_DATA.length,
      states: Object.keys(STATE_PINS).length,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      onUpdate: () => {
        if (storeCountRef.current) storeCountRef.current.innerText = Math.floor(counts.stores) + '+'
        if (stateCountRef.current) stateCountRef.current.innerText = Math.floor(counts.states) + '+'
      }
    })
  }, [prefersReducedMotion], sectionRef)

  // 2. Bind SVG DOM Events (Hover/Click natively on paths)
  useEffect(() => {
    const mapContainer = mapRef.current
    if (!mapContainer) return

    const activeGlobalStates = Object.keys(STATE_PINS)

    const handleMouseEnter = (e: Event) => {
      const target = e.target as SVGPathElement
      const name = target.getAttribute('name')
      if (name && activeGlobalStates.includes(name)) setHoveredState(name)
    }
    const handleMouseLeave = () => setHoveredState(null)
    const handleClick = (e: Event) => {
      const target = e.target as SVGPathElement
      const name = target.getAttribute('name')
      if (name && activeGlobalStates.includes(name)) {
         setSelectedState(name)
      }
    }

    const paths = mapContainer.querySelectorAll('path')
    paths.forEach((p) => {
      p.addEventListener('mouseenter', handleMouseEnter)
      p.addEventListener('mouseleave', handleMouseLeave)
      p.addEventListener('click', handleClick)
      
      const name = p.getAttribute('name')
      if (activeGlobalStates.includes(name || '')) {
        p.style.cursor = 'pointer'
      }
    })

    return () => {
      paths.forEach((p) => {
        p.removeEventListener('mouseenter', handleMouseEnter)
        p.removeEventListener('mouseleave', handleMouseLeave)
        p.removeEventListener('click', handleClick)
      })
    }
  }, [])

  // 3. Map Color Sync
  useEffect(() => {
    const mapContainer = mapRef.current
    if (!mapContainer) return

    const paths = mapContainer.querySelectorAll('path')
    paths.forEach((p) => {
      const name = p.getAttribute('name') || ''
      const hasStores = Object.keys(STATE_PINS).includes(name)
      
      let targetFill = '#111111' // Default dark map
      let targetStroke = '#333333'
      let filter = 'drop-shadow(0 0 0px rgba(217,119,6,0))'
      
      if (hasStores) targetFill = '#1c1c1c' // Subtle highlight for active states
      if (name === targetState) {
        targetFill = 'rgba(217,119,6,0.35)' // AZORTE orange subtle fill
        targetStroke = '#d97706' // Strong orange border
        filter = 'drop-shadow(0 0 10px rgba(217,119,6,0.6))'
      }
      
      gsap.to(p, { fill: targetFill, stroke: targetStroke, filter, duration: 0.4, ease: 'power2.out' })
    })
  }, [targetState])

  return (
    <section ref={sectionRef} id={SECTION_IDS.STORE_DISCOVERY} className="bg-azorte-black py-section-sm md:py-section overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Header, Search, List */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col h-[550px] sm:h-[600px] lg:h-[700px]">
            <span className="text-caption uppercase tracking-[0.15em] text-azorte-amber">
              STORE NETWORK
            </span>
            
            <div className="flex items-center gap-16 mt-8">
              <div className="flex flex-col">
                <div ref={storeCountRef} className="text-display-lg font-extrabold text-azorte-white leading-none tracking-tight">0+</div>
                <div className="text-caption text-azorte-grey-400 mt-3 tracking-[0.2em] font-medium">STORES</div>
              </div>
              <div className="flex flex-col">
                <div ref={stateCountRef} className="text-display-lg font-extrabold text-azorte-white leading-none tracking-tight">0+</div>
                <div className="text-caption text-azorte-grey-400 mt-3 tracking-[0.2em] font-medium">STATES</div>
              </div>
            </div>

            <p className="mt-8 text-body text-azorte-grey-400">
              Discover AZORTE stores across India.<br/>
              Search AZORTE stores by state or city.
            </p>

            <div className="mt-8 relative flex items-center">
              <svg className="absolute left-5 w-5 h-5 text-azorte-grey-600 pointer-events-none opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text"
                value={searchQuery} 
                onChange={(e) => { setSearchQuery(e.target.value); setSelectedState(null) }}
                placeholder="Search state or city..."
                className="w-full bg-azorte-grey-900/50 border border-azorte-grey-800 rounded-[20px] p-4 pl-14 text-azorte-white placeholder:text-azorte-grey-600 focus:outline-none focus:border-azorte-amber transition-colors"
              />
            </div>

            {/* Scrollable View Area */}
            <div className="mt-6 flex-1 min-h-0 relative overflow-hidden flex flex-col">
              
              {/* Empty Search State */}
              {activeStatesList.length === 0 && (
                <div className="mt-4 text-center py-12 border border-azorte-grey-800 rounded-[20px] bg-azorte-grey-900/30">
                  <p className="text-body font-medium text-azorte-white">No locations found</p>
                  <p className="text-caption text-azorte-grey-500 mt-2">Try a different city or state name.</p>
                </div>
              )}

              {/* View 1: All States List */}
              <div data-lenis-prevent="true" className={`absolute inset-0 overflow-y-auto overscroll-contain pr-0 lg:pr-2 pb-12 transition-all duration-500 ${selectedState ? '-translate-x-10 opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
                {activeStatesList.map(state => (
                  <button 
                    key={state}
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => setSelectedState(state)}
                    className={`w-full flex items-center justify-between p-4 sm:p-5 mb-3 sm:mb-4 rounded-[20px] border transition-all duration-250 min-h-[60px] ${state === targetState ? 'bg-azorte-grey-800/80 border-azorte-amber text-azorte-amber shadow-[0_0_15px_rgba(217,119,6,0.15)] -translate-y-[2px]' : 'bg-azorte-grey-900/20 border-azorte-grey-800 hover:bg-azorte-grey-900 hover:border-azorte-grey-600 hover:-translate-y-[2px] hover:shadow-lg text-azorte-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] tracking-[0.2em] opacity-60">▶</span>
                      <span className="text-body-lg sm:text-headline font-bold tracking-wide">{state}</span>
                    </div>
                    <span className="text-caption font-medium opacity-60">({statesMap[state].length})</span>
                  </button>
                ))}
              </div>

              {/* View 2: Selected State Details */}
              <div data-lenis-prevent="true" className={`absolute inset-0 overflow-y-auto overscroll-contain pr-0 lg:pr-2 pb-12 flex flex-col transition-all duration-500 ${selectedState ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
                <button 
                  onClick={() => { setSelectedState(null); setSearchQuery('') }} 
                  className="flex items-center gap-2 text-caption font-bold text-azorte-grey-500 hover:text-azorte-amber transition-colors mb-6 w-max min-h-[44px] py-2"
                >
                  &larr; ALL STATES
                </button>
                <h3 className="text-2xl sm:text-display-sm font-bold text-azorte-white mb-8 uppercase tracking-tight">▼ {selectedState}</h3>

                {selectedState && Object.entries(
                  statesMap[selectedState]?.reduce((acc, store) => {
                    if (!acc[store.city]) acc[store.city] = []
                    acc[store.city].push(store)
                    return acc
                  }, {} as Record<string, typeof STORE_DATA>) || {}
                ).map(([city, stores]) => (
                  <div key={city} className="mb-10">
                    <h4 className="text-body font-medium tracking-[0.1em] uppercase text-azorte-grey-400 mb-5">{city}</h4>
                    {stores.map(store => (
                      <div key={store.mall} className="p-5 mb-4 rounded-[20px] border border-azorte-grey-800 bg-azorte-grey-900/40 hover:bg-azorte-grey-900 hover:border-azorte-grey-600 hover:-translate-y-[2px] hover:shadow-lg transition-all duration-250 group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 sm:gap-4">
                        <div className="flex-1 pr-0 sm:pr-4">
                          <h5 className="text-body-lg sm:text-headline font-bold text-azorte-white leading-tight">{store.mall}</h5>
                          <p className="text-body-sm text-azorte-grey-400 mt-2 sm:mt-2.5 leading-relaxed">{store.address}</p>
                        </div>
                        <a 
                          href={store.mapsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex h-12 w-full sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full sm:rounded-full rounded-xl bg-azorte-grey-800 transition-colors hover:bg-azorte-amber hover:text-azorte-black text-azorte-white font-bold text-sm tracking-widest sm:tracking-normal active:scale-95"
                        >
                          <span className="sm:hidden mr-2 uppercase">Get Directions</span>
                          <span className="text-lg">↗</span>
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>
          
          {/* RIGHT: Map Container */}
          <div className="lg:col-span-7 relative h-[450px] lg:h-[700px] flex items-center justify-center bg-gradient-to-br from-azorte-grey-900 via-azorte-black to-azorte-grey-900 border border-white/5 rounded-[20px] shadow-[inset_0_0_60px_rgba(255,255,255,0.02)] overflow-hidden order-first lg:order-last">
            <div ref={mapRef} className="w-[120%] lg:w-full h-[120%] lg:h-full relative flex items-center justify-center mix-blend-screen opacity-90">
              <IndiaMap className="absolute inset-0 w-full h-full drop-shadow-[0_0_30px_rgba(217,119,6,0.1)] transition-transform duration-500" />
              
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-500" 
                viewBox="0 0 1000 1000" 
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Overlay Interactive Pins */}
                {Object.keys(STATE_PINS).map(state => (
                  <foreignObject 
                    key={state} 
                    x={STATE_PINS[state].x} 
                    y={STATE_PINS[state].y} 
                    width="1" 
                    height="1" 
                    style={{ overflow: 'visible' }}
                  >
                    <Pin 
                      x="0" 
                      y="0" 
                      isActive={state === targetState} 
                    />
                  </foreignObject>
                ))}
              </svg>
            </div>
            
            <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-azorte-grey-700 font-medium">
              AZORTE Retail Presence
            </span>
          </div>

        </div>
      </Container>
    </section>
  )
}
