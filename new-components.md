# Creating New React Aria Component Wrappers

This guide provides detailed patterns and best practices for creating new component wrappers around React Aria Components in this UI library. Follow these patterns to maintain consistency across the codebase.

## Core Patterns

### 1. Directory Structure

Each component follows a consistent directory structure:

```
ComponentName/
├── ComponentName.tsx       # Main component implementation
├── ComponentName.module.css # CSS modules for styling
├── ComponentName.stories.tsx # Storybook stories
└── index.ts               # Re-exports for cleaner imports
```

### 2. Import Pattern

Always import React Aria components with an `Aria` prefix to distinguish them from your wrapped components:

```typescript
import { 
  Button as AriaButton,
  ButtonContext,
  useContextProps 
} from 'react-aria-components';

import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
```

### 3. TypeScript Interface Pattern

Extend the React Aria component's props interface and add custom props:

```typescript
interface ComponentNameProps extends AriaComponentNameProps {
  // Common custom props
  scale?: number;          // For scaling UI elements
  width?: string;          // For setting width
  className?: string;      // For additional styling
  
  // Component-specific props
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  
  // Variant props
  rounded?: boolean;
  square?: boolean;
  
  // Feature flags
  clearButton?: boolean;
  submitButton?: boolean;
}
```

### 4. Component Implementation Patterns

#### Basic Pattern (No Ref)

```typescript
export function ComponentName({
  label,
  description,
  className,
  scale,
  ...rest
}: ComponentNameProps) {
  // Class name composition
  let clnames = className ? `${classes.container} ${className}` : classes.container;
  
  // Dynamic styles
  const style: React.CSSProperties = {};
  if (scale) style['--x'] = scale.toString();
  if (width) style['--w'] = width;
  
  return (
    <AriaComponentName
      className={clnames}
      {...rest}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {/* Component content */}
    </AriaComponentName>
  );
}
```

#### ForwardRef Pattern

```typescript
export const ComponentName = forwardRef(function ComponentName(
  props: ComponentNameProps, 
  ref: ForwardedRef<HTMLElementType>
) {
  // Merge context props if component supports context
  [props, ref] = useContextProps(props, ref, ComponentContext);
  
  const { customProp, className, scale, ...rest } = props;
  
  // Rest of implementation...
});
```

#### Generic Component Pattern

```typescript
export function ComponentName<T extends object>({
  children,
  ...props
}: ComponentNameProps<T>) {
  // Implementation for components that work with data
}
```

### 5. CSS Custom Properties Pattern

Use CSS custom properties for dynamic styling:

```typescript
const style: React.CSSProperties = {};
if (scale) style['--x'] = scale.toString();
if (width) style['--w'] = width;
if (height) style['--h'] = height;

// Only apply style if properties exist
style={Object.keys(style).length > 0 ? style : undefined}
```

**Important: Use Design System Variables**

This library uses pre-defined CSS custom properties for consistent sizing across components. These variables are defined in `.storybook/styles/variables.css` and provide viewport-responsive sizing.

**Space Variables (for margins, padding, gaps):**
- `--space-3xs`: ~0.25rem (smallest spacing)
- `--space-2xs`: ~0.5rem
- `--space-xs`: ~0.75rem
- `--space-s`: ~1rem
- `--space-m`: ~1.5rem
- `--space-l`: ~2rem
- `--space-xl`: ~3rem
- `--space-2xl`: ~4rem
- `--space-3xl`: ~6rem

**Font Size Variables:**
- `--step--2`: Smallest text size
- `--step--1`: Small text (labels, descriptions)
- `--step-0`: Base text size
- `--step-1` through `--step-9`: Larger text sizes

**Usage in CSS modules:**
```css
.container {
  --x: 1; /* Default scale */
  gap: calc(var(--space-3xs) * var(--x));
  font-size: calc(var(--step--1) * var(--x));
  padding: calc(var(--space-2xs) * var(--x));
}

.label {
  font-size: calc(var(--step--1) * var(--x));
  margin-bottom: calc(var(--space-3xs) * var(--x));
}

.track {
  height: calc(var(--space-l) * var(--x));
  border-radius: calc(var(--space-3xs) * var(--x));
}
```

These variables automatically scale based on viewport size, providing responsive design without media queries.

### 6. Class Name Patterns

Build class names conditionally:

```typescript
// Basic pattern
let clnames = className ? `${classes.container} ${className}` : classes.container;

// Adding variants
if (rounded) clnames += ` ${classes.rounded}`;
if (square) clnames += ` ${classes.square}`;

// Using render props for state-based classes
className={({ isFocused, isSelected }) =>
  `${classes.item} ${isFocused ? classes.focused : ''} ${isSelected ? classes.selected : ''}`
}
```

### 7. Compound Component Pattern

Export related components together:

```typescript
// Main component
export function ComponentName({ ... }) { ... }

// Sub-component
export function ComponentNameItem({ children, ...props }: ItemProps) {
  return (
    <AriaItem
      {...props}
      className={classes.item}
    >
      {children}
    </AriaItem>
  );
}

// Utility component
export function ComponentNameItemList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, index) => (
        <ComponentNameItem key={index}>{item}</ComponentNameItem>
      ))}
    </>
  );
}
```

