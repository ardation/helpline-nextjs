import React, { ReactElement } from 'react';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
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
};

export default {
    title: 'OrganizationCard',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard organization={organization} />
        </Box>
    </ThemeProvider>
);

export const Basic = (): ReactElement => (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
);

export const NoSmsNumber = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard organization={{ ...organization, smsNumber: undefined }} />
        </Box>
    </ThemeProvider>
);

export const NoPhoneNumber = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard organization={{ ...organization, phoneNumber: undefined }} />
        </Box>
    </ThemeProvider>
);

export const NoChatUrl = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard organization={{ ...organization, chatUrl: undefined }} />
        </Box>
    </ThemeProvider>
);

export const NoUrl = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard organization={{ ...organization, url: undefined }} />
        </Box>
    </ThemeProvider>
);

export const Open = (): ReactElement => (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
);

export const Closed = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard
                organization={{
                    ...organization,
                    alwaysOpen: false,
                    openingHours: [{ day: 'sunday', open: '2000-01-01T12:00:59Z', close: '2000-01-01T12:01:00Z' }],
                }}
            />
        </Box>
    </ThemeProvider>
);

export const WithFeatured = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard organization={{ ...organization, featured: true }} />
        </Box>
    </ThemeProvider>
);

export const WithLongTitle = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard
                organization={{
                    ...organization,
                    name: 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog',
                    featured: true,
                }}
            />
        </Box>
    </ThemeProvider>
);

export const WithManyCategories = (): ReactElement => (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
);

export const WhenVariant = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <OrganizationCard organization={organization} variant="widget" />
        </Box>
    </ThemeProvider>
);
