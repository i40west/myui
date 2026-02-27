# Popover

Popover components for displaying overlay content with customizable appearance and arrow indicators.

## Props

```typescript
interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  width?: string;
  scale?: number;
}

interface PopoverTriggerProps extends Omit<PopoverProps, 'trigger'> {
  buttonContent?: ReactNode;  // Legacy prop for backward compatibility
  trigger?: ReactNode;        // New prop for custom triggers
  children: ReactNode;
  scale?: number;
}
```

## Usage

```tsx
import { DialogTrigger } from 'react-aria-components';
import { Popover, PopoverTrigger, Button, ColorPicker } from 'myui';

// Direct popover (used within DialogTrigger)
<DialogTrigger>
  <Button>Open Menu</Button>
  <Popover>
    <p>Popover content goes here</p>
  </Popover>
</DialogTrigger>

// Using legacy buttonContent prop
<PopoverTrigger
  buttonContent="Settings"
  showArrow={true}
  width="250px"
  scale={1.1}
>
  <div>
    <h3>Settings Panel</h3>
    <p>Configure your preferences</p>
  </div>
</PopoverTrigger>

// Using new trigger prop with custom element
<PopoverTrigger
  trigger={
    <span
      role="button"
      tabIndex={0}
      style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
    >
      Custom clickable text
    </span>
  }
  showArrow={false}
>
  <ul>
    <li>Option 1</li>
    <li>Option 2</li>
    <li>Option 3</li>
  </ul>
</PopoverTrigger>

// Color swatch as trigger
<PopoverTrigger
  trigger={
    <div
      role="button"
      tabIndex={0}
      style={{
        width: 40,
        height: 40,
        backgroundColor: '#ff6b6b',
        borderRadius: 4,
        cursor: 'pointer',
        border: '2px solid #ddd',
      }}
      aria-label="Red color swatch"
    />
  }
>
  <ColorPicker />
</PopoverTrigger>

// Custom styled button
<PopoverTrigger
  trigger={
    <button
      style={{
        backgroundColor: '#4ecdc4',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: 20,
        cursor: 'pointer',
        fontSize: 16,
      }}
    >
      Custom Styled Button
    </button>
  }
>
  <div>Menu content here</div>
</PopoverTrigger>
```

## Features

- **Arrow Indicator**: Optional SVG arrow pointing to trigger element (default: enabled)
- **Custom Width**: Configurable width via CSS custom properties
- **Scaling Support**: Uniform scaling affects both popover and arrow size
- **Dialog Container**: Content wrapped in accessible Dialog component
- **Automatic Positioning**: Uses react-aria-components positioning system
- **Custom Triggers**: New `trigger` prop allows any ReactNode as a popover trigger
- **Backward Compatibility**: Legacy `buttonContent` prop still supported
- **Automatic Pressable Wrapping**: Custom triggers are wrapped with React Aria's Pressable for proper interaction handling

## Components

- `Popover`: The popover content container with optional arrow
- `PopoverTrigger`: Complete trigger + popover solution that accepts either:
  - `buttonContent` prop: Creates a Button component as trigger (legacy)
  - `trigger` prop: Accepts any custom ReactNode as trigger element (new)

## Accessibility Notes

When using the `trigger` prop with custom elements:
- Non-button elements should include `role="button"` and `tabIndex={0}`
- Provide appropriate `aria-label` for non-text triggers (e.g., color swatches)
- The Pressable wrapper automatically handles keyboard and pointer interactions
- Custom triggers maintain full React Aria accessibility features

## Inherited Props

Inherits all props from react-aria-components `Popover` including:
- `placement?: Placement`
- `offset?: number`
- `isOpen?: boolean`
- `onOpenChange?: (isOpen: boolean) => void`
- `shouldFlip?: boolean`
- `containerPadding?: number`
