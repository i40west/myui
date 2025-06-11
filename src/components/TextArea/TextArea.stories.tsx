import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';

import TextArea from './TextArea';

const meta = {
  component: TextArea,
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
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'TextArea',
    placeholder: 'Enter text',
  },
};

export const Description: Story = {
  args: {
    label: 'TextArea',
    description: 'This is a description',
    placeholder: 'Enter text',
  },
};

export const Error: Story = {
  args: {
    label: 'TextArea',
    value: 'Wrong value',
  },
  render: (args) => (
    <Form validationErrors={{ foo: 'Wrong value' }}>
      <TextArea name="foo" {...args} />
    </Form>
  ),
};
