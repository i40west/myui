# ToggleButtonGroup

A group of toggle buttons for multi-select interactions.

## Props

```typescript
interface ToggleButtonGroupProps extends AriaToggleButtonGroupProps {
  scale?: number;
  className?: string;
}

interface ToggleButtonProps extends AriaToggleButtonProps {
  className?: string;
  scale?: number;
}
```

## Usage

```tsx
import { ToggleButtonGroup, ToggleButton } from 'myui';

<ToggleButtonGroup
  selectionMode="multiple"
  onSelectionChange={(keys) => console.log(keys)}
>
  <ToggleButton id="bold">Bold</ToggleButton>
  <ToggleButton id="italic">Italic</ToggleButton>
  <ToggleButton id="underline">Underline</ToggleButton>
</ToggleButtonGroup>

// Single selection mode
<ToggleButtonGroup
  selectionMode="single"
  selectedKeys={['left']}
>
  <ToggleButton id="left">Left</ToggleButton>
  <ToggleButton id="center">Center</ToggleButton>
  <ToggleButton id="right">Right</ToggleButton>
</ToggleButtonGroup>

// Scaled toggle button group
<ToggleButtonGroup
  scale={1.2}
  selectionMode="multiple"
>
  <ToggleButton id="bold">Bold</ToggleButton>
  <ToggleButton id="italic">Italic</ToggleButton>
  <ToggleButton id="underline">Underline</ToggleButton>
</ToggleButtonGroup>
```

## Features

- **Multiple Selection Modes**: Supports single and multiple selection
- **Includes Example**: Contains a built-in `ToggleButtonGroupExample` component

## Inherited Props

Inherits all props from react-aria-components `ToggleButtonGroup` and `ToggleButton` including:
- `selectionMode?: 'single' | 'multiple'`
- `selectedKeys?: Iterable<Key>`
- `onSelectionChange?: (keys: Set<Key>) => void`
- `isDisabled?: boolean`
