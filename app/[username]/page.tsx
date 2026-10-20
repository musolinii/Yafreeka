'use client'

import { Avatar } from '@/components/shared/avatar'
import { Tabs } from '@/components/shared/tabs'
import { TweetCard } from '@/components/shared/tweet-card'
import { getUserByUsername } from '@/lib/data'
import { ME_ID, actions, useAppStore } from '@/lib/store'
import { Calendar } from 'lucide-react'
import { notFound } from 'next/navigation'
import { use, useState } from 'react'
import { cn } from '@/lib/utils'

export default function Profile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params)
  const state = useAppStore()
  const user = getUserByUsername(username)
  const [activeTab, setActiveTab] = useState('posts')

  if (!user) return notFound()

  const isMe = user.id === ME_ID
  const isFollowing = state.following.includes(user.id)

  const userTweets = state.tweets.filter((t) => {
    if (t.authorId !== user.id) return false
    if (activeTab === 'replies') return Boolean(t.replyToId)
    if (activeTab === 'posts') return !t.replyToId
    if (activeTab === 'likes') return state.liked.includes(t.id)
    if (activeTab === 'media') return Boolean(t.media && t.media.length > 0)
    return true
  })

  return (
    <div>
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/40" />
      <div className="px-4 -mt-12 relative">
        <Avatar src={user.avatar} alt={user.displayName} size={80} className="border-4 border-background" />
        <div className="mt-3 flex justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              {user.displayName}
              {user.verified && <span className="text-primary">✓</span>}
            </h1>
            <div className="text-muted-foreground">@{user.username}</div>
          </div>
          {isMe ? (
            <button className="bg-foreground text-background rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-foreground/90 h-fit">
              Edit profile
            </button>
          ) : (
            <button
              onClick={() => actions.toggleFollow(user.id)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-semibold h-fit',
                isFollowing
                  ? 'border border-border hover:bg-secondary/60'
                  : 'bg-foreground text-background hover:bg-foreground/90',
              )}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
        {user.bio && <p className="mt-3 text-sm">{user.bio}</p>}
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">{user.followingCount}</span> Following
          </div>
          <div>
            <span className="font-semibold text-foreground">{user.followersCount}</span> Followers
          </div>
        </div>
        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
          <Calendar size={16} />
          Joined 2026
        </div>
      </div>
      <Tabs
        tabs={[
          { id: 'posts', label: 'Posts' },
          { id: 'replies', label: 'Replies' },
          { id: 'media', label: 'Media' },
          { id: 'likes', label: 'Likes' },
        ]}
        className="mt-4"
        onChange={setActiveTab}
      />
      <div>
        {userTweets.length > 0 ? (
          userTweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-[30vh] text-center px-8">
            <h2 className="text-xl font-bold mb-2">No posts yet</h2>
            <p className="text-muted-foreground text-sm">When there&apos;s something here, it&apos;ll show up.</p>
          </div>
        )}
      </div>
    </div>
  )
}
