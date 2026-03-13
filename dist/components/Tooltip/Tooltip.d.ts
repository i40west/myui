import * as React from 'react';
import type { TooltipProps as AriaTooltipProps, TooltipTriggerComponentProps } from 'react-aria-components';
type TooltipProps = Omit<AriaTooltipProps, 'children'> & ({
    children: React.ReactNode;
    content?: never;
} | {
    children?: never;
    content: React.ReactNode;
});
export declare function Tooltip({ children, content, ...props }: TooltipProps): import("react/jsx-runtime").JSX.Element;
type TooltipTriggerProps = TooltipTriggerComponentProps & {
    content: React.ReactNode;
};
export declare function TooltipTrigger({ children, content, delay, ...props }: TooltipTriggerProps): import("react/jsx-runtime").JSX.Element;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map