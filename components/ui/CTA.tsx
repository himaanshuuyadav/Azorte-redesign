import { cn } from '@/lib/utils/cn'
import { Button } from './Button'

interface CTAProps {
  href: string
  children: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export function CTA({ href, children, variant = 'primary', className }: CTAProps) {
  return (
    <Button
      as="a"
      href={href}
      variant={variant}
      className={cn('gap-2', className)}
    >
      {children}
      <span aria-hidden="true" className="inline-block text-sm leading-none">↗</span>
    </Button>
  )
}
