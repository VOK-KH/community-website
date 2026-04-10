# VokDev Design System - Quick Reference

## 🎯 Start Here

**Visit `/design-system` in your browser to see all components live!**

---

## 🎨 Colors (HSL)

```
Primary:     280 85% 55%   (Tech Purple)
Secondary:   190 95% 50%   (Electric Cyan)
Tertiary:    320 100% 60%  (Neon Pink)
Success:     142 71% 45%   (Green)
Warning:     38 92% 50%    (Orange)
Destructive: 0 84% 60%     (Red)
```

**Usage:**
```tsx
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="text-secondary">Secondary text</div>
<button className="bg-tertiary">Pink button</button>
```

---

## 🔘 Button Component

```tsx
import { VokDevButton } from '@/components/VokDevButton';

// Variants
<VokDevButton variant="primary">Primary</VokDevButton>
<VokDevButton variant="secondary">Secondary</VokDevButton>
<VokDevButton variant="tertiary">Tertiary</VokDevButton>
<VokDevButton variant="ghost">Ghost</VokDevButton>
<VokDevButton variant="destructive">Delete</VokDevButton>

// Sizes
<VokDevButton size="xs">XS</VokDevButton>
<VokDevButton size="sm">Small</VokDevButton>
<VokDevButton size="md">Medium</VokDevButton>
<VokDevButton size="lg">Large</VokDevButton>

// States
<VokDevButton disabled>Disabled</VokDevButton>
<VokDevButton isLoading>Loading...</VokDevButton>
<VokDevButton withGlow={false}>No glow</VokDevButton>
```

---

## 🎴 Card Component

```tsx
import { 
  VokDevCard, 
  VokDevCardHeader, 
  VokDevCardTitle,
  VokDevCardDescription,
  VokDevCardContent,
  VokDevCardFooter
} from '@/components/VokDevCard';

// Basic card
<VokDevCard>
  <VokDevCardHeader>
    <VokDevCardTitle>Title</VokDevCardTitle>
    <VokDevCardDescription>Description</VokDevCardDescription>
  </VokDevCardHeader>
  <VokDevCardContent>Content</VokDevCardContent>
</VokDevCard>

// Variants
<VokDevCard variant="default">Default card</VokDevCard>
<VokDevCard variant="interactive">Glass effect</VokDevCard>
<VokDevCard variant="featured">Premium look</VokDevCard>
<VokDevCard variant="minimal">Transparent</VokDevCard>

// With footer
<VokDevCard>
  <VokDevCardContent>Content</VokDevCardContent>
  <VokDevCardFooter>
    <VokDevButton>Action</VokDevButton>
  </VokDevCardFooter>
</VokDevCard>
```

---

## 🏷️ Badge Component

```tsx
import { VokDevBadge } from '@/components/VokDevBadge';

<VokDevBadge variant="primary">Primary</VokDevBadge>
<VokDevBadge variant="secondary">Secondary</VokDevBadge>
<VokDevBadge variant="tertiary">Tertiary</VokDevBadge>
<VokDevBadge variant="success">Success</VokDevBadge>
<VokDevBadge variant="warning">Warning</VokDevBadge>
<VokDevBadge variant="destructive">Error</VokDevBadge>

// Sizes
<VokDevBadge size="sm">Small</VokDevBadge>
<VokDevBadge size="md">Medium</VokDevBadge>

// No glow
<VokDevBadge withGlow={false}>Badge</VokDevBadge>
```

---

## 📝 Input Component

```tsx
import { VokDevInput, VokDevTextarea } from '@/components/VokDevInput';

// Text input
<VokDevInput
  label="Email"
  type="email"
  placeholder="you@example.com"
/>

// With description
<VokDevInput
  label="Password"
  type="password"
  description="Min 8 characters"
/>

// With error
<VokDevInput
  label="Username"
  error="Already taken"
/>

// Glass variant
<VokDevInput
  placeholder="Search..."
  variant="glass"
/>

// Textarea
<VokDevTextarea
  label="Message"
  placeholder="Your message..."
/>
```

---

## ✨ Effects & Utilities

```tsx
// Glow effects
<div className="glow-primary">Purple glow</div>
<div className="glow-secondary">Cyan glow</div>
<div className="glow-tertiary">Pink glow</div>

// Text glow
<h1 className="text-glow-primary">Glowing text</h1>
<h2 className="text-glow-secondary">Cyan glow text</h2>

// Glass effect
<div className="glass rounded-xl p-6">Frosted glass</div>
<div className="glass-dark rounded-xl p-6">Dark glass</div>

// Hover effects
<div className="hover-lift">Lifts on hover</div>
<div className="hover-glow">Glows on hover</div>

// Animations
<div className="animate-float">⬆️ Floats</div>
<div className="animate-pulse-glow">✨ Pulses</div>
<div className="animate-slide-in">Slides in</div>
<div className="animate-fade-in">Fades in</div>

// Transitions
<div className="transition-smooth">Smooth transition</div>
```

---

## 🎬 Animations & Timing

```
Fast:   150ms (micro-interactions)
Normal: 300ms (default transitions)
Slow:   500ms (major changes)

Easing:
  ease-out    → Snappy entry
  ease-in     → Natural exit
  ease-in-out → Smooth motion
```

---

## 🌓 Dark Mode

