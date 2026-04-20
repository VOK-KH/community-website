import { passkey } from '@better-auth/passkey'

function normalizeBaseUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  return url.replace(/\/$/, '')
}

/**
 * Better Auth passkey (WebAuthn) plugin — rpID / origin derived from BETTER_AUTH_URL or NEXT_PUBLIC_SITE_URL.
 * Use HTTPS and a real hostname in production (localhost is fine for dev).
 */
export function createPasskeyPlugin() {
  const base =
    normalizeBaseUrl(process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL) ??
    'http://localhost:3000'

  let rpID = 'localhost'
  const origins: string[] = []

  try {
    const u = new URL(base)
    if (u.hostname === '127.0.0.1' || u.hostname === '[::1]') {
      rpID = 'localhost'
    } else {
      rpID = u.hostname.replace(/^www\./, '')
    }
    origins.push(`${u.protocol}//${u.host}`)
  } catch {
    origins.push('http://localhost:3000')
  }

  return passkey({
    rpID,
    rpName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev',
    origin: origins,
  })
}
