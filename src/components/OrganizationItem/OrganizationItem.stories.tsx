import React, { ReactElement } from 'react';
import moment from 'moment-timezone';
import stubOrganizationReviewCreate from '../../../tests/stubs/stubOrganizationReviewCreate';
import OrganizationItem from '.';

const organization = {
    id: 'abc',
    slug: 'youthline',
    name: 'Youthline',
    rating: 5,
    reviewCount: 10,
    alwaysOpen: true,
    openingHours: [],
    humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
    categories: [{ name: 'For youth' }, { name: 'All issues' }],
    smsNumber: '234',
    phoneNumber: '0800 376 633',
    url: 'https://www.youthline.co.nz/learn-and-grow.html',
    chatUrl: 'https://youthline.co.nz',
    timezone: 'Pacific/Auckland',
    subdivisions: [{ name: 'Auckland' }],
    country: {
        name: 'New Zealand',
    },
    reviews: [],
    featured: false,
    verified: false,
};

const emptyOpeningHours = [
    { day: 'monday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'tuesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'wednesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'thursday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'friday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'saturday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
    { day: 'sunday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T00:01:00Z' },
];

export default {
    title: 'OrganizationItem',
    decorators: [stubOrganizationReviewCreate],
};

export const Default = (): ReactElement => <OrganizationItem organization={organization} />;

export const Basic = (): ReactElement => (
    <OrganizationItem
        organization={{
            ...organization,
            smsNumber: undefined,
            phoneNumber: undefined,
            chatUrl: undefined,
            url: undefined,
            categories: [],
            humanSupportTypes: [],
            alwaysOpen: false,
        }}
    />
);

export const NoSmsNumber = (): ReactElement => (
    <OrganizationItem organization={{ ...organization, smsNumber: undefined }} />
);

export const NoPhoneNumber = (): ReactElement => (
    <OrganizationItem organization={{ ...organization, phoneNumber: undefined }} />
);

export const NoChatUrl = (): ReactElement => (
    <OrganizationItem organization={{ ...organization, chatUrl: undefined }} />
);

export const NoUrl = (): ReactElement => <OrganizationItem organization={{ ...organization, url: undefined }} />;

export const NotAlwaysOpen = (): ReactElement => (
    <OrganizationItem
        organization={{
            ...organization,
            alwaysOpen: false,
            openingHours: emptyOpeningHours,
        }}
    />
);

const reviews = [
    { rating: 5, content: 'Leaving the first review!', createdAt: moment().subtract(3, 'days').toISOString() },
    { rating: 3, content: '', createdAt: moment().subtract(5, 'days').toISOString() },
    {
        rating: 0,
        content: 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.',
        createdAt: moment().subtract(7, 'days').toISOString(),
    },
];

export const NoSubdivisions = (): ReactElement => (
    <OrganizationItem organization={{ ...organization, subdivisions: [] }} />
);

export const WithReviews = (): ReactElement => (
    <OrganizationItem organization={{ ...organization, reviews: reviews }} />
);

export const WhenFeatured = (): ReactElement => <OrganizationItem organization={{ ...organization, featured: true }} />;

export const WhenVerified = (): ReactElement => (
    <OrganizationItem organization={{ ...organization, featured: true, verified: true }} />
);

export const WithNotes = (): ReactElement => (
    <OrganizationItem
        organization={{
            ...organization,
            notes: 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.',
        }}
    />
);
