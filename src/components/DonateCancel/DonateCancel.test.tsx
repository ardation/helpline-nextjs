import React from 'react';
import { render } from '@testing-library/react';
import DonateCancel from '.';

describe('DonateCancel', () => {
    it('should render message', () => {
        const { getByRole } = render(<DonateCancel />);
        expect(getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
    });
});
