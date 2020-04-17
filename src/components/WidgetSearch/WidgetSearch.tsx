import React, { ReactElement, useState, useContext } from 'react';
import { Typography, Box, Button, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import CountrySelect from '../CountrySelect';
import FilterSort from '../FilterSort';
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

type Search = {
    country: Country;
    subdivision: Subdivision;
};

type Props = {
    countries: Country[];
    onSearchChange?: (search: Search) => void;
    xprops?: any;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            textAlign: 'left',
            '& img': {
                maxWidth: '250px',
            },
        },
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
        subheader: {
            color: '#FFFFFF',
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
        },
        searchButton: {
            flexGrow: 1,
        },
        filterButton: {
            backgroundColor: 'white',
            fontSize: '70%',
            lineHeight: 'normal',
            '& .label': {
                width: '70%',
                paddingRight: theme.spacing(1),
            },
            '&:hover': {
                backgroundColor: '#f0f0f0',
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

const Search = ({ countries, onSearchChange, xprops }: Props): ReactElement => {
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(undefined);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const { filters, applyFilters } = useContext(OrganizationContext);

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box className={classes.box}>
                <Box className={classes.logo}>
                    <img src="/logo.svg" alt="find a helpline" />
                </Box>
                <Typography className={classes.subheader}>Struggling? Talk to a real person, for free.</Typography>
                <CountrySelect
                    inline
                    countries={countries}
                    onCountryChange={setSelectedCountry}
                    onSubdivisionChange={setSelectedSubdivision}
                    xprops={xprops}
                />
                {selectedCountry && (
                    <Box className={classes.inputConatainer}>
                        <Button
                            data-testid="searchButton"
                            className={`${classes.button} ${classes.searchButton}`}
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={(): void => {
                                setShowFilter(false);
                                onSearchChange({ country: selectedCountry, subdivision: selectedSubdivision });
                            }}
                        >
                            Search
                        </Button>
                        <Button
                            className={`${classes.button} ${classes.filterButton}`}
                            color="default"
                            onClick={(): void => setShowFilter(!showFilter)}
                            data-testid="filterSortButton"
                        >
                            <span className="label">
                                Filter <br />& Sort
                            </span>
                            <FilterListIcon />
                        </Button>
                    </Box>
                )}
            </Box>
            {showFilter && (
                <div className={classes.filter}>
                    <FilterSort
                        filterOptions={filters}
                        onApply={(filters): void => {
                            setShowFilter(false);
                            applyFilters(filters);
                        }}
                    />
                </div>
            )}
        </Container>
    );
};

export default Search;
