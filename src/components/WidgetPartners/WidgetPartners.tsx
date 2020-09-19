import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NextLink from 'next/link';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            [theme.breakpoints.down('xs')]: {
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
            textAlign: 'center',
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
            background:
                'linear-gradient(0deg, rgba(51, 51, 51, 0.75), rgba(51, 51, 51, 0.75)), url(/bg2.jpg) top center',
            backgroundSize: 'cover',
        },
        cta: {
            textAlign: 'center',
        },
        containerContent: {
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
        },
    }),
);

const WidgetPartners = (): ReactElement => {
    const classes = useStyles();

    const __html = `<div id="widget"></div><script src="https://findahelpline.com/widget.min.js"></script><script>Widget.default({ countryCode: 'us' }).render('#widget');</script>`;

    return (
        <>
            <NavBar>
                <SideBar />
            </NavBar>
            <Box className={[classes.container, classes.background0].join(' ')}>
                <Container className={classes.containerContent} maxWidth="xs">
                    <Box mb={3}>
                        <Typography variant="h5">Connect your users to free mental health help, in seconds.</Typography>
                    </Box>
                </Container>
                <Box>
                    <ArrowDownwardIcon />
                </Box>
            </Box>
            <Box className={classes.content}>
                <Container maxWidth="xs">
                    <Typography gutterBottom>
                        With the Find A Helpline embeddable widget & API, you can bridge users experiencing distress or
                        a mental health crisis to the most relevant help for them – wherever they are in the world.
                    </Typography>
                    <Typography>
                        It’s an all-in-one solution for news agencies, social media, wellbeing apps and mental health
                        organizations.
                    </Typography>
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography>Automatically up-to-date</Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography>Verified helplines, no broken links</Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography>Helpline matching, one-click contact</Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Typography>Quick &amp; easy to set up</Typography>} />
                        </ListItem>
                    </List>
                </Container>
            </Box>
            <Container className={classes.highlights} maxWidth="sm">
                <Box className={classes.highlight}>
                    <Box className={classes.highlightIcon}>
                        <ImportContactsIcon fontSize="inherit" />
                    </Box>
                    <Typography className={classes.highlightTitle} variant="h6">
                        News Media
                    </Typography>
                    <Typography>Easily fulfil your responsibilities on best practice suicide reporting.</Typography>
                </Box>
                <Box className={classes.highlight}>
                    <Box className={classes.highlightIcon}>
                        <SupervisedUserCircleIcon fontSize="inherit" />
                    </Box>
                    <Typography className={classes.highlightTitle} variant="h6">
                        Social &amp; Wellbeing Apps
                    </Typography>
                    <Typography>Ensure users in crisis are safe and supported.</Typography>
                </Box>
                <Box className={classes.highlight}>
                    <Box className={classes.highlightIcon}>
                        <FavoriteIcon fontSize="inherit" />
                    </Box>
                    <Typography className={classes.highlightTitle} variant="h6">
                        Mental health organizations
                    </Typography>
                    <Typography>Quickly connect visitors to help, right from your website.</Typography>
                </Box>
            </Container>
            <Container className={classes.content} maxWidth="sm">
                <Typography variant="h6" gutterBottom>
                    Test the Find a Helpline widget below
                </Typography>
                <div dangerouslySetInnerHTML={{ __html }} />
            </Container>
            <Box className={[classes.content, classes.cta].join(' ')}>
                <Container maxWidth="xs">
                    <Box mb={3}>
                        <Typography variant="h6">
                            Talk with us about integrating <br />
                            Find A Helpline into your website or app
                        </Typography>
                    </Box>
                    <NextLink href="/contact" passHref>
                        <Button className={classes.button} color="primary" variant="contained" size="large">
                            Get in touch
                        </Button>
                    </NextLink>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default WidgetPartners;
