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
            gridGap: theme.spacing(1),
            gridAutoFlow: 'column',
            fontSize: '0.8rem',
            marginBottom: theme.spacing(1),
        },
        link: {
            color: '#999999',
        },
        copyright: {
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: '#999999',
        },
    }),
);

const Footer = (): ReactElement => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <Box my={2} className={classes.box}>
                <Typography className={classes.links}>
                    <NextLink href="/privacy" passHref>
                        <Link className={classes.link} data-testid="privacy">
                            Privacy
                        </Link>
                    </NextLink>
                    <NextLink href="/about" passHref>
                        <Link className={classes.link} data-testid="about">
                            About
                        </Link>
                    </NextLink>
                    <NextLink href="/contact" passHref>
                        <Link className={classes.link} data-testid="contact">
                            Contact
                        </Link>
                    </NextLink>
                </Typography>
                <Typography className={classes.copyright} data-testid="copyright">
                    Powered by Live For Tomorrow &copy; {new Date().getFullYear()}
                </Typography>
            </Box>
        </Container>
    );
};

export default Footer;
