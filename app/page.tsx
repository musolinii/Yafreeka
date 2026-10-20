'use client'

import { Composer } from '@/components/shared/composer'
import { Tabs } from '@/components/shared/tabs'
import { TweetCard } from '@/components/shared/tweet-card'
import { SidebarTweet } from '@/components/shared/sidebar-tweet'
import { Tweet } from '@/lib/types'
import { ME_ID, actions, generateMediaTweets, generateTextTweets, useAppStore } from '@/lib/store'
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

  const textBase = state.tweets.filter((t) => !t.media || t.media.length === 0)
  const [textBatch, setTextBatch] = useState<{ count: number; tweets: Tweet[] }>({
    count: 0,
    tweets: [],
  })

  if (state.hydrated && target !== textBatch.count) {
    const desired = Math.max(0, target - textBase.length)
    const extra = desired - textBatch.tweets.length
    if (extra > 0) {
      setTextBatch({ count: target, tweets: [...textBatch.tweets, ...generateTextTweets(extra)] })
    } else {
      setTextBatch({ count: target, tweets: textBatch.tweets.slice(0, desired) })
    }
  }

  const textFeed = [...textBase, ...textBatch.tweets]

  const showThreads = activeTab === 'threads'

  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 border-b border-border">
        <h1 className="text-xl font-bold px-4 py-3 md:hidden">Yafreeka</h1>
        <Tabs
          tabs={[
            { id: 'for-you', label: 'For you' },
            { id: 'following', label: 'Following' },
            { id: 'threads', label: 'Threads', className: 'lg:hidden' },
          ]}
          onChange={setActiveTab}
        />
      </div>
      {!showThreads && <Composer onPost={(content) => actions.addTweet(content)} />}
      <div>
        {showThreads ? (
          textFeed.map((tweet) => (
            <div key={tweet.id} className="px-3 sm:px-4">
              <SidebarTweet tweet={tweet} />
            </div>
          ))
        ) : (
          <>
            {mediaFeed.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
            <div ref={sentinelRef} className="flex items-center justify-center py-6 text-muted-foreground">
              {loading && <Loader2 size={20} className="animate-spin" />}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
