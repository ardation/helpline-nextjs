import React, { createContext, useState, ReactElement, ReactNode, useEffect } from 'react';
import { find, filter, reduce, intersectionBy, some } from 'lodash/fp';

type Subdivision = {
    code: string;
    name: string;
};

type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
    emergencyNumber?: string;
};

type Filter = {
    name: string;
    key?: string;
    active?: boolean | false;
};

type Filters = {
    topics?: Filter[] | null;
    categories?: Filter[] | null;
    humanSupportTypes?: Filter[] | null;
    contactMethods?: Filter[] | null;
};

type OpeningHour = {
    day: string;
    open: string;
    close: string;
};

type Organization = {
    slug: string;
    name: string;
    alwaysOpen: boolean;
    humanSupportTypes: Filter[];
    categories: Filter[];
    topics: Filter[];
    openingHours: OpeningHour[];
    smsNumber?: string;
    phoneNumber?: string;
    url?: string;
    chatUrl?: string;
    timezone: string;
    country: Country;
};

type Props = {
    children: ReactNode;
    countries: Country[];
    allOrganizations: Organization[];
    filterOptions: Filters;
    xprops?: any;
};

type State = {
    // loading: boolean;
    countries: Country[];
    activeCountry?: Country;
    organizations: Organization[];
    filters: Filters;
    setActiveCountry: (country: Country) => void;
    applyFilters: (selectedFilters: Filters) => void;
};

const initialState: State = {
    // loading: false,
    countries: [],
    activeCountry: null,
    organizations: [],
    filters: {
        topics: null,
        categories: null,
        humanSupportTypes: null,
        contactMethods: null,
    },
    setActiveCountry: undefined,
    applyFilters: undefined,
};

const OrganizationContext = createContext(initialState);

export const OrganizationProvider = ({
    children,
    countries,
    allOrganizations,
    filterOptions,
    xprops,
}: Props): ReactElement => {
    const [activeCountry, setActiveCountry] = useState<Country | undefined>(
        find(['countryCode', xprops?.countryCode], countries) || undefined,
    );
    const [organizations, setOrganizations] = useState<Organization[] | undefined>(undefined);
    const [filters, applyFilters] = useState<Filters>(filterOptions);
    // const [loading, setLoading] = useState<boolean>(false);

    const filterOrganization = (result: Organization): Organization[] =>
        reduce(
            (acc: boolean, [filterKey, filterValues]) => {
                const activeFilters = filter('active', filterValues);
                if (activeFilters.length > 0) {
                    if (filterKey == 'contactMethods') {
                        return acc && some((item: Filter) => !!result[item.key], activeFilters);
                    } else {
                        return acc && intersectionBy('name', result[filterKey], activeFilters).length > 0;
                    }
                } else {
                    return acc;
                }
            },
            true,
            Object.entries(filters),
        );

    useEffect(() => {
        const countryResults = filter(['country.code', activeCountry?.code], allOrganizations);
        setOrganizations(filter(filterOrganization, countryResults));
    }, [activeCountry, filters]);

    const ctx = {
        // loading,
        countries,
        activeCountry,
        organizations,
        filters,
        applyFilters,
        setActiveCountry,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
