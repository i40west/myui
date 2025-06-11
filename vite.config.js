// This file is only used by Storybook. Astro does not use this.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'static',
});
