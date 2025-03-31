# Nube System 1.0

A modern, utility-first SCSS framework with semantic theme tokens and fluid responsive design.

## Installation

### Option 1: NPM

```bash
npm install nube-system
```

### Option 2: Yarn

```bash
yarn add nube-system
```

### Option 3: Manual Installation

1. Clone the repository:

```bash
git clone https://github.com/StefanV22/nube-system-1.0.git
```

2. Copy the `src` directory to your project
3. Import the main file in your SCSS:

```scss
@use "path/to/nube-system/src/main" as *;
```

## Quick Start

1. Import the framework in your main SCSS file:

```scss
@use "nube-system/src/main" as *;
```

2. Start using the utilities:

```html
<div class="xs_fd-column md_fd-row xs_ai-center md_ai-start gap5">
  <div class="p3">
    <h2 class="xs_text-lg md_text-xl font-bold">Title</h2>
    <p class="text-md">Content</p>
  </div>
  <div class="m3">
    <img src="image.jpg" alt="Example" />
  </div>
</div>
```

## Key Features

- Utility-first approach with semantic class names
- Fluid responsive design using `clamp()`
- Semantic theme system with CSS variables
- Modular SCSS architecture
- Tree-shakeable utilities
- Zero runtime overhead

## Documentation

For detailed documentation, see [DOCUMENTATION.md](DOCUMENTATION.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Don Vaskez
