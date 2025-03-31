# Nube System 1.0 - Documentation

A comprehensive guide to using the Nube System utility framework.

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

- Direction: `fd-row`, `fd-column`, `fd-row-reverse`, `fd-column-reverse`
- Justify: `jc-start`, `jc-end`, `jc-center`, `jc-between`, `jc-around`, `jc-evenly`
- Align: `ai-start`, `ai-end`, `ai-center`, `ai-baseline`, `ai-stretch`
- Self-align: `as-auto`, `as-start`, `as-end`, `as-center`, `as-baseline`, `as-stretch`
- Wrap: `fw-wrap`, `fw-nowrap`, `fw-wrap-reverse`
- Grow/Shrink: `fg-0`, `fg-1`, `fs-0`, `fs-1`
- Order: `order-1` through `order-12`

### Spacing Utilities

All spacing utilities use the numeric scale (0-15) and are inherently responsive using `clamp()`:

```html
<!-- Padding -->
<div class="p0">No padding</div>
<div class="p2">Small padding (4px)</div>
<div class="p5">Medium padding (12-16px)</div>
<div class="p8">Large padding (40-48px)</div>

<!-- Directional padding -->
<div class="pt5">Top padding</div>
<div class="pr5">Right padding</div>
<div class="pb5">Bottom padding</div>
<div class="pl5">Left padding</div>

<!-- Combined padding -->
<div class="ph5 pv3">Horizontal 12-16px, vertical 6-8px</div>

<!-- Margin -->
<div class="m0">No margin</div>
<div class="m2">Small margin (4px)</div>
<div class="m5">Medium margin (12-16px)</div>
<div class="m8">Large margin (40-48px)</div>

<!-- Directional margin -->
<div class="mt5">Top margin</div>
<div class="mr5">Right margin</div>
<div class="mb5">Bottom margin</div>
<div class="ml5">Left margin</div>

<!-- Combined margin -->
<div class="mh5 mv3">Horizontal 12-16px, vertical 6-8px</div>

<!-- Gap -->
<div class="gap0">No gap</div>
<div class="gap2">Small gap (4px)</div>
<div class="gap5">Medium gap (12-16px)</div>
<div class="gap8">Large gap (40-48px)</div>

<!-- Row and column gaps -->
<div class="rgap5">Row gap</div>
<div class="cgap5">Column gap</div>
```

### Theme Utilities

```html
<!-- Background colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-surface">Surface background</div>

<!-- Text colors -->
<div class="text-body">Body text color</div>
<div class="text-muted">Muted text color</div>

<!-- Border colors -->
<div class="border-primary">Primary border</div>
<div class="border-subtle">Subtle border</div>

<!-- Accent colors -->
<div class="spot-accent">Accent background</div>
<div class="spot-text-accent">Accent text</div>
```

### Typography Utilities

```html
<!-- Font sizes -->
<div class="xs_text-sm md_text-lg">Responsive text size</div>

<!-- Font weights -->
<div class="font-normal">Normal weight</div>
<div class="font-bold">Bold weight</div>

<!-- Text alignment -->
<div class="xs_text-center md_text-left">
  Centered on mobile, left-aligned on desktop
</div>

<!-- Text decoration -->
<div class="text-underline">Underlined text</div>
<div class="text-none">No decoration</div>

<!-- Text transform -->
<div class="text-uppercase">Uppercase text</div>
<div class="text-capitalize">Capitalized text</div>
```

## Responsive Design

### Breakpoints

```scss
$breakpoints: (
  xs: 480px,
  // Mobile
  sm: 768px,
  // Tablet
  md: 992px,
  // Desktop
  lg: 992px // Large desktop,,,
);
```

### Responsive Patterns

```html
<!-- Responsive layout example -->
<div class="xs_fd-column md_fd-row xs_ai-center md_ai-start gap-md">
  <div class="xs_order-2 md_order-1 p-sm">
    <h2 class="xs_text-lg md_text-xl font-bold">Title</h2>
    <p class="text-md">Content</p>
  </div>
  <div class="xs_order-1 md_order-2 m-sm">
    <img src="image.jpg" alt="Example" />
  </div>
</div>
```

## Advanced Usage

### Customizing Variables

```scss
// In your variables file
:root {
  // Override layout sizes
  --layout--size--sm: clamp(0.5rem, 0.4rem + 0.5vw, 1.25rem);

  // Override theme colors
  --color--surface--primary: #1a1a1a;
  --color--ink--body: #ffffff;
}
```

### Using with CSS-in-JS

```javascript
const StyledComponent = styled.div`
  ${(props) =>
    props.spacing &&
    `
    padding: var(--layout--size--${props.spacing});
  `}

  ${(props) =>
    props.color &&
    `
    color: var(--color--ink--${props.color});
  `}
`;
```

## Best Practices

1. **Responsive Design**

   - Start with mobile layout (`xs_`)
   - Add breakpoint variants as needed
   - Use clamp-based utilities for fluid spacing

2. **Theme Usage**

   - Use semantic color tokens
   - Leverage CSS variables for dynamic theming
   - Follow the color hierarchy

3. **Layout Structure**

   - Build layouts with flex utilities
   - Use gap utilities instead of margins for spacing
   - Leverage the fluid layout sizes

4. **Maintainability**
   - Group related utilities
   - Use consistent naming patterns
   - Document custom extensions

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Don Vaskez
