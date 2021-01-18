import React from 'react';
import { render } from '@testing-library/react';
import About from '.';

describe('About', () => {
    it('should contain correct links', () => {
        const { getByText } = render(<About countries={[]} />);
        expect(getByText('Learn more').parentElement).toHaveAttribute('href', '/get-the-widget');
        expect(getByText('Get in touch').parentElement).toHaveAttribute('href', '/contact');
    });
});
