import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CountrySelect from '.';

describe('CountrySelect', () => {
    const countries = [
        {
            code: 'NZ',
            name: 'New Zealand',
            subdivisions: [
                { name: 'Bay of Plenty', code: 'BOP' },
                { name: 'Auckland', code: 'AUK' },
            ],
        },
        { code: 'AU', name: 'Australia', subdivisions: [] },
    ];

    it('should contain placeholder', () => {
        const { getByTestId } = render(
            <CountrySelect countries={countries} onCountryChange={jest.fn()} onSubdivisionChange={jest.fn()} />,
        );
        expect(getByTestId('countryInput')).toHaveAttribute('placeholder', 'Start typing your country...');
    });

    it('should show flag', () => {
        const { getByRole, getByTestId } = render(
            <CountrySelect countries={countries} onCountryChange={jest.fn()} onSubdivisionChange={jest.fn()} />,
        );
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.change(element, { target: { value: 'Aus' } });
        expect(getByTestId('countryFlag').textContent).toEqual('🇦🇺');
    });

    it('should call onCountryChange', () => {
        const onCountryChange = (country): void => {
            expect(country).toEqual({ code: 'AU', name: 'Australia', subdivisions: [] });
        };

        const { getAllByRole } = render(
            <CountrySelect countries={countries} onCountryChange={onCountryChange} onSubdivisionChange={jest.fn()} />,
        );
        const countryElement = getAllByRole('textbox')[0];
        fireEvent.click(countryElement);
        fireEvent.click(getAllByRole('listbox')[0].children[0]);
    });

    it('should call onSubdivisionChange', () => {
        let counter = 0;
        const onSubdivisionChange = (subdivision): void => {
            if (counter == 0) {
                expect(subdivision).toEqual(null);
            } else {
                expect(subdivision).toEqual({ name: 'Bay of Plenty', code: 'BOP' });
            }
            counter += 1;
        };

        const { getAllByRole } = render(
            <CountrySelect
                countries={countries}
                onCountryChange={jest.fn()}
                onSubdivisionChange={onSubdivisionChange}
            />,
        );
        const countryElement = getAllByRole('textbox')[0];
        fireEvent.click(countryElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
        const subdivisionElement = getAllByRole('textbox')[1];
        fireEvent.click(subdivisionElement);
        fireEvent.click(getAllByRole('listbox')[0].children[1]);
    });
});
