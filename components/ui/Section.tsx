import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  dark?: boolean
}

export function Section({ children, className, id, dark = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-section-sm md:py-section',
        dark ? 'bg-azorte-black text-azorte-white' : 'bg-azorte-grey-100 text-azorte-black',
        className
      )}
    >
      {children}
    </section>
  )
}
