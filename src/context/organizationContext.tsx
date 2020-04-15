import React, { createContext, useState, useEffect, ReactElement, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const initialState = {
    organizations: [],
};

const OrganizationContext = createContext(initialState);

export const OrganizationProvider = ({ children }: Props): ReactElement => {
    const [organizations, setOrganizations] = useState(initialState.organizations);
    const [filters, setFilters] = useState({
        topics: [],
        categories: [],
        humanSupportTypes: [],
        contactMethod: [],
    });

    useEffect(() => {
        // setOrganizations(fetch(gqlQuery))
        console.log('UPDATE QUERY');
    }, [filters]);

    const applyFilters = (selectedFilters): void => {
        setFilters({ ...filters, ...selectedFilters });
    };

    const ctx = {
        organizations,
        applyFilters,
    };

    return <OrganizationContext.Provider value={ctx}>{children}</OrganizationContext.Provider>;
};

export default OrganizationContext;
