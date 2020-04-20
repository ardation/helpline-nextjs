import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            backgroundColor: '#FFFFFF',
        },
    }),
);

const LoadingSpinner = (): ReactElement => {
    const classes = useStyles();
    const loading = true;

    return (
        <Container className={classes.container} data-testid="spinnerContainer">
            <ScaleLoader color={'#07838E'} loading={loading} data-testid="spinner" />
        </Container>
    );
};

export default LoadingSpinner;
