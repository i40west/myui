import type { PopoverProps as AriaPopoverProps } from 'react-aria-components';
import type { ReactNode } from 'react';
interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
    children: ReactNode;
    className?: string;
    showArrow?: boolean;
    width?: string;
    scale?: number;
}
interface PopoverTriggerProps extends Omit<PopoverProps, 'trigger'> {
    buttonContent?: ReactNode;
    trigger?: ReactNode;
    children: ReactNode;
    scale?: number;
}
export declare function Popover({ children, className, showArrow, width, scale, ...props }: PopoverProps): import("react/jsx-runtime").JSX.Element;
export declare function PopoverTrigger({ buttonContent, trigger, children, scale, ...props }: PopoverTriggerProps): import("react/jsx-runtime").JSX.Element;
export default Popover;
//# sourceMappingURL=Popover.d.ts.map