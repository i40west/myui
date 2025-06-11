import {
	RadioGroup as AriaRadioGroup,
	Radio,
	Label,
	Text,
	FieldError,
} from 'react-aria-components';
import classes from './RadioGroup.module.css';

import type { RadioGroupProps as AriaRadioGroupProps, ValidationResult } from 'react-aria-components';

interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children' | 'orientation'> {
	children?: React.ReactNode,
	orientation?: 'horizontal' | 'vertical', // so storybook uses a selector
	label?: string,
	description?: string,
	errorMessage?: string | ((validation: ValidationResult) => string)
	size?: string,
	scale?: number,
	className?: string,
}

export function RadioGroup({
	label,
	description,
	errorMessage,
	children,
	className,
	size,
	scale,
	...props
}: RadioGroupProps) {
	const clnames = className ? `${className} ${classes.container}` : classes.container;

	const style: React.CSSProperties = {};
	if (size) style['--s'] = size;
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaRadioGroup
			className={clnames}
			{...props}
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			{ label && <Label className={classes.label}>{label}</Label> }
			<div className={classes.childContainer}>
				{children}
			</div>
			{ description && <Text slot="description" className={classes.description}>{description}</Text> }
			<FieldError className={classes.error}>{errorMessage}</FieldError>
		</AriaRadioGroup>
	);
}

export function RadioGroupList({ items }: { items: string[] }) {
	return (
		<>
			{items.map((item, index) => (
				<Radio key={index} value={item}>{item}</Radio>
			))}
		</>
	);
}

export default RadioGroup;
