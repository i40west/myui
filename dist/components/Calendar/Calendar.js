import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { fromDate, fromAbsolute, isToday, isWeekend, isWeekday, } from '@internationalized/date';
import { DateTime } from 'luxon';
import { Calendar as AriaCalendar, CalendarCell, CalendarGrid, CalendarGridHeader, CalendarGridBody, CalendarHeaderCell, Heading, RangeCalendar as AriaRangeCalendar, Text, } from 'react-aria-components';
import { Button } from '../Button/index.js';
import classes from './Calendar.module.css';
// Shared calendar content component
function CalendarContent({ errorMessage, timezone = 'UTC' }) {
    return (_jsxs(_Fragment, { children: [_jsxs("header", { children: [_jsx(Button, { className: classes.navbutton, slot: "previous", children: "\u25C0" }), _jsx(Heading, { className: classes.heading }), _jsx(Button, { className: classes.navbutton, slot: "next", children: "\u25B6" })] }), _jsxs(CalendarGrid, { className: classes.grid, children: [_jsx(CalendarGridHeader, { children: (day) => (_jsx(CalendarHeaderCell, { className: classes.headercell, children: day })) }), _jsx(CalendarGridBody, { children: (date) => (_jsx(CalendarCell, { className: classes.cell, date: date, ...(isToday(date, timezone) ? { 'data-today': '' } : {}), ...(isWeekday(date, 'en-US') ? { 'data-weekday': '' } : {}), ...(isWeekend(date, 'en-US') ? { 'data-weekend': '' } : {}) })) })] }), errorMessage && _jsx(Text, { slot: "errorMessage", className: classes.error, children: errorMessage })] }));
}
export function Calendar({ errorMessage, className, defaultValue, scale, timezone = 'UTC', ...props }) {
    // Process defaultValue to convert Date or DateTime to DateValue
    const processedProps = { ...props };
    if (defaultValue) {
        if (defaultValue instanceof Date) {
            processedProps.defaultValue = fromDate(defaultValue, timezone);
        }
        else if (defaultValue instanceof DateTime) {
            processedProps.defaultValue = fromAbsolute(defaultValue.toMillis(), timezone);
        }
        else {
            processedProps.defaultValue = defaultValue;
        }
    }
    const clnames = className ? `${className} ${classes.container}` : classes.container;
    const style = {};
    if (scale)
        style['--x'] = scale.toString();
    return (_jsx(AriaCalendar, { className: clnames, ...processedProps, style: Object.keys(style).length > 0 ? style : undefined, children: _jsx(CalendarContent, { errorMessage: errorMessage, timezone: timezone }) }));
}
export function RangeCalendar({ errorMessage, className, defaultValue, scale, timezone = 'UTC', ...props }) {
    // Process defaultValue to convert Date or DateTime to DateValue
    const processedProps = { ...props };
    if (defaultValue) {
        const processedValue = {};
        // Process start date
        if (defaultValue.start instanceof Date) {
            processedValue.start = fromDate(defaultValue.start, timezone);
        }
        else if (defaultValue.start instanceof DateTime) {
            processedValue.start = fromAbsolute(defaultValue.start.toMillis(), timezone);
        }
        else {
            processedValue.start = defaultValue.start;
        }
        // Process end date
        if (defaultValue.end instanceof Date) {
            processedValue.end = fromDate(defaultValue.end, timezone);
        }
        else if (defaultValue.end instanceof DateTime) {
            processedValue.end = fromAbsolute(defaultValue.end.toMillis(), timezone);
        }
        else {
            processedValue.end = defaultValue.end;
        }
        processedProps.defaultValue = processedValue;
    }
    const clnames = className ? `${className} ${classes.container}` : classes.container;
    const style = {};
    if (scale)
        style['--x'] = scale.toString();
    return (_jsx(AriaRangeCalendar, { className: clnames, ...processedProps, "data-range": true, style: Object.keys(style).length > 0 ? style : undefined, children: _jsx(CalendarContent, { errorMessage: errorMessage, timezone: timezone }) }));
}
export default Calendar;
