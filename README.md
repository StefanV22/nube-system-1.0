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

## Usage

Import the complete system CSS file that includes all utilities:

```javascript
// Development version
import "nube-system/styles/system.css";

// OR Production (minified) version
import "nube-system/styles/system.min.css";
```

## Usage in Astro Projects

When installed in an Astro project, Nube System automatically configures itself. Simply import the system CSS in your main layout:

```javascript
// e.g., in src/layouts/Layout.astro
import "nube-system/styles/system.css";
```

## Key Features

- Utility-first approach with semantic class names
- Mobile-first responsive design with intuitive breakpoints
- Fluid layout system using `clamp()`
- Semantic theme system with CSS variables
- Zero runtime overhead
- Comprehensive flex utilities with responsive variants
- Extensive spacing utilities including margin auto
- Modern grid system with responsive columns

## Documentation

For detailed documentation of all available utilities and usage guidelines, visit our [GitHub repository](https://github.com/StefanV22/nube-system-1.0/blob/main/DOCUMENTATION.md)

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Author

Nube Agency
