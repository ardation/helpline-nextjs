import React, { ReactElement } from 'react';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
import Search from '.';

export default {
    title: 'Search',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <Search
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
                topics={[{ name: 'Anxiety' }, { name: 'Bullying' }]}
            />
        </Box>
    </ThemeProvider>
);

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
