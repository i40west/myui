import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from './Checkbox';

const meta = {
  component: Checkbox,
  argTypes: {
    scale: {
      control: {
        type: 'range',
        min: 0.5,
        max: 5.0,
        step: 0.1,
      },
    },
  },
  args: {
    scale: 1.0,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
};
