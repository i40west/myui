# Switch

A toggle switch component for binary on/off states.

## Props

```typescript
interface SwitchProps extends AriaSwitchProps {
  label?: string;
  className?: string;
  size?: string;
  scale?: number;
}
```

## Usage

```tsx
import { Switch } from 'myui';

// Basic switch
<Switch
  isSelected={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>

// Custom sized switch
<Switch
  size="2rem"
  label="Large switch"
/>

// Scaled switch
<Switch
  scale={1.5}
  label="Scaled switch"
/>

// Controlled switch
<Switch
  isSelected={darkMode}
  onChange={(selected) => setDarkMode(selected)}
  label="Dark mode"
/>
```

## Features

- **Visual Indicator**: Animated toggle indicator that slides between positions
- **Flexible Sizing**: Both `size` and `scale` props for different sizing approaches
- **Optional Label**: Display label text alongside the switch
- **Smooth Animation**: CSS transitions for indicator movement

## Inherited Props

Inherits all props from react-aria-components `Switch` including:
- `isSelected?: boolean`
- `onChange?: (isSelected: boolean) => void`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
- `autoFocus?: boolean`
