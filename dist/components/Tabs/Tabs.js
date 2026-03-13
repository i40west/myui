import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs as AriaTabs, TabList, Tab, TabPanel, } from 'react-aria-components';
import classes from './Tabs.module.css';
export function Tabs({ className, width, ...props }) {
    const clnames = className ? `${className} ${classes.tabs}` : classes.tabs;
    return (_jsx(AriaTabs, { className: clnames, ...props, style: width ? { '--w': width } : undefined }));
}
export default Tabs;
export { TabList, Tab, TabPanel };
export function TabsExample() {
    return (_jsxs(Tabs, { children: [_jsxs(TabList, { "aria-label": "History of Ancient Rome", children: [_jsx(Tab, { id: "FoR", children: "Founding of Rome" }), _jsx(Tab, { id: "MaR", children: "Monarchy and Republic" }), _jsx(Tab, { id: "Emp", children: "Empire" })] }), _jsx(TabPanel, { id: "FoR", children: "Arma virumque cano, Troiae qui primus ab oris." }), _jsx(TabPanel, { id: "MaR", children: "Senatus Populusque Romanus." }), _jsx(TabPanel, { id: "Emp", children: "Alea jacta est." })] }));
}
