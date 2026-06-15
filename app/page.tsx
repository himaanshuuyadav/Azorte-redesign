import { HeroSection } from '@/components/sections/HeroSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { NeoStoreSection } from '@/components/sections/NeoStoreSection'
import { StoreDiscovery } from '@/components/sections/StoreDiscovery'
import { FinalCTA } from '@/components/sections/FinalCTA'

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
