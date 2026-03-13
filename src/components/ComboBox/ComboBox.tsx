import React, { useContext } from 'react';
import {
	ComboBox as AriaComboBox,
	ComboBoxStateContext,
	FieldError,
	Input,
	Label,
	ListBox,
	ListBoxItem,
	Popover,
	Text,
} from 'react-aria-components';
import { Button } from '../Button/index.js';
import classes from './ComboBox.module.css';

import type {
	ComboBoxProps as AriaComboBoxProps,
	ListBoxItemProps,
	ValidationResult,
} from 'react-aria-components';

interface ComboBoxProps<T extends object>
	extends Omit<AriaComboBoxProps<T>, 'children'> {
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

export function ComboBox<T extends object>(
	{ label, description, errorMessage, children, width, className, clearButton = false, rounded = false, scale, ...props }: ComboBoxProps<T>,
) {
	let clnames = className ? `${className} ${classes.container}` : classes.container;
	let popoverClass = classes.popover;
	if (rounded) {
		clnames += ` ${classes.rounded}`;
		popoverClass += ` ${classes.rounded}`;
	}
	if (clearButton) {
		popoverClass += ` ${classes.hasclear}`;
	}

	const style: React.CSSProperties = {};
	if (width) style['--w'] = width;
	if (scale) style['--x'] = scale.toString();
	const offset = 4 * (1 + 1.75 * ((scale || 1) - 1));

	return (
		<AriaComboBox
			className={clnames}
			menuTrigger="focus"
			{...props}
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			<Label className={classes.label}>{label}</Label>
			{description && <Text className={classes.description} slot="description">{description}</Text>}
			<div className={classes.inputbox} role="group">
				<Input className={classes.input} />
				{clearButton && <ComboBoxClearButton />}
			</div>
			<FieldError className={classes.error}>{errorMessage}</FieldError>
			<Popover
				className={popoverClass}
				offset={offset}
				style={Object.keys(style).length > 0 ? style : undefined}
			>
				<ListBox className={classes.listbox}>
					{children}
				</ListBox>
			</Popover>
		</AriaComboBox>
	);
}

export function ComboBoxItem({ children, ...props }: ListBoxItemProps) {
	return (
		<ListBoxItem
			{...props}
			className={({ isFocused, isSelected }) =>
				`${classes.item} ${isFocused ? classes.focused: ''} ${isSelected ? classes.selected: ''}`}
		>
			{children}
		</ListBoxItem>
	);
}

export function ComboBoxItemList({ items }: { items: string[] }) {
	return (
		<>
			{items.map((item, index) => (
				<ComboBoxItem key={index}>{item}</ComboBoxItem>
			))}
		</>
	);
}

function ComboBoxClearButton() {
	const state = useContext(ComboBoxStateContext);
	return (
		<Button
			slot={null} // Don't inherit default Button behavior from ComboBox.
			className={classes.clear}
			aria-label="Clear"
			onPress={() => state?.setSelectedKey(null)}>
			<IconX />
		</Button>
	);
}

function IconX({ width, height = '0.9em', ...rest }: React.SVGProps<SVGSVGElement>) {
	return (
		<svg {...width && { width: width }} height={height} viewBox="0 0 24 24" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
	);
}
