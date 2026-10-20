'use client'

import { useState } from 'react'
import { Avatar } from './avatar'
import { Button } from './button'
import { ImageIcon, Smile } from 'lucide-react'
import { users } from '@/lib/data'

export function Composer({
  onPost,
  placeholder = "What's happening?",
}: {
  onPost?: (content: string) => void
  placeholder?: string
}) {
  const [content, setContent] = useState('')
  const me = users[0]

  return (
    <div className="flex gap-4 p-4 border-b border-border">
      <Avatar src={me.avatar} alt={me.displayName} />
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[80px] bg-transparent resize-none outline-none text-lg placeholder:text-muted-foreground"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2 text-primary">
            <button className="p-2 hover:bg-secondary/60 rounded-full">
              <ImageIcon size={20} />
            </button>
            <button className="p-2 hover:bg-secondary/60 rounded-full">
              <Smile size={20} />
            </button>
          </div>
          <Button
            onClick={() => {
              if (!content.trim()) return
              onPost?.(content)
              setContent('')
            }}
            disabled={!content.trim()}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}
