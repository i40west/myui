# UI Components Documentation

This document provides comprehensive documentation for the React UI components that wrap react-aria-components. All components support scaling and follow consistent styling patterns.

## Table of Contents

- [Button](#button)
- [Calendar](#calendar)
- [Checkbox](#checkbox)
- [ColorPicker](#colorpicker)
- [ComboBox](#combobox)
- [DateField & DatePicker](#datefield--datepicker)
- [Popover](#popover)
- [RadioGroup](#radiogroup)
- [Switch](#switch)
- [Tabs](#tabs)
- [TextArea](#textarea)
- [TextField](#textfield)
- [ToggleButtonGroup](#togglebuttongroup)
- [Tooltip](#tooltip)

## Common Props

All components support the following common props (where applicable):

- `scale?: number` - Scaling factor for the component size
- `className?: string` - Additional CSS classes to apply

## Button

A flexible button component with tooltip support and scaling.

### Props

```typescript
interface ButtonProps extends AriaButtonProps {
  tooltip?: string;
  className?: string;
  scale?: number;
}

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement<typeof Button> | ReactElement<typeof Button>[];
  scale?: number;
}
```

### Usage

```tsx
import { Button, ButtonGroup } from '@components/ui/Button';

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

### Inherited Props

Inherits all props from react-aria-components `Button` including:
- `onPress?: (e: PressEvent) => void`
- `isDisabled?: boolean`
- `autoFocus?: boolean`
- `type?: 'button' | 'submit' | 'reset'`

## Calendar

Date calendar components supporting both single date and date range selection with timezone support.

### Props

```typescript
interface CalendarProps<T extends DateValue> extends Omit<AriaCalendarProps<T>, 'defaultValue'> {
  errorMessage?: string;
  className?: string;
  defaultValue?: T | Date | DateTime;
  scale?: number;
  timezone?: string;
}

interface RangeCalendarProps<T extends DateValue> extends Omit<AriaRangeCalendarProps<T>, 'defaultValue'> {
  errorMessage?: string;
  className?: string;
  defaultValue?: { start: T | Date | DateTime; end: T | Date | DateTime };
  scale?: number;
  timezone?: string;
}
```

### Usage

```tsx
import { Calendar, RangeCalendar } from '@components/ui/Calendar';
import { today } from '@internationalized/date';

// Single date calendar
<Calendar
  defaultValue={new Date()}
  onChange={(date) => console.log(date)}
  errorMessage="Please select a valid date"
/>

// Date range calendar
<RangeCalendar
  defaultValue={{
    start: new Date(),
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }}
  onChange={(range) => console.log(range)}
/>

// With custom timezone
<Calendar
  defaultValue={new Date()}
  timezone="America/New_York"
  onChange={(date) => console.log(date)}
/>

// Scaled calendar
<Calendar scale={1.2} />
```

### Features

- **Timezone Support**: Automatically handles timezone conversions using the project's configured timezone or custom timezone via `timezone` prop
- **Multiple Date Types**: Accepts `Date`, `DateTime` (Luxon), or `DateValue` objects
- **Weekend/Weekday Detection**: Automatically applies data attributes for styling
- **Today Highlighting**: Current date is marked with `data-today` attribute

### Inherited Props

Inherits all props from react-aria-components `Calendar` and `RangeCalendar` including:
- `value?: DateValue`
- `onChange?: (value: DateValue) => void`
- `minValue?: DateValue`
- `maxValue?: DateValue`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`

## Checkbox

A checkbox component with optional label and custom sizing.

### Props

```typescript
interface CheckboxProps extends AriaCheckboxProps {
  label?: string;
  className?: string;
  size?: string;
  scale?: number;
}
```

### Usage

```tsx
import { Checkbox } from '@components/ui/Checkbox';

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

### Features

- **Indeterminate State**: Supports indeterminate state with different visual indicator
- **Custom SVG Icons**: Uses inline SVG for check and indeterminate states
- **Flexible Sizing**: Both `size` and `scale` props for different sizing approaches

### Inherited Props

Inherits all props from react-aria-components `Checkbox` including:
- `isSelected?: boolean`
- `onChange?: (isSelected: boolean) => void`
- `isIndeterminate?: boolean`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`

## ColorPicker

An advanced color picker component using the OKLCH color space with visual hue wheel and chroma/luminance square selection.

### Props

```typescript
interface ColorPickerProps {
  defaultValue?: Color | string;
  value?: Color | string;
  onChange?: (color: Color) => void;

  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  className?: string;
  width?: string;
  scale?: number;

  wheelThickness?: number;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;

  onFocus?: () => void;
  onBlur?: () => void;
}
```

### Usage

```tsx
import { ColorPicker } from '@components/ui/ColorPicker';
import * as culori from 'culori';

// Basic color picker
<ColorPicker
  defaultValue="oklch(0.7 0.15 0)"
  onChange={(color) => console.log(color)}
  label="Choose a color"
/>

// Controlled color picker
<ColorPicker
  value={selectedColor}
  onChange={setSelectedColor}
  label="Theme Color"
  description="Select your preferred theme color"
/>

// Custom sized and styled
<ColorPicker
  scale={1.2}
  width="300px"
  wheelThickness={30}
  label="Accent Color"
/>

// With form integration
<ColorPicker
  name="brandColor"
  label="Brand Color"
  errorMessage="Please select a valid color"
/>
```

### Features

- **OKLCH Color Space**: Uses perceptually uniform OKLCH color space for intuitive color selection
- **Visual Selection**: 
  - Circular hue wheel for selecting color hue
  - Square gradient for adjusting luminance (vertical) and chroma (horizontal)
- **Direct Input**: Three numeric input fields for precise L, C, H value control
- **Color Preview**: Displays the selected color in both sRGB and Display P3 (when available) color spaces
- **P3 Display Support**: Automatically detects and utilizes Display P3 color gamut when available
- **Culori Integration**: Uses the culori library for advanced color manipulation and conversions
- **Accessibility**: 
  - Screen reader announcements for color changes
  - Keyboard navigation support
  - ARIA labels for all interactive elements
- **Form Integration**: Hidden input field with `name` prop for form submissions

### Color Space Details

The ColorPicker uses OKLCH (Oklab Lightness, Chroma, Hue) which provides:
- **L (Lightness)**: 0 to 1 (0% to 100%)
- **C (Chroma)**: 0 to 0.4 (saturation/intensity)
- **H (Hue)**: 0 to 360 degrees

### Interactive Elements

1. **Hue Wheel**: Outer ring for selecting the base hue (0-360°)
2. **Chroma/Luminance Square**: Inner square where:
   - Horizontal axis controls chroma (left = 0, right = 0.4)
   - Vertical axis controls luminance (top = 1, bottom = 0)
3. **Input Fields**: Direct numeric input for L, C, and H values
4. **Color Swatches**: Preview the color in available color spaces

### Inherited Props

The component accepts Culori `Color` objects and provides extensive color manipulation capabilities through the culori library.

## ComboBox

A searchable select component with autocomplete functionality.

### Props

```typescript
interface ComboBoxProps<T extends object> extends Omit<AriaComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
  width?: string;
  className?: string;
  clearButton?: boolean;
  rounded?: boolean;
  scale?: number;
}
```

### Usage

```tsx
import { ComboBox, ComboBoxItem, ComboBoxItemList } from '@components/ui/ComboBox';

// Basic combobox
<ComboBox
  label="Choose a fruit"
  description="Select your favorite fruit"
  onSelectionChange={(key) => console.log(key)}
>
  <ComboBoxItem>Apple</ComboBoxItem>
  <ComboBoxItem>Banana</ComboBoxItem>
  <ComboBoxItem>Orange</ComboBoxItem>
</ComboBox>

// With clear button and custom width
<ComboBox
  label="Search"
  width="300px"
  clearButton
  rounded
  scale={1.1}
>
  <ComboBoxItemList items={['Option 1', 'Option 2', 'Option 3']} />
</ComboBox>

// With error message
<ComboBox
  label="Required field"
  errorMessage="This field is required"
  isRequired
>
  {/* items */}
</ComboBox>
```

### Features

- **Search/Filter**: Built-in filtering with `menuTrigger="focus"`
- **Clear Button**: Optional clear button to reset selection
- **Custom Width**: Configurable width via CSS custom properties
- **Rounded Styling**: Optional rounded appearance
- **Validation**: Built-in error message support

### Helper Components

- `ComboBoxItem`: Individual option component
- `ComboBoxItemList`: Renders a list of string items

### Inherited Props

Inherits all props from react-aria-components `ComboBox` including:
- `items?: Iterable<T>`
- `onSelectionChange?: (key: Key) => void`
- `selectedKey?: Key`
- `inputValue?: string`
- `onInputChange?: (value: string) => void`

## DateField & DatePicker

Date input components with different interaction patterns.

### Props

```typescript
interface DateFieldProps<T extends DateValue> extends Omit<AriaDateFieldProps<T>, 'defaultValue' | 'className'> {
  defaultValue?: T | Date | DateTime;
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  width?: string;
  scale?: number;
  timezone?: string;
}

interface DatePickerProps<T extends DateValue> extends Omit<AriaDatePickerProps<T>, 'defaultValue' | 'className'> {
  defaultValue?: T | Date | DateTime;
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  width?: string;
  scale?: number;
  timezone?: string;
}
```

### Usage

```tsx
import { DateField, DatePicker } from '@components/ui/DateField';

// Date field (keyboard input)
<DateField
  label="Birth Date"
  description="Enter your birth date"
  defaultValue={new Date()}
  onChange={(date) => console.log(date)}
/>

// Date picker (with calendar popup)
<DatePicker
  label="Appointment Date"
  width="250px"
  scale={1.1}
  onChange={(date) => console.log(date)}
/>

// With custom timezone
<DateField
  label="Meeting Time"
  timezone="Europe/London"
  defaultValue={new Date()}
/>
```

### Features

- **Multiple Date Types**: Accepts `Date`, `DateTime` (Luxon), or `DateValue` objects
- **Timezone Handling**: Automatic timezone conversion using project configuration or custom timezone via `timezone` prop
- **Segmented Input**: DateField uses segmented input for keyboard-friendly date entry
- **Calendar Integration**: DatePicker includes calendar popup with the same features as Calendar component

### Inherited Props

Inherits all props from react-aria-components `DateField` and `DatePicker` including:
- `value?: DateValue`
- `onChange?: (value: DateValue) => void`
- `minValue?: DateValue`
- `maxValue?: DateValue`
- `granularity?: 'day' | 'hour' | 'minute' | 'second'`

## Popover

Popover components for displaying overlay content with customizable appearance and arrow indicators.

### Props

```typescript
interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  width?: string;
  scale?: number;
}

interface PopoverTriggerProps extends Omit<PopoverProps, 'trigger'> {
  buttonContent: ReactNode;
  children: ReactNode;
  scale?: number;
}
```

### Usage

```tsx
import { Popover, PopoverTrigger } from '@components/ui/Popover';
import { Button } from '@components/ui/Button';

// Direct popover (used within DialogTrigger)
<DialogTrigger>
  <Button>Open Menu</Button>
  <Popover>
    <p>Popover content goes here</p>
  </Popover>
</DialogTrigger>

// Popover trigger (most common usage)
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

// Without arrow
<PopoverTrigger
  buttonContent={<Button>Options</Button>}
  showArrow={false}
>
  <ul>
    <li>Option 1</li>
    <li>Option 2</li>
    <li>Option 3</li>
  </ul>
</PopoverTrigger>
```

### Features

- **Arrow Indicator**: Optional SVG arrow pointing to trigger element (default: enabled)
- **Custom Width**: Configurable width via CSS custom properties
- **Scaling Support**: Uniform scaling affects both popover and arrow size
- **Dialog Container**: Content wrapped in accessible Dialog component
- **Automatic Positioning**: Uses react-aria-components positioning system

### Components

- `Popover`: The popover content container with optional arrow
- `PopoverTrigger`: Complete trigger + popover solution using Button as trigger

### Inherited Props

Inherits all props from react-aria-components `Popover` including:
- `placement?: Placement`
- `offset?: number`
- `isOpen?: boolean`
- `onOpenChange?: (isOpen: boolean) => void`
- `shouldFlip?: boolean`
- `containerPadding?: number`

## RadioGroup

A radio button group with flexible orientation and validation.

### Props

```typescript
interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children' | 'orientation'> {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  size?: string;
  scale?: number;
  className?: string;
}
```

### Usage

```tsx
import { RadioGroup, RadioGroupList } from '@components/ui/RadioGroup';
import { Radio } from 'react-aria-components';

// Basic radio group
<RadioGroup
  label="Choose a size"
  orientation="horizontal"
  value={selectedSize}
  onChange={setSelectedSize}
>
  <Radio value="small">Small</Radio>
  <Radio value="medium">Medium</Radio>
  <Radio value="large">Large</Radio>
</RadioGroup>

// Using helper component
<RadioGroup
  label="Pick a color"
  description="Select your preferred color"
  orientation="vertical"
  scale={1.2}
>
  <RadioGroupList items={['Red', 'Green', 'Blue']} />
</RadioGroup>

// With error message
<RadioGroup
  label="Required choice"
  errorMessage="Please select an option"
  isRequired
>
  {/* radio options */}
</RadioGroup>
```

### Features

- **Orientation Control**: Horizontal or vertical layout
- **Validation Support**: Built-in error message handling
- **Custom Sizing**: Both `size` and `scale` props

### Helper Components

- `RadioGroupList`: Renders a list of string items as radio options

### Inherited Props

Inherits all props from react-aria-components `RadioGroup` including:
- `value?: string`
- `onChange?: (value: string) => void`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
- `isRequired?: boolean`

## Switch

A toggle switch component for binary on/off states.

### Props

```typescript
interface SwitchProps extends AriaSwitchProps {
  label?: string;
  className?: string;
  size?: string;
  scale?: number;
}
```

### Usage

```tsx
import { Switch } from '@components/ui/Switch';

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

### Features

- **Visual Indicator**: Animated toggle indicator that slides between positions
- **Flexible Sizing**: Both `size` and `scale` props for different sizing approaches
- **Optional Label**: Display label text alongside the switch
- **Smooth Animation**: CSS transitions for indicator movement

### Inherited Props

Inherits all props from react-aria-components `Switch` including:
- `isSelected?: boolean`
- `onChange?: (isSelected: boolean) => void`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
- `autoFocus?: boolean`

## Tabs

A tab interface with customizable width.

### Props

```typescript
interface TabsProps extends AriaTabsProps {
  className?: string;
  width?: string;
}
```

### Usage

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@components/ui/Tabs';

<Tabs width="400px">
  <TabList aria-label="Content sections">
    <Tab id="overview">Overview</Tab>
    <Tab id="details">Details</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanel id="overview">
    <p>Overview content...</p>
  </TabPanel>
  <TabPanel id="details">
    <p>Detailed information...</p>
  </TabPanel>
  <TabPanel id="settings">
    <p>Settings panel...</p>
  </TabPanel>
</Tabs>
```

### Features

- **Customizable Width**: Set width via CSS custom properties
- **Includes Example**: Contains a built-in `TabsExample` component for reference

### Re-exported Components

- `TabList`
- `Tab`
- `TabPanel`

### Inherited Props

Inherits all props from react-aria-components `Tabs` including:
- `orientation?: 'horizontal' | 'vertical'`
- `selectedKey?: Key`
- `onSelectionChange?: (key: Key) => void`
- `isDisabled?: boolean`

## TextArea

A multi-line text input with automatic height adjustment.

### Props

```typescript
interface TextAreaProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  className?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  scale?: number;
}
```

### Usage

```tsx
import { TextArea } from '@components/ui/TextArea';

// Basic textarea
<TextArea
  label="Comments"
  placeholder="Enter your comments..."
  value={comments}
  onChange={setComments}
/>

// With custom dimensions
<TextArea
  label="Description"
  width="100%"
  height="150px"
  scale={1.1}
  description="Provide a detailed description"
/>

// With validation
<TextArea
  label="Message"
  isRequired
  errorMessage="Message is required"
/>
```

### Features

- **Auto-Height**: Automatically adjusts height based on content
- **Custom Dimensions**: Both width and height (min-height) control
- **Validation**: Built-in error message support

### Inherited Props

Inherits all props from react-aria-components `TextField` including:
- `value?: string`
- `onChange?: (value: string) => void`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
- `isRequired?: boolean`

## TextField

A single-line text input with optional submit button.

### Props

```typescript
interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  className?: string;
  width?: string;
  scale?: number;
  submitButton?: boolean;
  rounded?: boolean;
}
```

### Usage

```tsx
import { TextField } from '@components/ui/TextField';

// Basic text field
<TextField
  label="Email"
  placeholder="Enter your email"
  type="email"
  value={email}
  onChange={setEmail}
/>

// With submit button
<TextField
  label="Search"
  placeholder="Search..."
  submitButton
  rounded
  onSubmit={handleSearch}
/>

// Custom width and scaling
<TextField
  label="Name"
  width="300px"
  scale={1.2}
  description="Enter your full name"
/>
```

### Features

- **Submit Button**: Optional integrated submit button with arrow icon
- **Rounded Styling**: Optional rounded appearance
- **Custom Width**: Configurable width via CSS custom properties
- **Built-in Icon**: Submit button includes arrow SVG icon

### Inherited Props

Inherits all props from react-aria-components `TextField` including:
- `value?: string`
- `onChange?: (value: string) => void`
- `type?: string`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
- `isRequired?: boolean`
- `onSubmit?: (value: string) => void`

## ToggleButtonGroup

A group of toggle buttons for multi-select interactions.

### Props

```typescript
interface ToggleButtonGroupProps extends AriaToggleButtonGroupProps {
  scale?: number;
  className?: string;
}

// ToggleButton uses AriaToggleButtonProps
```

### Usage

```tsx
import ToggleButtonGroup, { ToggleButton } from '@components/ui/ToggleButtonGroup';

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

### Features

- **Multiple Selection Modes**: Supports single and multiple selection
- **Includes Example**: Contains a built-in `ToggleButtonGroupExample` component

### Inherited Props

Inherits all props from react-aria-components `ToggleButtonGroup` and `ToggleButton` including:
- `selectionMode?: 'single' | 'multiple'`
- `selectedKeys?: Iterable<Key>`
- `onSelectionChange?: (keys: Set<Key>) => void`
- `isDisabled?: boolean`

## Tooltip

Tooltip components for providing contextual information.

### Props

```typescript
type TooltipProps = Omit<AriaTooltipProps, 'children'> & (
  | { children: React.ReactNode; content?: never }
  | { children?: never; content: React.ReactNode }
);

type TooltipTriggerProps = TooltipTriggerComponentProps & {
  content: React.ReactNode;
};
```

### Usage

```tsx
import { Tooltip, TooltipTrigger } from '@components/ui/Tooltip';

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

### Features

- **Flexible Content**: Accepts either `children` or `content` prop
- **Customizable Delay**: Default 500ms delay, customizable
- **Arrow Indicator**: Includes SVG arrow pointing to trigger element
- **Automatic Positioning**: Uses react-aria-components positioning system

### Components

- `Tooltip`: The tooltip content container
- `TooltipTrigger`: Wrapper that triggers tooltip on hover/focus

### Inherited Props

Inherits all props from react-aria-components `Tooltip` and `TooltipTrigger` including:
- `placement?: Placement`
- `offset?: number`
- `isOpen?: boolean`
- `onOpenChange?: (isOpen: boolean) => void`

## Styling

All components use CSS modules for styling and support:

- **CSS Custom Properties**: For dynamic values like width, height, and scale
- **Data Attributes**: For state-based styling (selected, focused, etc.)
- **Responsive Design**: Components adapt to different screen sizes
- **Consistent Scaling**: The `scale` prop uniformly affects component sizing

## Accessibility

All components inherit accessibility features from react-aria-components:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling and indicators
- **Screen Reader Support**: Optimized for assistive technologies
- **High Contrast**: Supports high contrast mode
- **RTL Support**: Right-to-left text direction support

## Integration with React Aria Components

These components are thin wrappers around react-aria-components, providing:

- **Consistent Styling**: Project-specific design system
- **Enhanced Props**: Additional convenience props like `scale` and `tooltip`
- **Simplified APIs**: Reduced boilerplate for common use cases
- **Type Safety**: Full TypeScript support with proper prop inheritance

For advanced usage, you can always use the underlying react-aria-components directly or extend these components further.
