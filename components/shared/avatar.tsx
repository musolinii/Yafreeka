import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt: string
  size?: number
  className?: string
}

export function Avatar({ src, alt, size = 40, className }: Props) {
  return (
    <div className={cn('relative overflow-hidden rounded-full', className)} style={{ width: size, height: size }}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  )
}
