import React, { createContext, useState, ReactElement, ReactNode, useEffect } from 'react';

type Filter = {
    name: string;
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
    // countries: Countries[]
};

type State = {
    organizations: any[];
    filterOptions: Filters;
    selectedFilters: Filters;
    applyFilters: (selectedFilters: Filters) => void;
};

const initialFilters = {
    topics: null,
    categories: null,
    humanSupportTypes: null,
    contactMethods: null,
};

const initialState: State = {
    organizations: [],
    filterOptions: initialFilters,
    selectedFilters: initialFilters,
    applyFilters: (selectedFilters: Filters): void => null,
};

const OrganizationContext = createContext(initialState);

export const OrganizationProvider = ({ children, filterOptions }: Props): ReactElement => {
    const [organizations, setOrganizations] = useState(initialState.organizations);
    const [filters, applyFilters] = useState<Filters>(initialState.selectedFilters);

    const ctx = {
        organizations,
        filterOptions,
        selectedFilters: filters,
        applyFilters,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
