'use client'

import { Avatar } from '@/components/shared/avatar'
import { users } from '@/lib/data'
import { actions, useAppStore } from '@/lib/store'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Explore() {
  const { following } = useAppStore()

  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 px-4 py-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            placeholder="Search"
            className="w-full bg-secondary/60 border border-transparent rounded-full pl-10 pr-4 py-2 outline-none focus:border-primary focus:bg-transparent transition-colors"
          />
        </div>
      </div>
      <div className="border-b border-border">
        <h2 className="font-bold text-xl px-4 py-3">What&apos;s happening</h2>
        <div className="px-4 py-3 hover:bg-secondary/20 transition-colors border-t border-border">
          <div className="text-xs text-muted-foreground">Trending in Tech</div>
          <div className="font-semibold mt-0.5">#Yafreeka</div>
          <div className="text-xs text-muted-foreground mt-0.5">420 posts</div>
        </div>
        <div className="px-4 py-3 hover:bg-secondary/20 transition-colors border-t border-border">
          <div className="text-xs text-muted-foreground">Trending</div>
          <div className="font-semibold mt-0.5">Next.js 16</div>
          <div className="text-xs text-muted-foreground mt-0.5">12.4K posts</div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl px-4 py-3">Suggested for you</h2>
        {users.slice(1).map((u) => {
          const isFollowing = following.includes(u.id)
          return (
            <div
              key={u.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/20 transition-colors border-t border-border"
            >
              <Avatar src={u.avatar} alt={u.displayName} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{u.displayName}</div>
                <div className="text-muted-foreground text-sm truncate">@{u.username}</div>
              </div>
              <button
                onClick={() => actions.toggleFollow(u.id)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-semibold',
                  isFollowing
                    ? 'border border-border hover:bg-secondary/60'
                    : 'bg-foreground text-background hover:bg-foreground/90',
                )}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
