import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextField as AriaTextField, Label, Input, FieldError, Text, } from 'react-aria-components';
import { Button } from '../Button/index.js';
import classes from './TextField.module.css';
export function TextField({ label, description, placeholder, errorMessage, className, width, scale, submitButton = false, rounded = false, ...rest }) {
    let clnames = className ? `${classes.container} ${className}` : classes.container;
    if (rounded) {
        clnames += ` ${classes.rounded}`;
    }
    const style = {};
    if (width)
        style['--w'] = width;
    if (scale)
        style['--x'] = scale.toString();
    return (_jsxs(AriaTextField, { className: clnames, ...rest, style: Object.keys(style).length > 0 ? style : undefined, children: [_jsx(Label, { className: classes.label, children: label }), description && _jsx(Text, { slot: "description", className: classes.description, children: description }), _jsxs("div", { className: classes.inputbox, children: [_jsx(Input, { className: classes.input, placeholder: placeholder }), submitButton && (_jsx(Button, { className: classes.submit, slot: null, type: "submit", children: _jsx(IconArrow, {}) }))] }), _jsx(FieldError, { className: classes.error, children: errorMessage })] }));
}
export default TextField;
function IconArrow({ ...props }) {
    return (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", preserveAspectRatio: "xMidYMax meet", ...props, children: [_jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), _jsx("path", { d: "M5 12l14 0" }), _jsx("path", { d: "M13 18l6 -6" }), _jsx("path", { d: "M13 6l6 6" })] }));
}
