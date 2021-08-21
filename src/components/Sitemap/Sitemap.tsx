import React, { Fragment, ReactElement } from 'react';
import { Container, createStyles, makeStyles, Typography, Link, Grid, Box } from '@material-ui/core';
import NextLink from 'next/link';

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
    slug: string;
};

type Organization = {
    slug: string;
    name: string;
};

type Props = {
    countries: Country[];
    topics: Topic[];
    organizations: Organization[];
};

const useStyles = makeStyles((theme) =>
    createStyles({
        link: {
            color: theme.palette.text.primary,
            textDecoration: 'underline',
        },
    }),
);

const Sitemap = ({ countries, topics, organizations }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <Box bgcolor="background.paper" py={2}>
            <Container maxWidth="sm">
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Typography variant="h5" component="h1">
                            Sitemap
                        </Typography>
                    </Grid>
                    {countries.map((country) => (
                        <>
                            <Grid item key={country.code}>
                                <NextLink href={`/${country.code.toLowerCase()}`} passHref prefetch={false}>
                                    <Link className={classes.link}>Helplines in {country.name}</Link>
                                </NextLink>
                            </Grid>
                            {topics.map((topic) => (
                                <Grid item key={topic.slug}>
                                    <NextLink
                                        href={`/${country.code.toLowerCase()}/topics/${topic.slug}`}
                                        passHref
                                        prefetch={false}
                                    >
                                        <Link className={classes.link}>
                                            {topic.name} Helplines in {country.name}
                                        </Link>
                                    </NextLink>
                                </Grid>
                            ))}
                            {country.subdivisions.map((subdivision) => (
                                <Fragment key={subdivision.code}>
                                    <Grid item>
                                        <NextLink
                                            href={`/${country.code.toLowerCase()}/${subdivision.code.toLowerCase()}`}
                                            passHref
                                            prefetch={false}
                                        >
                                            <Link className={classes.link}>
                                                Helplines in {subdivision.name}, {country.name}
                                            </Link>
                                        </NextLink>
                                    </Grid>
                                    {topics.map((topic) => (
                                        <Grid item key={topic.slug}>
                                            <NextLink
                                                href={`/${country.code.toLowerCase()}/${subdivision.code.toLowerCase()}/topics/${
                                                    topic.slug
                                                }`}
                                                passHref
                                                prefetch={false}
                                            >
                                                <Link className={classes.link}>
                                                    {topic.name} Helplines in {subdivision.name}, {country.name}
                                                </Link>
                                            </NextLink>
                                        </Grid>
                                    ))}
                                </Fragment>
                            ))}
                        </>
                    ))}
                    {organizations.map((organization) => (
                        <Grid item key={organization.slug}>
                            <NextLink href={`/organizations/${organization.slug}`} passHref prefetch={false}>
                                <Link className={classes.link}>{organization.name}</Link>
                            </NextLink>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Sitemap;
