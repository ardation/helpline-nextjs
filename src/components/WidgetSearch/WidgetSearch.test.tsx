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

    it('should change search url after country select', () => {
        const { getByTestId, getByRole } = render(<WidgetSearch countries={countries} />);
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au');
    });

    it('should change search url after country and subdivision select', () => {
        const { getByTestId, getAllByRole } = render(<WidgetSearch countries={countries} />);
        const countryElement = getAllByRole('textbox')[0];
        fireEvent.click(countryElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        const subdivisionElement = getAllByRole('textbox')[1];
        fireEvent.click(subdivisionElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/nz/bop');
    });
});
