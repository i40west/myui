import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox as AriaCheckbox, Label, } from 'react-aria-components';
import classes from './Checkbox.module.css';
export function Checkbox({ label, className, size, scale, ...props }) {
    const clnames = className ? `${className} ${classes.container}` : classes.container;
    const style = {};
    if (size)
        style['--s'] = size;
    if (scale)
        style['--x'] = scale.toString();
    return (_jsx(AriaCheckbox, { className: clnames, ...props, style: Object.keys(style).length > 0 ? style : undefined, children: ({ isIndeterminate }) => _jsxs(_Fragment, { children: [_jsx("div", { className: classes.checkbox, children: _jsx("svg", { viewBox: "0 0 18 18", "aria-hidden": "true", width: "100%", height: "100%", children: isIndeterminate
                            ? _jsx("rect", { x: 1, y: 7.5, width: 15, height: 3 })
                            : _jsx("polyline", { points: "2,9 8,14 15,4" }) }) }), label && _jsx(Label, { className: classes.label, children: label })] }) }));
}
export default Checkbox;
