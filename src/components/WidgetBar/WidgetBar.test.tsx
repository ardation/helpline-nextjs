import React from 'react';
import { render } from '@testing-library/react';
import WidgetBar from '.';

describe('WidgetBar', () => {
    it('should contain correct text', () => {
        const { findByText } = render(<WidgetBar />);
        expect(findByText('Need to leave quickly? Click to leave this site and open the weather.')).toBeTruthy();
    });

    describe('country', () => {
        const country = { emergencyNumber: '111' };

        it('should contain correct text', () => {
            const { findByText } = render(<WidgetBar country={country} />);
            expect(findByText('Are you or someone else in immediate danger?')).toBeTruthy();
        });

        it('should contain emergency link', () => {
            const { getByTestId } = render(<WidgetBar country={country} />);
            const element = getByTestId('emergencyServicesButton');
            expect(element).toHaveAttribute('href', 'tel:111');
        });
    });
});
