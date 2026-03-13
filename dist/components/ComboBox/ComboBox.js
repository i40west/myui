import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import { ComboBox as AriaComboBox, ComboBoxStateContext, FieldError, Input, Label, ListBox, ListBoxItem, Popover, Text, } from 'react-aria-components';
import { Button } from '../Button/index.js';
import classes from './ComboBox.module.css';
export function ComboBox({ label, description, errorMessage, children, width, className, clearButton = false, rounded = false, scale, ...props }) {
    let clnames = className ? `${className} ${classes.container}` : classes.container;
    let popoverClass = classes.popover;
    if (rounded) {
        clnames += ` ${classes.rounded}`;
        popoverClass += ` ${classes.rounded}`;
    }
    if (clearButton) {
        popoverClass += ` ${classes.hasclear}`;
    }
    const style = {};
    if (width)
        style['--w'] = width;
    if (scale)
        style['--x'] = scale.toString();
    const offset = 4 * (1 + 1.75 * ((scale || 1) - 1));
    return (_jsxs(AriaComboBox, { className: clnames, menuTrigger: "focus", ...props, style: Object.keys(style).length > 0 ? style : undefined, children: [_jsx(Label, { className: classes.label, children: label }), description && _jsx(Text, { className: classes.description, slot: "description", children: description }), _jsxs("div", { className: classes.inputbox, role: "group", children: [_jsx(Input, { className: classes.input }), clearButton && _jsx(ComboBoxClearButton, {})] }), _jsx(FieldError, { className: classes.error, children: errorMessage }), _jsx(Popover, { className: popoverClass, offset: offset, style: Object.keys(style).length > 0 ? style : undefined, children: _jsx(ListBox, { className: classes.listbox, children: children }) })] }));
}
export function ComboBoxItem({ children, ...props }) {
    return (_jsx(ListBoxItem, { ...props, className: ({ isFocused, isSelected }) => `${classes.item} ${isFocused ? classes.focused : ''} ${isSelected ? classes.selected : ''}`, children: children }));
}
export function ComboBoxItemList({ items }) {
    return (_jsx(_Fragment, { children: items.map((item, index) => (_jsx(ComboBoxItem, { children: item }, index))) }));
}
function ComboBoxClearButton() {
    const state = useContext(ComboBoxStateContext);
    return (_jsx(Button, { slot: null, className: classes.clear, "aria-label": "Clear", onPress: () => state?.setSelectedKey(null), children: _jsx(IconX, {}) }));
}
function IconX({ width, height = '0.9em', ...rest }) {
    return (_jsxs("svg", { ...width && { width: width }, height: height, viewBox: "0 0 24 24", preserveAspectRatio: "xMidYMax meet", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...rest, children: [_jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), _jsx("path", { d: "M18 6l-12 12" }), _jsx("path", { d: "M6 6l12 12" })] }));
}
