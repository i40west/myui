import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Popover as AriaPopover, OverlayArrow, Dialog, DialogTrigger, Pressable, } from 'react-aria-components';
import { Button } from '../Button/index.js';
import classes from './Popover.module.css';
export function Popover({ children, className, showArrow = true, width, scale, ...props }) {
    const clnames = className ? `${className} ${classes.popover}` : classes.popover;
    const arrowSize = 10 * (scale || 1);
    const style = {};
    if (width)
        style['--w'] = width;
    if (scale)
        style['--x'] = scale.toString();
    if (showArrow)
        style['--a'] = `${arrowSize}px`;
    return (_jsxs(AriaPopover, { className: clnames, ...props, style: Object.keys(style).length > 0 ? style : undefined, children: [showArrow && (_jsx(OverlayArrow, { className: classes.arrow, children: _jsx("svg", { width: arrowSize, height: arrowSize, viewBox: "0 0 10 10", children: _jsx("path", { "vector-effect": "non-scaling-stroke", d: "M0 0 L5 8 L10 0" }) }) })), _jsx(Dialog, { className: classes.dialog, children: children })] }));
}
export function PopoverTrigger({ buttonContent, trigger, children, scale, ...props }) {
    // Validate that only one trigger method is provided
    if (buttonContent && trigger) {
        console.warn('PopoverTrigger: Both buttonContent and trigger props provided. Using trigger.');
    }
    // Determine which trigger element to use
    let triggerElement;
    if (trigger) {
        // Always wrap custom triggers with Pressable to ensure they work correctly
        // Pressable will handle pressable elements (button, a, etc.) appropriately
        triggerElement = (_jsx(Pressable, { children: trigger }));
    }
    else {
        // Fallback to default Button with buttonContent
        triggerElement = _jsx(Button, { scale: scale, children: buttonContent });
    }
    return (_jsxs(DialogTrigger, { children: [triggerElement, _jsx(Popover, { scale: scale, ...props, children: children })] }));
}
export default Popover;
