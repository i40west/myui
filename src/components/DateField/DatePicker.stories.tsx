import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';

import { DatePicker } from './DateField';

const meta = {
  component: DatePicker,
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
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Date',
  },
};

export const Filled: Story = {
  args: {
    label: 'Date',
    defaultValue: new Date(),
  },
};

export const Description: Story = {
  args: {
    label: 'Date',
    description: 'This is a description',
  },
};

export const Error: Story = {
  args: {
    label: 'Date',
  },
  render: (args) => (
    <Form validationErrors={{ foo: 'Wrong value' }}>
      <DatePicker name="foo" {...args} />
    </Form>
  ),
};