### 8. Context Usage Pattern

Access component state via context:

```typescript
function ComponentClearButton() {
  const state = useContext(ComponentStateContext);
  return (
    <Button
      slot={null} // Important: prevents inheriting default slot behavior
      aria-label="Clear"
      onPress={() => state?.setValue(null)}
    >
      <IconX />
    </Button>
  );
}
```

### 9. Conditional Wrapper Pattern

For optional features like tooltips:

```typescript
return (
  <>
    {tooltip ? (
      <TooltipTrigger content={tooltip}>
        <AriaComponent {...props}>{children}</AriaComponent>
      </TooltipTrigger>
    ) : (
      <AriaComponent {...props}>{children}</AriaComponent>
    )}
  </>
);
```

### 10. Sub-Component Composition Pattern

Use React Aria's sub-components for complex layouts:

```typescript
<AriaTextField {...rest}>
  <Label className={classes.label}>{label}</Label>
  {description && <Text slot="description">{description}</Text>}
  <div className={classes.inputbox}>
    <Input className={classes.input} placeholder={placeholder} />
    {submitButton && <Button slot={null}>Submit</Button>}
  </div>
  <FieldError className={classes.error}>{errorMessage}</FieldError>
</AriaTextField>
```

### 11. Icon Components Pattern

Include inline SVG icons at the bottom of the file:

```typescript
function IconName({ width, height = '1em', ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...width && { width }} 
      height={height} 
      viewBox="0 0 24 24" 
      preserveAspectRatio="xMidYMax meet" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...rest}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      {/* Icon paths */}
    </svg>
  );
}
```

### 12. Export Pattern

In the component file:
```typescript
export default ComponentName;
```

In index.ts:
```typescript
export { ComponentName, ComponentNameItem } from './ComponentName';
```

### 13. Storybook Pattern

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    scale: {
      control: { type: 'range', min: 0.5, max: 5.0, step: 0.1 },
    },
  },
  args: {
    scale: 1.0,
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default args
  },
};

export const Variant: Story = {
  args: {
    // Variant-specific args
  },
};
```

## Available React Aria Components to Wrap

Based on the React Aria documentation, here are components that haven't been wrapped yet in this library:

### Forms & Inputs
- SearchField
- NumberField
- Slider
- RangeSlider
- CheckboxGroup
- Select

### Date & Time
- DatePicker
- DateRangePicker
- TimeField

### Navigation
- Breadcrumbs
- Link
- Menu
- ContextualMenu

### Layout
- Disclosure / DisclosureGroup
- Separator
- Grid / GridList

### Overlays
- Dialog
- AlertDialog
- Modal

### Status
- Meter
- ProgressBar
- StatusLight

### Content
- Heading
- Text

### Collections
- ListBox
- Table
- Tree

### Other
- Tag / TagGroup
- ToggleButton (individual, not group)
- Toolbar
- ColorSwatch / ColorSwatchPicker

## Implementation Checklist

When creating a new component wrapper:

1. ✅ Create the directory structure
2. ✅ Import React Aria component with `Aria` prefix
3. ✅ Extend the React Aria props interface
4. ✅ Add common props (scale, className, width)
5. ✅ Implement CSS custom properties
6. ✅ Create CSS module with scaling support
7. ✅ Handle class name composition
8. ✅ Use appropriate pattern (basic, forwardRef, or generic)
9. ✅ Add proper TypeScript types
10. ✅ Export from index.ts
11. ✅ Create Storybook stories
12. ✅ Test scaling behavior
13. ✅ Test keyboard navigation
14. ✅ Verify accessibility

## CSS Module Template

```css
.container {
	--x: 1;
	--w: auto;
	
	display: flex;
	flex-direction: column;
	gap: calc(var(--space-3xs) * var(--x));
	width: var(--w);
}

.label {
	font-size: calc(var(--step--1) * var(--x));
	font-weight: 500;
	margin-bottom: calc(var(--space-3xs) * var(--x));
}

.input {
	font-size: calc(var(--step-0) * var(--x));
	padding: calc(var(--space-2xs) * var(--x));
	border-radius: calc(var(--space-3xs) * var(--x) * 1.5);
}

/* State styles using data attributes */
[data-hovered] {
	background-color: var(--hover-bg);
}

[data-pressed] {
	background-color: var(--pressed-bg);
}

[data-selected] {
	background-color: var(--selected-bg);
}

[data-disabled] {
	opacity: 0.5;
	cursor: not-allowed;
}
```

## Tips

1. **Always check React Aria docs**: Use the context7 MCP tool to check React Aria documentation for the specific component you're wrapping
2. **Preserve accessibility**: Don't override ARIA attributes unless absolutely necessary
3. **Test scaling**: Ensure all visual elements scale properly with the `scale` prop
4. **Use semantic slots**: Understand React Aria's slot system for proper component composition
5. **Handle edge cases**: Test with empty states, loading states, and error states
6. **Keep it simple**: Start with basic wrapping and add features incrementally
7. **Follow conventions**: Match the patterns of existing components in the library
8. **Use design system variables**: Always use the CSS custom properties (`--space-*` and `--step-*`) from `.storybook/styles/variables.css` instead of hardcoding rem values. This ensures consistent, viewport-responsive sizing across all components