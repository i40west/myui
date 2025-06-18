import type { Meta, StoryObj } from '@storybook/react-vite';

import { Popover, PopoverTrigger } from './Popover';
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

export const WithPopoverTriggerButton: Story = {
	args: {
		children: <div style={{ padding: 20 }}>
			<h3>Popover Content</h3>
			<p>This popover uses the legacy buttonContent prop.</p>
		</div>,
		width: '300px',
	},
	render: (args) => {
		const { children, ...popoverProps } = args;
		return (
			<PopoverTrigger buttonContent="Click me" {...popoverProps}>
				{children}
			</PopoverTrigger>
		);
	},
};

export const WithCustomTriggerSpan: Story = {
	args: {
		children: <div style={{ padding: 20 }}>
			<h3>Custom Trigger</h3>
			<p>This popover was triggered by a custom span element.</p>
		</div>,
		width: '300px',
	},
	render: (args) => {
		const { children, ...popoverProps } = args;
		return (
			<PopoverTrigger
				trigger={
					<span
						role="button"
						tabIndex={0}
						style={{
							color: 'blue',
							textDecoration: 'underline',
							cursor: 'pointer',
						}}
					>
						Custom clickable text
					</span>
				}
				{...popoverProps}
			>
				{children}
			</PopoverTrigger>
		);
	},
};

export const WithCustomTriggerDiv: Story = {
	args: {
		children: <div style={{ padding: 20 }}>
			<h3>Color Swatch Example</h3>
			<p>Simulating a color swatch trigger.</p>
		</div>,
		width: '250px',
	},
	render: (args) => {
		const { children, ...popoverProps } = args;
		return (
			<PopoverTrigger
				trigger={
					<div
						role="button"
						tabIndex={0}
						style={{
							width: 40,
							height: 40,
							backgroundColor: '#ff6b6b',
							borderRadius: 4,
							cursor: 'pointer',
							border: '2px solid #ddd',
						}}
						aria-label="Red color swatch"
					/>
				}
				{...popoverProps}
			>
				{children}
			</PopoverTrigger>
		);
	},
};

export const WithCustomButton: Story = {
	args: {
		children: <div style={{ padding: 20 }}>
			<h3>Custom Button</h3>
			<p>This uses a native button element as trigger.</p>
		</div>,
		width: '300px',
	},
	render: (args) => {
		const { children, ...popoverProps } = args;
		return (
			<PopoverTrigger
				trigger={
					<button
						style={{
							backgroundColor: '#4ecdc4',
							color: 'white',
							border: 'none',
							padding: '10px 20px',
							borderRadius: 20,
							cursor: 'pointer',
							fontSize: 16,
						}}
					>
						Custom Styled Button
					</button>
				}
				{...popoverProps}
			>
				{children}
			</PopoverTrigger>
		);
	},
};
