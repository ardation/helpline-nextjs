import React from 'react';
import { render } from '@testing-library/react';
import Widget from '.';

describe('Widget', () => {
    const countries = [
        { code: 'AU', name: 'Australia', subdivisions: [] },
        {
            code: 'NZ',
            name: 'New Zealand',
            subdivisions: [
                { name: 'Bay of Plenty', code: 'BOP' },
                { name: 'Auckland', code: 'AUK' },
            ],
        },
    ];
    const topics = [{ name: 'happy' }, { name: 'sad' }];

    it('should contain correct text', () => {
        const { findByText } = render(<Widget countries={countries} filters={{ topics }} />);
        expect(findByText('Are you or someone else in immediate danger?')).toBeTruthy();
    });
});
