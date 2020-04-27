import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import Widget from '.';

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
        timezone: 'Pacific/Auckland',
        topics: [{ name: 'Anxiety' }],
        featured: false,
    },
    {
        slug: 'kidscan',
        name: 'KidsCan',
        alwaysOpen: false,
        openingHours: [],
        humanSupportTypes: [],
        categories: [],
        timezone: 'Pacific/Auckland',
        topics: [],
        featured: false,
    },
];

const country = {
    code: 'NZ',
    name: 'New Zealand',
    emergencyNumber: '111',
    subdivisions: [
        { name: 'Bay of Plenty', code: 'BOP' },
        { name: 'Auckland', code: 'AUK' },
    ],
};

const countries = [
    { code: 'AU', name: 'Australia', emergencyNumber: '111', subdivisions: [] },
    {
        code: 'NZ',
        name: 'New Zealand',
        emergencyNumber: '111',
        subdivisions: [
            { name: 'Bay of Plenty', code: 'BOP' },
            { name: 'Auckland', code: 'AUK' },
        ],
    },
];

export default {
    title: 'Widget',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Widget
            preselectedCountry={country}
            countries={countries}
            categories={[]}
            humanSupportTypes={[]}
            topics={[]}
            organizations={organizations}
        />
    </ThemeProvider>
);

export const WithSubdivision = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Widget
            preselectedCountry={country}
            countries={countries}
            preselectedSubdivision={country.subdivisions[0]}
            categories={[]}
            humanSupportTypes={[]}
            topics={[]}
            organizations={organizations}
        />
    </ThemeProvider>
);
