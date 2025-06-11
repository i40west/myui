import { ToggleButtonGroup as AriaToggleButtonGroup, ToggleButton as AriaToggleButton } from 'react-aria-components';
import classes from './ToggleButtonGroup.module.css';

import type {
	ToggleButtonGroupProps as AriaToggleButtonGroupProps,
	ToggleButtonProps as AriaToggleButtonProps,
} from 'react-aria-components';

interface ToggleButtonGroupProps extends AriaToggleButtonGroupProps {
	className?: string;
	scale?: number;
}

interface ToggleButtonProps extends AriaToggleButtonProps {
	className?: string;
	scale?: number;
}

export default function ToggleButtonGroup({ className, scale, children, ...rest }: ToggleButtonGroupProps) {
	const clnames = className ? `${className} ${classes.group}` : classes.group;

	const style: React.CSSProperties = {};
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaToggleButtonGroup
			className={clnames}
			{...rest}
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			{children}
		</AriaToggleButtonGroup>
	);
}

export function ToggleButton({ className, scale, children, ...rest }: ToggleButtonProps) {
	const clnames = className ? `${className} ${classes.button}` : classes.button;

	const style: React.CSSProperties = {};
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaToggleButton
			className={clnames}
			{...rest}
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			{children}
		</AriaToggleButton>
	);
}

export function ToggleButtonGroupExample(props: ToggleButtonGroupProps) {
	return (
		<ToggleButtonGroup {...props}>
			<ToggleButton id="option1">Option 1</ToggleButton>
			<ToggleButton id="option2">Option 2</ToggleButton>
			<ToggleButton id="option3">Option 3</ToggleButton>
		</ToggleButtonGroup>
	);
}
