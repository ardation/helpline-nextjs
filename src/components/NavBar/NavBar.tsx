import React, { ReactElement, ReactNode } from 'react';
import { createStyles, makeStyles, AppBar, Box, Container, Hidden, Typography } from '@material-ui/core';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
    children?: ReactNode;
    variant?: 'widget' | 'minimal' | 'white';
};

const useStyles = makeStyles((theme) =>
    createStyles({
        appBar: {
            backgroundColor: 'transparent',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        appBarWhite: {
            backgroundColor: theme.palette.background.paper,
        },
        appBarWidget: {
            backgroundColor: theme.palette.background.default,
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
                variant === 'white' && classes.appBarWhite,
                variant === 'widget' && classes.appBarWidget,
            )}
            position="static"
            elevation={0}
        >
            <Container className={classes.container}>
                <Box className={classes.logo}>
                    {variant !== 'minimal' && (
                        <>
                            {variant === 'widget' ? (
                                <>
                                    <img src="/logo.svg" alt="find a helpline" />
                                    <Hidden xsDown>
                                        <Typography variant="body2" color="secondary">
                                            Struggling? Get free, confidential support from a real person.
                                        </Typography>
                                    </Hidden>
                                </>
                            ) : (
                                <Link href="/" prefetch={process.env.NODE_ENV === 'production'} passHref>
                                    <a>
                                        <img src="/logo.svg" alt="find a helpline" />
                                    </a>
                                </Link>
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
