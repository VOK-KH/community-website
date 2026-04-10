# VokDev Animation & Interaction Guide

## 📺 Animation Philosophy

**VokDev animations are designed to:**
- **Enhance communication** - Make UI state changes obvious
- **Delight without distraction** - Subtle, purposeful, never gratuitous
- **Improve usability** - Guide user attention and provide feedback
- **Feel responsive** - Interactions feel immediate and satisfying

---

## ⏱️ Timing & Easing

### Duration Guidelines
```
Micro-interactions (150ms)   - Hover effects, button clicks
Short transitions (300ms)    - Card lifts, color changes, state updates
Medium animations (500ms)    - Page transitions, major state changes
Long animations (1000ms+)    - Parallax, scroll sequences, hero reveals
```

### Easing Functions
```
ease-out   (cubic-bezier(0.0, 0.0, 0.2, 1))   - Enter animations (feels quick)
ease-in    (cubic-bezier(0.4, 0.0, 1.0, 1.0)) - Exit animations (feels natural)
ease-in-out (cubic-bezier(0.4, 0.0, 0.2, 1)) - Continuous animations (feels smooth)
linear     (No acceleration)                     - Spinner rotations, scroll-based
```

---

## 🎬 Built-in CSS Animations

### Float Animation
```css
.animate-float {
  animation: float 3s ease-in-out infinite;
}
```
**Usage:** Floating icons, hero elements, decorative objects
**Implementation Example:**
```tsx
<div className="animate-float text-4xl">🚀</div>
```

### Pulse Glow Animation
```css
.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```
**Usage:** Loading states, attention-grabbing elements, notifications
**Implementation Example:**
```tsx
<div className="animate-pulse-glow rounded-lg p-4">
  Loading...
</div>
```

### Slide In Animation
```css
.animate-slide-in {
  animation: slide-in 0.5s ease-out;
}
```
**Usage:** List items, modal enters, card reveals
**Implementation Example:**
```tsx
<div className="animate-slide-in">New item</div>
```

### Fade In Animation
```css
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
```
**Usage:** Text reveals, background images, page content
**Implementation Example:**
```tsx
<p className="animate-fade-in">Welcome to VokDev</p>
```

---

## 🎯 Hover Interactions

### Hover Lift Effect
```css
.hover-lift {
  @apply transition-transform duration-300 hover:scale-105 hover:-translate-y-1;
}
```
**Elements:** Cards, buttons, interactive elements
**Effect:** Scale 105% + move up 4px
**Usage:**
```tsx
<div className="hover-lift">Hover me</div>
```

### Hover Glow Effect
```css
.hover-glow {
  @apply transition-all duration-300 hover:shadow-lg hover:shadow-primary/30;
}
```
**Elements:** Cards, featured content
**Effect:** Enhanced shadow with primary color glow
**Usage:**
```tsx
<div className="hover-glow">Featured content</div>
```

### Glow Utilities
```css
.glow-primary    /* 20px blur, purple color */
.glow-secondary  /* 20px blur, cyan color */
.glow-tertiary   /* 20px blur, pink color */
```

---

## 🏃 Scroll Animations

### Fade In on Scroll
**Library:** Framer Motion + ScrollTrigger
```tsx
import { useInView } from 'react-intersection-observer';

export function FadeOnScroll() {
  const { ref, inView } = useInView({ triggerOnce: true });
  
  return (
    <div ref={ref} className={inView ? 'opacity-100' : 'opacity-0'}>
      Content
    </div>
  );
}
```

### Slide Up on Scroll
```tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function SlideUpOnScroll() {
  const { ref, inView } = useInView({ triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      Content slides up
    </motion.div>
  );
}
```

### Parallax Effect
```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

export function Parallax() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <motion.div style={{ y }}>
      Parallax element
    </motion.div>
  );
}
```

---

## 🎪 Component-Specific Animations

### Button Animations

**Primary Button Hover**
- Scale: 105%
- Translate: -4px (up)
- Shadow: Enhanced
- Duration: 300ms
- Easing: ease-in-out

**Implementation:**
```tsx
<button className="bg-primary hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
  Click me
</button>
```

