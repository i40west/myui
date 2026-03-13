import type { Color } from 'culori';
import type { ValidationResult } from 'react-aria-components';
interface ColorPickerProps {
    defaultValue?: Color | string;
    value?: Color | string;
    onChange?: (color: Color) => void;
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    className?: string;
    width?: string;
    scale?: number;
    wheelThickness?: number;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}
export declare function ColorPicker({ defaultValue, value, onChange, label, description, errorMessage, className, width, scale, wheelThickness, disabled, readOnly, name, onFocus, onBlur, }: ColorPickerProps): import("react/jsx-runtime").JSX.Element;
export default ColorPicker;
//# sourceMappingURL=ColorPicker.d.ts.map