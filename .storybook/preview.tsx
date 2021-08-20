import React from 'react';
import { addParameters } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../src/theme';
import stubOrganizationReviewCreate from '../tests/stubs/stubOrganizationReviewCreate';
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

stubOrganizationReviewCreate();
addDecorator(storyFn => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>);
addParameters({
  chromatic: { viewports: [320, 414, 834, 1200] },
});
