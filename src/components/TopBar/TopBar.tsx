import React, { ReactElement } from 'react';
import { AppBar, Container, Toolbar, Typography, Button, Hidden, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CallIcon from '@material-ui/icons/Call';
import { compact } from 'lodash/fp';
import { OutboundLink } from 'react-ga';

type Country = {
    emergencyNumber: string;
};

type Props = {
    country?: Country;
    variant?: 'widget';
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
            backgroundColor: '#fff',
            color: theme.palette.text.primary,
        },
        appBarWidget: {
            backgroundColor: '#fff',
            color: theme.palette.text.primary,
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
        box: {
            minWidth: '80px',
        },
        title: {
            fontWeight: 600,
        },
        subtitle: {
            color: theme.palette.text.disabled,
        },
        titleWithCountry: {
            [theme.breakpoints.down('xs')]: {
                gridColumn: '1 / span 2',
                alignSelf: 'center',
                fontSize: '0.8rem',
            },
        },
        link: {
            textDecoration: 'none',
        },
        button: {
            backgroundBlendMode: 'overlay, normal',
            textAlign: 'left',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            width: '100%',
        },
        buttonEndIcon: {
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
    }),
);

const TopBar = ({ country, variant }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <AppBar
            className={compact([classes.appBar, variant === 'widget' && classes.appBarWidget]).join(' ')}
            position="static"
            elevation={1}
        >
            <Container className={country && classes.container}>
                <Toolbar
                    className={[
                        classes.toolbar,
                        country ? classes.toolbarWithCountry : classes.toolbarWithoutCountry,
                    ].join(' ')}
                >
                    {country ? (
                        <>
                            <Box className={classes.box}>
                                <Typography className={[classes.title, classes.titleWithCountry].join(' ')}>
                                    Are you or someone else in immediate danger?
                                </Typography>
                            </Box>
                            <OutboundLink
                                eventLabel={`tel:${country.emergencyNumber}`}
                                to={`tel:${country.emergencyNumber}`}
                                target="_parent"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    classes={{ root: classes.button, endIcon: classes.buttonEndIcon }}
                                    endIcon={<CallIcon />}
                                    data-testid="emergencyServicesButton"
                                >
                                    <Hidden smUp>Call {country.emergencyNumber}</Hidden>
                                    <Hidden only="xs">Emergency Services</Hidden>
                                </Button>
                            </OutboundLink>
                        </>
                    ) : (
                        <Box className={classes.box}>
                            <Typography className={classes.title}>Need to leave quickly?</Typography>
                            <Typography className={classes.subtitle}>Click to immediately exit this site.</Typography>
                        </Box>
                    )}
                    <OutboundLink
                        eventLabel="https://accuweather.com"
                        to="https://accuweather.com"
                        target="_parent"
                        rel="noopener noreferrer"
                        className={classes.link}
                    >
                        <Button
                            color="secondary"
                            variant="contained"
                            classes={{ root: classes.button, endIcon: classes.buttonEndIcon }}
                            endIcon={<DirectionsRunIcon />}
                            data-testid="leaveQuicklyButton"
                        >
                            Quick Exit
                        </Button>
                    </OutboundLink>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default TopBar;
