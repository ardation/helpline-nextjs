import React from 'react';
import { render } from '@testing-library/react';
import DonateSuccess from '.';

describe('DonateSuccess', () => {
    it('should render message', () => {
        const { getByText } = render(<DonateSuccess />);
        expect(getByText('Donation Received')).toBeInTheDocument();
    });
});
