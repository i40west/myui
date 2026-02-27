# DateField

Date input component for keyboard-first date entry.

## Props

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
```

## Usage

```tsx
import { DateField } from 'myui';

// Date field (keyboard input)
<DateField
  label="Birth Date"
  description="Enter your birth date"
  defaultValue={new Date()}
  onChange={(date) => console.log(date)}
/>

// With custom timezone
<DateField
  label="Meeting Date"
  timezone="Europe/London"
  defaultValue={new Date()}
/>
```

## Features

- **Multiple Date Types**: Accepts `Date`, `DateTime` (Luxon), or `DateValue` objects
- **Timezone Handling**: Automatic timezone conversion using `UTC` by default, or a custom timezone via `timezone` prop
- **Segmented Input**: Uses segmented input for keyboard-friendly date entry

## Inherited Props

Inherits all props from react-aria-components `DateField` including:
- `value?: DateValue`
- `onChange?: (value: DateValue) => void`
- `minValue?: DateValue`
- `maxValue?: DateValue`
- `granularity` is fixed to `'day'` by this wrapper
