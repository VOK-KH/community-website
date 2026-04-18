/** Emails that may access `/cms/admin/*` (in addition to `user.role === 'admin'`). Safe for proxy — no `next/headers`. */
export function adminEmailAllowlist(): Set<string> {
  const raw = process.env.CMS_ADMIN_EMAILS ?? ''
  return new Set(
    raw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  )
}
