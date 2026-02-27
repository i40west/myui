# Calendar

Date calendar components supporting both single date and date range selection with timezone support.

## Props

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

## Usage

```tsx
import { Calendar, RangeCalendar } from 'myui';

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

## Features

- **Timezone Support**: Automatically handles timezone conversions using `UTC` by default, or a custom timezone via `timezone` prop
- **Multiple Date Types**: Accepts `Date`, `DateTime` (Luxon), or `DateValue` objects
- **Weekend/Weekday Detection**: Automatically applies data attributes for styling
- **Today Highlighting**: Current date is marked with `data-today` attribute

## Inherited Props

Inherits all props from react-aria-components `Calendar` and `RangeCalendar` including:
- `value?: DateValue` (Calendar) / `RangeValue<DateValue>` (RangeCalendar)
- `onChange?: (value) => void`
- `minValue?: DateValue`
- `maxValue?: DateValue`
- `isDisabled?: boolean`
- `isReadOnly?: boolean`
