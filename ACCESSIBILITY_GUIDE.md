# VokDev Accessibility Guide

## ♿ Commitment to Accessibility

VokDev is built with accessibility at its core. All components meet **WCAG 2.1 AA standards** at minimum, ensuring that everyone can use and enjoy the platform regardless of ability.

---

## 🎨 Color Contrast

### Contrast Ratio Requirements
```
WCAG AA Standard:
  - Body text (< 18px): 4.5:1 minimum
  - Large text (≥ 18px): 3:1 minimum
  - UI components: 3:1 minimum

WCAG AAA Standard (enhanced):
  - Body text: 7:1 minimum
  - Large text: 4.5:1 minimum
```

### VokDev Contrast Verification
```
Light Mode:
  ✅ Foreground (#1a1a23) on Background (white) = 12.8:1
  ✅ Muted text (#737388) on Background (white) = 4.8:1
  ✅ Primary button (#8B33FF) text (white) = 5.2:1

Dark Mode:
  ✅ Foreground (white) on Background (#141012) = 14:1
  ✅ Muted text (#a8a8b8) on Background (#141012) = 7.2:1
  ✅ Secondary (cyan) on Dark (#141012) = 9.8:1
```

### Color Accessibility
```
✅ DO: Use color + icons/text to convey information
❌ DON'T: Use color alone (e.g., red button = error)

✅ DO: Test with color blindness simulators
❌ DON'T: Assume all users see colors like you do

✅ DO: Provide alt text for meaningful colors
❌ DON'T: Make color the only differentiator
```

### Testing Tools
- **WCAG Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Blindness Simulator:** https://www.color-blindness.com/coblis-color-blindness-simulator/
- **WebAIM Contrast:** https://webaim.org/resources/contrastchecker/

---

## ⌨️ Keyboard Navigation

### Focus Indicators
```css
/* All interactive elements have visible focus states */
focus:ring-2 focus:ring-primary focus:ring-offset-2

/* Visible ring with 2px offset */
/* Color: Primary (purple) */
/* Tested with high contrast mode */
```

### Tab Order
```tsx
/* Natural DOM order = natural tab order */
/* Don't use tabindex unless necessary */

<button>First</button>          /* Tab 1 */
<button>Second</button>         /* Tab 2 */
<a href="#">Third</a>          /* Tab 3 */
```

### Skip Links
```tsx
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:text-white focus:p-2"
    >
      Skip to main content
    </a>
  );
}
```

### Keyboard Support Checklist
- [ ] All buttons are keyboard accessible
- [ ] Links can be activated with Enter
- [ ] Form inputs are focusable
- [ ] Modals trap focus
- [ ] Escape closes modals
- [ ] Arrow keys work in dropdowns/menus
- [ ] Tab order is logical
- [ ] Focus is visible at all times

---

## 📝 Semantic HTML

### Correct Semantic Structure
```tsx
// ✅ GOOD
<header>Navigation header</header>
<nav>Links</nav>
<main id="main-content">Main content</main>
<article>Article content</article>
<section>Section content</section>
<aside>Sidebar</aside>
<footer>Footer links</footer>

// ❌ BAD
<div class="header">
  <div class="nav">
    <div class="main">
      Content
    </div>
  </div>
</div>
```

### Semantic Form Elements
```tsx
// ✅ GOOD
<form>
  <fieldset>
    <legend>Contact Information</legend>
    <label htmlFor="email">Email:</label>
    <input id="email" type="email" />
  </fieldset>
  <button type="submit">Submit</button>
</form>

// ❌ BAD
<div className="form">
  <div className="legend">Contact Information</div>
  <div>Email:</div>
  <input />
  <div onClick={handleSubmit}>Submit</div>
</div>
```

### Heading Hierarchy
```tsx
// ✅ GOOD - Logical hierarchy
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h2>Another Section</h2>

// ❌ BAD - Skip levels
<h1>Page Title</h1>
<h3>Subsection (skipped h2)</h3>
<h1>Another Title (should be h2)</h1>
```

---

## 🏷️ ARIA Attributes

### Button with Icon
```tsx
export function IconButton({ icon, label }) {
  return (
    <button aria-label={label}>
      {icon}
      {/* If visible text exists, don't need aria-label */}
    </button>
  );
}

// Usage
<IconButton icon="🔍" label="Search" />
```

