# VokDev Design System

## 🎨 Vision
VokDev is a **modern, futuristic tech community platform** with a focus on collaboration and innovation. The design system emphasizes **smooth interactions, creative expression, and developer-friendly aesthetics** through minimalist but expressive visual language.

---

## 📊 Color Palette

### Primary Color: Tech Purple (`280 85% 55%`)
- **Purpose**: Primary CTAs, headers, key interactive elements
- **Light Mode**: Vibrant purple (#8B33FF)
- **Dark Mode**: Slightly brighter (#B366FF)
- **Usage**: Buttons, links, highlights, primary navigation

### Secondary Color: Electric Cyan (`190 95% 50%`)
- **Purpose**: Accents, highlights, interactive states
- **Light Mode**: Bright cyan (#00E6FF)
- **Dark Mode**: Cyan with high saturation (#00E6FF)
- **Usage**: Borders, secondary accents, hover states, active indicators

### Tertiary Color: Neon Pink (`320 100% 60%`)
- **Purpose**: Energy, vitality, special highlights
- **Light Mode**: Hot pink (#FF33CC)
- **Dark Mode**: Bright pink (#FF66FF)
- **Usage**: Featured content, badges, special announcements

### Semantic Colors
- **Success**: `142 71% 45%` (Green) - Confirmations, completed actions
- **Warning**: `38 92% 50%` (Orange) - Cautions, alerts
- **Info**: `190 95% 50%` (Cyan) - Information, notifications
- **Destructive**: `0 84% 60%` (Red) - Destructive actions, errors

### Neutral Colors
- **Background**: `220 20% 8%` (Dark) / `0 0% 100%` (Light)
- **Card**: `220 17% 15%` (Dark) / `0 0% 100%` (Light)
- **Foreground**: `0 0% 98%` (Dark) / `220 13% 13%` (Light)
- **Muted**: `220 13% 25%` (Dark) / `220 14% 96%` (Light)
- **Border**: `220 17% 25%` (Dark) / `220 13% 91%` (Light)

---

## 🔤 Typography System

### Font Families
- **Heading Font**: Geist (default from Next.js) - Bold, modern, clean
- **Body Font**: Geist (consistent throughout) - Excellent readability
- **Mono Font**: Geist Mono - Code snippets, technical content

### Type Scales

#### Headings
```
H1: 48px / 64px weight-bold (Hero titles, page headers)
H2: 36px / 48px weight-bold (Section headers)
H3: 28px / 36px weight-bold (Subsection headers)
H4: 24px / 32px weight-semibold (Card titles)
H5: 20px / 28px weight-semibold (Small titles)
H6: 16px / 24px weight-semibold (Minimal titles)
```

#### Body
```
Large: 18px / 28px weight-regular (Large text, introductions)
Base: 16px / 24px weight-regular (Standard body text)
Small: 14px / 21px weight-regular (Secondary text, labels)
Xs: 12px / 18px weight-regular (Tiny text, captions)
```

#### Line Height
- **Headings**: 1.2-1.3 (tight)
- **Body**: 1.5-1.6 (relaxed)
- **Code**: 1.6 (relaxed)

---

## 🎯 Component Styles

### Buttons

#### Primary Button
```
Background: var(--primary)
Text: var(--primary-foreground)
Padding: 12px 24px (px-6 py-3)
Border Radius: 0.5rem
Font Weight: 600
Transition: smooth
Hover: scale-105, glow effect
Active: darker background
Disabled: opacity-50, cursor-not-allowed
```

#### Secondary Button
```
Background: transparent
Border: 2px solid var(--secondary)
Text: var(--secondary)
Padding: 12px 24px
Hover: background-color with opacity
Active: darker border
```

#### Ghost Button
```
Background: transparent
Border: none
Text: var(--foreground)
Hover: background-color (muted)
```

#### Size Variants
```
lg: px-8 py-4 text-lg
md: px-6 py-3 text-base (default)
sm: px-4 py-2 text-sm
xs: px-3 py-1 text-xs
```

### Cards

#### Standard Card
```
Background: var(--card)
Border: 1px solid var(--border)
Padding: 24px
Border Radius: 0.75rem
Transition: smooth
Hover: lift effect (-4px), subtle glow
Shadow: sm (light mode), md (dark mode)
```

#### Interactive Card
```
Background: glass effect
Border: 1px solid var(--secondary)/30
Backdrop Filter: blur(10px)
Hover: stronger glow, enhanced lift
```

#### Featured Card (with gradient border)
```
Uses border-gradient utility
Background: glass effect with overlay
Gradient: Purple to Cyan (135deg)
Glow: primary
```

### Input Fields

```
Background: var(--input)
Border: 1px solid var(--border)
Text: var(--foreground)
Padding: 10px 14px
Border Radius: 0.5rem
Focus: ring var(--ring) with 2px offset
Placeholder: var(--muted-foreground)
Transition: smooth
```

### Labels & Text Variants

```
Label: 14px, weight-500, var(--foreground)
Caption: 12px, weight-400, var(--muted-foreground)
Subtle: var(--muted-foreground)
Link: var(--primary), underline on hover, glow on focus
Code: var(--secondary), mono font, subtle background
```

---

## 📏 Spacing & Layout Grid

### Spacing Scale (Tailwind-based)
```
0: 0px
1: 4px (px-1)
2: 8px (px-2)
3: 12px (px-3)
4: 16px (px-4)
6: 24px (px-6)
8: 32px (px-8)
12: 48px (px-12)
16: 64px (px-16)
20: 80px (px-20)
24: 96px (px-24)
```

### Layout Grid
```
Container: max-w-7xl (80rem)
Columns: 12-column grid
Gap: 16px (gap-4) or 24px (gap-6)
Padding: 16px mobile, 24px desktop
```

### Common Patterns
```
Section Spacing: mb-12 or mb-16
Element Gap: gap-4 or gap-6
Card Padding: p-6 (24px)
Input Padding: p-2.5 (10px 14px)
```

---

## ✨ Animation Guidelines

### Transition Timing
```
Fast: 150ms (micro-interactions)
Normal: 300ms (default)
Slow: 500ms (important state changes)
Ease Functions:
  - ease-in-out: default smooth transitions
  - ease-out: enter animations
  - ease-in: exit animations
```

### Animation Library
```
Framer Motion: Complex animations, scroll effects
GSAP: Heavy parallax, timeline animations
CSS Animations: Simple hover states, looping animations
```

### Built-in Animations
```
.animate-float: Float up/down (3s, infinite)
.animate-pulse-glow: Glow pulse (2s, infinite)
.animate-slide-in: Slide from left (0.5s)
.animate-fade-in: Fade in (0.5s)
.hover-lift: Lift on hover (scale + translate)
.hover-glow: Glow on hover
```

### Interaction Effects

#### Hover States
```
Cards: lift (-4px translate-y) + glow
Buttons: scale-105 + shadow
Links: underline + glow
Inputs: ring focus state
```

#### Scroll Animations
```
Fade in on scroll: opacity 0→1
Slide up on scroll: translate-y 20px→0
Parallax: offset based on scroll position
```

#### Loading States
```
Skeleton: pulse animation, muted background
Spinner: rotating icon with glow
Progress: animated width transition
```

---

## 🎪 Glassmorphism & Effects

### Glass Effect (`.glass`)
```
Background: white/10 (light) or white/5 (dark)
Backdrop Filter: blur(12px)
Border: 1px solid white/20
Creates: Frosted glass appearance
Best For: Overlays, modals, floating elements
```

### Glow Effects

#### Primary Glow (`.glow-primary`)
```
Color: Tech Purple with 30% opacity
Size: 20px blur radius
Use: Featured elements, CTA buttons
```

#### Secondary Glow (`.glow-secondary`)
```
Color: Electric Cyan with 30% opacity
Use: Active states, highlights
```

#### Text Glow (`.text-glow-primary`)
```
Text Shadow: 10px blur with color overlay
Use: Titles, featured text
```

### Border Gradient (`.border-gradient`)
```
Creates gradient border effect
Gradient: Purple to Cyan (135deg)
Use: Featured cards, premium elements
```

---

## ♿ Accessibility Considerations

### Color Contrast
- **AA Standard**: All text meets WCAG AA (4.5:1 for body, 3:1 for headers)
- **Dark Mode**: Enhanced contrast ratios
- **Never use color alone**: Always pair with text or icons

### Focus States
```
Focus Outline: 2px ring var(--ring) with 2px offset
Keyboard Navigation: Tab order follows visual flow
Skip Links: Present but hidden (sr-only)
Focus Visible: Only visible for keyboard navigation
```

### Typography Accessibility
```
Minimum Font Size: 14px for body (except captions)
Line Height: 1.5+ for readability
Letter Spacing: Increased for headers
Font Weight: Bold for important information
```

### Interactive Elements
```
Button Size: Minimum 44px × 44px (touch targets)
Spacing: At least 8px gap between interactive elements
Labels: All inputs have associated labels
Feedback: Clear visual/auditory feedback for actions
Icons: Always accompanied by text or aria-label
```

### Semantic HTML
```
Use <button> for buttons, not <div>
Use <a> for links
Use <header>, <nav>, <main>, <footer>
Use <form> with <fieldset> for grouped inputs
Form labels: <label for="input-id">
```

### ARIA Attributes
```
aria-label: Describe buttons/icons without text
aria-labelledby: Link to heading for context
aria-describedby: Extended descriptions
aria-hidden: Hide decorative elements
role="alert": Important announcements
role="status": Live region updates
aria-live="polite": Non-urgent updates
```

### Dark Mode Accessibility
```
Ensure contrast in both modes
Test with: WCAG Contrast Checker
Icon visibility: All icons visible in both modes
```

---

## 📱 Responsive Design

### Breakpoints
```
Mobile: 0px - 639px
Tablet: 640px - 1023px
Desktop: 1024px+
Wide: 1280px+
```

### Mobile-First Approach
```
Base styles: Mobile (single column)
Tablet: md: prefix (justify-between, grid-cols-2)
Desktop: lg: prefix (grid-cols-3, multi-column layout)
Wide: xl: prefix (optimized wide layouts)
```

### Responsive Utilities
```
Hidden: hidden / md:block (show on tablet+)
Visible: block / md:hidden (hide on tablet+)
Sizing: w-full / md:w-1/2 (responsive widths)
Spacing: p-4 / md:p-6 (responsive padding)
Typography: text-lg / md:text-xl (responsive sizes)
```

---

## 🎨 Design Tokens Summary

### Color Tokens
```
--primary: 280 85% 55%
--secondary: 190 95% 50%
--tertiary: 320 100% 60%
--success: 142 71% 45%
--warning: 38 92% 50%
--info: 190 95% 50%
--destructive: 0 84% 60%
```

### Effect Tokens
```
--shadow-glow: rgba(139, 51, 255, 0.3)
--shadow-cyan: rgba(0, 230, 255, 0.3)
Blur: blur(12px) for glass effect
Duration: 300ms for smooth transitions
```

### Spacing Tokens
```
--radius-xs: 0.25rem
--radius-sm: 0.375rem
--radius-md: 0.5rem (default)
--radius-lg: 0.75rem
--radius-xl: 1rem
--radius-2xl: 1.5rem
```

---

## 🚀 Implementation Examples

### Using Design Tokens in Tailwind
```tsx
// Button with primary color and glow
<button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover-lift glow-primary">
  Create Project
</button>

// Card with glass effect
<div className="glass rounded-xl p-6 hover-glow">
  Card content
</div>

// Text with secondary accent
<h2 className="text-secondary text-3xl font-bold text-glow-secondary">
  Featured Projects
</h2>

// Interactive input with focus ring
<input className="bg-input border border-border rounded-md p-2.5 focus:ring-2 focus:ring-primary" />
```

### Dark Mode Support
```tsx
// Automatic dark mode support via Tailwind classes
<div className="bg-background text-foreground dark:bg-background dark:text-foreground">
  Content adapts automatically
</div>
```

---

## ✅ Design Checklist

- [ ] Color palette uses exactly 3-5 colors (primary, secondary, accent, neutral, semantic)
- [ ] Typography uses maximum 2 font families
- [ ] All interactive elements have clear hover/focus states
- [ ] Cards have subtle shadows and smooth transitions
- [ ] Buttons follow size and color variants
- [ ] Spacing follows 4px grid system
- [ ] Dark mode works without manual switching
- [ ] Glow/gradient effects are subtle, not overwhelming
- [ ] Glass effect used sparingly for premium elements
- [ ] Animations are smooth and purposeful
- [ ] Accessibility standards are met (WCAG AA minimum)
- [ ] Mobile responsiveness is tested
- [ ] Code is semantic and clean

---

## 🎯 Next Steps

1. **Component Library**: Build reusable React components following this system
2. **Brand Assets**: Create logo variants and icon set
3. **Design Tool**: Set up Figma design system matching this spec
4. **Developer Guide**: Create component documentation with code examples
5. **Brand Guidelines**: Expand with photography, tone of voice, etc.
