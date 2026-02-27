# ComboBox

A searchable select component with autocomplete functionality.

## Props

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

## Usage

```tsx
import { ComboBox, ComboBoxItem, ComboBoxItemList } from 'myui';

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

## Features

- **Search/Filter**: Built-in filtering with `menuTrigger="focus"`
- **Clear Button**: Optional clear button to reset selection
- **Custom Width**: Configurable width via CSS custom properties
- **Rounded Styling**: Optional rounded appearance
- **Validation**: Built-in error message support

## Helper Components

- `ComboBoxItem`: Individual option component
- `ComboBoxItemList`: Renders a list of string items

## Inherited Props

Inherits all props from react-aria-components `ComboBox` including:
- `items?: Iterable<T>`
- `onSelectionChange?: (key: Key) => void`
- `selectedKey?: Key`
- `inputValue?: string`
- `onInputChange?: (value: string) => void`
