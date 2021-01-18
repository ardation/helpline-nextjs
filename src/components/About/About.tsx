import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Button, Box, Grid } from '@material-ui/core';
import NextLink from 'next/link';
import Image from 'next/image';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import { OutboundLink } from 'react-ga';
import Flag from 'react-world-flags';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Footer from '../Footer';
import NavBar from '../NavBar';
import SideBar from '../SideBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        center: {
            textAlign: 'center',
        },
        left: {
            textAlign: 'left',
        },
        container: {
            position: 'relative',
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
            marginTop: theme.spacing(10),
            marginBottom: theme.spacing(10),
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
        backgroundImageContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            '& > div::after': {
                content: '" "',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))',
            },
        },
        backgroundImage: {
            objectFit: 'cover',
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
        heading: {
            fontWeight: 600,
            lineHeight: '1.7rem',
            [theme.breakpoints.up('lg')]: {
                fontSize: '1.5rem',
                lineHeight: '1.334',
            },
        },
        title: {
            fontWeight: 600,
            [theme.breakpoints.up('lg')]: {
                fontSize: '2.125rem',
                lineHeight: '1.235',
            },
        },
    }),
);

type Country = {
    code: string;
    name: string;
};

interface Props {
    countries: Country[];
    navBar?: boolean;
}

const About = ({ countries, navBar }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <>
            {navBar && (
                <NavBar>
                    <SideBar />
                </NavBar>
            )}
            <Box className={[classes.container].join(' ')}>
                <Box className={classes.backgroundImageContainer}>
                    <Image
                        src="/bg0.jpg"
                        layout="fill"
                        alt="Women laying down looking at her phone"
                        className={classes.backgroundImage}
                    />
                </Box>
                <Container className={classes.containerContent} maxWidth="xs">
                    <Box mb={3}>
                        <Typography className={classes.title} variant="h5">
                            Whatever you&apos;re
                            <br />
                            going through, find
                            <br />
                            someone to talk to here.
                        </Typography>
                    </Box>
                </Container>
                {navBar && (
                    <Box>
                        <ArrowDownwardIcon />
                    </Box>
                )}
            </Box>
            <Box className={classes.center}>
                <Box className={[classes.content, classes.left].join(' ')}>
                    <Container maxWidth="xs">
                        <Typography className={classes.heading} variant="h6" gutterBottom>
                            We&apos;re putting every free mental health and crisis helpline in the world at your
                            fingertips.
                        </Typography>
                        <Typography gutterBottom>
                            Helplines exist the world over, but finding the right one for you remains difficult. We’re
                            set on changing that.
                        </Typography>
                        <Typography gutterBottom>
                            Find A Helpline is a free tool that connects you to the right helpline for you, wherever you
                            are.
                        </Typography>
                    </Container>
                </Box>
                <Box className={[classes.content, classes.left].join(' ')}>
                    <Container maxWidth="xs">
                        <Typography className={classes.heading} variant="h6" gutterBottom>
                            Supported countries
                        </Typography>
                        <Grid container spacing={2}>
                            {countries.map((country) => (
                                <Grid key={country.code} item xs={6}>
                                    <Typography>
                                        <Flag code={country.code} width={20} /> {country.name}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
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
                        <Typography className={classes.heading} variant="h6" gutterBottom>
                            The world&apos;s most reliable helpline data
                        </Typography>
                        <Typography gutterBottom>
                            Having made the brave decision to reach out, people need to feel confident that help is on
                            the other side – not a dial tone.
                        </Typography>
                        <Typography>
                            That’s why we work directly with helplines to ensure our data remains accurate and reliable.
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
                <Box className={[classes.content, classes.left].join(' ')}>
                    <Container maxWidth="xs">
                        <Typography className={classes.heading} variant="h6" gutterBottom>
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
                            , a not-for-profit startup connecting people to free mental health and crisis support.
                        </Typography>
                        <Typography gutterBottom>
                            We&apos;re a small team motivated by our own and other&apos;s experiences of mental health,
                            and a deep frustration of how hard it can be to access help when you’re struggling.
                        </Typography>
                        <Typography>
                            Our mission is to take meaningful help to people experiencing distress, all over the world.
                            We want to make it easier for everyone to receive human support, when and where they need
                            it.
                        </Typography>
                    </Container>
                </Box>
                <Box className={[classes.container].join(' ')}>
                    <Box className={classes.backgroundImageContainer}>
                        <Image
                            src="/bg1.jpg"
                            layout="fill"
                            alt="Man holding phone"
                            className={classes.backgroundImage}
                        />
                    </Box>
                    <Container className={classes.containerContent} maxWidth="xs">
                        <Box mb={3}>
                            <Typography className={classes.heading} variant="h6">
                                Want Find A Helpline on your website?
                            </Typography>
                        </Box>
                        <Box>
                            <NextLink href="/get-the-widget" passHref prefetch={process.env.NODE_ENV === 'production'}>
                                <Button className={classes.button} color="secondary" variant="contained" size="large">
                                    Learn more
                                </Button>
                            </NextLink>
                        </Box>
                    </Container>
                </Box>
                <Box className={classes.content}>
                    <Container maxWidth="xs">
                        <Box mb={3}>
                            <Typography className={classes.heading} variant="h6" gutterBottom>
                                Want to partner?
                                <br />
                                Got a question?
                            </Typography>
                            <Typography>
                                Our partners include helplines, not-for-profits, universities, social media platforms,
                                technology companies, and social influencers.
                            </Typography>
                        </Box>
                        <NextLink href="/contact" passHref prefetch={process.env.NODE_ENV === 'production'}>
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
