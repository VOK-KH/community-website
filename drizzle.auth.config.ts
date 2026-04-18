import { config as loadEnv } from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'drizzle-kit'

const root = process.cwd()

loadEnv({ path: path.resolve(root, '.env') })
loadEnv({
  path: path.resolve(root, `.env.${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`),
  override: true,
})
loadEnv({ path: path.resolve(root, '.env.local'), override: true })

function authDatabaseUrl(): string {
  const fromEnv = process.env.AUTH_DATABASE_URL?.trim()
  if (fromEnv) return fromEnv

  const raw = process.env.AUTH_DATABASE_PATH?.trim()
  const file = raw
    ? path.isAbsolute(raw)
      ? raw
      : path.resolve(root, raw)
    : path.resolve(root, '.data', 'auth.sqlite')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  return `file:${file}`
}

export default defineConfig({
  schema: './src/db/auth-schema.ts',
  out: './drizzle/auth',
  dialect: 'turso',
  dbCredentials: {
    url: authDatabaseUrl(),
  },
})
