# UI Components Documentation

This document provides comprehensive documentation for the React UI components that wrap react-aria-components. Most components support scaling and follow consistent styling patterns.

This documentation is split into component-focused files so tools and AI agents can load only the context they need.

## Table of Contents

- [Component Docs](#component-docs)
- [Common Props](#common-props)
- [Styling](#styling)
- [Accessibility](#accessibility)
- [Integration with React Aria Components](#integration-with-react-aria-components)

## Component Docs

- [Button](./button.md)
- [Calendar](./calendar.md)
- [Checkbox](./checkbox.md)
- [ColorPicker](./color-picker.md)
- [ComboBox](./combo-box.md)
- [DateField](./date-field.md)
- [DatePicker](./date-picker.md)
- [Popover](./popover.md)
- [RadioGroup](./radio-group.md)
- [Slider](./slider.md)
- [Switch](./switch.md)
- [Tabs](./tabs.md)
- [TextArea](./text-area.md)
- [TextField](./text-field.md)
- [ToggleButtonGroup](./toggle-button-group.md)
- [Tooltip](./tooltip.md)

## Common Props

All components support the following common props (where applicable):

- `scale?: number` - Scaling factor for the component size
- `className?: string` - Additional CSS classes to apply

## Styling

All components use CSS modules for styling and support:

- **CSS Custom Properties**: For dynamic values like width, height, and scale
- **Data Attributes**: For state-based styling (selected, focused, etc.)
- **Responsive Design**: Components adapt to different screen sizes
- **Scaling Hooks**: Most components expose a `scale` prop that maps to CSS custom properties

## Accessibility

Components inherit accessibility primitives from react-aria-components:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Supported by underlying react-aria primitives, with keyboard input paths exposed by wrappers
- **Focus Management**: Proper focus handling and indicators
- **Screen Reader Support**: Optimized for assistive technologies
- **High Contrast**: Supports high contrast mode
- **RTL Support**: Right-to-left text direction support

## Integration with React Aria Components

These components are thin wrappers around react-aria-components, providing:

- **Consistent Styling**: Project-specific design system
- **Enhanced Props**: Additional convenience props like `scale` and `tooltip`
- **Simplified APIs**: Reduced boilerplate for common use cases
- **Type Safety**: Full TypeScript support with proper prop inheritance

For advanced usage, you can always use the underlying react-aria-components directly or extend these components further.
