import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'NeoStore',
  description: 'Experience the future of fashion retail with AZORTE NeoStore technology.',
}

export default function NeoStorePage() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Container>
        <h1 className="text-display-lg font-bold tracking-tight">NeoStore</h1>
      </Container>
    </section>
  )
}
