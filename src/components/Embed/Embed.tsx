import React, { ReactElement, useState, ChangeEvent, useEffect } from 'react';
import { Container, Box, Typography, FormControl, MenuItem, InputLabel, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { isUndefined, omitBy } from 'lodash/fp';
import { GetEmbedProps } from '../../../types/GetEmbedProps';
import Search from '../Search';

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            '& img': {
                maxWidth: '250px',
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(1),
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(2),
        },
        code: {
            backgroundColor: '#F0F1F5',
            padding: theme.spacing(2),
            width: '100%',
            fontFamily: 'Courier',
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
        formControl: {
            marginBottom: theme.spacing(1),
            minWidth: 120,
            alignSelf: 'center',
        },
        steps: {
            fontWeight: 'bold',
        },
    }),
);

const Embed = ({ countries, topics }: GetEmbedProps): ReactElement => {
    const classes = useStyles();
    const [snippet, setSnippet] = useState('');

    const updateSnippet = (): void => {};

    useEffect(updateSnippet);

    const handleChange = (country?: Country, subdivision?: Subdivision, topics: Topics[]): void => {
        if (country) {
            let host = window.location.host;
            if (host.includes('chromatic')) {
                host = 'findahelpline.com';
            }
            const attributes = omitBy(isUndefined, {
                countryCode: country.code.toLowerCase(),
                subdivisionCode: subdivision?.code?.toLowerCase(),
                topics: topics.length === 0 ? undefined : topics.map(({ name }) => name),
            });
            setSnippet(
                `<div id="fah-widget"></div>
                <script src="${window.location.protocol}//${host}/widget.min.js"></script>
                <script>Widget.default(${JSON.stringify(attributes)}).render('#fah-widget');</script>`,
            );
        } else {
            setSnippet('');
        }
    };

    return (
        <Container maxWidth="sm" className={classes.container} data-testid="embedContainer">
            <Box className={classes.box}>
                <Box className={classes.logo}>
                    <img src="/logo.svg" alt="find a helpline" />
                </Box>
                <Typography component="div" data-testid="typographyOne">
                    <p>We’re putting every free mental health helpline in the world at your fingertips.</p>
                    <p>Quick. Easy. Reliable.</p>
                    <h3>Embed the Find A Helpline widget</h3>
                    <p>
                        <span className={classes.steps}>Step 1:</span> Setup your filters for the widget.
                    </p>
                </Typography>
                <Search countries={countries} topics={topics} variant="embed" onChange={handleChange} />
                <Typography component="div" data-testid="typographyTwo">
                    <p>
                        <span className={classes.steps}>Step 2:</span> Simply copy the code snippet and paste it in your
                        page’s HTML where you want the widget to appear.
                    </p>
                </Typography>
                {snippet === '' ? (
                    <Alert severity="info">Select country before snippet is available.</Alert>
                ) : (
                    <Typography className={classes.code} data-testid="typographyThree" component="div">
                        <code>{snippet}</code>
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Embed;
