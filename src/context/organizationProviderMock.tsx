import React, { ReactElement } from 'react';
import { OrganizationProvider, Country, Organization, Filters } from './organizationContext';

type Props = {
    activeCountry?: Country;
    countries?: Country[];
    organizations?: Organization[];
    filterOptions?: Filters;
};

const countriesData = [
    { code: 'AU', name: 'Australia', subdivisions: [] },
    {
        code: 'NZ',
        name: 'New Zealand',
        subdivisions: [
            { name: 'Bay of Plenty', code: 'BOP' },
            { name: 'Auckland', code: 'AUK' },
        ],
    },
];

const filterData = {
    topics: [{ name: 'Topic 1' }, { name: 'Topic 2' }, { name: 'Topic 3' }],
    categories: [{ name: 'Category 1' }, { name: 'Category 2' }],
    humanSupportTypes: [],
    contactMethods: [],
    sorts: [],
};

export const organizationData = [
    {
        slug: 'youthline',
        name: 'Youthline',
        alwaysOpen: true,
        smsNumber: '234',
        phoneNumber: '0800 376 633',
        url: 'https://www.youthline.co.nz',
        chatUrl: 'https://www.youthline.co.nz/web-chat-counselling.html',
        timezone: 'Pacific/Auckland',
        topics: [{ name: 'Topic 1' }],
        categories: [{ name: 'Category 1' }],
        humanSupportTypes: [],
        openingHours: [
            {
                day: 'monday',
                open: '2000-01-01T00:00:00Z',
                close: '2000-01-01T23:59:00Z',
            },
        ],
    },
];

const withMockOrganizationProvider = (
    element: ReactElement,
    { activeCountry, organizations, countries, filterOptions }: Props = {},
): ReactElement => {
    return (
        <OrganizationProvider
            activeCountry={activeCountry || null}
            allOrganizations={organizations || organizationData}
            countries={countries || countriesData}
            filterOptions={filterOptions || filterData}
        >
            {element}
        </OrganizationProvider>
    );
};

export default withMockOrganizationProvider;
