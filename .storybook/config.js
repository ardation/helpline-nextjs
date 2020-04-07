import { configure, addParameters } from '@storybook/react';

addParameters({
  chromatic: { viewports: [320, 414, 834, 1200] },
});

// automatically import all files ending in *.stories.tsx
configure(require.context('../src/components', true, /\.stories\.tsx?$/), module);
