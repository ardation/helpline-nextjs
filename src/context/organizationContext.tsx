import React, { createContext, useState, ReactElement, ReactNode, useEffect } from 'react';
import filterAndSortOrganizations from '../util/filterAndSortOrganizations';

type Subdivision = {
    code: string;
    name: string;
};

export type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
    emergencyNumber?: string | undefined;
};

type Filter = {
    name: string;
};

export type Filters = {
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

export type Organization = {
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
    activeCountry?: Country;
    allOrganizations: Organization[];
    filterOptions: Filters;
};

type State = {
    // loading: boolean;
    countries: Country[];
    activeCountry?: Country;
    organizations: Organization[];
    filterOptions: Filters;
    activeFilters: Filters;
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
    applyFilters: undefined,
};

const OrganizationContext = createContext(initialState);

export const OrganizationProvider = ({
    children,
    countries,
    allOrganizations,
    filterOptions,
    activeCountry,
}: Props): ReactElement => {
    const [organizations, setOrganizations] = useState<Organization[] | undefined>(allOrganizations);
    const [activeFilters, applyFilters] = useState<Filters>(initialState.activeFilters);
    // const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setOrganizations(filterAndSortOrganizations(organizations, activeFilters));
    }, [activeFilters]);

    const ctx = {
        // loading,
        countries,
        activeCountry,
        organizations,
        filterOptions,
        activeFilters,
        applyFilters,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
