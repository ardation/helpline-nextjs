import React, { ReactElement, useState } from 'react';
import { Typography, Box, Button, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import TopicSelect from '../TopicSelect';
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

type Topic = {
    name: string;
};

type Props = {
    countries: Country[];
    topics: Topic[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            textAlign: 'center',
            '& img': {
                maxWidth: '250px',
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            textAlign: 'center',
            height: '100%',
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(2),
        },
        button: {
            borderRadius: '1000px',
        },
    }),
);

const Search = ({ topics, countries }: Props): ReactElement => {
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(undefined);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const classes = useStyles();

    return (
        <Container maxWidth="xs" className={classes.container}>
            <Box className={classes.box}>
                {!selectedCountry && (
                    <Box className={classes.logo}>
                        <img src="/logo.svg" alt="find a helpline" />
                    </Box>
                )}
                {!selectedCountry && (
                    <Typography>
                        Struggling? Get free, confidential support from a real human over phone, text or webchat.
                    </Typography>
                )}
                <CountrySelect
                    countries={countries}
                    onCountryChange={setSelectedCountry}
                    onSubdivisionChange={setSelectedSubdivision}
                />
                {selectedCountry && (
                    <Typography variant="h6">
                        <strong>What would you like help with?</strong>
                    </Typography>
                )}
                {selectedCountry && <TopicSelect topics={topics} onChange={setSelectedTopics} />}
                {selectedCountry && (
                    <Link
                        href={{
                            pathname: `/[countryCode]${selectedSubdivision ? `/[subdivisionCode]` : ''}`,
                            query: { topics: selectedTopics.map((topic) => topic.name) },
                        }}
                        as={{
                            pathname: `/${selectedCountry.code.toLowerCase()}${
                                selectedSubdivision ? `/${selectedSubdivision.code.toLowerCase()}` : ''
                            }`,
                            query: { topics: selectedTopics.map((topic) => topic.name) },
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
