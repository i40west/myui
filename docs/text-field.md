# TextField

A single-line text input with optional submit button.

## Props

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

## Usage

```tsx
import { TextField } from 'myui';

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
/>

// Custom width and scaling
<TextField
  label="Name"
  width="300px"
  scale={1.2}
  description="Enter your full name"
/>
```

## Features

- **Submit Button**: Optional integrated submit button with arrow icon
- **Rounded Styling**: Optional rounded appearance
- **Custom Width**: Configurable width via CSS custom properties
- **Built-in Icon**: Submit button includes arrow SVG icon

## Inherited Props

Inherits all props from react-aria-components `TextField` including:
- `value?: string`
- `onChange?: (value: string) => void`
- `type?: string`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
- `isRequired?: boolean`
