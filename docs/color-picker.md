# ColorPicker

An advanced color picker component using the OKLCH color space with visual hue wheel and chroma/luminance square selection.

## Props

```typescript
interface ColorPickerProps {
  defaultValue?: Color | string;
  value?: Color | string;
  onChange?: (color: Color) => void;

  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  className?: string;
  width?: string;
  scale?: number;

  wheelThickness?: number;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;

  onFocus?: () => void;
  onBlur?: () => void;
}
```

## Usage

```tsx
import { ColorPicker } from 'myui';

// Basic color picker
<ColorPicker
  defaultValue="oklch(0.7 0.15 0)"
  onChange={(color) => console.log(color)}
  label="Choose a color"
/>

// Controlled color picker
<ColorPicker
  value={selectedColor}
  onChange={setSelectedColor}
  label="Theme Color"
  description="Select your preferred theme color"
/>

// Custom sized and styled
<ColorPicker
  scale={1.2}
  width="300px"
  wheelThickness={30}
  label="Accent Color"
/>

// With form integration
<ColorPicker
  name="brandColor"
  label="Brand Color"
  errorMessage="Please select a valid color"
/>
```

## Features

- **OKLCH Color Space**: Uses perceptually uniform OKLCH color space for intuitive color selection
- **Visual Selection**:
  - Circular hue wheel for selecting color hue
  - Square gradient for adjusting luminance (vertical) and chroma (horizontal)
- **Direct Input**: Three numeric input fields for precise L, C, H value control
- **Color Preview**: Displays the selected color in both sRGB and Display P3 (when available) color spaces
- **P3 Display Support**: Automatically detects and utilizes Display P3 color gamut when available
- **Culori Integration**: Uses the culori library for advanced color manipulation and conversions
- **Accessibility**:
  - Screen reader announcements for color changes
  - Keyboard-accessible numeric input fields for precise adjustments
  - ARIA labels on wheel and square controls
- **Form Integration**: Hidden input field with `name` prop for form submissions

## Color Space Details

The ColorPicker uses OKLCH (Oklab Lightness, Chroma, Hue) which provides:
- **L (Lightness)**: 0 to 1 (0% to 100%)
- **C (Chroma)**: 0 to 0.4 (saturation/intensity)
- **H (Hue)**: 0 to 360 degrees

## Interactive Elements

1. **Hue Wheel**: Outer ring for selecting the base hue (0-360°)
2. **Chroma/Luminance Square**: Inner square where:
   - Horizontal axis controls chroma (left = 0, right = 0.4)
   - Vertical axis controls luminance (top = 1, bottom = 0)
3. **Input Fields**: Direct numeric input for L, C, and H values
4. **Color Swatches**: Preview the color in available color spaces

## Inherited Props

The component accepts Culori `Color` objects and provides extensive color manipulation capabilities through the culori library.
