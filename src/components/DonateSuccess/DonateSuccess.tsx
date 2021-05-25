import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { ReactElement } from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            fontWeight: 'bold',
        },
    }),
);

const DonateSuccess = (): ReactElement => {
    const classes = useStyles();
    return (
        <Alert severity="success">
            <AlertTitle className={classes.title}>Donation Received</AlertTitle>
            <Typography gutterBottom>Thank you for donating to save lives. </Typography>
            <Typography gutterBottom>
                Through your generosity, more people in crisis can access free emotional support, wherever they are.
            </Typography>
            <Typography gutterBottom>Be proud of yourself. You made a difference today!</Typography>
        </Alert>
    );
};

export default DonateSuccess;
