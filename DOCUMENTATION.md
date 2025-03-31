# Nube System 1.0 - Documentation

A comprehensive guide to using the Nube System utility framework.

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Utility Classes](#utility-classes)
3. [Responsive Design](#responsive-design)
4. [Layout System](#layout-system)
5. [Theme System](#theme-system)
6. [Advanced Usage](#advanced-usage)

## Core Concepts

### Responsive Behavior

All utilities in Nube System follow these principles:

- Spacing utilities (margin, padding, gap) are inherently responsive using `clamp()`
- Other utilities use breakpoint prefixes with underscore notation (`xs_`, `sm_`, `md_`, `lg_`)
- Layout sizes scale fluidly across viewports

### Naming Convention

- Breakpoint prefixes use underscore: `md_fd-row`
- Property abbreviations are consistent: `fd` (flex-direction), `jc` (justify-content)
- Size modifiers use semantic names: `sm`, `md`, `lg`

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

All spacing utilities use the layout size variables and are inherently responsive:

```html
<!-- Padding -->
<div class="p-sm">Small padding all around</div>
<div class="pt-md">Medium padding top</div>
<div class="px-lg">Large padding on x-axis</div>

<!-- Margin -->
<div class="m-sm">Small margin all around</div>
<div class="mt-md">Medium margin top</div>
<div class="mx-lg">Large margin on x-axis</div>

<!-- Gap -->
<div class="gap-sm">Small gap between items</div>
<div class="gap-x-md">Medium column gap</div>
<div class="gap-y-lg">Large row gap</div>

<!-- Negative margins -->
<div class="-mt-sm">Small negative margin top</div>
<div class="-mx-md">Medium negative margin on x-axis</div>
```

Available size modifiers:

- `2xs`: Extra extra small
- `xs`: Extra small
- `sm`: Small
- `md`: Medium
- `lg`: Large
- `xl`: Extra large
- `2xl`: Extra extra large

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
  lg: 992px // Large desktop,,
);
```

### Layout Sizes

Layout sizes use `clamp()` for fluid responsiveness:

```scss
:root {
  --layout--size--2xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --layout--size--xs: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  --layout--size--sm: clamp(0.75rem, 0.6rem + 0.75vw, 1.5rem);
  --layout--size--md: clamp(1rem, 0.8rem + 1vw, 2rem);
  --layout--size--lg: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
  --layout--size--xl: clamp(2rem, 1.6rem + 2vw, 4rem);
  --layout--size--2xl: clamp(3rem, 2.4rem + 3vw, 6rem);
}
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

### Performance Tips

1. Use `@use` instead of `@import` for better compilation
2. Leverage the modular structure for tree-shaking
3. Combine related utilities in components
4. Use semantic class names for better maintainability

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
