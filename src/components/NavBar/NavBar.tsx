import React, { ReactElement, ReactNode } from 'react';
import { AppBar, Box, Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { compact } from 'lodash/fp';
import Link from 'next/link';

type Props = {
    children?: ReactNode;
    variant?: 'widget';
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: '#F0F1F5',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        appBarWidget: {
            boxShadow: 'none',
            backgroundColor: '#181719',
            color: '#FFFFFF',
        },
        container: {
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr auto',
            gridGap: theme.spacing(1),
        },
        logo: {
            display: 'grid',
            gridColumnGap: theme.spacing(1),
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
            className={compact([classes.appBar, variant === 'widget' && classes.appBarWidget]).join(' ')}
            position="static"
        >
            <Container className={classes.container}>
                <Box className={classes.logo}>
                    {variant === 'widget' ? (
                        <img src="/logo.svg" alt="find a helpline" />
                    ) : (
                        <Link href="/" passHref>
                            <a>
                                <img src="/logo.svg" alt="find a helpline" />
                            </a>
                        </Link>
                    )}
                    {variant === 'widget' && <Typography>Struggling? Talk to a real person, for free.</Typography>}
                </Box>
                <Box>{children}</Box>
            </Container>
        </AppBar>
    );
};

export default NavBar;
