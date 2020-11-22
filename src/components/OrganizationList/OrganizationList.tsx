import CloseIcon from '@material-ui/icons/Close';
import React, { ReactElement, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Container, Box, Button, Backdrop } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import { sortBy } from 'lodash/fp';
import OrganizationCard, { Organization } from '../OrganizationCard/OrganizationCard';
import formatArrayIntoSentence from '../../util/formatArrayIntoSentence';
import NavBar from '../NavBar';
import filterAndSortOrganizations from '../../util/filterAndSortOrganizations';
import OrganizationFilter from '../OrganizationFilter';
import OrganizationEmpty from '../OrganizationEmpty';

type Props = {
    country: { name: string };
    subdivision?: { name: string };
    categories: { name: string }[];
    humanSupportTypes: { name: string }[];
    topics: { name: string }[];
    preselectedTopics: { name: string }[];
    organizations: Organization[];
    organizationsWhenEmpty: Organization[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            display: 'block',
            zIndex: theme.zIndex.drawer + 1,
            top: 64,
            overflow: 'auto',
            [theme.breakpoints.down('xs')]: {
                top: 80,
            },
        },
        filters: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            background: '#FFFFFF',
        },
        button: {
            borderRadius: '1000px',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        showMore: {
            display: 'flex',
            justifyContent: 'center',
            margin: theme.spacing(5, 0),
        },
        sortText: {
            '@media (max-width: 320px)': {
                display: 'none',
            },
        },
    }),
);

const OrganizationList = ({
    country,
    subdivision,
    categories,
    humanSupportTypes,
    topics,
    preselectedTopics,
    organizations,
    organizationsWhenEmpty,
}: Props): ReactElement => {
    const classes = useStyles();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState(preselectedTopics);
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
    const [limit, setLimit] = useState(10);

    const onChange = (changes): void => {
        setSelectedTopics(changes.topics);
        setOrganizations(filterAndSortOrganizations(organizations, changes));
        setShowFilters(false);
        setLimit(10);
    };

    const onClick = (): void => {
        setLimit((limit) => limit + 10);
    };

    useEffect(() => {
        setSelectedTopics(preselectedTopics);
        setOrganizations(filterByPreselectedTopics());
    }, [preselectedTopics]);

    return (
        <>
            <NavBar>
                <Button
                    className={classes.button}
                    onClick={(): void => setShowFilters(true)}
                    endIcon={<FilterListIcon />}
                    data-testid="filter"
                    variant="contained"
                    color="primary"
                >
                    Filter<span className={classes.sortText}>&nbsp;&amp; Sort</span>
                </Button>
            </NavBar>
            <Backdrop
                className={classes.backdrop}
                open={showFilters}
                onClick={(): void => setShowFilters(false)}
                data-testid="backdrop"
            >
                <Box onClick={(e): void => e.stopPropagation()}>
                    <NavBar>
                        <Button
                            className={classes.button}
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
                            preselectedTopics={preselectedTopics}
                            onChange={onChange}
                        />
                    </Box>
                </Box>
            </Backdrop>
            <Container maxWidth="xs">
                <Box my={2}>
                    <Typography variant="h6">
                        {`Helplines in ${subdivision ? `${subdivision.name}, ` : ''}${country.name}${
                            selectedTopics.length > 0
                                ? ` for ${formatArrayIntoSentence(selectedTopics.map((t) => t.name)).toLowerCase()}`
                                : ''
                        }.`}
                    </Typography>
                </Box>
                {filteredOrganizations.length === 0 && <OrganizationEmpty organizations={organizationsWhenEmpty} />}
                {(filteredOrganizations.length > 0 ? filteredOrganizations : sortBy('name', organizationsWhenEmpty))
                    .slice(0, limit)
                    .map((organization) => (
                        <Box key={organization.slug} my={2} data-testid="OrganizationCard">
                            <OrganizationCard organization={organization} />
                        </Box>
                    ))}
                {filteredOrganizations.length > limit && (
                    <Box className={classes.showMore}>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={onClick}
                            variant="contained"
                            className={classes.button}
                            color="primary"
                        >
                            Show More
                        </Button>
                    </Box>
                )}
            </Container>
        </>
    );
};

export default OrganizationList;
