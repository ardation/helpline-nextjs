import React from 'react';
import { render } from '@testing-library/react';
import Gratitude from '.';

describe('Gratitude', () => {
    it('should render gratitude', () => {
        const { getByRole } = render(<Gratitude />);
        expect(getByRole('heading', { name: 'Gratitude' })).toBeInTheDocument();
    });
});
