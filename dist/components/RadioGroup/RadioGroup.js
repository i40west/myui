import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { RadioGroup as AriaRadioGroup, Radio, Label, Text, FieldError, } from 'react-aria-components';
import classes from './RadioGroup.module.css';
export function RadioGroup({ label, description, errorMessage, children, className, size, scale, ...props }) {
    const clnames = className ? `${className} ${classes.container}` : classes.container;
    const style = {};
    if (size)
        style['--s'] = size;
    if (scale)
        style['--x'] = scale.toString();
    return (_jsxs(AriaRadioGroup, { className: clnames, ...props, style: Object.keys(style).length > 0 ? style : undefined, children: [label && _jsx(Label, { className: classes.label, children: label }), _jsx("div", { className: classes.childContainer, children: children }), description && _jsx(Text, { slot: "description", className: classes.description, children: description }), _jsx(FieldError, { className: classes.error, children: errorMessage })] }));
}
export function RadioGroupList({ items }) {
    return (_jsx(_Fragment, { children: items.map((item, index) => (_jsx(Radio, { value: item, children: item }, index))) }));
}
export default RadioGroup;
