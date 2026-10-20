'use client'

import { useEffect, useRef, useState } from 'react'

export function useInfiniteScroll({
  initial = 6,
  step = 6,
  root,
}: {
  initial?: number
  step?: number
  root?: HTMLElement | null
}) {
  const [items, setItems] = useState<number>(initial)
  const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)
  const loadingRef = useRef(false)

  useEffect(() => {
    if (!sentinel) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true
          setLoading(true)
          window.setTimeout(() => {
            setItems((c) => c + step)
            setLoading(false)
            loadingRef.current = false
          }, 500)
        }
      },
      { rootMargin: '300px', root: root ?? null },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [sentinel, step, root])

  return { visibleCount: items, sentinelRef: setSentinel, loading }
}
