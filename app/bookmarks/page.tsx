'use client'

import { Bookmark } from 'lucide-react'
import { TweetCard } from '@/components/shared/tweet-card'
import { me, useAppStore } from '@/lib/store'

export default function Bookmarks() {
  const state = useAppStore()
  const bookmarked = state.tweets.filter((t) => state.bookmarks.includes(t.id))

  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 px-4 py-3 border-b border-border">
        <h1 className="text-xl font-bold">Bookmarks</h1>
        <div className="text-xs text-muted-foreground">@{me.username}</div>
      </div>
      {bookmarked.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-8">
          <Bookmark size={64} className="text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Save posts for later</h2>
          <p className="text-muted-foreground text-sm">
            Bookmark posts to easily find them again in the future.
          </p>
        </div>
      ) : (
        <div>
          {bookmarked.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
    </div>
  )
}
