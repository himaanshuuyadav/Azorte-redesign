import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingVariant = 'display-xl' | 'display-lg' | 'display-md' | 'headline' | 'subhead'

interface HeadingProps {
  children: ReactNode
  as?: HeadingLevel
  variant?: HeadingVariant
  className?: string
  uppercase?: boolean
}

const variantMapping: Record<HeadingVariant, string> = {
  'display-xl': 'text-display-xl font-extrabold tracking-tight',
  'display-lg': 'text-display-lg font-bold tracking-tight',
  'display-md': 'text-display-md font-bold tracking-tight',
  headline: 'text-headline font-semibold tracking-tight',
  subhead: 'text-subhead font-medium',
}

const defaultTag: Record<HeadingVariant, HeadingLevel> = {
  'display-xl': 'h1',
  'display-lg': 'h2',
  'display-md': 'h2',
  headline: 'h3',
  subhead: 'h4',
}

export function Heading({
  children,
  as,
  variant = 'headline',
  className,
  uppercase,
}: HeadingProps) {
  const Tag = as ?? defaultTag[variant]

  return (
    <Tag
      className={cn(
        variantMapping[variant],
        uppercase && 'uppercase',
        className
      )}
    >
      {children}
    </Tag>
  )
}
