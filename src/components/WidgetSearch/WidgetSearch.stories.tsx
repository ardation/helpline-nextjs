import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import WidgetSearch from '.';

export default {
    title: 'WidgetSearch',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <WidgetSearch
            countries={[
                { code: 'AU', name: 'Australia', subdivisions: [] },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                    subdivisions: [
                        { name: 'Bay of Plenty', code: 'BOP' },
                        { name: 'Auckland', code: 'AUK' },
                    ],
                },
            ]}
            preselectedCountry={{
                code: 'NZ',
                name: 'New Zealand',
                subdivisions: [
                    { name: 'Bay of Plenty', code: 'BOP' },
                    { name: 'Auckland', code: 'AUK' },
                ],
            }}
        />
    </ThemeProvider>
);

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
