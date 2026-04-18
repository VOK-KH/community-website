import { drizzle } from 'drizzle-orm/d1'

export type D1Env = {
  DB: D1Database;
}

export function db(env: D1Env) {
  return drizzle(env.DB)
}

