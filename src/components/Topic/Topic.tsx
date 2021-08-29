import React, { ReactElement } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Button } from '@material-ui/core';
import Image from 'next/image';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import CountryAccordian from '../CountryAccordian';
import Markdown from '../Markdown';

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
    }),
);

type Country = {
    code: string;
    name: string;
    region: string;
};

type Topic = {
    name: string;
    slug: string;
    markdown?: string;
};

interface Props {
    countries: Country[];
    topic: Topic;
}

const About = ({ countries, topic }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
                <Container maxWidth="xs">
                    <Typography variant="h5" gutterBottom>
                        {topic.slug === 'suicidal-thoughts' ? 'Suicide hotlines' : `${topic.name} helplines`}
                    </Typography>
                    <Typography gutterBottom>
                        If you&apos;re dealing with {topic.name}, contact a helpline near you:
                    </Typography>
                    <CountryAccordian countries={countries} topic={topic} />
                </Container>
            </Box>
            {topic.markdown && (
                <Box className={classes.content}>
                    <Markdown>{topic.markdown}</Markdown>
                </Box>
            )}
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
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
                            {topic.slug === 'suicidal-thoughts'
                                ? 'Finding a suicide hotline'
                                : `Finding a helpline for ${topic.name}`}
                        </Typography>
                        <Typography gutterBottom>
                            Helplines are available in most countries, and through Find A Helpline we connect you to
                            them for free.
                        </Typography>

                        <Typography gutterBottom>
                            To use Find A Helpline, select your country, and then choose the topic you want to talk
                            about – e.g. &quot;{topic.name}&quot;. You will be shown the most relevant helplines for you
                            in your location.
                        </Typography>
                        <Typography gutterBottom>
                            If you like, you can filter your results based on who you want to talk to (volunteers,
                            counselors or peers), how you want to talk to them (phone, text, or webchat) and whether you
                            want a helpline with a certain specialty (e.g. LGBTQ+).
                        </Typography>
                        <Typography gutterBottom>
                            This way, you can find the right helpline for you, available at the time you need it.
                        </Typography>
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
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default About;
