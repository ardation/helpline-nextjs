import React, { ReactElement } from 'react';
import {
    createStyles,
    makeStyles,
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    Button,
    Hidden,
} from '@material-ui/core';
import { compact } from 'lodash/fp';
import { OutboundLink } from 'react-ga';

type Country = {
    emergencyNumber: string;
};

type Props = {
    country?: Country;
    variant?: 'widget';
};

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down('xs')]: {
                paddingRight: theme.spacing(1),
                paddingLeft: theme.spacing(1),
            },
        },
        appBar: {
            backgroundColor: theme.palette.background.paper,
        },
        appBarWidget: {
            backgroundColor: theme.palette.background.paper,
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
        toolbarWidgetWithCountry: {
            justifyContent: 'center',
            gridTemplateColumns: 'auto auto',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center',
                gridTemplateColumns: '1fr',
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
            fontWeight: 600,
            color: theme.palette.text.primary,
            minWidth: '80px',
            [theme.breakpoints.down('xs')]: {
                fontSize: '0.8rem',
            },
        },
        titleWithCountry: {
            fontWeight: 400,
        },
        subtitle: {
            color: theme.palette.text.secondary,
            [theme.breakpoints.down('xs')]: {
                fontSize: '0.8rem',
            },
        },
        box: {
            [theme.breakpoints.down('xs')]: {
                gridColumn: '1 / span 2',
                alignSelf: 'center',
            },
        },
        link: {
            textDecoration: 'none',
        },
        button: {
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.125) 0%, rgba(0, 0, 0, 0.125) 100%), #E8886C',
            backgroundBlendMode: 'overlay, normal',
            color: '#FFFFFF',
            '&:hover': {
                background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.125) 0%, rgba(0, 0, 0, 0.125) 100%), #E8886C',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '0.7rem',
                paddingRight: theme.spacing(1),
                paddingLeft: theme.spacing(1),
            },
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
            elevation={0}
        >
            <Container className={country && classes.container}>
                <Toolbar
                    className={[
                        classes.toolbar,
                        country
                            ? variant === 'widget'
                                ? classes.toolbarWidgetWithCountry
                                : classes.toolbarWithCountry
                            : classes.toolbarWithoutCountry,
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
                                    variant="contained"
                                    className={classes.button}
                                    data-testid="emergencyServicesButton"
                                >
                                    <Hidden smUp>Call {country.emergencyNumber}</Hidden>
                                    <Hidden only="xs">Emergency Services</Hidden>
                                </Button>
                            </OutboundLink>
                        </>
                    ) : (
                        <Box>
                            <Typography className={classes.title}>Need to leave quickly?</Typography>
                            <Typography className={classes.subtitle}>Click to immediately exit this site.</Typography>
                        </Box>
                    )}
                    {variant !== 'widget' && (
                        <OutboundLink
                            eventLabel="https://accuweather.com"
                            to="https://accuweather.com"
                            target="_parent"
                            rel="noopener noreferrer"
                            className={classes.link}
                        >
                            <Button variant="contained" className={classes.button} data-testid="leaveQuicklyButton">
                                Quick Exit
                            </Button>
                        </OutboundLink>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default TopBar;
