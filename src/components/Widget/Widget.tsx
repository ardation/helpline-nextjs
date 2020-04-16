import React, { ReactElement, useState, useEffect, useContext } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';
import { includes, map, some, filter, reduce } from 'lodash/fp';
import { GetCountryAndOrganizations } from '../../../types/GetCountryAndOrganizations';
import OrganizationContext from '../../context/organizationContext';
import OrganizationCard from '../OrganizationCard/OrganizationCard';
import FilterSort from '../FilterSort';
import WidgetSearch from '../WidgetSearch';
import WidgetBar from '../WidgetBar';
import WidgetCarousel from '../WidgetCarousel';
import Spinner from '../Spinner';

type Subdivision = {
    code: string;
    name: string;
};

type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
};

type Filter = {
    name: string;
};

type FilterOptions = {
    topics?: Filter[];
    categories?: Filter[];
    humanSupportTypes?: Filter[];
    contactMethods?: Filter[];
};

type Props = {
    countries: Country[];
    filterOptions: FilterOptions;
    xprops?: any;
};

type Search = {
    country: Country;
    subdivision: Subdivision;
};

type SelectedCountry = {
    code: string;
    name: string;
    emergencyNumber: string;
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

const useStyles = makeStyles(() =>
    createStyles({
        box: {
            display: 'flex',
            alignItems: 'flex-start',
            maxHeight: '100vh',
            border: '1px solid #000',
            borderRadius: '0 0 10px 10px',
            overflow: 'auto',
            '@media (max-width: 412px)': {
                flexDirection: 'column',
            },
        },
        container: {
            height: '100vh',
            paddingLeft: 0,
            paddingRight: 0,
        },
        header: {
            position: 'relative',
        },
        filter: {
            position: 'absolute',
            zIndex: 1200,
            background: 'white',
        },
        carousel: {
            position: 'relative',
            display: 'flex',
            flex: '0 0 auto',
            alignItems: 'flex-start',
            flexDirection: 'column',
            '@media (min-width: 480px)': {
                flexDirection: 'row',
            },
            minWidth: 0,
        },
        button: {
            borderRadius: '1000px',
        },
    }),
);

const getCountryAndOrganizations: any = async (countryCode): Promise<{ props: GetCountryAndOrganizations }> => {
    const query = gql`
        query GetCountryAndOrganizations($countryCode: String!) {
            country(code: $countryCode) {
                code
                name
                emergencyNumber
            }
            organizations(countryCode: $countryCode) {
                nodes {
                    slug
                    name
                    alwaysOpen
                    smsNumber
                    phoneNumber
                    url
                    chatUrl
                    timezone
                    humanSupportTypes {
                        name
                    }
                    categories {
                        name
                    }
                    topics {
                        name
                    }
                    openingHours {
                        day
                        open
                        close
                    }
                }
            }
        }
    `;
    const { country, organizations } = await request('https://api.findahelpline.com', print(query), {
        countryCode: countryCode,
    });
    return {
        props: {
            country,
            organizations,
        },
    };
};

const Widget = ({ countries, filterOptions, xprops }: Props): ReactElement => {
    const classes = useStyles();
    const { filters, applyFilters } = useContext(OrganizationContext);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const [selectedSearch, setSelectedSearch] = useState<Search | undefined>(undefined);
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountry | undefined>(undefined);
    const [organizations, setOrganizations] = useState<Organization[] | undefined>(undefined);

    const filterResults = (results: Organization[]): Organization[] =>
        filter(
            (result: Organization) =>
                reduce(
                    (acc: boolean, [filterKey, filterValues]) => {
                        let row = true;
                        if (filterValues?.length > 0) {
                            row = some(
                                ({ name }: Filter) => includes(name, map('name', filterValues)),
                                result[filterKey],
                            );
                        }
                        return acc && row;
                    },
                    true,
                    Object.entries(filters),
                ),
            results,
        );

    useEffect(() => {
        setOrganizations(undefined);
        if (selectedSearch) {
            getCountryAndOrganizations(selectedSearch.country.code).then(({ props }) => {
                setSelectedCountry(props.country);
                setOrganizations(filterResults(props.organizations.nodes));
            });
        } else if (xprops) {
            getCountryAndOrganizations(xprops.countryCode).then(({ props }) => {
                setSelectedCountry(props.country);
                setOrganizations(filterResults(props.organizations.nodes));
            });
        }
    }, [selectedSearch, xprops, filters]);

    return (
        <Container className={classes.container}>
            <Box maxWidth="md">
                <div className={classes.header}>
                    <WidgetSearch
                        countries={countries}
                        xprops={xprops}
                        onSearchChange={setSelectedSearch}
                        toggleFilters={(): void => setShowFilter(!showFilter)}
                    />
                    <WidgetBar country={selectedCountry} />
                    {showFilter && (
                        <div className={classes.filter}>
                            <FilterSort
                                showMax={10}
                                filterOptions={filterOptions}
                                activeFilters={filters}
                                onApply={(filters): void => {
                                    setShowFilter(false);
                                    applyFilters(filters);
                                }}
                            />
                        </div>
                    )}
                </div>
                <Box className={classes.box}>
                    {selectedSearch || selectedCountry ? (
                        <Container className={classes.carousel}>
                            {organizations ? (
                                <WidgetCarousel>
                                    {organizations.map((organization) => (
                                        <Box key={organization.slug} my={2}>
                                            <OrganizationCard organization={organization} />
                                        </Box>
                                    ))}
                                </WidgetCarousel>
                            ) : (
                                <Spinner />
                            )}
                        </Container>
                    ) : null}
                </Box>
            </Box>
        </Container>
    );
};

export default Widget;
