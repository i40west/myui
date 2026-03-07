import * as React from 'react';
import {
	Focusable,
	OverlayArrow,
	Tooltip as AriaTooltip,
	TooltipTrigger as AriaTooltipTrigger,
} from 'react-aria-components';
import classes from './Tooltip.module.css';

import type { TooltipProps as AriaTooltipProps, TooltipTriggerComponentProps } from 'react-aria-components';

type TooltipProps = Omit<AriaTooltipProps, 'children'> & (
| { children: React.ReactNode; content?: never }
| { children?: never; content: React.ReactNode }
);

export function Tooltip({ children, content, ...props }: TooltipProps) {
	const displayContent = children ?? content;
	return (
		<AriaTooltip className={classes.tooltip} {...props}>
			<OverlayArrow className={classes.arrow}>
				<svg width={8} height={8} viewBox="0 0 8 8">
					<path d="M0 0 L4 4 L8 0" />
				</svg>
			</OverlayArrow>
			{displayContent}
		</AriaTooltip>
	);
}

type TooltipTriggerProps = TooltipTriggerComponentProps & {
	content: React.ReactNode;
};

export function TooltipTrigger({ children, content, delay = 500, ...props }: TooltipTriggerProps) {
	const trigger = React.isValidElement(children) && typeof children.type === 'string'
		? <Focusable>{children as any}</Focusable>
		: children;

	return (
		<AriaTooltipTrigger delay={delay} {...props}>
			{trigger}
			<Tooltip>{content}</Tooltip>
		</AriaTooltipTrigger>
	);
}

export default Tooltip;
