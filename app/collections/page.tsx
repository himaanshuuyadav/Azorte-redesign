import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore AZORTE collections — curated looks for every mood.',
}

export default function CollectionsPage() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Container>
        <h1 className="text-display-lg font-bold tracking-tight">Collections</h1>
      </Container>
    </section>
  )
}
