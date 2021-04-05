import React, { ReactElement, useState } from 'react';
import { Button, Container, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import CountrySelect from '../CountrySelect';
import { LocalityEnum } from '../../../types/globalTypes';

type Subdivision = {
    code: string;
    name: string;
};

type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
    locality: LocalityEnum;
};

type Props = {
    preselectedCountry: Country;
    preselectedSubdivision?: Subdivision;
    countries: Country[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            backgroundColor: '#181719',
        },
        container: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            display: 'grid',
            gridGap: theme.spacing(1),
            gridTemplateColumns: '1fr auto',
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '1fr',
            },
        },
        button: {},
    }),
);

const WidgetSearch = ({ preselectedCountry, preselectedSubdivision, countries }: Props): ReactElement => {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState<Country>(preselectedCountry);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(preselectedSubdivision);
    const classes = useStyles();

    const changeUrl = (country: Country, subdivision: Subdivision): void => {
        if (country && router) {
            const url = `/widget/[countryCode]${subdivision ? `/[subdivisionCode]` : ''}`;
            const as = `/widget/${country.code.toLowerCase()}${
                subdivision ? `/${subdivision.code.toLowerCase()}` : ''
            }`;
            if (router.asPath !== as) {
                router.push(url, as);
            }
        }
    };

    const onCountryChange = (country: Country): void => {
        setSelectedCountry(country);
        changeUrl(country, selectedSubdivision);
    };

    const onSubdivisionChange = (subdivision: Subdivision): void => {
        setSelectedSubdivision(subdivision);
        changeUrl(selectedCountry, subdivision);
    };

    return (
        <Box className={classes.box}>
            <Container className={classes.container}>
                <CountrySelect
                    countries={countries}
                    onCountryChange={onCountryChange}
                    onSubdivisionChange={onSubdivisionChange}
                    preselectedCountry={preselectedCountry}
                    preselectedSubdivision={preselectedSubdivision}
                    inline
                />
                {selectedCountry && (
                    <Button className={classes.button} variant="contained" color="primary" size="large">
                        Search
                    </Button>
                )}
            </Container>
        </Box>
    );
};

export default WidgetSearch;
