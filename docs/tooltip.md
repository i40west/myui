# Tooltip

Tooltip components for providing contextual information.

## Props

```typescript
type TooltipProps = Omit<AriaTooltipProps, 'children'> & (
  | { children: React.ReactNode; content?: never }
  | { children?: never; content: React.ReactNode }
);

type TooltipTriggerProps = TooltipTriggerComponentProps & {
  content: React.ReactNode;
};
```

## Usage

```tsx
import { Tooltip, TooltipTrigger, Button } from 'myui';

// Direct tooltip (used within TooltipTrigger)
<Tooltip>This is a tooltip</Tooltip>

// Tooltip trigger (most common usage)
<TooltipTrigger content="Click to save your work" delay={300}>
  <Button>Save</Button>
</TooltipTrigger>

// Custom delay
<TooltipTrigger content="Advanced settings" delay={1000}>
  <Button>Settings</Button>
</TooltipTrigger>
```

## Features

- **Flexible Content**: Accepts either `children` or `content` prop
- **Customizable Delay**: Default 500ms delay, customizable
- **Arrow Indicator**: Includes SVG arrow pointing to trigger element
- **Automatic Positioning**: Uses react-aria-components positioning system

## Components

- `Tooltip`: The tooltip content container
- `TooltipTrigger`: Wrapper that triggers tooltip on hover/focus

## Inherited Props

Inherits all props from react-aria-components `Tooltip` and `TooltipTrigger` including:
- `placement?: Placement`
- `offset?: number`
- `isOpen?: boolean`
- `onOpenChange?: (isOpen: boolean) => void`
