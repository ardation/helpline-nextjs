import React, { ReactElement, useState, useContext } from 'react';
import { Typography, Box, Button, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';
import CountrySelect from '../CountrySelect';
import OrganizationFilter from '../OrganizationFilter';
import OrganizationContext from '../../context/organizationContext';

type Subdivision = {
    code: string;
    name: string;
};

type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
};

type Props = {
    countries: Country[];
    parentPage?: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            textAlign: 'left',
            height: '100%',
            backgroundColor: '#181719',
            position: 'relative',
        },
        header: {
            display: 'grid',
            gridColumnGap: theme.spacing(2),
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'end',
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '1fr',
                textAlign: 'left',
            },
        },
        logo: {
            // maxWidth: '200px',
            width: '200px',
        },
        subheader: {
            color: '#EEEDF4',
            fontWeight: 'lighter',
            fontSize: theme.typography.fontSize,
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px',
            },
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(1),
        },
        inputConatainer: {
            display: 'flex',
            alignItems: 'center',
        },
        button: {
            textAlign: 'left',
            borderRadius: '1000px',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            margin: `0 ${theme.spacing(1)}px`,
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px',
            },
        },
        searchButton: {
            flexGrow: 1,
        },
        filterButton: {
            backgroundColor: 'white',
            '& .label': {
                paddingRight: theme.spacing(1),
            },
            '&:hover': {
                backgroundColor: '#EEEDF4',
            },
        },
        sortText: {
            '@media (max-width: 320px)': {
                display: 'none',
            },
        },
        filter: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1200,
            background: 'white',
        },
    }),
);

const SearchHeader = ({ countries, parentPage }: Props): ReactElement => {
    const { activeCountry, filterOptions, applyFilters } = useContext(OrganizationContext);
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(activeCountry || undefined);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(undefined);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box className={classes.box}>
                <Box className={classes.header}>
                    <img className={classes.logo} src="/logo.svg" alt="find a helpline" />
                    <Typography className={classes.subheader}>Struggling? Talk to a real person, for free.</Typography>
                </Box>
                <CountrySelect
                    inline
                    countries={countries}
                    onCountryChange={setSelectedCountry}
                    onSubdivisionChange={setSelectedSubdivision}
                    defaultCountry={activeCountry || null}
                />
                {selectedCountry && (
                    <Box className={classes.inputConatainer}>
                        <Link
                            href={{
                                pathname: `${parentPage ? '/' + parentPage : ''}/${selectedCountry.code.toLowerCase()}${
                                    selectedSubdivision ? `/${selectedSubdivision.code.toLowerCase()}` : ''
                                }`,
                            }}
                            passHref
                        >
                            <Button
                                data-testid="searchButton"
                                className={`${classes.button} ${classes.searchButton}`}
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={(): void => {
                                    setShowFilter(false);
                                }}
                            >
                                Search
                            </Button>
                        </Link>
                        <Button
                            className={`${classes.button} ${classes.filterButton}`}
                            onClick={(): void => setShowFilter(!showFilter)}
                            variant="contained"
                            endIcon={showFilter ? <CloseIcon /> : <FilterListIcon />}
                            data-testid="filter"
                        >
                            {showFilter ? (
                                <span>Close</span>
                            ) : (
                                <span>
                                    Filter<span className={classes.sortText}>&nbsp;&amp; Sort</span>
                                </span>
                            )}
                        </Button>
                    </Box>
                )}
            </Box>
            {showFilter && (
                <div className={classes.filter}>
                    <OrganizationFilter
                        topics={filterOptions.topics}
                        categories={filterOptions.categories}
                        humanSupportTypes={filterOptions.humanSupportTypes}
                        onChange={(filters): void => applyFilters(filters)}
                    />
                </div>
            )}
        </Container>
    );
};

export default SearchHeader;
