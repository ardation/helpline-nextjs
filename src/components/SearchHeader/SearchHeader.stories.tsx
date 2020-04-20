import React, { ReactElement } from 'react';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
import { OrganizationProvider } from '../../context/organizationContext';
import SearchHeader from '.';

export default {
    title: 'SearchHeader',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationProvider
            allOrganizations={[]}
            countries={[]}
            filterOptions={{
                topics: [{ name: 'Topic' }, { name: 'Topic 2' }],
                categories: [],
                humanSupportTypes: [],
                contactMethods: [],
                sorts: [],
            }}
        >
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
            </Box>
        </OrganizationProvider>
    </ThemeProvider>
);

Default.story = {
    name: 'default',
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
