# Slider

A slider component for selecting values within a range, supporting both single and multi-thumb configurations.

## Props

```typescript
interface SliderProps<T extends number | number[]> extends AriaSliderProps<T> {
  label?: string;
  description?: string;
  className?: string;
  width?: string;
  scale?: number;
  thumbLabels?: string[];
  showOutput?: boolean;
  name?: string;
}
```

## Usage

```tsx
import { Slider } from 'myui';

// Basic slider
<Slider
  label="Volume"
  defaultValue={50}
  onChange={(value) => console.log(value)}
/>

// Range slider (multi-thumb)
<Slider
  label="Price Range"
  defaultValue={[25, 75]}
  thumbLabels={['min', 'max']}
  formatOptions={{ style: 'currency', currency: 'USD' }}
/>

// Step values
<Slider
  label="Temperature"
  defaultValue={20}
  minValue={0}
  maxValue={40}
  step={5}
  formatOptions={{ style: 'unit', unit: 'celsius' }}
/>

// Vertical orientation
<Slider
  label="EQ Band"
  orientation="vertical"
  defaultValue={0}
  minValue={-20}
  maxValue={20}
/>

// Without output display
<Slider
  label="Speed"
  defaultValue={30}
  showOutput={false}
/>

// Controlled slider
<Slider
  label="Brightness"
  value={brightness}
  onChange={setBrightness}
  description="Adjust screen brightness"
  scale={1.2}
/>

// Percentage format
<Slider
  label="Progress"
  defaultValue={0.65}
  minValue={0}
  maxValue={1}
  step={0.01}
  formatOptions={{ style: 'percent' }}
/>

// Custom width and scale
<Slider
  label="Custom Size"
  width="400px"
  scale={1.5}
  defaultValue={50}
/>

// Form integration
<form onSubmit={handleSubmit}>
  <Slider
    name="volume"
    label="Volume"
    defaultValue={75}
  />
  <button type="submit">Save Settings</button>
</form>
```

## Features

- **Single and Multi-thumb**: Supports both single value and range selection (multiple thumbs)
- **Orientation**: Horizontal (default) or vertical slider orientation
- **Value Formatting**: Uses `Intl.NumberFormat` options for display (currency, percentage, units, etc.)
- **Step Values**: Configurable step increments from minValue
- **Output Display**: Optional value output with automatic formatting
- **Thumb Labels**: Aria labels for individual thumbs in multi-thumb mode
- **Visual Feedback**: Different states for dragging, focus, and disabled
- **Keyboard Navigation**: Full keyboard support with arrow keys, Page Up/Down, Home/End
- **Touch Support**: Touch-friendly with proper touch-action handling
- **Form Integration**: Supports `name` prop for HTML form submission

## Inherited Props

Inherits all props from react-aria-components `Slider` including:
- `value?: T` - Current value (controlled)
- `defaultValue?: T` - Default value (uncontrolled)
- `onChange?: (value: T) => void` - Called during drag
- `onChangeEnd?: (value: T) => void` - Called when dragging stops
- `minValue?: number` - Minimum value (default: 0)
- `maxValue?: number` - Maximum value (default: 100)
- `step?: number` - Step increment (default: 1)
- `formatOptions?: Intl.NumberFormatOptions` - Number formatting options
- `orientation?: 'horizontal' | 'vertical'` - Slider orientation
- `isDisabled?: boolean` - Disabled state

## Visual States

The slider component supports various visual states:
- **Normal**: Default appearance with track and thumb(s)
- **Hover**: Subtle hover effects on interactive elements
- **Focus**: Visible focus ring on thumb when keyboard navigating
- **Dragging**: Visual feedback during drag with scaled thumb
- **Disabled**: Reduced opacity for disabled state

## Accessibility

- Full keyboard navigation support
- ARIA attributes for screen readers
- Proper labeling for single and multi-thumb configurations
- Touch-friendly interaction areas
- Announces value changes to assistive technologies
