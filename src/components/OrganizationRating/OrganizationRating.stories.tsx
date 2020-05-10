import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
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
    <Box m={2}>
        <OrganizationRating organization={organization} />
    </Box>
);

export const WhenWidget = (): ReactElement => (
    <Box m={2}>
        <OrganizationRating organization={organization} variant="widget" />
    </Box>
);

export const WhenItem = (): ReactElement => (
    <Box m={2}>
        <OrganizationRating organization={organization} variant="item" />
    </Box>
);
