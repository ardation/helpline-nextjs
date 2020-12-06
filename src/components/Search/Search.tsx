import React, { ReactElement, useEffect, useState } from 'react';
import { Typography, Box, Button, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import { OutboundLink } from 'react-ga';
import MailIcon from '@material-ui/icons/Mail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import clsx from 'clsx';
import TopicSelect from '../TopicSelect';
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

type Topic = {
    name: string;
};

type Props = {
    countries: Country[];
    topics: Topic[];
    variant?: 'embed';
    onChange?: (topics: Topic[], country?: Country, subdivision?: Subdivision) => void;
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
            maxWidth: '444px',
            [theme.breakpoints.down('md')]: {
                marginBottom: theme.spacing(11),
            },
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(23),
            },
        },
        containerEmbed: {
            padding: 0,
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(2),
        },
        button: {
            borderRadius: '1000px',
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
            textAlign: 'left',
            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary.main,
            },
        },
        link: {
            color: '#000',
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
        <Container
            className={clsx(variant !== 'embed' && classes.container, variant === 'embed' && classes.containerEmbed)}
        >
            <Box className={classes.box}>
                {!selectedCountry && variant !== 'embed' && (
                    <>
                        <Box className={classes.logo}>
                            <img src="/logo.svg" alt="find a helpline" />
                        </Box>
                        <Typography>
                            Struggling? Get free, confidential support from a real human over phone, text or webchat.
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
                        <OutboundLink
                            eventLabel="https://bit.ly/fah-founders-note"
                            to="https://bit.ly/fah-founders-note"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.link}
                        >
                            <Button
                                startIcon={<LoyaltyIcon />}
                                classes={{ root: classes.buttonRoot, label: classes.link }}
                                color="primary"
                            >
                                A note from our founder
                            </Button>
                        </OutboundLink>
                        <OutboundLink
                            eventLabel="https://livefortomorrow.typeform.com/to/ErmyL3tv"
                            to="https://livefortomorrow.typeform.com/to/ErmyL3tv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.link}
                        >
                            <Button
                                startIcon={<MailIcon />}
                                classes={{ root: classes.buttonRoot, label: classes.link }}
                                color="primary"
                            >
                                Hear when we launch in your country
                            </Button>
                        </OutboundLink>
                    </Box>
                )}
                {selectedCountry && variant !== 'embed' && (
                    <Typography variant="h6">
                        <strong>What would you like help with?</strong>
                    </Typography>
                )}
                {selectedCountry && <TopicSelect topics={topics} onChange={setSelectedTopics} />}
                {selectedCountry && variant !== 'embed' && (
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
                        prefetch={process.env.NODE_ENV === 'production'}
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
