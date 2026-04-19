/** Minimal user fields for display (Better Auth user or equivalent). */
export type AuthUserLike = {
  name?: string | null
  email: string
  image?: string | null
}

export type AuthUserDisplay = {
  email: string
  displayName: string
  initials: string
  image: string | null
}

export function authUserDisplay(user: AuthUserLike): AuthUserDisplay {
  const email = user.email
  const name = user.name?.trim() ?? ''
  const displayName = name || email.split('@')[0] || email
  const image = typeof user.image === 'string' && user.image.trim() ? user.image.trim() : null

  if (name.includes(' ')) {
    const parts = name.split(/\s+/).filter(Boolean)
    const a = parts[0]?.[0]
    const b = parts[parts.length - 1]?.[0]
    if (a && b) return { email, displayName, initials: (a + b).toUpperCase(), image }
  }

  const source = (name || email).replace(/\s+/g, '')
  const initials =
    source.length >= 2 ? source.slice(0, 2).toUpperCase() : source.toUpperCase() || '?'

  return { email, displayName, initials, image }
}
