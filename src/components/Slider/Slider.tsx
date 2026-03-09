import {
	Slider as AriaSlider,
	SliderOutput,
	SliderTrack,
	SliderThumb,
	Label,
	Text,
} from 'react-aria-components';
import classes from './Slider.module.css';

import type { SliderProps as AriaSliderProps } from 'react-aria-components';

interface SliderProps<T extends number | number[]> extends AriaSliderProps<T> {
	label?: string;
	description?: string;
	className?: string;
	width?: string;
	scale?: number;
	thumbLabels?: string[];
	showOutput?: boolean;
	name?: string;
}

export function Slider<T extends number | number[]>({
	label,
	description,
	className,
	width,
	scale,
	thumbLabels,
	showOutput = true,
	name,
	...rest
}: SliderProps<T>) {
	const clnames = className ? `${classes.container} ${className}` : classes.container;

	const style: React.CSSProperties = {};
	if (width) style['--w'] = width;
	if (scale) style['--scale'] = scale.toString();

	return (
		<AriaSlider
			className={clnames}
			{...rest}
			style={Object.keys(style).length > 0 ? style : undefined}
		>
			{(label || showOutput) && (
				<div className={classes.labelContainer}>
					{label && <Label className={classes.label}>{label}</Label>}
					{showOutput && (
						<SliderOutput className={classes.output}>
							{({ state }) => {
								const values = state.values.map((_, i) => state.getThumbValueLabel(i));
								return values.length > 1 ? values.join(' – ') : values[0];
							}}
						</SliderOutput>
					)}
				</div>
			)}
			{description && <Text slot="description" className={classes.description}>{description}</Text>}
			<SliderTrack className={classes.track}>
				{({ state }) => (
					<>
						<div className={classes.trackBackground} />
						{state.orientation === 'horizontal' ? (
							<div
								className={classes.trackFill}
								style={{
									width: state.values.length === 1
										? `${state.getThumbPercent(0) * 100}%`
										: `${(state.getThumbPercent(state.values.length - 1) - state.getThumbPercent(0)) * 100}%`,
									left: state.values.length > 1 ? `${state.getThumbPercent(0) * 100}%` : undefined,
								}}
							/>
						) : (
							<div
								className={classes.trackFill}
								style={{
									height: state.values.length === 1
										? `${state.getThumbPercent(0) * 100}%`
										: `${(state.getThumbPercent(state.values.length - 1) - state.getThumbPercent(0)) * 100}%`,
									bottom: state.values.length > 1 ? `${state.getThumbPercent(0) * 100}%` : undefined,
								}}
							/>
						)}
						{state.values.map((_, i) => (
							<SliderThumb
								key={i}
								index={i}
								aria-label={thumbLabels?.[i]}
								name={name}
								className={({ isDragging, isFocusVisible }) =>
									`${classes.thumb} ${isDragging ? classes.dragging : ''} ${isFocusVisible ? classes.focused : ''}`
								}
							/>
						))}
					</>
				)}
			</SliderTrack>
		</AriaSlider>
	);
}

export default Slider;
