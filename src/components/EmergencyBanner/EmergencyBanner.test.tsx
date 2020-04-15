import React from 'react';
import { render } from '@testing-library/react';
import EmergencyBanner from '.';

describe('EmergencyBanner', () => {
    const country = {
        emergencyNumber: '911',
    };
    it('should contain correct text', () => {
        const { findByText } = render(<EmergencyBanner country={country} />);
        expect(findByText('Are you or someone else in immediate danger?')).toBeTruthy();
    });

    it('should contain emergency link', () => {
        const { getByTestId } = render(<EmergencyBanner country={country} />);
        const element = getByTestId('emergencyServicesButton');
        expect(element).toHaveAttribute('href', 'tel:911');
    });

    it('should default to 911 emergency link without country given', () => {
        const { getByTestId } = render(<EmergencyBanner />);
        const element = getByTestId('emergencyServicesButton');
        expect(element).toHaveAttribute('href', 'tel:911');
    });
});
