import type { TextFieldProps as AriaTextFieldProps, ValidationResult } from 'react-aria-components';
interface TextAreaProps extends AriaTextFieldProps {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    className?: string;
    width?: string;
    height?: string;
    placeholder?: string;
    scale?: number;
}
export declare function TextArea({ label, description, errorMessage, className, width, height, scale, ...props }: TextAreaProps): import("react/jsx-runtime").JSX.Element;
export default TextArea;
//# sourceMappingURL=TextArea.d.ts.map