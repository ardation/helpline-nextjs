import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TestRouter from '../../../tests/TestRouter';
import Legal from '.';

describe('Legal', () => {
    it('default', () => {
        const replace = jest.fn();
        const { getByRole } = render(
            <TestRouter router={{ replace }}>
                <Legal tab="privacy" />
            </TestRouter>,
        );
        expect(getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument();
        fireEvent.click(getByRole('tab', { name: 'Terms of Service' }));
        expect(replace).toHaveBeenCalledWith('/terms');
        expect(getByRole('heading', { name: 'Terms of Service' })).toBeInTheDocument();
        fireEvent.click(getByRole('tab', { name: 'Privacy Policy' }));
        expect(replace).toHaveBeenCalledWith('/privacy');
    });

    it('should render terms of service', () => {
        const { getByRole } = render(
            <TestRouter>
                <Legal tab="terms" />
            </TestRouter>,
        );
        expect(getByRole('heading', { name: 'Terms of Service' })).toBeInTheDocument();
    });
});
