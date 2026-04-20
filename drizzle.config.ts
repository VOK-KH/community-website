import { config as loadEnv } from 'dotenv'
import { resolve } from 'node:path'
import { defineConfig } from 'drizzle-kit'

const root = process.cwd()
const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development'

loadEnv({ path: resolve(root, '.env') })
loadEnv({ path: resolve(root, `.env.${nodeEnv}`), override: true })
loadEnv({ path: resolve(root, '.env.local'), override: true })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN ?? process.env.CLOUDFLARE_API_TOKEN!,
  },
});
