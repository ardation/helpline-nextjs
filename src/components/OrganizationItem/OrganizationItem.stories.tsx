import React, { ReactElement } from 'react';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
import OrganizationItem from '.';

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
    country: {
        name: 'New Zealand',
    },
};

export default {
    title: 'OrganizationItem',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationItem organization={organization} />
    </ThemeProvider>
);

export const Basic = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationItem
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
    </ThemeProvider>
);

export const NoSmsNumber = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationItem organization={{ ...organization, smsNumber: undefined }} />
    </ThemeProvider>
);

export const NoPhoneNumber = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationItem organization={{ ...organization, phoneNumber: undefined }} />
    </ThemeProvider>
);

export const NoChatUrl = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationItem organization={{ ...organization, chatUrl: undefined }} />
    </ThemeProvider>
);

export const NoUrl = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationItem organization={{ ...organization, url: undefined }} />
    </ThemeProvider>
);

export const NotAlwaysOpen = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationItem
            organization={{
                ...organization,
                alwaysOpen: false,
                openingHours: [{ day: 'sunday', open: '2000-01-01T09:00:00Z', close: '2000-01-01T15:00:00Z' }],
            }}
        />
    </ThemeProvider>
);
