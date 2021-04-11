import React from 'react';
import { render } from '@testing-library/react';
import matchMediaMock from '../../../__tests__/util/matchMediaMock';
import NavBar from '.';

describe('NavBar', () => {
    it('should render children', () => {
        const { getByTestId, queryByText, getByRole } = render(
            <NavBar>
                <div data-testid="childElement"></div>
            </NavBar>,
        );
        expect(getByTestId('childElement')).toBeInTheDocument();
        expect(queryByText('Struggling? Talk to a real person, for free.')).not.toBeInTheDocument();
        expect(getByRole('link', { name: 'find a helpline' })).toHaveAttribute('href', '/');
    });

    describe('widget', () => {
        beforeEach(() => {
            matchMediaMock({ width: '1024px' });
        });

        it('should render widget variant', () => {
            const { getByTestId, getByText, queryByRole } = render(
                <NavBar variant="widget">
                    <div data-testid="childElement"></div>
                </NavBar>,
            );
            expect(getByTestId('childElement')).toBeInTheDocument();
            expect(getByText('Struggling? Get free, confidential support from a real person.')).toBeInTheDocument();
            expect(queryByRole('link', { name: 'find a helpline' })).not.toBeInTheDocument();
        });
    });
});
