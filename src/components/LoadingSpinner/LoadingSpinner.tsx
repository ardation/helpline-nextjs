import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        spinner: { color: '#07838E' },
    }),
);

const Spinner = (): ReactElement => {
    const classes = useStyles();

    return (
        <Container className={classes.container} data-testid="spinnerContainer">
            <CircularProgress className={classes.spinner} />
        </Container>
    );
};

export default Spinner;
