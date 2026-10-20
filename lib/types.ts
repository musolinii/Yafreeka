export type User = {
  id: string
  username: string
  displayName: string
  avatar: string
  bio?: string
  followingCount: number
  followersCount: number
  verified?: boolean
}

export type Media = {
  type: 'image' | 'video'
  url: string
  placeholder?: string
}

export type Tweet = {
  id: string
  authorId: string
  content: string
  createdAt: string // ISO
  replyToId?: string
  likes: number
  retweets: number
  replies: number
  views?: number
  media?: Media[]
}
