# VokDev Performance & Optimization Guide

## Overview

This guide covers performance best practices, mobile optimization, and accessibility considerations implemented across the VokDev platform.

---

## Performance Optimizations

### 1. Animation Performance

All animations use Framer Motion with optimized configurations:

**Hardware Acceleration**
```tsx
<motion.div
  style={{ y }} // Use transform-based animations
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Content
</motion.div>
```

**Will-Change CSS**
- Applied to frequently animated elements
- Removed once animation completes
- Use: `.will-animate` utility class

### 2. Image Optimization

**Lazy Loading**
```tsx
<img src="image.jpg" loading="lazy" alt="Description" />
```

**Responsive Images**
```tsx
<img
  srcSet="small.jpg 640w, large.jpg 1280w"
  sizes="(max-width: 640px) 100vw, 50vw"
  alt="Description"
/>
```

**Format Optimization**
- Use WebP with JPEG fallbacks
- Compress images before deployment
- Implement placeholder states

### 3. Code Splitting

Next.js automatically implements:
- Route-based code splitting
- Dynamic imports for heavy components
- Lazy loading of off-screen content

### 4. CSS Optimization

**Tailwind CSS**
- Purges unused styles in production
- Minimal CSS bundle size
- Efficient utility-first approach

**Critical CSS**
- Inlined in HTML head
- Prevents render-blocking
- Covers above-the-fold content

---

## Mobile Optimization

### 1. Responsive Design

**Breakpoints**
```css
/* Mobile: 320px - 640px */
/* Tablet: 641px - 1024px */
/* Desktop: 1025px+ */
```

**Mobile-First Approach**
- Start with mobile layout
- Add enhancements for larger screens
- Use Tailwind prefixes: `md:`, `lg:`, `xl:`

### 2. Touch Interactions

**Touch Target Sizes**
- Minimum 44x44px on mobile
- 48x48px recommended for accessibility
- Increased padding around interactive elements

**Touch-Friendly Utilities**
```html
<button class="touch-friendly">
  Tap-friendly button
</button>
```

### 3. Mobile Performance

**Viewport Configuration**
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

**Avoid Layout Shifts**
- Use aspect-ratio containers
- Reserve space for dynamic content
- Minimize CLS (Cumulative Layout Shift)

### 4. Mobile Navigation

**Hamburger Menu**
- Smooth slide-in animation with `AnimatePresence`
- Staggered item animations
- Click-outside to close

**Touch Optimization**
- Larger tap areas (44-48px minimum)
- No hover requirements
- Clear visual feedback

---

## Accessibility (WCAG 2.1 AA)

### 1. Motion & Animation

**Prefers Reduced Motion**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**When to Respect**
- Vestibular issues
- Photosensitive epilepsy
- General motion sensitivity

### 2. Color Contrast

**Minimum Ratios**
- Normal text: 4.5:1
- Large text (18px+): 3:1
- UI components: 3:1

**Verification**
- Use contrast checker tools
- Test with color blindness simulators
- Avoid relying solely on color

### 3. Focus Management

**Focus Indicators**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-primary"
```

**Focus Order**
- Logical tab order (left to right, top to bottom)
- Skip to main content links
- Proper nesting of interactive elements

**Focus Trap**
- Modals trap focus within themselves
- Header/footer are always accessible

### 4. Keyboard Navigation

**All Features Must Be Keyboard Accessible**
- Tab through all interactive elements
- Enter to activate buttons
- Escape to close modals
- Arrow keys for menus

**ARIA Labels**
```tsx
<button aria-label="Toggle menu">☰</button>
<input aria-description="Email address" />
```

### 5. Semantic HTML

**Use Proper Elements**
- `<button>` for buttons (not `<div>`)
- `<a>` for links
- `<nav>` for navigation
- `<main>` for main content
- `<header>` and `<footer>`
- `<section>` for content sections

### 6. Screen Reader Support

**Alt Text for Images**
```tsx
<img src="chart.png" alt="Monthly sales chart showing 20% growth" />
```

**Skip Links**
```tsx
<a href="#main" className="sr-only">
  Skip to main content
</a>
```

**ARIA Landmarks**
```tsx
<nav aria-label="Main navigation">
<main id="main">
<aside aria-label="Sidebar">
```

---

## Browser Support

**Minimum Versions**
- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile Safari: 14+

**Progressive Enhancement**
- Core functionality works without JavaScript
- Enhanced with animations where supported
- Graceful degradation for older browsers

---

## Performance Metrics

### Core Web Vitals

**Largest Contentful Paint (LCP)**
- Target: < 2.5 seconds
- Optimize images and fonts
- Minimize main thread work

**First Input Delay (FID)**
- Target: < 100ms
- Break up long JavaScript tasks
- Use web workers for heavy processing

**Cumulative Layout Shift (CLS)**
- Target: < 0.1
- Reserve space for dynamic content
- Avoid inserting content above the fold

### Monitoring

Use tools to monitor performance:
- Lighthouse (Chrome DevTools)
- WebPageTest
- Vercel Analytics
- Next.js built-in metrics

---

## Best Practices Checklist

### Images
- [ ] All images are optimized for web
- [ ] Lazy loading implemented
- [ ] Responsive images with srcset
- [ ] Alt text on all images
- [ ] WebP format with fallbacks

### JavaScript
- [ ] Code splitting by route
- [ ] Lazy loading of components
- [ ] No render-blocking scripts
- [ ] Minified and optimized
- [ ] Tree-shaking enabled

### CSS
- [ ] Tailwind CSS for efficiency
- [ ] No unused styles in production
- [ ] Critical CSS inlined
- [ ] CSS compression enabled
- [ ] Media queries for responsive design

### Animations
- [ ] Animations use transform/opacity
- [ ] Hardware acceleration enabled
- [ ] Respects prefers-reduced-motion
- [ ] Smooth 60fps performance
- [ ] No jank or layout shifts

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Proper color contrast
- [ ] Keyboard navigable
- [ ] Screen reader support
- [ ] Semantic HTML

### Mobile
- [ ] Viewport meta tag correct
- [ ] Touch targets 44x48px minimum
- [ ] Mobile-first CSS approach
- [ ] No horizontal scrolling
- [ ] Fast load times (< 3s)

---

## Testing

### Performance Testing
```bash
# Lighthouse audit
npm run build
npm start
# Open http://localhost:3000 in Chrome
# Run Lighthouse audit in DevTools
```

### Accessibility Testing
```bash
# Using axe DevTools
# Install browser extension and test pages

# Using keyboard only
# Tab through all interactive elements
# Test with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
```

### Mobile Testing
```bash
# Chrome DevTools device emulation
# Actual device testing (critical)
# Network throttling (slow 4G simulation)
```

---

## Resources

- [Framer Motion Optimization](https://www.framer.com/motion/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Web.dev Performance](https://web.dev/performance/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
