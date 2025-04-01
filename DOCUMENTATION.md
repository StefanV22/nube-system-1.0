# Nube System Documentation

## Quick Start

The simplest way to use Nube System is to import the unified CSS file:

```javascript
// In your main.js, Layout.astro, or other entry point:
import "../styles/system.css"; // Development version
// OR
import "../styles/system.min.css"; // Production (minified) version
```

This single file contains all utility classes and variables, with variables defined at the top for proper cascading.

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Layout System](#layout-system)
3. [Typography](#typography)
4. [Grid System](#grid-system)
5. [Flex Utilities](#flex-utilities)
6. [Spacing Utilities](#spacing-utilities)
7. [Color Utilities](#color-utilities)
8. [Responsive Design](#responsive-design)

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
<div class="xs_grid-x2 md_grid-x4 gg5">
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

### Grid Gap Utilities

Control the spacing between grid items:

```html
<div class="xs_grid-x2 gg3">
  <!-- 2-column grid with size-3 gap -->
</div>
```

Available grid gap classes:

- `gg0` through `gg13`: Grid gap (both row and column gap) using layout size scale

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

**Flex Wrap**

- `xs_fw0`, `sm_fw0`, `md_fw0`, `lg_fw0`: No wrap
- `xs_fw1`, `sm_fw1`, `md_fw1`, `lg_fw1`: Wrap
- `xs_fw2`, `sm_fw2`, `md_fw2`, `lg_fw2`: Wrap reverse

**Align Content (md and lg only)**

- `md_fac0`, `lg_fac0`: Flex start

**Additional Flex Properties**

These utilities complement the flex directional classes:

```html
<div class="fb-4 order-2 fg-1 fs-0">
  <!-- Flex basis, order, grow and shrink properties -->
</div>
```

Available flex property classes:

- `fb-0` through `fb-8`: Flex basis using layout size scale
- `order-1` through `order-12`: Order property
- `fg-0`, `fg-1`: Flex grow (0 or 1)
- `fs-0`, `fs-1`: Flex shrink (0 or 1)
- `gap-0` through `gap-8`: Gap using layout size scale

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

### Gap Utilities

```html
<div class="gap5">Gap on both axes</div>
<div class="vg3">Vertical gap (row-gap)</div>
<div class="hg6">Horizontal gap (column-gap)</div>
```

Available gap classes:

- `gap0` through `gap13`: Gap on both axes
- `vg0` through `vg13`: Vertical gap (row-gap)
- `hg0` through `hg13`: Horizontal gap (column-gap)

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
