import React, { createContext, useState, useEffect, ReactElement, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

type Filter = {
    name: string;
};

type Filters = {
    topics?: Filter[];
    categories?: Filter[];
    humanSupportTypes?: Filter[];
    contactMethods?: Filter[];
};

const initialState = {
    organizations: [],
    applyFilters: (selectedFilters: Filters): void => null,
};

const OrganizationContext = createContext(initialState);

export const OrganizationProvider = ({ children }: Props): ReactElement => {
    const [organizations, setOrganizations] = useState(initialState.organizations);
    const [filters, setFilters] = useState({
        topics: null,
        categories: null,
        humanSupportTypes: null,
        contactMethods: null,
    });

    useEffect(() => {
        // setOrganizations(fetch(gqlQuery))
        console.log('update query with', filters);
    }, [filters]);

    const applyFilters = (selectedFilters: Filters): void => {
        setFilters({ ...filters, ...selectedFilters });
    };

    // TODO: pass in the filters and set in the component for reusability
    const ctx = {
        organizations,
        applyFilters,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
