import React from 'react';
import 'tailwindcss/tailwind.css';
import '../src/app/globals.css';
import '../src/styles/theme.css';
import type { Preview } from "@storybook/react";
import AuthProvider from '../src/context/AuthProvider';
import { ThemeProvider } from '../src/context/ThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
      <AuthProvider>
        <Story />
      </AuthProvider>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
