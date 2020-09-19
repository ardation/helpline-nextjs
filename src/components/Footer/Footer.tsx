import React, { ReactElement } from 'react';
import { Typography, Link, Container, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NextLink from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            textAlign: 'center',
        },
        links: {
            display: 'grid',
            gridGap: theme.spacing(2),
            gridAutoFlow: 'column',
            fontSize: '0.8rem',
            marginBottom: theme.spacing(2),
            justifyContent: 'center',
        },
        link: {
            color: '#999999',
        },
    }),
);

const Footer = (): ReactElement => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <Box my={3} className={classes.box}>
                <Typography className={classes.links}>
                    <NextLink href="/about" passHref>
                        <Link className={classes.link} data-testid="about">
                            About
                        </Link>
                    </NextLink>
                    <NextLink href="/get-the-widget" passHref>
                        <Link className={classes.link} data-testid="getTheWidget">
                            Get The Widget
                        </Link>
                    </NextLink>
                    <NextLink href="/contact" passHref>
                        <Link className={classes.link} data-testid="contact">
                            Contact
                        </Link>
                    </NextLink>
                    <NextLink href="/gratitude" passHref>
                        <Link className={classes.link} data-testid="gratitude">
                            Gratitude
                        </Link>
                    </NextLink>
                </Typography>
                <Typography className={classes.links}>
                    <NextLink href="/privacy" passHref>
                        <Link className={classes.link} data-testid="privacy">
                            Privacy Policy
                        </Link>
                    </NextLink>
                    <NextLink href="/terms" passHref>
                        <Link className={classes.link} data-testid="terms">
                            Terms of Service
                        </Link>
                    </NextLink>
                </Typography>
            </Box>
        </Container>
    );
};

export default Footer;
