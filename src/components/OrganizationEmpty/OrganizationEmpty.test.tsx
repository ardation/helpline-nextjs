import React from 'react';
import { render } from '@testing-library/react';
import OrganizationEmpty from '.';

describe('OrganizationEmpty', () => {
    it('should display message if no default organizations', () => {
        const { getByTestId } = render(<OrganizationEmpty organizations={[]} />);
        expect(getByTestId('OrganizationEmptyNoAlternatives')).toBeInTheDocument();
    });

    it('should display message if default organizations', () => {
        const organizations = [
            {
                id: 'youthline',
                slug: 'youthline',
                name: 'Youthline',
                alwaysOpen: true,
                openingHours: [],
                humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
                categories: [{ name: 'For youth' }, { name: 'All issues' }],
                smsNumber: '234',
                phoneNumber: '0800 376 633',
                url: 'https://youthline.co.nz/website',
                chatUrl: 'https://youthline.co.nz/chat',
                timezone: 'Pacific/Auckland',
                topics: [{ name: 'Anxiety' }],
                featured: false,
                verified: false,
                rating: 5,
                reviewCount: 10,
            },
        ];
        const { getByText } = render(<OrganizationEmpty organizations={organizations} />);
        expect(getByText('However, we found these helplines that can support you 24/7.')).toBeInTheDocument();
    });
});