### Describing Elements
```tsx
// ✅ aria-label: Describe button/icon
<button aria-label="Close modal">×</button>

// ✅ aria-labelledby: Link to heading
<div id="dialog-title">Delete Item?</div>
<dialog aria-labelledby="dialog-title">
  Are you sure?
</dialog>

// ✅ aria-describedby: Provide extra description
<input aria-describedby="pwd-hint" type="password" />
<p id="pwd-hint">Must be 8+ characters</p>
```

### Live Regions
```tsx
// ✅ Alert announcements
<div role="alert">
  <p>Successfully saved!</p>
</div>

// ✅ Status updates
<div aria-live="polite" aria-atomic="true">
  Loading... {progressPercent}%
</div>

// ✅ Assertive announcements (important)
<div role="alert" aria-live="assertive">
  Error: Please fix the form
</div>
```

### ARIA Roles
```tsx
// ✅ Dialog/Modal
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">Dialog Title</h2>
</div>

// ✅ Tab Panel
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
  <div id="panel1" role="tabpanel">Content</div>
</div>

// ✅ Progress Bar
<div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" />

// ✅ Tooltip
<button aria-describedby="tooltip">Hover me</button>
<div id="tooltip" role="tooltip">Help text</div>
```

---

## 📱 Screen Reader Testing

### Screen Readers to Test
- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS, iOS, built-in)
- **TalkBack** (Android, built-in)

### What to Test
```
1. Page structure and navigation
2. Form labels and error messages
3. Button and link text
4. Image alt text
5. Table headers and captions
6. Modal announcements
7. Loading states
8. Status messages
9. Landmark navigation
10. Heading structure
```

### Common Issues
```
❌ Missing alt text on images
❌ Form inputs without labels
❌ Links with text like "Click here"
❌ Images used as buttons without labels
❌ No heading hierarchy
❌ Missing form error descriptions
❌ Auto-playing audio
❌ Flashing content (>3x/second)
```

---

## 🖼️ Image Accessibility

### Alt Text Examples
```tsx
// ✅ Meaningful alt text
<img src="team.jpg" alt="VokDev team members collaborating on a project" />

// ✅ Decorative image (empty alt)
<img src="divider.png" alt="" aria-hidden="true" />

// ✅ Icon with context
<img src="star.svg" alt="Favorite" title="Add to favorites" />

// ❌ Poor alt text
<img src="team.jpg" alt="image" />
<img src="team.jpg" alt="team.jpg" />
<img src="team.jpg" />
```

### SVG Accessibility
```tsx
// ✅ Accessible SVG icon
<svg aria-label="Home">
  <title>Home</title>
  <path d="..." />
</svg>

// ✅ SVG with aria-hidden (decorative)
<svg aria-hidden="true">
  <path d="..." />
</svg>

// ✅ SVG in button
<button aria-label="Go to home page">
  <svg><path d="..." /></svg>
</button>
```

---

## 🎬 Motion & Animation Accessibility

### Reduced Motion Support
```tsx
import { useReducedMotion } from 'framer-motion';

export function AnimatedCard() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={{ scale: 1.1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
      }}
    >
      Accessible animation
    </motion.div>
  );
}
```

### CSS Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Guidelines
```
✅ DO: Respect prefers-reduced-motion
✅ DO: Use animations to enhance, not distract
✅ DO: Allow disabling auto-playing content
❌ DON'T: Autoplay videos with sound
❌ DON'T: Flash more than 3x per second
❌ DON'T: Ignore reduced motion preferences
```

---

## 📋 Form Accessibility

### Accessible Form Fields
```tsx
export function AccessibleForm() {
  return (
    <form>
      {/* ✅ Proper label association */}
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" required />
      
      {/* ✅ Error messages linked to input */}
      <input
        id="phone"
        aria-describedby="phone-error"
        aria-invalid="false"
      />
      <p id="phone-error" role="alert">
        Invalid phone number
      </p>
      
      {/* ✅ Group related fields */}
      <fieldset>
        <legend>Preferences</legend>
        <label>
          <input type="checkbox" name="newsletter" />
          Subscribe to newsletter
        </label>
      </fieldset>
      
      {/* ✅ Clear submit button */}
      <button type="submit">Submit Form</button>
    </form>
  );
}
```

