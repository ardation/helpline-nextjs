import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import Chrome from '../Chrome';
import OrganizationList from '.';

const organizations = [
    {
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
        topics: [{ name: 'Anxiety' }],
    },
    {
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
        topics: [{ name: 'Stress' }],
    },
];

export default {
    title: 'OrganizationList',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Chrome country={{ emergencyNumber: '111' }}>
            <OrganizationList
                country={{ name: 'New Zealand' }}
                categories={[]}
                humanSupportTypes={[]}
                preselectedTopics={[]}
                topics={[]}
                organizations={organizations}
            />
        </Chrome>
    </ThemeProvider>
);

export const WithSubdivision = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Chrome country={{ emergencyNumber: '111' }}>
            <OrganizationList
                country={{ name: 'New Zealand' }}
                subdivision={{ name: 'Auckland' }}
                categories={[]}
                humanSupportTypes={[]}
                preselectedTopics={[]}
                topics={[]}
                organizations={organizations}
            />
        </Chrome>
    </ThemeProvider>
);

export const WithTopics = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Chrome country={{ emergencyNumber: '111' }}>
            <OrganizationList
                country={{ name: 'New Zealand' }}
                categories={[]}
                humanSupportTypes={[]}
                preselectedTopics={[{ name: 'Anxiety' }, { name: 'Stress' }]}
                topics={[{ name: 'Anxiety' }, { name: 'Bullying' }, { name: 'Stress' }]}
                organizations={organizations}
            />
        </Chrome>
    </ThemeProvider>
);
