import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { cn } from '@/lib/utils/cn'

interface ImageProps extends Omit<NextImageProps, 'className'> {
  className?: string
  wrapperClassName?: string
}

export function Image({
  src,
  alt,
  fill,
  width,
  height,
  className,
  wrapperClassName,
  priority,
  ...props
}: ImageProps) {
  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      <NextImage
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn('object-cover', className)}
        priority={priority}
        sizes={priority ? '(max-width: 768px) 100vw, 50vw' : undefined}
        {...props}
      />
    </div>
  )
}
