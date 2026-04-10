'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Projects', href: '/projects' },
        { label: 'Community', href: '/community' },
        { label: 'Events', href: '/events' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Design System', href: '/design-system' },
        { label: 'Guidelines', href: '/guidelines' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ]

  const socialLinks = [
    { icon: 'Github', href: 'https://github.com' },
    { icon: 'Twitter', href: 'https://twitter.com' },
    { icon: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: 'Discord', href: 'https://discord.com' },
  ]

  return (
    <footer className="border-t border-border/40 bg-card mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link 
              href="/" 
              className="flex items-center gap-2 font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary mb-4"
            >
              <span className="text-xl">⚡</span>
              VokDev
            </Link>
            <p className="text-sm text-muted-foreground">
              Where tech professionals collaborate, create, and grow together.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                  aria-label={social.icon}
                >
                  <span className="text-sm font-bold">{social.icon.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="font-semibold text-foreground mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} VokDev. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
