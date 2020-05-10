import React, { ReactElement } from 'react';
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
    timezone: 'Pacific/Auckland',
    topics: [],
    rating: 5,
    reviewCount: 10,
});

export default {
    title: 'WidgetOrganizationList',
};

export const Default = (): ReactElement => <WidgetOrganizationList organizations={organizations} />;

export const WhenEmpty = (): ReactElement => <WidgetOrganizationList organizations={[]} />;

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
