import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import Footer from '.';

export default {
    title: 'Footer',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Footer />
    </ThemeProvider>
);
