# Nube System 1.0

A modern, responsive SCSS utility framework with clamp-based responsive sizing and semantic theme tokens.

## Quick Start

```bash
# Install via npm
npm install nube-system

# Or via yarn
yarn add nube-system
```

Import in your SCSS:

```scss
// Option 1: Import the compiled CSS
@import "nube-system/dist/nube-system.css";

// Option 2: Import the SCSS source (for customization)
@use "nube-system/src/nube-system.scss";
```

## Example Usage

```html
<!-- Responsive flex container -->
<div class="xs_fd-column md_fd-row xs_ai-center gap-md p-lg">
  <div class="xs_order-2 md_order-1">
    <h2 class="xs_text-lg md_text-xl font-bold text-body">Title</h2>
    <p class="text-md text-muted">Content</p>
  </div>
  <div class="xs_order-1 md_order-2">
    <img src="image.jpg" alt="Example" />
  </div>
</div>
```

## Key Features

- 🎯 Utility-first approach with semantic naming
- 📱 Responsive by default using CSS clamp()
- 🎨 Theme system with semantic color tokens
- 🔧 Modular SCSS architecture
- 📦 Tree-shakeable
- 🚀 Zero-runtime overhead

## Documentation

See [DOCUMENTATION.md](DOCUMENTATION.md) for detailed usage, examples, and customization options.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Don Vaskez
