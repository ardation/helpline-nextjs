import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '.';

describe('Search', () => {
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

    it('should show correct text', () => {
        const { getByText, getByRole } = render(<Search countries={countries} topics={topics} />);
        expect(
            getByText('Struggling? Get free, confidential support from a real human over phone, text or webchat.'),
        ).toBeTruthy();
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        expect(getByText('What would you like help with?')).toBeTruthy();
    });

    it('should change search url after country select', () => {
        const { getByTestId, getByRole } = render(<Search countries={countries} topics={topics} />);
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au');
    });

    it('should change search url after country and subdivision select', () => {
        const { getByTestId, getAllByRole } = render(<Search countries={countries} topics={topics} />);
        const countryElement = getAllByRole('textbox')[0];
        fireEvent.click(countryElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        const subdivisionElement = getAllByRole('textbox')[1];
        fireEvent.click(subdivisionElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/nz/bop');
    });

    it('should change search url after topic select', () => {
        const { getByTestId, getByRole, getAllByTestId } = render(<Search countries={countries} topics={topics} />);
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        const elements = getAllByTestId('itemChip');
        fireEvent.click(elements[0]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au?topics=happy');
    });
});
