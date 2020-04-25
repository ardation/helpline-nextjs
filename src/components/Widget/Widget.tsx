import CloseIcon from '@material-ui/icons/Close';
import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Backdrop } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import Link from 'next/link';
import CodeIcon from '@material-ui/icons/Code';
import NavBar from '../NavBar';
import filterAndSortOrganizations from '../../util/filterAndSortOrganizations';
import OrganizationFilter from '../OrganizationFilter';
import WidgetOrganizationList from '../WidgetOrganizationList';
import TopBar from '../TopBar';
import WidgetSearch from '../WidgetSearch';
import { Organization } from '../OrganizationCard/OrganizationCard';

type Subdivision = {
    name: string;
    code: string;
};

type Country = {
    name: string;
    code: string;
    emergencyNumber: string;
    subdivisions: Subdivision[];
};

type Props = {
    preselectedCountry: Country;
    countries: Country[];
    preselectedSubdivision?: Subdivision;
    categories: { name: string }[];
    humanSupportTypes: { name: string }[];
    topics: { name: string }[];
    organizations: Organization[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            border: '1px solid #181719',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
        },
        backdrop: {
            display: 'block',
            zIndex: theme.zIndex.drawer + 1,
            top: 0,
            overflow: 'auto',
        },
        filters: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            background: '#FFFFFF',
        },
        filterButton: {
            background: '#FFFFFF',
            borderRadius: '1000px',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            '&:hover': {
                backgroundColor: '#CCCCCC',
            },
        },
        sortText: {
            '@media (max-width: 320px)': {
                display: 'none',
            },
        },
        embed: {
            textAlign: 'center',
            margin: theme.spacing(1),
        },
        embedButton: {
            color: '#000',
            textDecoration: 'underline',
            textTransform: 'none',
            textAlign: 'left',
            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary.main,
            },
        },
        link: {
            color: '#000',
        },
    }),
);

const OrganizationList = ({
    preselectedCountry,
    preselectedSubdivision,
    countries,
    categories,
    humanSupportTypes,
    topics,
    organizations,
}: Props): ReactElement => {
    const classes = useStyles();
    const [showFilters, setShowFilters] = useState(false);
    const [filteredOrganizations, setOrganizations] = useState(
        filterAndSortOrganizations(organizations, {
            contactMethods: [],
            categories: [],
            humanSupportTypes: [],
            topics: [],
            sorts: [{ name: 'A – Z' }],
        }),
    );

    const onChange = (changes): void => {
        setOrganizations(filterAndSortOrganizations(organizations, changes));
        setShowFilters(false);
    };

    return (
        <>
            <Box className={classes.box}>
                <NavBar variant="widget">
                    <Button
                        className={classes.filterButton}
                        onClick={(): void => setShowFilters(true)}
                        endIcon={<FilterListIcon />}
                        data-testid="filter"
                    >
                        Filter<span className={classes.sortText}>&nbsp;&amp; Sort</span>
                    </Button>
                </NavBar>
                <WidgetSearch
                    preselectedCountry={preselectedCountry}
                    countries={countries}
                    preselectedSubdivision={preselectedSubdivision}
                />
                <TopBar variant="widget" country={preselectedCountry} />
                <WidgetOrganizationList organizations={filteredOrganizations} />
            </Box>
            <Box className={classes.embed}>
                <Link href="/embed" passHref>
                    <Button
                        startIcon={<CodeIcon />}
                        color="primary"
                        component="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        classes={{ root: classes.embedButton, label: classes.link }}
                    >
                        Embed Find A Helpline on your website
                    </Button>
                </Link>
            </Box>
            <Backdrop
                className={classes.backdrop}
                open={showFilters}
                onClick={(): void => setShowFilters(false)}
                data-testid="backdrop"
            >
                <Box onClick={(e): void => e.stopPropagation()}>
                    <NavBar variant="widget">
                        <Button
                            className={classes.filterButton}
                            onClick={(): void => setShowFilters(false)}
                            endIcon={<CloseIcon />}
                        >
                            Close
                        </Button>
                    </NavBar>
                    <Box className={classes.filters}>
                        <OrganizationFilter
                            categories={categories}
                            humanSupportTypes={humanSupportTypes}
                            topics={topics}
                            onChange={onChange}
                        />
                    </Box>
                </Box>
            </Backdrop>
        </>
    );
};

export default OrganizationList;
