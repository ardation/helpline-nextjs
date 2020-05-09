import CloseIcon from '@material-ui/icons/Close';
import React, { ReactElement, useState } from 'react';
import {
    Modal,
    Fade,
    Backdrop,
    Button,
    Typography,
    Slider,
    TextField,
    Grid,
    IconButton,
    Paper,
    Container,
} from '@material-ui/core';
import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Alert, AlertTitle, Rating } from '@material-ui/lab';
import { Organization } from '../OrganizationItem/OrganizationItem';

type Props = {
    organization: Organization;
    open?: boolean;
    notice?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@global': {
            '.grecaptcha-badge': {
                visibility: 'hidden',
            },
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        container: {
            outline: 0,
            [theme.breakpoints.down('xs')]: {
                padding: 0,
            },
        },
        paper: {
            borderRadius: '10px',
            padding: theme.spacing(2, 2, 3),
            [theme.breakpoints.down('xs')]: {
                borderRadius: 0,
            },
        },
        submit: {
            borderRadius: '1000px',
            width: '100%',
        },
        button: {
            borderRadius: '1000px',
        },
        input: {
            width: 42,
        },
        recaptcha: {
            fontSize: '12px',
            color: '#AAAAAA',
            textAlign: 'center',
            '& > a': {
                color: '#AAAAAA',
            },
        },
    }),
);

const MySlider = withStyles({
    root: {
        color: '#ED2125',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#000',
        border: '2px solid #000',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
        background: 'linear-gradient(173.19deg, #ED2125 0%, #96CDD2 124.61%)',
    },
    rail: {
        color: '#F0F1F5',
        height: 8,
        borderRadius: 4,
    },
    mark: {
        height: 8,
    },
})(Slider);

const ReviewModal = ({ organization, open, notice, button }: Props): ReactElement => {
    const classes = useStyles();

    const [modalOpen, setModalOpen] = useState(open);

    const handleOpen = (): void => {
        setModalOpen(true);
    };

    const handleClose = (): void => {
        setModalOpen(false);
    };

    return (
        <>
            {!open && (
                <Button variant="outlined" className={classes.button} onClick={handleOpen}>
                    Leave a Review
                </Button>
            )}
            <Modal
                className={classes.modal}
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <Container maxWidth="xs" className={classes.container}>
                        <Paper elevation={3} className={classes.paper}>
                            <Grid container wrap="nowrap" direction="column" spacing={2}>
                                <Grid item>
                                    <Grid container wrap="nowrap" alignItems="center" spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography noWrap variant="h5">
                                                Rate &amp; Review {organization.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={handleClose}>
                                                <CloseIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {notice && (
                                    <Grid item>
                                        <Alert severity="info">
                                            <AlertTitle>
                                                It looks like you contacted a helpline! Leave a review.
                                            </AlertTitle>
                                            Your feedback can encourage others to access help.
                                        </Alert>
                                    </Grid>
                                )}
                                <Grid item>
                                    <Typography>Give a rating out of five.</Typography>
                                    <Rating defaultValue={5} size="large" />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        name="content"
                                        label="Your Review"
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography>How many minutes did you wait to talk with someone?</Typography>

                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <ScheduleIcon />
                                        </Grid>
                                        <Grid item xs>
                                            <MySlider defaultValue={5} min={0} max={30} valueLabelDisplay="auto" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button className={classes.submit} variant="contained" color="primary" size="large">
                                        Submit review
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.recaptcha}>
                                        This site is protected by reCAPTCHA and the Google{' '}
                                        <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
                                        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </Fade>
            </Modal>
        </>
    );
};

export default ReviewModal;
