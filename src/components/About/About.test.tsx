import React from 'react';
import { render } from '@testing-library/react';
import About from '.';

describe('About', () => {
    it('should contain Find a helpline link', () => {
        const { getByText } = render(<About />);
        expect(getByText('Find a helpline').parentElement).toHaveAttribute('href', '/');
    });
});
