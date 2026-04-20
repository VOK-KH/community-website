import fs from 'node:fs'
import path from 'node:path'

import { createClient, type Client } from '@libsql/client'
import { drizzle as drizzleD1 } from 'drizzle-orm/d1'
import { drizzle as drizzleLibsql, type LibSQLDatabase } from 'drizzle-orm/libsql'

import * as authSchema from '@/db/auth-schema'

import { createD1HttpClient } from './d1-http'

import type { DrizzleD1Database } from 'drizzle-orm/d1'

type AuthDrizzle = LibSQLDatabase<typeof authSchema> | DrizzleD1Database<typeof authSchema>

const globalForAuth = globalThis as unknown as {
  authLibsql?: Client
  authDrizzle?: AuthDrizzle
}

function isRemoteLibsqlUrl(url: string): boolean {
  return /^(libsql|https|wss):\/\//i.test(url)
}

function hasD1HttpCredentials(): boolean {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim()
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID?.trim()
  const token =
    process.env.CLOUDFLARE_D1_TOKEN?.trim() || process.env.CLOUDFLARE_API_TOKEN?.trim()
  return Boolean(accountId && databaseId && token)
}

function d1ApiToken(): string {
  return (
    process.env.CLOUDFLARE_D1_TOKEN?.trim() ||
    process.env.CLOUDFLARE_API_TOKEN?.trim() ||
    ''
  )
}

function authDatabaseUrl(): string {
  const fromEnv = process.env.AUTH_DATABASE_URL?.trim()
  if (fromEnv) {
    if (process.env.VERCEL === '1' && fromEnv.startsWith('file:')) {
      throw new Error(
        '[auth] File-based SQLite (file:) does not work on Vercel. Use Cloudflare D1 (set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, CLOUDFLARE_D1_TOKEN) or a remote libsql URL.',
      )
    }
    return fromEnv
  }

  if (process.env.VERCEL === '1' && !hasD1HttpCredentials()) {
    throw new Error(
      '[auth] On Vercel, set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, and CLOUDFLARE_D1_TOKEN (or CLOUDFLARE_API_TOKEN) so Better Auth can use D1 over HTTP.',
    )
  }

  const filePath = process.env.AUTH_DATABASE_PATH?.trim()
    ? path.isAbsolute(process.env.AUTH_DATABASE_PATH)
      ? process.env.AUTH_DATABASE_PATH
      : path.join(/* turbopackIgnore: true */ process.cwd(), process.env.AUTH_DATABASE_PATH)
    : path.join(/* turbopackIgnore: true */ process.cwd(), '.data', 'auth.sqlite')

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  return `file:${filePath}`
}

function authDatabaseAuthToken(): string | undefined {
  return (
    process.env.AUTH_DATABASE_AUTH_TOKEN?.trim() ||
    process.env.TURSO_AUTH_TOKEN?.trim() ||
    undefined
  )
}

function getLibsql(): Client {
  if (!globalForAuth.authLibsql) {
    const url = authDatabaseUrl()
    if (isRemoteLibsqlUrl(url)) {
      globalForAuth.authLibsql = createClient({
        url,
        authToken: authDatabaseAuthToken(),
      })
    } else {
      globalForAuth.authLibsql = createClient({ url })
    }
  }
  return globalForAuth.authLibsql
}

export function getAuthDrizzle(): AuthDrizzle {
  if (!globalForAuth.authDrizzle) {
    if (hasD1HttpCredentials()) {
      const d1 = createD1HttpClient({
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!.trim(),
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!.trim(),
        apiToken: d1ApiToken(),
      })
      globalForAuth.authDrizzle = drizzleD1(d1 as never, { schema: authSchema })
    } else {
      globalForAuth.authDrizzle = drizzleLibsql(getLibsql(), { schema: authSchema })
    }
  }
  return globalForAuth.authDrizzle
}
