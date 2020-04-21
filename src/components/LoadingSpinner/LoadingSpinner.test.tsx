import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '.';

describe('Spinner', () => {
    it('should load component container', () => {
        const { getByTestId } = render(<Spinner />);
        expect(getByTestId('spinnerContainer')).toBeTruthy();
    });
});
