import React, { ReactElement, useState } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
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
    preselectedCountry: Country;
    countries: Country[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            padding: theme.spacing(2),
            display: 'grid',
            gridGap: theme.spacing(1),
            backgroundColor: '#181719',
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
            width: '200px',
        },
        subheader: {
            color: '#FFFFFF',
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px',
            },
        },
        button: {
            borderRadius: '1000px',
        },
    }),
);

const SearchHeader = ({ preselectedCountry, countries }: Props): ReactElement => {
    const [selectedCountry, setSelectedCountry] = useState<Country>(preselectedCountry);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(undefined);

    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Box className={classes.header}>
                <img className={classes.logo} src="/logo.svg" alt="find a helpline" />
                <Typography className={classes.subheader}>Struggling? Talk to a real person, for free.</Typography>
            </Box>
            <CountrySelect
                countries={countries}
                onCountryChange={setSelectedCountry}
                onSubdivisionChange={setSelectedSubdivision}
                preselectedCountry={preselectedCountry}
                inline
            />
            {selectedCountry && (
                <Link
                    href={{
                        pathname: `/widget/[widgetCountryCode]${selectedSubdivision ? `/[widgetSubdivisionCode]` : ''}`,
                    }}
                    as={`/widget/${selectedCountry.code.toLowerCase()}${
                        selectedSubdivision ? `/${selectedSubdivision.code.toLowerCase()}` : ''
                    }`}
                    passHref
                >
                    <Button className={classes.button} variant="contained" color="primary" size="large">
                        Search
                    </Button>
                </Link>
            )}
        </Box>
    );
};

export default SearchHeader;
