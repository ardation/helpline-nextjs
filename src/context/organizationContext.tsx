import React, { createContext, useState, ReactElement, ReactNode, useEffect } from 'react';
import { find } from 'lodash/fp';

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

type Props = {
    children: ReactNode;
    filterOptions: Filters;
    countries: Country[];
    xprops?: any;
};

type State = {
    countries: Country[];
    activeCountry?: Country;
    organizations: any[];
    filters: Filters;
    setActiveCountry: (country: Country) => void;
    applyFilters: (selectedFilters: Filters) => void;
};

const initialState: State = {
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

export const OrganizationProvider = ({ children, countries, filterOptions, xprops }: Props): ReactElement => {
    const [organizations, setOrganizations] = useState(initialState.organizations);
    const [activeCountry, setActiveCountry] = useState<Country | undefined>(
        find(['countryCode', xprops?.countryCode], countries) || undefined,
    );
    const [filters, applyFilters] = useState<Filters>(filterOptions);

    const ctx = {
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
