# DatePicker

Date picker component with calendar popover selection.

## Props

```typescript
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

## Usage

```tsx
import { DatePicker } from 'myui';

// Date picker (with calendar popup)
<DatePicker
  label="Appointment Date"
  width="250px"
  scale={1.1}
  onChange={(date) => console.log(date)}
/>

// With custom timezone
<DatePicker
  label="Meeting Date"
  timezone="Europe/London"
  defaultValue={new Date()}
/>
```

## Features

- **Multiple Date Types**: Accepts `Date`, `DateTime` (Luxon), or `DateValue` objects
- **Timezone Handling**: Automatic timezone conversion using `UTC` by default, or a custom timezone via `timezone` prop
- **Calendar Integration**: Includes calendar popup with the same features as the `Calendar` component

## Inherited Props

Inherits all props from react-aria-components `DatePicker` including:
- `value?: DateValue`
- `onChange?: (value: DateValue) => void`
- `minValue?: DateValue`
- `maxValue?: DateValue`
- `granularity` is fixed to `'day'` by this wrapper
