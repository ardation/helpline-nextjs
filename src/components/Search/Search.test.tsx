import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OrganizationProvider } from '../../context/organizationContext';
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

    const withContextProvider = (WrappedSearchHeader, props) => {
        return (
            <OrganizationProvider
                activeCountry={countries[0]}
                countries={countries}
                allOrganizations={[]}
                filterOptions={{
                    topics: topics,
                    categories: undefined,
                    humanSupportTypes: undefined,
                }}
            >
                <WrappedSearchHeader {...props} />
            </OrganizationProvider>
        );
    };

    it('should show correct text', () => {
        const { getByText, getByRole } = render(withContextProvider(Search, { countries: countries, topics: topics }));
        expect(getByText("Struggling? Talk to a real person about what's going on, for free.")).toBeTruthy();
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        expect(getByText('What would you like help with?')).toBeTruthy();
    });

    it('should change search url after country select', () => {
        const { getByTestId, getByRole } = render(
            withContextProvider(Search, { countries: countries, topics: topics }),
        );
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au');
    });

    it('should change search url after country and subdivision select', () => {
        const { getByTestId, getAllByRole } = render(
            withContextProvider(Search, { countries: countries, topics: topics }),
        );
        const countryElement = getAllByRole('textbox')[0];
        fireEvent.click(countryElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        const subdivisionElement = getAllByRole('textbox')[1];
        fireEvent.click(subdivisionElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/nz/bop');
    });

    it('should change search url after topic select', () => {
        const { getByTestId, getByRole, getAllByTestId } = render(
            withContextProvider(Search, { countries: countries, topics: topics }),
        );
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        const elements = getAllByTestId('itemChip');
        fireEvent.click(elements[0]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au?topics=happy');
    });
});
