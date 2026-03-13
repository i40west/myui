import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState, useCallback } from 'react';
import { Label, Text, FieldError } from 'react-aria-components';
import { TextField } from '../TextField/index.js';
import * as culori from 'culori';
import classes from './ColorPicker.module.css';
function formatLuminanceInput(value) {
    return value.toFixed(3);
}
function formatChromaInput(value) {
    return value.toFixed(3);
}
function formatHueInput(value) {
    return Math.round(value || 0).toString();
}
function normalizeHue(value) {
    return ((value % 360) + 360) % 360;
}
export function ColorPicker({ defaultValue, value, onChange, label, description, errorMessage, className, width, scale = 1, wheelThickness = 40, disabled = false, readOnly = false, name, onFocus, onBlur, }) {
    const isP3Display = typeof window !== 'undefined' && window.matchMedia('(color-gamut: p3)').matches;
    const [internalColor, setInternalColor] = useState(() => {
        const initial = value ?? defaultValue ?? 'oklch(0.7 0.15 0)';
        const parsed = typeof initial === 'string' ? culori.parse(initial) : initial;
        return culori.oklch(parsed || { mode: 'oklch', l: 0.7, c: 0.15, h: 0 });
    });
    const [isDragging, setIsDragging] = useState(null);
    const [announcement, setAnnouncement] = useState('');
    const containerRef = useRef(null);
    const wheelRef = useRef(null);
    const squareRef = useRef(null);
    const parsedValue = value !== undefined
        ? (typeof value === 'string' ? culori.parse(value) : value)
        : null;
    const currentColor = parsedValue ? culori.oklch(parsedValue) : internalColor;
    const [editingInput, setEditingInput] = useState(null);
    const [editingInputValue, setEditingInputValue] = useState('');
    const updateColor = useCallback((newColor, source) => {
        if (!disabled && !readOnly) {
            if (value === undefined) {
                setInternalColor(newColor);
            }
            onChange?.(newColor);
            // Announce color changes for screen readers
            const l = Math.round(newColor.l * 100);
            const c = Math.round(newColor.c * 100);
            const h = Math.round(newColor.h || 0);
            let message = '';
            switch (source) {
                case 'wheel':
                    message = `Hue changed to ${h} degrees`;
                    break;
                case 'square':
                    message = `Luminance ${l}%, Chroma ${c}%`;
                    break;
                case 'input':
                    message = `Color updated: Luminance ${l}%, Chroma ${c}%, Hue ${h} degrees`;
                    break;
                default:
                    message = `Color changed`;
            }
            setAnnouncement(message);
        }
    }, [disabled, readOnly, onChange, value]);
    const handleWheelInteraction = useCallback((event) => {
        if (disabled || readOnly || !wheelRef.current)
            return;
        const rect = wheelRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const outerRadius = rect.width / 2;
        const innerRadius = outerRadius - wheelThickness * scale;
        if (distance >= innerRadius && distance <= outerRadius) {
            // atan2 gives: 0° at right, 90° at bottom, ±180° at left, -90° at top
            // With "from -90deg", gradient shows: hue 0 at top, hue 90 at right, etc.
            // So we need to add 90° to convert from atan2 to hue
            const angle = Math.atan2(dy, dx);
            const hue = ((angle * 180 / Math.PI) + 90 + 360) % 360;
            updateColor({ ...currentColor, h: hue }, 'wheel');
        }
    }, [disabled, readOnly, wheelThickness, scale, currentColor, updateColor]);
    const handleSquareInteraction = useCallback((event) => {
        if (disabled || readOnly || !squareRef.current)
            return;
        const rect = squareRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
        const chroma = x * 0.4;
        const luminance = 1 - y;
        updateColor({ ...currentColor, l: luminance, c: chroma }, 'square');
    }, [disabled, readOnly, currentColor, updateColor]);
    const handleMouseDown = useCallback((area) => (event) => {
        if (disabled || readOnly)
            return;
        event.preventDefault();
        setIsDragging(area);
        if (area === 'wheel') {
            handleWheelInteraction(event);
        }
        else {
            handleSquareInteraction(event);
        }
    }, [disabled, readOnly, handleWheelInteraction, handleSquareInteraction]);
    const handleMouseMove = useCallback((event) => {
        if (!isDragging)
            return;
        const syntheticEvent = {
            clientX: event.clientX,
            clientY: event.clientY,
        };
        if (isDragging === 'wheel') {
            handleWheelInteraction(syntheticEvent);
        }
        else {
            handleSquareInteraction(syntheticEvent);
        }
    }, [isDragging, handleWheelInteraction, handleSquareInteraction]);
    const handleMouseUp = useCallback(() => {
        setIsDragging(null);
    }, []);
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);
    const handleLuminanceChange = useCallback((inputValue) => {
        setEditingInputValue(inputValue);
        const parsed = Number.parseFloat(inputValue);
        if (!Number.isFinite(parsed)) {
            return;
        }
        const l = Math.max(0, Math.min(1, parsed));
        updateColor({ ...currentColor, l }, 'input');
    }, [currentColor, updateColor]);
    const handleChromaChange = useCallback((inputValue) => {
        setEditingInputValue(inputValue);
        const parsed = Number.parseFloat(inputValue);
        if (!Number.isFinite(parsed)) {
            return;
        }
        const c = Math.max(0, Math.min(0.4, parsed));
        updateColor({ ...currentColor, c }, 'input');
    }, [currentColor, updateColor]);
    const handleHueChange = useCallback((inputValue) => {
        setEditingInputValue(inputValue);
        const parsed = Number.parseFloat(inputValue);
        if (!Number.isFinite(parsed)) {
            return;
        }
        const h = normalizeHue(parsed);
        updateColor({ ...currentColor, h }, 'input');
    }, [currentColor, updateColor]);
    const handleInputFocus = useCallback((inputKey) => () => {
        setEditingInput(inputKey);
        if (inputKey === 'l') {
            setEditingInputValue(formatLuminanceInput(currentColor.l));
        }
        else if (inputKey === 'c') {
            setEditingInputValue(formatChromaInput(currentColor.c));
        }
        else {
            setEditingInputValue(formatHueInput(currentColor.h));
        }
    }, [currentColor.l, currentColor.c, currentColor.h]);
    const handleInputBlur = useCallback(() => {
        setEditingInput(null);
        setEditingInputValue('');
    }, []);
    const luminanceInputValue = editingInput === 'l'
        ? editingInputValue
        : formatLuminanceInput(currentColor.l);
    const chromaInputValue = editingInput === 'c'
        ? editingInputValue
        : formatChromaInput(currentColor.c);
    const hueInputValue = editingInput === 'h'
        ? editingInputValue
        : formatHueInput(currentColor.h);
    const wheelSize = 200 * scale;
    const wheelRadius = wheelSize / 2;
    const innerRadius = wheelRadius - (wheelThickness * scale);
    // Square size: diagonal = inner diameter, so side = inner diameter / sqrt(2)
    const squareSize = (innerRadius * 2) / Math.sqrt(2);
    // Convert hue to angle for positioning
    // With "from -90deg", hue 0 is at top (-90°), so subtract 90°
    const wheelThumbAngle = ((currentColor.h || 0) - 90) * Math.PI / 180;
    const wheelThumbRadius = wheelRadius - (wheelThickness * scale / 2);
    const wheelThumbX = Math.cos(wheelThumbAngle) * wheelThumbRadius;
    const wheelThumbY = Math.sin(wheelThumbAngle) * wheelThumbRadius;
    const squareThumbX = (currentColor.c / 0.4) * 100;
    const squareThumbY = (1 - currentColor.l) * 100;
    const containerClass = [
        classes.container,
        disabled && classes.disabled,
        className,
    ].filter(Boolean).join(' ');
    const style = {};
    if (width)
        style['--w'] = width;
    if (scale !== 1)
        style['--x'] = scale.toString();
    const squareStyle = {
        '--h': currentColor.h || 0,
        '--c': currentColor.c,
        '--l': currentColor.l,
    };
    // Generate conic gradient stops for the wheel
    const wheelStops = [];
    const stopCount = 36; // Fewer stops for better performance
    for (let i = 0; i <= stopCount; i++) {
        const position = (i / stopCount) * 360;
        // Since gradient rotates -90°, offset hues by -90°
        const hue = (position - 90 + 360) % 360;
        const color = culori.oklch({ mode: 'oklch', l: currentColor.l, c: currentColor.c, h: hue });
        const clampedColor = culori.clampChroma(color);
        const cssColor = culori.formatCss(clampedColor);
        wheelStops.push(`${cssColor} ${position}deg`);
    }
    const wheelStyle = {
        '--wheel-gradient': `conic-gradient(from -90deg, ${wheelStops.join(', ')})`,
        '--wheel-thickness': `${wheelThickness}px`,
    };
    return (_jsxs("div", { ref: containerRef, className: containerClass, style: Object.keys(style).length > 0 ? style : undefined, onFocus: onFocus, onBlur: onBlur, children: [label && _jsx(Label, { className: classes.label, children: label }), description && _jsx(Text, { slot: "description", className: classes.description, children: description }), _jsxs("div", { className: classes.picker, children: [_jsx("div", { ref: wheelRef, className: classes.wheel, style: wheelStyle, onMouseDown: handleMouseDown('wheel'), role: "slider", "aria-label": "Hue selection wheel", "aria-valuemin": 0, "aria-valuemax": 360, "aria-valuenow": Math.round(currentColor.h || 0), tabIndex: -1, children: _jsx("div", { className: classes.wheelThumb, style: {
                                transform: `translate(${wheelThumbX}px, ${wheelThumbY}px)`,
                            } }) }), _jsxs("div", { ref: squareRef, className: classes.square, style: {
                            ...squareStyle,
                            width: `${squareSize}px`,
                            height: `${squareSize}px`,
                        }, onMouseDown: handleMouseDown('square'), role: "slider", "aria-label": "Chroma and luminance selection", tabIndex: -1, children: [_jsx("div", { className: classes.squareGradient }), _jsx("div", { className: classes.squareThumb, style: {
                                    left: `${squareThumbX}%`,
                                    top: `${squareThumbY}%`,
                                } })] })] }), _jsxs("div", { className: classes.inputs, children: [_jsx(TextField, { label: "L", value: luminanceInputValue, onChange: handleLuminanceChange, type: "number", onFocus: handleInputFocus('l'), onBlur: handleInputBlur, scale: scale, className: classes.inputField, width: "5ch" }), _jsx(TextField, { label: "C", value: chromaInputValue, onChange: handleChromaChange, type: "number", onFocus: handleInputFocus('c'), onBlur: handleInputBlur, scale: scale, className: classes.inputField, width: "5ch" }), _jsx(TextField, { label: "H", value: hueInputValue, onChange: handleHueChange, type: "number", onFocus: handleInputFocus('h'), onBlur: handleInputBlur, scale: scale, className: classes.inputField, width: "5ch" })] }), _jsxs("div", { className: classes.colorPreview, children: [_jsx("div", { className: classes.colorSwatch, style: { backgroundColor: culori.formatCss(culori.clampChroma(culori.rgb(currentColor), 'oklch', 'rgb')) }, title: "sRGB", children: _jsx("span", { className: classes.swatchLabel, children: "sRGB" }) }), _jsx("div", { className: classes.colorSwatch, style: { backgroundColor: culori.formatCss(culori.clampChroma(culori.rgb(currentColor), 'oklch', 'p3')) }, title: isP3Display ? 'Display P3' : 'sRGB', children: _jsx("span", { className: classes.swatchLabel, children: isP3Display ? 'P3' : 'sRGB' }) })] }), errorMessage && (_jsx(FieldError, { className: classes.error, children: typeof errorMessage === 'function' ? errorMessage({ validationDetails: {} }) : errorMessage })), name && (_jsx("input", { type: "hidden", name: name, value: culori.formatCss(currentColor) })), _jsx("div", { role: "status", "aria-live": "polite", "aria-atomic": "true", className: classes.srOnly, children: announcement })] }));
}
export default ColorPicker;
