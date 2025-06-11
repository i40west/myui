import type { Meta, StoryObj } from '@storybook/react-vite';

import { RangeCalendar } from './Calendar';

const meta = {
  component: RangeCalendar,
} satisfies Meta<typeof RangeCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: {
      start: new Date(),
      end: new Date(),
    },
  },
};
