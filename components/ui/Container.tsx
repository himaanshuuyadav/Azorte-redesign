import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20', className)}>
      {children}
    </Tag>
  )
}
