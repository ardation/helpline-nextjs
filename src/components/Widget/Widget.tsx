import React, { ReactElement, useState, useEffect, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Box, Button } from '@material-ui/core';
import OrganizationCard from '../OrganizationCard/OrganizationCard';
import FilterSort from '../FilterSort';
import WidgetSearch from '../WidgetSearch';
import WidgetBar from '../WidgetBar';
import WidgetCarousel from '../WidgetCarousel';
import OrganizationContext from '../../context/organizationContext';

const organization = {
    slug: 'youthline',
    name: 'Youthline',
    alwaysOpen: true,
    openingHours: [],
    humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
    categories: [{ name: 'For youth' }, { name: 'All issues' }],
    smsNumber: '234',
    phoneNumber: '0800 376 633',
    url: 'https://www.youthline.co.nz/learn-and-grow.html',
    chatUrl: 'https://youthline.co.nz',
    timezone: 'Auckland',
};

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

type Filters = {
    topics?: Filter[];
    categories?: Filter[];
    humanSupportTypes?: Filter[];
    contactMethods?: Filter[];
};

type Props = {
    country?: Country;
    countries: Country[];
    filterOptions: Filters;
    xprops?: any;
};

const useStyles = makeStyles(() =>
    createStyles({
        box: {
            display: 'flex',
            alignItems: 'flex-start',
            border: '1px solid #000',
            borderRadius: '0 0 10px 10px',
            overflow: 'auto',
            '@media (max-width: 412px)': {
                flexDirection: 'column',
            },
        },
        container: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        header: {
            position: 'relative',
        },
        filter: {
            position: 'absolute',
            zIndex: 100,
            background: 'white',
        },
        carousel: {
            // position: 'relative',
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

const Widget = ({ country, countries, filterOptions, xprops }: Props): ReactElement => {
    const classes = useStyles();
    const [showFilter, setShowFilter] = useState(false);
    const { filters, applyFilters } = useContext(OrganizationContext);

    return (
        <Container className={classes.container}>
            <Box maxWidth="md">
                <div className={classes.header}>
                    <WidgetSearch countries={countries} />
                    {xprops ? (
                        <Button
                            data-testid="searchButton"
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={(): void => xprops.onCallback('Hello from the next.js app!')}
                        >
                            {xprops.text}
                        </Button>
                    ) : null}
                    <WidgetBar country={{ emergencyNumber: '111}' }} />
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
                    <Container className={classes.carousel}>
                        <WidgetCarousel>
                            <OrganizationCard organization={organization} />
                            <OrganizationCard organization={organization} />
                            <OrganizationCard organization={organization} />
                        </WidgetCarousel>
                    </Container>
                </Box>
            </Box>
        </Container>
    );
};

export default Widget;
