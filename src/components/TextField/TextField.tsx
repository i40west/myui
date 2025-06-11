import {
	TextField as AriaTextField,
	Label,
	Input,
	FieldError,
	Text,
} from 'react-aria-components';
import { Button } from '../Button';
import classes from './TextField.module.css';

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

export function TextField({
	label,
	description,
	placeholder,
	errorMessage,
	className,
	width,
	scale,
	submitButton = false,
	rounded = false,
	...rest
}: TextFieldProps) {
	let clnames = className ? `${classes.container} ${className}` : classes.container;
	if (rounded) {
		clnames += ` ${classes.rounded}`;
	}

	const style: React.CSSProperties = {};
	if (width) style['--w'] = width;
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaTextField
			className={clnames}
			{...rest}
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			<Label className={classes.label}>{label}</Label>
			{description && <Text slot="description" className={classes.description}>{description}</Text>}
			<div className={classes.inputbox}>
				<Input className={classes.input} placeholder={placeholder} />
				{submitButton && (
					<Button className={classes.submit} slot={null} type="submit">
						<IconArrow />
					</Button>
				)}
			</div>
			<FieldError className={classes.error}>{errorMessage}</FieldError>
		</AriaTextField>
	);
}

export default TextField;

function IconArrow({ ...props }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" preserveAspectRatio="xMidYMax meet" {...props}>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" />
		</svg>
	);
}
