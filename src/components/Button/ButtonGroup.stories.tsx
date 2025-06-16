import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, ButtonGroup } from './Button';

const meta = {
  component: ButtonGroup,
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
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const buttons = [
  <Button>One</Button>,
  <Button>Two</Button>,
  <Button>Three</Button>,
];

export const Default: Story = {
  args: {
    children: buttons,
  },
};

export const Square: Story = {
  args: {
    children: buttons,
    square: true,
  },
};
