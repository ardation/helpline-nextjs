import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import Placeholder from '.';

export default {
    title: 'Placeholder',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Placeholder />
    </ThemeProvider>
);
