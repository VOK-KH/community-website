# VokDev Brand Identity & Style Guide

## Brand Overview

VokDev is a modern tech community platform dedicated to fostering collaboration between developers and designers. The brand represents innovation, creativity, and technical excellence through a carefully crafted visual identity.

---

## Logo & Visual Identity

### Logo Concept
The VokDev logo features geometric code brackets `< >` with an internal gradient flowing from purple to cyan, symbolizing:
- **Code brackets**: Technical excellence and development
- **Gradient flow**: Collaboration between different disciplines
- **Geometric style**: Modern, clean, and precise

### Logo Usage
- Minimum size: 32px on web
- Always maintain clear space around the logo
- Use the full-color version on light backgrounds
- Use the white version on dark backgrounds
- Never distort, stretch, or rotate the logo

---

## Color Palette

### Primary Colors

**Tech Purple (Main Brand Color)**
- Hex: `#8B33FF`
- RGB: `139, 51, 255`
- HSL: `280° 85% 55%`
- Usage: Primary buttons, links, brand accents, hero sections
- Purpose: Conveys creativity, innovation, and tech sophistication

**Electric Cyan (Secondary Color)**
- Hex: `#00E6FF`
- RGB: `0, 230, 255`
- HSL: `190° 95% 50%`
- Usage: Highlights, accent elements, glow effects, secondary CTAs
- Purpose: Energetic, modern, complementary to purple

**Neon Pink (Tertiary Color)**
- Hex: `#FF33CC`
- RGB: `255, 51, 204`
- HSL: `320° 100% 60%`
- Usage: Accent highlights, badges, special features, CTAs
- Purpose: Energy, vitality, and attention-drawing

### Neutral Colors

**Dark Background**
- Hex: `#0F0F1A`
- RGB: `15, 15, 26`
- HSL: `220° 20% 8%`
- Usage: Primary background in dark mode

**Light Background**
- Hex: `#FFFFFF`
- RGB: `255, 255, 255`
- HSL: `0° 0% 100%`
- Usage: Primary background in light mode

**Card Background (Dark)**
- Hex: `#1A1A2E`
- RGB: `26, 26, 46`
- HSL: `220° 17% 15%`

**Card Background (Light)**
- Hex: `#FFFFFF`
- RGB: `255, 255, 255`

### Semantic Colors

**Success**: `#2D9D4D` (Green)
**Warning**: `#F59C00` (Orange)
**Destructive**: `#E74C3C` (Red)
**Info**: `#00E6FF` (Cyan)

### Gradient Combinations

**Purple to Cyan Gradient**
```
linear-gradient(135deg, #8B33FF 0%, #00E6FF 100%)
```
Usage: Hero sections, featured cards, backgrounds

**Purple to Pink Gradient**
```
linear-gradient(135deg, #8B33FF 0%, #FF33CC 100%)
```
Usage: Special promotions, premium features

---

## Typography

### Font Family
- **Primary Font**: Geist (Display & Body)
- **Monospace Font**: Geist Mono (Code, technical content)

### Heading Hierarchy

**H1 (Hero Title)**
- Size: 56px (desktop) / 36px (mobile)
- Weight: 700
- Line Height: 1.2
- Letter Spacing: -0.02em
- Usage: Page titles, hero headlines

**H2 (Section Title)**
- Size: 42px (desktop) / 28px (mobile)
- Weight: 700
- Line Height: 1.3
- Letter Spacing: -0.01em
- Usage: Major section headings

**H3 (Subsection Title)**
- Size: 28px (desktop) / 24px (mobile)
- Weight: 600
- Line Height: 1.4
- Usage: Card titles, subsection headers

**H4 (Small Title)**
- Size: 20px
- Weight: 600
- Usage: Feature titles, minor headings

**Body Text**
- Size: 16px
- Weight: 400
- Line Height: 1.6
- Letter Spacing: 0
- Usage: Primary reading text

**Small Text / Caption**
- Size: 14px
- Weight: 400
- Line Height: 1.5
- Color: Secondary foreground
- Usage: Timestamps, descriptions

### Text Styles

**Text Balance**: Apply `text-balance` class to all headings for optimal line breaking

---

## Visual Effects & Animations

### Glassmorphism
- Background: `rgba(255, 255, 255, 0.1)` (light mode) or `rgba(255, 255, 255, 0.05)` (dark mode)
- Backdrop Filter: `blur(12px)`
- Border: `1px solid rgba(255, 255, 255, 0.2)`
- Usage: Cards, modals, navigation overlays

### Glow Effects

**Purple Glow**
- `box-shadow: 0 0 20px rgba(139, 51, 255, 0.3)`
- Hover State: `box-shadow: 0 0 40px rgba(139, 51, 255, 0.6)`

**Cyan Glow**
- `box-shadow: 0 0 20px rgba(0, 230, 255, 0.3)`
- Hover State: `box-shadow: 0 0 40px rgba(0, 230, 255, 0.6)`

### Shadows
- Subtle: `0 2px 4px rgba(0, 0, 0, 0.1)`
- Medium: `0 4px 12px rgba(0, 0, 0, 0.15)`
- Strong: `0 12px 32px rgba(0, 0, 0, 0.25)`

### Border Gradients
- Direction: 135° (top-left to bottom-right)
- Colors: Purple to Cyan transition
- Opacity: Varies by context

