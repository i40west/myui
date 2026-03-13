import type { TextFieldProps as AriaTextFieldProps, ValidationResult } from 'react-aria-components';
interface TextFieldProps extends AriaTextFieldProps {
    label?: string;
    description?: string;
    placeholder?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    className?: string;
    width?: string;
    scale?: number;
    submitButton?: boolean;
    rounded?: boolean;
}
export declare function TextField({ label, description, placeholder, errorMessage, className, width, scale, submitButton, rounded, ...rest }: TextFieldProps): import("react/jsx-runtime").JSX.Element;
export default TextField;
//# sourceMappingURL=TextField.d.ts.map