'use client'

import Footer from '@/components/Footer'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevInput } from '@/components/VokDevInput'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Mail, MessageSquare, Megaphone, Check, CheckCircle2 } from 'lucide-react'

const contactMethods: {
  icon: LucideIcon
  title: string
  description: string
  contact: string
  time: string
}[] = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us your questions and feedback',
    contact: 'hello@vokdev.com',
    time: 'Response within 24 hours',
  },
  {
    icon: MessageSquare,
    title: 'Discord',
    description: 'Join our community discord server',
    contact: 'discord.gg/vokdev',
    time: 'Live chat support',
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    description: 'Follow us on social platforms',
    contact: '@vokdev',
    time: 'Updates and announcements',
  },
]

const joinBenefits = [
  'Access to exclusive projects and collaborations',
  'Mentorship from industry experts',
  'Networking with 2,450+ professionals',
  'Monthly webinars and workshops',
  'Early access to new features',
  'Community recognition and badges',
]

const contactFaqs = [
  {
    q: 'Is VokDev free to join?',
    a: 'Yes! VokDev is completely free to join. We offer a premium membership option with additional features, but the community is always free.',
  },
  {
    q: 'How do I submit a project?',
    a: 'Once you\'re logged in, navigate to your profile and click "Submit Project". Fill in the details and our team will review it within 48 hours.',
  },
  {
    q: 'Can I collaborate with other members?',
    a: 'Absolutely! You can browse projects, request to join teams, and connect with other members through our messaging system.',
  },
  {
    q: 'What support options are available?',
    a: 'We offer email support, Discord community chat, and a knowledge base. Premium members also get priority support.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="pg">
      <main className="flex-1">
        <section className="pg-hero" aria-labelledby="contact-hero-title">
          <div className="pg-hero-inner">
            <p className="pg-hero-chip">
              <span className="chip-dot" aria-hidden />
              Contact
            </p>
            <h1 id="contact-hero-title">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="hero-sub">
              Whether you need help, want to partner, or have product feedback, our team reads every message and routes it to the right people. Pick a channel below or write to us directly.
            </p>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="methods-heading">
          <div className="pg-sec-inner">
            <header className="pg-sec-hd">
              <h2 id="methods-heading">Ways to reach us</h2>
              <p>Choose the option that fits your question. We monitor all channels and aim to respond as quickly as we can.</p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {contactMethods.map((method, index) => (
                <article key={index} className="pg-card pg-card-accent">
                  <div className="pg-icon pg-icon-lg mb-5" aria-hidden>
                    <method.icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{method.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{method.description}</p>
                  <div className="mt-6 border-t border-border/50 pt-5">
                    <p className="font-medium text-foreground">{method.contact}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{method.time}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="pg-divider mx-auto max-w-3xl px-4" aria-hidden />

        <section className="pg-sec pt-0 md:pt-0" aria-labelledby="form-heading">
          <div className="pg-sec-inner max-w-2xl">
            <header className="pg-sec-hd">
              <h2 id="form-heading">Send a message</h2>
              <p>Share a few details and we will reply by email. For urgent issues, Discord is usually fastest.</p>
            </header>

            <div className="pg-form-card">
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="mb-4 flex justify-center text-primary" aria-hidden>
                    <CheckCircle2 className="h-14 w-14" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">Thank you!</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    Your message has been sent successfully. We&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <VokDevInput
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                    <VokDevInput
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <VokDevInput
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />

                  <div className="w-full space-y-2">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      required
                      rows={6}
                      className="min-h-40 w-full resize-y rounded-lg border border-border bg-input px-4 py-3 text-foreground transition-all duration-300 placeholder:text-muted-foreground hover:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
                    />
                  </div>

                  <VokDevButton variant="primary" size="lg" type="submit" withGlow className="w-full">
                    Send Message
                  </VokDevButton>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="pg-sec pg-sec-alt" aria-labelledby="join-heading">
          <div className="pg-sec-inner">
            <header className="pg-sec-hd">
              <h2 id="join-heading">Join VokDev today</h2>
              <p>
                Become part of our thriving community and unlock opportunities for collaboration, learning, and visibility.
              </p>
            </header>

            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="mb-6 text-xl font-semibold tracking-tight text-foreground">What you get</h3>
                <ul className="space-y-4" role="list">
                  {joinBenefits.map((benefit, index) => (
                    <li key={index} className="pg-check-item">
                      <span className="pg-check-icon" aria-hidden>
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-base leading-relaxed text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pg-form-card h-fit">
                <h3 className="mb-6 text-xl font-semibold tracking-tight text-foreground">Create your account</h3>

                <form className="space-y-4">
                  <VokDevInput label="Full Name" placeholder="Your name" />
                  <VokDevInput label="Email Address" type="email" placeholder="your@email.com" />
                  <VokDevInput label="Password" type="password" placeholder="Secure password" />

                  <VokDevButton variant="primary" size="lg" withGlow className="w-full">
                    Sign Up Free
                  </VokDevButton>

                  <p className="text-center text-xs text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>

                <div className="mt-6 border-t border-border/50 pt-6">
                  <p className="mb-4 text-sm text-muted-foreground">Already have an account?</p>
                  <VokDevButton variant="ghost" size="sm" className="w-full justify-center">
                    Sign In
                  </VokDevButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="faq-heading">
          <div className="pg-sec-inner max-w-3xl">
            <header className="pg-sec-hd pg-sec-hd-center">
              <h2 id="faq-heading">Frequently asked questions</h2>
              <p>Quick answers about membership, projects, and how we support the community.</p>
            </header>

            <div className="space-y-3">
              {contactFaqs.map((faq, index) => (
                <details key={index} className="pg-faq">
                  <summary>
                    <span>{faq.q}</span>
                    <svg
                      className="chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="faq-body">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
