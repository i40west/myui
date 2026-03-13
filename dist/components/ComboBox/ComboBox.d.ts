import React from 'react';
import type { ComboBoxProps as AriaComboBoxProps, ListBoxItemProps, ValidationResult } from 'react-aria-components';
interface ComboBoxProps<T extends object> extends Omit<AriaComboBoxProps<T>, 'children'> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    children: React.ReactNode | ((item: T) => React.ReactNode);
    width?: string;
    className?: string;
    clearButton?: boolean;
    rounded?: boolean;
    scale?: number;
}
export declare function ComboBox<T extends object>({ label, description, errorMessage, children, width, className, clearButton, rounded, scale, ...props }: ComboBoxProps<T>): import("react/jsx-runtime").JSX.Element;
export declare function ComboBoxItem({ children, ...props }: ListBoxItemProps): import("react/jsx-runtime").JSX.Element;
export declare function ComboBoxItemList({ items }: {
    items: string[];
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ComboBox.d.ts.map