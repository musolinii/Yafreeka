'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { tweets as seedTweets, users } from './data'
import { Media, Tweet } from './types'

const STORAGE_KEY = 'yafreeka:state:v1'
export const ME_ID = 'u1'

export type AppState = {
  tweets: Tweet[]
  liked: string[]
  retweeted: string[]
  bookmarks: string[]
  following: string[]
  hydrated: boolean
}

type Listener = () => void

function createState(): AppState {
  return {
    tweets: [...seedTweets],
    liked: [],
    retweeted: [],
    bookmarks: [],
    following: ['u2', 'u3'],
    hydrated: false,
  }
}

const SERVER_SNAPSHOT = createState()
let state: AppState = SERVER_SNAPSHOT
let hydrated = false
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach((listener) => listener())
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage unavailable (private mode, quota) — state stays in memory
  }
}

function hydrate() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  let next: AppState = { ...createState(), hydrated: true }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>
      next = { ...next, ...parsed, hydrated: true }
    }
    let maxId = 99
    for (const tweet of next.tweets) {
      const match = /^t(\d+)$/.exec(tweet.id)
      if (match) maxId = Math.max(maxId, Number(match[1]))
    }
    nextTweetId = maxId + 1
  } catch {
    // corrupt payload — fall back to seed
  }
  state = next
  persist()
  emit()
}

function setState(next: Partial<AppState>) {
  state = { ...state, ...next }
  persist()
  emit()
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return state
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT
}

export function useAppStore(): AppState {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  useEffect(() => hydrate(), [])
  return snapshot
}

function toggleIn(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
}

let nextTweetId = 100

export const actions = {
  toggleLike(id: string) {
    setState({ liked: toggleIn(state.liked, id) })
  },

  toggleRetweet(id: string) {
    setState({ retweeted: toggleIn(state.retweeted, id) })
  },

  toggleBookmark(id: string) {
    setState({ bookmarks: toggleIn(state.bookmarks, id) })
  },

  toggleFollow(userId: string) {
    if (userId === ME_ID) return
    setState({ following: toggleIn(state.following, userId) })
  },

  addTweet(content: string, replyToId?: string): Tweet | null {
    const trimmed = content.trim()
    if (!trimmed) return null

    const tweet: Tweet = {
      id: `t${nextTweetId++}`,
      authorId: ME_ID,
      content: trimmed,
      createdAt: new Date().toISOString(),
      replyToId,
      likes: 0,
      retweets: 0,
      replies: 0,
    }

    const tweets = [tweet, ...state.tweets]
    if (replyToId) {
      const index = tweets.findIndex((t) => t.id === replyToId)
      if (index !== -1) {
        tweets[index] = { ...tweets[index], replies: tweets[index].replies + 1 }
      }
    }

    setState({ tweets })
    return tweet
  },
}

export function getTweetCount(tweet: Tweet, state: AppState) {
  return {
    likes: tweet.likes + (state.liked.includes(tweet.id) ? 1 : 0),
    retweets: tweet.retweets + (state.retweeted.includes(tweet.id) ? 1 : 0),
  }
}

export const me = users[0]

const POST_TEMPLATES = [
  'Shipped a thing. It feels good.',
  'Coffee, code, repeat.',
  'Late night debugging hits different.',
  'New gradient, who dis?',
  'Themes are the new black.',
  'Ship it, then fix it.',
  'Snappy UIs are a love language.',
  'Just pushed to main. Living dangerously.',
  'This timeline needs more color.',
  'Design in the open.',
]

export function randomPlaceholder(): string {
  const hue = Math.floor(Math.random() * 360)
  const hue2 = (hue + 40 + Math.floor(Math.random() * 120)) % 360
  const angle = Math.floor(Math.random() * 360)
  return `linear-gradient(${angle}deg, hsl(${hue} 70% 55%), hsl(${hue2} 70% 40%))`
}

export function generateTweet(): Tweet {
  const author = users[1 + Math.floor(Math.random() * (users.length - 1))]
  const count = Math.random() < 0.4 ? 2 : 1
  const media: Media[] = Array.from({ length: count }, () => ({
    type: Math.random() < 0.85 ? 'image' : 'video',
    url: '',
    placeholder: randomPlaceholder(),
  }))

  return {
    id: `t${nextTweetId++}`,
    authorId: author.id,
    content: POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24)).toISOString(),
    likes: Math.floor(Math.random() * 900),
    retweets: Math.floor(Math.random() * 200),
    replies: Math.floor(Math.random() * 80),
    views: Math.floor(Math.random() * 50000),
    media,
  }
}

export function generateMediaTweets(n: number): Tweet[] {
  const tweets: Tweet[] = []
  for (let i = 0; i < n; i++) tweets.push(generateTweet())
  return tweets
}

const TEXT_TEMPLATES = [
  'Hot take: shipping beats perfection every time.',
  'Reading the docs is underrated.',
  'A thread on why simplicity scales. 1/',
  'Reminder: you can just build the thing.',
  'Small commits, big wins.',
  'The best time to refactor was yesterday.',
  'Write the test first, thank yourself later.',
  'Ideas are cheap. Momentum is rare.',
  'Been thinking about state machines all week. 1/',
  'Less chrome, more craft.',
]

export function generateTextTweet(): Tweet {
  const author = users[1 + Math.floor(Math.random() * (users.length - 1))]
  return {
    id: `t${nextTweetId++}`,
    authorId: author.id,
    content: TEXT_TEMPLATES[Math.floor(Math.random() * TEXT_TEMPLATES.length)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 48)).toISOString(),
    likes: Math.floor(Math.random() * 400),
    retweets: Math.floor(Math.random() * 120),
    replies: Math.floor(Math.random() * 40),
    views: Math.floor(Math.random() * 20000),
  }
}

export function generateTextTweets(n: number): Tweet[] {
  const tweets: Tweet[] = []
  for (let i = 0; i < n; i++) tweets.push(generateTextTweet())
  return tweets
}
