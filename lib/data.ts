import { Tweet, User } from './types'

export const users: User[] = [
  {
    id: 'u1',
    username: 'yafreeka',
    displayName: 'Yafreeka',
    avatar: '/avatars/y.svg',
    bio: 'Yafreeka - a fresh take on X',
    followingCount: 12,
    followersCount: 420,
    verified: true,
  },
  {
    id: 'u2',
    username: 'alice',
    displayName: 'Alice Chen',
    avatar: '/avatars/a.svg',
    bio: 'Building cool things',
    followingCount: 89,
    followersCount: 1024,
  },
  {
    id: 'u3',
    username: 'bob',
    displayName: 'Bob Smith',
    avatar: '/avatars/b.svg',
    bio: 'Just vibes',
    followingCount: 43,
    followersCount: 256,
  },
  {
    id: 'u4',
    username: 'charlie',
    displayName: 'Charlie',
    avatar: '/avatars/c.svg',
    bio: 'Dev & design',
    followingCount: 128,
    followersCount: 512,
  },
]

export const tweets: Tweet[] = [
  {
    id: 't1',
    authorId: 'u1',
    content: 'Welcome to Yafreeka! Fresh UI, custom vibes.',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    likes: 42,
    retweets: 12,
    replies: 3,
    views: 1024,
    media: [{ type: 'image', url: '' }],
  },
  {
    id: 't2',
    authorId: 'u2',
    content: 'Loving the new dark theme.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    likes: 18,
    retweets: 2,
    replies: 1,
    views: 256,
    media: [{ type: 'image', url: '' }],
  },
  {
    id: 't3',
    authorId: 'u3',
    content: 'Just shipped something cool. Time to relax.',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    likes: 64,
    retweets: 8,
    replies: 5,
    views: 512,
    media: [
      { type: 'image', url: '' },
      { type: 'image', url: '' },
    ],
  },
  {
    id: 't4',
    authorId: 'u4',
    content: 'Design systems > chaos. Change my mind.',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    likes: 128,
    retweets: 24,
    replies: 10,
    views: 2048,
    media: [{ type: 'video', url: '' }],
  },
  {
    id: 't5',
    authorId: 'u2',
    content: 'Is it even a Twitter clone if it does not feel snappy?',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    likes: 32,
    retweets: 4,
    replies: 2,
    views: 768,
    media: [{ type: 'image', url: '' }],
  },
  {
    id: 't6',
    authorId: 'u1',
    content: 'Thread: why small, fast UIs win. 1/ The best interface is the one you never wait for.',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    likes: 210,
    retweets: 45,
    replies: 18,
    views: 4200,
  },
  {
    id: 't7',
    authorId: 'u4',
    content: 'Hot take: your design system is a product, not a side quest.',
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    likes: 96,
    retweets: 12,
    replies: 9,
    views: 1536,
  },
]

export function getUserById(id: string) {
  return users.find((u) => u.id === id)
}

export function getUserByUsername(username: string) {
  return users.find((u) => u.username === username)
}

export function getFeed() {
  return [...tweets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getTweetById(id: string) {
  return tweets.find((t) => t.id === id)
}

export function getThread(id: string) {
  const tweet = getTweetById(id)
  if (!tweet) return []
  const replies = tweets.filter((t) => t.replyToId === id)
  return [tweet, ...replies]
}
