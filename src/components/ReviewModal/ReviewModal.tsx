import CloseIcon from '@material-ui/icons/Close';
import React, { ReactElement, useState, useRef } from 'react';
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
    Box,
    CircularProgress,
} from '@material-ui/core';
import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Alert, AlertTitle, Rating } from '@material-ui/lab';
import ReCAPTCHA from 'react-google-recaptcha';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { request } from 'graphql-request';
import { Formik } from 'formik';
import { Organization } from '../OrganizationItem/OrganizationItem';

type Props = {
    organization: Organization;
    open?: boolean;
    notice?: boolean;
    grecaptcha?: object;
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
        alert: {
            paddingTop: 0,
            paddingBottom: 0,
        },
        rating: {
            fontSize: '3rem',
        },
        title: {
            fontWeight: 'bold',
        },
        subtitle: {
            fontWeight: 'bold',
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

const ReviewModal = ({ organization, open, notice, grecaptcha }: Props): ReactElement => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(open || false);
    const [reviewReceived, setReviewReceived] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const handleOpen = (): void => {
        setModalOpen(true);
    };
    const handleClose = (): void => {
        setModalOpen(false);
    };
    const onSubmit = async ({ rating, responseTime, content }): Promise<void> => {
        const recaptchaToken = await recaptchaRef.current.execute();
        const query = gql`
            mutation OrganizationReviewCreate(
                $organizationId: ID!
                $rating: Int!
                $responseTime: Int!
                $content: String
                $recaptchaToken: String!
            ) {
                organizationReviewCreate(
                    input: {
                        organizationId: $organizationId
                        rating: $rating
                        responseTime: $responseTime
                        content: $content
                        recaptchaToken: $recaptchaToken
                    }
                ) {
                    clientMutationId
                }
            }
        `;

        await request('https://api.findahelpline.com', print(query), {
            organizationId: organization.id,
            rating: parseInt(rating),
            responseTime: parseInt(responseTime),
            content,
            recaptchaToken,
        });

        setModalOpen(false);
        setReviewReceived(true);
    };

    return (
        <>
            {!open && (
                <Box>
                    {reviewReceived ? (
                        <Alert severity="success" className={classes.alert}>
                            Thanks for your review! It will appear here shortly.
                        </Alert>
                    ) : (
                        <Button variant="outlined" className={classes.button} onClick={handleOpen}>
                            Leave a Review
                        </Button>
                    )}
                </Box>
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
                            <Formik initialValues={{ rating: 5, responseTime: 5, content: '' }} onSubmit={onSubmit}>
                                {({
                                    values: { rating, responseTime, content },
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                    isSubmitting,
                                }): ReactElement => (
                                    <form onSubmit={handleSubmit}>
                                        <Grid container wrap="nowrap" direction="column" spacing={2}>
                                            <Grid item>
                                                <Grid container wrap="nowrap" alignItems="center" spacing={2}>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography noWrap className={classes.title} variant="h5">
                                                            {organization.name}
                                                        </Typography>
                                                        <Typography className={classes.subtitle}>
                                                            Rate &amp; Review
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton onClick={handleClose} data-testid="close">
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
                                                <Rating
                                                    name="rating"
                                                    value={rating}
                                                    onChange={(_event, value): void => setFieldValue('rating', value)}
                                                    onBlur={handleBlur}
                                                    disabled={isSubmitting}
                                                    className={classes.rating}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    name="content"
                                                    value={content}
                                                    label="Your Review"
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                    fullWidth
                                                    color="primary"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={isSubmitting}
                                                    inputProps={{ 'data-testid': 'content' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography>
                                                    Approximately how many minutes did you wait to talk with someone?
                                                </Typography>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <ScheduleIcon />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <MySlider
                                                            name="responseTime"
                                                            value={responseTime}
                                                            min={0}
                                                            max={30}
                                                            valueLabelDisplay="auto"
                                                            onChange={(_event, value): void =>
                                                                setFieldValue('responseTime', value)
                                                            }
                                                            disabled={isSubmitting}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    type="submit"
                                                    className={classes.submit}
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <CircularProgress size={20} />
                                                            &nbsp; Submitting
                                                        </>
                                                    ) : (
                                                        'Submit Review'
                                                    )}
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <ReCAPTCHA
                                                    ref={recaptchaRef}
                                                    size="invisible"
                                                    sitekey={process.env.RECAPTCHA_KEY}
                                                    grecaptcha={grecaptcha}
                                                />
                                                <Typography className={classes.recaptcha}>
                                                    This site is protected by reCAPTCHA and the Google{' '}
                                                    <a
                                                        href="https://policies.google.com/privacy"
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >
                                                        Privacy Policy
                                                    </a>{' '}
                                                    and{' '}
                                                    <a
                                                        href="https://policies.google.com/terms"
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >
                                                        Terms of Service
                                                    </a>{' '}
                                                    apply.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        </Paper>
                    </Container>
                </Fade>
            </Modal>
        </>
    );
};

export default ReviewModal;
