import type { RadioGroupProps as AriaRadioGroupProps, ValidationResult } from 'react-aria-components';
interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children' | 'orientation'> {
    children?: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    size?: string;
    scale?: number;
    className?: string;
}
export declare function RadioGroup({ label, description, errorMessage, children, className, size, scale, ...props }: RadioGroupProps): import("react/jsx-runtime").JSX.Element;
export declare function RadioGroupList({ items }: {
    items: string[];
}): import("react/jsx-runtime").JSX.Element;
export default RadioGroup;
//# sourceMappingURL=RadioGroup.d.ts.map