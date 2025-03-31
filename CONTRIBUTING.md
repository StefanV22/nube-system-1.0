# Contributing to Nube System

Thank you for your interest in contributing to Nube System! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [Coding Standards](#coding-standards)
5. [Submitting Changes](#submitting-changes)
6. [Release Process](#release-process)

## Code of Conduct

This project adheres to the Contributor Covenant code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/nube-system.git
   cd nube-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## Development Process

### Project Structure

```
nube-system/
├── src/
│   ├── core/
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── utilities/
│   │   ├── _flex.scss
│   │   ├── _spacing.scss
│   │   ├── _theme.scss
│   │   └── _typography.scss
│   └── nube-system.scss
├── dist/
│   └── nube-system.css
└── package.json
```

### Building the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Coding Standards

### SCSS Guidelines

1. Use the BEM naming convention for components
2. Follow the existing prefix system for utilities
3. Maintain responsive design patterns
4. Use semantic naming for variables and mixins
5. Document all mixins and functions
6. Keep selectors flat and specific
7. Avoid nesting beyond 3 levels

### Utility Creation Guidelines

1. Follow the established naming pattern
2. Include responsive variants where appropriate
3. Use CSS variables for customization
4. Document usage examples
5. Consider browser support

### Example of a Good Utility

```scss
// Good
@mixin generate-utility($property, $class, $values) {
  @each $name, $value in $values {
    .#{$class}-#{$name} {
      #{$property}: var(--#{$value});
    }
  }
}

// Usage
@include generate-utility("margin", "m", $layout-sizes);
```

## Submitting Changes

1. Update documentation for any new features
2. Add tests for new functionality
3. Ensure all tests pass
4. Update the changelog
5. Submit a pull request

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Update documentation
4. Run tests
5. Push to your fork
6. Submit a pull request

### Pull Request Template

```markdown
## Description

Brief description of the changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?

Describe the tests you ran

## Checklist

- [ ] My code follows the style guidelines
- [ ] I have updated the documentation
- [ ] I have added tests
- [ ] All tests pass
```

## Release Process

1. Version Bump

   - Update version in package.json
   - Update CHANGELOG.md
   - Create a release commit

2. Testing

   - Run all tests
   - Build the distribution files
   - Test in a sample project

3. Publishing
   - Create a GitHub release
   - Publish to npm
   - Update documentation

## Additional Resources

- [SCSS Documentation](https://sass-lang.com/documentation)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Semantic Versioning](https://semver.org/)

## Questions or Problems?

Feel free to:

- Open an issue
- Join our discussions
- Contact the maintainers

## License

By contributing to Nube System, you agree that your contributions will be licensed under its MIT License.
