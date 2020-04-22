import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import withMockOrganizationProvider, { organizationData } from '../../context/organizationProviderMock';
import Widget from './Widget';

const organizations = Array(8).fill(organizationData[0]);

export default {
    title: 'Widget',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>{withMockOrganizationProvider(<Widget />, { organizations })}</ThemeProvider>
);

export const WithActiveCountry = (): ReactElement => (
    <ThemeProvider theme={theme}>
        {withMockOrganizationProvider(<Widget />, {
            activeCountry: { code: 'AU', name: 'Australia', subdivisions: [], emergencyNumber: '111' },
        })}
    </ThemeProvider>
);

Default.story = {
    name: 'default',
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
