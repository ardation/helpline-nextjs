import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WidgetSearch from '.';

describe('SearchHeader', () => {
    const preselectedCountry = { code: 'AU', name: 'Australia', subdivisions: [] };
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

    it('should change search url after country select', () => {
        const { getByText, getByRole } = render(
            <WidgetSearch preselectedCountry={preselectedCountry} countries={countries} />,
        );
        fireEvent.click(getByRole('textbox'));
        fireEvent.click(getByRole('listbox').children[0]);
        expect(getByText('Search').parentElement).toHaveAttribute('href', '/widget/au');
    });

    it('should change search url after country and subdivision select', () => {
        const { getByText, getAllByRole } = render(
            <WidgetSearch preselectedCountry={preselectedCountry} countries={countries} />,
        );
        fireEvent.click(getAllByRole('textbox')[0]);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        fireEvent.click(getAllByRole('textbox')[1]);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        expect(getByText('Search').parentElement).toHaveAttribute('href', '/widget/nz/bop');
    });
});
