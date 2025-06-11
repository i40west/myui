import type { Meta, StoryObj } from '@storybook/react-vite';

import { PopoverTrigger } from './Popover';

const meta = {
	component: PopoverTrigger,
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
} satisfies Meta<typeof PopoverTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		buttonContent: 'Open',
		children: 'This is a popover',
	},
};
