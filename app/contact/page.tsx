'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VokDevButton from '@/components/VokDevButton'
import VokDevCard from '@/components/VokDevCard'
import VokDevInput from '@/components/VokDevInput'
import VokDevBadge from '@/components/VokDevBadge'
import { useState } from 'react'

const contactMethods = [
  {
    icon: '📧',
    title: 'Email',
    description: 'Send us your questions and feedback',
    contact: 'hello@vokdev.com',
    time: 'Response within 24 hours',
  },
  {
    icon: '💬',
    title: 'Discord',
    description: 'Join our community discord server',
    contact: 'discord.gg/vokdev',
    time: 'Live chat support',
  },
  {
    icon: '🐦',
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 py-16 md:py-24 border-b border-border/40">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Have questions? Want to collaborate? We&apos;d love to hear from you. Reach out and let&apos;s start a conversation.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto mb-20">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground text-lg">
                Reach out to us through any of these channels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <VokDevCard key={index} variant="interactive">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <div className="border-t border-border/40 pt-4">
                    <p className="font-medium text-foreground mb-1">{method.contact}</p>
                    <p className="text-sm text-muted-foreground">{method.time}</p>
                  </div>
                </VokDevCard>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <VokDevCard variant="featured">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
                  <p className="text-muted-foreground">
                    Your message has been sent successfully. We&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>

                  <VokDevButton variant="primary" size="lg" type="submit" className="w-full">
                    Send Message
                  </VokDevButton>
                </form>
              )}
            </VokDevCard>
          </div>
        </section>

        {/* Join Section */}
        <section className="px-4 py-20 bg-gradient-to-b from-primary/5 to-transparent border-y border-border/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join VokDev Today</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Become part of our thriving community and unlock amazing opportunities for collaboration and growth.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Benefits List */}
              <div>
                <h3 className="text-2xl font-bold mb-6">What You Get</h3>
                <ul className="space-y-4">
                  {joinBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="text-primary text-xl mt-1 flex-shrink-0">✓</div>
                      <span className="text-lg text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Signup Form */}
              <VokDevCard variant="featured" className="h-fit">
                <h3 className="text-2xl font-bold mb-6">Create Your Account</h3>
                
                <form className="space-y-4">
                  <VokDevInput
                    label="Full Name"
                    placeholder="Your name"
                  />
                  <VokDevInput
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                  />
                  <VokDevInput
                    label="Password"
                    type="password"
                    placeholder="Secure password"
                  />

                  <VokDevButton variant="primary" size="lg" className="w-full">
                    Sign Up Free
                  </VokDevButton>

                  <p className="text-xs text-center text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>

                <div className="border-t border-border/40 pt-6 mt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Already have an account?
                  </p>
                  <VokDevButton variant="ghost" size="sm" className="w-full justify-center">
                    Sign In
                  </VokDevButton>
                </div>
              </VokDevCard>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Is VokDev free to join?',
                  a: 'Yes! VokDev is completely free to join. We offer a premium membership option with additional features, but the community is always free.',
                },
                {
                  q: 'How do I submit a project?',
                  a: 'Once you&apos;re logged in, navigate to your profile and click "Submit Project". Fill in the details and our team will review it within 48 hours.',
                },
                {
                  q: 'Can I collaborate with other members?',
                  a: 'Absolutely! You can browse projects, request to join teams, and connect with other members through our messaging system.',
                },
                {
                  q: 'What support options are available?',
                  a: 'We offer email support, Discord community chat, and a knowledge base. Premium members also get priority support.',
                },
              ].map((faq, index) => (
                <VokDevCard key={index} variant="default">
                  <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
