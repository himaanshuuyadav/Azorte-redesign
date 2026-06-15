import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Discover the stories behind AZORTE — fashion narratives and brand journeys.',
}

export default function StoriesPage() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Container>
        <h1 className="text-display-lg font-bold tracking-tight">Stories</h1>
      </Container>
    </section>
  )
}
