import React, { ReactElement } from 'react';
import Chrome from '../Chrome';
import OrganizationList from '.';

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
        topics: [{ name: 'Stress' }],
        featured: false,
        verified: false,
        rating: 5,
        reviewCount: 10,
    },
];

export default {
    title: 'OrganizationList',
};

export const Default = (): ReactElement => (
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
);

export const WithSubdivision = (): ReactElement => (
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
);

export const WithTopics = (): ReactElement => (
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
);

export const WhenEmpty = (): ReactElement => (
    <Chrome country={{ emergencyNumber: '111' }}>
        <OrganizationList
            country={{ name: 'New Zealand' }}
            categories={[]}
            humanSupportTypes={[]}
            preselectedTopics={[]}
            topics={[]}
            organizations={[]}
        />
    </Chrome>
);
