import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import ReviewModal from '.';

const organization = {
    slug: 'youthline',
    name: 'Youthline Youthline Youthline Youthline',
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
    title: 'ReviewModal',
};

export const WhenButton = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <ReviewModal organization={organization} />
    </ThemeProvider>
);

export const WhenOpen = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <ReviewModal organization={organization} open={true} />
    </ThemeProvider>
);

export const WhenNotice = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <ReviewModal organization={organization} open={true} notice={true} />
    </ThemeProvider>
);
