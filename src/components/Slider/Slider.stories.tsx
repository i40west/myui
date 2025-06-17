import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';

import Slider from './Slider';

const meta = {
	component: Slider,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		scale: {
			control: {
				type: 'range',
				min: 0.5,
				max: 5.0,
				step: 0.1,
			},
		},
		orientation: {
			control: 'radio',
			options: ['horizontal', 'vertical'],
		},
		minValue: {
			control: 'number',
		},
		maxValue: {
			control: 'number',
		},
		step: {
			control: 'number',
		},
	},
	args: {
		scale: 1.0,
		width: '300px',
		minValue: 0,
		maxValue: 100,
		step: 1,
	},
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Volume',
		defaultValue: 50,
	},
};

export const WithDescription: Story = {
	args: {
		label: 'Brightness',
		description: 'Adjust the screen brightness',
		defaultValue: 75,
	},
};

export const NoOutput: Story = {
	args: {
		label: 'Speed',
		defaultValue: 30,
		showOutput: false,
	},
};

export const Range: Story = {
	args: {
		label: 'Price Range',
		defaultValue: [25, 75],
		thumbLabels: ['min', 'max'],
		formatOptions: { style: 'currency', currency: 'USD' },
	},
};

export const StepValues: Story = {
	args: {
		label: 'Temperature',
		defaultValue: 20,
		minValue: 0,
		maxValue: 40,
		step: 5,
		formatOptions: { style: 'unit', unit: 'celsius' },
	},
};

export const Controlled: Story = {
	args: {
		label: 'Controlled Slider',
		value: 50,
	},
	render: (args) => {
		const [value, setValue] = useState(50);
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
				<Slider {...args} value={value} onChange={setValue} />
				<p>Value: {value}</p>
			</div>
		);
	},
};

export const Vertical: Story = {
	args: {
		label: 'Volume',
		orientation: 'vertical',
		defaultValue: 50,
		width: 'auto',
	},
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
				<Story />
			</div>
		),
	],
};

export const VerticalRange: Story = {
	args: {
		label: 'EQ Band',
		orientation: 'vertical',
		defaultValue: [-10, 10],
		minValue: -20,
		maxValue: 20,
		thumbLabels: ['low', 'high'],
		width: 'auto',
	},
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
				<Story />
			</div>
		),
	],
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Slider',
		defaultValue: 50,
		isDisabled: true,
	},
};

export const MinMaxLabels: Story = {
	args: {
		label: 'Rating',
		defaultValue: 3,
		minValue: 1,
		maxValue: 5,
		step: 1,
	},
};

export const LargeScale: Story = {
	args: {
		label: 'Large Slider',
		defaultValue: 50,
		scale: 2.0,
		width: '400px',
	},
};

export const SmallScale: Story = {
	args: {
		label: 'Small Slider',
		defaultValue: 50,
		scale: 0.8,
		width: '200px',
	},
};

export const PercentageFormat: Story = {
	args: {
		label: 'Progress',
		defaultValue: 0.65,
		minValue: 0,
		maxValue: 1,
		step: 0.01,
		formatOptions: { style: 'percent' },
	},
};

export const MultipleSliders: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
			<Slider
				label="Red"
				defaultValue={128}
				maxValue={255}
				formatOptions={{ minimumIntegerDigits: 3 }}
			/>
			<Slider
				label="Green"
				defaultValue={200}
				maxValue={255}
				formatOptions={{ minimumIntegerDigits: 3 }}
			/>
			<Slider
				label="Blue"
				defaultValue={100}
				maxValue={255}
				formatOptions={{ minimumIntegerDigits: 3 }}
			/>
		</div>
	),
};

export const WithForm: Story = {
	render: () => (
		<Form onSubmit={(e) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			alert(`Submitted value: ${formData.get('volume')}`);
		}}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
				<Slider
					name="volume"
					label="Volume"
					defaultValue={50}
				/>
				<button type="submit">Submit</button>
			</div>
		</Form>
	),
};

export const ThreeThumbSlider: Story = {
	args: {
		label: 'Multi Range',
		defaultValue: [20, 50, 80],
		thumbLabels: ['low', 'mid', 'high'],
	},
};

// Import React hooks
import { useState } from 'react';