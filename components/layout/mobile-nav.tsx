'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Mail, Bell } from 'lucide-react'
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
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border border-border bg-background/95 backdrop-blur px-2 py-2 shadow-lg supports-[backdrop-filter]:bg-background/70">
      {items.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          aria-label={label}
          title={label}
          className={cn(
            'p-3 rounded-full hover:bg-secondary/60 transition-colors',
            pathname === href ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon size={22} />
        </Link>
      ))}
    </nav>
  )
}
