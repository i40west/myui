import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Button as AriaButton, ButtonContext, useContextProps } from 'react-aria-components';
import { TooltipTrigger } from '../Tooltip/index.js';
import classes from './Button.module.css';
import { forwardRef } from 'react';
export const Button = forwardRef(function Button(props, ref) {
    // Merge local props with context props
    [props, ref] = useContextProps(props, ref, ButtonContext);
    const { children, tooltip, className, scale, square = false, ...rest } = props;
    let clnames = className ? `${className} ${classes.button}` : classes.button;
    if (square)
        clnames += ` ${classes.square}`;
    const style = {};
    if (scale)
        style['--x'] = scale.toString();
    return (_jsx(_Fragment, { children: tooltip ?
            _jsx(TooltipTrigger, { content: tooltip, children: _jsx(AriaButton, { ref: ref, className: clnames, ...rest, style: Object.keys(style).length > 0 ? style : undefined, children: children }) })
            :
                _jsx(AriaButton, { ref: ref, className: clnames, ...rest, style: Object.keys(style).length > 0 ? style : undefined, children: children }) }));
});
export function ButtonGroup({ children, className, scale, square = false, ...rest }) {
    return (_jsx("div", { className: `${classes.group} ${className || ''}`, ...rest, children: _jsx(ButtonContext.Provider, { value: { scale, square }, children: children }) }));
}
export default Button;
