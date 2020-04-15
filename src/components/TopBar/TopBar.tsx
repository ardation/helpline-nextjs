import React, { ReactElement, Fragment } from 'react';
import { AppBar, Container, Toolbar, Typography, Button, Hidden } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CallIcon from '@material-ui/icons/Call';

type Country = {
    emergencyNumber: string;
};

type Props = {
    country?: Country;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down('xs')]: {
                paddingRight: theme.spacing(1),
                paddingLeft: theme.spacing(1),
            },
        },
        appBar: {
            backgroundColor: '#181719',
        },
        toolbar: {
            display: 'grid',
            gridGap: theme.spacing(2),
            paddingRight: 0,
            paddingLeft: 0,
            [theme.breakpoints.down('xs')]: {
                gridGap: theme.spacing(1),
                gridRowGap: 0,
                height: '80px',
            },
        },
        toolbarWithCountry: {
            gridTemplateColumns: '1fr auto auto',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'flex-start',
            },
        },
        toolbarWithoutCountry: {
            gridTemplateColumns: '1fr auto',
        },
        title: {
            minWidth: '80px',
            [theme.breakpoints.down('xs')]: {
                fontSize: '0.8rem',
            },
        },
        titleWithCountry: {
            [theme.breakpoints.down('xs')]: {
                gridColumn: '1 / span 2',
                alignSelf: 'center',
            },
        },
        button: {
            backgroundColor: '#CC001E',
            textAlign: 'left',
            borderRadius: '1000px',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                fontSize: '0.7rem',
                paddingRight: theme.spacing(1),
                paddingLeft: theme.spacing(1),
            },
            '&:hover': {
                backgroundColor: '#CC001E',
            },
        },
        buttonEndIcon: {
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
    }),
);

const TopBar = ({ country }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static">
            <Container className={country && classes.container}>
                <Toolbar
                    className={[
                        classes.toolbar,
                        country ? classes.toolbarWithCountry : classes.toolbarWithoutCountry,
                    ].join(' ')}
                >
                    {country ? (
                        <Fragment>
                            <Typography className={[classes.title, classes.titleWithCountry].join(' ')}>
                                Are you or someone else in immediate danger?
                            </Typography>
                            <Button
                                color="inherit"
                                classes={{ root: classes.button, endIcon: classes.buttonEndIcon }}
                                endIcon={<CallIcon />}
                                href={`tel:${country.emergencyNumber}`}
                                data-testid="emergencyServicesButton"
                            >
                                <Hidden smUp>Call {country.emergencyNumber}</Hidden>
                                <Hidden only="xs">Emergency Services</Hidden>
                            </Button>
                        </Fragment>
                    ) : (
                        <Typography className={classes.title}>
                            Need to leave quickly? Click to leave this site and open the weather.
                        </Typography>
                    )}
                    <Button
                        color="inherit"
                        classes={{ root: classes.button, endIcon: classes.buttonEndIcon }}
                        endIcon={<DirectionsRunIcon />}
                        href="https://accuweather.com"
                        data-testid="leaveQuicklyButton"
                    >
                        Leave Quickly
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default TopBar;
