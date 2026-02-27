# Tabs

A tab interface with customizable width.

## Props

```typescript
interface TabsProps extends AriaTabsProps {
  className?: string;
  width?: string;
}
```

## Usage

```tsx
import { Tabs, TabList, Tab, TabPanel } from 'myui';

<Tabs width="400px">
  <TabList aria-label="Content sections">
    <Tab id="overview">Overview</Tab>
    <Tab id="details">Details</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanel id="overview">
    <p>Overview content...</p>
  </TabPanel>
  <TabPanel id="details">
    <p>Detailed information...</p>
  </TabPanel>
  <TabPanel id="settings">
    <p>Settings panel...</p>
  </TabPanel>
</Tabs>
```

## Features

- **Customizable Width**: Set width via CSS custom properties
- **Includes Example**: Contains a built-in `TabsExample` component for reference

## Re-exported Components

- `TabList`
- `Tab`
- `TabPanel`

## Inherited Props

Inherits all props from react-aria-components `Tabs` including:
- `orientation?: 'horizontal' | 'vertical'`
- `selectedKey?: Key`
- `onSelectionChange?: (key: Key) => void`
- `isDisabled?: boolean`
