import {
	TextField as AriaTextField,
	Label,
	TextArea as AriaTextArea,
	FieldError,
	Text,
} from 'react-aria-components';
import { useEffect, useRef } from 'react';
import classes from './TextArea.module.css';

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

function useTextAreaAutoHeight(scale: number = 1.0) {
	const ref = useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		const textarea = ref.current;
		if (!textarea) return;

		const adjustHeight = () => {
			// Reset height temporarily to get the correct scrollHeight
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		};

		adjustHeight();
		textarea.addEventListener('input', adjustHeight);
		return () => {
			textarea.removeEventListener('input', adjustHeight);
		};
	}, [scale]);

	return ref;
}

export function TextArea({ label, description, errorMessage, className, width, height, scale, ...props }: TextAreaProps) {
	const clnames = className ? `${className} ${classes.container}` : classes.container;
	const ref = useTextAreaAutoHeight(scale);
	return (
		<AriaTextField
			className={clnames}
			{...props}
			style={{
				...(width && {'--w': width}),
				...(height && {'--h': height}), // height actually sets min-height
				...(scale && {'--x': scale.toString()}),
			} as React.CSSProperties}
		>
			<Label className={classes.label}>{label}</Label>
			{description && <Text slot="description" className={classes.description}>{description}</Text>}
			<AriaTextArea className={classes.textarea} ref={ref} />
			<FieldError className={classes.error}>{errorMessage}</FieldError>
		</AriaTextField>
	);
}

export default TextArea;
