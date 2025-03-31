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

After installation, you'll find two files in the `node_modules/nube-system/styles` directory:

1. `variables.css` - Contains all CSS variables (colors, sizes, typography)
2. `global-classes.css` - Contains all utility classes

Import them in your project:

```css
/* In your global CSS file */
@import "nube-system/styles/variables.css";
@import "nube-system/styles/global-classes.css";
```

For Astro projects, add to your `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "nube-system/styles/variables.css";
            @import "nube-system/styles/global-classes.css";
          `,
        },
      },
    },
  },
});
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
