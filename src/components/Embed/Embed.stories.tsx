import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import Embed from '.';

export default {
    title: 'Embed',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Embed
            countries={[
                { code: 'AU', name: 'Australia' },
                { code: 'NZ', name: 'New Zealand' },
                { code: 'US', name: 'United States of America' },
            ]}
        />
    </ThemeProvider>
);
