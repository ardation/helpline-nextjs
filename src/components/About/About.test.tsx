import React from 'react';
import { render } from '@testing-library/react';
import About from '.';

describe('About', () => {
    it('should contain correct links', () => {
        const { getByRole } = render(<About countries={[]} />);
        expect(getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', '/get-the-widget');
        expect(getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact');
    });
});
