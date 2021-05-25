import { Box, createStyles, makeStyles, Typography, Container } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { ReactElement } from 'react';
import { OutboundLink } from 'react-ga';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import Donate from '../Donate';

const useStyles = makeStyles((theme) =>
    createStyles({
        title: {
            fontWeight: 'bold',
        },
        link: {
            color: theme.palette.text.primary,
            textDecoration: 'underline',
        },
        alert: {
            marginBottom: theme.spacing(2),
            '& .MuiAlert-icon': {
                alignItems: 'center',
            },
            '& .MuiAlert-message': {
                display: 'flex',
                alignItems: 'center',
            },
        },
        alertTitle: {
            fontWeight: 'bold',
            paddingTop: '4px',
            marginBottom: 0,
        },
    }),
);

const DonateCancel = (): ReactElement => {
    const classes = useStyles();
    return (
        <Box bgcolor="background.paper" py={2}>
            <Container maxWidth="xs">
                <Alert severity="info" className={classes.alert}>
                    <AlertTitle color="secondary" className={classes.alertTitle}>
                        Donation Cancelled
                    </AlertTitle>
                    <Donate
                        startIcon={undefined}
                        fullWidth={false}
                        endIcon={<ArrowRightAltRoundedIcon />}
                        color="secondary"
                    >
                        Try Again
                    </Donate>
                </Alert>
                <Typography variant="h6" className={classes.title} gutterBottom>
                    Here are some reasons you may have cancelled your donation:
                </Typography>

                <Typography className={classes.title}>Does $1 really help?</Typography>
                <Typography gutterBottom>
                    Definitely! As an example, one dollar keeps our servers active for 3 hours. In that time, we connect
                    at least one suicidal person to help.
                </Typography>

                <Typography className={classes.title}>Who am I donating to?</Typography>
                <Typography gutterBottom>
                    Find A Helpline is operated by Live For Tomorrow Charitable Trust, a nonprofit and registered
                    charity based in New Zealand and working globally. You can view our organization’s website at{' '}
                    <OutboundLink
                        eventLabel="https://www.livefortomorrow.co"
                        to="https://www.livefortomorrow.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.link}
                    >
                        livefortomorrow.co
                    </OutboundLink>{' '}
                    and our charity registration{' '}
                    <OutboundLink
                        eventLabel="https://www.register.charities.govt.nz/CharitiesRegister/ViewCharity?accountId=78f720b6-29fd-ea11-b43a-00155d6b7730&searchId=5204f74a-1dc4-4531-b48a-cd504012e317"
                        to="https://www.register.charities.govt.nz/CharitiesRegister/ViewCharity?accountId=78f720b6-29fd-ea11-b43a-00155d6b7730&searchId=5204f74a-1dc4-4531-b48a-cd504012e317"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.link}
                    >
                        here
                    </OutboundLink>
                    .
                </Typography>

                <Typography className={classes.title}>Is it safe to enter my credit card details?</Typography>
                <Typography gutterBottom>
                    Donations are processed by Stripe, a trustworthy online payments provider using SSL encryption.
                </Typography>

                <Typography className={classes.title}>What does my donation contribute to?</Typography>
                <Typography gutterBottom>
                    Your donation helps pay for our servers, maintenance and expansion to additional countries.
                </Typography>
            </Container>
        </Box>
    );
};

export default DonateCancel;
