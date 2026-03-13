import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Focusable, OverlayArrow, Tooltip as AriaTooltip, TooltipTrigger as AriaTooltipTrigger, } from 'react-aria-components';
import classes from './Tooltip.module.css';
export function Tooltip({ children, content, ...props }) {
    const displayContent = children ?? content;
    return (_jsxs(AriaTooltip, { className: classes.tooltip, ...props, children: [_jsx(OverlayArrow, { className: classes.arrow, children: _jsx("svg", { width: 8, height: 8, viewBox: "0 0 8 8", children: _jsx("path", { d: "M0 0 L4 4 L8 0" }) }) }), displayContent] }));
}
export function TooltipTrigger({ children, content, delay = 500, ...props }) {
    const trigger = React.isValidElement(children) && typeof children.type === 'string'
        ? _jsx(Focusable, { children: children })
        : children;
    return (_jsxs(AriaTooltipTrigger, { delay: delay, ...props, children: [trigger, _jsx(Tooltip, { children: content })] }));
}
export default Tooltip;
