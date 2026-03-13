import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleButtonGroup as AriaToggleButtonGroup, ToggleButton as AriaToggleButton } from 'react-aria-components';
import classes from './ToggleButtonGroup.module.css';
export default function ToggleButtonGroup({ className, scale, children, ...rest }) {
    const clnames = className ? `${className} ${classes.group}` : classes.group;
    const style = {};
    if (scale)
        style['--x'] = scale.toString();
    return (_jsx(AriaToggleButtonGroup, { className: clnames, ...rest, style: Object.keys(style).length > 0 ? style : undefined, children: children }));
}
export function ToggleButton({ className, scale, children, ...rest }) {
    const clnames = className ? `${className} ${classes.button}` : classes.button;
    const style = {};
    if (scale)
        style['--x'] = scale.toString();
    return (_jsx(AriaToggleButton, { className: clnames, ...rest, style: Object.keys(style).length > 0 ? style : undefined, children: children }));
}
export function ToggleButtonGroupExample(props) {
    return (_jsxs(ToggleButtonGroup, { ...props, children: [_jsx(ToggleButton, { id: "option1", children: "Option 1" }), _jsx(ToggleButton, { id: "option2", children: "Option 2" }), _jsx(ToggleButton, { id: "option3", children: "Option 3" })] }));
}
