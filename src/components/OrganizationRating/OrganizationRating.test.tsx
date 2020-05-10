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

    describe('widget', () => {
        it('should not show link', () => {
            const { getByTestId } = render(<OrganizationOpen organization={organization} variant="widget" />);
            expect(() => getByTestId('reviewsLink')).toThrow();
        });
    });
});
