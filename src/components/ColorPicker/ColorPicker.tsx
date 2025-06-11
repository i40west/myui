import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Label, Text, FieldError } from 'react-aria-components';
import { TextField } from '../TextField';
import * as culori from 'culori';
import classes from './ColorPicker.module.css';

import type { Color } from 'culori';
import type { ValidationResult } from 'react-aria-components';

interface ColorPickerProps {
	defaultValue?: Color | string;
	value?: Color | string;
	onChange?: (color: Color) => void;

	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	className?: string;
	width?: string;
	scale?: number;

	wheelThickness?: number;
	disabled?: boolean;
	readOnly?: boolean;
	name?: string;

	onFocus?: () => void;
	onBlur?: () => void;
}

export function ColorPicker({
	defaultValue,
	value,
	onChange,
	label,
	description,
	errorMessage,
	className,
	width,
	scale = 1,
	wheelThickness = 40,
	disabled = false,
	readOnly = false,
	name,
	onFocus,
	onBlur,
}: ColorPickerProps) {
	const isP3Display = typeof window !== 'undefined' && window.matchMedia('(color-gamut: p3)').matches;

	const [internalColor, setInternalColor] = useState<culori.Oklch>(() => {
		const initial = value ?? defaultValue ?? 'oklch(0.7 0.15 0)';
		const parsed = typeof initial === 'string' ? culori.parse(initial) : initial;
		return culori.oklch(parsed || { mode: 'oklch', l: 0.7, c: 0.15, h: 0 });
	});

	const [isDragging, setIsDragging] = useState<'wheel' | 'square' | null>(null);
	const [announcement, setAnnouncement] = useState<string>('');

	const containerRef = useRef<HTMLDivElement>(null);
	const wheelRef = useRef<HTMLDivElement>(null);
	const squareRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (value !== undefined) {
			const parsed = typeof value === 'string' ? culori.parse(value) : value;
			if (parsed) {
				setInternalColor(culori.oklch(parsed));
			}
		}
	}, [value]);

	const updateColor = useCallback((newColor: culori.Oklch, source?: 'wheel' | 'square' | 'input') => {
		if (!disabled && !readOnly) {
			setInternalColor(newColor);
			onChange?.(newColor);

			// Announce color changes for screen readers
			const l = Math.round(newColor.l * 100);
			const c = Math.round(newColor.c * 100);
			const h = Math.round(newColor.h || 0);
			let message = '';

			switch (source) {
				case 'wheel':
					message = `Hue changed to ${h} degrees`;
					break;
				case 'square':
					message = `Luminance ${l}%, Chroma ${c}%`;
					break;
				case 'input':
					message = `Color updated: Luminance ${l}%, Chroma ${c}%, Hue ${h} degrees`;
					break;
				default:
					message = `Color changed`;
			}

			setAnnouncement(message);
		}
	}, [disabled, readOnly, onChange]);

	const handleWheelInteraction = useCallback((event: React.MouseEvent | React.TouchEvent) => {
		if (disabled || readOnly || !wheelRef.current) return;

		const rect = wheelRef.current.getBoundingClientRect();
		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

		const x = clientX - rect.left;
		const y = clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const dx = x - centerX;
		const dy = y - centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);

		const outerRadius = rect.width / 2;
		const innerRadius = outerRadius - wheelThickness * scale;

		if (distance >= innerRadius && distance <= outerRadius) {
			// atan2 gives: 0° at right, 90° at bottom, ±180° at left, -90° at top
			// With "from -90deg", gradient shows: hue 0 at top, hue 90 at right, etc.
			// So we need to add 90° to convert from atan2 to hue
			const angle = Math.atan2(dy, dx);
			const hue = ((angle * 180 / Math.PI) + 90 + 360) % 360;

			updateColor({ ...internalColor, h: hue }, 'wheel');
		}
	}, [disabled, readOnly, wheelThickness, scale, internalColor, updateColor]);

	const handleSquareInteraction = useCallback((event: React.MouseEvent | React.TouchEvent) => {
		if (disabled || readOnly || !squareRef.current) return;

		const rect = squareRef.current.getBoundingClientRect();
		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

		const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
		const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

		const chroma = x * 0.4;
		const luminance = 1 - y;

		updateColor({ ...internalColor, l: luminance, c: chroma }, 'square');
	}, [disabled, readOnly, internalColor, updateColor]);

	const handleMouseDown = useCallback((area: 'wheel' | 'square') => (event: React.MouseEvent) => {
		if (disabled || readOnly) return;

		event.preventDefault();
		setIsDragging(area);

		if (area === 'wheel') {
			handleWheelInteraction(event);
		} else {
			handleSquareInteraction(event);
		}
	}, [disabled, readOnly, handleWheelInteraction, handleSquareInteraction]);

	const handleMouseMove = useCallback((event: MouseEvent) => {
		if (!isDragging) return;

		const syntheticEvent = {
			clientX: event.clientX,
			clientY: event.clientY,
		} as React.MouseEvent;

		if (isDragging === 'wheel') {
			handleWheelInteraction(syntheticEvent);
		} else {
			handleSquareInteraction(syntheticEvent);
		}
	}, [isDragging, handleWheelInteraction, handleSquareInteraction]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(null);
	}, []);

	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}
	}, [isDragging, handleMouseMove, handleMouseUp]);

	const handleLuminanceChange = useCallback((inputValue: string) => {
		const l = Math.max(0, Math.min(1, parseFloat(inputValue) || 0));
		updateColor({ ...internalColor, l }, 'input');
	}, [internalColor, updateColor]);

	const handleChromaChange = useCallback((inputValue: string) => {
		const c = Math.max(0, Math.min(0.4, parseFloat(inputValue) || 0));
		updateColor({ ...internalColor, c }, 'input');
	}, [internalColor, updateColor]);

	const handleHueChange = useCallback((inputValue: string) => {
		const h = ((parseFloat(inputValue) || 0) + 360) % 360;
		updateColor({ ...internalColor, h }, 'input');
	}, [internalColor, updateColor]);

	const wheelSize = 200 * scale;
	const wheelRadius = wheelSize / 2;
	const innerRadius = wheelRadius - (wheelThickness * scale);
	// Square size: diagonal = inner diameter, so side = inner diameter / sqrt(2)
	const squareSize = (innerRadius * 2) / Math.sqrt(2);

	// Convert hue to angle for positioning
	// With "from -90deg", hue 0 is at top (-90°), so subtract 90°
	const wheelThumbAngle = ((internalColor.h || 0) - 90) * Math.PI / 180;
	const wheelThumbRadius = wheelRadius - (wheelThickness * scale / 2);
	const wheelThumbX = Math.cos(wheelThumbAngle) * wheelThumbRadius;
	const wheelThumbY = Math.sin(wheelThumbAngle) * wheelThumbRadius;

	const squareThumbX = (internalColor.c / 0.4) * 100;
	const squareThumbY = (1 - internalColor.l) * 100;

	const containerClass = [
		classes.container,
		disabled && classes.disabled,
		className,
	].filter(Boolean).join(' ');

	const style: React.CSSProperties = {};
	if (width) style['--w'] = width;
	if (scale !== 1) style['--x'] = scale.toString();

	const squareStyle: React.CSSProperties = {
		'--h': internalColor.h || 0,
		'--c': internalColor.c,
		'--l': internalColor.l,
	} as React.CSSProperties;

	// Generate conic gradient stops for the wheel
	const wheelStops: string[] = [];
	const stopCount = 36; // Fewer stops for better performance
	for (let i = 0; i <= stopCount; i++) {
		const position = (i / stopCount) * 360;
		// Since gradient rotates -90°, offset hues by -90°
		const hue = (position - 90 + 360) % 360;
		const color = culori.oklch({ mode: 'oklch', l: internalColor.l, c: internalColor.c, h: hue });
		const clampedColor = culori.clampChroma(color);
		const cssColor = culori.formatCss(clampedColor);
		wheelStops.push(`${cssColor} ${position}deg`);
	}

	const wheelStyle: React.CSSProperties = {
		'--wheel-gradient': `conic-gradient(from -90deg, ${wheelStops.join(', ')})`,
		'--wheel-thickness': `${wheelThickness}px`,
	} as React.CSSProperties;

	return (
		<div
			ref={containerRef}
			className={containerClass}
			style={Object.keys(style).length > 0 ? style : undefined}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			{label && <Label className={classes.label}>{label}</Label>}
			{description && <Text slot="description" className={classes.description}>{description}</Text>}

			<div className={classes.picker}>
				<div
					ref={wheelRef}
					className={classes.wheel}
					style={wheelStyle}
					onMouseDown={handleMouseDown('wheel')}
					role="slider"
					aria-label="Hue selection wheel"
					aria-valuemin={0}
					aria-valuemax={360}
					aria-valuenow={Math.round(internalColor.h || 0)}
					tabIndex={-1}
				>
					<div
						className={classes.wheelThumb}
						style={{
							transform: `translate(${wheelThumbX}px, ${wheelThumbY}px)`,
						}}
					/>
				</div>

				<div
					ref={squareRef}
					className={classes.square}
					style={{
						...squareStyle,
						width: `${squareSize}px`,
						height: `${squareSize}px`,
					}}
					onMouseDown={handleMouseDown('square')}
					role="slider"
					aria-label="Chroma and luminance selection"
					tabIndex={-1}
				>
					<div className={classes.squareGradient} />
					<div
						className={classes.squareThumb}
						style={{
							left: `${squareThumbX}%`,
							top: `${squareThumbY}%`,
						}}
					/>
				</div>
			</div>

			<div className={classes.inputs}>
				<TextField
					label="L"
					value={internalColor.l.toFixed(3)}
					onChange={handleLuminanceChange}
					type="number"
					scale={scale}
					className={classes.inputField}
					width="5ch"
				/>
				<TextField
					label="C"
					value={internalColor.c.toFixed(3)}
					onChange={handleChromaChange}
					type="number"
					scale={scale}
					className={classes.inputField}
					width="5ch"
				/>
				<TextField
					label="H"
					value={Math.round(internalColor.h || 0).toString()}
					onChange={handleHueChange}
					type="number"
					scale={scale}
					className={classes.inputField}
					width="5ch"
				/>
			</div>

			<div className={classes.colorPreview}>
				<div
					className={classes.colorSwatch}
					style={{ backgroundColor: culori.formatCss(culori.clampChroma(culori.rgb(internalColor), 'oklch', 'rgb')) }}
					title="sRGB"
				>
					<span className={classes.swatchLabel}>sRGB</span>
				</div>
				<div
					className={classes.colorSwatch}
					style={{ backgroundColor: culori.formatCss(culori.clampChroma(culori.rgb(internalColor), 'oklch', 'p3')) }}
					title={isP3Display ? 'Display P3' : 'sRGB'}
				>
					<span className={classes.swatchLabel}>{isP3Display ? 'P3' : 'sRGB'}</span>
				</div>
			</div>

			{errorMessage && (
				<FieldError className={classes.error}>
					{typeof errorMessage === 'function' ? errorMessage({ validationDetails: {} } as ValidationResult) : errorMessage}
				</FieldError>
			)}

			{name && (
				<input
					type="hidden"
					name={name}
					value={culori.formatCss(internalColor)}
				/>
			)}

			{/* Live region for screen reader announcements */}
			<div
				role="status"
				aria-live="polite"
				aria-atomic="true"
				className={classes.srOnly}
			>
				{announcement}
			</div>
		</div>
	);
}

export default ColorPicker;
