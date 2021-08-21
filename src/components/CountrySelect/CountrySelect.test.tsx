import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LocalityEnum } from '../../../types/globalTypes';
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
            locality: LocalityEnum.LOCATION,
            subregion: 'Australia and New Zealand',
        },
        {
            code: 'AU',
            name: 'Australia',
            subdivisions: [],
            locality: LocalityEnum.LOCATION,
            subregion: 'Australia and New Zealand',
        },
    ];

    it('should contain placeholder', () => {
        const { getByTestId } = render(
            <CountrySelect countries={countries} onCountryChange={jest.fn()} onSubdivisionChange={jest.fn()} />,
        );
        expect(getByTestId('countryInput')).toHaveAttribute('placeholder', 'Start typing your country...');
    });

    it('should call onCountryChange', () => {
        const onCountryChange = (country): void => {
            expect(country).toEqual({
                code: 'AU',
                name: 'Australia',
                subdivisions: [],
                subregion: 'Australia and New Zealand',
                locality: LocalityEnum.LOCATION,
            });
        };

        const { getByRole } = render(
            <CountrySelect countries={countries} onCountryChange={onCountryChange} onSubdivisionChange={jest.fn()} />,
        );
        fireEvent.click(getByRole('button', { name: 'Open' }));
        fireEvent.click(getByRole('option', { name: 'Australia' }));
    });

    it('should call onSubdivisionChange', () => {
        const onSubdivisionChange = (subdivision): void => {
            expect(subdivision).toEqual({ name: 'Bay of Plenty', code: 'BOP' });
        };
        const { getByRole, getAllByRole } = render(
            <CountrySelect
                countries={countries}
                onCountryChange={jest.fn()}
                onSubdivisionChange={onSubdivisionChange}
            />,
        );
        fireEvent.click(getByRole('button', { name: 'Open' }));
        fireEvent.click(getByRole('option', { name: 'New Zealand' }));
        fireEvent.click(getAllByRole('button', { name: 'Open' })[1]);
        fireEvent.click(getByRole('option', { name: 'Bay of Plenty' }));
    });
});
