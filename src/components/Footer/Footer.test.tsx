import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';

describe('Footer', () => {
    it('should contain correct links', () => {
        const { getByTestId } = render(<Footer />);
        expect(getByTestId('about')).toHaveAttribute('href', '/about');
        expect(getByTestId('getTheWidget')).toHaveAttribute('href', '/get-the-widget');
        expect(getByTestId('contact')).toHaveAttribute('href', '/contact');
        expect(getByTestId('gratitude')).toHaveAttribute('href', '/gratitude');
        expect(getByTestId('privacy')).toHaveAttribute('href', '/privacy');
        expect(getByTestId('terms')).toHaveAttribute('href', '/terms');
    });
});
