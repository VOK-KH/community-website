# VokDev Design System - Implementation Guide

## 🚀 Quick Start

### 1. View the Design System
Navigate to `/design-system` to see a complete showcase of all components, colors, animations, and examples.

### 2. Use Components in Your Project
```tsx
import { VokDevButton } from '@/components/VokDevButton';
import { VokDevCard, VokDevCardHeader, VokDevCardTitle, VokDevCardContent } from '@/components/VokDevCard';
import { VokDevBadge } from '@/components/VokDevBadge';
import { VokDevInput, VokDevTextarea } from '@/components/VokDevInput';

export default function MyPage() {
  return (
    <div>
      <VokDevButton variant="primary">Click me</VokDevButton>
      <VokDevCard>
        <VokDevCardHeader>
          <VokDevCardTitle>My Card</VokDevCardTitle>
        </VokDevCardHeader>
        <VokDevCardContent>Content here</VokDevCardContent>
      </VokDevCard>
    </div>
  );
}
```

---

## 📦 Component Library

### VokDevButton
A versatile button component with multiple variants and sizes.

**Props:**
```typescript
interface VokDevButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  withGlow?: boolean;
}
```

**Examples:**
```tsx
// Primary button with glow
<VokDevButton variant="primary" withGlow>
  Create Project
</VokDevButton>

// Secondary button
<VokDevButton variant="secondary">
  View Details
</VokDevButton>

// Loading state
<VokDevButton variant="primary" isLoading>
  Saving...
</VokDevButton>

// Size variants
<VokDevButton size="xs">Extra Small</VokDevButton>
<VokDevButton size="sm">Small</VokDevButton>
<VokDevButton size="md">Medium</VokDevButton>
<VokDevButton size="lg">Large</VokDevButton>

// Ghost button (transparent)
<VokDevButton variant="ghost">Cancel</VokDevButton>

// Disabled state
<VokDevButton disabled>Disabled</VokDevButton>
```

---

### VokDevCard & Subcomponents
A flexible card component with multiple variants.

**Props:**
```typescript
interface VokDevCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'featured' | 'minimal';
  hasGlow?: boolean;
  isHoverable?: boolean;
}

// Subcomponents
VokDevCardHeader, VokDevCardTitle, VokDevCardDescription, 
VokDevCardContent, VokDevCardFooter
```

**Examples:**
```tsx
// Default card
<VokDevCard variant="default">
  <VokDevCardHeader>
    <VokDevCardTitle>Default Card</VokDevCardTitle>
    <VokDevCardDescription>Subtle design</VokDevCardDescription>
  </VokDevCardHeader>
  <VokDevCardContent>Card content here</VokDevCardContent>
</VokDevCard>

// Interactive card with glass effect
<VokDevCard variant="interactive">
  <VokDevCardHeader>
    <VokDevCardTitle>Interactive</VokDevCardTitle>
  </VokDevCardHeader>
  <VokDevCardContent>Glass effect with glow</VokDevCardContent>
</VokDevCard>

// Featured card with gradient border
<VokDevCard variant="featured">
  <VokDevCardHeader>
    <VokDevCardTitle>Featured</VokDevCardTitle>
  </VokDevCardHeader>
  <VokDevCardContent>Premium appearance</VokDevCardContent>
</VokDevCard>

// Card with footer actions
<VokDevCard>
  <VokDevCardHeader>
    <VokDevCardTitle>Title</VokDevCardTitle>
  </VokDevCardHeader>
  <VokDevCardContent>Content</VokDevCardContent>
  <VokDevCardFooter>
    <VokDevButton variant="primary" size="sm">Action</VokDevButton>
  </VokDevCardFooter>
</VokDevCard>
```

---

### VokDevBadge
A small badge component for tags and status indicators.

**Props:**
```typescript
interface VokDevBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md';
  withGlow?: boolean;
}
```

**Examples:**
```tsx
// Variant badges
<VokDevBadge variant="primary">Primary</VokDevBadge>
<VokDevBadge variant="secondary">Secondary</VokDevBadge>
<VokDevBadge variant="tertiary">Tertiary</VokDevBadge>
<VokDevBadge variant="success">Success</VokDevBadge>
<VokDevBadge variant="warning">Warning</VokDevBadge>
<VokDevBadge variant="destructive">Error</VokDevBadge>

// Size variants
<VokDevBadge size="sm">Small</VokDevBadge>
<VokDevBadge size="md">Medium</VokDevBadge>

// Without glow
<VokDevBadge variant="primary" withGlow={false}>No Glow</VokDevBadge>
```

