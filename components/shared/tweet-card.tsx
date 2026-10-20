'use client'

import { Tweet } from '@/lib/types'
import { getUserById } from '@/lib/data'
import { actions, getTweetCount, useAppStore } from '@/lib/store'
import { formatDistanceToNow } from 'date-fns'
import { Avatar } from './avatar'
import { MediaGrid } from './media-grid'
import { MessageCircle, Repeat2, Heart, BarChart3, Share, Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function TweetCard({ tweet, isThread }: { tweet: Tweet; isThread?: boolean }) {
  const state = useAppStore()
  const author = getUserById(tweet.authorId)
  const counts = getTweetCount(tweet, state)
  const isLiked = state.liked.includes(tweet.id)
  const isRetweeted = state.retweeted.includes(tweet.id)
  const isBookmarked = state.bookmarks.includes(tweet.id)
  if (!author) return null

  return (
    <article
      className={cn(
        'flex gap-3 sm:gap-4 p-3 sm:p-4 border-b border-border hover:bg-secondary/20 transition-colors',
        isThread && 'border-none',
      )}
    >
      <Avatar src={author.avatar} alt={author.displayName} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 text-sm min-w-0">
          <span className="font-semibold truncate">{author.displayName}</span>
          {author.verified && <span className="text-primary">✓</span>}
          <span className="text-muted-foreground truncate">@{author.username}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
          </span>
        </div>
        <Link href={`/${author.username}/status/${tweet.id}`} className="block">
          <div className="mt-2 whitespace-pre-wrap break-words">{tweet.content}</div>
          {tweet.media && tweet.media.length > 0 && (
            <div onClick={(e) => e.preventDefault()}>
              <MediaGrid media={tweet.media} seed={tweet.id} />
            </div>
          )}
        </Link>
        <div className="flex items-center justify-between mt-2 -ml-2 max-w-md text-muted-foreground">
          <Link
            href={`/${author.username}/status/${tweet.id}`}
            className="flex items-center gap-1.5 hover:text-primary group"
            aria-label="Replies"
          >
            <div className="flex items-center justify-center h-9 w-9 group-hover:bg-primary/10 rounded-full">
              <MessageCircle size={18} />
            </div>
            <span className="text-xs">{tweet.replies > 0 && tweet.replies}</span>
          </Link>
          <button
            onClick={() => actions.toggleRetweet(tweet.id)}
            aria-label="Retweet"
            className={cn(
              'flex items-center gap-1.5 hover:text-green-500 group',
              isRetweeted && 'text-green-500',
            )}
          >
            <div className="flex items-center justify-center h-9 w-9 group-hover:bg-green-500/10 rounded-full">
              <Repeat2 size={18} />
            </div>
            <span className="text-xs">{counts.retweets > 0 && counts.retweets}</span>
          </button>
          <button
            onClick={() => actions.toggleLike(tweet.id)}
            aria-label="Like"
            className={cn(
              'flex items-center gap-1.5 hover:text-red-500 group',
              isLiked && 'text-red-500',
            )}
          >
            <div className="flex items-center justify-center h-9 w-9 group-hover:bg-red-500/10 rounded-full">
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </div>
            <span className="text-xs">{counts.likes > 0 && counts.likes}</span>
          </button>
          <button
            onClick={() => actions.toggleBookmark(tweet.id)}
            className={cn(
              'flex items-center gap-1.5 hover:text-primary group',
              isBookmarked && 'text-primary',
            )}
            aria-label="Bookmark"
          >
            <div className="flex items-center justify-center h-9 w-9 group-hover:bg-primary/10 rounded-full">
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </div>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
            <div className="flex items-center justify-center h-9 w-9">
              <BarChart3 size={18} />
            </div>
            <span className="text-xs">{tweet.views && tweet.views > 0 && tweet.views}</span>
          </div>
          <button
            className="flex items-center justify-center h-9 w-9 hover:bg-primary/10 hover:text-primary rounded-full"
            aria-label="Share"
          >
            <Share size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}
