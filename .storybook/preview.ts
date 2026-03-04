import type { Preview } from '@storybook/react-vite';

import 'sanitize.css';
import './styles/fonts.css';
import './styles/colorful.css';
import './styles/variables.css';
import '../src/myui.css';
import './styles/styles.css';
import './styles/site.css';
import 'sanitize.css/reduce-motion.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
