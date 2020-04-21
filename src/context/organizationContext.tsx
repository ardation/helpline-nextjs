import React, { createContext, useState, ReactElement, ReactNode, useEffect } from 'react';
import { find, filter } from 'lodash/fp';
import filterAndSortOrganizations from '../util/filterAndSortOrganizations';

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
};

type Filters = {
    topics: Filter[] | [];
    categories: Filter[] | [];
    humanSupportTypes: Filter[] | [];
    contactMethods: Filter[] | [];
    sorts: Filter[] | [];
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
    filterOptions: Filters;
    activeFilters: Filters;
    setActiveCountry: (country: Country) => void;
    applyFilters: (selectedFilters: Filters) => void;
};

const initialState: State = {
    // loading: false,
    countries: [],
    activeCountry: null,
    organizations: [],
    filterOptions: null,
    activeFilters: {
        topics: [],
        categories: [],
        humanSupportTypes: [],
        contactMethods: [],
        sorts: [],
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
    const [activeFilters, applyFilters] = useState<Filters>(initialState.activeFilters);
    // const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const orgs = filter(['country.code', activeCountry?.code], allOrganizations);
        setOrganizations(filterAndSortOrganizations(orgs, activeFilters));
    }, [activeCountry, activeFilters]);

    const ctx = {
        // loading,
        countries,
        activeCountry,
        organizations,
        filterOptions,
        activeFilters,
        applyFilters,
        setActiveCountry,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
