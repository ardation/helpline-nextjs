import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Button, Box, Link } from '@material-ui/core';
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
        center: {
            textAlign: 'center',
        },
        left: {
            textAlign: 'left',
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
            textDecoration: 'underline',
            color: theme.palette.text.primary,
        },
        containerContent: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            flexGrow: 1,
        },
        outboundLink: {
            textDecoration: 'none',
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
                            We&apos;re putting every free mental health helpline in the world at your fingertips.
                        </Typography>
                    </Box>
                    <Box>
                        <NextLink href="/" passHref prefetch={process.env.NODE_ENV === 'production'}>
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
            <Box className={classes.center}>
                <Box className={[classes.content, classes.left].join(' ')}>
                    <Container maxWidth="xs">
                        <Typography variant="h6" gutterBottom>
                            Helplines exist the world over, but finding the right one for you remains difficult. We’re
                            set on changing that.
                        </Typography>
                        <Typography gutterBottom>
                            Find A Helpline is a free tool that connects people to the most relevant mental health
                            helpline for them, wherever they are in the world.
                        </Typography>
                        <Typography gutterBottom>
                            By the end of 2020, Find A Helpline will be available in every English speaking country in
                            the world.
                        </Typography>
                        <Typography>
                            Find A Helpline is also available as a{' '}
                            <NextLink href="/get-the-widget" passHref prefetch={process.env.NODE_ENV === 'production'}>
                                <Link className={classes.link}>widget</Link>
                            </NextLink>{' '}
                            to easily embed on your website.
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
                        <Typography>Match with need-specific support, in seconds.</Typography>
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
                        <Typography>Verified helpline information, no broken links.</Typography>
                    </Box>
                </Container>
                <Box className={[classes.content, classes.left].join(' ')}>
                    <Container maxWidth="xs">
                        <Typography variant="h6" gutterBottom>
                            Built by{' '}
                            <OutboundLink
                                eventLabel="https://www.livefortomorrow.co"
                                to="https://www.livefortomorrow.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                Live For Tomorrow
                            </OutboundLink>
                            , a registered charity using technology to support mental health.
                        </Typography>
                        <Typography gutterBottom>
                            We&apos;re a small team motivated by our own and other&apos;s experiences of mental health,
                            and a deep frustration of how hard it can be to access help when you’re struggling.
                        </Typography>
                        <Typography>
                            We want to make it easier for everyone to receive human support, when and where they need
                            it.
                        </Typography>
                    </Container>
                </Box>
                <Box className={[classes.container, classes.background1].join(' ')}>
                    <Container className={classes.containerContent} maxWidth="xs">
                        <Box mb={3}>
                            <Typography variant="h5">Want Find A Helpline on your website?</Typography>
                        </Box>
                        <Box>
                            <NextLink href="/get-the-widget" passHref prefetch={process.env.NODE_ENV === 'production'}>
                                <Button className={classes.button} color="secondary" variant="contained" size="large">
                                    Get the widget
                                </Button>
                            </NextLink>
                        </Box>
                    </Container>
                </Box>
                <Box className={classes.content}>
                    <Container maxWidth="xs">
                        <Typography variant="h6">Helpline criteria</Typography>
                        <Typography>
                            We only include helplines that meet three simple criteria, ensuring a trustworthy and
                            reliable service for all.
                        </Typography>
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
                            <Typography variant="h6" gutterBottom>
                                Want to partner?
                                <br />
                                Got a question?
                            </Typography>
                            <Typography>
                                Our partners include social media platforms, technology companies, influencers,
                                academics, not-for-profits and helplines.
                            </Typography>
                        </Box>
                        <NextLink href="/contact" passHref prefetch={process.env.NODE_ENV === 'production'}>
                            <OutboundLink
                                eventLabel="mailto:elliot@livefortomorrow.co"
                                to="mailto:elliot@livefortomorrow.co"
                                className={classes.outboundLink}
                            >
                                <Button className={classes.button} color="primary" variant="contained" size="large">
                                    Email us
                                </Button>
                            </OutboundLink>
                        </NextLink>
                    </Container>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default About;
