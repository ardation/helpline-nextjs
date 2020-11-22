import React, { ReactElement } from 'react';
import WidgetOrganizationList from '.';

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
        topics: [],
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

export default {
    title: 'WidgetOrganizationList',
};

export const Default = (): ReactElement => (
    <WidgetOrganizationList organizations={organizations} organizationsWhenEmpty={organizations} />
);

export const WhenEmpty = (): ReactElement => (
    <WidgetOrganizationList organizations={[]} organizationsWhenEmpty={organizations} />
);

export const WhenNoAlternatives = (): ReactElement => (
    <WidgetOrganizationList organizations={[]} organizationsWhenEmpty={[]} />
);

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
