import type { ToggleButtonGroupProps as AriaToggleButtonGroupProps, ToggleButtonProps as AriaToggleButtonProps } from 'react-aria-components';
interface ToggleButtonGroupProps extends AriaToggleButtonGroupProps {
    className?: string;
    scale?: number;
}
interface ToggleButtonProps extends AriaToggleButtonProps {
    className?: string;
    scale?: number;
}
export default function ToggleButtonGroup({ className, scale, children, ...rest }: ToggleButtonGroupProps): import("react/jsx-runtime").JSX.Element;
export declare function ToggleButton({ className, scale, children, ...rest }: ToggleButtonProps): import("react/jsx-runtime").JSX.Element;
export declare function ToggleButtonGroupExample(props: ToggleButtonGroupProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ToggleButtonGroup.d.ts.map