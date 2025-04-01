# Nube System Documentation

## Quick Start

The simplest way to use Nube System is to import the unified CSS file:

```javascript
// In your main.js, Layout.astro, or other entry point:
import "../styles/system.css"; // Development version
// OR
import "../styles/system.min.css"; // Production (minified) version
```

This single file contains all utility classes and variables, with variables defined at the top for proper cascading.

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Utility Classes](#utility-classes)
3. [Responsive Design](#responsive-design)
4. [Theme System](#theme-system)
5. [Advanced Usage](#advanced-usage)

## Core Concepts

### Layout Size System

The framework uses a numeric scale from 0 to 15 for all layout-related utilities:

```scss
:root {
  --layout--size--0: 0rem; // 0px
  --layout--size--1: 0.125rem; // 2px
  --layout--size--2: 0.25rem; // 4px
  --layout--size--3: clamp(0.375rem, 0.185vw + 0.333rem, 0.5rem); // 6-8px
  --layout--size--4: clamp(0.625rem, 0.185vw + 0.583rem, 0.75rem); // 10-12px
  --layout--size--5: clamp(0.75rem, 0.37vw + 0.667rem, 1rem); // 12-16px
  --layout--size--6: clamp(1.25rem, 0.37vw + 1.167rem, 1.5rem); // 20-24px
  --layout--size--7: clamp(1.5rem, 0.741vw + 1.333rem, 2rem); // 24-32px
  --layout--size--8: clamp(2.5rem, 0.741vw + 2.333rem, 3rem); // 40-48px
  --layout--size--9: clamp(3rem, 1.481vw + 2.667rem, 4rem); // 48-64px
  --layout--size--10: clamp(4rem, 2.222vw + 3.5rem, 5.5rem); // 64-88px
  --layout--size--11: clamp(5.5rem, 3.704vw + 4.667rem, 8rem); // 88-128px
  --layout--size--12: clamp(7.5rem, 7.407vw + 5.833rem, 12.5rem); // 120-200px
  --layout--size--13: clamp(11.5rem, 7.407vw + 9.833rem, 16.5rem); // 184-264px
  --layout--size--14: clamp(13.5rem, 8.889vw + 11.5rem, 19.5rem); // 216-312px
  --layout--size--15: clamp(15.5rem, 10.37vw + 13.167rem, 22.5rem); // 248-360px
}
```

These sizes are used consistently across spacing utilities (margin, padding, gap) and are inherently responsive using `clamp()`.

### Naming Convention

- Breakpoint prefixes use underscore: `md_fd-row`
- Property abbreviations are consistent: `fd` (flex-direction), `jc` (justify-content)
- Size modifiers use numeric scale (0-15)

## Utility Classes

### Flex Utilities

```html
<!-- Basic flex container -->
<div class="xs_fd-column md_fd-row">
  <!-- Column on mobile, row on desktop -->
</div>

<!-- Complex flex layout -->
<div
  class="xs_fd-column md_fd-row xs_jc-center md_jc-between xs_ai-center md_ai-start"
>
  <div class="xs_order-2 md_order-1">First on desktop</div>
  <div class="xs_order-1 md_order-2">First on mobile</div>
</div>
```

Available flex utilities:

- Direction: `fd-row`, `fd-column`, `
