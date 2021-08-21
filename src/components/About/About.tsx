import React, { ReactElement } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Box, Grid, Divider } from '@material-ui/core';
import NextLink from 'next/link';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SecurityRoundedIcon from '@material-ui/icons/SecurityRounded';
import { OutboundLink } from 'react-ga';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import { compact } from 'lodash/fp';
import Image from 'next/image';
import Highlight from '../Highlight';
import CountryAccordian from '../CountryAccordian';

const useStyles = makeStyles((theme) =>
    createStyles({
        content: {
            padding: theme.spacing(5, 0),
        },
        contentAlt: {
            backgroundColor: theme.palette.background.paper,
        },
        contentFirstNotPage: {
            padding: theme.spacing(2, 0, 5),
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
            width: '100%',
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
    region: string;
};

interface Props {
    countries: Country[];
    isPage?: boolean;
}

const About = ({ countries, isPage }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <Box
                className={compact([classes.content, classes.contentAlt, !isPage && classes.contentFirstNotPage]).join(
                    ' ',
                )}
            >
                <Container maxWidth="xs">
                    {!isPage && (
                        <Box mb={5}>
                            <Typography className={classes.partnerHeading}>Key Partners</Typography>
                            <Divider />
                            <Box mx={2} my={2}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={7}>
                                        <Image
                                            layout="responsive"
                                            src="/partners/IASP.png"
                                            className={classes.partnerImg}
                                            width={364}
                                            height={62}
                                            alt="International Association for Suicide Prevention"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Image
                                            layout="responsive"
                                            src="/partners/GravityLab.png"
                                            className={classes.partnerImg}
                                            width={233}
                                            height={50}
                                            alt="Gravity Lab"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Image
                                            layout="responsive"
                                            src="/partners/Polyform.png"
                                            className={classes.partnerImg}
                                            width={194}
                                            height={60}
                                            alt="Polyform"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Image
                                            layout="responsive"
                                            src="/partners/SearchRepublic.png"
                                            className={classes.partnerImg}
                                            width={213}
                                            height={70}
                                            alt="Search Republic"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Image
                                            layout="responsive"
                                            src="/partners/DataStory.png"
                                            className={classes.partnerImg}
                                            width={239}
                                            height={30}
                                            alt="Data Story"
                                        />
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
                        <Image
                            layout="responsive"
                            src="/illustrations/woman-sitting.png"
                            width={540}
                            height={540}
                            alt="Woman Sitting"
                        />
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
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    endIcon={<ArrowRightAltRoundedIcon />}
                                >
                                    Find a helpline
                                </Button>
                            </NextLink>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                href="#top"
                                endIcon={<ArrowRightAltRoundedIcon />}
                            >
                                Find a helpline
                            </Button>
                        )}
                    </Box>
                </Container>
            </Box>
            <Box className={classes.content}>
                <Container maxWidth="xs">
                    <Box className={classes.illustration}>
                        <Image
                            layout="responsive"
                            src="/illustrations/phone.png"
                            width={458}
                            height={460}
                            alt="Phone"
                        />
                    </Box>
                    <Box my={4}>
                        <Typography variant="h6" gutterBottom>
                            The world’s largest resource of helplines, at your fingertips.
                        </Typography>
                        <Typography gutterBottom>
                            We’ve collated over 1,600 services across the world that offer immediate emotional support,
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
                        <CountryAccordian countries={countries} />
                    </Box>
                    <Box mt={4}>
                        <OutboundLink
                            eventLabel="https://livefortomorrow.typeform.com/to/ErmyL3tv"
                            to="https://livefortomorrow.typeform.com/to/ErmyL3tv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.link}
                        >
                            <Button
                                classes={{ label: classes.link }}
                                color="primary"
                                fullWidth
                                size="large"
                                endIcon={<ArrowRightAltRoundedIcon />}
                            >
                                Hear when we launch in your country
                            </Button>
                        </OutboundLink>
                    </Box>
                </Container>
            </Box>
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
                <Container maxWidth="xs">
                    <Box className={classes.illustration}>
                        <Image
                            layout="responsive"
                            src="/illustrations/craft.png"
                            width={500}
                            height={496}
                            alt="Craft"
                        />
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
                    <Box mt={4}>
                        <OutboundLink
                            eventLabel="https://www.livefortomorrow.co/find-a-helpline-volunteer"
                            to="https://www.livefortomorrow.co/find-a-helpline-volunteer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.link}
                        >
                            <Button
                                classes={{ label: classes.link }}
                                color="primary"
                                fullWidth
                                size="large"
                                endIcon={<ArrowRightAltRoundedIcon />}
                            >
                                📣 We&apos;re recruiting volunteers!
                            </Button>
                        </OutboundLink>
                    </Box>
                </Container>
            </Box>
            <Box className={[classes.content, classes.contentPrimary].join(' ')}>
                <Container maxWidth="xs">
                    <Box className={classes.illustration}>
                        <Image
                            layout="responsive"
                            src="/illustrations/widget.png"
                            width={732}
                            height={732}
                            alt="Widget"
                        />
                    </Box>
                    <Box mb={3} textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Connect people to help, directly from your website or app
                        </Typography>
                    </Box>
                    <NextLink href="/get-the-widget" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Button variant="contained" fullWidth size="large" endIcon={<ArrowRightAltRoundedIcon />}>
                            Learn about the widget
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
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            size="large"
                            endIcon={<ArrowRightAltRoundedIcon />}
                        >
                            Get in touch
                        </Button>
                    </NextLink>
                </Container>
            </Box>
        </>
    );
};

export default About;
