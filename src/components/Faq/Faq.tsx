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
                    Reaching out for help is one of the bravest – and most difficult – things to do when you’re
                    struggling.
                </Typography>
                <Typography gutterBottom>
                    Helplines – also known as hotlines, crisis lines, or crisis call centres – provide immediate,
                    emotional support to people like you, all over the world.
                </Typography>
                <Typography gutterBottom>
                    If you’re used to keeping everything to yourself, or you’ve never reached out to a helpline before,
                    you may be feeling a little unsure about what to expect. This uncertainty can add additional stress
                    or anxiety to an already difficult time.
                </Typography>
                <Typography gutterBottom>
                    For some, knowing what to expect, or going in prepared, can help alleviate anxiety and make it
                    easier to take that step. Here are some answers to common questions:
                </Typography>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                        <Typography className={classes.heading}>Who will I talk to?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus
                            est, id dignissim quam.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                        <Typography className={classes.heading}>What do I say?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam
                            eros in elit. Pellentesque convallis laoreet laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                        <Typography className={classes.heading}>How will they help me?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                        <Typography className={classes.heading}>I’m still not sure :-/</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Box my={2}>
                    <Divider />
                </Box>
                <Box mt={3} mb={1}>
                    <NextLink href="/" passHref prefetch={process.env.NODE_ENV === 'production'}>
                        <Button color="primary" variant="contained" fullWidth size="large">
                            Find a helpline <ArrowRightAltRoundedIcon />
                        </Button>
                    </NextLink>
                </Box>
            </Container>
        </Box>
    );
};

export default Faq;
