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
import "nube-system/styles/setup.css";
import "nube-system/styles/system-styles.css";
```

## Usage in Astro Projects

When installed in an Astro project, Nube System automatically configures itself. Simply import the system CSS in your main layout:

```javascript
// e.g., in src/layouts/Layout.astro
import "../nube-system/styles/setup.css"; // Theme variables and default styles
import "../nube-system/styles/system-styles.css"; // Optimized utilities
```

### Automatic CSS Optimization in Astro

Nube System automatically optimizes your CSS during the build process in Astro projects:

- When you run `npm run build`, the framework automatically runs PurgeCSS
- Only the CSS classes you actually use in your project are included in the final build
- This significantly reduces your CSS file size and improves page load performance

You can also manually optimize your CSS:

- `npm run purge-css` - Removes unused classes and minifies CSS
- `npm run copy-css` - Copies all utility classes (use during development)

## Key Features

- Utility-first approach with semantic class names
- Mobile-first responsive design with intuitive breakpoints
- Fluid layout system using `clamp()`
- Semantic theme system with CSS variables
- Zero runtime overhead
- Comprehensive flex utilities with responsive variants
- Extensive spacing utilities including margin auto
- Modern grid system with responsive columns
- **Automatic CSS optimization with PurgeCSS integration**

## Documentation

For detailed documentation of all available utilities and usage guidelines, visit our [GitHub repository](https://github.com/StefanV22/nube-system-1.0/blob/main/DOCUMENTATION.md)

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Author

Nube Agency
