import {
	Popover as AriaPopover,
	OverlayArrow,
	Dialog,
	DialogTrigger,
	Pressable,
} from 'react-aria-components';
import { Button } from '../Button/index.js';
import classes from './Popover.module.css';

import type { PopoverProps as AriaPopoverProps } from 'react-aria-components';
import type { ReactNode, ReactElement } from 'react';

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

export function Popover({
	children,
	className,
	showArrow = true,
	width,
	scale,
	...props
}: PopoverProps) {
	const clnames = className ? `${className} ${classes.popover}` : classes.popover;

	const arrowSize = 10 * (scale || 1);

	const style: React.CSSProperties = {};
	if (width) style['--w'] = width;
	if (scale) style['--x'] = scale.toString();
	if (showArrow) style['--a'] = `${arrowSize}px`;

	return (
		<AriaPopover
			className={clnames}
			{...props}
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			{showArrow && (
				<OverlayArrow className={classes.arrow}>
					<svg width={arrowSize} height={arrowSize} viewBox="0 0 10 10">
						<path vector-effect="non-scaling-stroke" d="M0 0 L5 8 L10 0" />
					</svg>
				</OverlayArrow>
			)}
			<Dialog className={classes.dialog}>
				{children}
			</Dialog>
		</AriaPopover>
	);
}

export function PopoverTrigger({
	buttonContent,
	trigger,
	children,
	scale,
	...props
}: PopoverTriggerProps) {
	// Validate that only one trigger method is provided
	if (buttonContent && trigger) {
		console.warn('PopoverTrigger: Both buttonContent and trigger props provided. Using trigger.');
	}

	// Determine which trigger element to use
	let triggerElement: ReactElement;
	if (trigger) {
		// Always wrap custom triggers with Pressable to ensure they work correctly
		// Pressable will handle pressable elements (button, a, etc.) appropriately
		triggerElement = (
			<Pressable>
				{trigger as any}
			</Pressable>
		);
	} else {
		// Fallback to default Button with buttonContent
		triggerElement = <Button scale={scale}>{buttonContent}</Button>;
	}

	return (
		<DialogTrigger>
			{triggerElement}
			<Popover scale={scale} {...props}>
				{children}
			</Popover>
		</DialogTrigger>
	);
}
export default Popover;
