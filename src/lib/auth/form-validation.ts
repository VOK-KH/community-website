const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateAuthEmailPassword(email: string, password: string): string | null {
  if (!email) {
    return 'Please enter your email address.'
  }
  if (!EMAIL_RE.test(email)) {
    return 'Please enter a valid email address.'
  }
  if (!password) {
    return 'Please enter your password.'
  }
  if (password.length < 10) {
    return 'Password must be at least 10 characters.'
  }
  return null
}
