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

export type FilterOptions = {
    topics: Filter[] | [];
    categories: Filter[] | [];
    humanSupportTypes: Filter[] | [];
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
    activeSubdivision?: Subdivision;
    allOrganizations?: Organization[];
    filterOptions: FilterOptions;
};

type State = {
    // loading: boolean;
    countries: Country[];
    activeCountry?: Country;
    activeSubdivision?: Subdivision;
    organizations: Organization[];
    filterOptions: FilterOptions;
    activeFilters: Filters;
    applyFilters: (selectedFilters: Filters) => void;
    setActiveCountry: (country: Country) => void;
};

const initialState: State = {
    // loading: false,
    countries: [],
    activeCountry: null,
    activeSubdivision: null,
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
    setActiveCountry: undefined,
};

const OrganizationContext = createContext(initialState);

export const OrganizationProvider = ({
    children,
    countries,
    allOrganizations,
    filterOptions,
    activeCountry,
    activeSubdivision,
}: Props): ReactElement => {
    const [organizations, setOrganizations] = useState<Organization[] | undefined>(allOrganizations);
    const [activeFilters, applyFilters] = useState<Filters>(initialState.activeFilters);
    // const [loading, setLoading] = useState<boolean>(false);
    const [_activeCountry, setActiveCountry] = useState<Country>(activeCountry);

    useEffect(() => {
        setOrganizations(filterAndSortOrganizations(organizations, activeFilters));
    }, [activeFilters]);

    const ctx = {
        // loading,
        countries,
        activeCountry: _activeCountry,
        activeSubdivision,
        organizations,
        filterOptions,
        activeFilters,
        applyFilters,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
