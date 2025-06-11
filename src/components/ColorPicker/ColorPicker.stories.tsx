import type { Meta, StoryObj } from '@storybook/react';
import ColorPicker from './ColorPicker';
import { Form } from 'react-aria-components';
import { useState } from 'react';
import * as culori from 'culori';

const meta = {
	component: ColorPicker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		scale: {
			control: { type: 'range', min: 0.5, max: 2, step: 0.1 },
		},
		wheelThickness: {
			control: { type: 'range', min: 20, max: 60, step: 5 },
		},
		disabled: {
			control: 'boolean',
		},
		readOnly: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Choose a color',
	},
};

export const WithDescription: Story = {
	args: {
		label: 'Theme Color',
		description: 'Select your preferred theme color',
	},
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Background Color',
		defaultValue: 'oklch(0.7 0.15 120)',
	},
};

export const Controlled: Story = {
	args: {
		label: 'Fixed Color',
		value: { mode: 'oklch', l: 0.5, c: 0.2, h: 240 },
	},
};

export const Error: Story = {
	render: (args) => (
		<Form>
			<ColorPicker
				{...args}
				label="Required Color"
				errorMessage="Please select a color"
			/>
		</Form>
	),
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Color Picker',
		disabled: true,
		defaultValue: 'oklch(0.6 0.1 45)',
	},
};

export const ReadOnly: Story = {
	args: {
		label: 'Read-only Color',
		readOnly: true,
		defaultValue: 'oklch(0.8 0.05 180)',
	},
};

export const CustomWidth: Story = {
	args: {
		label: 'Custom Width',
		width: '300px',
		description: 'This picker has a custom width',
	},
};

export const LargeScale: Story = {
	args: {
		label: 'Large Color Picker',
		scale: 1.5,
	},
};

export const SmallScale: Story = {
	args: {
		label: 'Small Color Picker',
		scale: 0.75,
	},
};

export const ThickWheel: Story = {
	args: {
		label: 'Thick Wheel',
		wheelThickness: 60,
	},
};

export const ThinWheel: Story = {
	args: {
		label: 'Thin Wheel',
		wheelThickness: 20,
	},
};

export const WithForm: Story = {
	render: () => {
		const [color, setColor] = useState({ mode: 'oklch', l: 0.6, c: 0.15, h: 200 } as culori.Color); // eslint-disable-line react-hooks/rules-of-hooks

		return (
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					console.log('Submitted color:', formData.get('themeColor'));
				}}
			>
				<ColorPicker
					name="themeColor"
					label="Theme Color"
					description="Choose your application theme color"
					value={color}
					onChange={setColor}
				/>
				<button type="submit" style={{ marginTop: '1rem' }}>
					Submit
				</button>
			</Form>
		);
	},
};

export const Multiple: Story = {
	render: () => {
		const [primary, setPrimary] = useState({ mode: 'oklch', l: 0.5, c: 0.25, h: 15 } as culori.Color); // eslint-disable-line react-hooks/rules-of-hooks
		const [secondary, setSecondary] = useState({ mode: 'oklch', l: 0.7, c: 0.15, h: 200 } as culori.Color); // eslint-disable-line react-hooks/rules-of-hooks

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<ColorPicker
					label="Primary Color"
					value={primary}
					onChange={setPrimary}
				/>
				<ColorPicker
					label="Secondary Color"
					value={secondary}
					onChange={setSecondary}
				/>
				<div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
					<div
						style={{
							width: 100,
							height: 100,
							backgroundColor: culori.formatCss(primary),
							borderRadius: 8,
						}}
					/>
					<div
						style={{
							width: 100,
							height: 100,
							backgroundColor: culori.formatCss(secondary),
							borderRadius: 8,
						}}
					/>
				</div>
			</div>
		);
	},
};
