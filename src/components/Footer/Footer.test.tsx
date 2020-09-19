import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';

describe('Footer', () => {
    it('should contain correct links', () => {
        const { getByTestId, getByText } = render(<Footer />);
        expect(getByTestId('privacy')).toHaveAttribute('href', '/privacy');
        expect(getByTestId('terms')).toHaveAttribute('href', '/terms');
        expect(getByTestId('about')).toHaveAttribute('href', '/about');
        expect(getByTestId('contact')).toHaveAttribute('href', '/contact');
        expect(getByText(`Powered by Live For Tomorrow © ${new Date().getFullYear()}`)).toBeTruthy();
    });
});
