import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import OrganizationOpen from '.';

const organization = {
    alwaysOpen: true,
    timezone: 'Pacific/Auckland',
    openingHours: [],
};

const completeOpeningHours = [
    { day: 'monday', open: 'T00:00', close: 'T23:59' },
    { day: 'tuesday', open: 'T00:00', close: 'T23:59' },
    { day: 'wednesday', open: 'T00:00', close: 'T23:59' },
    { day: 'thursday', open: 'T00:00', close: 'T23:59' },
    { day: 'friday', open: 'T00:00', close: 'T23:59' },
    { day: 'saturday', open: 'T00:00', close: 'T23:59' },
    { day: 'sunday', open: 'T00:00', close: 'T23:59' },
];

export default {
    title: 'OrganizationOpen',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <OrganizationOpen organization={organization} />
    </Box>
);

export const Closed = (): ReactElement => (
    <Box m={2}>
        <OrganizationOpen organization={{ ...organization, alwaysOpen: false }} />
    </Box>
);

export const Opened = (): ReactElement => (
    <Box m={2}>
        <OrganizationOpen organization={{ ...organization, alwaysOpen: false, openingHours: completeOpeningHours }} />
    </Box>
);
