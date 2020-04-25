import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import EmbedInfo from '.';

export default {
    title: 'EmbedInfo',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <EmbedInfo />
    </ThemeProvider>
);

export const WithCountries = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <EmbedInfo
            countries={[
                { code: 'AU', name: 'Australia' },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                },
                { code: 'US', name: 'United States of America' },
            ]}
        />
    </ThemeProvider>
);
