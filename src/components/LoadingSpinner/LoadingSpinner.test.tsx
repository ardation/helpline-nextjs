import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '.';

describe('LoadingSpinner', () => {
    it('should load component container', () => {
        const { getByTestId } = render(<LoadingSpinner />);
        expect(getByTestId('spinnerContainer')).toBeTruthy();
    });
});
