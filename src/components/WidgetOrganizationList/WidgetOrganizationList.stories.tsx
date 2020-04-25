import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import WidgetOrganizationList from '.';

const organizations = Array(8).fill({
    slug: 'youthline',
    name: 'Youthline',
    alwaysOpen: true,
    openingHours: [],
    humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
    categories: [{ name: 'For youth' }, { name: 'All issues' }],
    smsNumber: '234',
    phoneNumber: '0800 376 633',
    url: 'https://youthline.co.nz/website',
    chatUrl: 'https://youthline.co.nz/chat',
    timezone: 'Auckland',
    topics: [],
});

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
