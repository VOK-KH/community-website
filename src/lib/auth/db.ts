import fs from 'node:fs'
import path from 'node:path'

import { createClient, type Client } from '@libsql/client'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'

import * as authSchema from '@/db/auth-schema'

const globalForAuth = globalThis as unknown as {
  authLibsql?: Client
  authDrizzle?: LibSQLDatabase<typeof authSchema>
}

function authDatabaseUrl(): string {
  const fromEnv = process.env.AUTH_DATABASE_URL?.trim()
  if (fromEnv) return fromEnv

  const filePath = process.env.AUTH_DATABASE_PATH?.trim()
    ? path.isAbsolute(process.env.AUTH_DATABASE_PATH)
      ? process.env.AUTH_DATABASE_PATH
      : path.join(/* turbopackIgnore: true */ process.cwd(), process.env.AUTH_DATABASE_PATH)
    : path.join(/* turbopackIgnore: true */ process.cwd(), '.data', 'auth.sqlite')

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  return `file:${filePath}`
}

function getLibsql(): Client {
  if (!globalForAuth.authLibsql) {
    globalForAuth.authLibsql = createClient({ url: authDatabaseUrl() })
  }
  return globalForAuth.authLibsql
}

export function getAuthDrizzle() {
  if (!globalForAuth.authDrizzle) {
    globalForAuth.authDrizzle = drizzle(getLibsql(), { schema: authSchema })
  }
  return globalForAuth.authDrizzle
}