---

### VokDevInput & VokDevTextarea
Text input and textarea components with validation states.

**Props:**
```typescript
interface VokDevInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'glass';
}

interface VokDevTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  variant?: 'default' | 'glass';
}
```

**Examples:**
```tsx
// Basic input
<VokDevInput
  label="Email"
  placeholder="your@email.com"
  type="email"
/>

// With description
<VokDevInput
  label="Password"
  type="password"
  description="Min 8 characters"
/>

// With error state
<VokDevInput
  label="Username"
  error="Username is already taken"
/>

// Glass variant
<VokDevInput
  label="Search"
  placeholder="Search projects..."
  variant="glass"
/>

// Textarea
<VokDevTextarea
  label="Description"
  placeholder="Describe your project..."
  description="Maximum 500 characters"
/>

// With value tracking
const [email, setEmail] = useState('');
<VokDevInput
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## 🎨 Using Design Tokens

### Color Tokens in Tailwind
```tsx
// Use HSL color variables directly in Tailwind classes
<div className="bg-primary text-primary-foreground">
  Primary color
</div>

<div className="bg-secondary text-secondary-foreground">
  Secondary color
</div>

<div className="border border-secondary">
  Cyan border
</div>

<button className="bg-tertiary">Pink button</button>

// Semantic colors
<div className="bg-success">Success state</div>
<div className="bg-warning">Warning state</div>
<div className="text-destructive">Error message</div>
```

### Using CSS Variables Directly
```tsx
<div style={{ 
  background: 'hsl(var(--primary))',
  color: 'hsl(var(--primary-foreground))'
}}>
  Direct CSS variable usage
</div>
```

---

## ✨ Using Effects & Utilities

### Glow Effects
```tsx
// Glow on elements
<div className="glow-primary rounded-lg p-4">
  Element with purple glow
</div>

<div className="glow-secondary rounded-lg p-4">
  Element with cyan glow
</div>

// Text glow
<h1 className="text-glow-primary text-3xl font-bold">
  Glowing headline
</h1>
```

### Hover Effects
```tsx
// Lift on hover
<div className="hover-lift">
  This lifts when you hover
</div>

// Glow on hover
<div className="hover-glow">
  This glows when you hover
</div>

// Combine effects
<div className="hover-lift hover-glow">
  Lifts and glows
</div>
```

### Glassmorphism
```tsx
// Glass effect
<div className="glass rounded-xl p-6">
  Frosted glass effect
</div>

// Glass dark (darker overlay)
<div className="glass-dark rounded-xl p-6">
  Darker glass effect
</div>
```

### Animations
```tsx
// Float animation
<div className="animate-float">
  🚀 Floating element
</div>

// Pulse glow
<div className="animate-pulse-glow">
  ✨ Pulsing glow
</div>

// Slide in
<div className="animate-slide-in">
  Slides in from left
</div>

// Fade in
<div className="animate-fade-in">
  Fades in
</div>
```

---

## 🎬 Framer Motion Integration

### Installing Framer Motion
```bash
npm install framer-motion
# or
pnpm add framer-motion
```

### Animated Card Example
```tsx
'use client';

