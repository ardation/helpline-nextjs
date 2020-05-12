import React from 'react';
import { render } from '@testing-library/react';
import moment from 'moment-timezone';
import Reviews from '.';

describe('Reviews', () => {
    const reviews = [
        { rating: 5, content: 'Leaving the first review!', createdAt: moment().subtract(3, 'days').toISOString() },
        { rating: 3, content: '', createdAt: moment().subtract(5, 'days').toISOString() },
        {
            rating: 0,
            content: 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.',
            createdAt: moment().subtract(7, 'days').toISOString(),
        },
    ];

    it('should show content of review', () => {
        const { getByText } = render(<Reviews reviews={reviews} />);
        expect(getByText('Leaving the first review!')).toBeTruthy();
        expect(
            getByText('The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.'),
        ).toBeTruthy();
    });

    it('should show moment fromNow', () => {
        const { getByText } = render(<Reviews reviews={reviews} />);
        expect(getByText('3 days ago')).toBeTruthy();
        expect(getByText('5 days ago')).toBeTruthy();
        expect(getByText('7 days ago')).toBeTruthy();
    });
});
