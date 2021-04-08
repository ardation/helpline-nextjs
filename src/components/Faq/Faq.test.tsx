import React from 'react';
import { render } from '@testing-library/react';
import Faq from '.';

describe('Faq', () => {
    it('should render Faq', () => {
        const { getByRole } = render(<Faq />);
        expect(getByRole('heading', { name: 'Gratitude' })).toBeInTheDocument();
    });
});
