import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';

import TextField from './TextField';

const meta = {
  component: TextField,
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
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'TextField',
    placeholder: 'Enter text',
  },
};

export const Description: Story = {
  args: {
    label: 'TextField',
    description: 'This is a description',
    placeholder: 'Enter text',
  },
};

export const Error: Story = {
  args: {
    label: 'TextField',
    value: 'Wrong value',
  },
  render: (args) => (
    <Form validationErrors={{ foo: 'Wrong value' }}>
      <TextField name="foo" {...args} />
    </Form>
  ),
};

export const SubmitButton: Story = {
  args: {
    label: 'TextField',
    placeholder: 'Enter text',
    submitButton: true,
  },
};

export const Rounded: Story = {
  args: {
    label: 'TextField',
    placeholder: 'Enter text',
    rounded: true,
  },
};

export const RoundedWithSubmit: Story = {
  args: {
    label: 'TextField',
    placeholder: 'Enter text',
    submitButton: true,
    rounded: true,
  },
};

export const RoundedWithError: Story = {
  args: {
    label: 'TextField',
    value: 'Wrong value',
    rounded: true,
  },
  render: (args) => (
    <Form validationErrors={{ foo: 'Wrong value' }}>
      <TextField name="foo" {...args} />
    </Form>
  ),
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
  },
};
