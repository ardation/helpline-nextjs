import CloseIcon from '@material-ui/icons/Close';
import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Button, Backdrop, NoSsr, Hidden, Typography, createStyles, makeStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import CodeIcon from '@material-ui/icons/CodeRounded';
import { OutboundLink } from 'react-ga';
import NavBar from '../NavBar';
import filterAndSortOrganizations from '../../util/filterAndSortOrganizations';
import OrganizationFilter from '../OrganizationFilter';
import WidgetOrganizationList from '../WidgetOrganizationList';
import TopBar from '../TopBar';
import WidgetSearch from '../WidgetSearch';
import { Organization } from '../OrganizationCard/OrganizationCard';
import { LocalityEnum } from '../../../types/globalTypes';

type Subdivision = {
    name: string;
    code: string;
};

type Country = {
    name: string;
    code: string;
    emergencyNumber: string;
    subregion: string;
    subdivisions: Subdivision[];
    locality: LocalityEnum;
};

export type WidgetProps = {
    preselectedCountry: Country;
    preselectedSubdivision?: Subdivision;
    preselectedTopics: { name: string }[];
    countries: Country[];
    categories: { name: string }[];
    humanSupportTypes: { name: string }[];
    topics: { name: string }[];
    organizations: Organization[];
    organizationsWhenEmpty: Organization[];
};

const useStyles = makeStyles((theme) =>
    createStyles({
        box: {
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
        embed: {
            textAlign: 'center',
            padding: theme.spacing(1),
        },
        embedButton: {
            textDecoration: 'underline',
            textTransform: 'none',
            textAlign: 'left',
            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary.main,
            },
        },
        link: {
            color: theme.palette.text.secondary,
            fontWeight: 400,
        },
        outerBox: {
            borderRadius: 5,
            backgroundColor: theme.palette.background.default,
            border: `1px ${theme.palette.text.secondary} solid`,
        },
    }),
);

const Widget = ({
    preselectedCountry,
    preselectedSubdivision,
    preselectedTopics,
    countries,
    categories,
    humanSupportTypes,
    topics,
    organizations,
    organizationsWhenEmpty,
}: WidgetProps): ReactElement => {
    const classes = useStyles();
    const [showFilters, setShowFilters] = useState(false);
    const filterByPreselectedTopics = (): Organization[] => {
        return filterAndSortOrganizations(organizations, {
            contactMethods: [],
            categories: [],
            humanSupportTypes: [],
            topics: preselectedTopics,
            sorts: [{ name: preselectedTopics.length > 0 ? 'Relevance' : 'Featured' }],
        });
    };
    const [filteredOrganizations, setOrganizations] = useState(filterByPreselectedTopics());

    const onChange = (changes): void => {
        setOrganizations(filterAndSortOrganizations(organizations, changes));
        setShowFilters(false);
    };

    useEffect(() => {
        setOrganizations(filterByPreselectedTopics());
    }, [preselectedTopics]);

    return (
        <>
            <Box className={classes.outerBox}>
                <NavBar variant="widget">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={(): void => setShowFilters(true)}
                        endIcon={<FilterListIcon />}
                        data-testid="filter"
                    >
                        Filter
                    </Button>
                </NavBar>
                <Hidden smUp>
                    <Box my={1}>
                        <Typography color="secondary" align="center">
                            Struggling? Talk with a real person, for free.
                        </Typography>
                    </Box>
                </Hidden>
                <WidgetSearch
                    preselectedCountry={preselectedCountry}
                    countries={countries}
                    preselectedSubdivision={preselectedSubdivision}
                />
                <Box className={classes.box}>
                    <TopBar variant="widget" country={preselectedCountry} />
                    <NoSsr>
                        <WidgetOrganizationList
                            organizations={filteredOrganizations}
                            organizationsWhenEmpty={organizationsWhenEmpty}
                        />
                    </NoSsr>
                </Box>
            </Box>
            <Box className={classes.embed}>
                <OutboundLink
                    eventLabel="https://livefortomorrow.typeform.com/to/TT2N2v3r"
                    to="https://livefortomorrow.typeform.com/to/TT2N2v3r"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button
                        startIcon={<CodeIcon />}
                        color="primary"
                        size="small"
                        classes={{ root: classes.embedButton, label: classes.link }}
                    >
                        Embed Find A Helpline on your website
                    </Button>
                </OutboundLink>
            </Box>
            <Backdrop
                className={classes.backdrop}
                open={showFilters}
                onClick={(): void => setShowFilters(false)}
                data-testid="backdrop"
            >
                <Box onClick={(e): void => e.stopPropagation()}>
                    <NavBar variant="widget">
                        <Button variant="contained" onClick={(): void => setShowFilters(false)} endIcon={<CloseIcon />}>
                            Close
                        </Button>
                    </NavBar>
                    <Box className={classes.filters}>
                        <OrganizationFilter
                            categories={categories}
                            humanSupportTypes={humanSupportTypes}
                            preselectedTopics={preselectedTopics}
                            topics={topics}
                            onChange={onChange}
                        />
                    </Box>
                </Box>
            </Backdrop>
        </>
    );
};

export default Widget;
