import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import type { ReactElement, HTMLAttributes } from 'react';
interface ButtonProps extends AriaButtonProps {
    tooltip?: string;
    className?: string;
    scale?: number;
    square?: boolean;
}
interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement<typeof Button> | ReactElement<typeof Button>[];
    scale?: number;
    square?: boolean;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare function ButtonGroup({ children, className, scale, square, ...rest }: ButtonGroupProps): import("react/jsx-runtime").JSX.Element;
export default Button;
//# sourceMappingURL=Button.d.ts.map