'use client'

import Link from 'next/link'
import { generateTextTweets, useAppStore } from '@/lib/store'
import { SidebarTweet } from '@/components/shared/sidebar-tweet'
import { useInfiniteScroll } from '@/lib/use-infinite-scroll'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export function SidebarRight() {
  const state = useAppStore()
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null)
  const { visibleCount, sentinelRef, loading } = useInfiniteScroll({
    initial: 8,
    step: 6,
    root: scrollRoot,
  })

  const base = state.tweets.filter((t) => !t.media || t.media.length === 0)

  const [batch, setBatch] = useState<{ count: number; tweets: ReturnType<typeof generateTextTweets> }>(
    { count: 0, tweets: [] },
  )

  const target = state.hydrated ? visibleCount : base.length

  if (target !== batch.count) {
    const desired = Math.max(0, target - base.length)
    const extra = desired - batch.tweets.length
    if (extra > 0) {
      setBatch({ count: target, tweets: [...batch.tweets, ...generateTextTweets(extra)] })
    } else {
      setBatch({ count: target, tweets: batch.tweets.slice(0, desired) })
    }
  }

  const feed = [...base, ...batch.tweets]

  return (
    <aside className="sticky top-0 h-screen w-80 border-l border-border flex flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        ref={setScrollRoot}
        className="flex-1 min-h-0 overflow-y-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {feed.length === 0 ? (
          <p className="py-4 text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          feed.map((tweet) => <SidebarTweet key={tweet.id} tweet={tweet} />)
        )}
        <div ref={sentinelRef} className="flex items-center justify-center py-4 text-muted-foreground">
          {loading && <Loader2 size={18} className="animate-spin" />}
        </div>
      </div>
      <div className="shrink-0 px-4 py-3 text-xs text-muted-foreground space-x-2 border-t border-border">
        <Link href="#">Terms of Service</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Cookies</Link>
        <span>© 2026 Yafreeka</span>
      </div>
    </aside>
  )
}
