import React, { ReactElement, ReactNode } from 'react';
import { AppBar, Box, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
    children?: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: '#F0F1F5',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        container: {
            display: 'flex',
            alignItems: 'center',
        },
        logo: {
            flexGrow: 1,
            paddingTop: theme.spacing(1),
            '& img': {
                height: '25px',
            },
        },
    }),
);

const NavBar = ({ children }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static">
            <Container className={classes.container}>
                <Box className={classes.logo}>
                    <img src="/logo.svg" alt="find a helpline" />
                </Box>
                <Box>{children}</Box>
            </Container>
        </AppBar>
    );
};

export default NavBar;
