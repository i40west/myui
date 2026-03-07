import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { TooltipTrigger } from './Tooltip';

const meta = {
	component: TooltipTrigger,
	args: {
		content: 'Tooltip content',
		delay: 0,
	},
} satisfies Meta<typeof TooltipTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithButtonTrigger: Story = {
	render: (args) => (
		<TooltipTrigger {...args}>
			<Button>Hover me</Button>
		</TooltipTrigger>
	),
};

export const WithInlineDomTrigger: Story = {
	render: (args) => (
		<TooltipTrigger {...args}>
			<span
				role="button"
				aria-label="Show status details"
				style={{
					cursor: 'help',
					display: 'inline-flex',
					fontSize: '2rem',
					lineHeight: 1,
				}}
			>
				⚠️
			</span>
		</TooltipTrigger>
	),
};
