import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import router from 'next/router';
import Legal from '.';

jest.mock('next/router', () => require('next-router-mock'));

describe('Legal', () => {
    it('default', () => {
        const { getByRole } = render(<Legal tab="privacy" />);
        expect(getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument();
        fireEvent.click(getByRole('tab', { name: 'Terms of Service' }));
        expect(router).toMatchObject({
            asPath: '/terms',
            pathname: '/terms',
            query: {},
        });
        expect(getByRole('heading', { name: 'Terms of Service' })).toBeInTheDocument();
        fireEvent.click(getByRole('tab', { name: 'Privacy Policy' }));
        expect(router).toMatchObject({
            asPath: '/privacy',
            pathname: '/privacy',
            query: {},
        });
    });

    it('should render terms of service', () => {
        const { getByRole } = render(<Legal tab="terms" />);
        expect(getByRole('heading', { name: 'Terms of Service' })).toBeInTheDocument();
    });
});
