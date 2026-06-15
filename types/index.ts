export interface Product {
  id: string
  name: string
  price: string
  imageUrl: string
  category: string
  ajioUrl?: string
}

export interface Campaign {
  title: string
  season: string
  bodyText: string
  imageUrl: string
  ajioLookUrl: string
}

export interface Store {
  city: string
  stores: Array<{
    name: string
    address: string
    coordinates: { lat: number; lng: number }
  }>
}

export interface NeoStoreFeature {
  icon: string
  name: string
  description: string
}

export interface ValuePillar {
  name: string
  quote: string
}

export interface ManifestoData {
  headline: string
  bodyText: string
  pillars: ValuePillar[]
}

export interface HeroData {
  videoDesktop: string
  videoMobile: string
  posterUrl: string
  headline: string
  subheadline: string
}

export interface TrendingItem {
  id: string
  name: string
  price: string
  imageUrl: string
  width: 'wide' | 'standard'
}

export interface TrendingCounters {
  stylesAdded: number
  wishlists: number
}