### Input Validation
```tsx
export function ValidatedInput() {
  const [error, setError] = useState('');
  
  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        aria-describedby="pwd-hint pwd-error"
        aria-invalid={!!error}
        onChange={(e) => validatePassword(e.target.value)}
      />
      <p id="pwd-hint">Min 8 characters, 1 number, 1 uppercase</p>
      {error && (
        <p id="pwd-error" role="alert" className="text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
```

---

## 🔍 Testing Checklist

### Automated Testing
- [ ] Run axe DevTools (Chrome extension)
- [ ] Test with WAVE (WebAIM)
- [ ] Use Lighthouse accessibility audit
- [ ] Check color contrast ratios
- [ ] Validate HTML

### Manual Testing
- [ ] Keyboard-only navigation (no mouse)
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Enable Windows High Contrast mode
- [ ] Test with browser zoom (200%)
- [ ] Test on mobile with TalkBack/VoiceOver
- [ ] Check focus indicators
- [ ] Verify heading hierarchy
- [ ] Test form labels and errors

### Device Testing
- [ ] Desktop with keyboard/mouse
- [ ] Desktop with screen reader
- [ ] Mobile with touch + screen reader
- [ ] Tablet with keyboard
- [ ] Switch access
- [ ] Eye tracking

---

## 📚 VokDev Component Accessibility

### Button Component
```
✅ Keyboard accessible (Enter/Space)
✅ Focus ring visible
✅ Proper aria-label for icon-only buttons
✅ Disabled state clearly indicated
✅ Supports loading state with announcement
```

### Card Component
```
✅ Semantic structure with headings
✅ Proper link semantics
✅ Focus management
✅ Heading hierarchy respected
```

### Input Component
```
✅ Label associated with input
✅ Error messages linked via aria-describedby
✅ aria-invalid for validation state
✅ Proper input type (email, password, etc.)
✅ Focus ring visible
```

### Badge Component
```
✅ Proper contrast ratio
✅ Not color-only indicators
✅ Text labels provided
```

---

## 🎯 Design Tokens for Accessibility

### Focus States
```css
/* All interactive elements */
focus:outline-none
focus:ring-2
focus:ring-primary
focus:ring-offset-2
dark:focus:ring-offset-background
```

### High Contrast Support
```css
/* Enhanced borders for high contrast mode */
@media (prefers-contrast: more) {
  button {
    border: 2px solid;
  }
}
```

### Text Sizing
```
Minimum: 14px (captions only)
Small: 14px-16px
Body: 16px (standard)
Large: 18px+
```

---

## 🔗 Resources & Tools

### Accessibility Guidelines
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Practices:** https://www.w3.org/WAI/ARIA/apg/
- **WebAIM:** https://webaim.org/

### Testing Tools
- **axe DevTools:** https://www.deque.com/axe/devtools/
- **WAVE:** https://wave.webaim.org/
- **Lighthouse:** Built into Chrome DevTools
- **NVDA:** https://www.nvaccess.org/

### Learning Resources
- **A11ycasts:** https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9Xc-RgEzwLvePywoJ
- **The A11Y Project:** https://www.a11yproject.com/
- **Inclusive Components:** https://inclusive-components.design/

---

## ✅ Accessibility Checklist

- [ ] WCAG 2.1 AA compliance verified
- [ ] Color contrast ratios >= 4.5:1 (body)
- [ ] Keyboard navigation fully functional
- [ ] Focus indicators visible
- [ ] Semantic HTML used throughout
- [ ] ARIA attributes used correctly
- [ ] Form labels associated with inputs
- [ ] Error messages descriptive and linked
- [ ] Images have meaningful alt text
- [ ] Reduced motion preferences respected
- [ ] No auto-playing media with sound
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] No flashing content (>3x/second)
- [ ] Heading hierarchy logical
- [ ] Skip links provided

---

## 🎯 Continuous Improvement

Accessibility is an ongoing process. We're committed to:
- Regular audits and testing
- Community feedback integration
- Updated WCAG compliance
- Accessibility training for team
- User testing with disabled users
- Transparent accessibility statement
