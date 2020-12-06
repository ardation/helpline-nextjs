import React from 'react';
import { render } from '@testing-library/react';
import About from '.';

describe('About', () => {
    it('should contain Learn more link', () => {
        const { getByText } = render(<About />);
        expect(getByText('Learn more').parentElement).toHaveAttribute('href', '/get-the-widget');
    });
});
