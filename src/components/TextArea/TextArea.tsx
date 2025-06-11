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
import type { RefObject } from 'react';

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

function useTextAreaAutoHeight(ref: RefObject<HTMLTextAreaElement | null>, scale: number = 1.0): void {
	const adjustHeight = () => {
		const textarea = ref?.current;
		if (!textarea) return;

		// Reset height temporarily to get the correct scrollHeight
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	};

	useEffect(() => {
		const textarea = ref?.current;
		if (!textarea) return;

		adjustHeight();
		textarea.addEventListener('input', adjustHeight);
		return () => {
			textarea.removeEventListener('input', adjustHeight);
		};
	}, [ref, scale]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function TextArea({ label, description, errorMessage, className, width, height, scale, ...props }: TextAreaProps) {
	const clnames = className ? `${className} ${classes.container}` : classes.container;
	const ref = useRef<HTMLTextAreaElement>(null);
	useTextAreaAutoHeight(ref, scale);
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
