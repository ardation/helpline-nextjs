import React, { ReactElement } from 'react';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
import withMockOrganizationProvider from '../../context/organizationProviderMock';
import SearchHeader from '.';

export default {
    title: 'SearchHeader',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        {withMockOrganizationProvider(
            <Box m={2}>
                <SearchHeader
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
            </Box>,
            {
                filterOptions: {
                    topics: [{ name: 'Topic' }, { name: 'Topic 2' }, { name: 'Topic 3' }],
                    categories: [{ name: 'One of these too' }, { name: 'One more' }],
                    humanSupportTypes: [{ name: 'And this' }],
                    contactMethods: [],
                    sorts: [],
                },
            },
        )}
    </ThemeProvider>
);

Default.story = {
    name: 'default',
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
