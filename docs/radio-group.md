# RadioGroup

A radio button group with flexible orientation and validation.

## Props

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

## Usage

```tsx
import { RadioGroup, RadioGroupList } from 'myui';
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

## Features

- **Orientation Control**: Horizontal or vertical layout
- **Validation Support**: Built-in error message handling
- **Custom Sizing**: Both `size` and `scale` props

## Helper Components

- `RadioGroupList`: Renders a list of string items as radio options

## Inherited Props

Inherits all props from react-aria-components `RadioGroup` including:
- `value?: string`
- `onChange?: (value: string) => void`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
- `isRequired?: boolean`
