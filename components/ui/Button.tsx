import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  as?: 'button' | 'a'
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-azorte-coral text-white hover:opacity-90 hover:scale-[1.02] active:scale-95',
  secondary:
    'bg-transparent text-azorte-coral border border-azorte-coral hover:bg-azorte-coral hover:text-white active:bg-azorte-coral/90',
  ghost:
    'bg-transparent text-azorte-coral hover:underline underline-offset-4',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', as = 'button', href, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center px-6 py-3 rounded font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azorte-coral focus-visible:ring-offset-2 focus-visible:ring-offset-azorte-black'

    if (as === 'a' && href) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variantStyles[variant], className)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
