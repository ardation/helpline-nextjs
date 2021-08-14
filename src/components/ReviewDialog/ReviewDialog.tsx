import CloseIcon from '@material-ui/icons/Close';
import React, { ReactElement, useState, useRef, useEffect } from 'react';
import {
    createStyles,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography,
    Slider,
    TextField,
    Grid,
    IconButton,
    Box,
    CircularProgress,
    SvgIcon,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle, Rating } from '@material-ui/lab';
import ReCAPTCHA from 'react-google-recaptcha';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { request } from 'graphql-request';
import { Formik } from 'formik';
import TimeIcon from '../../assets/time-icon.svg';
import { OrganizationReviewCreate } from '../../../types/OrganizationReviewCreate';

type Organization = {
    id: string;
    name: string;
};

type Props = {
    organization: Organization;
    open?: boolean;
    grecaptcha?: object;
    onClose?: () => void;
    button?: boolean;
};

const useStyles = makeStyles((theme) =>
    createStyles({
        '@global': {
            '.grecaptcha-badge': {
                visibility: 'hidden',
            },
        },
        recaptcha: {
            fontSize: '12px',
            color: theme.palette.text.secondary,
            textAlign: 'center',
            '& > a': {
                color: theme.palette.text.secondary,
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
            fontFamily: theme.typography.fontFamily,
        },
        subtitle: {
            fontWeight: 600,
        },
        dialogScrollPaper: {
            [theme.breakpoints.down('xs')]: {
                alignItems: 'flex-start',
            },
        },
        dialogPaperScrollPaper: {
            [theme.breakpoints.down('xs')]: {
                maxHeight: '100%',
            },
        },
        dialogPaper: {
            borderRadius: 12,
            [theme.breakpoints.down('xs')]: {
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                margin: 0,
            },
        },
        svgIcon: {
            fontSize: 20,
        },
    }),
);

const MySlider = withStyles({
    root: {
        color: '#2B8E94',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#2B8E94',
        border: '2px solid #2B8E94',
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
        background: '#2B8E94',
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

const ReviewDialog = ({ organization, open, grecaptcha, onClose, button }: Props): ReactElement => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(open || false);
    const [reviewReceived, setReviewReceived] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const handleOpen = (): void => {
        setDialogOpen(true);
    };
    const handleClose = (): void => {
        setDialogOpen(false);
        onClose && onClose();
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

        await request<OrganizationReviewCreate>('https://api.findahelpline.com', print(query), {
            organizationId: organization.id,
            rating: parseInt(rating),
            responseTime: parseInt(responseTime),
            content,
            recaptchaToken,
        });

        setDialogOpen(false);
        setReviewReceived(true);
        onClose && onClose();
    };

    useEffect(() => {
        if (open && !reviewReceived) {
            setDialogOpen(true);
        }
    }, [open]);

    return (
        <>
            {button && (
                <Box>
                    {reviewReceived ? (
                        <Alert severity="success" className={classes.alert}>
                            Thanks for your review! It will appear here shortly.
                        </Alert>
                    ) : (
                        <Button variant="contained" onClick={handleOpen} fullWidth>
                            Leave a Review
                        </Button>
                    )}
                </Box>
            )}
            <Dialog
                classes={{
                    paper: classes.dialogPaper,
                    scrollPaper: classes.dialogScrollPaper,
                    paperScrollPaper: classes.dialogPaperScrollPaper,
                }}
                open={dialogOpen}
                onClose={handleClose}
                maxWidth="sm"
            >
                <DialogTitle>
                    <Grid container wrap="nowrap" alignItems="center" spacing={2}>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap className={classes.title} variant="h5">
                                {organization.name}
                            </Typography>
                            <Typography className={classes.subtitle}>Rate &amp; Review</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose} data-testid="close" name="Close">
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers={true}>
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
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    size="invisible"
                                    sitekey={process.env.RECAPTCHA_KEY}
                                    grecaptcha={grecaptcha}
                                />
                                <Grid container wrap="nowrap" direction="column" spacing={2}>
                                    {open && (
                                        <Grid item>
                                            <Alert severity="info">
                                                <AlertTitle>It looks like you contacted a helpline!</AlertTitle>
                                                Leave a review – your feedback can encourage others to access help.
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
                                                <SvgIcon className={classes.svgIcon}>
                                                    <TimeIcon />
                                                </SvgIcon>
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
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            disabled={isSubmitting}
                                            fullWidth
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
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ReviewDialog;
