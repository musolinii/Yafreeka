'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

type Tab = {
  id: string
  label: string
  className?: string
}

type Props = {
  tabs: Tab[]
  onChange?: (id: string) => void
  className?: string
}

export function Tabs({ tabs, onChange, className }: Props) {
  const [active, setActive] = useState(tabs[0]?.id)

  return (
    <div className={cn('flex border-b border-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActive(tab.id)
            onChange?.(tab.id)
          }}
          className={cn(
            'flex-1 px-2 sm:px-4 py-3 text-sm font-medium hover:bg-secondary/40 transition-colors relative',
            active === tab.id ? 'text-foreground' : 'text-muted-foreground',
            tab.className,
          )}
        >
          {tab.label}
          {active === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
        </button>
      ))}
    </div>
  )
}
