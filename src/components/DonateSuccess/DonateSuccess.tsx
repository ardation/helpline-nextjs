import { Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { ReactElement } from 'react';

const DonateSuccess = (): ReactElement => {
    return (
        <Alert severity="success">
            <AlertTitle>Donation Received</AlertTitle>
            <Typography>Thank you for donating to save lives. </Typography>
            <Typography>
                Through your generosity, more people in crisis can access free emotional support, wherever they are.
            </Typography>
            <Typography>Be proud of yourself. You made a difference today!</Typography>
        </Alert>
    );
};

export default DonateSuccess;
