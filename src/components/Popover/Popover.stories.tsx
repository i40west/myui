import type { Meta, StoryObj } from '@storybook/react-vite';

import { Popover } from './Popover';
import { Button } from '../Button';
import { DialogTrigger } from 'react-aria-components';

const meta = {
	component: Popover,
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
		showArrow: true,
		width: '',
	},
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'This is a popover',
		width: '',
	},
	render: (args) => (
		<DialogTrigger>
			<Button>Open</Button>
			<Popover {...args} />
		</DialogTrigger>
	),
};
