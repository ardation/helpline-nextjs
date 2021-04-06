import React, { ReactElement, useEffect, useState } from 'react';
import { Typography, Box, Button, Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import clsx from 'clsx';
import CountrySelect from '../CountrySelect';
import { LocalityEnum } from '../../../types/globalTypes';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import About from '../About';
import ItemSelect from '../ItemSelect';

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

type Topic = {
    name: string;
};

type Props = {
    countries: Country[];
    topics: Topic[];
    variant?: 'embed';
    onChange?: (topics: Topic[], country?: Country, subdivision?: Subdivision) => void;
};

const useStyles = makeStyles((theme) =>
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
            maxWidth: '444px',
        },
        containerEmbed: {
            padding: 0,
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(2),
        },
        links: {
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        buttonRoot: {
            color: '#000',
            textDecoration: 'underline',
            textTransform: 'none',
            fontWeight: 'normal',
            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary.main,
            },
        },
        link: {
            color: '#000',
        },
        typography: {
            fontSize: 20,
            color: theme.palette.text.secondary,
        },
        selectedCountryBox: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            margin: theme.spacing(0, -2),
        },
        heading: {
            fontFamily: theme.typography.fontFamily,
        },
    }),
);

const Search = ({ topics, countries, variant, onChange }: Props): ReactElement => {
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
    const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision | undefined>(undefined);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const classes = useStyles();

    useEffect(() => {
        onChange && onChange(selectedTopics, selectedCountry, selectedSubdivision);
    }, [selectedCountry, selectedSubdivision, selectedTopics]);

    return (
        <>
            {variant !== 'embed' && (
                <NavBar variant={(!selectedCountry && 'minimal') || null}>
                    <SideBar />
                </NavBar>
            )}
            <Container
                className={clsx(
                    variant !== 'embed' && classes.container,
                    variant === 'embed' && classes.containerEmbed,
                )}
            >
                <Box className={classes.box}>
                    {!selectedCountry && variant !== 'embed' && (
                        <>
                            <Box className={classes.logo}>
                                <img src="/logo.svg" alt="find a helpline" />
                            </Box>
                            <Typography className={classes.typography}>
                                Struggling? Get free, confidential support from a real human over phone, text or
                                webchat.
                            </Typography>
                        </>
                    )}
                    <CountrySelect
                        countries={countries}
                        onCountryChange={setSelectedCountry}
                        onSubdivisionChange={setSelectedSubdivision}
                    />
                    {!selectedCountry && variant !== 'embed' && (
                        <Box className={classes.links}>
                            <Link href="/faq" passHref prefetch={process.env.NODE_ENV === 'production'}>
                                <Button classes={{ root: classes.buttonRoot, label: classes.link }} color="primary">
                                    What can I expect when contacting a helpline?
                                </Button>
                            </Link>
                        </Box>
                    )}
                    {selectedCountry && (
                        <Box className={classes.selectedCountryBox}>
                            <Grid container spacing={2}>
                                {selectedCountry && variant !== 'embed' && (
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className={classes.heading}>
                                            What would you like help with?
                                        </Typography>
                                        <Typography color="secondary">Select topic or topics (optional)</Typography>
                                    </Grid>
                                )}
                                {selectedCountry && (
                                    <Grid item xs={12}>
                                        <ItemSelect items={topics} onChange={setSelectedTopics} max={10} center />
                                    </Grid>
                                )}
                                {selectedCountry && variant !== 'embed' && (
                                    <Grid item xs={12}>
                                        <Link
                                            href={{
                                                pathname: `/[countryCode]${
                                                    selectedSubdivision ? `/[subdivisionCode]` : ''
                                                }`,
                                                query: { topics: selectedTopics.map((topic) => topic.name) },
                                            }}
                                            as={{
                                                pathname: `/${selectedCountry.code.toLowerCase()}${
                                                    selectedSubdivision
                                                        ? `/${selectedSubdivision.code.toLowerCase()}`
                                                        : ''
                                                }`,
                                                query: { topics: selectedTopics.map((topic) => topic.name) },
                                            }}
                                            passHref
                                            prefetch={process.env.NODE_ENV === 'production'}
                                        >
                                            <Button
                                                data-testid="searchButton"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                fullWidth
                                            >
                                                Search for helplines
                                            </Button>
                                        </Link>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    )}
                </Box>
            </Container>
            {!selectedCountry && variant !== 'embed' && <About countries={countries} />}
        </>
    );
};

export default Search;
