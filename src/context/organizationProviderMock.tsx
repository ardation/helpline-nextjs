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
    topics: Array.from(Array(12).keys()).map((i) => ({
        name: 'Topic ' + i,
    })),
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
        categories: [{ name: 'Category 1' }, { name: 'Category 2' }, { name: 'Category 3' }, { name: 'Category 4' }],
        humanSupportTypes: [],
        openingHours: [
            {
                day: 'monday',
                open: '2000-01-01T00:00:00Z',
                close: '2000-01-01T23:59:00Z',
            },
        ],
    },
    {
        slug: 'new-york-state-office-of-alcoholism-and-substance-abuse-services-oasas',
        name: 'New York State Office of Alcoholism and Substance Abuse Services (OASAS)',
        alwaysOpen: false,
        smsNumber: null,
        phoneNumber: '1-877-846-7369',
        url: 'https://ppaccentral.org/hopeline/',
        chatUrl: null,
        timezone: 'America/New_York',
        humanSupportTypes: [],
        categories: [],
        topics: [{ name: 'Gambling' }, { name: 'Substance use' }],
        openingHours: [
            { day: 'monday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'tuesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'wednesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'thursday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'friday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'saturday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'sunday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
        ],
    },
    {
        slug: 'mobile-crisis-assessment-team',
        name: 'Mobile Crisis Assessment Team',
        alwaysOpen: false,
        smsNumber: null,
        phoneNumber: '1-844-732-6228',
        url: 'https://www.neighborhoodctr.org/services/mobile-crisis-assessment-team/',
        chatUrl: null,
        timezone: 'America/New_York',
        humanSupportTypes: [],
        categories: [],
        topics: [
            { name: 'Abuse & domestic violence' },
            { name: 'Anxiety' },
            { name: 'Bullying' },
            { name: "Dementia & Alzheimer's" },
            { name: 'Depression' },
            { name: 'Eating & body image' },
            { name: 'Family' },
            { name: 'Gambling' },
            { name: 'Gender & sexual identity' },
            { name: 'Grief & loss' },
            { name: 'Loneliness' },
            { name: 'Parenting' },
            { name: 'Pregnancy & abortion' },
            { name: 'Relationships' },
            { name: 'School & work' },
            { name: 'Self-harm' },
            { name: 'Sexual abuse' },
            { name: 'Stress' },
            { name: 'Substance use' },
            { name: 'Suicidal thoughts' },
            { name: 'Supporting others' },
            { name: 'Trauma & PTSD' },
        ],
        openingHours: [
            { day: 'monday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'tuesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'wednesday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'thursday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'friday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'saturday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
            { day: 'sunday', open: '2000-01-01T00:00:00Z', close: '2000-01-01T23:59:00Z' },
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
