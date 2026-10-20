'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Mail, Bell, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const pathname = usePathname()

  const items = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/explore', icon: Search, label: 'Explore' },
    { href: '/messages', icon: Mail, label: 'Messages' },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
  ]

  return (
    <>
      <nav className="md:hidden fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border border-border bg-background/95 backdrop-blur px-2 py-2 shadow-lg supports-[backdrop-filter]:bg-background/70 max-w-[calc(100vw-1.5rem)]">
        {items.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            title={label}
            className={cn(
              'flex items-center justify-center h-11 w-11 rounded-full hover:bg-secondary/60 transition-colors active:bg-secondary/80',
              pathname === href ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon size={22} />
          </Link>
        ))}
      </nav>
      <Link
        href="/explore"
        aria-label="Explore"
        title="Explore"
        className={cn(
          'md:hidden fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-50 flex items-center justify-center h-[3.875rem] w-[3.875rem] rounded-full border border-border bg-background/95 backdrop-blur shadow-lg supports-[backdrop-filter]:bg-background/70 transition-colors active:bg-secondary/80',
          pathname === '/explore' ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        <User size={22} />
      </Link>
    </>
  )
}
