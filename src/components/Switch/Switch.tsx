import {
	Switch as AriaSwitch,
	Label,
} from 'react-aria-components';
import classes from './Switch.module.css';

import type { SwitchProps as AriaSwitchProps } from 'react-aria-components';
interface SwitchProps extends AriaSwitchProps {
	label?: string;
	className?: string;
	size?: string;
	scale?: number;
}

export function Switch({label, className, size, scale, ...props}: SwitchProps) {
	const clnames = className ? `${className} ${classes.container}` : classes.container;

	const style: React.CSSProperties = {};
	if (size) style['--s'] = size;
	if (scale) style['--x'] = scale.toString();

	return (
		<AriaSwitch className={clnames} {...props} style={Object.keys(style).length > 0 ? style : undefined}>
			<div className={classes.switch}>
				<div className={classes.indicator} />
			</div>
			{label && <Label className={classes.label}>{label}</Label>}
		</AriaSwitch>
	);
}

export default Switch;
