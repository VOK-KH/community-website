import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'

import * as authSchema from '@/db/auth-schema'

import { buildBetterAuthSocialProviders } from './oauth-config'
import { getAuthDrizzle } from './db'
import { createPasskeyPlugin } from './passkey-plugin'

const isProduction = process.env.NODE_ENV === 'production'

const socialProviders = buildBetterAuthSocialProviders()

function normalizeBaseUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  return url.replace(/\/$/, '')
}

function hostVariants(url: string): string[] {
  try {
    const u = new URL(url)
    const host = u.host.replace(/^www\./, '')
    return [`${u.protocol}//${host}`, `${u.protocol}//www.${host}`]
  } catch {
    return [url]
  }
}

function trustedOriginList(): string[] {
  const site = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL)
  const authUrl = normalizeBaseUrl(process.env.BETTER_AUTH_URL)
  const extras = (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const base = [site, authUrl, ...extras]
    .filter((x): x is string => !!x)
    .flatMap(hostVariants)

  const devDefaults = isProduction
    ? []
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://[::1]:3000']

  return [...new Set([...base, ...devDefaults, 'https://*.vercel.app'])]
}

export const auth = betterAuth({
  database: drizzleAdapter(getAuthDrizzle(), {
    provider: 'sqlite',
    schema: authSchema,
  }),
  appName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev CMS',
  baseURL: normalizeBaseUrl(process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL),
  trustedOrigins: trustedOriginList(),
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 8,
    updateAge: 60 * 30,
  },
  user: {
    additionalFields: {
      role: {
        type: ['member', 'admin'] as const,
        defaultValue: 'member',
        required: false,
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: process.env.CMS_DISABLE_SIGNUP === 'true',
    minPasswordLength: 10,
    maxPasswordLength: 128,
  },
  ...(socialProviders ? { socialProviders } : {}),
  account: {
    encryptOAuthTokens: true,
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: isProduction ? 80 : 400,
    storage: 'memory',
  },
  advanced: {
    cookiePrefix: 'vokdev',
    useSecureCookies: isProduction,
    defaultCookieAttributes: {
      sameSite: 'lax',
      httpOnly: true,
      secure: isProduction,
      path: '/',
    },
    ipAddress: {
      disableIpTracking: false,
    },
  },
  plugins: [nextCookies(), createPasskeyPlugin()],
})
