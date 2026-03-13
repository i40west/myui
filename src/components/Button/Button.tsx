import { Button as AriaButton, ButtonContext, useContextProps } from 'react-aria-components';
import { TooltipTrigger } from '../Tooltip/index.js';
import classes from './Button.module.css';

import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import type { ReactElement, HTMLAttributes, ForwardedRef } from 'react';
import { forwardRef } from 'react';

interface ButtonProps extends AriaButtonProps {
	tooltip?: string;
	className?: string;
	scale?: number;
	square?: boolean;
}

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactElement<typeof Button> | ReactElement<typeof Button>[];
	scale?: number;
	square?: boolean;
}

export const Button = forwardRef(function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
	// Merge local props with context props
	[props, ref] = useContextProps(props, ref, ButtonContext);

	const { children, tooltip, className, scale, square = false, ...rest } = props;
	let clnames = className ? `${className} ${classes.button}` : classes.button;
	if (square) clnames += ` ${classes.square}`;

	const style: React.CSSProperties = {};
	if (scale) style['--x'] = scale.toString();

	return (
		<>
			{ tooltip ?
				<TooltipTrigger content={tooltip}>
					<AriaButton
						ref={ref}
						className={clnames}
						{...rest}
						style={Object.keys(style).length > 0 ? style : undefined}
					>
						{children}
					</AriaButton>
				</TooltipTrigger>
				:
				<AriaButton
					ref={ref}
					className={clnames}
					{...rest}
					style={Object.keys(style).length > 0 ? style : undefined}
				>
					{children}
				</AriaButton>
			}
		</>
	);
});

export function ButtonGroup({ children, className, scale, square = false, ...rest }: ButtonGroupProps) {
	return (
		<div className={`${classes.group} ${className || ''}`} {...rest}>
			{/* @ts-ignore */}
			<ButtonContext.Provider value={{ scale, square }}>
				{children}
			</ButtonContext.Provider>
		</div>
	);
}

export default Button;
