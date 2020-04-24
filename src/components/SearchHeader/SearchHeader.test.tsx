import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OrganizationProvider } from '../../context/organizationContext';
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

    const withContextProvider = (WrappedSearchHeader, props) => {
        return (
            <OrganizationProvider
                activeCountry={countries[0]}
                countries={countries}
                allOrganizations={[]}
                filterOptions={{
                    topics: undefined,
                    categories: undefined,
                    humanSupportTypes: undefined,
                }}
            >
                <WrappedSearchHeader {...props} />
            </OrganizationProvider>
        );
    };

    it('should show correct text', () => {
        const { getByText } = render(withContextProvider(SearchHeader, { countries: countries }));
        expect(getByText('Struggling? Talk to a real person, for free.')).toBeTruthy();
    });

    it('should change search url after country select', () => {
        const { getByTestId, getByRole } = render(withContextProvider(SearchHeader, { countries: countries }));
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        const searchButton = getByTestId('searchButton');
        expect(searchButton).toHaveAttribute('href', '/au');
    });

    it('should change search url after country and subdivision select', () => {
        const { getByTestId, getAllByRole } = render(withContextProvider(SearchHeader, { countries: countries }));
        const countryElement = getAllByRole('textbox')[0];
        fireEvent.click(countryElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        const subdivisionElement = getAllByRole('textbox')[1];
        fireEvent.click(subdivisionElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        const searchButton = getByTestId('searchButton');
        expect(searchButton).toHaveAttribute('href', '/nz/bop');
    });

    it('should change search url with the correct url prefix', () => {
        const { getByTestId, getByRole } = render(
            withContextProvider(SearchHeader, { countries: countries, parentPage: 'widget' }),
        );
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        const searchButton = getByTestId('searchButton');
        expect(searchButton).toHaveAttribute('href', '/widget/au');
    });
});
