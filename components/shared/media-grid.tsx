'use client'

import { Media } from '@/lib/types'
import { cn } from '@/lib/utils'

function hashToHue(input: string) {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) % 360
  }
  return hash
}

function MediaPlaceholder({
  media,
  seed,
  className,
  children,
}: {
  media: Media
  seed: string
  className?: string
  children?: React.ReactNode
}) {
  const hue = hashToHue(seed)
  const hue2 = (hue + 70) % 360
  const style = media.placeholder
    ? { backgroundImage: media.placeholder }
    : { backgroundImage: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${hue2} 70% 40%))` }

  return (
    <div
      className={cn(
        'flex items-center justify-center text-white/90 text-sm font-medium bg-secondary/40',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export function MediaGrid({ media, seed = 'yafreeka' }: { media: Media[]; seed?: string }) {
  if (media.length === 0) return null

  if (media.length === 1) {
    return (
      <div className="mt-3 rounded-2xl overflow-hidden border border-border">
        <MediaPlaceholder media={media[0]} seed={`${seed}-0`} className="h-64">
          {media[0].type === 'video' ? 'Video' : 'Image'}
        </MediaPlaceholder>
      </div>
    )
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-1 rounded-2xl overflow-hidden border border-border">
      {media.slice(0, 4).map((item, index) => (
        <MediaPlaceholder key={index} media={item} seed={`${seed}-${index}`} className="h-36">
          {item.type === 'video' ? 'Video' : 'Image'}
        </MediaPlaceholder>
      ))}
    </div>
  )
}
