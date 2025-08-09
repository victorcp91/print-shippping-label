# Style Guide - Print Shipping Label

This document defines the design system based on the provided Figma file, implemented through custom Tailwind CSS v4 configurations.

## 🎨 Color Palette

### Primary Colors

- **Primary 500**: `#2884c7` - Main color for CTAs, active links
- **Primary 600**: `#0284c7` - Hover states for primary elements

### Background Colors

- **Background Primary**: `#ffffff` - Main background (white)
- **Background Secondary**: `#f9fafb` - Secondary sections background
- **Background Accent**: `#eff8ff` - Subtle accent background

### Text Colors

- **Text Primary**: `#1f2937` - Main text (headlines, important content)
- **Text Secondary**: `#6b7280` - Secondary text (descriptions)
- **Text Tertiary**: `#9ca3af` - Tertiary text (placeholders, labels)
- **Text Accent**: `#2884c7` - Accent text (links)

### Border Colors

- **Border Light**: `#e5e7eb` - Subtle borders
- **Border Default**: `#d1d5db` - Default borders
- **Border Dark**: `#9ca3af` - Accent borders

## 📏 Spacing

### Container Sizes

```css
.max-w-container    /* max-width: 64rem (1024px) */
/* max-width: 64rem (1024px) */
.max-w-content; /* max-width: 62rem (992px) */
```

### Custom Spacing

- `18` (4.5rem / 72px)
- `88` (22rem / 352px)
- `112` (28rem / 448px)
- `128` (32rem / 512px)
- `144` (36rem / 576px)
- `160` (40rem / 640px)
- `176` (44rem / 704px)
- `192` (48rem / 768px)
- `208` (52rem / 832px)
- `224` (56rem / 896px)
- `240` (60rem / 960px)
- `256` (64rem / 1024px)

## 🔘 Border Radius

- **XS**: `2px` - Small elements
- **SM**: `4px` - Inputs, small buttons
- **MD**: `8px` - Cards, modals
- **LG**: `12px` - Large containers
- **XL**: `16px` - Accent elements
- **2XL**: `24px` - Very large elements
- **Full**: `9999px` - Circular elements

## 🌑 Shadows

### Defined Shadows

- **SM**: `0 1px 2px rgba(0, 0, 0, 0.05)` - Subtle shadow
- **Card**: `0 1px 2px rgba(0, 0, 0, 0.05)` - Shadow for cards
- **MD**: `0 4px 6px rgba(0, 0, 0, 0.05)` - Medium shadow
- **LG**: `0 10px 15px rgba(0, 0, 0, 0.05)` - Pronounced shadow

## 📝 Typography

### Font Sizes

- **XS**: `12px` (line-height: 16px)
- **SM**: `14px` (line-height: 20px)
- **Base**: `16px` (line-height: 24px)
- **LG**: `18px` (line-height: 28px)
- **XL**: `20px` (line-height: 28px)
- **2XL**: `24px` (line-height: 32px)
- **3XL**: `30px` (line-height: 36px)
- **4XL**: `36px` (line-height: 40px)

### Font Weights

- **Light**: `300`
- **Normal**: `400`
- **Medium**: `500`
- **Semibold**: `600`
- **Bold**: `700`

## 🎯 Utility Classes

### Using Custom Colors

```html
<!-- Backgrounds -->
<div class="bg-background-primary">...</div>
<div class="bg-background-secondary">...</div>

<!-- Text -->
<p class="text-text-primary">Main text</p>
<p class="text-text-secondary">Secondary text</p>
<a class="text-text-accent">Link</a>

<!-- Borders -->
<div class="border border-border-light">...</div>
<div class="border border-border-default">...</div>
```

### Shadows

```html
<div class="shadow-card">Card with shadow</div>
<div class="shadow-sm">Subtle shadow</div>
```

## 🔧 Available CSS Variables

In addition to Tailwind classes, you can use CSS variables directly:

```css
.custom-element {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-medium);
}
```

## 📱 Responsiveness

Use default Tailwind breakpoints combined with custom containers:

```html
<div class="max-w-container mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Responsive content -->
  </div>
</div>
```

## ✅ Best Practices

1. **Semantic colors**: Prefer semantic color classes (`text-text-primary`) over generic neutral colors
2. **Containers**: Use `max-w-container` or `max-w-content` to maintain consistent widths
3. **Transitions**: Use defined transition durations (`duration-150`, `duration-200`, `duration-300`)
4. **Accessibility**: Maintain adequate contrast using defined text colors
5. **Spacing**: Use custom spacing when necessary to maintain consistency with the design

This style guide provides all necessary Tailwind CSS configurations to maintain visual consistency following exactly the patterns extracted from the Figma design.