### Card Animations

**Default Card Hover**
- Shadow: Increase to lg
- Translate: -4px (up)
- Duration: 300ms

**Interactive Card Hover**
- Glow: Enhanced
- Translate: -8px (up)
- Shadow: Strong
- Duration: 300ms

**Featured Card Hover**
- Glow: Maximum
- Translate: -8px (up)
- Duration: 300ms

### Input Focus

**Focus State Animation**
- Ring: Appears with 2px offset
- Color: Primary accent
- Duration: 150ms
- Border: Subtle color change

**Implementation:**
```tsx
<input className="focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300" />
```

### Badge Animations

**Badge Hover**
- Glow: Activate (if variant supports)
- Scale: 105%
- Duration: 300ms

---

## 🎬 Page Transition Animations

### Entry Animation Pattern
```tsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  duration: 0.5,
  ease: 'easeInOut',
};

export default function Page() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      Page content
    </motion.div>
  );
}
```

### Staggered List Animation
```tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function ListAnimation() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

---

## 🎪 Loading States

### Skeleton Loading
```tsx
export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-muted rounded-lg mb-4"></div>
      <div className="h-4 bg-muted rounded mb-2"></div>
      <div className="h-4 bg-muted rounded"></div>
    </div>
  );
}
```

### Spinner Loading
```tsx
export function LoadingSpinner() {
  return (
    <div className="animate-spin inline-block">
      ⚙️
    </div>
  );
}
```

### Progress Animation
```tsx
export function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </div>
  );
}
```

---

## 🎯 Modal & Overlay Animations

### Modal Enter/Exit
```tsx
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export function Modal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card rounded-xl p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Modal content
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## 🎨 Glassmorphism Animation

### Glass Effect with Glow
```tsx
export function GlassCard() {
  return (
    <motion.div
      className="glass rounded-xl p-6 hover:glow-secondary"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      Glassmorphic content
    </motion.div>
  );
}
```

---

## ⚡ Performance Tips

### 1. Use transform & opacity
```tsx
// ✅ Good - GPU accelerated
<motion.div animate={{ x: 100, opacity: 0.5 }} />

// ❌ Bad - CPU intensive
<motion.div animate={{ left: 100, visibility: 'hidden' }} />
```

### 2. Limit re-renders
```tsx
// Use React.memo for animated components
export const AnimatedCard = React.memo(({ children }) => (
  <motion.div>{children}</motion.div>
));
```

### 3. Use will-change sparingly
```css
/* Only for animations that are actually running */
.animating-element {
  will-change: transform, opacity;
}

.animating-element:not(:hover) {
  will-change: auto;
}
```

### 4. Reduce motion for accessibility
```tsx
import { useReducedMotion } from 'framer-motion';

export function AnimatedButton() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.button
      animate={{ scale: 1.1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Click me
    </motion.button>
  );
}
```

---

## 📋 Animation Checklist

- [ ] All animations serve a purpose
- [ ] Duration is appropriate (150-500ms for most)
- [ ] Easing feels natural for the context
- [ ] Hover states are obvious and responsive
- [ ] Loading states are clear and animated
- [ ] Scroll animations trigger at logical points
- [ ] Reduced motion preference is respected
- [ ] Animations are GPU-accelerated (transform, opacity)
- [ ] No jank or frame drops during animations
- [ ] Mobile animations are smooth at 60fps

---

## 🎯 Best Practices

1. **Purposeful animations** - Every animation should communicate something
2. **Consistent timing** - Use the same durations throughout the app
3. **Momentum-based** - Easing should mimic real-world physics
4. **Accessible** - Respect prefers-reduced-motion
5. **Performance-first** - Profile animations to avoid jank
6. **Mobile-optimized** - Test animations on real devices
7. **Documentation** - Document animation patterns for consistency
8. **User testing** - Get feedback on animation effectiveness

---

## 🔗 Resources

- **Framer Motion Docs:** https://www.framer.com/motion
- **GSAP Docs:** https://gsap.com/docs
- **Animate.css:** https://animate.style
- **Web Animations API:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- **12 Principles of Animation:** https://the12principles.tumblr.com
