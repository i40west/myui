import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';

import RadioGroup, { RadioGroupList } from './RadioGroup';

const meta = {
  component: RadioGroup,
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
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  'Foo',
  'Bar',
  'Baz',
];

export const Horizontal: Story = {
  args: {
    label: 'RadioGroup',
    orientation: 'horizontal',
    children: <RadioGroupList items={items} />,
  },
};

export const Vertical: Story = {
  args: {
    label: 'RadioGroup',
    orientation: 'vertical',
    children: <RadioGroupList items={items} />,
  },
};

export const Description: Story = {
  args: {
    label: 'RadioGroup',
    description: 'This is a description',
    orientation: 'horizontal',
    children: <RadioGroupList items={items} />,
  },
};

export const Error: Story = {
  args: {
    label: 'RadioGroup',
    orientation: 'horizontal',
    children: <RadioGroupList items={items} />,
  },
  render: (args) => (
    <Form validationErrors={{ foo: 'Wrong value' }}>
      <RadioGroup name="foo" {...args} />
    </Form>
  ),
};
