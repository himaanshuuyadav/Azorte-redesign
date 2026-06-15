import { HeroSection } from '@/components/sections/HeroSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import dynamic from 'next/dynamic'

const NeoStoreSection = dynamic(() => import('@/components/sections/NeoStoreSection').then(m => ({ default: m.NeoStoreSection })))
const StoreDiscovery = dynamic(() => import('@/components/sections/StoreDiscovery').then(m => ({ default: m.StoreDiscovery })))
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })))

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <CollectionsSection />
      <NeoStoreSection />
      <StoreDiscovery />
      <FinalCTA />
    </>
  )
}
