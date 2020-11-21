import React, { ReactElement } from 'react';
import OrganizationEmpty from '.';

export default {
    title: 'OrganizationEmpty',
};

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
];

export const Default = (): ReactElement => <OrganizationEmpty organizations={[]} />;

export const WithOrganizations = (): ReactElement => <OrganizationEmpty organizations={organizations} />;

export const WhenWidget = (): ReactElement => <OrganizationEmpty organizations={organizations} variant="widget" />;
