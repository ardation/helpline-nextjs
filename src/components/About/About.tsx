import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Button, Box } from '@material-ui/core';
import NextLink from 'next/link';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { OutboundLink } from 'react-ga';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        page: {
            textAlign: 'center',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            height: 'calc(100vh - 130px)',
            textAlign: 'center',
            color: '#FFFFFF',
        },
        button: {
            borderRadius: '1000px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textTransform: 'none',
        },
        content: {
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(10),
        },
        highlights: {
            padding: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: theme.spacing(1),
            '@media (max-width: 320px)': {
                gridTemplateColumns: '1fr',
            },
        },
        highlight: {
            backgroundColor: theme.palette.primary.main,
            color: '#FFFFFF',
            paddingTop: theme.spacing(3),
            paddingRight: theme.spacing(1),
            paddingBottom: theme.spacing(3),
            paddingLeft: theme.spacing(1),
        },
        highlightSecondary: {
            backgroundColor: theme.palette.secondary.main,
        },
        highlightTitle: {
            fontWeight: 'bold',
            paddingBottom: theme.spacing(1),
        },
        highlightIcon: {
            fontSize: '4rem',
            paddingBottom: theme.spacing(1),
        },
        background0: {
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/bg0.jpg) center center',
            backgroundSize: 'cover',
        },
        background1: {
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/bg1.jpg) center center',
            backgroundSize: 'cover',
        },
        link: {
            textDecoration: 'none',
            color: theme.palette.primary.main,
        },
        containerContent: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            flexGrow: 1,
        },
    }),
);

const About = (): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <NavBar>
                <SideBar />
            </NavBar>
            <Box className={[classes.container, classes.background0].join(' ')}>
                <Container className={classes.containerContent} maxWidth="xs">
                    <Box mb={3}>
                        <Typography variant="h5">
                            You want help.
                            <br />
                            We bring it to you.
                        </Typography>
                    </Box>
                    <Box>
                        <NextLink href="/" passHref>
                            <Button className={classes.button} color="secondary" variant="contained" size="large">
                                Find a helpline
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
                <Box>
                    <ArrowDownwardIcon />
                </Box>
            </Box>
            <Box className={classes.page}>
                <Box className={classes.content}>
                    <Container maxWidth="xs">
                        <Typography variant="h6">
                            We’re on a mission to put every free mental health helpline in the world at your finger
                            tips.
                        </Typography>
                    </Container>
                </Box>
                <Container className={classes.highlights} maxWidth="sm">
                    <Box className={classes.highlight}>
                        <Box className={classes.highlightIcon}>
                            <AvTimerIcon fontSize="inherit" />
                        </Box>
                        <Typography className={classes.highlightTitle} variant="h6">
                            Quick
                        </Typography>
                        <Typography>Find the right helpline for you, in seconds.</Typography>
                    </Box>
                    <Box className={classes.highlight}>
                        <Box className={classes.highlightIcon}>
                            <TouchAppIcon fontSize="inherit" />
                        </Box>
                        <Typography className={classes.highlightTitle} variant="h6">
                            Easy
                        </Typography>
                        <Typography>Works just like you would expect.</Typography>
                    </Box>
                    <Box className={classes.highlight}>
                        <Box className={classes.highlightIcon}>
                            <VerifiedUserOutlinedIcon fontSize="inherit" />
                        </Box>
                        <Typography className={classes.highlightTitle} variant="h6">
                            Reliable
                        </Typography>
                        <Typography>Up-to-date information you can trust.</Typography>
                    </Box>
                </Container>
                <Box className={classes.content}>
                    <Container maxWidth="xs">
                        <Typography variant="h6">
                            We’re run by{' '}
                            <OutboundLink
                                eventLabel="https://www.livefortomorrow.co"
                                to="https://www.livefortomorrow.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                Live For Tomorrow
                            </OutboundLink>
                            , a not-for-profit using technology to support mental health.
                        </Typography>
                    </Container>
                </Box>
                <Box className={[classes.container, classes.background1].join(' ')}>
                    <Box className={classes.content}>
                        <Container maxWidth="xs">
                            <Typography variant="h6">
                                All of the helplines on our platform are free and confidential.
                            </Typography>
                        </Container>
                    </Box>
                </Box>
                <Box className={classes.content}>
                    <Container maxWidth="xs">
                        <Typography variant="h6">Helpline criteria</Typography>
                        <Typography>We only include helplines that meet three simple criteria.</Typography>
                    </Container>
                </Box>
                <Container className={classes.highlights} maxWidth="sm">
                    <Box className={[classes.highlight, classes.highlightSecondary].join(' ')}>
                        <Box className={classes.highlightIcon}>
                            <LockOpenIcon fontSize="inherit" />
                        </Box>
                        <Typography>No barriers. 100% free for everyone.</Typography>
                    </Box>
                    <Box className={[classes.highlight, classes.highlightSecondary].join(' ')}>
                        <Box className={classes.highlightIcon}>
                            <AccountCircleIcon fontSize="inherit" />
                        </Box>
                        <Typography>Confidential help from a human.</Typography>
                    </Box>
                    <Box className={[classes.highlight, classes.highlightSecondary].join(' ')}>
                        <Box className={classes.highlightIcon}>
                            <SmsOutlinedIcon fontSize="inherit" />
                        </Box>
                        <Typography>Immediate emotional support.</Typography>
                    </Box>
                </Container>
                <Box className={classes.content}>
                    <Container maxWidth="xs">
                        <Box mb={3}>
                            <Typography variant="h6">
                                Want to partner?
                                <br />
                                Got a question?
                            </Typography>
                        </Box>
                        <NextLink href="/contact" passHref>
                            <Button className={classes.button} color="primary" variant="contained" size="large">
                                Get in touch
                            </Button>
                        </NextLink>
                    </Container>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default About;
