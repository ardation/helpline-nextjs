import React, { ReactElement } from 'react';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
import WidgetSearch from '.';

export default {
    title: 'WidgetSearch',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
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
            />
        </Box>
    </ThemeProvider>
);

Default.story = {
    name: 'default',
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
