import React from 'react';
import { render } from '@testing-library/react';
import WidgetBar from '.';

describe('WidgetBar', () => {
    const emergencyNumber = '911';
    it('should contain correct text', () => {
        const { findByText } = render(<WidgetBar emergencyNumber={emergencyNumber} />);
        expect(findByText('Are you or someone else in immediate danger?')).toBeTruthy();
    });

    it('should contain emergency link', () => {
        const { getByTestId } = render(<WidgetBar emergencyNumber={emergencyNumber} />);
        const element = getByTestId('emergencyServicesButton');
        expect(element).toHaveAttribute('href', 'tel:911');
    });

    it('should default to 911 emergency link without emergencyNumber given', () => {
        const { getByTestId } = render(<WidgetBar />);
        const element = getByTestId('emergencyServicesButton');
        expect(element).toHaveAttribute('href', 'tel:911');
    });
});
