import React from 'react';
import { configure, addParameters } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../src/theme';

addDecorator(storyFn => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>);

addParameters({
  chromatic: { viewports: [320, 414, 834, 1200] },
});

// automatically import all files ending in *.stories.tsx
configure(require.context('../src/components', true, /\.stories\.tsx?$/), module);
