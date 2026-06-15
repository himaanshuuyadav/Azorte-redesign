export const BREAKPOINTS = {
  xs: 390,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1920,
} as const

export const SECTION_IDS = {
  HERO: 'hero',
  MANIFESTO: 'manifesto',
  COLLECTIONS: 'collections',
  CAMPAIGN: 'campaign',
  NEO_STORE: 'neo-store',
  TRENDING: 'trending',
  STORE_DISCOVERY: 'store-discovery',
  FINAL_CTA: 'final-cta',
} as const

export const ANIMATION = {
  DURATION: {
    FAST: 0.2,
    BASE: 0.4,
    SLOW: 0.6,
    DISPLAY: 0.9,
  },
  EASE: {
    EXPO_OUT: 'expo.out' as const,
    POWER3_OUT: 'power3.out' as const,
  },
  SCROLL_TRIGGER: {
    START: 'top 80%',
    END: 'bottom 20%',
  },
} as const

export const AJIO_BASE_URL = 'https://azorte.ajio.com/'
