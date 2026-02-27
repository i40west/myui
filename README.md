# MyUI Component Library

A modern React component library built on top of React Aria Components, providing accessible and customizable UI components with CSS modules styling.

## Features

- 🎨 Built with React Aria Components for robust accessibility
- 🎯 TypeScript support with full type definitions
- 🎪 CSS Modules for scoped styling
- 📐 Customizable scaling via CSS custom properties
- 📚 Storybook documentation
- ⚡ Tree-shakeable ESM exports

## Usage

### Basic Import

```tsx
import { Button, TextField, Calendar, Slider } from 'myui';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <TextField label="Name" />
      <Calendar />
      <Slider label="Volume" defaultValue={50} />
    </div>
  );
}
```

### Individual Component Imports (Recommended for Tree-shaking)

```tsx
import { Button } from 'myui/Button';
import { TextField } from 'myui/TextField';
import { Calendar } from 'myui/Calendar';
import { Slider } from 'myui/Slider';
```

### CSS Modules

These components use CSS modules and are not bundled. You must be using a bundler that supports CSS modules.

## Available Components

### Form Components
- **Button** - Accessible button with tooltip support
- **ButtonGroup** - Group buttons with consistent styling
- **TextField** - Text input with label, description, and validation
- **TextArea** - Multi-line text input
- **Checkbox** - Checkbox with label
- **Switch** - Toggle switch component
- **RadioGroup** - Radio button group with accessible keyboard navigation
- **ComboBox** - Searchable dropdown with autocomplete
- **Slider** - Single or multi-thumb slider for value selection

### Date & Time Components
- **Calendar** - Date picker calendar
- **RangeCalendar** - Date range picker
- **DateField** - Date input field
- **DatePicker** - Date picker with popover calendar

### Display Components
- **Tabs** - Tabbed interface component
- **Popover** - Popover container with customizable positioning
- **PopoverTrigger** - Button trigger with popover
- **Tooltip** - Hover tooltip component
- **TooltipTrigger** - Wrap any element with tooltip

### Selection Components
- **ColorPicker** - Color selection component
- **ToggleButtonGroup** - Group of toggle buttons

## Component Props

### Common Props

Most components support these common props:

- `className` - Additional CSS classes
- `scale` - Scaling factor (e.g., 1.2 for 120% size)
- Standard HTML attributes

### Timezone Support

Calendar and date components support an optional `timezone` prop:

```tsx
<Calendar timezone="America/New_York" />
<DateField timezone="Europe/London" />
```

Default timezone is 'UTC' if not specified.

## Styling

Components use CSS Modules with CSS custom properties for theming:

```css
/* Example: Customizing button colors */
.my-button {
  --button-bg: #007bff;
  --button-color: white;
}
```

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## Documentation

For detailed component documentation and examples, see [docs/index.md](./docs/index.md).
