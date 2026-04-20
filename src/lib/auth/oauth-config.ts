export type OAuthProviderId = 'google' | 'github'

/** Providers that have both ID and secret set (server-only; import from RSC / server.ts). */
export function getEnabledOAuthProviders(): OAuthProviderId[] {
  const list: OAuthProviderId[] = []
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    list.push('google')
  }
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    list.push('github')
  }
  return list
}

type SocialProviderConfig = { clientId: string; clientSecret: string }

export function buildBetterAuthSocialProviders():
  | { google?: SocialProviderConfig; github?: SocialProviderConfig }
  | undefined {
  const googleId = process.env.GOOGLE_CLIENT_ID
  const googleSecret = process.env.GOOGLE_CLIENT_SECRET
  const githubId = process.env.GITHUB_CLIENT_ID
  const githubSecret = process.env.GITHUB_CLIENT_SECRET

  const social: {
    google?: { clientId: string; clientSecret: string }
    github?: { clientId: string; clientSecret: string }
  } = {}

  if (googleId && googleSecret) {
    social.google = { clientId: googleId, clientSecret: googleSecret }
  }
  if (githubId && githubSecret) {
    social.github = { clientId: githubId, clientSecret: githubSecret }
  }

  return Object.keys(social).length ? social : undefined
}
