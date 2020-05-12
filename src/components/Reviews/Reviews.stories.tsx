import React, { ReactElement } from 'react';
import moment from 'moment-timezone';
import Reviews from '.';

const reviews = [
    { rating: 5, content: 'Leaving the first review!', createdAt: moment().subtract(3, 'days').toISOString() },
    { rating: 3, content: '', createdAt: moment().subtract(5, 'days').toISOString() },
    {
        rating: 0,
        content: 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.',
        createdAt: moment().subtract(7, 'days').toISOString(),
    },
];

export default {
    title: 'Reviews',
};

export const Default = (): ReactElement => <Reviews reviews={reviews} />;
