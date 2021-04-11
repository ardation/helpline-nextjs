import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Typography, Link, Container, Box, Divider, Grid } from '@material-ui/core';
import NextLink from 'next/link';
import { OutboundLink } from 'react-ga';

const useStyles = makeStyles((theme) =>
    createStyles({
        box: {
            textAlign: 'center',
            margin: theme.spacing(3, 0),
        },
        typography: {
            fontSize: '0.8rem',
        },
        grid: {
            margin: theme.spacing(3, 0),
        },
        link: {
            color: theme.palette.text.primary,
            fontSize: '0.8rem',
            textDecoration: 'underline',
        },
        illustration: {
            margin: theme.spacing(3, 0),
            '& img': {
                width: '60%',
            },
        },
    }),
);

const Footer = (): ReactElement => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <Box className={classes.box}>
                <Box className={classes.illustration}>
                    <img src="/illustrations/hi5.png" />
                </Box>
                <Typography className={classes.typography}>
                    Made with ♡ in Aotearoa, New Zealand, <br />
                    with help from{' '}
                    <NextLink href="/gratitude" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link}>our friends.</Link>
                    </NextLink>
                </Typography>
            </Box>
            <Divider />
            <Grid container className={classes.grid} spacing={1}>
                <Grid item xs={6}>
                    <NextLink href="/about" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link} data-testid="about">
                            About
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={6}>
                    <NextLink href="/gratitude" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link} data-testid="gratitude">
                            Gratitude
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={6}>
                    <NextLink href="/faq" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link} data-testid="faq">
                            FAQs
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={6}>
                    <NextLink href="/get-the-widget" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link} data-testid="getTheWidget">
                            Get The Widget
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={6}>
                    <NextLink href="/terms" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link} data-testid="terms">
                            Terms of Service
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={6}>
                    <NextLink href="/contact" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link} data-testid="contact">
                            Contact
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={6}>
                    <NextLink href="/privacy" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Link className={classes.link} data-testid="privacy">
                            Privacy Policy
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
            <Box className={classes.box}>
                <Typography className={classes.typography}>
                    Copyright &copy;{' '}
                    <OutboundLink
                        eventLabel="https://www.livefortomorrow.co"
                        to="https://www.livefortomorrow.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.link}
                    >
                        Live For Tomorrow
                    </OutboundLink>{' '}
                    {new Date().getFullYear()}.<br />
                    All rights reserved.
                </Typography>
            </Box>
        </Container>
    );
};

export default Footer;