import { motion } from 'framer-motion';
import { VokDevCard } from '@/components/VokDevCard';

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VokDevCard>
        Animated content
      </VokDevCard>
    </motion.div>
  );
}
```

### Hover Animation Example
```tsx
export function HoverCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <VokDevCard>
        Hover for animation
      </VokDevCard>
    </motion.div>
  );
}
```

### Stagger Animation Example
```tsx
export function StaggeredList({ items }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## 🌓 Dark Mode Support

The design system automatically supports dark mode through Tailwind's dark mode classes.

### Enabling Dark Mode
Dark mode is controlled via the `.dark` class on the `<html>` element.

```tsx
// Using next-themes (recommended)
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <html>
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
```

### Dark Mode Classes
```tsx
// Automatically applies dark mode colors
<div className="bg-background text-foreground">
  Adapts to light/dark mode automatically
</div>

// Explicit dark mode styling
<div className="dark:bg-card dark:text-foreground">
  Dark mode override
</div>
```

---

## 🔧 Customizing the Design System

### Changing Colors
Edit `/app/globals.css` to update color values:

```css
:root {
  /* Change primary color */
  --primary: 280 85% 55%; /* HSL values */
  --primary-foreground: 0 0% 100%;
  
  /* Change secondary */
  --secondary: 190 95% 50%;
  --secondary-foreground: 220 13% 13%;
}

.dark {
  /* Dark mode overrides */
  --primary: 280 85% 65%;
  --foreground: 0 0% 98%;
}
```

### Changing Border Radius
```css
:root {
  --radius: 0.5rem; /* Default: 0.5rem (8px) */
}

/* Or use individual sizes */
--radius-xs: 0.25rem;
--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-2xl: 1.5rem;
```

### Changing Animation Duration
Edit component files or globals.css:

```css
/* In globals.css */
@keyframes float {
  /* Adjust duration from 3s to 2s */
}

.transition-smooth {
  @apply transition-all duration-300; /* Change from 300ms to 500ms */
}
```

---

## 📱 Responsive Design

### Mobile-First Approach
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column mobile, 2 medium, 3 large */}
</div>

<h1 className="text-2xl md:text-3xl lg:text-4xl">
  {/* Responsive text sizes */}
</h1>

<div className="p-4 md:p-6 lg:p-8">
  {/* Responsive padding */}
</div>

<button className="text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8">
  {/* Responsive button */}
</button>
```

### Responsive Utilities
```tsx
// Hidden on mobile, visible on medium+
<div className="hidden md:block">
  Desktop only content
</div>

// Visible on mobile, hidden on medium+
<div className="md:hidden">
  Mobile only content
</div>

// Responsive display
<div className="block md:flex lg:grid">
  Responsive layout
</div>
```

---

## ✅ Quality Checklist

Before using components in production:

### Functionality
- [ ] Component renders correctly
- [ ] Props work as expected
- [ ] Event handlers fire properly
- [ ] No console errors or warnings

### Styling
- [ ] Colors match design system
- [ ] Spacing is consistent
- [ ] Typography is correct
- [ ] Dark mode works
- [ ] Responsive design works

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA attributes correct
- [ ] Color contrast sufficient
- [ ] Form labels present

### Performance
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] No layout shift
- [ ] Animations smooth (60fps)

---

## 🚀 Deployment

### Building for Production
```bash
npm run build
# or
pnpm build
```

### Environment Variables
Ensure these are set in your deployment:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Performance Optimization
- Use Next.js Image component
- Lazy load components with dynamic imports
- Minify CSS and JavaScript
- Optimize animations for performance
- Use font-display: swap

---

## 🐛 Troubleshooting

### Colors not showing in dark mode
- Ensure `.dark` class is applied to `<html>`
- Check that color tokens are defined in both `:root` and `.dark`
- Clear browser cache

### Animations are jerky
- Profile with DevTools Performance tab
- Use `transform` and `opacity` only
- Avoid animating `width`, `height`, `left`, etc.
- Reduce blur effects on slower devices

### Components not rendering
- Import from correct path: `@/components/...`
- Ensure file names match exactly
- Check for TypeScript errors

### Dark mode colors are wrong
- Verify HSL values in globals.css
- Test with `prefers-color-scheme`
- Use browser DevTools to inspect computed colors

---

## 📚 Additional Resources

- **DESIGN_SYSTEM.md** - Complete design specification
- **ANIMATION_GUIDE.md** - Animation patterns and examples
- **ACCESSIBILITY_GUIDE.md** - Accessibility requirements and testing
- **/design-system** - Interactive component showcase
- **components/** - Source code for all components

---

## 🎯 Next Steps

1. **View the showcase:** Navigate to `/design-system`
2. **Import components:** Copy-paste examples from showcase
3. **Customize:** Modify colors in globals.css
4. **Build:** Create your pages using components
5. **Test:** Verify accessibility and responsiveness
6. **Deploy:** Ship to production

Happy building with VokDev! 🚀
