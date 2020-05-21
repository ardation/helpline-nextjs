import React, { ReactElement } from 'react';
import stubOrganizationReviewCreate from '../../../tests/stubs/stubOrganizationReviewCreate';
import ReviewModal from '.';

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
};

export default {
    title: 'ReviewModal',
    decorators: [stubOrganizationReviewCreate],
};

export const WhenButton = (): ReactElement => <ReviewModal organization={organization} />;
export const WhenOpen = (): ReactElement => <ReviewModal organization={organization} open={true} />;
export const WhenNotice = (): ReactElement => <ReviewModal organization={organization} open={true} notice={true} />;
