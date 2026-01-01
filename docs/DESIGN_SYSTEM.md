# MinSU BC Design System

**Mindoro State University - Bongabong Campus**

A comprehensive design system for the student portal, ensuring visual consistency, accessibility, and brand alignment across all modules.

---

## 🎨 Brand Identity

### Color Philosophy

The MinSU BC design system is built around the university's institutional identity:

- **Primary Green**: Represents growth, nature, and the agricultural heritage of Mindoro
- **Gold/Amber Accent**: Used for highlights, notifications, and calls-to-action
- **Neutral Palette**: Provides balance and ensures readability

### Core Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `primary` | Green (#16a34a) | Light Green (#22c55e) | Main actions, navigation, branding |
| `secondary` | Soft Gray | Dark Gray | Supporting elements |
| `accent` | Gold/Amber | Gold/Amber | Highlights, notifications |
| `muted` | Light Gray | Dark Gray | Subtle backgrounds |
| `destructive` | Red | Red | Error states, destructive actions |
| `success` | Green | Green | Success states |
| `warning` | Amber | Amber | Warning states |
| `info` | Blue | Blue | Informational states |

---

## 📝 Typography

### Font Stack

```css
--font-sans: 'Inter', 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
```

### Type Scale

| Size | Class | Usage |
|------|-------|-------|
| 12px | `text-xs` | Captions, helper text |
| 14px | `text-sm` | Body small, labels |
| 16px | `text-base` | Body text (default) |
| 18px | `text-lg` | Lead paragraphs |
| 20px | `text-xl` | H6, card titles |
| 24px | `text-2xl` | H5 |
| 30px | `text-3xl` | H4 |
| 36px | `text-4xl` | H3 |
| 48px | `text-5xl` | H2 |
| 60px | `text-6xl` | H1 |

### Font Weights

- `font-normal` (400): Body text
- `font-medium` (500): Emphasis, labels
- `font-semibold` (600): Subheadings
- `font-bold` (700): Headings

---

## 📐 Spacing

Based on a **4px grid system** (0.25rem increments):

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Tight spacing |
| `2` | 8px | Small gaps |
| `3` | 12px | Compact spacing |
| `4` | 16px | Default spacing |
| `6` | 24px | Comfortable spacing |
| `8` | 32px | Section padding |
| `12` | 48px | Large gaps |
| `16` | 64px | Section margins |

---

## 🔲 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements |
| `rounded-md` | 6px | Inputs, small buttons |
| `rounded` | 8px | Default |
| `rounded-lg` | 8px | Cards, modals |
| `rounded-xl` | 12px | Large cards |
| `rounded-2xl` | 16px | Hero sections |
| `rounded-full` | 9999px | Avatars, pills |

---

## 🌓 Dark Mode

The design system fully supports dark mode through CSS custom properties. Colors automatically adapt to provide:

- Proper contrast ratios (WCAG 2.1 AA)
- Reduced eye strain in low-light environments
- Maintained brand identity

### Usage

Dark mode is controlled via the `.dark` class on the `<html>` element.

---

## 🧩 Component Patterns

### Buttons

```tsx
// Primary action
<Button>Save Changes</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Ghost (minimal)
<Button variant="ghost">Learn More</Button>

// Outline
<Button variant="outline">View Details</Button>
```

### Status Badges

```tsx
// Using CSS classes
<Badge className="status-active">Active</Badge>
<Badge className="status-pending">Pending</Badge>
<Badge className="status-error">Error</Badge>
<Badge className="status-info">Info</Badge>

// Using design tokens
import { statusStyles } from '@/lib/design-tokens';
<Badge className={statusStyles.active}>Active</Badge>
```

### Cards

```tsx
// Interactive card (with hover effects)
<Card className="card-interactive">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>

// Highlighted/featured card
<Card className="card-highlighted">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
```

### Glass Effect

```tsx
// Subtle glass
<div className="glass">...</div>

// Strong glass
<div className="glass-strong">...</div>
```

---

## 🎯 Utility Classes

### Layout

```css
.container-narrow   /* max-w-3xl centered */
.container-wide     /* max-w-7xl centered */
.section-spacing    /* py-12 md:py-16 lg:py-20 */
.section-spacing-sm /* py-8 md:py-10 lg:py-12 */
```

### Gradients

```css
.gradient-primary   /* Primary color gradient */
.gradient-subtle    /* Subtle background gradient */
.gradient-card      /* Card background gradient */
.text-gradient-primary /* Text with primary gradient */
```

### Effects

```css
.hover-lift         /* Slight lift on hover */
.hover-lift-lg      /* Larger lift on hover */
.shadow-primary     /* Primary colored shadow */
.shadow-primary-lg  /* Large primary shadow */
```

### Animations

```css
.animation-delay-100
.animation-delay-200
.animation-delay-300
.animation-delay-500
.animation-delay-1000
.animation-delay-2000
```

---

## ♿ Accessibility

The design system follows **WCAG 2.1 AA** guidelines:

### Color Contrast

- All text meets minimum contrast ratios
- Focus states are clearly visible
- Color is never the only indicator of state

### Focus States

All interactive elements have visible focus indicators:

```css
*:focus-visible {
    @apply ring-2 ring-ring ring-offset-2 ring-offset-background outline-none;
}
```

### Keyboard Navigation

- All interactive elements are focusable
- Logical tab order
- Keyboard shortcuts where appropriate

---

## 📦 Design Tokens (TypeScript)

Import design tokens for programmatic access:

```typescript
import {
    brandColors,
    semanticColors,
    spacing,
    typography,
    statusStyles,
    commonStyles,
    iconSizes,
    avatarSizes,
} from '@/lib/design-tokens';

// Use in components
<div className={statusStyles.active}>Active</div>
<div className={commonStyles.cardInteractive}>...</div>
<Icon className={iconSizes.md} />
```

---

## 🎨 Icon Usage

Use Lucide React icons consistently:

| Size | Class | Usage |
|------|-------|-------|
| xs | `h-3 w-3` | Inline with small text |
| sm | `h-4 w-4` | Buttons, badges |
| md | `h-5 w-5` | Default, list items |
| lg | `h-6 w-6` | Headers, emphasis |
| xl | `h-8 w-8` | Feature icons |
| 2xl | `h-10 w-10` | Hero sections |

---

## 📱 Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Large phones, landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

---

## 🔧 Implementation

### CSS Custom Properties

All colors are defined as CSS custom properties in `resources/css/app.css`. They automatically adapt to light/dark mode.

### Tailwind Classes

Use semantic Tailwind classes that reference the design tokens:

```tsx
// ✅ Correct - uses semantic tokens
<div className="bg-primary text-primary-foreground">
<div className="text-muted-foreground">
<div className="border-border">

// ❌ Avoid - hardcoded colors
<div className="bg-green-600 text-white">
<div className="text-gray-500">
<div className="border-gray-200">
```

---

## 📋 Checklist for New Components

When creating new components, ensure:

- [ ] Uses semantic color tokens (not hardcoded colors)
- [ ] Supports dark mode
- [ ] Has proper focus states
- [ ] Follows spacing scale
- [ ] Uses appropriate border radius
- [ ] Is keyboard accessible
- [ ] Has proper ARIA attributes where needed
- [ ] Is responsive

---

## 📚 Related Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Last updated: January 2026*
*MinSU BC Development Team*
