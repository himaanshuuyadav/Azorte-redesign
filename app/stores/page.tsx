import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Store Locator',
  description: 'Find an AZORTE store near you. Visit our NeoStore for a premium experience.',
}

export default function StoresPage() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Container>
        <h1 className="text-display-lg font-bold tracking-tight">Store Locator</h1>
      </Container>
    </section>
  )
}
