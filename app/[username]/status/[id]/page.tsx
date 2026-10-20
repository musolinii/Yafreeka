'use client'

import { Composer } from '@/components/shared/composer'
import { TweetCard } from '@/components/shared/tweet-card'
import { actions, useAppStore } from '@/lib/store'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { ArrowLeft } from 'lucide-react'

export default function Status({
  params,
}: {
  params: Promise<{ username: string; id: string }>
}) {
  const { id } = use(params)
  const state = useAppStore()
  const parent = state.tweets.find((t) => t.id === id)
  if (!parent) return state.hydrated ? notFound() : null

  const replies = state.tweets.filter((t) => t.replyToId === parent.id)

  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 px-4 py-3 border-b border-border flex items-center gap-6">
        <Link href="/" className="hover:bg-secondary/60 rounded-full p-2">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Post</h1>
      </div>
      <TweetCard tweet={parent} isThread />
      <Composer
        placeholder="Post your reply"
        onPost={(content) => actions.addTweet(content, parent.id)}
      />
      {replies.length > 0 && (
        <div>
          {replies.map((reply) => (
            <TweetCard key={reply.id} tweet={reply} />
          ))}
        </div>
      )}
    </div>
  )
}
