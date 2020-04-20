import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchHeader from '.';

describe('SearchHeader', () => {
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
    const onSearchChange = jest.fn();

    it('should show correct text', () => {
        const { getByText } = render(<SearchHeader countries={countries} />);
        expect(getByText('Struggling? Talk to a real person, for free.')).toBeTruthy();
    });

    it('should pass the correct data when country select', () => {
        const { getByTestId, getByRole, getAllByRole } = render(
            <SearchHeader countries={countries} onSearchChange={onSearchChange} />,
        );
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        const searchButton = getByTestId('searchButton');
        fireEvent.click(searchButton);
        expect(onSearchChange).toBeCalledWith(
            expect.objectContaining({
                country: expect.objectContaining({ code: 'AU' }),
            }),
        );
    });

    it('should pass the correct data when country and subdivision select', () => {
        const { getByTestId, getAllByRole } = render(
            <SearchHeader countries={countries} onSearchChange={onSearchChange} />,
        );
        const countryElement = getAllByRole('textbox')[0];
        fireEvent.click(countryElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        const subdivisionElement = getAllByRole('textbox')[1];
        fireEvent.click(subdivisionElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        const searchButton = getByTestId('searchButton');
        fireEvent.click(searchButton);
        expect(onSearchChange).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                country: expect.objectContaining({ code: 'NZ' }),
                subdivision: expect.objectContaining({ code: 'BOP' }),
            }),
        );
    });
});
