import React, { createContext, useState, useEffect, ReactElement, ReactNode } from 'react';
import FilterSort from '../components/FilterSort';

type Props = {
    children: ReactNode;
};

type Filter = {
    name: string;
};

type Filters = {
    topics?: Filter[] | null;
    categories?: Filter[] | null;
    humanSupportTypes?: Filter[] | null;
    contactMethods?: Filter[] | null;
};

type State = {
    organizations: any[];
    filters: Filters;
    applyFilters: (selectedFilters: Filters) => void;
};

const initialState: State = {
    organizations: [],
    filters: {
        topics: null,
        categories: null,
        humanSupportTypes: null,
        contactMethods: null,
    },
    applyFilters: (selectedFilters: Filters): void => null,
};

const OrganizationContext = createContext(initialState);

export const OrganizationProvider = ({ children }: Props): ReactElement => {
    const [organizations, setOrganizations] = useState(initialState.organizations);
    const [filters, setFilters] = useState<Filters>(initialState.filters);

    const applyFilters = (selectedFilters: Filters): void => {
        setFilters({ ...filters, ...selectedFilters });
    };

    const ctx = {
        organizations,
        filters,
        applyFilters,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
