import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CountrySelect from '.';

describe('CountrySelect', () => {
    const countries = [
        { code: 'AU', name: 'Australia' },
        { code: 'NZ', name: 'New Zealand' },
    ];

    it('should contain placeholder', () => {
        const { getByTestId } = render(<CountrySelect countries={countries} onChange={jest.fn()} />);
        expect(getByTestId('countryInput')).toHaveAttribute('placeholder', 'Start typing your country...');
    });

    describe('country', () => {
        it('should show flag', () => {
            const { getByRole, getByTestId } = render(<CountrySelect countries={countries} onChange={jest.fn()} />);
            const element = getByRole('textbox');
            fireEvent.click(element);
            fireEvent.change(element, { target: { value: 'Aus' } });
            expect(getByTestId('countryFlag').textContent).toEqual('🇦🇺');
        });
    });
});
