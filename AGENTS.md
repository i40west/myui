# myui

## Project Description

This is a React component library wrapping React Aria Components.

## Common Commands

```bash
# Build the library and copy CSS modules
npm run build

# Run TypeScript in watch mode for development
npm run dev

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Clean build artifacts
npm run clean
```

## Architecture Overview

This is a React component library built on top of React Aria Components. Key architectural patterns:

1. **Component Structure**: Each component lives in `src/components/{ComponentName}/` with:
   - `{ComponentName}.tsx` - Main component implementation
   - `{ComponentName}.module.css` - Component-specific CSS modules
   - `{ComponentName}.stories.tsx` - Storybook stories (excluded from build)
   - `index.ts` - Re-exports for cleaner imports

2. **React Aria Integration**: Components wrap React Aria Components to provide:
   - Built-in accessibility
   - Keyboard navigation
   - ARIA attributes
   - Focus management

3. **CSS Modules with Scaling**: Components support a `scale` prop that sets a CSS custom property `--x` for scaling UI elements. CSS files use `calc()` with this variable for responsive sizing.

4. **Export Strategy**:
   - Main entry exports all components from `src/index.ts`
   - Individual component exports defined in `package.json` for tree-shaking
   - TypeScript declarations generated alongside JS in `dist/`

5. **Build Process**:
   - TypeScript compiles to ESM format
   - CSS modules are copied preserving directory structure
   - Uses `tsconfig.build.json` which excludes `*.stories.tsx` files

6. **Dependencies**:
   - `react-aria-components` - Core UI primitives
   - `luxon` - Date/time handling with timezone support
   - `culori` - Color manipulation for ColorPicker

## Coding Guidelines

- Tabs are used for indentation
- Rules from eslint should be followed
- Semi-colons are required
- Single quotes for strings, double quotes in JSX
- Trailing commas in multi-line objects and arrays
- Blank lines should not have indentation and there should be no trailing spaces on any lines
- All code and other text files must end with a newline

## Documentation

- Documentation for React-Aria, React, and culori should be available with docs_mcp_server
- Search docs_mcp_server for other needed documentation
- Search the web for other needed documenatation

## Project Guidelines

- Never add dependencies without permission. All dependencies must be vetted first
- If adding a dependency seems like a good idea, suggest it and explain the justification, and provide alternate approaches as well
- To the greatest extent possible, use existing patterns and conventions when creating new code and files
- Keep solutions simple. Avoid over-engineering, premature optimization, and premature refactoring

