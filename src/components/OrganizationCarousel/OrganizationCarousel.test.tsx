import React from 'react';
import { render } from '@testing-library/react';
import { OrganizationProvider } from '../../context/organizationContext';

import OrganizationCarousel from '.';

describe('OrganizationCarousel', () => {
    it('should render cards when organizations are in context ', () => {
        const { queryAllByText } = render(
            <OrganizationProvider
                allOrganizations={[
                    {
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
                        timezone: 'Auckland',
                        topics: [{ name: 'Stress' }],
                    },
                ]}
                countries={[]}
                filterOptions={{
                    topics: [{ name: 'Topic' }, { name: 'Topic 2' }],
                    categories: [],
                    humanSupportTypes: [],
                }}
            >
                <OrganizationCarousel />
            </OrganizationProvider>,
        );
        expect(queryAllByText('Youthline')).toBeTruthy();
    });
});
