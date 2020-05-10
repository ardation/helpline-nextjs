import React, { ReactElement } from 'react';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
import OrganizationRating from '.';

const organization = {
    slug: 'youthline',
    rating: 5,
    reviewCount: 10,
};

export default {
    title: 'OrganizationRating',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationRating organization={organization} />
        </Box>
    </ThemeProvider>
);

export const WhenWidget = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationRating organization={organization} variant="widget" />
        </Box>
    </ThemeProvider>
);

export const WhenItem = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationRating organization={organization} variant="item" />
        </Box>
    </ThemeProvider>
);
