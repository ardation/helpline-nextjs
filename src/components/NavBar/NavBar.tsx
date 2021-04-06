import React, { ReactElement, ReactNode } from 'react';
import { AppBar, Box, Container, Hidden, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
    children?: ReactNode;
    variant?: 'widget' | 'minimal';
};

const useStyles = makeStyles((theme) =>
    createStyles({
        appBar: {
            backgroundColor: theme.palette.background.paper,
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        appBarWidget: {
            backgroundColor: 'transparent',
        },
        appBarMinimal: {
            backgroundColor: 'transparent',
        },
        container: {
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr auto',
            gridGap: theme.spacing(1),
        },
        logo: {
            display: 'grid',
            gridColumnGap: theme.spacing(4),
            alignItems: 'center',
            gridTemplateColumns: 'auto 1fr',
            flexGrow: 1,
            paddingTop: theme.spacing(1),
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '1fr',
            },
            '& img': {
                height: '25px',
            },
        },
    }),
);

const NavBar = ({ children, variant }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <AppBar
            className={clsx(
                classes.appBar,
                variant === 'widget' && classes.appBarWidget,
                variant === 'minimal' && classes.appBarMinimal,
            )}
            position="static"
            elevation={0}
        >
            <Container className={classes.container}>
                <Box className={classes.logo}>
                    {variant !== 'minimal' && (
                        <>
                            {variant === 'widget' ? (
                                <img src="/logo.svg" alt="find a helpline" />
                            ) : (
                                <Link href="/" prefetch={process.env.NODE_ENV === 'production'} passHref>
                                    <a>
                                        <img src="/logo.svg" alt="find a helpline" />
                                    </a>
                                </Link>
                            )}
                            {variant === 'widget' && (
                                <Hidden xsDown>
                                    <Typography variant="body2" color="secondary">
                                        Struggling? Get free, confidential support from a real person.
                                    </Typography>
                                </Hidden>
                            )}
                        </>
                    )}
                </Box>
                <Box>{children}</Box>
            </Container>
        </AppBar>
    );
};

export default NavBar;
