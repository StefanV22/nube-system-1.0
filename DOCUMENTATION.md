# Nube System Documentation

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Core Concepts](#core-concepts)
4. [Available Utilities](#available-utilities)
   - [Colors](#colors)
   - [Layout](#layout)
   - [Spacing](#spacing)
   - [Flexbox](#flexbox)
   - [Element](#element)
   - [Typography](#typography)
5. [Breakpoints](#breakpoints)
6. [CSS Purging System](#css-purging-system)
7. [Customizing Variables](#customizing-variables)

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

1. Download the latest release from our [GitHub repository](https://github.com/StefanV22/nube-system-1.0/releases)
2. Extract the files to your project
3. Copy the `styles` folder to your project's assets directory

When you install Nube System in an Astro project, it automatically:

1. Creates a `nube-system` folder in your project's `src` directory
2. Sets up the necessary scripts and styles
3. Adds npm scripts to your `package.json` for CSS management

The automatic setup creates this structure:

```
src/
└── nube-system/
    ├── scripts/
    │   ├── copy-css.js
    │   └── purge-css.js
    ├── styles/
    │   ├── variables.css (theme variables)
    │   ├── system.css (all utility classes)
    │   └── system-styles.css (optimized version for your project)
    └── system.doc.md (documentation)
```

## Quick Start

After installing Nube System, import both the variables.css and system-styles.css files in your main layout:

```javascript
// In your main.js, Layout.astro, or other entry point:
import "../nube-system/styles/variables.css"; // Theme variables
import "../nube-system/styles/system-styles.css"; // Utility classes
```

The separation of variables and utility classes offers several benefits:

- Variables can be easily customized without affecting utility classes
- Only the utility classes get purged and minified, not the variables
- You can modify variables for each project while keeping the same utility set

### Optimizing Your CSS

Nube System automatically provides two npm scripts:

```bash
# Copy all utility classes to system-styles.css
npm run copy-css

# Remove unused classes and minify system-styles.css
npm run purge-css
```

The recommended workflow:

1. Use `npm run copy-css` when starting a new component to have all classes available
2. Run `npm run purge-css` before deploying to optimize file size
3. Customize `variables.css` to match your project's theme as needed

## Core Concepts

### Layout Size System

The framework uses a numeric scale from 0 to 13 for all layout-related utilities:

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
}
```

These sizes are used consistently across spacing utilities (margin, padding, gap) and are inherently responsive using `clamp()`.

### Responsive Breakpoints

The system uses a mobile-first approach with these breakpoints for responsive utilities:

- `xs`: Default (no minimum width)
- `sm`: 480px and up
- `md`: 768px and up
- `lg`: 992px and up

To use responsive variants, prefix the class with the breakpoint and an underscore:

```html
<div class="xs_grid-x2 md_grid-x4">
  <!-- 2 columns by default, 4 columns on 768px screens and up -->
</div>
```

## Layout System

### Container

Use the container class to center content with a maximum width:

```html
<div class="cnt">
  <!-- Centered content with max-width -->
</div>
```

The container adapts to screen size with:

- Max width: `--layout--grid--width` (90rem)
- Side margins: `--layout--grid--margin` (variable based on screen size)

### Rows and Columns (Flexbox Grid)

The framework includes a 12-column flexbox grid system:

```html
<div class="cnt">
  <div class="rw">
    <div class="clm xs_6 md_4">
      Half width by default, 1/3 on medium screens
    </div>
    <div class="clm xs_6 md_4">
      Half width by default, 1/3 on medium screens
    </div>
    <div class="clm xs_12 md_4">
      Full width by default, 1/3 on medium screens
    </div>
  </div>
</div>
```

- `rw`: Creates a flex row with negative margins to compensate for column padding
- `clm`: Base column class
- `xs_1` through `xs_12`: Column widths (12-column grid)
- `sm_1` through `sm_12`: Column widths at sm breakpoint (480px+)
- `md_1` through `md_12`: Column widths at md breakpoint (768px+)
- `lg_1` through `lg_12`: Column widths at lg breakpoint (992px+)

Column ordering is also available:

- `xs_o1` through `xs_o4`: Column ordering by default
- `sm_o1` through `sm_o4`: Column ordering at sm breakpoint (480px+)
- `md_o1` through `md_o4`: Column ordering at md breakpoint (768px+)
- `lg_o1` through `lg_o4`: Column ordering at lg breakpoint (992px+)

## Typography

### Font Size and Line Height

Font size classes automatically include appropriate line height:

```html
<p class="f0">Small text (0.875rem)</p>
<p class="f1">Regular text (1rem)</p>
<p class="f2">Slightly larger text</p>
<p class="f8">Very large heading (3.25rem+)</p>
```

Available font size classes:

- `f0` through `f8`: Font sizes from smallest to largest

Each font size class sets both:

- `font-size`: from `--font--size--0` through `--font--size--8`
- `line-height`: from `--line--height--0` through `--line--height--8`

### Font Family

```html
<p class="ff0">Primary font (system UI)</p>
<code class="ff1">Monospace font</code>
```

Available font family classes:

- `ff0`: Primary font (system UI)
- `ff1`: Monospace font

### Font Weight

```html
<p class="fw0">Light weight (300)</p>
<p class="fw1">Regular weight (400)</p>
<p class="fw2">Medium weight (500)</p>
<p class="fw5">Heavy weight (800)</p>
```

Available font weight classes:

- `fw0` through `fw5`: Font weights from lightest to heaviest

### Text Utilities

```html
<p class="td-underline">Underlined text</p>
<p class="tt-uppercase">UPPERCASE TEXT</p>
<p class="xs_ta0 md_ta1">Left aligned by default, centered on 768px+</p>
```

Available text utilities:

- Text decoration: `td-underline`, `td-none`
- Text transform: `tt-uppercase`, `tt-lowercase`, `tt-capitalize`
- Text alignment: `xs_ta0` (left), `xs_ta1` (center), `xs_ta2` (right)

## Grid System

### CSS Grid Columns

Create multi-column grid layouts with responsive variants:

```html
<div class="xs_grid-x2 md_grid-x4 fg5">
  <!-- 2 columns by default, 4 columns on 768px+ screens, with size-5 gap -->
  <div>Grid item 1</div>
  <div>Grid item 2</div>
  <div>Grid item 3</div>
  <div>Grid item 4</div>
</div>
```

Available grid column classes:

- `xs_grid-x2` through `xs_grid-x6`: 2-6 equal columns by default
- `sm_grid-x2` through `sm_grid-x6`: 2-6 equal columns (480px+)
- `md_grid-x2` through `md_grid-x6`: 2-6 equal columns (768px+)
- `lg_grid-x2` through `lg_grid-x6`: 2-6 equal columns (992px+)

### Gap Utilities

Control the spacing between grid or flex items:

```html
<div class="xs_grid-x2 fg3">
  <!-- Grid with size-3 gap -->
</div>

<div class="xs_fd1 fg5">
  <!-- Flex container with size-5 gap -->
</div>
```

Available gap classes:

- `fg0` through `fg13`: Gap using layout size scale (works with both grid and flex)

## Flex Utilities

The system uses a mobile-first, responsive approach for flexible layouts:

```html
<div class="xs_fd1 xs_fj3 xs_fa1 md_fd0 md_fj1">
  <!-- Row with space-between and centered items by default,
       Column with centered content on md+ screens -->
</div>
```

Available flex classes:

**Flex Direction**

- `xs_fd0`, `sm_fd0`, `md_fd0`, `lg_fd0`: Column
- `xs_fd1`, `sm_fd1`, `md_fd1`, `lg_fd1`: Row
- `xs_fd2`, `sm_fd2`, `md_fd2`, `lg_fd2`: Column reverse
- `xs_fd3`, `sm_fd3`, `md_fd3`, `lg_fd3`: Row reverse

**Justify Content**

- `xs_fj0`, `sm_fj0`, `md_fj0`, `lg_fj0`: Start
- `xs_fj1`, `sm_fj1`, `md_fj1`, `lg_fj1`: Center
- `xs_fj2`, `sm_fj2`, `md_fj2`, `lg_fj2`: End
- `xs_fj3`, `sm_fj3`, `md_fj3`, `lg_fj3`: Space between
- `xs_fj4`, `sm_fj4`, `md_fj4`, `lg_fj4`: Space around

**Align Items**

- `xs_fa0`, `sm_fa0`, `md_fa0`, `lg_fa0`: Start
- `xs_fa1`, `sm_fa1`, `md_fa1`, `lg_fa1`: Center
- `xs_fa2`, `sm_fa2`, `md_fa2`, `lg_fa2`: End
- `xs_fa3`, `sm_fa3`, `md_fa3`, `lg_fa3`: Stretch
- `xs_fa4`, `sm_fa4`, `md_fa4`, `lg_fa4`: Baseline

**Flex Gap**

```html
<div class="xs_fd1 fg5">
  <!-- Row with size-5 gap between items -->
</div>
```

Available classes:

- `fg0` through `fg13` - Gap between items using layout size scale (works with both grid and flex layouts)

**Flex Wrap**

- `xs_fw0`, `sm_fw0`, `md_fw0`, `lg_fw0`: No wrap
- `xs_fw1`, `sm_fw1`, `md_fw1`, `lg_fw1`: Wrap
- `xs_fw2`, `sm_fw2`, `md_fw2`, `lg_fw2`: Wrap reverse

**Align Content (md and lg only)**

- `md_fac0`, `lg_fac0`: Flex start

**Additional Flex Properties**

These utilities complement the flex directional classes:

```html
<div class="order-2">
  <!-- Order property -->
</div>
```

Available flex property classes:

- `order-1` through `order-12`: Order property

## Spacing Utilities

### Margins

```html
<div class="m5">Margin on all sides</div>
<div class="mt6">Margin top</div>
<div class="ml3 mr3">Margin left and right</div>
<div class="m-auto">Horizontally centered</div>
```

Available margin classes:

- `m0` through `m13`: Margin on all sides
- `mt0` through `mt13`: Margin top
- `mr0` through `mr13`: Margin right
- `mb0` through `mb13`: Margin bottom
- `ml0` through `ml13`: Margin left
- `mh0` through `mh13`: Horizontal margins (left & right)
- `mv0` through `mv13`: Vertical margins (top & bottom)
- `m-auto`: Auto margins on left and right (horizontal centering)
- `ml-auto`: Auto margin on left
- `mr-auto`: Auto margin on right

### Padding

```html
<div class="p5">Padding on all sides</div>
<div class="pt6">Padding top</div>
<div class="pl3 pr3">Padding left and right</div>
```

Available padding classes:

- `p0` through `p13`: Padding on all sides
- `pt0` through `pt13`: Padding top
- `pr0` through `pr13`: Padding right
- `pb0` through `pb13`: Padding bottom
- `pl0` through `pl13`: Padding left
- `ph0` through `ph13`: Horizontal padding (left & right)
- `pv0` through `pv13`: Vertical padding (top & bottom)

## Color Utilities

### Background Colors

```html
<div class="surface-primary">Primary surface</div>
<div class="spot-accent">Accent spot color</div>
```

Available background color classes:

- Surface colors: `surface-primary`, `surface-secondary`, `surface-tertiary`
- Spot colors: `spot-primary`, `spot-secondary`, `spot-accent`, `spot-accent-hover`, `spot-scarcity`, `spot-scarcity-hover`

### Text Colors

```html
<p class="ink-title">Title text</p>
<p class="ink-body">Body text</p>
<p class="ink-dimmed">Dimmed text</p>
<p class="spot-ink-primary">Text on primary spot color</p>
```

Available text color classes:

- Ink colors: `ink-title`, `ink-body`, `ink-strong`, `ink-dimmed`, `ink-faded`, `ink-accent`
- Spot-ink colors: `spot-ink-primary`, `spot-ink-secondary`, `spot-ink-accent`, `spot-ink-accent-hover`, `spot-ink-scarcity`, `spot-ink-scarcity-hover`

### Border Colors

```html
<div class="stroke-primary">Border with primary stroke color</div>
```

Available border color classes:

- Stroke colors: `stroke-primary`, `stroke-secondary`, `stroke-tertiary`

## Element Utilities

### Display (Responsive)

```html
<div class="xs_ed0">Hidden by default</div>
<div class="xs_ed1">Block display</div>
<div class="xs_ed2">Flex display</div>
<div class="xs_ed3">Inline display</div>
<div class="xs_ed4">Inline flex display</div>
```

Available display classes (responsive):

- `xs_ed0` through `xs_ed4`: Default display properties
- `sm_ed0` through `sm_ed4`: Display at sm breakpoint (480px+)
- `md_ed0` through `md_ed4`: Display at md breakpoint (768px+)
- `lg_ed0` through `lg_ed4`: Display at lg breakpoint (992px+)

### Position (Responsive)

```html
<div class="xs_ep0">Static positioning</div>
<div class="xs_ep1">Relative positioning</div>
<div class="xs_ep2">Absolute positioning</div>
<div class="xs_ep3">Fixed positioning</div>
<div class="xs_ep4">Sticky positioning</div>
```

Available position classes (responsive):

- `xs_ep0` through `xs_ep4`: Default position properties
- `sm_ep0` through `sm_ep4`: Position at sm breakpoint (480px+)
- `md_ep0` through `md_ep4`: Position at md breakpoint (768px+)
- `lg_ep0` through `lg_ep4`: Position at lg breakpoint (992px+)

### Border Width

```html
<div class="bw0">No border</div>
<div class="bw1">Thin border</div>
<div class="bw2">Medium border</div>
<div class="bw8">Thick border</div>
```

Available border width classes:

- `bw0` through `bw8`: Border width using layout size scale

### Border Radius (Responsive)

```html
<div class="xs_br0">No border radius</div>
<div class="xs_br1">Small border radius</div>
<div class="xs_br2">Medium border radius</div>
<div class="xs_br8">Large border radius</div>
```

Available border radius classes (responsive):

- `xs_br0` through `xs_br8`: Default border radius
- `sm_br0` through `sm_br8`: Border radius at sm breakpoint (480px+)
- `md_br0` through `md_br8`: Border radius at md breakpoint (768px+)
- `lg_br0` through `lg_br8`: Border radius at lg breakpoint (992px+)

## Responsive Design

All major utility classes can be prefixed with a breakpoint to apply them at specific screen sizes:

```html
<div class="xs_grid-x2 md_grid-x4 lg_grid-x6">
  <!-- 2 cols by default, 4 cols on 768px+, 6 cols on 992px+ -->
</div>

<div class="xs_fd0 md_fd1 xs_fa1 md_fa0">
  <!-- Column by default, row on 768px+, center-aligned by default, start-aligned on 768px+ -->
</div>

<p class="xs_ta0 md_ta1">
  <!-- Left aligned by default, centered on 768px+ -->
</p>
```

For specific breakpoint values, see the [Responsive Breakpoints](#responsive-breakpoints) section.

## Available Utilities

### Colors

#### Background Colors

```html
<div class="surface-primary">Primary surface</div>
<div class="spot-accent">Accent spot color</div>
```

Available classes:

- `surface-primary` - Primary surface color
- `surface-secondary` - Secondary surface color
- `surface-tertiary` - Tertiary surface color
- `spot-primary` - Primary spot color
- `spot-secondary` - Secondary spot color
- `spot-accent` - Accent spot color
- `spot-accent-hover` - Accent hover state
- `spot-scarcity` - Scarcity spot color
- `spot-scarcity-hover` - Scarcity hover state

#### Text Colors

```html
<p class="ink-title">Title text</p>
<p class="ink-body">Body text</p>
<p class="ink-dimmed">Dimmed text</p>
<p class="spot-ink-primary">Text on primary spot color</p>
```

Available classes:

- `ink-title` - Title text color
- `ink-body` - Body text color
- `ink-strong` - Strong text color
- `ink-dimmed` - Dimmed text color
- `ink-faded` - Faded text color
- `ink-accent` - Accent text color
- `spot-ink-primary` - Primary spot text color
- `spot-ink-secondary` - Secondary spot text color
- `spot-ink-accent` - Accent spot text color
- `spot-ink-accent-hover` - Accent hover text color
- `spot-ink-scarcity` - Scarcity spot text color
- `spot-ink-scarcity-hover` - Scarcity hover text color

#### Border Colors

```html
<div class="stroke-primary">Border with primary stroke color</div>
```

Available classes:

- `stroke-primary` - Primary border color
- `stroke-secondary` - Secondary border color
- `stroke-tertiary` - Tertiary border color

### Layout

#### Max Width

```html
<div class="mw_6">Half width container</div>
<div class="mw_12">Full width container</div>
<div class="mw_13">Extended width container</div>
```

Available classes:

- `mw_1` through `mw_12` - Max width utilities (1/12 to 12/12 of grid width)
- `mw_13` - Extended max width for larger containers

#### Grid

```html
<div class="clm clm_6">Half width column</div>
<div class="clm clm_12">Full width column</div>
<div class="clm clm_13">Extended width column</div>
```

Available classes:

- `clm` - Base column class
- `clm_1` through `clm_12` - Column width utilities (1/12 to 12/12)
- `clm_13` - Extended column width

### Spacing

#### Margin

```html
<div class="m5">Margin on all sides</div>
<div class="mt6">Margin top</div>
<div class="ml3 mr3">Margin left and right</div>
<div class="m-auto">Horizontally centered</div>
```

Available classes:

- `m0` through `m13` - All sides margin
- `mt0` through `mt13` - Top margin
- `mr0` through `mr13` - Right margin
- `mb0` through `mb13` - Bottom margin
- `ml0` through `ml13` - Left margin
- `mh0` through `mh13` - Horizontal margin (left and right)
- `mv0` through `mv13` - Vertical margin (top and bottom)
- `m-auto` - Auto margin
- `ml-auto` - Auto left margin
- `mr-auto` - Auto right margin

#### Padding

```html
<div class="p5">Padding on all sides</div>
<div class="pt6">Padding top</div>
<div class="pl3 pr3">Padding left and right</div>
```

Available classes:

- `p0` through `p13` - All sides padding
- `pt0` through `pt13` - Top padding
- `pr0` through `pr13` - Right padding
- `pb0` through `pb13` - Bottom padding
- `pl0` through `pl13` - Left padding
- `ph0` through `ph13` - Horizontal padding (left and right)
- `pv0` through `pv13` - Vertical padding (top and bottom)

### Flexbox

#### Order

```html
<div class="order-2">Second in order</div>
```

Available classes:

- `order-1` through `order-12` - Order property

#### Flex Direction (Responsive)

```html
<div class="xs_fd1 md_fd0">Row by default, column on md+</div>
```

Available classes:

- `xs_fd0` - Column (default)
- `xs_fd1` - Row
- `xs_fd2` - Column reverse
- `xs_fd3` - Row reverse
- Available for all breakpoints (sm, md, lg)

#### Flex Gap

```html
<div class="xs_fd1 fg5">
  <!-- Row with size-5 gap between items -->
</div>
```

Available classes:

- `fg0` through `fg13` - Gap between items using layout size scale (works with both grid and flex layouts)

#### Justify Content (Responsive)

```html
<div class="xs_fj1 md_fj3">Centered by default, space-between on md+</div>
```

Available classes:

- `xs_fj0` - Start
- `xs_fj1` - Center
- `xs_fj2` - End
- `xs_fj3` - Space between
- `xs_fj4` - Space around
- Available for all breakpoints (sm, md, lg)

#### Align Items (Responsive)

```html
<div class="xs_fa1 md_fa0">Centered by default, start-aligned on md+</div>
```

Available classes:

- `xs_fa0` - Start
- `xs_fa1` - Center
- `xs_fa2` - End
- `xs_fa3` - Stretch
- `xs_fa4` - Baseline
- Available for all breakpoints (sm, md, lg)

#### Flex Wrap (Responsive)

```html
<div class="xs_fw1">Wrapped flex container</div>
```

Available classes:

- `xs_fw0` - No wrap
- `xs_fw1` - Wrap
- `xs_fw2` - Wrap reverse
- Available for all breakpoints (sm, md, lg)

### Element

#### Display (Responsive)

```html
<div class="xs_ed1 md_ed2">Block by default, flex on md+</div>
```

Available classes:

- `xs_ed0` - None
- `xs_ed1` - Block display
- `xs_ed2` - Flex display
- `xs_ed3` - Inline display
- `xs_ed4` - Inline flex display
- Available for all breakpoints (sm, md, lg)

#### Position (Responsive)

```html
<div class="xs_ep1 md_ep2">Relative by default, absolute on md+</div>
```

Available classes:

- `xs_ep0` - Static positioning
- `xs_ep1` - Relative positioning
- `xs_ep2` - Absolute positioning
- `xs_ep3` - Fixed positioning
- `xs_ep4` - Sticky positioning
- Available for all breakpoints (sm, md, lg)

#### Border Width

```html
<div class="bw1">Thin border</div>
<div class="bw8">Thick border</div>
```

Available classes:

- `bw0` - No border
- `bw1` - Thin border
- `bw2` - Medium border
- `bw8` - Thick border

#### Border Radius (Responsive)

```html
<div class="xs_br1 md_br2">Small radius by default, medium on md+</div>
```

Available classes:

- `xs_br0` - No border radius
- `xs_br1` - Small border radius
- `xs_br2` - Medium border radius
- `xs_br8` - Large border radius
- Available for all breakpoints (sm, md, lg)

### Typography

#### Font Size and Line Height

```html
<p class="f0">Small text</p>
<p class="f1">Regular text</p>
<p class="f8">Large heading</p>
```

Available classes:

- `f0` through `f8` - Font sizes from smallest to largest

#### Font Family

```html
<p class="ff0">Primary font</p>
<code class="ff1">Monospace font</code>
```

Available classes:

- `ff0` - Primary font (system UI)
- `ff1` - Monospace font

#### Font Weight

```html
<p class="fw0">Light text</p>
<p class="fw1">Regular text</p>
<p class="fw5">Heavy text</p>
```

Available classes:

- `fw0` through `fw5` - Font weights from lightest to heaviest

#### Text Utilities

```html
<p class="td-underline tt-uppercase xs_ta1">
  Centered, underlined, uppercase text
</p>
```

Available classes:

- Text decoration: `td-underline`, `td-none`
- Text transform: `tt-uppercase`, `tt-lowercase`, `tt-capitalize`
- Text alignment: `xs_ta0` (left), `xs_ta1` (center), `xs_ta2` (right)

## Breakpoints

- `xs` - Default (mobile)
- `sm` - 576px and up
- `md` - 768px and up
- `lg` - 992px and up

## CSS Purging System

One of the challenges with utility-first CSS frameworks is that they can become quite large, as they need to provide many variations of styling options. To optimize your production build, Nube System includes an automatic CSS purging system that removes unused utility classes from your stylesheets.

### When to Use CSS Purging

When you install Nube System on a new project, you initially want access to all utility classes while developing. However, before deployment, you should purge unused classes to minimize file size and improve loading performance.

### Built-in CSS Purging

Nube System now comes with a built-in CSS purging system that:

1. Scans your project files for used utility classes
2. Keeps only the classes you're actually using
3. Minifies the result for even better performance
4. Keeps variables.css separate and untouched

To use it, simply run:

```bash
npm run purge-css
```

This will optimize your `system-styles.css` file while leaving your `variables.css` file intact.

If you need access to all utility classes again (for example, when starting a new component), you can run:

```bash
npm run copy-css
```

### Automatic Optimization in Astro Projects

When using Nube System with Astro, the CSS purging process is completely automated:

1. **During development**: Work with the full utility class set
2. **During builds**: When you run `npm run build` or `astro build`, the CSS is automatically purged
3. **How it works**: The framework uses Astro's integration API and lifecycle hooks to automatically run `purge-css` before building

This means you don't need to manually run the purge command before builds - it's taken care of automatically. The Astro build hook ensures your CSS is always optimized in production builds.

### Importing in Astro Projects

For Astro projects, you need to import the CSS files in your Layout component:

```astro
---
// src/layouts/Layout.astro
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Astro Site</title>
    <!-- Import Nube System CSS files -->
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  /* Import the variable definitions first */
  @import "../nube-system/styles/variables.css";

  /* Import the optimized utility classes */
  @import "../nube-system/styles/system-styles.css";
</style>
```

Alternatively, you can import them directly in the head section:

```astro
<head>
  <!-- Other head elements -->
  <link rel="stylesheet" href="/src/nube-system/styles/variables.css" />
  <link rel="stylesheet" href="/src/nube-system/styles/system-styles.css" />
</head>
```

If you want to manually optimize during development, you can still run:

```bash
npm run purge-css  # Manually optimize CSS
npm run copy-css   # Restore full CSS for development
```

### Development Workflow

1. **Initial setup**: When you install Nube System, it automatically sets up both the full system.css and an optimized system-styles.css
2. **Starting a new component**: Run `npm run copy-css` to make all utility classes available
3. **During development**: Work with the full utility class set
4. **Building for production**: Run `npm run build` - CSS is automatically optimized
5. **Manual optimization**: Run `npm run purge-css` when needed during development

### Benefits of CSS Purging

- **Reduced file size**: Often 70-90% smaller CSS files
- **Faster load times**: Less CSS for the browser to parse and render
- **Better performance**: Especially important for mobile devices
- **Improved maintainability**: No manual editing of CSS files required
- **Automatic minification**: Further reduces file size without losing functionality
- **Preserved variables**: Theme variables remain intact and can be customized per project
- **Zero-configuration**: Automatic optimization during Astro builds

## Customizing Variables

One of the key benefits of Nube System's architecture is the separation of variables from utility classes. This allows you to easily customize your theme without modifying the utility classes.

### How to Customize Variables

1. Open the `src/nube-system/styles/variables.css` file in your project
2. Modify the CSS variables in the `:root` section to match your project's design
3. No need to run any additional scripts after making changes

For example, to change the primary color:

```css
:root {
  /* Original value */
  /* --spot--primary: #3b82f6; */

  /* Your custom value */
  --spot--primary: #8b5cf6;
}
```

### Available Variables

The variables.css file includes:

- **Layout Sizes**: Spacing scales used throughout the system
- **Font Sizes**: Typography size scale
- **Theme Colors**: Surface, ink, spot, and stroke colors
- **Typography**: Font families, weights, and line heights
- **Borders**: Border widths and radius values
- **Layout**: Grid dimensions and spacing
