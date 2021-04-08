import React, { ReactElement } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Box, Grid, Divider } from '@material-ui/core';
import NextLink from 'next/link';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SecurityRoundedIcon from '@material-ui/icons/SecurityRounded';
import { OutboundLink } from 'react-ga';
import Flag from 'react-world-flags';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import Highlight from '../Highlight';

const useStyles = makeStyles((theme) =>
    createStyles({
        content: {
            padding: theme.spacing(5, 0),
        },
        contentAlt: {
            backgroundColor: theme.palette.background.paper,
        },
        contentPrimary: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        link: {
            textDecoration: 'underline',
            color: theme.palette.text.primary,
        },
        outboundLink: {
            textDecoration: 'none',
        },
        illustration: {
            padding: theme.spacing(2),
            textAlign: 'center',
            '& img': {
                width: '90%',
            },
        },
        partnerImg: {
            width: '80%',
        },
        partnerHeading: {
            color: theme.palette.text.secondary,
            textAlign: 'center',
            marginBottom: theme.spacing(2),
        },
    }),
);

type Country = {
    code: string;
    name: string;
};

interface Props {
    countries: Country[];
    isPage?: boolean;
}

const About = ({ countries, isPage }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
                <Container maxWidth="xs">
                    {!isPage && (
                        <Box mb={5}>
                            <Typography className={classes.partnerHeading}>Key Partners</Typography>
                            <Divider />
                            <Box mx={2} my={2}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={6}>
                                        <img src="/partners/Polyform.png" className={classes.partnerImg} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <img src="/partners/SearchRepublic.png" className={classes.partnerImg} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <img src="/partners/DataStory.png" className={classes.partnerImg} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <img src="/partners/GravityLab.png" className={classes.partnerImg} />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider />
                        </Box>
                    )}
                    <Typography variant="h5" align="center">
                        Free emotional support, wherever you are
                    </Typography>
                    <Box className={classes.illustration}>
                        <img src="/illustrations/woman-sitting.png" />
                    </Box>
                    <Highlight
                        title="Quick"
                        description="Match with a helpline, ready to support you today"
                        Icon={FastForwardRoundedIcon}
                    />
                    <Highlight
                        title="Personal"
                        description="Talk with a volunteer, counselor, or peer"
                        Icon={AccountCircleIcon}
                    />
                    <Highlight
                        title="Private"
                        description="No sign up or personal info required"
                        Icon={SecurityRoundedIcon}
                    />
                    <Box my={4}>
                        <Typography variant="h6" gutterBottom>
                            In these strange and stressful times, you’re not alone.
                        </Typography>
                        <Typography gutterBottom>
                            Helplines, also known as hotlines, exist to provide a confidential, non-judgemental space –
                            for free.
                        </Typography>
                        <Typography gutterBottom>
                            They are staffed by supportive people, who provide immediate support, counselling and
                            information.
                        </Typography>
                    </Box>
                    <Box my={4}>
                        {isPage ? (
                            <NextLink href="/" passHref prefetch={process.env.NODE_ENV === 'production'}>
                                <Button color="primary" variant="contained" fullWidth size="large">
                                    Find a helpline <ArrowRightAltRoundedIcon />
                                </Button>
                            </NextLink>
                        ) : (
                            <Button variant="contained" color="primary" fullWidth size="large" href="#top">
                                Find a helpline <ArrowRightAltRoundedIcon />
                            </Button>
                        )}
                    </Box>
                </Container>
            </Box>
            <Box className={classes.content}>
                <Container maxWidth="xs">
                    <Box className={classes.illustration}>
                        <img src="/illustrations/phone.png" />
                    </Box>
                    <Box my={4}>
                        <Typography variant="h6" gutterBottom>
                            The world’s largest resource of helplines, at your fingertips.
                        </Typography>
                        <Typography gutterBottom>
                            We’ve collated over 1,300 services across the world that offer immediate emotional support,
                            and made them easily available to you.
                        </Typography>
                        <Typography gutterBottom>
                            We work directly with helplines to ensure our data remains accurate and reliable.
                        </Typography>
                    </Box>
                    <Box my={4}>
                        <Typography variant="h6" gutterBottom>
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
                    </Box>
                    <Box my={4}>
                        <OutboundLink
                            eventLabel="https://livefortomorrow.typeform.com/to/ErmyL3tv"
                            to="https://livefortomorrow.typeform.com/to/ErmyL3tv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.link}
                        >
                            <Button classes={{ label: classes.link }} color="primary" fullWidth size="large">
                                Hear when we launch in your country
                                <ArrowRightAltRoundedIcon />
                            </Button>
                        </OutboundLink>
                    </Box>
                </Container>
            </Box>
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
                <Container maxWidth="xs">
                    <Box className={classes.illustration}>
                        <img src="/illustrations/craft.png" />
                    </Box>
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
                        , a not-for-profit startup building better crisis support for the digital era.
                    </Typography>
                    <Typography gutterBottom>
                        We&apos;re a small team motivated by our own and other&apos;s experiences of mental health, and
                        a deep frustration of how hard it can be to access help when you’re struggling.
                    </Typography>
                    <Typography>
                        We want to make it easier for everyone to receive emotional support, when and where they need
                        it.
                    </Typography>
                </Container>
            </Box>
            <Box className={[classes.content, classes.contentPrimary].join(' ')}>
                <Container maxWidth="xs">
                    <Box className={classes.illustration}>
                        <img src="/illustrations/widget.png" />
                    </Box>
                    <Box mb={3} textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Connect people to help, directly from your website or app
                        </Typography>
                    </Box>
                    <NextLink href="/get-the-widget" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Button variant="contained" fullWidth size="large">
                            Learn more
                            <ArrowRightAltRoundedIcon />
                        </Button>
                    </NextLink>
                </Container>
            </Box>
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
                <Container maxWidth="xs">
                    <Box my={6} textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Want to partner?
                            <br />
                            Got a question?
                        </Typography>
                        <Typography>
                            Our partners include helplines, not-for-profits, universities, social networks, technology
                            companies, and social influencers.
                        </Typography>
                    </Box>
                    <NextLink href="/contact" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Button color="primary" variant="contained" fullWidth size="large">
                            Get in touch
                            <ArrowRightAltRoundedIcon />
                        </Button>
                    </NextLink>
                </Container>
            </Box>
        </>
    );
};

export default About;
