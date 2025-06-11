import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta = {
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
