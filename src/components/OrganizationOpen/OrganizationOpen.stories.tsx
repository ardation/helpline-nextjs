import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import OrganizationOpen from '.';

const organization = {
    alwaysOpen: true,
    timezone: 'Pacific/Auckland',
    openingHours: [],
};

const completeOpeningHours = [
    { day: 'monday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
    { day: 'tuesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
    { day: 'wednesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
    { day: 'thursday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
    { day: 'friday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
    { day: 'saturday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
    { day: 'sunday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
];

const emptyOpeningHours = [
    { day: 'monday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'tuesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'wednesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'thursday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'friday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'saturday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'sunday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
];

export default {
    title: 'OrganizationOpen',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <OrganizationOpen organization={organization} />
    </Box>
);

export const WhenClosed = (): ReactElement => (
    <Box m={2}>
        <OrganizationOpen organization={{ ...organization, alwaysOpen: false, openingHours: emptyOpeningHours }} />
    </Box>
);

export const WhenOpened = (): ReactElement => (
    <Box m={2}>
        <OrganizationOpen organization={{ ...organization, alwaysOpen: false, openingHours: completeOpeningHours }} />
    </Box>
);

export const WithExpandable = (): ReactElement => (
    <Box m={2}>
        <OrganizationOpen
            organization={{ ...organization, alwaysOpen: false, openingHours: completeOpeningHours }}
            expandable={true}
        />
    </Box>
);
