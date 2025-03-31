# Nube System 1.0

A modern, responsive SCSS utility framework with clamp-based responsive sizing. Built for modern web development with a focus on maintainability and scalability.

## Features

- 🎯 Utility-first approach
- 📱 Responsive by default using CSS clamp()
- 🎨 Customizable through CSS variables
- 🔧 Modular SCSS architecture
- 📦 Tree-shakeable when using SCSS source
- 🚀 Zero-runtime overhead
- 🔄 Breakpoint-based responsive utilities

## Installation

```bash
npm install nube-system
```

## Quick Start

```scss
// Option 1: Import the compiled CSS
@import "nube-system/dist/nube-system.css";

// Option 2: Import the SCSS source (for customization)
@use "nube-system/src/nube-system.scss";
```

## Usage

### Flex Utilities

```html
<!-- Responsive flex container -->
<div class="xs_fd-column md_fd-row xs_ai-center md_ai-start">
  <div class="xs_order-2 md_order-1">First on desktop</div>
  <div class="xs_order-1 md_order-2">First on mobile</div>
</div>

<!-- Flex with justify and wrap -->
<div class="xs_jc-center md_jc-between xs_fw-wrap md_fw-nowrap">
  <!-- Content -->
</div>
```

### Layout & Spacing

```html
<!-- Responsive container with spacing -->
<div class="p-md m-lg">
  <div class="gap-sm">
    <!-- Content -->
  </div>
</div>
```

### Available Utilities

#### Flex

- Direction: `fd-row`, `fd-column`, `fd-row-reverse`, `fd-column-reverse`
- Justify: `jc-start`, `jc-end`, `jc-center`, `jc-between`, `jc-around`, `jc-evenly`
- Align: `ai-start`, `ai-end`, `ai-center`, `ai-baseline`, `ai-stretch`
- Wrap: `fw-wrap`, `fw-nowrap`, `fw-wrap-reverse`
- Grow/Shrink: `fg-0`, `fg-1`, `fs-0`, `fs-1`
- Self Align: `as-auto`, `as-start`, `as-end`, `as-center`, `as-baseline`, `as-stretch`
- Order: `order-1` through `order-12`

#### Spacing

- Margin: `m-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`, `mx-*`, `my-*`
- Padding: `p-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*`, `px-*`, `py-*`
- Gap: `gap-*`, `gap-x-*`, `gap-y-*`

All utilities support breakpoint prefixes:

- `xs_` (default, no prefix needed)
- `sm_`
- `md_`
- `lg_`

## Breakpoints

- xs: 480px
- sm: 768px
- md: 992px
- lg: 992px+

## Customization

### Layout Sizes

Layout sizes are defined using CSS custom properties with `clamp()` for responsive behavior:

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Author

Don Vaskez
