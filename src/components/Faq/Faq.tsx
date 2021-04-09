import React, { ChangeEvent, ReactElement, useState } from 'react';
import {
    makeStyles,
    createStyles,
    withStyles,
    Container,
    Typography,
    Box,
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    Divider,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import NextLink from 'next/link';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';

const useStyles = makeStyles((theme) =>
    createStyles({
        illustration: {
            paddingTop: theme.spacing(2),
            textAlign: 'center',
            '& img': {
                width: '75%',
            },
        },
        heading: {
            fontFamily: theme.typography.h1.fontFamily,
            color: theme.palette.secondary.main,
        },
    }),
);

const Accordion = withStyles({
    root: {
        border: 0,
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        padding: 0,
        borderBottom: 0,
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2, 0),
        flexDirection: 'column',
    },
}))(MuiAccordionDetails);

const Faq = (): ReactElement => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (_event: ChangeEvent<{}>, isExpanded: boolean): void => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box bgcolor="background.paper" py={2}>
            <Container maxWidth="xs">
                <Typography variant="h5">What can I expect when contacting a helpline?</Typography>

                <Box className={classes.illustration}>
                    <img src="/illustrations/guy.png" />
                </Box>
                <Typography variant="h6" gutterBottom>
                    Reaching out for help is one of the bravest – and most difficult – things to do when you&apos;re
                    struggling.
                </Typography>
                <Typography gutterBottom>
                    Helplines – also known as hotlines, crisis lines, or crisis call centres – provide immediate,
                    emotional support to people like you, all over the world.
                </Typography>
                <Typography gutterBottom>
                    If you&apos;re used to keeping everything to yourself, or you&apos;ve never reached out to a
                    helpline before, you may be feeling a little unsure about what to expect. This uncertainty can add
                    additional stress or anxiety to an already difficult time.
                </Typography>
                <Typography gutterBottom>
                    For some, knowing what to expect, or going in prepared, can help ease anxiety and make it easier to
                    take that step. Here are some answers to common questions:
                </Typography>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                        <Typography variant="h6" className={classes.heading}>
                            Who will I talk to?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Usually, there are three options for who you might talk to on the other end of the phone,
                            text or web chat:
                            <ul>
                                <li>
                                    Volunteers – People who have received some training in how to listen and help. They
                                    are usually not paid by the helpline.
                                </li>
                                <li>
                                    Counselors – People who are employed and trained to provide counselling or
                                    psychological support. They may have received formal training.
                                </li>
                                <li>
                                    Peers – People who share a similar life experience. They may or may not have
                                    training. They are usually not paid by the helpline.
                                </li>
                            </ul>
                        </Typography>
                        <Typography>
                            Regardless of the type of support they provide, everyone who works at a helpline is a human
                            who wants to hear what&apos;s happening for you. If it&apos;s important to you who you talk
                            with, Find A Helpline allows you to filter your search by one or more support types. You can
                            also select a specialty if you feel more comfortable with a helpline providing specialized
                            support.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                        <Typography variant="h6" className={classes.heading}>
                            What do I say?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography gutterBottom>
                            For many, one of the biggest sources of anxiety when calling a helpline for the first time
                            is knowing what to say. In a situation where everything feels overwhelming, it&apos;s
                            difficult to know where to begin.
                        </Typography>
                        <Typography variant="h6">Starting the conversation</Typography>
                        <Typography>
                            It might feel helpful to practice what you want to say, or write down a few key points you
                            want to talk about.
                        </Typography>
                        <Typography>
                            Here&apos;s some sentence starters that might help...
                            <ul>
                                <li>Things are hard at the moment, because...</li>
                                <li>Lately I&apos;ve been feeling...</li>
                                <li>I&apos;m dealing with [feeling or situation] at the moment, and...</li>
                            </ul>
                        </Typography>
                        <Typography variant="h6">There&apos;s no wrong way to say it</Typography>
                        <Typography>
                            Remember, the supportive person on the other end is there for you. They&apos;re there to
                            hear your story and your struggles, as you experience it. There&apos;s no right or wrong way
                            to tell someone about what&apos;s going on for you. You can tell them as much or as little
                            as you feel comfortable with – you won&apos;t be forced to disclose anything you&apos;re not
                            ready to talk about.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                        <Typography variant="h6" className={classes.heading}>
                            How will they help me?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography gutterBottom>
                            Helplines exist to provide a confidential, non-judgemental space and provide immediate
                            support, counselling and information.
                        </Typography>
                        <Typography variant="h6">You can talk about anything</Typography>
                        <Typography gutterBottom>
                            You can contact a helpline to talk, no matter how big or small you think your issue is. You
                            don&apos;t have to be in crisis to deserve support with what you&apos;re dealing with – the
                            person on the other end will help you to talk through your problem and draw out insights and
                            helpful next steps.
                        </Typography>
                        <Typography variant="h6">They&apos;ll help you stay safe</Typography>
                        <Typography gutterBottom>
                            If you are in a moment of crisis, and you need help right now, the helpline will help you to
                            calm down and keep safe. If the helpline deals with crisis, they may do what is called a
                            risk assessment, which helps them to determine whether you&apos;re feeling suicidal and
                            might need immediate help right now. If you are feeling suicidal, the person will listen to
                            understand how intense your thoughts and feelings are, and may help you make a plan to stay
                            safe in the moment.
                        </Typography>
                        <Typography variant="h6">You can find the right help</Typography>
                        <Typography gutterBottom>
                            Some helplines are specialized, meaning they provide a specific type of support, or help to
                            a certain community. For example, members of the LGBTQ+ community may feel more comfortable
                            contacting a helpline for rainbow people. Other helplines provide more general support, and
                            will take calls from anybody, about anything they want to talk about.
                        </Typography>
                        <Typography>
                            Find A Helpline categorizes helplines by topic and specialty, so it will always be clearly
                            indicated what topics a helpline supports with, and whether they specialize in helping a
                            certain group of people. This makes it easy to find the right help for you, and removes any
                            uncertainty about whether you&apos;re contacting the right place for your situation.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                        <Typography variant="h6" className={classes.heading}>
                            I&apos;m still not sure :-/
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography gutterBottom>
                            It&apos;s normal to feel unsure about contacting a helpline, especially if you&apos;ve never
                            done it before.
                        </Typography>
                        <Typography gutterBottom>
                            A study by researchers at Harvard University identified some key reasons why people in a
                            moment of distress may feel unsafe or uncomfortable reaching out for help from crisis
                            resources.
                        </Typography>
                        <Typography variant="h6">I just want to chat</Typography>
                        <Typography gutterBottom>
                            A lot of people feel this. Contacting a helpline can sound intense, but needing to chat is
                            actually the reason they exist. Most helplines, even if they support people experiencing a
                            crisis, aren&apos;t limited to only supporting people in intense situations.
                        </Typography>
                        <Typography gutterBottom>
                            A dedicated category of helplines called ‘warmlines&apos; also exist for the sole purpose of
                            supporting those who just want to chat. These are run by peers with lived experience of
                            mental health struggles. You can find warmlines on Find A Helpline by refining your search
                            by specialty.
                        </Typography>
                        <Typography variant="h6">
                            I don&apos;t like using the phone / I don&apos;t have a phone
                        </Typography>
                        <Typography gutterBottom>
                            A large number of people would prefer to talk to someone via text or web chat, or don&apos;t
                            have a phone to call a helpline. This is a very common preference, and many helplines are
                            moving their services online. For many, accessing helplines via text or web chat can feel
                            less formal, allowing you to feel more comfortable talking about difficult topics.
                        </Typography>
                        <Typography variant="h6">I don&apos;t want the police called</Typography>
                        <Typography gutterBottom>
                            Some people fear that if they contact a helpline then the police will be called. For a lot
                            of people, this thought can cause stress and anxiety. Helplines often have a legal or
                            ethical obligation to keep all your information confidential unless they believe that you,
                            or somebody else, is in immediate danger.
                        </Typography>
                        <Typography gutterBottom>
                            If you are feeling suicidal, a helpline will help you to stay safe in the moment and will
                            not call the police unless they believe you are about to carry out a plan to hurt yourself
                            or someone else.
                        </Typography>
                        <Typography variant="h6">The thoughts I&apos;m having are too intense</Typography>
                        <Typography gutterBottom>
                            When experiencing distressing thoughts and feelings, it&apos;s common to feel like these are
                            too intense to share with another person – especially when you&apos;re unsure how they will
                            respond.
                        </Typography>
                        <Typography gutterBottom>
                            People who work at helplines are trained and willing to listen to whatever you have to say,
                            and have experience helping others going through exactly what you are right now. No matter
                            what you&apos;re feeling, you&apos;ll be offered a non-judgemental listening ear, and help
                            to move forward in a way that is meaningful to you.
                        </Typography>
                        <Typography variant="h6">I don&apos;t trust professionals</Typography>
                        <Typography gutterBottom>
                            Many people who experience emotional or mental health distress have never spoken to a
                            professional before, or have had a negative experience. While professional support from
                            trained counselors can be extremely helpful, you may prefer to speak to someone like you.
                        </Typography>
                        <Typography gutterBottom>
                            Most helplines are staffed by volunteers, who give their time to help people because they
                            care about others. Some helplines are staffed by peers, who are people that share a similar
                            experience. There are also peer-support lines called "warmlines" run entirely by people with
                            lived experience of mental health struggles.
                        </Typography>
                        <Typography gutterBottom>
                            Find A Helpline allows you to filter your search to display only helplines offering
                            volunteer or peer support, if this is what feels right for you.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Box my={2}>
                    <Divider />
                </Box>
                <Box mt={3} mb={1}>
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
                </Box>
            </Container>
        </Box>
    );
};

export default Faq;
