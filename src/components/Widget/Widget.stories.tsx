import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { withContexts } from '@storybook/addon-contexts/react';
import theme from '../../theme';
import OrganizationContext from '../../context/organizationContext';
import Widget from '.';

export default {
    title: 'Widget',
    // decorators: [withContexts(OrganizationContext)],
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Widget
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
            filterOptions={{ topics: [{ name: 'Anxiety' }, { name: 'Bullying' }] }}
        />
    </ThemeProvider>
);

Default.story = {
    name: 'default',
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
