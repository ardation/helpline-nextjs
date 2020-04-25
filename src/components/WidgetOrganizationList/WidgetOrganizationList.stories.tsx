import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import { organizationData } from '../../context/organizationProviderMock';
import WidgetOrganizationList from './WidgetOrganizationList';

const organizations = Array(8).fill(organizationData[0]);

export default {
    title: 'WidgetOrganizationList',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <WidgetOrganizationList organizations={organizations} />
    </ThemeProvider>
);

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
