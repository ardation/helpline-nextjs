import React from 'react';
import { render } from '@testing-library/react';
import NavBar from '.';

describe('NavBar', () => {
    it('should render children', () => {
        const { getByTestId } = render(
            <NavBar>
                <div data-testid="childElement"></div>
            </NavBar>,
        );
        expect(getByTestId('childElement')).toBeTruthy();
    });
});
