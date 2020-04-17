import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { withContexts } from '@storybook/addon-contexts/react';
import theme from '../../theme';
import OrganizationContext, { OrganizationProvider } from '../../context/organizationContext';
import Widget from '.';

export default {
    title: 'Widget',
    // decorators: [withContexts(OrganizationContext)],
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationProvider
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
            filterOptions={{
                topics: [{ name: 'Topic 1' }, { name: 'Topic 2' }, { name: 'Topic 3' }],
                categories: [{ name: 'Category 1' }, { name: 'Category 2' }],
            }}
        >
            <Widget />
        </OrganizationProvider>
    </ThemeProvider>
);

Default.story = {
    name: 'default',
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
