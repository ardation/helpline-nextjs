import React from 'react';
import { render } from '@testing-library/react';
import Template from '.';

describe('Template', () => {
    it('should contain correct text', () => {
        const { getByText } = render(<Template text="Need to leave quickly?" />);
        expect(getByText('Need to leave quickly?')).toBeInTheDocument();
    });
});
