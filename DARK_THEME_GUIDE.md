# Dark Theme Migration Guide

## 🎯 Color System Overview

### Light Theme (Current)

- **Primary**: Navy (#123458) - Brand identity
- **Background**: Cream (#F1EFEC) - Page background
- **Surface**: White/Beige - Cards, containers
- **Text**: Navy variants - Typography

### Dark Theme (New)

- **Primary**: Light Blue (#4A90E2) - Accessible navy variant
- **Background**: Deep Navy (#0A1628) - Dark but warm
- **Surface**: Dark Blue variants - Elevated surfaces
- **Text**: Cream variants - High contrast

## 🔧 Migration Priority

### High Priority (Core UX)

1. **Navigation/Header** ✅ DONE
2. **Contact Page** ✅ DONE
3. **Main Landing Page**
4. **About Page**
5. **Projects Page**

### Medium Priority (Content)

6. **Skills Page**
7. **Experience Page**
8. **Blog Pages**

### Low Priority (Details)

9. **Footer Component**
10. **Small UI Components**

## 🎨 Theme-Aware Classes Reference

### Replace These Classes:

```css
/* OLD → NEW */
text-navy → text-portfolio-navy
bg-white → bg-portfolio-surface-elevated
border-navy/10 → border-portfolio-navy/10
text-navy/70 → text-portfolio-navy/70 (automatically adapts)
bg-cream → bg-portfolio-cream
```

### Use These Utility Functions:

```tsx
import { getThemeStyle, cn } from "@/lib/theme-utils";

// Predefined component styles
className={getThemeStyle("heading")}
className={getThemeStyle("card")}
className={getThemeStyle("primaryButton")}

// Combine with custom classes
className={cn("custom-class", getThemeStyle("heading"))}
```

## 🔄 Component Migration Pattern

### Before:

```tsx
<div className="bg-white/80 border border-navy/10 text-navy">
  <h2 className="text-2xl font-bold text-navy">
  <p className="text-navy/70">
</div>
```

### After:

```tsx
<div className={cn("backdrop-blur-sm", getThemeStyle("card"))}>
  <h2 className={cn("text-2xl font-bold", getThemeStyle("heading"))}>
  <p className={getThemeStyle("subheading")}>
</div>
```

## 🎯 Canvas/Animation Updates

For components with canvas animations (like contact page):

```tsx
// Theme-aware canvas colors
const isDark = document.documentElement.classList.contains("dark");
const bgColor = isDark ? "hsl(213, 75%, 8%)" : "hsl(40, 25%, 94%)";
const strokeColor = isDark ? "210, 65%, 75%" : "213, 75%, 21%";
```

## ✅ Testing Checklist

- [ ] Light/Dark toggle works smoothly
- [ ] No color contrast issues (WCAG AA compliance)
- [ ] All interactive elements are visible in both themes
- [ ] Canvas animations adapt to theme
- [ ] System preference detection works
- [ ] No flash of unstyled content (FOUC)
- [ ] Mobile responsiveness maintained
- [ ] Performance impact is minimal

## 🚀 Next Steps

1. Test current implementation
2. Migrate landing page components
3. Update remaining pages
4. Add theme transition animations
5. Optimize for performance
6. Add theme preference persistence