---

## Animation Principles

### Timing
- Quick interactions: 200-300ms
- Standard transitions: 300-500ms
- Page transitions: 500-800ms
- Scroll animations: 600-800ms

### Easing Functions
- Standard: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Ease In: `cubic-bezier(0.42, 0, 1, 1)`
- Ease Out: `cubic-bezier(0, 0, 0.58, 1)`
- Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Animation Types

**Entrance Animations**
- Fade in + slide up (elements appearing)
- Duration: 500-600ms
- Delay: Stagger 50-100ms between items

**Hover Effects**
- Scale: 1.05 (subtle growth)
- Y offset: -4px (subtle lift)
- Duration: 200ms

**Scroll Animations**
- Parallax offset: 30-50px
- Fade in on scroll: 0.1 threshold
- Trigger once: Optimize performance

**Loading States**
- Pulse glow animation: 2s duration
- Spinner rotation: Continuous, linear

---

## Component Styling

### Buttons

**Primary Button**
- Background: Purple (`#8B33FF`)
- Text Color: White
- Padding: 10px 20px
- Border Radius: 8px
- Hover: Purple glow + scale 1.05
- Focus: Ring with purple color

**Secondary Button**
- Background: Cyan with transparency
- Text Color: Dark (light mode) / Light (dark mode)
- Border: 1px Cyan
- Hover: Cyan glow + slight background increase

**Ghost Button**
- Background: Transparent
- Text Color: Primary color
- Border: 1px solid primary
- Hover: Slight background color

### Cards

**Default Card**
- Background: Card background color
- Border: 1px subtle border
- Border Radius: 12px
- Padding: 24px
- Shadow: Subtle shadow
- Transition: All 300ms ease

**Interactive Card**
- Hover: Lift effect (Y: -8px)
- Glow: Purple glow on hover
- Scale: Subtle scale up (1.02)

**Featured Card**
- Border: Gradient border (purple to cyan)
- Background: Glassmorphism
- Glow: Active purple glow

### Input Fields

**Default Input**
- Border: 1px subtle border
- Padding: 10px 12px
- Border Radius: 8px
- Focus: Purple border + ring
- Transition: All 200ms

**With Icon**
- Icon color: Secondary foreground
- Icon size: 20px
- Padding adjustment: Account for icon space

---

## Responsive Design

### Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

### Mobile-First Approach
- Start with mobile layout
- Use CSS media queries for larger screens
- Optimize touch targets: Minimum 44x44px
- Adjust typography sizes for smaller screens

### Spacing Guidelines
- Mobile: 16px base unit
- Desktop: 24px base unit
- Maintain 1.5x ratio between breakpoints

---

## Accessibility

### Color Contrast
- All text on colored backgrounds: Minimum 4.5:1 contrast ratio
- Large text (18px+): Minimum 3:1 contrast ratio
- Interactive elements: Clearly visible focus states

### Motion
- Respect `prefers-reduced-motion` media query
- Disable auto-play animations for users with motion sensitivity
- Provide non-animated alternatives

### Typography
- Minimum font size: 14px
- Maximum line length: 65-75 characters
- Line height: 1.4-1.6 for body text

### Interactive Elements
- Focus indicators: Clear and visible (minimum 2px)
- Hover/focus states: Both provided
- Disabled states: Clearly indicated

---

## Brand Voice & Tone

### Core Values
1. **Innovative**: Forward-thinking, cutting-edge
2. **Collaborative**: Community-focused, inclusive
3. **Technical**: Precise, knowledgeable
4. **Approachable**: Friendly, welcoming

### Tone Guidelines

**Headlines**: Bold, energetic, inspiring
- Example: "Build Amazing Projects Together"

**Body Copy**: Conversational, clear, helpful
- Example: "Join thousands of developers creating the future"

**CTAs**: Action-oriented, confident
- Example: "Start Building Now", "Join the Community"

**Error Messages**: Helpful, non-accusatory
- Example: "Oops! This email is already in use. Try another or log in."

---

## Use Cases & Examples

### Hero Section
- Large H1 with gradient text or glow effect
- Subheading with secondary color
- CTA button with purple primary color
- Background: Subtle gradient or pattern
- Animation: Staggered entrance animation

### Feature Cards
- Icon with purple color
- Title (H3)
- Description text
- Optional badge with secondary color
- Hover: Lift effect with glow

### Navigation
- Logo on the left
- Links in primary or secondary color
- Hover: Underline animation or color shift
- Active state: Purple color with underline

### Forms
- Label in primary color
- Input with border on focus
- Helper text in secondary foreground
- Error state: Red border and text
- Success state: Green checkmark

---

## Design System Integration

All components use the VokDev design tokens defined in `/app/globals.css`. When creating new components:

1. Use CSS variables for colors: `var(--primary)`, `var(--secondary)`, etc.
2. Apply glass effects using the `.glass` class
3. Use glow utilities: `.glow-primary`, `.glow-secondary`
4. Implement animations from the animation library
5. Test for accessibility compliance
6. Ensure dark mode compatibility

---

## Version & Updates

**Version**: 1.0.0
**Last Updated**: 2026-04-10
**Next Review**: 2026-06-10

For questions or updates to the brand guidelines, contact the design team.
