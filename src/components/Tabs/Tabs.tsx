import {
	Tabs as AriaTabs,
	TabList,
	Tab,
	TabPanel,
} from 'react-aria-components';
import classes from './Tabs.module.css';

import type { TabsProps as AriaTabsProps } from 'react-aria-components';
interface TabsProps extends AriaTabsProps {
	className?: string;
	width?: string;
}

export function Tabs({className, width, ...props}: TabsProps) {
	const clnames = className ? `${className} ${classes.tabs}` : classes.tabs;
	return (
		<AriaTabs className={clnames} {...props} style={width ? {'--w': width} as React.CSSProperties : undefined} />
	);
}

export default Tabs;
export { TabList, Tab, TabPanel };

export function TabsExample() {
	return (
		<Tabs>
			<TabList aria-label="History of Ancient Rome">
				<Tab id="FoR">Founding of Rome</Tab>
				<Tab id="MaR">Monarchy and Republic</Tab>
				<Tab id="Emp">Empire</Tab>
			</TabList>
			<TabPanel id="FoR">
				Arma virumque cano, Troiae qui primus ab oris.
			</TabPanel>
			<TabPanel id="MaR">
				Senatus Populusque Romanus.
			</TabPanel>
			<TabPanel id="Emp">
				Alea jacta est.
			</TabPanel>
		</Tabs>
	);
}
