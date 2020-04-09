import React from 'react';
import { render } from '@testing-library/react';
import Widget from '.';

describe('Widget', () => {
    describe('country', () => {
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

        it('should contain correct text', () => {
            const { findByText } = render(<Widget countries={countries} topics={topics} />);
            expect(findByText('Are you or someone else in immediate danger?')).toBeTruthy();
        });

        it('should contain emergency link', () => {
            const { getByTestId } = render(<Widget countries={countries} topics={topics} />);
            const element = getByTestId('emergencyServicesButton');
            expect(element).toHaveAttribute('href', 'tel:111');
        });
    });
});
