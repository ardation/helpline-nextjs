import React from 'react';
import { render } from '@testing-library/react';
import OrganizationOpen from '.';

jest.mock('../../util/isOpen');

describe('OrganizationOpen', () => {
    const organization = {
        slug: 'abc',
        rating: 5,
        reviewCount: 10,
    };

    it('should show link', () => {
        const { getByTestId } = render(<OrganizationOpen organization={organization} />);
        expect(getByTestId('reviewsLink')).toHaveAttribute('href', '/organizations/abc');
    });

    it('should should shorten rating', () => {
        const { getByText } = render(<OrganizationOpen organization={{ ...organization, rating: 3.565 }} />);
        expect(getByText('3.6')).toBeTruthy();
    });

    describe('item', () => {
        it('should not show link', () => {
            const { getByTestId } = render(<OrganizationOpen organization={organization} variant="item" />);
            expect(() => getByTestId('reviewsLink')).toThrow();
        });
    });

    describe('widget', () => {
        it('should show link with target', () => {
            const { getByTestId } = render(<OrganizationOpen organization={organization} variant="widget" />);
            expect(getByTestId('reviewsLink')).toHaveAttribute('target', '_parent');
        });
    });
});