```tsx
// Automatic dark mode support
<div className="bg-background text-foreground">
  Auto light/dark mode
</div>

// Explicit dark mode
<div className="dark:bg-card">
  Dark mode specific
</div>

// Theme provider (with next-themes)
import { ThemeProvider } from 'next-themes';

export function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
```

---

## 📐 Spacing

```
Tailwind scale:
p-1 = 4px      p-4 = 16px    p-12 = 48px
p-2 = 8px      p-6 = 24px    p-16 = 64px
p-3 = 12px     p-8 = 32px    p-20 = 80px

Gap:
gap-2 = 8px    gap-4 = 16px  gap-6 = 24px

Margin:
m-4 = 16px     mb-6 = 24px   mt-8 = 32px
```

---

## 📱 Responsive

```tsx
// Mobile first
<div className="w-full md:w-1/2 lg:w-1/3">
  100% mobile, 50% tablet, 33% desktop
</div>

// Hidden/visible
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive heading
</h1>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  1 col mobile, 2 col tablet, 3 col desktop
</div>
```

---

## 🔤 Typography

```
Font families: Geist (heading & body), Geist Mono (code)

Sizes:
text-xs = 12px    text-lg = 18px
text-sm = 14px    text-xl = 20px
text-base = 16px  text-2xl = 24px

Weights:
font-thin = 100
font-light = 300
font-normal = 400
font-semibold = 600
font-bold = 700
```

---

## ♿ Accessibility

```tsx
// Button with label
<button aria-label="Close dialog">×</button>

// Form input with label
<label htmlFor="email">Email:</label>
<input id="email" type="email" />

// Error message linked
<input aria-describedby="error" />
<p id="error" role="alert">Error text</p>

// Describe the input
<input aria-invalid="true" />
<input aria-disabled="true" />

// Status updates
<div aria-live="polite">Updated 2 seconds ago</div>
```

---

## 🎯 Common Patterns

### Hero Section
```tsx
<section className="space-y-6">
  <div className="space-y-4">
    <h1 className="text-5xl font-bold">
      Title with <span className="text-primary">color</span>
    </h1>
    <p className="text-lg text-muted-foreground">
      Subtitle or description
    </p>
  </div>
  <div className="flex gap-4">
    <VokDevButton variant="primary" size="lg">
      Primary CTA
    </VokDevButton>
    <VokDevButton variant="secondary" size="lg">
      Secondary CTA
    </VokDevButton>
  </div>
</section>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <VokDevCard key={item.id} variant="interactive">
      <VokDevCardHeader>
        <VokDevCardTitle>{item.title}</VokDevCardTitle>
      </VokDevCardHeader>
      <VokDevCardContent>
        {item.description}
      </VokDevCardContent>
    </VokDevCard>
  ))}
</div>
```

### Form
```tsx
<form className="space-y-6 max-w-md">
  <VokDevInput
    label="Name"
    placeholder="Your name"
  />
  <VokDevInput
    label="Email"
    type="email"
    placeholder="your@email.com"
  />
  <VokDevTextarea
    label="Message"
    placeholder="Your message..."
  />
  <div className="flex gap-3">
    <VokDevButton variant="primary" type="submit">
      Submit
    </VokDevButton>
    <VokDevButton variant="ghost" type="reset">
      Clear
    </VokDevButton>
  </div>
</form>
```

---

## 🔧 Customization

### Change Primary Color
```css
/* In /app/globals.css */
:root {
  --primary: 220 90% 50%;  /* Your color in HSL */
}
```

### Change Border Radius
```css
:root {
  --radius: 0.75rem;  /* From 0.5rem */
}
```

### Adjust Animation Speed
```css
.animate-float {
  animation: float 2s ease-in-out infinite;  /* From 3s */
}
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `/design-system` | **Live component showcase** |
| DESIGN_SYSTEM_README.md | Main overview & quick start |
| DESIGN_SYSTEM.md | Complete design specification |
| ANIMATION_GUIDE.md | Animation patterns & examples |
| ACCESSIBILITY_GUIDE.md | WCAG AA compliance guide |
| IMPLEMENTATION_GUIDE.md | Component APIs & examples |

---

## 🚀 Import Paths

```tsx
// Components
import { VokDevButton } from '@/components/VokDevButton';
import { VokDevCard, ... } from '@/components/VokDevCard';
import { VokDevBadge } from '@/components/VokDevBadge';
import { VokDevInput, VokDevTextarea } from '@/components/VokDevInput';

// Utilities
import { cn } from '@/lib/utils';  // Class name combiner
```

---

## ⚡ Performance Tips

- Use `transform` and `opacity` in animations (GPU accelerated)
- Avoid animating `width`, `height`, `left`, `right`
- Profile with Chrome DevTools Performance tab
- Respect `prefers-reduced-motion`
- Use `will-change` sparingly

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Colors not showing | Check HSL values in globals.css |
| Dark mode broken | Ensure `.dark` class on `<html>` |
| Glow effect missing | Add `withGlow={true}` prop |
| Animation janky | Use transform/opacity only |
| Component not found | Check import path matches filename |

---

## 🎯 Top 5 Things to Do

1. ✅ Visit `/design-system` to see everything
2. ✅ Copy a component into your page
3. ✅ Change colors in `/app/globals.css`
4. ✅ Test on mobile and keyboard
5. ✅ Deploy with confidence!

---

**Ready to build? Start at `/design-system`! 🚀**
