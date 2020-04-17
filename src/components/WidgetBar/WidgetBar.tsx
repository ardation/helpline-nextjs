import React, { ReactElement, useState, Fragment } from 'react';
import { Container, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

type Props = {
    emergencyNumber?: string;
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
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            paddingRight: 0,
            paddingLeft: 0,
        },
        title: {
            [theme.breakpoints.down('xs')]: {
                gridColumn: '1 / span 2',
                alignSelf: 'center',
            },
            display: 'inline',
        },
        buttonsContainer: {
            display: 'inline',
            [theme.breakpoints.down('xs')]: {
                display: 'none',
                textAlign: 'center',
                '&.show': {
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing(1),
                },
            },
        },
        button: {
            textAlign: 'left',
            borderRadius: '1000px',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            margin: `0 ${theme.spacing(1)}px`,
        },
        emergencyButton: {
            backgroundColor: '#CC001E',
            textAlign: 'center',
            alignSelf: 'center',
            color: 'white',
            '&:hover': {
                backgroundColor: '#CC001EBF',
            },
        },
        dropdownButton: {
            display: 'none',
            alignSelf: 'center',
            [theme.breakpoints.down('xs')]: {
                display: 'inline',
            },
        },
    }),
);

const WidgetBar = ({ emergencyNumber = '911' }: Props): ReactElement => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Container className={emergencyNumber && classes.container}>
            <Toolbar className={classes.toolbar}>
                <Fragment>
                    <Typography className={classes.title}>Are you or someone else in immediate danger?</Typography>
                    <Button
                        className={classes.dropdownButton}
                        variant="text"
                        size="small"
                        disableRipple
                        onClick={(): void => setOpen(!open)}
                    >
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>
                    <Box className={`${classes.buttonsContainer} ${open ? 'show' : ''}`}>
                        <Button
                            className={`${classes.emergencyButton} ${classes.button}`}
                            color="inherit"
                            href={`tel:${emergencyNumber}`}
                            data-testid="emergencyServicesButton"
                        >
                            Emergency Services
                        </Button>
                    </Box>
                </Fragment>
            </Toolbar>
        </Container>
    );
};

export default WidgetBar;
