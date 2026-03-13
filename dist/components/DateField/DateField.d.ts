import { DateTime } from 'luxon';
import type { DateFieldProps as AriaDateFieldProps, DatePickerProps as AriaDatePickerProps, DateValue, ValidationResult } from 'react-aria-components';
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
export declare function DateField<T extends DateValue>({ label, description, errorMessage, className, width, scale, defaultValue, timezone, ...props }: DateFieldProps<T>): import("react/jsx-runtime").JSX.Element;
export declare function DatePicker<T extends DateValue>({ label, description, errorMessage, className, width, scale, defaultValue, timezone, ...props }: DatePickerProps<T>): import("react/jsx-runtime").JSX.Element;
export default DateField;
//# sourceMappingURL=DateField.d.ts.map