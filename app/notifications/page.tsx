import { Avatar } from '@/components/shared/avatar'
import { Tabs } from '@/components/shared/tabs'
import { Bell } from 'lucide-react'

export default function Notifications() {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'mentions', label: 'Mentions' },
  ]

  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 border-b border-border">
        <h1 className="text-xl font-bold px-4 py-3">Notifications</h1>
        <Tabs tabs={tabs} />
      </div>
      <div className="divide-y divide-border">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-secondary/20 transition-colors">
            <Bell className="text-primary mt-1 shrink-0" size={20} />
            <div className="flex-1 min-w-0">
              <Avatar src="/avatars/a.svg" alt="User" size={32} />
              <div className="mt-2 text-sm">
                <span className="font-semibold">Alice</span> liked your post
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
