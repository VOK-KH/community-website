import { createAuthClient } from 'better-auth/react'

const baseURL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

export const authClient = createAuthClient(baseURL ? { baseURL } : {})
