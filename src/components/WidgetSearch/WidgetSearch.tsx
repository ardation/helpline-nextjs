import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Button, Container } from '@material-ui/core';
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
    subregion: string;
    subdivisions: Subdivision[];
    locality: LocalityEnum;
};

type Props = {
    preselectedCountry: Country;
    preselectedSubdivision?: Subdivision;
    countries: Country[];
};

const useStyles = makeStyles((theme) =>
    createStyles({
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
    const classes = useStyles();

    const changeUrl = (country: Country, subdivision?: Subdivision): void => {
        if (country && router) {
            const pathname = `/widget/[countryCode]${subdivision ? `/[subdivisionCode]` : ''}`;
            const query = subdivision
                ? {
                      countryCode: country.code.toLowerCase(),
                      subdivisionCode: subdivision?.code?.toLowerCase(),
                  }
                : {
                      countryCode: country.code.toLowerCase(),
                  };
            router.push({ pathname, query });
        }
    };

    const onCountryChange = (country: Country): void => {
        setSelectedCountry(country);
        changeUrl(country);
    };

    const onSubdivisionChange = (subdivision: Subdivision): void => {
        changeUrl(selectedCountry, subdivision);
    };

    return (
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
    );
};

export default WidgetSearch;
