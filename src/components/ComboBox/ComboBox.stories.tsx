import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';

import { ComboBox, ComboBoxItemList } from './ComboBox';

const meta = {
  component: ComboBox,
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
} satisfies Meta<typeof ComboBox>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  'Foo',
  'Bar',
  'Baz',
];

export const Default: Story = {
  args: {
    label: 'ComboBox',
    children: <ComboBoxItemList items={items} />,
    formValue: 'text',
  },
};

export const Description: Story = {
  args: {
    label: 'ComboBox',
    description: 'This is a description',
    children: <ComboBoxItemList items={items} />,
    formValue: 'text',
  },
};

export const Error: Story = {
  args: {
    label: 'ComboBox',
    children: <ComboBoxItemList items={items} />,
  },
  render: (args) => (
    <Form validationErrors={{ foo: 'Wrong value' }}>
      <ComboBox name="foo" {...args} />
    </Form>
  ),
};

export const ClearButton: Story = {
  args: {
    label: 'ComboBox',
    children: <ComboBoxItemList items={items} />,
    clearButton: true,
    formValue: 'text',
  },
};

export const Rounded: Story = {
  args: {
    label: 'ComboBox',
    children: <ComboBoxItemList items={items} />,
    rounded: true,
    formValue: 'text',
  },
};

export const RoundedWithClear: Story = {
  args: {
    label: 'ComboBox',
    children: <ComboBoxItemList items={items} />,
    rounded: true,
    clearButton: true,
    formValue: 'text',
  },
};

export const RoundedWithError: Story = {
  args: {
    label: 'ComboBox',
    children: <ComboBoxItemList items={items} />,
    rounded: true,
    clearButton: true,
    formValue: 'text',
  },
  render: (args) => (
    <Form validationErrors={{ foo: 'Wrong value' }}>
      <ComboBox name="foo" {...args} />
    </Form>
  ),
};
