'use client'

import { Composer } from '@/components/shared/composer'
import { Tabs } from '@/components/shared/tabs'
import { TweetCard } from '@/components/shared/tweet-card'
import { Tweet } from '@/lib/types'
import { ME_ID, actions, generateMediaTweets, useAppStore } from '@/lib/store'
import { useInfiniteScroll } from '@/lib/use-infinite-scroll'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const state = useAppStore()
  const [activeTab, setActiveTab] = useState('for-you')
  const { visibleCount, sentinelRef, loading } = useInfiniteScroll({ initial: 6, step: 6 })

  const base =
    activeTab === 'following'
      ? state.tweets.filter(
          (t) => (t.authorId === ME_ID || state.following.includes(t.authorId)) && t.media?.length,
        )
      : state.tweets.filter((t) => t.media && t.media.length > 0)

  const [batch, setBatch] = useState<{ count: number; tweets: Tweet[] }>({
    count: 0,
    tweets: [],
  })

  const target = state.hydrated ? visibleCount : 0

  if (target !== batch.count) {
    const extra = target - batch.count
    if (extra > 0) {
      setBatch({ count: target, tweets: [...batch.tweets, ...generateMediaTweets(extra)] })
    } else {
      setBatch({ count: target, tweets: batch.tweets.slice(0, target) })
    }
  }

  const mediaFeed = [...base, ...batch.tweets]

  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 border-b border-border">
        <h1 className="text-xl font-bold px-4 py-3 md:hidden">Yafreeka</h1>
        <Tabs
          tabs={[
            { id: 'for-you', label: 'For you' },
            { id: 'following', label: 'Following' },
          ]}
          onChange={setActiveTab}
        />
      </div>
      <Composer onPost={(content) => actions.addTweet(content)} />
      <div>
        {mediaFeed.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
        <div ref={sentinelRef} className="flex items-center justify-center py-6 text-muted-foreground">
          {loading && <Loader2 size={20} className="animate-spin" />}
        </div>
      </div>
    </div>
  )
}
