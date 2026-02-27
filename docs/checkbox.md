# Checkbox

A checkbox component with optional label and custom sizing.

## Props

```typescript
interface CheckboxProps extends AriaCheckboxProps {
  label?: string;
  className?: string;
  size?: string;
  scale?: number;
}
```

## Usage

```tsx
import { Checkbox } from 'myui';

// Basic checkbox
<Checkbox
  isSelected={checked}
  onChange={setChecked}
  label="Accept terms"
/>

// Custom sized checkbox
<Checkbox
  size="2rem"
  label="Large checkbox"
/>

// Scaled checkbox
<Checkbox
  scale={1.5}
  label="Scaled checkbox"
/>
```

## Features

- **Indeterminate State**: Supports indeterminate state with different visual indicator
- **Custom SVG Icons**: Uses inline SVG for check and indeterminate states
- **Flexible Sizing**: Both `size` and `scale` props for different sizing approaches

## Inherited Props

Inherits all props from react-aria-components `Checkbox` including:
- `isSelected?: boolean`
- `onChange?: (isSelected: boolean) => void`
- `isIndeterminate?: boolean`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
