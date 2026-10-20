# Yafreeka

A fresh take on X (Twitter) — a modern, snappy social timeline built with Next.js. Media posts live in the center column, text threads live in the right rail, and everything is interactive: likes, retweets, bookmarks, follows, posting, and replies persist in the browser.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** — icons
- **date-fns** — relative timestamps
- **clsx** + **tailwind-merge** — class composition

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Features

### Center column (media feed)
- Renders **media-only tweets**: each post shows its author, text, and media.
- Media is rendered with **randomly generated color gradients** (CSS `linear-gradient` placeholders) instead of real image files.
- **Infinite scroll** — more media posts are generated and appended as you scroll, forever.
- Composer with a working "Post" button at the top of the feed.
- "For you" / "Following" tabs filter the feed.

### Right rail (threads)
- Renders **text-only tweets** (posts with no media).
- **Infinite scroll** inside its own scroll container.
- **Expands in place**: click a tweet to expand it on the rail — full text, engagement counts (reply / retweet / like with working retweet & like toggles), and its replies rendered inline.
- Scrollbars are hidden; the footer is pinned to the bottom.

### Left rail
- Yafreeka logo, "More", and a "Post" button.
- A scrollable list of **profiles** — each links to that user's `/[username]` page and highlights when active.
- Account card at the bottom links to your own profile.

### Floating navigation
- Home, Explore, Messages, and Notifications render as **floating circular icons** centered at the bottom of the screen (all viewports).

### State & interactivity
- `lib/store.ts` is a lightweight **localStorage-backed store** (`useSyncExternalStore`), seeded from `lib/data.ts` and hydrated client-side.
- Supported actions: like, retweet, bookmark, follow/unfollow, post, and reply.
- Actions are optimistic and persist across refreshes; corrupt or blocked storage falls back gracefully to the seed.
- Hydration-safe: random content is only generated after hydration to avoid server/client mismatches.

### Pages
- `/` — home media feed.
- `/explore` — search field, trending, and suggested users with follow buttons.
- `/bookmarks` — your bookmarked posts (empty state when none).
- `/messages`, `/notifications` — timeline placeholders.
- `/[username]` — profile with avatar, bio, follower counts, follow/edit button, and tabs: **Posts / Replies / Media / Likes**.
- `/[username]/status/[id]` — post detail with a reply composer and threaded replies.

### Media rendering
- `components/shared/media-grid.tsx` renders a single media item full-width, or a 2-column grid for 2+ items.
- Uses a provided gradient placeholder when present, otherwise derives a **deterministic** gradient from a seed (hashed hue pair), so colors are stable across renders and visible during SSR.

## Project Structure

```
app/
  page.tsx                     # home media feed + infinite scroll
  layout.tsx                   # shell: left rail, center, right rail, floating nav
  bookmarks/page.tsx
  explore/page.tsx
  messages/page.tsx
  notifications/page.tsx
  [username]/page.tsx          # profile
  [username]/status/[id]/page.tsx  # post detail + replies
components/
  layout/sidebar-left.tsx      # logo, post button, profiles list
  layout/sidebar-right.tsx     # text-only threads with infinite scroll
  layout/mobile-nav.tsx        # floating bottom nav
  shared/avatar.tsx
  shared/button.tsx
  shared/composer.tsx
  shared/tabs.tsx
  shared/tweet-card.tsx        # full tweet card (media feed)
  shared/sidebar-tweet.tsx     # expandable text tweet (right rail)
  shared/media-grid.tsx        # gradient media placeholders
lib/
  data.ts                      # seed users + tweets and lookup helpers
  store.ts                     # localStorage store, actions, generators
  types.ts                     # User, Tweet, Media types
  use-infinite-scroll.ts       # IntersectionObserver hook
  utils.ts                     # cn() helper
```

## Notes

- This is a front-end demo: there is **no backend**. Users, tweets, and engagement are mocked in `lib/data.ts` and generated client-side; all changes live in `localStorage`.
- Seed tweets carry media so the center column has content immediately; text-only threads seed the right rail.
- Fixed along the way: Next.js 16 `params` must be awaited/`use()`d in dynamic routes, and several missing imports/incorrect type imports.
