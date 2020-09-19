import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import OrganizationCard from '.';

const organization = {
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
    title: 'OrganizationCard',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={organization} />
    </Box>
);

export const Basic = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard
            organization={{
                ...organization,
                smsNumber: undefined,
                phoneNumber: undefined,
                chatUrl: undefined,
                url: undefined,
                categories: [],
                humanSupportTypes: [],
                alwaysOpen: false,
            }}
        />
    </Box>
);

export const NoSmsNumber = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={{ ...organization, smsNumber: undefined }} />
    </Box>
);

export const NoPhoneNumber = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={{ ...organization, phoneNumber: undefined }} />
    </Box>
);

export const NoChatUrl = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={{ ...organization, chatUrl: undefined }} />
    </Box>
);

export const NoUrl = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={{ ...organization, url: undefined }} />
    </Box>
);

export const NoReviewCount = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={{ ...organization, reviewCount: 0 }} />
    </Box>
);

export const Open = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard
            organization={{
                ...organization,
                alwaysOpen: false,
                openingHours: [
                    { day: 'sunday', open: '2000-01-01T12:00:00Z', close: '2000-01-01T23:59:59Z' },
                    { day: 'monday', open: '2000-01-01T12:00:00Z', close: '2000-01-01T23:59:59Z' },
                    { day: 'tuesday', open: '2000-01-01T12:00:00Z', close: '2000-01-01T23:59:59Z' },
                    { day: 'wednesday', open: '2000-01-01T12:00:00Z', close: '2000-01-01T23:59:59Z' },
                    { day: 'thursday', open: '2000-01-01T12:00:00Z', close: '2000-01-01T23:59:59Z' },
                    { day: 'friday', open: '2000-01-01T12:00:00Z', close: '2000-01-01T23:59:59Z' },
                    { day: 'saturday', open: '2000-01-01T12:00:00Z', close: '2000-01-01T23:59:59Z' },
                ],
            }}
        />
    </Box>
);

export const Closed = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard
            organization={{
                ...organization,
                alwaysOpen: false,
                openingHours: [{ day: 'sunday', open: '2000-01-01T12:00:59Z', close: '2000-01-01T12:01:00Z' }],
            }}
        />
    </Box>
);

export const WhenFeatured = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={{ ...organization, featured: true }} />
    </Box>
);

export const WhenVerfied = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={{ ...organization, verified: true, featured: true }} />
    </Box>
);
export const WithLongTitle = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard
            organization={{
                ...organization,
                name: 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog',
                featured: true,
            }}
        />
    </Box>
);

export const WithManyCategories = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard
            organization={{
                ...organization,
                categories: [
                    { name: 'For everyone' },
                    { name: 'For youth' },
                    { name: 'All issues' },
                    { name: 'For women' },
                    { name: 'For men' },
                ],
            }}
        />
    </Box>
);

export const WhenVariant = (): ReactElement => (
    <Box m={2}>
        <OrganizationCard organization={organization} variant="widget" />
    </Box>
);
