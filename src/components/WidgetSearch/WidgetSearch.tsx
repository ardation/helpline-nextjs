import React, { ReactElement, useState } from 'react';
import { Button, Container } from '@material-ui/core';
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
    preselectedSubdivision?: Subdivision;
    countries: Country[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            display: 'grid',
            gridGap: theme.spacing(1),
            backgroundColor: '#181719',
            gridTemplateColumns: '1fr auto',
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '1fr',
            },
        },
        button: {
            borderRadius: '1000px',
        },
    }),
);

const WidgetSearch = ({ preselectedCountry, preselectedSubdivision, countries }: Props): ReactElement => {
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
                preselectedSubdivision={preselectedSubdivision}
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
