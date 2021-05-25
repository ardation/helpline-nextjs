import React from 'react';
import { render } from '@testing-library/react';
import DonateCancelled from '.';

describe('DonateCancelled', () => {
    it('should render message', () => {
        const { getByRole } = render(<DonateCancelled />);
        expect(getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
    });
});
