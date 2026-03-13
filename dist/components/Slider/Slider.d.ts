import type { SliderProps as AriaSliderProps } from 'react-aria-components';
interface SliderProps<T extends number | number[]> extends AriaSliderProps<T> {
    label?: string;
    description?: string;
    className?: string;
    width?: string;
    scale?: number;
    thumbLabels?: string[];
    showOutput?: boolean;
    name?: string;
}
export declare function Slider<T extends number | number[]>({ label, description, className, width, scale, thumbLabels, showOutput, name, ...rest }: SliderProps<T>): import("react/jsx-runtime").JSX.Element;
export default Slider;
//# sourceMappingURL=Slider.d.ts.map