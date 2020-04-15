import React from 'react';
import { render } from '@testing-library/react';
import WidgetBar from '.';

describe('WidgetBar', () => {
    const country = {
        emergencyNumber: '911',
    };
    it('should contain correct text', () => {
        const { findByText } = render(<WidgetBar country={country} />);
        expect(findByText('Are you or someone else in immediate danger?')).toBeTruthy();
    });

    it('should contain emergency link', () => {
        const { getByTestId } = render(<WidgetBar country={country} />);
        const element = getByTestId('emergencyServicesButton');
        expect(element).toHaveAttribute('href', 'tel:911');
    });

    it('should default to 911 emergency link without country given', () => {
        const { getByTestId } = render(<WidgetBar />);
        const element = getByTestId('emergencyServicesButton');
        expect(element).toHaveAttribute('href', 'tel:911');
    });
});
