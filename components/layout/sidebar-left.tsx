'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoreHorizontal, Feather } from 'lucide-react'
import { Avatar } from '@/components/shared/avatar'
import { users } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/shared/button'

export function SidebarLeft() {
  const pathname = usePathname()
  const me = users[0]

  return (
    <aside className="sticky top-0 h-dvh w-64 flex flex-col justify-between px-2 py-4">
      <div className="flex-1 min-h-0 flex flex-col">
        <Link href="/" className="flex items-center gap-2 px-3 py-2">
          <Avatar src="/avatars/y.svg" alt="Yafreeka" size={32} />
          <span className="font-bold text-lg">Yafreeka</span>
        </Link>
        <nav className="mt-4 space-y-1">
          <button className="w-full flex items-center gap-4 px-3 py-2.5 rounded-full hover:bg-secondary/60 transition-colors">
            <MoreHorizontal size={22} />
            <span className="text-lg">More</span>
          </button>
        </nav>
        <Button className="w-full mt-4" size="lg">
          <div className="flex items-center gap-2">
            <Feather size={20} />
            <span>Post</span>
          </div>
        </Button>
        <div className="mt-4 flex-1 min-h-0 overflow-y-auto">
          <h2 className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Profiles
          </h2>
          {users.map((u) => {
            const href = `/${u.username}`
            const active = pathname === href
            return (
              <Link
                key={u.id}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-full hover:bg-secondary/60 transition-colors',
                  active && 'bg-secondary/40 font-bold',
                )}
              >
                <Avatar src={u.avatar} alt={u.displayName} size={32} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{u.displayName}</div>
                  <div className="text-muted-foreground text-xs truncate">@{u.username}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <Link
        href={`/${me.username}`}
        className="flex items-center gap-3 px-2 py-2 hover:bg-secondary/60 rounded-full cursor-pointer"
      >
        <Avatar src={me.avatar} alt={me.displayName} size={40} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{me.displayName}</div>
          <div className="text-muted-foreground text-sm truncate">@{me.username}</div>
        </div>
        <MoreHorizontal size={18} />
      </Link>
    </aside>
  )
}
