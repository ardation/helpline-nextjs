import React, { ReactElement } from 'react';
import {
    createStyles,
    makeStyles,
    Container,
    Typography,
    Button,
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import NextLink from 'next/link';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import { OutboundLink } from 'react-ga';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Image from 'next/image';
import Highlight from '../Highlight';
import Widget, { WidgetProps } from '../Widget/Widget';

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
        heading: {
            fontFamily: theme.typography.fontFamily,
            marginBottom: theme.spacing(1),
            fontSize: '1.1rem',
        },
        tableCell: {
            border: 0,
        },
    }),
);

interface Props {
    widgetProps: WidgetProps;
}

const WidgetPartners = ({ widgetProps }: Props): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
                <Container maxWidth="xs">
                    <Typography variant="h6" align="center" className={classes.heading}>
                        Find A Helpline widget &amp; API
                    </Typography>
                    <Typography variant="h5" component="h1" align="center">
                        Free emotional support, on your website or app
                    </Typography>
                    <Box className={classes.illustration}>
                        <Image
                            layout="responsive"
                            src="/illustrations/widget.png"
                            width={732}
                            height={732}
                            alt="Widget"
                        />
                    </Box>
                    <Box my={4}>
                        <Typography variant="h6" gutterBottom>
                            A global suicide prevention solution for the digital era
                        </Typography>
                        <Typography gutterBottom>
                            Bridge users experiencing distress or a mental health crisis to immediate help, wherever
                            they are in the world.
                        </Typography>
                    </Box>
                    <Highlight
                        title="Social networks"
                        description="Ensure users in crisis are safe and supported"
                        Icon={FaceRoundedIcon}
                    />
                    <Highlight
                        title="News media"
                        description="Safely report on suicide and mental health"
                        Icon={LocalLibraryRoundedIcon}
                    />
                    <Highlight
                        title="Wellbeing websites"
                        description="Connect visitors to free, immediate support"
                        Icon={LanguageRoundedIcon}
                    />
                    <Typography variant="h6" color="secondary">
                        Why use helpline referrals?
                    </Typography>
                    <Typography gutterBottom>
                        Helplines, also known as hotlines or crisis call centres, provide immediate, emotional support
                        by text (sms), web chat (instant message) or voice call. They are a free and accessible way for
                        people to get help with distressing feelings, thoughts of suicide, abusive situations,
                        depression or grief. They are commonly staffed by people who are trained to help in moments of
                        crisis, and can reduce feelings of being a burden and increase hope, which can{' '}
                        <OutboundLink
                            eventLabel="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3130348/"
                            to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3130348/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.link}
                        >
                            lower the risk of suicide.
                        </OutboundLink>
                    </Typography>
                    <Typography gutterBottom>
                        Helplines are a key strategy for suicide prevention online and are used by major social
                        networks, news media and wellbeing websites, all over the world.
                    </Typography>
                    <Typography variant="h6" color="secondary">
                        What is the Find A Helpline widget?
                    </Typography>
                    <Typography gutterBottom>
                        A plugin that places a small Find A Helpline user interface on your website or app.
                    </Typography>
                    <Typography variant="h6" color="secondary">
                        What is the Find A Helpline API?
                    </Typography>
                    <Typography gutterBottom>
                        A white-labelled data integration that enables you to recommend the most relevant helplines to
                        people in your user interface.
                    </Typography>
                    <Typography variant="h6" color="secondary">
                        What’s under the hood?
                    </Typography>
                    <Typography gutterBottom>
                        We’ve built the largest and most reliable helpline dataset in the world – so you don’t have to.
                        We provide over 1,600 services in 60 countries, and are continually expanding our coverage.
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="none" colSpan={2} className={classes.tableCell}>
                                    <Typography variant="h6" color="error">
                                        Standard helpline lists
                                    </Typography>
                                </TableCell>
                                <TableCell padding="none" colSpan={2} className={classes.tableCell}>
                                    <Typography variant="h6" color="secondary">
                                        Find A Helpline Widget
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell padding="none" align="center">
                                    <CloseRoundedIcon color="error" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Minimal coverage</Typography>
                                </TableCell>
                                <TableCell padding="none" align="center">
                                    <CheckRoundedIcon color="secondary" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Global coverage</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell padding="none" align="center">
                                    <CloseRoundedIcon color="error" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Manual upkeep</Typography>
                                </TableCell>
                                <TableCell padding="none" align="center">
                                    <CheckRoundedIcon color="secondary" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Set and forget</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell padding="none" align="center">
                                    <CloseRoundedIcon color="error" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Random list of helplines</Typography>
                                </TableCell>
                                <TableCell padding="none" align="center">
                                    <CheckRoundedIcon color="secondary" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Filtering to find the right support</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell padding="none" align="center">
                                    <CloseRoundedIcon color="error" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Not actionable, a barrier to help</Typography>
                                </TableCell>
                                <TableCell padding="none" align="center">
                                    <CheckRoundedIcon color="secondary" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Clear contact button</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell padding="none" align="center">
                                    <CloseRoundedIcon color="error" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Information overload</Typography>
                                </TableCell>
                                <TableCell padding="none" align="center">
                                    <CheckRoundedIcon color="secondary" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Concise and informative</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell padding="none" align="center">
                                    <CloseRoundedIcon color="error" />
                                </TableCell>
                                <TableCell>
                                    <Typography>No impact measurement</Typography>
                                </TableCell>
                                <TableCell padding="none" align="center">
                                    <CheckRoundedIcon color="secondary" />
                                </TableCell>
                                <TableCell>
                                    <Typography>Measurable impact</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>
            </Box>
            <Box className={[classes.content, classes.contentPrimary].join(' ')}>
                <Container maxWidth="xs">
                    <Box mb={3} textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Want to refer users to helplines in your UI?
                        </Typography>
                        <Typography gutterBottom>Yes, there’s an API for that.</Typography>
                    </Box>
                    <NextLink href="/contact" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Button variant="contained" fullWidth size="large" endIcon={<ArrowRightAltRoundedIcon />}>
                            Talk to us about the API
                        </Button>
                    </NextLink>
                </Container>
            </Box>
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
                <Container maxWidth="xs">
                    <Typography variant="h6" gutterBottom align="center">
                        Try out the widget yourself below
                    </Typography>
                </Container>
                <Container>
                    <Widget {...widgetProps} />
                </Container>
            </Box>
            <Box className={classes.content}>
                <Container maxWidth="xs">
                    <Box className={classes.illustration}>
                        <Image layout="responsive" src="/illustrations/tech.png" width={504} height={380} alt="Tech" />
                    </Box>
                    <Box my={4}>
                        <Typography variant="h6" gutterBottom align="center">
                            Deploy a global suicide prevention solution, in minutes
                        </Typography>
                        <Typography gutterBottom align="center">
                            Simply paste one tiny code snippet into your page or app, and the widget appears.
                        </Typography>
                        <Typography gutterBottom align="center">
                            Users can start accessing help immediately.
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <Box className={[classes.content, classes.contentAlt].join(' ')}>
                <Container maxWidth="xs">
                    <Box className={classes.illustration}>
                        <Image
                            layout="responsive"
                            src="/illustrations/connect.png"
                            width={530}
                            height={518}
                            alt="Connect"
                        />
                    </Box>
                    <Typography variant="h6" gutterBottom align="center">
                        Let&apos;s connect the dots and save lives.
                    </Typography>
                    <Typography gutterBottom align="center">
                        Talk with us about integrating the Find A Helpline widget or API into your website or app.
                    </Typography>
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

export default WidgetPartners;
