import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Slider as AriaSlider, SliderOutput, SliderTrack, SliderThumb, Label, Text, } from 'react-aria-components';
import classes from './Slider.module.css';
export function Slider({ label, description, className, width, scale, thumbLabels, showOutput = true, name, ...rest }) {
    const clnames = className ? `${classes.container} ${className}` : classes.container;
    const style = {};
    if (width)
        style['--w'] = width;
    if (scale)
        style['--scale'] = scale.toString();
    return (_jsxs(AriaSlider, { className: clnames, ...rest, style: Object.keys(style).length > 0 ? style : undefined, children: [(label || showOutput) && (_jsxs("div", { className: classes.labelContainer, children: [label && _jsx(Label, { className: classes.label, children: label }), showOutput && (_jsx(SliderOutput, { className: classes.output, children: ({ state }) => {
                            const values = state.values.map((_, i) => state.getThumbValueLabel(i));
                            return values.length > 1 ? values.join(' – ') : values[0];
                        } }))] })), description && _jsx(Text, { slot: "description", className: classes.description, children: description }), _jsx(SliderTrack, { className: classes.track, children: ({ state }) => (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.trackBackground }), state.orientation === 'horizontal' ? (_jsx("div", { className: classes.trackFill, style: {
                                width: state.values.length === 1
                                    ? `${state.getThumbPercent(0) * 100}%`
                                    : `${(state.getThumbPercent(state.values.length - 1) - state.getThumbPercent(0)) * 100}%`,
                                left: state.values.length > 1 ? `${state.getThumbPercent(0) * 100}%` : undefined,
                            } })) : (_jsx("div", { className: classes.trackFill, style: {
                                height: state.values.length === 1
                                    ? `${state.getThumbPercent(0) * 100}%`
                                    : `${(state.getThumbPercent(state.values.length - 1) - state.getThumbPercent(0)) * 100}%`,
                                bottom: state.values.length > 1 ? `${state.getThumbPercent(0) * 100}%` : undefined,
                            } })), state.values.map((_, i) => (_jsx(SliderThumb, { index: i, "aria-label": thumbLabels?.[i], name: name, className: ({ isDragging, isFocusVisible }) => `${classes.thumb} ${isDragging ? classes.dragging : ''} ${isFocusVisible ? classes.focused : ''}` }, i)))] })) })] }));
}
export default Slider;
