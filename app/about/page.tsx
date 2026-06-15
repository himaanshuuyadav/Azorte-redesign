import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about AZORTE — a bold, contemporary fashion brand by Reliance Retail.',
}

export default function AboutPage() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Container>
        <h1 className="text-display-lg font-bold tracking-tight">About</h1>
      </Container>
    </section>
  )
}
