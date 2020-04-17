import React, { createContext, useState, ReactElement, ReactNode, useEffect } from 'react';

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
    // countries: Countries[]
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

export const OrganizationProvider = ({ children, filterOptions }: Props): ReactElement => {
    const [organizations, setOrganizations] = useState(initialState.organizations);
    const [filters, applyFilters] = useState<Filters>(filterOptions);

    const ctx = {
        organizations,
        filters,
        applyFilters,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
