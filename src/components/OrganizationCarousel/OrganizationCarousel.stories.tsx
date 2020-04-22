import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import { organizationData } from '../../context/organizationProviderMock';
import OrganizationCarousel from './OrganizationCarousel';

const organizations = Array(8).fill(organizationData[0]);

export default {
    title: 'OrganizationCarousel',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationCarousel organizations={organizations} />
    </ThemeProvider>
);

Default.story = {
    name: 'default',
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
