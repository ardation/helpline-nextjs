import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import About from '.';

export default {
    title: 'About',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <About />
    </ThemeProvider>
);
