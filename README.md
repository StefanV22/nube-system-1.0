# Nube System 1.0

A modern, utility-first CSS framework with semantic theme tokens and fluid responsive design.

## Installation

### Option 1: NPM

```bash
npm install nube-system
```

### Option 2: Yarn

```bash
yarn add nube-system
```

## Usage in Astro Projects

When installed in an Astro project, Nube System automatically creates:

```
src/
  ├── styles/
      ├── variables.css    (CSS variables for colors, sizes, typography)
      └── global-classes.css   (All utility classes)
```

Import these files in your main layout or entry point:

```javascript
// e.g., in src/layouts/Layout.astro
import "../styles/variables.css";
import "../styles/global-classes.css";
```

## Key Features

- Utility-first approach with semantic class names
- Fluid responsive design using `clamp()`
- Semantic theme system with CSS variables
- Zero runtime overhead

## Documentation

For detailed documentation, see [DOCUMENTATION.md](DOCUMENTATION.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Don Vaskez
