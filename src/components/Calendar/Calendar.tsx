import {
	fromDate,
	fromAbsolute,
	isToday,
	isWeekend,
	isWeekday,
} from '@internationalized/date';
import { DateTime } from 'luxon';
import {
	Calendar as AriaCalendar,
	CalendarCell,
	CalendarGrid,
	CalendarGridHeader,
	CalendarGridBody,
	CalendarHeaderCell,
	Heading,
	RangeCalendar as AriaRangeCalendar,
	Text,
} from 'react-aria-components';
import { Button } from '../Button';
import classes from './Calendar.module.css';

import type {
	CalendarProps as AriaCalendarProps,
	RangeCalendarProps as AriaRangeCalendarProps,
	DateValue,
} from 'react-aria-components';

// Accept Date or DateTime for defaultValue in addition to DateValue
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
	// defaultValue is an object containing 'start' and 'end' properties of type T or Date or DateTime
	defaultValue?: { start: T | Date | DateTime; end: T | Date | DateTime };
	scale?: number;
	timezone?: string;
}

// Shared calendar content component
function CalendarContent({ errorMessage, timezone = 'UTC' }: { errorMessage?: string; timezone?: string }) {
	return (
		<>
			<header>
				<Button className={classes.navbutton} slot="previous">◀</Button>
				<Heading className={classes.heading} />
				<Button className={classes.navbutton} slot="next">▶</Button>
			</header>
			<CalendarGrid className={classes.grid}>
				<CalendarGridHeader>
					{(day) => (
						<CalendarHeaderCell className={classes.headercell}>
							{day}
						</CalendarHeaderCell>
					)}
				</CalendarGridHeader>

				<CalendarGridBody>
					{(date) => (
						<CalendarCell
							className={classes.cell}
							date={date}
							{...(isToday(date, timezone) ? { 'data-today': '' } : {})}
							{...(isWeekday(date, 'en-US') ? { 'data-weekday': '' } : {})}
							{...(isWeekend(date, 'en-US') ? { 'data-weekend': '' } : {})}
						/>
					)}
				</CalendarGridBody>
			</CalendarGrid>
			{errorMessage && <Text slot="errorMessage" className={classes.error}>{errorMessage}</Text>}
		</>
	);
}

export function Calendar<T extends DateValue>({
	errorMessage,
	className,
	defaultValue,
	scale,
	timezone = 'UTC',
	...props
}: CalendarProps<T>) {
	// Process defaultValue to convert Date or DateTime to DateValue
	const processedProps = { ...props } as AriaCalendarProps<T>;

	if (defaultValue) {
		if (defaultValue instanceof Date) {
			processedProps.defaultValue = fromDate(defaultValue, timezone) as T;
		} else if (defaultValue instanceof DateTime) {
			processedProps.defaultValue = fromAbsolute(defaultValue.toMillis(), timezone) as T;
		} else {
			processedProps.defaultValue = defaultValue;
		}
	}

	const clnames = className ? `${className} ${classes.container}` : classes.container;

	const style: React.CSSProperties = {};
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaCalendar
			className={clnames}
			{...processedProps}
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			<CalendarContent errorMessage={errorMessage} timezone={timezone} />
		</AriaCalendar>
	);
}

export function RangeCalendar<T extends DateValue>({
	errorMessage,
	className,
	defaultValue,
	scale,
	timezone = 'UTC',
	...props
}: RangeCalendarProps<T>) {
	// Process defaultValue to convert Date or DateTime to DateValue
	const processedProps = { ...props } as AriaRangeCalendarProps<T>;

	if (defaultValue) {
		const processedValue: { start: T; end: T } = {} as { start: T; end: T };

		// Process start date
		if (defaultValue.start instanceof Date) {
			processedValue.start = fromDate(defaultValue.start, timezone) as T;
		} else if (defaultValue.start instanceof DateTime) {
			processedValue.start = fromAbsolute(defaultValue.start.toMillis(), timezone) as T;
		} else {
			processedValue.start = defaultValue.start as T;
		}

		// Process end date
		if (defaultValue.end instanceof Date) {
			processedValue.end = fromDate(defaultValue.end, timezone) as T;
		} else if (defaultValue.end instanceof DateTime) {
			processedValue.end = fromAbsolute(defaultValue.end.toMillis(), timezone) as T;
		} else {
			processedValue.end = defaultValue.end as T;
		}

		processedProps.defaultValue = processedValue;
	}

	const clnames = className ? `${className} ${classes.container}` : classes.container;

	const style: React.CSSProperties = {};
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaRangeCalendar
			className={clnames}
			{...processedProps}
			data-range
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			<CalendarContent errorMessage={errorMessage} timezone={timezone} />
		</AriaRangeCalendar>
	);
}

export default Calendar;
