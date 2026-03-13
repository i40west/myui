import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextField as AriaTextField, Label, TextArea as AriaTextArea, FieldError, Text, } from 'react-aria-components';
import { useEffect, useRef } from 'react';
import classes from './TextArea.module.css';
function useTextAreaAutoHeight(scale = 1.0) {
    const ref = useRef(null);
    useEffect(() => {
        const textarea = ref.current;
        if (!textarea)
            return;
        const adjustHeight = () => {
            // Reset height temporarily to get the correct scrollHeight
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        };
        adjustHeight();
        textarea.addEventListener('input', adjustHeight);
        return () => {
            textarea.removeEventListener('input', adjustHeight);
        };
    }, [scale]);
    return ref;
}
export function TextArea({ label, description, errorMessage, className, width, height, scale, ...props }) {
    const clnames = className ? `${className} ${classes.container}` : classes.container;
    const ref = useTextAreaAutoHeight(scale);
    return (_jsxs(AriaTextField, { className: clnames, ...props, style: {
            ...(width && { '--w': width }),
            ...(height && { '--h': height }), // height actually sets min-height
            ...(scale && { '--x': scale.toString() }),
        }, children: [_jsx(Label, { className: classes.label, children: label }), description && _jsx(Text, { slot: "description", className: classes.description, children: description }), _jsx(AriaTextArea, { className: classes.textarea, ref: ref }), _jsx(FieldError, { className: classes.error, children: errorMessage })] }));
}
export default TextArea;
