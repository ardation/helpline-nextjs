import React from 'react';
import { render } from '@testing-library/react';
import About from '.';

describe('About', () => {
    it('should render about', () => {
        const { getByRole, getByText, rerender } = render(<About countries={[]} />);
        expect(getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', '/get-the-widget');
        expect(getByRole('link', { name: 'Find a helpline' })).toHaveAttribute('href', '#top');
        rerender(<About countries={[{ code: 'NZ', name: 'New Zealand' }]} isPage />);
        expect(getByRole('link', { name: 'Find a helpline' })).toHaveAttribute('href', '/');
        expect(getByText('New Zealand').parentElement.getAttribute('href')).toEqual('/nz');
    });
});
