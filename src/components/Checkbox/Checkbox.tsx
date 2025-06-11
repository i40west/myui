import {
	Checkbox as AriaCheckbox,
	Label,
} from 'react-aria-components';
import classes from './Checkbox.module.css';

import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
interface CheckboxProps extends AriaCheckboxProps {
	label?: string;
	className?: string;
	size?: string;
	scale?: number;
}

export function Checkbox({label, className, size, scale, ...props}: CheckboxProps) {
	const clnames = className ? `${className} ${classes.container}` : classes.container;

	const style: React.CSSProperties = {};
	if (size) style['--s'] = size;
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaCheckbox className={clnames} {...props} style={Object.keys(style).length > 0 ? style : undefined}>
			{({isIndeterminate}) => <>
				<div className={classes.checkbox}>
					<svg viewBox="0 0 18 18" aria-hidden="true" width="100%" height="100%">
						{isIndeterminate
							? <rect x={1} y={7.5} width={15} height={3} />
							: <polyline points="2,9 8,14 15,4" />
						}
					</svg>
				</div>
				{label && <Label className={classes.label}>{label}</Label>}
			</>}
		</AriaCheckbox>
	);
}

export default Checkbox;
