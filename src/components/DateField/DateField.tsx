import {
	fromDate,
	fromAbsolute,
} from '@internationalized/date';
import {
	DateField as AriaDateField,
	DatePicker as AriaDatePicker,
	DateInput,
	DateSegment,
	Dialog,
	FieldError,
	Group,
	Label,
	Popover,
	Text,
} from 'react-aria-components';
import { DateTime } from 'luxon';
import { Calendar } from '../Calendar';
import { Button } from '../Button';
import classes from './DateField.module.css';

import type {
	DateFieldProps as AriaDateFieldProps,
	DatePickerProps as AriaDatePickerProps,
	DateValue,
	ValidationResult,
} from 'react-aria-components';

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

// Process default value regardless of its type
function processDefaultValue<T extends DateValue>(defaultValue?: T | Date | DateTime, timezone: string = 'UTC'): T | undefined {
	if (!defaultValue) return undefined;

	if (defaultValue instanceof Date) {
		return fromDate(defaultValue, timezone) as T;
	} else if (defaultValue instanceof DateTime) {
		return fromAbsolute(defaultValue.toMillis(), timezone) as T;
	}
	return defaultValue;
}

// Shared content component
function DateContent({
	label,
	description,
	errorMessage,
	showButton = false,
}: {
		label?: string;
		description?: string;
		errorMessage?: string | ((validation: ValidationResult) => string);
		showButton?: boolean;
	}) {
	return (
		<>
			{label && <Label className={classes.label}>{label}</Label>}
			{description && <Text className={classes.description} slot="description">{description}</Text>}
			<Group className={classes.inputgroup}>
				<DateInput className={classes.input}>
					{(segment) => <DateSegment className={classes.segment} segment={segment} />}
				</DateInput>
				{showButton && <Button className={classes.openbutton}>▼</Button>}
			</Group>
			<FieldError className={classes.error}>{errorMessage}</FieldError>
		</>
	);
}

export function DateField<T extends DateValue>(
	{ label, description, errorMessage, className, width, scale, defaultValue, timezone = 'UTC', ...props }: DateFieldProps<T>,
) {
	const processedDefaultValue = processDefaultValue<T>(defaultValue, timezone);
	const clnames = className ? `${className} ${classes.container}` : classes.container;

	const style: React.CSSProperties = {};
	if (width) style['--w'] = width;
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaDateField
			className={clnames}
			{...props}
			defaultValue={processedDefaultValue}
			style={Object.keys(style).length > 0 ? style : undefined}
			granularity="day"
		>
			<DateContent
				label={label}
				description={description}
				errorMessage={errorMessage}
			/>
		</AriaDateField>
	);
}

export function DatePicker<T extends DateValue>(
	{ label, description, errorMessage, className, width, scale, defaultValue, timezone = 'UTC', ...props }: DatePickerProps<T>,
) {
	const processedDefaultValue = processDefaultValue<T>(defaultValue, timezone);
	const clnames = className ? `${className} ${classes.container}` : classes.container;

	const style: React.CSSProperties = {};
	if (width) style['--w'] = width;
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaDatePicker
			className={clnames}
			{...props}
			defaultValue={processedDefaultValue}
			style={Object.keys(style).length > 0 ? style : undefined}
			granularity="day"
		>
			<DateContent
				label={label}
				description={description}
				errorMessage={errorMessage}
				showButton={true}
			/>
			<Popover className={classes.popover} offset={4}>
				<Dialog>
					<Calendar {...(scale !== undefined && { scale })} timezone={timezone} />
				</Dialog>
			</Popover>
		</AriaDatePicker>
	);
}

export default DateField;
