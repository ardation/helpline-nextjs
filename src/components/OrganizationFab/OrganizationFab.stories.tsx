import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import OrganizationFab from '.';

const organization = {
    id: 'abc',
    slug: 'youthline',
    name: 'Youthline',
    alwaysOpen: true,
    openingHours: [],
    humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
    categories: [{ name: 'For youth' }, { name: 'All issues' }],
    smsNumber: '234',
    phoneNumber: '0800 376 633',
    url: 'https://www.youthline.co.nz/learn-and-grow.html',
    chatUrl: 'https://youthline.co.nz',
    timezone: 'Pacific/Auckland',
    topics: [],
    featured: false,
    verified: false,
    rating: 3.67,
    reviewCount: 20,
};

export default {
    title: 'OrganizationFab',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <OrganizationFab organization={organization} />
    </Box>
);

export const Basic = (): ReactElement => (
    <Box m={2}>
        <OrganizationFab
            organization={{
                ...organization,
                smsNumber: undefined,
                phoneNumber: undefined,
                chatUrl: undefined,
                categories: [],
            }}
        />
    </Box>
);

export const NoSmsNumber = (): ReactElement => (
    <Box m={2}>
        <OrganizationFab organization={{ ...organization, smsNumber: undefined }} />
    </Box>
);

export const NoPhoneNumber = (): ReactElement => (
    <Box m={2}>
        <OrganizationFab organization={{ ...organization, phoneNumber: undefined }} />
    </Box>
);

export const NoChatUrl = (): ReactElement => (
    <Box m={2}>
        <OrganizationFab organization={{ ...organization, chatUrl: undefined }} />
    </Box>
);
