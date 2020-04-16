import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WidgetSearch from '.';

describe('WidgetSearch', () => {
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

    it('should show correct text', () => {
        const { getByText } = render(<WidgetSearch countries={countries} />);
        expect(getByText('Struggling? Talk to a real person, for free.')).toBeTruthy();
    });
});
