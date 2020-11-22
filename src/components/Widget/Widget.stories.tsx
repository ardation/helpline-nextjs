import React, { ReactElement } from 'react';
import { LocalityEnum } from '../../../types/globalTypes';
import Widget from '.';

const organizations = [
    {
        id: 'youthline',
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
        verified: false,
        rating: 5,
        reviewCount: 10,
    },
    {
        id: 'kidscan',
        slug: 'kidscan',
        name: 'KidsCan',
        alwaysOpen: false,
        openingHours: [],
        humanSupportTypes: [],
        categories: [],
        timezone: 'Pacific/Auckland',
        topics: [],
        featured: false,
        verified: false,
        rating: 5,
        reviewCount: 10,
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
    locality: LocalityEnum.LOCATION,
};

const countries = [
    { code: 'AU', name: 'Australia', emergencyNumber: '111', subdivisions: [], locality: LocalityEnum.LOCATION },
    {
        code: 'NZ',
        name: 'New Zealand',
        emergencyNumber: '111',
        subdivisions: [
            { name: 'Bay of Plenty', code: 'BOP' },
            { name: 'Auckland', code: 'AUK' },
        ],
        locality: LocalityEnum.LOCATION,
    },
];

export const widgetPropsMock = {
    preselectedCountry: country,
    countries: countries,
    categories: [],
    humanSupportTypes: [],
    topics: [],
    preselectedTopics: [],
    organizations: organizations,
    organizationsWhenEmpty: organizations,
};

export default {
    title: 'Widget',
};

export const Default = (): ReactElement => <Widget {...widgetPropsMock} />;

export const WithSubdivision = (): ReactElement => (
    <Widget {...widgetPropsMock} preselectedSubdivision={country.subdivisions[0]} />
);
