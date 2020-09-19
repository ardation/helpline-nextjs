import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Container, Link } from '@material-ui/core';
import NextLink from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'grid',
            gridGap: theme.spacing(2),
            textAlign: 'left',
            margin: theme.spacing(5, 0, 6, 0),
        },
        emoji: {
            textAlign: 'center',
            fontSize: '4rem',
        },
        link: {
            color: '#000',
            textDecoration: 'underline',
        },
    }),
);

const OrganizationEmpty = (): ReactElement => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs" className={classes.container}>
            <Typography className={classes.emoji}>🤔</Typography>
            <Typography variant="h6">
                We&apos;ve searched high and low and can&apos;t find a helpline in your area matching that criteria.
            </Typography>
            <Typography variant="h6">
                Try{' '}
                <NextLink href="/" passHref>
                    <Link className={classes.link}>searching again</Link>
                </NextLink>{' '}
                with fewer criteria or for nationwide helplines.
            </Typography>
        </Container>
    );
};

export default OrganizationEmpty;
