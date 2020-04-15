import React, { ReactElement, useState, Fragment } from 'react';
import { Container, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

type Country = {
    emergencyNumber: string;
};

type Props = {
    country?: Country;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down('xs')]: {
                paddingRight: theme.spacing(1),
                paddingLeft: theme.spacing(1),
            },
            backgroundColor: '#F0F1F5',
        },
        toolbar: {
            display: 'grid',
            gridGap: theme.spacing(2),
            gridTemplateColumns: '1fr auto auto',
            paddingRight: 0,
            paddingLeft: 0,
            [theme.breakpoints.down('xs')]: {
                gridRowGap: 0,
                alignItems: 'flex-start',
            },
        },
        title: {
            [theme.breakpoints.down('xs')]: {
                gridColumn: '1 / span 2',
                alignSelf: 'center',
            },
            display: 'inline',
        },
        titleDropdown: {
            [theme.breakpoints.down('xs')]: {
                gridColumn: '1 / span 2',
                alignSelf: 'center',
            },
            display: 'none',
        },
        button: {
            backgroundColor: '#CC001E',
            color: '#FFFFFF',
            textAlign: 'left',
            borderRadius: '1000px',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            '&:hover': {
                backgroundColor: '#CC001E',
            },
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
        buttonDropdown: {
            backgroundColor: '#CC001E',
            textAlign: 'center',
            alignSelf: 'center',
            borderRadius: '1000px',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            '&:hover': {
                backgroundColor: '#CC001E',
            },
            display: 'inline',
        },
        dropdownIcon: {
            display: 'none',
            alignSelf: 'center',
            [theme.breakpoints.down('xs')]: {
                display: 'inline',
            },
        },
        dropdownIconDropdown: {
            alignSelf: 'center',
        },
    }),
);

const WidgetBar = ({ country }: Props): ReactElement => {
    const classes = useStyles();
    const [isDropdown, setIsDropdown] = useState<boolean>(false);

    if (!country) {
        country = {
            emergencyNumber: '911',
        };
    }

    return (
        <Container className={country && classes.container}>
            <Toolbar className={classes.toolbar}>
                {!isDropdown ? (
                    <Fragment>
                        <Typography className={classes.title}>Are you or someone else in immediate danger?</Typography>
                        <Button
                            color="inherit"
                            className={classes.button}
                            href={`tel:${country.emergencyNumber}`}
                            data-testid="emergencyServicesButton"
                        >
                            Emergency Services
                        </Button>
                        <Button className={classes.dropdownIcon} onClick={(): void => setIsDropdown(true)}>
                            <ExpandMoreIcon />
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typography className={classes.titleDropdown}>
                            Are you or someone else in immediate danger?
                        </Typography>
                        <Button
                            color="inherit"
                            className={classes.buttonDropdown}
                            href={`tel:${country.emergencyNumber}`}
                            data-testid="emergencyServicesButton"
                        >
                            Emergency Services
                        </Button>
                        <Button className={classes.dropdownIconDropdown} onClick={(): void => setIsDropdown(false)}>
                            <ExpandLessIcon />
                        </Button>
                    </Fragment>
                )}
            </Toolbar>
        </Container>
    );
};

export default WidgetBar;
