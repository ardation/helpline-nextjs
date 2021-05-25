import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { ReactElement } from 'react';
import { OutboundLink } from 'react-ga';
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
    }),
);

const DonateCancelled = (): ReactElement => {
    const classes = useStyles();
    return (
        <>
            <Alert severity="info">
                <AlertTitle>Donation cancelled.</AlertTitle>
                <Donate />
            </Alert>
            <Typography variant="h6" className={classes.title} gutterBottom>
                Here are some reasons you may have cancelled your donation:
            </Typography>

            <Typography className={classes.title}>Does $1 really help?</Typography>
            <Typography gutterBottom>
                Definitely! As an example, one dollar keeps our servers active for 3 hours. In that time, we connect at
                least one suicidal person to help.
            </Typography>

            <Typography className={classes.title}>Who am I donating to?</Typography>
            <Typography gutterBottom>
                Find A Helpline is operated by Live For Tomorrow Charitable Trust, a nonprofit and registered charity
                based in New Zealand and working globally. You can view our organization’s website at
                <OutboundLink
                    eventLabel="https://www.livefortomorrow.co"
                    to="https://www.livefortomorrow.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                >
                    livefortomorrow.co
                </OutboundLink>
                and our charity registration here.
            </Typography>

            <Typography className={classes.title}>Is it safe to enter my credit card details?</Typography>
            <Typography gutterBottom>
                Donations are processed by Stripe, a trustworthy online payments provider using SSL encryption.
            </Typography>

            <Typography className={classes.title}>What does my donation contribute to?</Typography>
            <Typography gutterBottom>
                Your donation helps pay for our servers, maintenance and expansion to additional countries.
            </Typography>
        </>
    );
};

export default DonateCancelled;
