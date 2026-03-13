import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch as AriaSwitch, Label, } from 'react-aria-components';
import classes from './Switch.module.css';
export function Switch({ label, className, size, scale, ...props }) {
    const clnames = className ? `${className} ${classes.container}` : classes.container;
    const style = {};
    if (size)
        style['--s'] = size;
    if (scale)
        style['--x'] = scale.toString();
    return (_jsxs(AriaSwitch, { className: clnames, ...props, style: Object.keys(style).length > 0 ? style : undefined, children: [_jsx("div", { className: classes.switch, children: _jsx("div", { className: classes.indicator }) }), label && _jsx(Label, { className: classes.label, children: label })] }));
}
export default Switch;
