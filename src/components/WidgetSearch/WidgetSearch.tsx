import React, { ReactElement, useState } from 'react';
import { Typography, Box, Button, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import CountrySelect from '../CountrySelect';

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
        },
        subheader: {
            color: '#FFFFFF',
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(1),
        },
        button: {
            borderRadius: '1000px',
        },
    }),
);

const Search = ({ countries }: Props): ReactElement => {
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(undefined);
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box className={classes.box}>
                <Box className={classes.logo}>
                    <img src="/logo.svg" alt="find a helpline" />
                </Box>
                <Typography className={classes.subheader}>Struggling? Talk to a real person, for free.</Typography>
                <CountrySelect
                    countries={countries}
                    onCountryChange={setSelectedCountry}
                    onSubdivisionChange={setSelectedSubdivision}
                />
                {selectedCountry && (
                    <Link
                        href={{
                            pathname: `/${selectedCountry.code.toLowerCase()}${
                                selectedSubdivision ? `/${selectedSubdivision.code.toLowerCase()}` : ''
                            }`,
                        }}
                        passHref
                    >
                        <Button
                            data-testid="searchButton"
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Search
                        </Button>
                    </Link>
                )}
            </Box>
        </Container>
    );
};

export default Search;
