import React, { ReactElement } from 'react';
import { Container, Box, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PublicIcon from '@material-ui/icons/Public';
import EmailIcon from '@material-ui/icons/Email';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            '& img': {
                maxWidth: '250px',
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            height: '100%',
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(2),
        },
        buttonRoot: {
            color: '#000',
            textDecoration: 'underline',
            textTransform: 'none',
            textAlign: 'left',
            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary.main,
            },
        },
        buttonLabel: {
            color: '#000',
        },
    }),
);

const TopBar = (): ReactElement => {
    const classes = useStyles();

    return (
        <Container maxWidth="xs" className={classes.container}>
            <Box className={classes.box}>
                <Box className={classes.logo}>
                    <img src="/logo.svg" alt="find a helpline" />
                </Box>
                <Typography component="div">
                    <p>COVID-19 is affecting people’s mental health.</p>
                    <p>
                        To do our bit, we’re putting every free mental health helpline in the world at your fingertips.
                    </p>
                    <p>Quick. Easy. Reliable.</p>
                    <p>Want to help?</p>
                </Typography>
                <div>
                    <Button
                        startIcon={<ThumbUpIcon />}
                        classes={{ root: classes.buttonRoot, label: classes.buttonLabel }}
                        href="mailto:elliot@livefortomorrow.co"
                        color="primary"
                    >
                        Partner With Us
                    </Button>
                </div>
                <div>
                    <Button
                        startIcon={<PublicIcon />}
                        classes={{ root: classes.buttonRoot, label: classes.buttonLabel }}
                        href="mailto:anna@livefortomorrow.co"
                        color="primary"
                    >
                        Help us crowdsource helplines
                    </Button>
                </div>
                <div>
                    <Button
                        startIcon={<EmailIcon />}
                        classes={{ root: classes.buttonRoot, label: classes.buttonLabel }}
                        href="https://zealnz.typeform.com/to/BtdlLP"
                        color="primary"
                    >
                        Join the launch mailing list
                    </Button>
                </div>
            </Box>
        </Container>
    );
};

export default TopBar;
