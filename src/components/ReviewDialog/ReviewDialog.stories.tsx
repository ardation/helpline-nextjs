import React, { ReactElement } from 'react';
import ReviewDialog from '.';

const organization = {
    id: 'c1d74c09-ecb0-46f3-902e-1feb22aad7ad',
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
    rating: 5,
    reviewCount: 5,
    reviews: [],
    subdivisions: [],
    featured: false,
    verified: false,
};

export default {
    title: 'ReviewDialog',
};

export const WhenButton = (): ReactElement => <ReviewDialog organization={organization} button={true} />;
export const WhenOpen = (): ReactElement => <ReviewDialog organization={organization} open={true} />;
