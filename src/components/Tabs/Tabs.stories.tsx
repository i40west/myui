import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabsExample } from './Tabs';

const meta = {
  component: TabsExample,
} satisfies Meta<typeof TabsExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
