# TextArea

A multi-line text input with automatic height adjustment.

## Props

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

## Usage

```tsx
import { TextArea } from 'myui';

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

## Features

- **Auto-Height**: Automatically adjusts height based on content
- **Custom Dimensions**: Both width and height (min-height) control
- **Validation**: Built-in error message support

## Inherited Props

Inherits all props from react-aria-components `TextField` including:
- `value?: string`
- `onChange?: (value: string) => void`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
- `isRequired?: boolean`
