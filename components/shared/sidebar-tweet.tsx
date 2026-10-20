'use client'

import { Tweet } from '@/lib/types'
import { getUserById } from '@/lib/data'
import { actions, getTweetCount, useAppStore } from '@/lib/store'
import { Avatar } from './avatar'
import { formatDistanceToNow } from 'date-fns'
import { MessageCircle, Repeat2, Heart, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function SidebarTweet({ tweet }: { tweet: Tweet }) {
  const state = useAppStore()
  const author = getUserById(tweet.authorId)
  const counts = getTweetCount(tweet, state)
  const isLiked = state.liked.includes(tweet.id)
  const isRetweeted = state.retweeted.includes(tweet.id)
  const [expanded, setExpanded] = useState(false)

  if (!author) return null

  const replies = state.tweets.filter((t) => t.replyToId === tweet.id)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="block w-full text-left py-3 hover:bg-secondary/20 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm">
          <Avatar src={author.avatar} alt={author.displayName} size={28} />
          <span className="font-semibold truncate">{author.displayName}</span>
          <span className="text-muted-foreground text-xs truncate">@{author.username}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground text-xs">
            {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
          </span>
          <FileText
            size={14}
            className={cn('ml-auto text-muted-foreground transition-transform', expanded && 'rotate-90')}
          />
        </div>
        <p className={cn('mt-1.5 text-sm whitespace-pre-wrap break-words', !expanded && 'line-clamp-3')}>
          {tweet.content}
        </p>
      </button>

      {expanded && (
        <div className="pb-3">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1 text-xs">
              <MessageCircle size={14} /> {replies.length}
            </span>
            <button
              onClick={() => actions.toggleRetweet(tweet.id)}
              className={cn(
                'flex items-center gap-1 text-xs hover:text-green-500',
                isRetweeted && 'text-green-500',
              )}
            >
              <Repeat2 size={14} /> {counts.retweets}
            </button>
            <button
              onClick={() => actions.toggleLike(tweet.id)}
              className={cn('flex items-center gap-1 text-xs hover:text-red-500', isLiked && 'text-red-500')}
            >
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} /> {counts.likes}
            </button>
          </div>

          <div className="mt-2 space-y-2 border-l border-border pl-3">
            {replies.length === 0 ? (
              <p className="text-xs text-muted-foreground">No replies yet.</p>
            ) : (
              replies.map((reply) => {
                const replyAuthor = getUserById(reply.authorId)
                if (!replyAuthor) return null
                return (
                  <div key={reply.id} className="flex gap-2">
                    <Avatar src={replyAuthor.avatar} alt={replyAuthor.displayName} size={22} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-semibold truncate">{replyAuthor.displayName}</span>
                        <span className="text-muted-foreground truncate">@{replyAuthor.username}</span>
                      </div>
                      <p className="text-xs whitespace-pre-wrap break-words">{reply.content}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
