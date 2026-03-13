import { DateTime } from 'luxon';
import type { CalendarProps as AriaCalendarProps, RangeCalendarProps as AriaRangeCalendarProps, DateValue } from 'react-aria-components';
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
    defaultValue?: {
        start: T | Date | DateTime;
        end: T | Date | DateTime;
    };
    scale?: number;
    timezone?: string;
}
export declare function Calendar<T extends DateValue>({ errorMessage, className, defaultValue, scale, timezone, ...props }: CalendarProps<T>): import("react/jsx-runtime").JSX.Element;
export declare function RangeCalendar<T extends DateValue>({ errorMessage, className, defaultValue, scale, timezone, ...props }: RangeCalendarProps<T>): import("react/jsx-runtime").JSX.Element;
export default Calendar;
//# sourceMappingURL=Calendar.d.ts.map