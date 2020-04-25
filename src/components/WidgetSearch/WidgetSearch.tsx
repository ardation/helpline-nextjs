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
    preselectedCountry: Country;
    countries: Country[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            display: 'grid',
            gridGap: theme.spacing(1),
            backgroundColor: '#181719',
        },
        button: {
            borderRadius: '1000px',
        },
    }),
);

const WidgetSearch = ({ preselectedCountry, countries }: Props): ReactElement => {
    const [selectedCountry, setSelectedCountry] = useState<Country>(preselectedCountry);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(undefined);

    const classes = useStyles();

    return (
        <Container className={classes.container}>
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
        </Container>
    );
};

export default WidgetSearch;
