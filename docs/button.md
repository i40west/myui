# Button

A flexible button component with tooltip support and scaling.

## Props

```typescript
interface ButtonProps extends AriaButtonProps {
  tooltip?: string;
  className?: string;
  scale?: number;
  square?: boolean;
}

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement<typeof Button> | ReactElement<typeof Button>[];
  scale?: number;
  square?: boolean;
}
```

## Usage

```tsx
import { Button, ButtonGroup } from 'myui';

// Basic button
<Button onPress={() => alert('clicked')}>
  Click me
</Button>

// Button with tooltip
<Button tooltip="This performs an action" onPress={() => {}}>
  Action
</Button>

// Scaled button
<Button scale={1.5} onPress={() => {}}>
  Large Button
</Button>

// Button group with shared scaling
<ButtonGroup scale={0.8}>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>
```

## Inherited Props

Inherits all props from react-aria-components `Button` including:
- `onPress?: (e: PressEvent) => void`
- `isDisabled?: boolean`
- `autoFocus?: boolean`
- `type?: 'button' | 'submit' | 'reset'`
