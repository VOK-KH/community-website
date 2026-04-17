export type CmsRole = 'member' | 'admin'

export type CmsMember = {
  id: string
  name: string
  email: string
  role: CmsRole
  joinedAt: string
  status: 'active' | 'paused'
}

export type CmsPost = {
  id: string
  title: string
  body: string
  tags: string[]
  createdAt: string
  published: boolean
}

export type CmsEvent = {
  id: string
  title: string
  location: string
  startsAt: string
  description: string
  published: boolean
}

type StorageKey = 'cms_members' | 'cms_posts' | 'cms_events'

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function nowIso() {
  return new Date().toISOString()
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
}

function getDefaultMembers(): CmsMember[] {
  return [
    {
      id: uid('mem'),
      name: 'VokDev Admin',
      email: 'admin@vokdev.com',
      role: 'admin',
      joinedAt: nowIso(),
      status: 'active',
    },
    {
      id: uid('mem'),
      name: 'Community Member',
      email: 'member@vokdev.com',
      role: 'member',
      joinedAt: nowIso(),
      status: 'active',
    },
  ]
}

function getDefaultPosts(): CmsPost[] {
  return [
    {
      id: uid('post'),
      title: 'Welcome to the community CMS',
      body: 'Use this area to publish announcements, manage members, and plan events.',
      tags: ['welcome', 'cms'],
      createdAt: nowIso(),
      published: true,
    },
  ]
}

function getDefaultEvents(): CmsEvent[] {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
  return [
    {
      id: uid('evt'),
      title: 'Weekly Build Night',
      location: 'Discord (voice)',
      startsAt: tomorrow.toISOString(),
      description: 'Ship something small together. Share progress at the end.',
      published: true,
    },
  ]
}

function readKey<T>(key: StorageKey, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  const parsed = safeJsonParse<T>(window.localStorage.getItem(key))
  return parsed ?? fallback
}

function writeKey<T>(key: StorageKey, value: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const cmsStorage = {
  members: {
    list(): CmsMember[] {
      return readKey('cms_members', getDefaultMembers())
    },
    upsert(member: Omit<CmsMember, 'id' | 'joinedAt'> & Partial<Pick<CmsMember, 'id' | 'joinedAt'>>) {
      const current = this.list()
      const next: CmsMember = {
        id: member.id ?? uid('mem'),
        joinedAt: member.joinedAt ?? nowIso(),
        name: member.name,
        email: member.email,
        role: member.role,
        status: member.status,
      }
      const updated = current.some((m) => m.id === next.id)
        ? current.map((m) => (m.id === next.id ? next : m))
        : [next, ...current]
      writeKey('cms_members', updated)
      return next
    },
    remove(id: string) {
      const current = this.list()
      writeKey(
        'cms_members',
        current.filter((m) => m.id !== id),
      )
    },
  },
  posts: {
    list(): CmsPost[] {
      return readKey('cms_posts', getDefaultPosts())
    },
    upsert(post: Omit<CmsPost, 'id' | 'createdAt'> & Partial<Pick<CmsPost, 'id' | 'createdAt'>>) {
      const current = this.list()
      const next: CmsPost = {
        id: post.id ?? uid('post'),
        createdAt: post.createdAt ?? nowIso(),
        title: post.title,
        body: post.body,
        tags: post.tags,
        published: post.published,
      }
      const updated = current.some((p) => p.id === next.id)
        ? current.map((p) => (p.id === next.id ? next : p))
        : [next, ...current]
      writeKey('cms_posts', updated)
      return next
    },
    remove(id: string) {
      const current = this.list()
      writeKey(
        'cms_posts',
        current.filter((p) => p.id !== id),
      )
    },
  },
  events: {
    list(): CmsEvent[] {
      return readKey('cms_events', getDefaultEvents())
    },
    upsert(event: Omit<CmsEvent, 'id'> & Partial<Pick<CmsEvent, 'id'>>) {
      const current = this.list()
      const next: CmsEvent = {
        id: event.id ?? uid('evt'),
        title: event.title,
        location: event.location,
        startsAt: event.startsAt,
        description: event.description,
        published: event.published,
      }
      const updated = current.some((e) => e.id === next.id)
        ? current.map((e) => (e.id === next.id ? next : e))
        : [next, ...current]
      writeKey('cms_events', updated)
      return next
    },
    remove(id: string) {
      const current = this.list()
      writeKey(
        'cms_events',
        current.filter((e) => e.id !== id),
      )
    },
  },
} as const

