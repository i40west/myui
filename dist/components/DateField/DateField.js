import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { fromDate, fromAbsolute, } from '@internationalized/date';
import { DateField as AriaDateField, DatePicker as AriaDatePicker, DateInput, DateSegment, Dialog, FieldError, Group, Label, Popover, Text, } from 'react-aria-components';
import { DateTime } from 'luxon';
import { Calendar } from '../Calendar/index.js';
import { Button } from '../Button/index.js';
import classes from './DateField.module.css';
// Process default value regardless of its type
function processDefaultValue(defaultValue, timezone = 'UTC') {
    if (!defaultValue)
        return undefined;
    if (defaultValue instanceof Date) {
        return fromDate(defaultValue, timezone);
    }
    else if (defaultValue instanceof DateTime) {
        return fromAbsolute(defaultValue.toMillis(), timezone);
    }
    return defaultValue;
}
// Shared content component
function DateContent({ label, description, errorMessage, showButton = false, }) {
    return (_jsxs(_Fragment, { children: [label && _jsx(Label, { className: classes.label, children: label }), description && _jsx(Text, { className: classes.description, slot: "description", children: description }), _jsxs(Group, { className: classes.inputgroup, children: [_jsx(DateInput, { className: classes.input, children: (segment) => _jsx(DateSegment, { className: classes.segment, segment: segment }) }), showButton && _jsx(Button, { className: classes.openbutton, children: "\u25BC" })] }), _jsx(FieldError, { className: classes.error, children: errorMessage })] }));
}
export function DateField({ label, description, errorMessage, className, width, scale, defaultValue, timezone = 'UTC', ...props }) {
    const processedDefaultValue = processDefaultValue(defaultValue, timezone);
    const clnames = className ? `${className} ${classes.container}` : classes.container;
    const style = {};
    if (width)
        style['--w'] = width;
    if (scale)
        style['--x'] = scale.toString();
    return (_jsx(AriaDateField, { className: clnames, ...props, defaultValue: processedDefaultValue, style: Object.keys(style).length > 0 ? style : undefined, granularity: "day", children: _jsx(DateContent, { label: label, description: description, errorMessage: errorMessage }) }));
}
export function DatePicker({ label, description, errorMessage, className, width, scale, defaultValue, timezone = 'UTC', ...props }) {
    const processedDefaultValue = processDefaultValue(defaultValue, timezone);
    const clnames = className ? `${className} ${classes.container}` : classes.container;
    const style = {};
    if (width)
        style['--w'] = width;
    if (scale)
        style['--x'] = scale.toString();
    return (_jsxs(AriaDatePicker, { className: clnames, ...props, defaultValue: processedDefaultValue, style: Object.keys(style).length > 0 ? style : undefined, granularity: "day", children: [_jsx(DateContent, { label: label, description: description, errorMessage: errorMessage, showButton: true }), _jsx(Popover, { className: classes.popover, offset: 4, children: _jsx(Dialog, { children: _jsx(Calendar, { ...(scale !== undefined && { scale }), timezone: timezone }) }) })] }));
}
export default DateField;
